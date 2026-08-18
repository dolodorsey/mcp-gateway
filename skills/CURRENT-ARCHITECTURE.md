# DR-MCP Current Architecture Policy

This repository is direct-first.

For every skill:
1. Resolve the exact KHG entity, event, program, app, or legal company before acting.
2. Read the live source of truth when connected data is available.
3. Preserve entity attribution across data, audiences, sender identities, assets, offers, approvals, reporting, and follow-up.
4. Prefer direct connected tools, provider APIs, Supabase tables/RPCs/Edge Functions/cron, GitHub/Vercel, terminal/local runners, and authenticated browser actions.
5. Add an intermediary workflow/orchestration layer only when the user explicitly requests it or a verified capability gap requires it.
6. Never revive generic cross-brand routers, shared lead lists, stale webhook registries, old completion reports, or retired external API layers.
7. Privileged credentials stay server-side or in approved secret stores; never tracked files or client bundles.
8. Verify writes/deployments/runs before claiming completion.
9. Fail closed when permission, compliance, ownership, or source evidence is unclear.
10. Historical examples never override current backend/code state.

Lead work uses exact `entity_key` + `lead_archetype`. Generic division/vertical labels may be used for reporting but are not routing truth.

Current enterprise source of truth: KOLLECTIVE BOH plus the exact entity's dedicated backend where applicable.
