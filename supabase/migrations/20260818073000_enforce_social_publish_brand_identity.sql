-- Hard-gate Instagram publishing by exact brand/account identity.
-- Incident regression: STUSH content must never publish through HELP 911 or any other fallback account.

create or replace function public._social_identity_norm(value text)
returns text
language sql
immutable
as $$
  select regexp_replace(lower(coalesce(value, '')), '[^a-z0-9]+', '', 'g')
$$;

create or replace function public.assert_instagram_publish_identity(
  p_brand text,
  p_handle text,
  p_social_account_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_brand text := nullif(trim(coalesce(p_brand, '')), '');
  v_handle text := nullif(trim(coalesce(p_handle, '')), '');
  v_sa public.social_accounts%rowtype;
  v_guard public.instagram_brand_identity_guard%rowtype;
  v_guard_found boolean := false;
  v_ready boolean := false;
begin
  if p_social_account_id is not null then
    select * into v_sa
    from public.social_accounts
    where id = p_social_account_id;

    if not found then
      raise exception 'SOCIAL_ACCOUNT_NOT_FOUND: %', p_social_account_id;
    end if;

    if lower(coalesce(v_sa.platform, '')) <> 'instagram' then
      return;
    end if;

    if v_brand is null then
      v_brand := coalesce(v_sa.brand_key, v_sa.brand);
    end if;
    if v_handle is null then
      v_handle := v_sa.username;
    end if;

    if coalesce(v_sa.enabled, false) is not true
       or lower(coalesce(v_sa.status, '')) <> 'connected'
       or not ('publish' = any(coalesce(v_sa.capabilities, array[]::text[]))) then
      raise exception 'SOCIAL_ACCOUNT_NOT_WRITE_READY: brand=% handle=% status=% enabled=%',
        v_brand, v_handle, v_sa.status, v_sa.enabled;
    end if;
  end if;

  if v_brand is null or v_handle is null then
    raise exception 'SOCIAL_IDENTITY_REQUIRED: brand and Instagram handle must be explicit';
  end if;

  select * into v_guard
  from public.instagram_brand_identity_guard g
  where g.is_active = true
    and public._social_identity_norm(g.brand_slug) = public._social_identity_norm(v_brand)
  limit 1;

  v_guard_found := found;

  if not v_guard_found then
    select * into v_guard
    from public.instagram_brand_identity_guard g
    where g.is_active = true
      and public._social_identity_norm(g.expected_handle) = public._social_identity_norm(v_handle)
    limit 1;
    v_guard_found := found;
  end if;

  if v_guard_found then
    if public._social_identity_norm(v_handle) <> public._social_identity_norm(v_guard.expected_handle) then
      raise exception 'SOCIAL_ACCOUNT_IDENTITY_MISMATCH: brand=% expected=% got=%',
        v_guard.brand_slug, v_guard.expected_handle, v_handle;
    end if;

    select exists(
      select 1
      from public.connected_accounts c
      where lower(coalesce(c.platform, '')) = 'instagram'
        and public._social_identity_norm(c.brand_slug) = public._social_identity_norm(v_guard.brand_slug)
        and public._social_identity_norm(c.account_identifier) = public._social_identity_norm(v_guard.expected_handle)
        and lower(coalesce(c.connection_status, '')) = 'connected'
        and coalesce(c.worker_enabled, false) = true
        and coalesce(c.queue_enabled, false) = true
        and coalesce(c.can_send, false) = true
    ) into v_ready;

    if not v_ready then
      raise exception 'SOCIAL_ACCOUNT_NOT_WRITE_READY: brand=% handle=%', v_guard.brand_slug, v_guard.expected_handle;
    end if;
  else
    select exists(
      select 1
      from public.social_accounts s
      join public.connected_accounts c
        on lower(coalesce(c.platform, '')) = 'instagram'
       and public._social_identity_norm(c.account_identifier) = public._social_identity_norm(s.username)
      where lower(coalesce(s.platform, '')) = 'instagram'
        and public._social_identity_norm(s.username) = public._social_identity_norm(v_handle)
        and (
          public._social_identity_norm(s.brand_key) = public._social_identity_norm(v_brand)
          or public._social_identity_norm(s.brand) = public._social_identity_norm(v_brand)
        )
        and lower(coalesce(s.status, '')) = 'connected'
        and coalesce(s.enabled, false) = true
        and ('publish' = any(coalesce(s.capabilities, array[]::text[])))
        and lower(coalesce(c.connection_status, '')) = 'connected'
        and coalesce(c.worker_enabled, false) = true
        and coalesce(c.queue_enabled, false) = true
        and coalesce(c.can_send, false) = true
    ) into v_ready;

    if not v_ready then
      raise exception 'SOCIAL_ACCOUNT_NOT_WRITE_READY_OR_AMBIGUOUS: brand=% handle=%', v_brand, v_handle;
    end if;
  end if;
end;
$$;

create or replace function public.trg_guard_social_publish_jobs_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sa public.social_accounts%rowtype;
begin
  if lower(coalesce(new.status, '')) in ('approved','queued','scheduled','publishing','processing','published') then
    if new.account_id is null then
      raise exception 'SOCIAL_ACCOUNT_REQUIRED: publish-ready jobs require account_id';
    end if;

    select * into v_sa from public.social_accounts where id = new.account_id;
    if not found then
      raise exception 'SOCIAL_ACCOUNT_NOT_FOUND: %', new.account_id;
    end if;

    if lower(coalesce(v_sa.platform, '')) = 'instagram' then
      perform public.assert_instagram_publish_identity(
        coalesce(v_sa.brand_key, v_sa.brand),
        v_sa.username,
        new.account_id
      );
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_social_publish_jobs_identity on public.social_publish_jobs;
create trigger trg_guard_social_publish_jobs_identity
before insert or update of account_id, status, connection_id
on public.social_publish_jobs
for each row execute function public.trg_guard_social_publish_jobs_identity();

create or replace function public.trg_guard_social_post_queue_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$;
begin
  if lower(coalesce(new.status, '')) like 'archived%' then
    return new;
  end if;

  if lower(coalesce(new.platform, 'instagram')) = 'instagram' then
    perform public.assert_instagram_publish_identity(new.brand, new.ig_handle, null);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_social_post_queue_identity on public.social_post_queue;
create trigger trg_guard_social_post_queue_identity
before insert or update of brand, ig_handle, platform, status
on public.social_post_queue
for each row execute function public.trg_guard_social_post_queue_identity();

create or replace function public.trg_guard_ig_publish_attempt_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.assert_instagram_publish_identity(new.brand_key, new.ig_handle, null);
  return new;
end;
$$;

drop trigger if exists trg_guard_ig_publish_attempt_identity on public.ig_publish_attempts;
create trigger trg_guard_ig_publish_attempt_identity
before insert or update of brand_key, ig_handle
on public.ig_publish_attempts
for each row execute function public.trg_guard_ig_publish_attempt_identity();
