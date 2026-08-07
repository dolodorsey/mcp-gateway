-- Defense-in-depth for direct Instagram OAuth.
-- Protect both directions: a known brand cannot accept the wrong handle,
-- and a known handle cannot be attached to another brand.

create or replace function public.enforce_instagram_brand_identity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_handle text;
  expected_handle text;
  expected_brand text;
begin
  if new.provider = 'instagram_login' and new.platform = 'instagram' then
    normalized_handle := lower(regexp_replace(coalesce(new.account_identifier, ''), '^@', '', 'g'));

    select lower(regexp_replace(g.expected_handle, '^@', '', 'g'))
      into expected_handle
    from public.instagram_brand_identity_guard g
    where g.brand_slug = new.brand_slug
      and g.is_active = true
    limit 1;

    if expected_handle is not null and normalized_handle <> expected_handle then
      raise exception using
        errcode = '23514',
        message = 'instagram_brand_identity_mismatch',
        detail = format('Brand %s requires @%s; received @%s.', new.brand_slug, expected_handle, normalized_handle);
    end if;

    select g.brand_slug
      into expected_brand
    from public.instagram_brand_identity_guard g
    where lower(regexp_replace(g.expected_handle, '^@', '', 'g')) = normalized_handle
      and g.is_active = true
    limit 1;

    if expected_brand is not null and expected_brand <> new.brand_slug then
      raise exception using
        errcode = '23514',
        message = 'instagram_brand_identity_mismatch',
        detail = format('@%s belongs to brand %s; received brand %s.', normalized_handle, expected_brand, new.brand_slug);
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_instagram_brand_identity() from public;
