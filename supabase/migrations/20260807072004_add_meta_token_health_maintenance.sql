create or replace view public.v_meta_token_expiry_watch with (security_invoker = true) as
select
  ca.id as connected_account_id,
  ca.brand_slug,
  ca.account_identifier as ig_handle,
  ca.external_account_id as ig_user_id,
  ca.parent_account_id as facebook_page_id,
  ca.connection_status,
  cac.credential_type,
  cac.status as credential_status,
  cac.expires_at,
  floor(extract(epoch from (cac.expires_at - now())) / 86400.0)::int as days_until_expiry,
  cac.last_verified_at,
  case
    when cac.expires_at is null then 'unknown'
    when cac.expires_at <= now() then 'expired'
    when cac.expires_at <= now() + interval '3 days' then 'critical'
    when cac.expires_at <= now() + interval '7 days' then 'urgent'
    when cac.expires_at <= now() + interval '14 days' then 'warning'
    else 'healthy'
  end as token_health
from public.connected_accounts ca
join lateral (
  select c.credential_type,c.status,c.expires_at,c.last_verified_at
  from public.connected_account_credentials c
  where c.connected_account_id=ca.id and c.provider='meta' and c.status='active'
  order by c.last_verified_at desc nulls last, c.created_at desc
  limit 1
) cac on true
where ca.provider='meta' and ca.platform='instagram' and ca.connection_status='connected';

revoke all on public.v_meta_token_expiry_watch from anon, authenticated;

create or replace function public.maintain_meta_token_health()
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  r record;
  v_alerts int := 0;
  v_updated int := 0;
  v_status text;
begin
  for r in select * from public.v_meta_token_expiry_watch loop
    v_status := case when r.token_health='expired' then 'unavailable' when r.token_health in ('critical','urgent','warning') then 'degraded' else 'verified' end;

    insert into public.social_account_capabilities(
      social_account_id,capability_key,capability_status,permission_name,test_method,
      verified_at,last_success_at,last_failure_at,failure_reason_safe,metadata,updated_at
    )
    select sa.id,'token_health',v_status,null,'database_expiry_monitor',now(),
      case when v_status='verified' then now() else null end,
      case when v_status<>'verified' then now() else null end,
      case when v_status='verified' then null else r.token_health || ':' || r.days_until_expiry::text || '_days' end,
      jsonb_build_object('expires_at',r.expires_at,'days_until_expiry',r.days_until_expiry,'token_health',r.token_health),now()
    from public.social_accounts sa
    where sa.platform='instagram' and lower(sa.username)=lower(r.ig_handle)
    on conflict (social_account_id,capability_key) do update set
      capability_status=excluded.capability_status,
      test_method=excluded.test_method,
      verified_at=excluded.verified_at,
      last_success_at=excluded.last_success_at,
      last_failure_at=excluded.last_failure_at,
      failure_reason_safe=excluded.failure_reason_safe,
      metadata=excluded.metadata,
      updated_at=excluded.updated_at;
    v_updated := v_updated + 1;

    if r.token_health in ('warning','urgent','critical','expired') and not exists (
      select 1 from public.khg_ops_notifications n
      where n.notification_type='meta_token_health'
        and n.metadata->>'connected_account_id'=r.connected_account_id::text
        and n.metadata->>'token_health'=r.token_health
        and n.created_at::date=current_date
    ) then
      insert into public.khg_ops_notifications(
        notification_type,category,title,body,priority,brand_key,metadata,delivery_method,delivered,created_at
      ) values (
        'meta_token_health','social',
        'Instagram API token ' || upper(r.token_health) || ' — @' || r.ig_handle,
        case when r.token_health='expired' then 'Meta credential has expired. Reconnect this Instagram account before automated actions continue.'
             else 'Meta credential expires in approximately ' || r.days_until_expiry || ' day(s). Rotate/reconnect before expiration.' end,
        case when r.token_health in ('critical','expired') then 'critical' when r.token_health='urgent' then 'high' else 'normal' end,
        r.brand_slug,
        jsonb_build_object('connected_account_id',r.connected_account_id,'ig_handle',r.ig_handle,'expires_at',r.expires_at,'days_until_expiry',r.days_until_expiry,'token_health',r.token_health),
        'dashboard',false,now()
      );
      v_alerts := v_alerts + 1;
    end if;
  end loop;
  return jsonb_build_object('ok',true,'accounts_updated',v_updated,'alerts_created',v_alerts,'checked_at',now());
end;
$$;

revoke all on function public.maintain_meta_token_health() from public, anon, authenticated;

select public.maintain_meta_token_health();

do $$
begin
  if exists(select 1 from cron.job where jobname='meta-token-health-maintenance') then
    perform cron.unschedule('meta-token-health-maintenance');
  end if;
  perform cron.schedule('meta-token-health-maintenance','17 */6 * * *','select public.maintain_meta_token_health();');
end $$;
