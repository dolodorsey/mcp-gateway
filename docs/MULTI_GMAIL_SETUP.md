# Multi-Company Gmail MCP Setup

## What this build does

- Connects multiple Gmail and Google Workspace accounts through the KHG dashboard.
- Stores a separate encrypted OAuth credential for every mailbox.
- Requires an explicit `account_id` for every MCP tool call.
- Keeps mailbox capabilities, approval mode, sync state, and audit logs separate by company/brand.
- Supports search, message/thread reading, labels, attachments, drafts, sends, replies, archive, read/unread, and controlled trash.

## Required server-only environment variables

Use the same values in `khg-dashboard` and this MCP service where noted.

```bash
SUPABASE_URL=https://dzlmtvodpyhetvektfuo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
EMAIL_TOKEN_ENCRYPTION_KEY=...
MCP_GATEWAY_KEY=...
MCP_ALLOWED_ORIGINS=https://khg-dashboard.vercel.app
PORT=8787
```

`EMAIL_TOKEN_ENCRYPTION_KEY` must be identical in the dashboard and MCP service. Never expose it as a `NEXT_PUBLIC_` variable.

## Google Cloud configuration

1. Create or select the Kollective Google Cloud project.
2. Enable the Gmail API.
3. Configure the OAuth consent screen.
4. Create a Web application OAuth client.
5. Add the dashboard callback URI exactly:

```text
https://khg-dashboard.vercel.app/api/email-accounts/google/callback
```

Add the production custom-domain callback too if the dashboard uses one:

```text
https://thedoctordorsey.com/api/email-accounts/google/callback
```

6. Add the client ID and client secret to the dashboard and MCP service.

## Dashboard flow

Open:

```text
/email-accounts
```

Choose the company/brand, optionally enter the expected email address, and select **Connect Company Gmail**. Google will ask which account to authorize. Repeat the flow for every company mailbox.

## MCP connection

Endpoint:

```text
POST https://YOUR-MCP-HOST/mcp
Authorization: Bearer MCP_GATEWAY_KEY
X-MCP-Client-Id: claude-or-codex-name
```

Always call `email_list_accounts` first and pass the returned UUID as `account_id` to every other tool.

## Default controls

- Read/search: enabled
- Draft: enabled
- Send/reply/forward: enabled but confirmation required
- Archive/labels/read-unread: enabled
- Trash: disabled
- Permanent deletion: not implemented

Change each mailbox to `fully_automatic`, `confirm_before_send`, `draft_only`, or `read_only` from the dashboard.

## Health check

```text
GET /health
```

The health endpoint exposes only service state and active session count. It does not expose mailbox data.
