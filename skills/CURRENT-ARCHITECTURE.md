# DR-MCP Current Architecture Policy

This repository is direct-first.

## Canonical autonomy system
- **Autonomy data/control plane:** KOLLECTIVE BOH Supabase, plus the exact entity's dedicated backend where applicable.
- **Autonomy dashboard:** the dedicated `/autonomy` workspace in `dolodorsey/khg-dashboard`.
- **Canonical skills source:** `dolodorsey/khg-skills-arsenal`; DR-MCP skills are compatibility/reference material unless explicitly promoted into the canonical registry.
- **Application/deployment control:** GitHub + Vercel.
- **Scheduled execution:** native Supabase/Postgres scheduling, direct provider APIs, authenticated runtime workers, and approved platform-native scheduling.

## Retired methods
The following are retired as KHG orchestration/control-plane dependencies and must not be reintroduced into active runtime configuration, skills, agents, or automations without explicit founder instruction:
- n8n
- GoHighLevel / HighLevel as an orchestration or CRM control plane
- Make workflow orchestration
- Zapier workflow orchestration
- MindStudio as an enterprise agent/orchestration control plane
- generic cross-brand routers
- parallel legacy managed-agent runtimes superseded by KOLLECTIVE BOH autonomy agents

Historical tables, migrations, logs, and compatibility references may remain for audit/history, but they are not execution truth and must remain non-routable/non-active.

## Operating rules
For every skill and agent:
1. Resolve the exact KHG entity, event, program, app, or legal company before acting.
2. Read the live source of truth when connected data is available.
3. Preserve entity attribution across data, audiences, sender identities, assets, offers, approvals, reporting, and follow-up.
4. Prefer direct connected tools, provider APIs, Supabase tables/RPCs/Edge Functions/cron, GitHub/Vercel, terminal/local runners, and authenticated browser actions.
5. Add an intermediary workflow/orchestration layer only when the user explicitly requests it or a verified capability gap requires it.
6. Never revive generic cross-brand routers, shared lead lists, stale webhook registries, old completion reports, retired external API layers, or retired parallel agent runtimes.
7. Privileged credentials stay server-side or in approved secret stores; never tracked files or client bundles.
8. Verify writes, deployments, and runs before claiming completion.
9. Fail closed when permission, compliance, ownership, or source evidence is unclear.
10. Historical examples never override current backend/code state.

Lead work uses exact `entity_key` + `lead_archetype`. Generic division/vertical labels may be used for reporting but are not routing truth.
