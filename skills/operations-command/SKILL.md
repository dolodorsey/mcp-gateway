---
name: operations-command
description: >
  Central operations management and daily execution engine for the entire Kollective. Use this
  skill whenever the user wants to: manage daily operations, build task queues, track KPIs,
  manage staff, handle incident response, coordinate across divisions, build operational
  dashboards, manage inventory, or run any day-to-day operational process. Triggers include:
  'operations', 'daily queue', 'KPI', 'dashboard', 'task management', 'staff', 'schedule',
  'incident', 'inventory', 'ops report', 'daily digest', 'morning ops', 'nightly digest',
  'operational health'. Maps to n8n workflows: CASPER OPS, MCP — Daily Queue Builder,
  MCP — Daily KPI Digest. Maps to agents: OPS-01 through OPS-05.
---

# Operations Command

Central nervous system for daily Kollective operations across all 8 divisions.

## Core Principle

Operations is what separates a portfolio of brands from a portfolio of ideas. Every day, across 48+ brands and multiple cities, hundreds of tasks need execution, dozens of metrics need tracking, and every problem needs resolution before it becomes a crisis. Operations Command ensures nothing falls through the cracks.

## Daily Operations Cycle

### 6:00 AM — Morning Ops (CASPER OPS)
| Task | System | Action |
|---|---|---|
| Kitchen status check | n8n + GHL | Pull status of all active kitchens |
| Platform availability | n8n + API | Verify all brands live on delivery platforms |
| Inventory alerts | n8n + Supabase | Flag kitchens below minimum stock |
| Order pipeline check | n8n + API | Verify order flow is active |
| Staff check-in | n8n + Slack | Confirm key staff availability |
| Issue carry-over | Supabase | Pull unresolved incidents from previous day |

### 8:00 AM — Daily Queue Build (MCP — Daily Queue Builder)
| Task | System | Action |
|---|---|---|
| Pull pending tasks | Supabase | All incomplete tasks across all brands |
| Score priorities | n8n function | Priority = deadline × impact × brand weight |
| Assign owners | n8n logic | Route tasks to appropriate team members |
| Generate queue | n8n + Supabase | Write to daily_queues table |
| Distribute | n8n + Slack | Push queue to team channels |
| Track | Supabase | Monitor completion throughout day |

### 12:00 PM — Midday Check
| Task | System | Action |
|---|---|---|
| Queue progress | Supabase | % of daily tasks completed |
| Revenue pulse | n8n + API | Midday revenue vs. target |
| Issue escalation | n8n + Slack | Any unresolved issues from morning |
| Afternoon priorities | n8n function | Reprioritize if needed |

### 6:00 PM — Evening Ops
| Task | System | Action |
|---|---|---|
| Event prep check | n8n + Supabase | Any events tonight — confirm readiness |
| Kitchen close prep | n8n + GHL | Evening staffing, last orders |
| Content review | n8n + Supabase | Review next day's scheduled content |

### 9:00 PM — Nightly KPI Digest (MCP — Daily KPI Digest)
| Task | System | Action |
|---|---|---|
| Revenue summary | n8n + Supabase | Daily revenue by brand/division |
| Outreach summary | n8n + Supabase | Messages sent, responses, calls booked |
| Social summary | n8n + Supabase | Posts, engagement, follower changes |
| Pipeline summary | n8n + Supabase | Stage movements, new leads, closed deals |
| Event summary | n8n + Supabase | Ticket sales, RSVPs, event outcomes |
| Task completion | n8n + Supabase | Queue completion rate |
| Incident summary | n8n + Supabase | New issues, resolved, escalated |
| Next day preview | n8n + Supabase | Key tasks, events, deadlines for tomorrow |

## Task Routing System (OPS-01)

### Priority Matrix
| Priority | Criteria | Response Time | Escalation |
|---|---|---|---|
| P0 — Critical | Revenue-blocking, legal exposure, safety | Immediate | Dr. Dorsey within 30 min |
| P1 — High | Client/partner facing, deadline today | Within 2 hours | Division lead within 4 hours |
| P2 — Medium | Internal deadline this week | Within 24 hours | Weekly review if overdue |
| P3 — Low | Improvement, optimization, nice-to-have | Within 1 week | Monthly review |

### Routing Rules
| Task Type | Routes To | Division | Priority Default |
|---|---|---|---|
| Kitchen issue (equipment, supply, complaint) | Kitchen ops manager | Casper Group | P1 |
| Event logistics (venue, vendor, production) | Event ops manager | HugLife / Scented Flowers | P1 (if within 7 days) |
| Outreach response (hot lead, partner reply) | Outreach team | All | P1 |
| Content production (scheduled, deadline) | Creative team | All | P2 |
| CRM update (data entry, enrichment) | CRM team / VA | All | P3 |
| Financial (invoice, payment, reconciliation) | Finance | All | P2 |
| Technical (workflow error, API issue, system down) | Tech/automation | All | P0 (if system down), P2 (other) |
| Legal (contract, NDA, compliance) | Legal / Dr. Dorsey | All | P1 |

## Inventory Management

### Casper Group — Kitchen Inventory
| Item Category | Minimum Stock | Reorder Point | Supplier |
|---|---|---|---|
| Core ingredients (per brand recipe) | 3-day supply | When below 2-day supply | Primary food supplier |
| Packaging (containers, bags, utensils) | 1-week supply | When below 3-day supply | Packaging vendor |
| Branding materials (stickers, labels, inserts) | 2-week supply | When below 1-week supply | Print vendor |
| Cleaning supplies | 1-week supply | When below 3-day supply | Cleaning vendor |

### Bodegea — Product Inventory
| Product | Minimum Stock | Reorder Point | Lead Time |
|---|---|---|---|
| Infinity Water (cases) | 500 cases | 200 cases | 2 weeks |
| Pronto Energy (cases) | 300 cases | 100 cases | 2 weeks |
| Noir bottles | 100 bottles | 50 bottles | 4 weeks |

### Event Inventory
| Item | Per-Event Need | Storage | Restock Trigger |
|---|---|---|---|
| Wristbands | 500-2000 per event | Warehouse | 2 weeks before event |
| Branded materials (banners, signage) | Per event spec | Warehouse | 3 weeks before event |
| Sponsor activation materials | Per partner agreement | Warehouse | 2 weeks before event |

## Incident Logging (OPS-05)

### Incident Categories
| Category | Examples | Severity Default |
|---|---|---|
| Equipment failure | Kitchen equipment down, AV malfunction | P0 if during service/event |
| Staffing | No-show, walk-out, injury | P1 |
| Quality | Food complaint, service complaint | P1 |
| Vendor | Late delivery, no-show, quality issue | P1 if event-related |
| Technical | System outage, API failure, workflow error | P0 if revenue-blocking |
| Safety | Injury, hazard, security issue | P0 always |
| Financial | Payment failure, overcharge, budget overrun | P1 |
| Legal | Permit issue, compliance violation, complaint | P0 |
| Customer | Formal complaint, social media issue, refund | P1 |

### Incident Response Protocol
```
1. LOG — Record incident in Supabase incidents table (who, what, when, where, severity)
2. ASSESS — Determine priority level and assign owner
3. CONTAIN — Take immediate action to prevent escalation
4. COMMUNICATE — Notify relevant stakeholders (Slack, email, phone based on severity)
5. RESOLVE — Fix the issue
6. DOCUMENT — Record resolution, root cause, time to resolve
7. REVIEW — Post-incident review for P0/P1 incidents
8. PREVENT — Update SOPs if systemic issue identified
```

## KPI Dashboard Structure

### Enterprise-Level KPIs
| KPI | Target | Frequency | Source |
|---|---|---|---|
| Total revenue (all divisions) | Monthly target | Daily tracking | Supabase + API |
| Active kitchens | Target count | Daily | GHL + Supabase |
| Events executed (month) | Monthly target | Real-time | Supabase |
| Pipeline value (all divisions) | Target value | Daily | Supabase |
| Outreach volume | Daily/weekly target | Daily | n8n logs |
| Response rate | >15% | Weekly | Supabase |
| Task completion rate | >85% | Daily | Supabase daily_queues |
| Incident resolution time | <4hrs (P0), <24hrs (P1) | Per incident | Supabase incidents |

### Division-Level KPIs
See analytics-reporting skill for detailed KPI definitions per division.

## Output Modes

### MODE 1: Daily Operations Report
Full daily status across all divisions:
1. Revenue vs. target
2. Task queue status
3. Active incidents
4. Pipeline movements
5. Content published
6. Outreach volume
7. Event status
8. Tomorrow's priorities

### MODE 2: Operations Dashboard Design
Design operational dashboard:
1. Widget specifications
2. Data sources
3. Refresh frequency
4. Alert thresholds
5. User permissions
6. Mobile optimization

### MODE 3: Task Queue Generation
Build daily execution queue:
1. Pull all pending items
2. Priority scoring
3. Owner assignment
4. Time estimates
5. Dependencies identified
6. Completion tracking plan

### MODE 4: Incident Response Plan
Design incident management:
1. Category definitions
2. Severity criteria
3. Response protocols
4. Escalation paths
5. Communication templates
6. Post-incident review process

### MODE 5: Operational SOP
Create standard operating procedure:
1. Process definition
2. Step-by-step instructions
3. Decision points
4. Quality checks
5. Timing expectations
6. Escalation triggers

### MODE 6: Cross-Division Coordination
Plan multi-division operations:
1. Shared resource identification
2. Timeline synchronization
3. Conflict resolution
4. Communication plan
5. Accountability matrix

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Morning ops | n8n CASPER OPS | Cron 6 AM | Run morning checks |
| Daily queue | n8n MCP — Daily Queue Builder | Cron 8 AM | Build and distribute queue |
| KPI digest | n8n MCP — Daily KPI Digest | Cron 9 PM | Generate nightly report |
| Incident alert | n8n webhook | Incident logged | Route to owner, notify stakeholders |
| Inventory alert | n8n scheduled | Twice daily | Check stock levels, flag reorders |
| Task escalation | n8n cron | Hourly | Check for overdue tasks, escalate |
| Staff check-in | n8n + Slack | Cron 6 AM | Confirm team availability |
| Event readiness | n8n + Supabase | T-1 day | Final event readiness check |
