---
name: operations-command
description: >
  Central operations management and task routing system for all Kollective divisions. Use
  this skill whenever the user wants to: manage daily operations, route tasks, monitor KPIs,
  build operational dashboards, create task systems, manage inventory alerts, coordinate
  staff schedules, handle incident logging, or oversee any operational workflow. Triggers
  include: 'operations', 'ops', 'task', 'KPI', 'dashboard', 'daily report', 'inventory',
  'staffing', 'schedule', 'incident', 'operational', 'command center', 'daily queue',
  'morning report'. Maps to n8n workflows: CASPER OPS, MCP Dashboard API,
  MCP — Daily Queue Builder, MCP — Daily KPI Digest. Maps to agents: OPS-01 through OPS-06.
---

# Operations Command Center

Centralized operational control system for the Kollective Hospitality Group.

## Daily Operations Cycle

### 6:00 AM — Morning Ops (CASPER OPS)
For each Casper Group location:
1. Pull inventory data → flag low stock → auto-order if threshold met
2. Pull staffing schedule → flag gaps → alert manager
3. Pull yesterday's revenue → flag declining trends
4. Scrape Google reviews → flag negatives → draft responses
5. Cross-location analysis → identify patterns
6. Generate daily report → email to Dr. Dorsey

### 8:00 AM — Daily Queue Build (MCP — Daily Queue Builder)
Across all brands:
1. Hot leads queue (score 80+) → immediate outreach
2. Follow-up queue (touches due today) → sequence execution
3. New leads queue (overnight intake) → scoring
4. Re-engage queue (warm leads going cold) → nudge
5. Task queue (pending tasks by brand) → routing

### 9:00 PM — Nightly KPI Digest (MCP — Daily KPI Digest)
1. Outreach performance (emails sent, DMs sent, replies, calls booked)
2. Lead pipeline status (new, scored, converting, closed)
3. Social media metrics (engagement, follower growth, DM response rate)
4. Event pipeline (RSVPs, ticket sales, sponsor status)
5. Revenue tracking (by brand, by location, by division)

## Task Routing System (OPS-01)

### Priority Matrix
| Priority | Response Time | Examples |
|---|---|---|
| P0 — Critical | Immediate | System down, legal issue, security incident |
| P1 — Urgent | Within 2 hours | Hot lead response, sponsor reply, media inquiry |
| P2 — High | Within 24 hours | Content production, follow-up sequences, event logistics |
| P3 — Normal | Within 48 hours | List building, enrichment, reporting |
| P4 — Low | Within 1 week | Documentation, optimization, long-term planning |

### Routing Rules
```
INBOUND TASK →
  ├── Brand identified? → Route to brand-specific queue
  │   ├── Casper Group → OPS queue (inventory, staffing, revenue)
  │   ├── HugLife → EVENT queue (logistics, sponsors, promotion)
  │   ├── Scented Flowers → EVENT queue (exhibitions, sponsors)
  │   ├── Umbrella Group → SERVICE queue (leads, quotes, delivery)
  │   ├── Bodegea → PRODUCT queue (distribution, sampling)
  │   └── All → GENERAL queue
  ├── Type identified? → Route to function queue
  │   ├── Outreach → OUTREACH queue
  │   ├── Content → CREATIVE queue
  │   ├── Technical → TECH queue
  │   └── Financial → FINANCE queue
  └── Priority assigned? → Sort within queue
```

## Inventory Management (OPS-02)

### Casper Group — Kitchen Inventory
| Item Category | Reorder Threshold | Auto-Order | Alert |
|---|---|---|---|
| Proteins | 2-day supply | Yes | Manager + Dr. Dorsey |
| Produce | 1-day supply | Yes | Manager |
| Dry goods | 3-day supply | Yes | Manager |
| Packaging | 2-day supply | Yes | Manager |
| Cleaning supplies | 1-week supply | No | Manager |

### Bodegea — Product Inventory
| Product | Reorder Threshold | Alert |
|---|---|---|
| Infinity Water | 500 units | Distribution manager |
| Pronto Energy | 300 units | Distribution manager |
| Noir | 100 units | Distribution manager |
| Stush | 200 units | Distribution manager |

## Staff Scheduling (OPS-04)

### Scheduling Rules
- Minimum 48-hour advance notice for schedule changes
- No single-coverage shifts for customer-facing locations
- Event staff confirmed 7 days before event
- Training shifts scheduled within 5 days of hire

## Incident Logging (OPS-05)

### Incident Categories
| Category | Severity | Escalation Path |
|---|---|---|
| Health/Safety | Critical | Immediate → Dr. Dorsey + Legal |
| Equipment failure | High | Within 1 hour → Ops Manager |
| Customer complaint | Medium | Within 4 hours → Brand Manager |
| Staff issue | Medium | Within 24 hours → HR/Ops |
| System outage | Critical | Immediate → Tech team |
| Financial discrepancy | High | Within 2 hours → Finance + Dr. Dorsey |

## KPI Dashboard Structure

### Division-Level KPIs
| Division | Primary KPIs |
|---|---|
| Casper Group | Revenue/location, order volume, avg ticket, review rating, inventory efficiency |
| HugLife | RSVPs, check-in rate, sponsor pipeline value, content yield, social growth |
| Scented Flowers | Ticket sales, sponsor pipeline, media coverage, social reach |
| Umbrella Group | Leads generated, conversion rate, service delivery time, NPS |
| Bodegea | Units sold, distribution locations, retail velocity, sampling conversions |

### Operational Health Metrics
- System uptime (n8n workflows, Supabase, integrations)
- Outreach velocity (messages sent/day across all brands)
- Response rate (replies/messages sent)
- Pipeline velocity (leads moving through stages)
- Task completion rate (tasks closed/tasks created)

## n8n Workflow Map

| Action | Workflow | Trigger |
|---|---|---|
| Morning ops report | CASPER OPS | Daily 6AM schedule |
| Daily queue build | MCP — Daily Queue Builder | Morning schedule |
| Nightly KPI digest | MCP — Daily KPI Digest | Nightly schedule |
| Dashboard data | MCP Dashboard API | On-demand webhook |
| Task routing | MCP Core Router | Webhook |
| Command execution | Command Executor | Webhook |
