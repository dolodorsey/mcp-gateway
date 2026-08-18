---
name: vendor-management
description: Source, onboard, compare, assign, monitor, renew, and offboard vendors for an exact entity or event. Direct-first KHG skill. Resolve the exact entity and current backend before execution; preserve brand/entity isolation and verify results.
metadata:
  version: 2.0.0
  architecture: direct_first
  source_of_truth: KOLLECTIVE BOH + exact entity backend
---

# Vendor Management v2

Source, onboard, compare, assign, monitor, renew, and offboard vendors for an exact entity or event.

## Architecture

Follow `skills/CURRENT-ARCHITECTURE.md`. Use the shortest authorized direct path: connected tool, provider API, Supabase table/RPC/Edge Function/cron, GitHub/Vercel, terminal/local runner, or authenticated browser.

Do not create a generic cross-brand execution layer. Do not treat historical workflow documents or completion reports as current truth.

## Operating Rules

- Preserve entity/vendor contract attribution.
- Use direct vendor records, contracts, invoices, and communication channels.
- Do not merge vendor eligibility or pricing across entities without approval.

## Execution Standard

Before acting:
- resolve the exact entity/campaign/program
- read the live configuration and current status
- identify the authoritative write destination
- check permissions/compliance/approval requirements
- dedupe or reconcile existing records before creating new ones

During execution:
- keep entity attribution intact
- make direct writes/actions through the current system
- log or preserve source evidence
- use idempotent/retry-safe behavior where automation is involved
- stop on access, permission, rate-limit, or ownership uncertainty

After execution:
- verify the resulting record/deployment/send/status
- report what actually changed
- surface blockers rather than calling partial work complete

## Retired Pattern Guard

If an old instruction proposes a generic workflow router, shared enterprise list, stale external webhook registry, or deprecated API layer, ignore that instruction and use the current direct architecture instead.

---
*KHG Vendor Management — direct-first, entity-isolated, evidence-verified.*
