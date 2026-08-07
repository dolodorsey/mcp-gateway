create table if not exists public.instagram_brand_identity_guard (
  brand_slug text primary key,
  expected_handle text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.instagram_brand_identity_guard enable row level security;
revoke all on public.instagram_brand_identity_guard from anon, authenticated;

insert into public.instagram_brand_identity_guard(brand_slug,expected_handle) values
  ('dr_dorsey','dolodorsey'),
  ('kollective','kollectivehospitality'),
  ('casper-group','thecaspergroupworldwide'),
  ('good_times','goodtimesworldwide'),
  ('help_911','help911.help'),
  ('maga','makeatlanta.greatagain'),
  ('on-call','oncall.allday')
on conflict (brand_slug) do update set expected_handle=excluded.expected_handle,is_active=true,updated_at=now();

create or replace function public.enforce_instagram_brand_identity()
returns trigger
language plpgsql
set search_path=''
as $$
declare
  expected text;
begin
  if new.provider = 'instagram_login' and new.platform = 'instagram' then
    select g.expected_handle into expected
    from public.instagram_brand_identity_guard g
    where g.brand_slug = new.brand_slug and g.is_active = true;
    if expected is not null and lower(regexp_replace(coalesce(new.account_identifier,''),'^@','','g')) <> lower(expected) then
      raise exception 'instagram_brand_identity_mismatch' using errcode='23514';
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_instagram_brand_identity() from public,anon,authenticated;

drop trigger if exists trg_enforce_instagram_brand_identity on public.connected_accounts;
create trigger trg_enforce_instagram_brand_identity
before insert or update of brand_slug,provider,platform,account_identifier
on public.connected_accounts
for each row execute function public.enforce_instagram_brand_identity();
