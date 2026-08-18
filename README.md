# DR-MCP — Direct KHG Tool Gateway + Skills

DR-MCP currently contains two things:

1. **A purpose-built Gmail MCP gateway** for server-side, multi-account email access with explicit account selection, confirmation controls, encrypted tokens, and audit logging.
2. **KHG operating skills** that follow the current direct-first architecture policy in `skills/CURRENT-ARCHITECTURE.md`.

It is **not** the canonical enterprise database and it is not a generic workflow/orchestration backbone. KOLLECTIVE BOH remains the enterprise source of truth; exact entity backends remain authoritative for entity-specific product/operational data.

## Current runtime

`src/index.js` exposes the authenticated MCP endpoint and Gmail tools.

Current tool classes include:
- list exact connected Gmail accounts
- search/read messages and threads
- list labels and retrieve attachments
- create drafts
- send/reply with confirmation controls
- modify/archive/read-state/trash operations with account-specific permissions

The gateway requires `MCP_GATEWAY_KEY` and can restrict allowed origins. Gmail operations require an exact account UUID rather than silently substituting an email address.

## Architecture

```text
Agent / approved caller
  -> DR-MCP authenticated endpoint
  -> exact Gmail account selection
  -> encrypted server-side credential retrieval
  -> Gmail API
  -> audit/proof records

KHG business/lead/operations state
  -> KOLLECTIVE BOH
  -> exact entity backend when applicable
```

Use direct connected tools/provider APIs/Supabase RPCs/Edge Functions/cron/terminal/browser for work outside this gateway. Do not turn DR-MCP into an unnecessary intermediary when a direct current integration already exists.

## Skills architecture

All active skills follow `skills/CURRENT-ARCHITECTURE.md`:
- resolve the exact entity/event/program/app first
- use live source-of-truth data
- preserve brand/entity isolation
- prefer direct integrations
- keep privileged secrets server-side
- verify writes/runs before claiming completion
- fail closed on permission/compliance/ownership uncertainty

Lead work uses exact `entity_key` + `lead_archetype`. Generic division/vertical labels are not routing truth.

## Retired patterns

Do not restore:
- generic cross-brand workflow routers
- external webhook registries as the BOH data plane
- shared enterprise lead lists without exact entity attribution
- stale “completion report” architecture as production truth
- intermediary workflow-builder dependencies when direct integrations exist
- client-side service-role/provider secrets
- repo-tracked runtime credentials

## Environment

Server-side only:

```bash
PORT=8787
MCP_GATEWAY_KEY=<long random secret>
MCP_ALLOWED_ORIGINS=https://approved-caller.example.com

SUPABASE_URL=https://dzlmtvodpyhetvektfuo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only service role>

GOOGLE_OAUTH_CLIENT_ID=<server-side>
GOOGLE_OAUTH_CLIENT_SECRET=<server-side>
EMAIL_TOKEN_ENCRYPTION_KEY=<server-side encryption key>
```

Never expose these as public/client environment variables.

## Development

```bash
npm install
npm start
```

Health endpoint:

```text
GET /health
```

MCP endpoint:

```text
POST /mcp
```

The MCP endpoint requires the configured gateway bearer key.

## Validation

Before changing runtime behavior:
1. inspect the current source code and KOLLECTIVE BOH state
2. verify the exact account/entity boundary
3. keep write tools narrow and permission-aware
4. test authorization and confirmation failure paths
5. verify audit/proof output

Historical Git commits may contain older architecture descriptions. Current `main`, live KOLLECTIVE BOH, and the exact deployed service are authoritative.

---
**Status:** Direct-first Gmail gateway + current KHG skills
