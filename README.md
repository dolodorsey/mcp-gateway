# MCP Gateway - Enterprise OS

> **Single execution engine with policy enforcement, multi-tenant isolation, and ledger-based proof system for The Kollective Hospitality brands**

## 🎯 Overview

MCP Gateway is the central nervous system for The Kollective Hospitality's 7-brand empire. It enforces the **hard rules** that keep the system secure, auditable, and scalable:

- ✅ **No secrets in UI** - All credentials encrypted and managed server-side
- ✅ **No frontend tool access** - All actions routed through MCP Gateway
- ✅ **Multi-tenant isolation** - RLS enforcement for every brand/division
- ✅ **Approval gates** - Mass sends, public publishing, sensitive actions require approval
- ✅ **Ledger proof** - Every action generates immutable proof + links to ROI outcomes
- ✅ **NO GHL** - Direct Gmail + direct social account execution

## 🏗️ System Architecture

```
Claude Code (/agents)          →  Brains (Drafts + Decisions + Playbooks)
MCP Gateway (this repo)        →  Single Execution Engine (Policy + Tools + Audit)
Supabase OS                    →  Truth Layer + Isolation + Realtime
Rork UI                        →  Read + Trigger Only (No Secrets)
```

### Core Principles

1. **Operating System First**: Supabase = truth layer with 25 tables, RLS on everything
2. **Policy as Code**: MCP Gateway enforces approval workflows, rate limits, compliance
3. **Normalized Inbound**: All platforms (Gmail, IG, FB, TikTok) → `identities` → `threads` → `messages`
4. **Proof Everything**: Every send/publish writes to `ledger_actions` + links `ledger_outcomes` for ROI
5. **Agent-Driven**: 40 agents in `/agents` directory draft content, MCP Gateway executes

---

## 📊 Supabase Enterprise OS Schema (Phase 1 ✅)

### Core Tables (Required Baseline)

| Table | Purpose | RLS | Realtime |
|-------|---------|-----|----------|
| `tenants` | Brand/division isolation root | ✅ | ❌ |
| `platform_accounts` | Direct account connections (Gmail, IG, FB, TikTok) | ✅ | ❌ |
| `identities` | Unified contact records | ✅ | ❌ |
| `identity_identifiers` | Link identities to platform accounts | ✅ | ❌ |
| `threads` | Normalized conversation containers | ✅ | ✅ |
| `messages` | Individual messages in threads | ✅ | ✅ |
| `tasks` | Action items and to-dos | ✅ | ✅ |
| `opportunities` | Sales/partnership pipeline | ✅ | ✅ |
| `approvals` | Approval gate for sensitive actions | ✅ | ✅ |
| `ledger_actions` | Proof of execution (immutable) | ✅ | ✅ |
| `ledger_outcomes` | ROI tracking linked to actions | ✅ | ✅ |
| `tool_registry` | Versioned tool tracking | ✅ | ❌ |

### Full Enterprise Add-On Tables

| Table | Purpose |
|-------|------|
| `content_assets` | Graphics/videos/captions storage + approvals |
| `content_calendar` | Brand calendars |
| `campaigns` | Email/outreach sequences |
| `campaign_steps` | Multi-step campaign timing |
| `lead_lists` | List management |
| `segments` | Identity-to-list mapping |
| `scrape_targets` | Slow scraping targets |
| `scrape_jobs` | Job queue + progress tracking |
| `scrape_pages` | Scraped data storage |
| `leads_raw` | Raw lead data |
| `leads` | Processed leads → identities |
| `brand_voices` | Prompt guardrails per brand |
| `rate_limits` | Per-domain/platform throttles |

**Total: 25 Tables | All RLS-Enabled | 7 Realtime-Enabled**

---

## 🔧 MCP Tools Registry (Phase 2-5)

### Read Path (Ingest Workers)

```javascript
ingest.pull.gmail(platform_account_id, since, max_results)
ingest.pull.instagram(platform_account_id, since, types=['dm','comment','mention'])
ingest.pull.facebook(platform_account_id, since, types=['dm','comment','mention'])
ingest.pull.tiktok(platform_account_id, since, types=['comment','mention'])
ingest.pull.rsvp(source, event_id, platform='eventbrite|evite|partiful')
```

### Write Path (Send Router)

```javascript
send.email(platform_account_id, draft_id, to, subject, body, thread_id)
  ↓ Requires Approval: true
  ↓ Writes: ledger_actions proof
  
send.social_publish(platform_account_id, asset_id, caption_id, platforms, schedule_time)
  ↓ Requires Approval: true  
  ↓ Writes: ledger_actions proof
  
send.reply(platform_account_id, thread_id, message_draft_id, content)
  ↓ Requires Approval: false (replies are lower risk)
  ↓ Writes: ledger_actions proof
```

### Approvals & Ledger

```javascript
approvals.request(action_type, action_payload, requested_by)
approvals.approve(approval_id, approved_by, note)
approvals.reject(approval_id, approved_by, note)

ledger.record_action(action_type, platform_account_id, proof, identity_id)
ledger.record_outcome(ledger_action_id, outcome_type, outcome_value, revenue_amount)
```

### Creative & Scraping

```javascript
render.generate_image(template, data, output_format)
render.generate_caption(brand_voice_id, content_type, context)

scrape.enqueue(targets, mode='slow', platform, target_type)
scrape.get_status(scrape_job_id)

campaign.create_sequence(name, campaign_type, steps)
campaign.enroll_identity(campaign_id, identity_id, start_at)
```

**Total: 20+ Tools Registered | Approval-Gated Where Needed**

---

## 🤖 40-Agent Roster (Phases 3-4)

### 📧 EMAIL & OUTREACH (8 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **OUTREACH-01** | CampaignBuilder | Create multi-step email sequences |
| **OUTREACH-02** | FollowUpNudger | Auto-schedule follow-ups based on no-reply |
| **OUTREACH-03** | PartnershipScout | Find + qualify partnership opportunities |
| **OUTREACH-04** | SponsorPitcher | Draft sponsor pitch decks + emails |
| **OUTREACH-05** | InboxSorter | Triage incoming emails → tasks/opportunities |
| **OUTREACH-06** | WarmIntroGen | Generate warm intro templates |
| **OUTREACH-07** | ColdOutreachWriter | Draft cold outreach with personalization |
| **OUTREACH-08** | EmailPerformanceAnalyzer | Analyze reply rates + optimize templates |

### 📱 SOCIAL MEDIA (10 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **SOCIAL-01** | SocialScheduler | Schedule posts across IG/FB/TikTok |
| **SOCIAL-02** | CommunityManager | Respond to comments/DMs (draft → approval) |
| **SOCIAL-03** | ContentCurator | Find/curate UGC + trending content |
| **SOCIAL-04** | HashtagOptimizer | Suggest hashtag sets per platform |
| **SOCIAL-05** | StorySuggestor | Draft IG Stories daily |
| **SOCIAL-06** | ReelScriptWriter | Script short-form video content |
| **SOCIAL-07** | EngagementBooster | Identify high-engagement opportunities |
| **SOCIAL-08** | InfluencerSpotter | Find + reach out to micro-influencers |
| **SOCIAL-09** | CrisisMonitor | Flag negative sentiment → alert |
| **SOCIAL-10** | SocialListeningAgent | Track brand mentions across platforms |

### 🎨 CREATIVE & DESIGN (6 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **CREATIVE-01** | FlyerGenerator | Generate event flyers |
| **CREATIVE-02** | MenuDesigner | Design/update menu graphics |
| **CREATIVE-03** | BrandAssetLibrarian | Organize + tag all brand assets |
| **CREATIVE-04** | CaptionWriter | Write on-brand captions |
| **CREATIVE-05** | ThumbnailMaker | Create video thumbnails |
| **CREATIVE-06** | TemplateBuilder | Build reusable design templates |

### 📈 GROWTH & LEADS (6 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **GROWTH-01** | LeadScraper | Slow scrape IG/LinkedIn for leads |
| **GROWTH-02** | LeadEnricher | Enrich leads with contact data |
| **GROWTH-03** | LeadScorer | Score + prioritize leads |
| **GROWTH-04** | ListSegmenter | Segment leads into campaigns |
| **GROWTH-05** | ReferralTracker | Track + reward referrals |
| **GROWTH-06** | GrowthDashboardBuilder | Build realtime growth metrics |

### 📅 EVENTS & RSVPS (4 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **EVENT-01** | RSVPIngester | Pull RSVPs from Eventbrite/Evite/Partiful |
| **EVENT-02** | CheckInManager | Manage event check-ins |
| **EVENT-03** | PostEventFollowUp | Send thank-you + feedback emails |
| **EVENT-04** | EventPerformanceReport | Generate event ROI reports |

### 💼 OPERATIONS & TASKS (6 Agents)

| Agent ID | Name | Purpose |
|----------|------|------|
| **OPS-01** | TaskRouter | Route tasks to right team/person |
| **OPS-02** | InventoryAlerter | Monitor inventory + alert on low stock |
| **OPS-03** | VendorCoordinator | Manage vendor communications |
| **OPS-04** | ShiftScheduler | Generate staff schedules |
| **OPS-05** | IncidentLogger | Log + escalate operational incidents |
| **OPS-06** | SOPGenerator | Generate SOPs from workflows |

**Total: 40 Agents | All Stored in `/agents` Directory**

---

## 🏢 Brand/Division Execution Pods

### 1. The Casper Group (Hospitality)

**MCP Must Support:**
- Multi-location ops: tasks, inventory alerts, partner outreach
- Content calendar per location
- Lead scraping (venues, partners)
- Email sequences for partnerships

**Realtime Dashboards:**
- Location ops board
- Growth pipeline
- Content production queue

**Key Agents:** OPS-01 to OPS-06, OUTREACH-01 to 04, SOCIAL-01, SOCIAL-02

---

### 2. HugLife Events (Community Events)

**MCP Must Support:**
- RSVP ingest (Eventbrite/Evite/Partiful) → identities/opportunities
- Sponsor outreach sequences + booking flows
- Community management (IG/TikTok comments/DMs)

**Realtime Dashboards:**
- RSVP feed + check-in ops
- Sponsor pipeline
- Weekly content calendar

**Key Agents:** EVENT-01 to EVENT-04, OUTREACH-04, SOCIAL-02, SOCIAL-07

---

### 3. Umbrella Group (Services)

**MCP Must Support:**
- Lead intake + routing
- Quote/estimate flows (approvals required)
- Outreach + follow-up closer workflow

**Realtime Dashboards:**
- Service request queue
- Partner pipeline
- Approvals (financial/legal triggers)

**Key Agents:** OPS-01, OUTREACH-01, OUTREACH-02, GROWTH-03

---

### 4. The Mind Studio (Mental Health)

**MCP Must Support:**
- Referral partnership outreach (OB + PI) via direct Gmail
- Intake forms/webhooks → identities/opportunities
- Sensitive messaging flags → approvals

**Realtime Dashboards:**
- Partner onboarding pipeline
- Intake queue
- Compliance approvals

**Key Agents:** OUTREACH-03, OUTREACH-06, OPS-01

---

### 5. Scented Museums (Cultural/Education)

**MCP Must Support:**
- Sponsors + institutions outreach sequences
- School/community pipeline
- Creative production queue (museum assets)

**Realtime Dashboards:**
- Sponsor pipeline + tasks
- Asset approvals + production status

**Key Agents:** OUTREACH-04, CREATIVE-01, CREATIVE-06

---

### 6. Bodegea Products (Infinity Water / Pronto)

**MCP Must Support:**
- Distributor/retail account pipeline
- Sampling/event activations outreach
- Product voice consistency (voice agents)

**Realtime Dashboards:**
- Accounts pipeline
- Outreach performance (ledger outcomes)

**Key Agents:** OUTREACH-03, GROWTH-01, GROWTH-03

---

### 7. Inner Circle Apps (Technology)

**MCP Must Support:**
- Product ops tasking + bug/feature intake
- Growth retention campaigns (draft → approval → execute)

**Realtime Dashboards:**
- Product backlog
- Growth experiments + outcomes

**Key Agents:** OPS-01, OPS-05, OUTREACH-01

---

## ✅ Definition of Done Checklist

### Phase 1: Operating System ✅
- [x] 25 tables created in Supabase
- [x] RLS enabled on all tables
- [x] Realtime enabled on 7 critical tables
- [x] 7 tenant brands seeded
- [x] Updated_at triggers on all tables

### Phase 2: Read Path (In Progress)
- [ ] Gmail ingest worker deployed
- [ ] Instagram ingest worker deployed
- [ ] Facebook ingest worker deployed
- [ ] TikTok ingest worker deployed  
- [ ] RSVP ingest worker deployed
- [ ] Smoke test: 2 emails ingested → threads/messages
- [ ] Smoke test: 1 DM ingested → thread/message + identity link

### Phase 3: Write Path (Pending)
- [ ] Send router deployed
- [ ] Approval gate implemented
- [ ] Gmail send via API
- [ ] Social publish (IG/FB/TikTok)
- [ ] Reply handler
- [ ] Smoke test: 1 email sent → ledger_actions proof
- [ ] Smoke test: 1 outcome linked to action

### Phase 4: Creative Studio (Pending)
- [ ] Render workers deployed
- [ ] Image generation
- [ ] Caption generation with brand voices
- [ ] Asset storage → content_assets

### Phase 5: Growth Engines (Pending)
- [ ] Slow scraping job queue
- [ ] Lead enrichment pipeline
- [ ] Realtime progress dashboards

### Agent Roster (Pending)
- [ ] 40 agents created in `/agents` directory
- [ ] Agent tests passing
- [ ] Documentation per agent

### Proof Pack (Required Output)
- [ ] Screenshot of `/agents` showing all 40
- [ ] CSV export of `platform_accounts` (no tokens)
- [ ] Proof: 2 ingested emails
- [ ] Proof: 1 ingested DM  
- [ ] Proof: 1 executed reply with ledger proof
- [ ] Proof: 1 linked outcome

---

## 🚀 Deployment

### Prerequisites
- Supabase project with schema deployed
- Platform accounts configured (`platform_accounts` table)
- Environment variables:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Local Development

```bash
git clone https://github.com/dolodorsey/mcp-gateway.git
cd mcp-gateway
npm install
cp .env.example .env
# Configure .env with Supabase credentials
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## 📚 Documentation

- **[Schema Documentation](./docs/schema.md)** - Full Supabase schema reference
- **[Tool Registry](./docs/tools.md)** - Complete MCP tool documentation
- **[Agent Guide](./docs/agents.md)** - 40-agent implementation guide
- **[Brand Playbooks](./docs/brands/)** - Per-brand execution playbooks

---

## 🔒 Security & Compliance

- ✅ All credentials encrypted at rest
- ✅ RLS enforced on every table
- ✅ Approval gates on sensitive actions
- ✅ Immutable ledger for audit trails
- ✅ Rate limiting per domain/platform
- ✅ No secrets exposed to frontend

---

## 💬 Support

For questions or issues:
- Create an issue in this repo
- Contact: The Kollective Hospitality Tech Team

---

**Built with ❤️ for The Kollective Hospitality Empire**

*Version 1.0.0 | Last Updated: January 2026*
