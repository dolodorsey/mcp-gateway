create table if not exists public.meta_webhook_app_configs (
  id uuid primary key default gen_random_uuid(),
  app_id text not null,
  app_label text,
  callback_url text not null,
  verify_token_hash text not null,
  secret_source text not null default 'env_or_credentials',
  subscribed_fields text[] not null default '{}',
  status text not null default 'pending',
  last_configured_at timestamptz,
  last_verified_at timestamptz,
  last_webhook_received_at timestamptz,
  last_error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(app_id, callback_url)
);

alter table public.meta_webhook_app_configs enable row level security;
revoke all on public.meta_webhook_app_configs from anon, authenticated;

create table if not exists public.meta_ops_nonces (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  action text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.meta_ops_nonces enable row level security;
revoke all on public.meta_ops_nonces from anon, authenticated;

create index if not exists idx_meta_ops_nonces_live on public.meta_ops_nonces (expires_at) where used_at is null;
create index if not exists idx_social_inbound_received_at on public.social_inbound_events (received_at desc);
create index if not exists idx_social_webhook_received_at on public.social_webhook_events (received_at desc);
create index if not exists idx_social_webhook_subscriptions_ig_user on public.social_webhook_subscriptions (ig_user_id);

comment on table public.meta_webhook_app_configs is 'Server-only Meta webhook app configuration. Stores only verify-token hashes, never raw verify tokens or app secrets.';
comment on table public.meta_ops_nonces is 'One-time server control nonces for privileged Meta repair/certification Edge Function calls.';
