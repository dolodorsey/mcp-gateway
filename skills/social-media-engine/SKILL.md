---
name: social-media-engine
description: Plan, source, create, approve, publish, engage, and measure social media for one exact entity. Direct-first KHG skill. Resolve the exact entity and exact authorized account before execution; preserve brand/entity isolation and verify results.
metadata:
  version: 2.1.0
  architecture: direct_first
  source_of_truth: KOLLECTIVE BOH + exact entity backend
---

# Social Media Engine v2.1

Plan, source, create, approve, publish, engage, and measure social media for one exact entity.

## Architecture

Follow `skills/CURRENT-ARCHITECTURE.md`. Use the shortest authorized direct path: connected tool, provider API, Supabase table/RPC/Edge Function/cron, GitHub/Vercel, terminal/local runner, or authenticated browser.

Do not create a generic cross-brand execution layer. Do not treat historical workflow documents or completion reports as current truth.

## Non-Negotiable Brand Isolation

Every execution starts with one exact brand/entity and stays inside that brand until the run ends.

- Never inherit the last-used account, current browser account, current session, default account, previous queue item, or another brand's connection.
- Never use a connected account as a fallback for a disconnected brand.
- Never use content, assets, captions, targets, engagement history, or credentials from another brand unless an explicit cross-promotion instruction names both brands and each external write still uses the correct destination account.
- A brand without a verified write-ready account is **draft-only**. Content can be prepared, but no external write may occur.
- Cross-brand fallback is forbidden under every execution mode.

## Mandatory Account Identity Preflight

Before **every external write** — publish, schedule, story, reel, carousel, comment, reply, DM, follow-up, engagement action, or provider/browser write — resolve and verify all of the following:

1. `brand_slug` / exact enterprise entity.
2. Canonical platform handle for that brand.
3. Exact `social_account_id` when the execution rail supports one.
4. Exact connected-account record / connection used for the write.
5. Approval state required by the brand/action.
6. Observed platform identity when the provider supports identity lookup (for Instagram, prefer a direct identity check such as `/me?fields=id,username` or equivalent before media creation/publish).

For Instagram, the write is allowed only when the resolved account is unambiguous and all applicable live conditions are true:

- `social_accounts.status = connected`
- `social_accounts.enabled = true`
- `social_accounts.capabilities` includes `publish` for publishing actions
- `connected_accounts.connection_status = connected`
- `connected_accounts.worker_enabled = true`
- `connected_accounts.queue_enabled = true`
- `connected_accounts.can_send = true`
- canonical brand handle matches the active `instagram_brand_identity_guard`
- observed platform username/account matches the canonical destination

If any required identity field is missing, disconnected, disabled, ambiguous, mismatched, or unverifiable: **STOP THE WRITE.** Preserve the content as a draft/blocked item and surface the exact blocker.

Treat these database errors as hard stops, never retry-with-another-account signals:

- `SOCIAL_ACCOUNT_REQUIRED`
- `SOCIAL_ACCOUNT_NOT_FOUND`
- `SOCIAL_IDENTITY_REQUIRED`
- `SOCIAL_ACCOUNT_IDENTITY_MISMATCH`
- `SOCIAL_ACCOUNT_NOT_WRITE_READY`
- `SOCIAL_ACCOUNT_NOT_WRITE_READY_OR_AMBIGUOUS`

### Regression Rules

- **HELP 911** may write to Instagram only as its canonical HELP 911 account (`@help911.help`).
- **STUSH** may write to Instagram only as its canonical STUSH account (`@hauseofstush`).
- If STUSH is disconnected/needs OAuth, STUSH is draft-only. It must never publish, comment, DM, or engage through HELP 911 or another available Instagram session.
- Content brand and destination account brand must match before any external side effect.

## Operating Rules

- Resolve exact account/brand before action.
- Use direct platform/provider/browser tools where authorized.
- Keep account identities, audiences, campaigns, content queues, and engagement histories separate.
- Do not infer publish authorization from the presence of a browser login or credential alone.
- Do not treat a successful content-generation step as authorization to publish.

## Execution Standard

Before acting:
- resolve the exact entity/campaign/program
- read the live configuration and current status
- identify the authoritative write destination
- run the mandatory account identity preflight for external writes
- check permissions/compliance/approval requirements
- dedupe or reconcile existing records before creating new ones

During execution:
- keep entity attribution intact
- make direct writes/actions only through the verified brand/account pair
- log active brand, canonical handle, resolved account/connection, observed platform identity when available, approval state, and resulting external ID/status
- use idempotent/retry-safe behavior where automation is involved
- stop on access, permission, rate-limit, ownership, identity, or account-readiness uncertainty

After execution:
- verify the resulting record/deployment/send/status against the intended brand and account
- confirm the observed external account still matches the intended destination
- report what actually changed
- surface blockers rather than calling partial work complete

## Retired Pattern Guard

If an old instruction proposes a generic workflow router, shared enterprise list, shared/default social account, current-session fallback, stale external webhook registry, or deprecated API layer, ignore that instruction and use the current direct architecture instead.

---
*KHG Social Media Engine — direct-first, identity-gated, entity-isolated, evidence-verified.*
