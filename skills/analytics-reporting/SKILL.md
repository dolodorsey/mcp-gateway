---
name: analytics-reporting
description: >
  Analytics, reporting, and KPI tracking system for all Kollective operations. Use this skill
  whenever the user wants to: build reports, track KPIs, analyze performance, create
  dashboards, review metrics, build scorecards, or analyze any operational data. Triggers
  include: 'analytics', 'report', 'KPI', 'metrics', 'dashboard', 'performance', 'scorecard',
  'ROI', 'data analysis', 'weekly report', 'monthly report'. Maps to n8n workflows:
  MCP Dashboard API, MCP — Daily KPI Digest. Maps to agents: GROWTH-06, EVENT-04,
  OUTREACH-08.
---

# Analytics & Reporting Engine

Performance tracking and intelligence across all Kollective divisions.

## KPI Framework

### Outreach KPIs
| Metric | Formula | Target | Frequency |
|---|---|---|---|
| Outreach volume | Total messages sent (email + DM + text + calls) | 100+/day across all brands | Daily |
| Reply rate | Replies / Messages sent | 15%+ | Weekly |
| Call book rate | Calls booked / Replies | 30%+ | Weekly |
| Conversion rate | Deals closed / Calls completed | 20%+ | Monthly |
| Touch-to-close | Average touches before close | <8 | Monthly |
| Cost per acquisition | Total outreach cost / Deals closed | Track trend | Monthly |

### Social Media KPIs
| Metric | Target | Frequency |
|---|---|---|
| Follower growth rate | 2-5% monthly per account | Weekly |
| Engagement rate | 3%+ (IG), 1%+ (FB), 5%+ (TikTok) | Weekly |
| DM response rate | Reply within 4 hours | Daily |
| Content production | 14+ posts/week per brand | Weekly |
| Story views | Track trend | Weekly |
| Reel performance | Track avg views, shares | Weekly |

### Event KPIs
| Metric | Target | Frequency |
|---|---|---|
| RSVP count | Per-event capacity target | Per-event |
| Check-in rate | 60%+ of RSVPs | Per-event |
| Sponsor pipeline value | Track total + per-brand | Monthly |
| Content yield | 50+ photos, 5+ reels per event | Per-event |
| Post-event engagement | Social lift within 48 hours | Per-event |
| NPS | 8+ average | Per-event |

### Revenue KPIs (Casper Group)
| Metric | Target | Frequency |
|---|---|---|
| Revenue per location | Track trend, flag declines | Daily |
| Average order value | Track trend | Daily |
| Order volume | Track trend, flag drops | Daily |
| Review rating | 4.5+ stars average | Weekly |
| New location activation | Per quarter target | Monthly |

### Pipeline KPIs
| Metric | Frequency |
|---|---|
| Total pipeline value | Weekly |
| Opportunities by stage | Weekly |
| Stage conversion rates | Monthly |
| Average time per stage | Monthly |
| Stale opportunities (30+ days) | Weekly |

## Report Templates

### Daily Digest (automated — MCP Daily KPI Digest)
```
KOLLECTIVE DAILY DIGEST — [Date]

OUTREACH
- Messages sent: [N] (email: [N], DM: [N], text: [N])
- Replies received: [N] ([%] reply rate)
- Calls booked: [N]

SOCIAL
- New followers: [N] across [N] accounts
- Engagement: [top performing post + stats]
- DMs received: [N] (responded: [N])

EVENTS
- Upcoming: [Next event name, date, RSVP count]
- Sponsor pipeline: [N] active, $[value]

OPERATIONS
- Tasks completed: [N] / [N] created
- Alerts: [Any P0/P1 items]

REVENUE (Casper)
- Total yesterday: $[N]
- Top location: [Name] — $[N]
- Flag: [Any declining locations]
```

### Weekly Summary
```
KOLLECTIVE WEEKLY SUMMARY — Week of [Date]

WINS THIS WEEK
1. [Win 1]
2. [Win 2]
3. [Win 3]

OUTREACH PERFORMANCE
[Table: brand | sent | replies | calls booked | deals advanced]

SOCIAL GROWTH
[Table: account | followers gained | engagement rate | top post]

EVENT PIPELINE
[Table: event | date | RSVPs | sponsors confirmed | status]

PRIORITIES NEXT WEEK
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

BLOCKERS
- [Blocker 1 + proposed resolution]
```

## Dashboard Structure (MCP Dashboard API)

### Command Center View
- Real-time outreach velocity (messages/hour by brand)
- Pipeline funnel visualization (opportunities by stage)
- Event countdown (next 3 events with RSVP status)
- Social media pulse (engagement last 24 hours)
- Alert feed (P0/P1 items requiring attention)

### Brand-Level Views
Each brand gets its own dashboard slice showing brand-specific KPIs filtered by `tenant_id`.

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Dashboard data | MCP Dashboard API | On-demand webhook |
| Daily KPI digest | MCP — Daily KPI Digest | Nightly schedule |
| Outreach reporting | OUTREACH COMMAND CENTER | Every 4 hours |
| Lead pipeline reporting | MCP — Daily Queue Builder | Morning schedule |
