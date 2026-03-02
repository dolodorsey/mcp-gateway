---
name: crm-pipeline
description: >
  CRM pipeline management across Supabase and GoHighLevel for all Kollective divisions.
  Use this skill whenever the user wants to: manage contacts, build pipelines, track deals,
  create CRM workflows, manage opportunity stages, segment contacts, handle contact
  deduplication, design pipeline automations, create pipeline reports, or build any CRM-related
  system. Triggers include: 'CRM', 'pipeline', 'contacts', 'deals', 'opportunities', 'stage',
  'funnel', 'contact management', 'dedup', 'database', 'Supabase contacts', 'pipeline report',
  'conversion rate', 'deal tracking', 'lead status'. Maps to Supabase tables: identities,
  opportunities, threads, messages, lead_lists, segments, tasks. Maps to GHL: all 22 locations.
  Cross-references ghl-operations for GHL-specific pipeline configuration.
---

# CRM Pipeline System

Unified contact and deal management across all Kollective brands via Supabase (primary) and GoHighLevel (per-location CRM).

## Core Principle

The CRM is not a contact list — it's the revenue engine. Every contact is a potential revenue source, partner, or brand ambassador. Pipeline management means knowing exactly where every opportunity stands, what action is needed next, and who owns it. No contact should sit in a stage for more than the defined maximum time without action.

## Database Architecture

### Dual-System Design
Supabase is the master database — single source of truth for all contact intelligence across the entire Kollective. GoHighLevel handles location-specific CRM operations, messaging, and automations. Data syncs bidirectionally via n8n.

```
SUPABASE (Master)
  ├── identities (unified contact records)
  ├── identity_identifiers (platform accounts)
  ├── opportunities (deals across all brands)
  ├── threads (conversation containers)
  ├── messages (individual messages)
  ├── lead_lists (named segments)
  ├── segments (identity-to-list mapping)
  ├── tasks (action items)
  └── pipeline_analytics (stage metrics)

GHL (Per-Location)
  ├── Contacts (local to each of 22 locations)
  ├── Opportunities (location pipeline)
  ├── Conversations (messaging)
  └── Automations (location-specific workflows)

n8n (Sync Layer)
  ├── GHL → Supabase (new contacts, stage changes)
  ├── Supabase → GHL (enriched data, assignments)
  └── Bidirectional (real-time via webhooks)
```

### Core Tables

| Table | Purpose | Key Fields |
|---|---|---|
| `identities` | One record per person across all brands | id, full_name, email, phone, city, state, quality_score, tenant_id |
| `identity_identifiers` | Links to platform accounts | identity_id, platform (email, ig, phone, linkedin), value, verified |
| `opportunities` | Deals with stage tracking | id, identity_id, tenant_id, pipeline_id, stage, value, owner, created_at |
| `threads` | Conversation containers | id, identity_id, channel (email, dm, text, phone), brand, status |
| `messages` | Individual messages | id, thread_id, direction (inbound/outbound), content, sent_at |
| `lead_lists` | Named lists for segmentation | id, name, description, tenant_id, criteria, auto_update |
| `segments` | Identity-to-list mapping | id, identity_id, lead_list_id, added_at |
| `tasks` | Action items tied to contacts | id, identity_id, opportunity_id, type, due_date, assignee, status |
| `pipeline_analytics` | Stage metrics snapshots | id, pipeline_id, stage, count, avg_days, conversion_rate, snapshot_date |

### Multi-Tenant Isolation
Every record has a `tenant_id` linking to the `tenants` table. Row-Level Security (RLS) enforced — brands cannot see each other's data.

| Tenant ID | Division | Brands Covered |
|---|---|---|
| casper-group | Casper Group | Angel Wings, Pasta Bish, Taco Yaki, Patty Daddy, Espresso Co, Morning After, Toss'd, Sweet Tooth, Mojo Juice, Mr. Oyster |
| huglife-events | HugLife Events | All event brands |
| scented-flowers | Scented Flowers | Forever Futbol, Living Legends, Women Make The World, Fallen Stars |
| umbrella-group | Umbrella Group | All service brands |
| bodegea | Bodegea | Infinity Water, Pronto Energy, Noir, Stush |
| opulence-designs | Opulence Designs | Torches, Angel & Astronauts, Izzy, Country Boy |
| inner-circle | Inner Circle | Good Times, Roadside, On Call |
| playmakers | Playmakers | Sole Exchange, Let's Talk About It |

## Pipeline Definitions by Division

### Casper Group — Kitchen Placement Pipeline
```
NEW LEAD                    → Max 3 days    → Action: Qualify kitchen
QUALIFIED                   → Max 5 days    → Action: Send NDA
NDA SENT                    → Max 7 days    → Action: Follow up on NDA
NDA SIGNED                  → Max 3 days    → Action: Schedule site walk
SITE WALK SCHEDULED         → Max 7 days    → Action: Conduct site walk
SITE APPROVED               → Max 5 days    → Action: Begin training
TRAINING                    → Max 14 days   → Action: Complete training
ACTIVE                      → Ongoing       → Action: Monitor performance
CHURNED                     → Archive       → Action: Log reason, 90-day re-engage
```
**Win criteria:** Kitchen goes ACTIVE (generating orders)
**Loss criteria:** Kitchen fails site walk, NDA not returned in 14 days, training abandoned

### HugLife Events — Sponsor/Partner Pipeline
```
NEW PROSPECT                → Max 3 days    → Action: First outreach
CONTACTED                   → Max 5 days    → Action: Follow up if no response
CALL BOOKED                 → Max 3 days    → Action: Prep for call
CALL COMPLETED              → Max 2 days    → Action: Send deck
DECK SENT                   → Max 5 days    → Action: Follow up on deck
NEGOTIATION                 → Max 10 days   → Action: Close terms
SLOT RESERVED               → Max 3 days    → Action: Send contract
CONTRACT SENT               → Max 7 days    → Action: Follow up on contract
SIGNED                      → Max 5 days    → Action: Begin integration planning
ACTIVATED                   → Event date    → Action: Execute partner integration
COMPLETED                   → Post-event    → Action: Deliver recap, discuss renewal
```
**Win criteria:** Partner SIGNED and ACTIVATED
**Loss criteria:** No response after full sequence, declined on call, failed negotiation

### Scented Flowers — Sponsor Pipeline
```
NEW PROSPECT                → Max 3 days    → Action: First outreach
CONTACTED                   → Max 5 days    → Action: Follow up
CALL BOOKED                 → Max 3 days    → Action: Prep
CALL COMPLETED              → Max 2 days    → Action: Send deck
DECK SENT                   → Max 5 days    → Action: Follow up
CATEGORY HELD               → Max 7 days    → Action: Negotiate terms
NEGOTIATION                 → Max 10 days   → Action: Close
CONTRACT SENT               → Max 7 days    → Action: Follow up
SIGNED                      → Max 5 days    → Action: Integration planning
INTEGRATION PLANNING        → Pre-install   → Action: Collect assets, plan placement
ACTIVATED                   → Installation  → Action: Live integration
COMPLETED                   → Post-install  → Action: Recap, renewal discussion
```

### Umbrella Group — Service Client Pipeline
```
INQUIRY                     → Max 1 day     → Action: Respond
CONSULTATION BOOKED         → Max 3 days    → Action: Prep
CONSULTATION COMPLETED      → Max 2 days    → Action: Send proposal
PROPOSAL SENT               → Max 7 days    → Action: Follow up
NEGOTIATION                 → Max 10 days   → Action: Close terms
AGREEMENT SIGNED            → Max 3 days    → Action: Begin onboarding
ONBOARDING                  → Max 14 days   → Action: Complete setup
ACTIVE CLIENT               → Ongoing       → Action: Service delivery
COMPLETED/RENEWED           → Contract end  → Action: Renewal or close
```

### Bodegea — Distribution Pipeline
```
LEAD                        → Max 3 days    → Action: Qualify
SAMPLE REQUESTED            → Max 2 days    → Action: Ship sample
SAMPLE SENT                 → Max 7 days    → Action: Follow up on sample
FOLLOW-UP                   → Max 5 days    → Action: Close first order
FIRST ORDER                 → Order placed  → Action: Fulfill, track satisfaction
REPEAT CUSTOMER             → Ongoing       → Action: Upsell, relationship build
DISTRIBUTION PARTNER        → Contracted    → Action: Ongoing management
```

## Opportunity Management

### Required Fields (Every Opportunity)
| Field | Type | Required | Notes |
|---|---|---|---|
| contact_id | Reference | Yes | Link to identities table |
| pipeline_id | Reference | Yes | Which pipeline |
| stage | Enum | Yes | Current stage |
| value | Number | Recommended | Estimated deal value |
| owner | Reference | Yes | Who manages this opportunity |
| source | String | Yes | How they entered pipeline |
| brand | String | Yes | Specific brand (not just division) |
| next_action | String | Yes | What happens next |
| next_action_date | Date | Yes | When it should happen |
| notes | Text | Optional | Context and history |
| lost_reason | String | On loss | Why the deal was lost |

### Automated Stage Transitions (n8n)
| Trigger | Action |
|---|---|
| NDA document opened | Move to NDA SENT → auto-notify |
| NDA signed (e-signature webhook) | Move to NDA SIGNED → trigger site walk scheduling |
| Meeting scheduled (Calendly/GHL) | Move to CALL BOOKED |
| Email opened + link clicked | Update engagement score |
| No activity for max-days-in-stage | Alert owner + escalate |
| Contract signed | Move to SIGNED → trigger onboarding |
| Deal value entered | Update pipeline revenue forecast |

### Stage Timeout Alerts
```
[n8n Cron: 9 AM daily]
  → [Supabase: Query opportunities where days_in_stage > max_days]
  → [For each overdue opportunity:]
    → [Slack notification to owner]
    → [If 2x max_days: Escalate to Dr. Dorsey]
    → [If 3x max_days: Auto-move to "Stalled" tag]
  → [Log all alerts to pipeline_analytics]
```

## Reporting & Analytics

### Pipeline Summary (per brand — daily snapshot)
| Metric | Calculation |
|---|---|
| Total opportunities | Count per stage |
| Pipeline value | Sum of opportunity values per stage |
| Average days in stage | AVG(current_date - stage_entered_date) |
| Stage conversion rate | COUNT(moved to next stage) / COUNT(entered stage) |
| Win rate | COUNT(won) / COUNT(entered pipeline) |
| Average deal size | AVG(value) of won opportunities |
| Pipeline velocity | (# opportunities × avg deal size × win rate) / avg days to close |
| Stalled count | Opportunities exceeding max days in stage |

### Contact Health Dashboard
| Metric | Calculation |
|---|---|
| Total contacts | Count per tenant |
| Quality distribution | Count per quality tier (Gold/Silver/Bronze/Raw) |
| Active vs. dormant | Activity within 30 days |
| Enrichment coverage | AVG quality score |
| Dedup candidates | Estimated duplicates |
| Channel coverage | % with email, phone, IG, LinkedIn |

### Revenue Forecast
```
Forecast = Σ (opportunity_value × stage_probability)

Stage probabilities (HugLife example):
  NEW PROSPECT: 5%
  CONTACTED: 10%
  CALL BOOKED: 20%
  CALL COMPLETED: 35%
  DECK SENT: 40%
  NEGOTIATION: 60%
  SLOT RESERVED: 75%
  CONTRACT SENT: 85%
  SIGNED: 95%
  ACTIVATED: 100%
```

## Output Modes

### MODE 1: Pipeline Design
Build a complete pipeline for a new brand or use case:
1. Stage definitions with entry/exit criteria
2. Maximum days per stage
3. Automated triggers per stage
4. Required fields per stage
5. Win/loss criteria
6. Reporting metrics
7. n8n workflow integration plan

### MODE 2: Pipeline Report
Generate current pipeline status:
1. Stage counts and values
2. Conversion rates
3. Stalled opportunities
4. Revenue forecast
5. Owner performance
6. Trend analysis (vs. previous period)

### MODE 3: Contact Segment
Build a targeted segment:
1. Criteria definition
2. Supabase query
3. Segment size estimate
4. Quality distribution
5. Recommended action per segment

### MODE 4: CRM Workflow
Design an automated CRM workflow:
1. Trigger event
2. Condition logic
3. Actions (stage move, task create, notification, message)
4. Error handling
5. Measurement

### MODE 5: Pipeline Optimization
Analyze and improve existing pipeline:
1. Bottleneck identification (which stages have longest dwell time)
2. Drop-off analysis (where do leads die)
3. Conversion improvement recommendations
4. Stage consolidation/expansion suggestions
5. Automation opportunities

### MODE 6: Cross-Brand Report
Enterprise-wide CRM analysis:
1. All divisions compared
2. Total pipeline value
3. Best-performing pipeline
4. Worst-performing pipeline
5. Resource allocation recommendations
6. Enterprise revenue forecast

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Stage change sync | n8n webhook | GHL stage change | Update Supabase opportunity |
| New contact sync | n8n webhook | GHL new contact | Create/match in Supabase identities |
| Timeout alerts | n8n cron | Daily 9 AM | Flag overdue opportunities |
| Pipeline snapshot | n8n cron | Daily midnight | Capture pipeline_analytics snapshot |
| Win/loss logging | n8n webhook | Opportunity closed | Log outcome, update analytics |
| Task generation | n8n + Supabase | Stage change | Auto-create next-action task |
| Owner notification | n8n + Slack | New assignment | Alert new opportunity owner |
| Revenue forecast | n8n cron | Weekly | Calculate and store forecast |
| Stalled re-engagement | n8n cron | Weekly | Trigger outreach for stalled opportunities |
