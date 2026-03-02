---
name: analytics-reporting
description: >
  KPI tracking, reporting, and analytics engine for the entire Kollective operation. Use this
  skill whenever the user wants to: define KPIs, build reports, create dashboards, track
  metrics, analyze performance, generate automated reports, design analytics workflows, or
  measure any aspect of the business. Triggers include: 'KPI', 'analytics', 'report',
  'dashboard', 'metrics', 'tracking', 'performance', 'ROI', 'conversion rate', 'daily digest',
  'weekly report', 'monthly report'. Maps to n8n workflows: MCP — Daily KPI Digest, MCP
  Dashboard API. Cross-references all other skills for division-specific metrics.
---

# Analytics & Reporting Engine

Enterprise-wide KPI tracking, reporting, and analytics for all Kollective divisions. Every decision should be informed by data. Every system should produce measurable outcomes.

## Core Principle

What gets measured gets managed. What gets reported gets improved. The analytics engine ensures every Kollective division has clear metrics, automated reporting, and actionable insights — not vanity numbers.

## KPI Framework by Division

### Outreach KPIs (All Divisions)
| KPI | Definition | Target | Frequency |
|---|---|---|---|
| Messages sent | Total outreach messages (all channels) | 100+/day across teams | Daily |
| Open rate | Emails opened / emails sent | >35% | Per campaign |
| Response rate | Replies received / messages sent | >15% | Weekly |
| Calls booked | Meetings scheduled from outreach | >10/week | Weekly |
| Call-to-close rate | Deals closed / calls completed | >20% | Monthly |
| Pipeline value added | New opportunity value from outreach | Division target | Weekly |
| Cost per lead | Total outreach cost / leads generated | <$50 | Monthly |

### Social Media KPIs (All Brands)
| KPI | Definition | Target | Frequency |
|---|---|---|---|
| Follower growth | Net new followers | >5%/month | Monthly |
| Engagement rate | (Likes + Comments + Saves + Shares) / Reach | >3% | Weekly |
| Reach | Unique accounts reached | Brand-dependent | Weekly |
| Story views | Average views per story | >15% of followers | Weekly |
| Reel views | Average views per reel | >2x follower count | Per reel |
| DM response rate | DM replies / DMs sent | >20% | Weekly |
| Link clicks | Clicks from bio/stories/posts | Event-dependent | Per campaign |
| Saves | Content saves | >2% of reach | Weekly |
| Shares | Content shares | >1% of reach | Weekly |

### Event KPIs (HugLife + Scented Flowers)
| KPI | Definition | Target | Frequency |
|---|---|---|---|
| Ticket sales | Tickets sold vs. capacity | >80% capacity | Per event |
| Revenue per event | Total revenue (ticket + bar + sponsor) | Event budget dependent | Per event |
| Cost per attendee | Total event cost / attendees | Minimize | Per event |
| Sponsor revenue | Total sponsor/partner revenue | Event target | Per event |
| Content captured | Photos + videos produced | 100+ photos, 10+ videos | Per event |
| Social mentions | Posts/stories tagging the event | >50 per event | Per event |
| Repeat attendance | % of attendees who attended before | >20% | Per event |
| NPS (if measured) | Net Promoter Score | >50 | Per event |

### Revenue KPIs (Casper Group)
| KPI | Definition | Target | Frequency |
|---|---|---|---|
| Orders per kitchen | Daily order count per active kitchen | 30+/day | Daily |
| Revenue per kitchen | Daily revenue per kitchen | $500+/day | Daily |
| Active kitchens | Number of kitchens currently operating | Growth target | Weekly |
| Kitchen activation rate | Kitchens activated / kitchens contacted | >10% | Monthly |
| Average order value | Revenue / orders | Brand-dependent | Weekly |
| Platform coverage | % of delivery platforms active per kitchen | 100% (all 3) | Weekly |
| Profit margin per kitchen | Net profit / gross revenue | >25% (target split) | Monthly |
| Churn rate | Kitchens deactivated / total active | <5%/month | Monthly |

### Pipeline KPIs (All Divisions)
| KPI | Definition | Target | Frequency |
|---|---|---|---|
| Total pipeline value | Sum of all opportunity values | Division target | Daily |
| Stage conversion rate | % moving from one stage to next | Stage-dependent | Weekly |
| Win rate | Deals won / deals created | >15% | Monthly |
| Average deal size | Revenue / deals won | Division-dependent | Monthly |
| Pipeline velocity | (# deals × avg size × win rate) / avg days to close | Maximize | Monthly |
| Stalled deals | Opportunities exceeding max days in stage | <10% of pipeline | Weekly |
| Average days to close | Mean time from lead to signed | Division-dependent | Monthly |

## Automated Report Templates

### Daily Digest (9 PM — automated via MCP Daily KPI Digest)
```
KOLLECTIVE DAILY DIGEST — {Date}

REVENUE
├── Casper Group: ${today} (target: ${target}) {▲/▼ vs yesterday}
├── Event tickets sold today: {count} (${revenue})
├── Sponsor deals closed: {count} (${value})
└── Total: ${total}

OUTREACH
├── Messages sent: {total} (Email: {x} / DM: {x} / Text: {x} / Phone: {x})
├── Responses received: {total} ({response_rate}%)
├── Calls booked: {count}
└── Pipeline value added: ${value}

SOCIAL
├── Posts published: {count}
├── Total reach: {number}
├── Engagement rate: {rate}%
└── New followers: +{count}

PIPELINE
├── New leads: {count}
├── Stage movements: {count}
├── Stalled: {count} (flagged)
└── Total pipeline value: ${value}

EVENTS
├── Upcoming (7 days): {list}
├── Tickets sold today: {count}
└── Production milestones due: {list}

TASKS
├── Completed: {count}/{total} ({completion_rate}%)
├── Overdue: {count}
└── Escalated: {count}

TOMORROW'S PRIORITIES
1. {priority_1}
2. {priority_2}
3. {priority_3}
```

### Weekly Summary (Monday AM)
```
KOLLECTIVE WEEKLY SUMMARY — Week of {Date}

REVENUE SUMMARY
├── Total revenue: ${total} (target: ${target})
├── By division: {breakdown}
└── vs. Last week: {comparison}

OUTREACH SUMMARY
├── Total messages: {count}
├── Response rate: {rate}%
├── Calls booked: {count}
├── Deals closed: {count} (${value})
└── Best performing channel: {channel}

SOCIAL SUMMARY
├── Total reach: {number}
├── Engagement rate: {rate}%
├── Best performing post: {post}
├── Follower growth: +{count} ({growth_rate}%)
└── Top brand by engagement: {brand}

EVENT SUMMARY
├── Events held: {count}
├── Total attendance: {number}
├── Revenue: ${total}
└── Upcoming this week: {list}

PIPELINE HEALTH
├── New opportunities: {count} (${value})
├── Pipeline velocity: {score}
├── Win rate: {rate}%
├── Stalled: {count}
└── Forecast (30 day): ${forecast}

TOP WINS: {list}
TOP CONCERNS: {list}
NEXT WEEK PRIORITIES: {list}
```

### Monthly Report (1st of month)
All weekly metrics aggregated + trend analysis + MoM comparison + division P&L summaries + strategic recommendations.

## Dashboard Structure (Command Center)

### Enterprise View (Home Dashboard)
| Widget | Data Source | Refresh |
|---|---|---|
| Revenue ticker (real-time) | Supabase + APIs | Real-time |
| Pipeline value by division | Supabase opportunities | Hourly |
| Active outreach volume | n8n logs | Real-time |
| Social engagement summary | Platform APIs | Every 6 hours |
| Event calendar (upcoming) | Supabase events | Daily |
| Task completion rate | Supabase daily_queues | Hourly |
| Alert feed (incidents, escalations) | Supabase incidents | Real-time |
| Top KPI trends (7-day sparklines) | Supabase analytics | Daily |

### Division-Level Dashboards
Each division gets its own view with division-specific KPIs, filtered data, and relevant action items.

### Brand-Level Dashboards
Each brand within a division can be drilled into for granular metrics.

## Output Modes

### MODE 1: KPI Definition
Define KPIs for a specific division or initiative:
1. Metrics with definitions
2. Targets with justification
3. Data sources
4. Calculation formulas
5. Reporting frequency
6. Alert thresholds

### MODE 2: Report Template
Design an automated report:
1. Report sections
2. Data fields per section
3. Visualization types
4. Distribution list
5. Frequency and timing
6. Automation integration

### MODE 3: Dashboard Design
Design a dashboard view:
1. Widget specifications
2. Data sources per widget
3. Refresh frequency
4. Layout/arrangement
5. Filter options
6. Mobile optimization

### MODE 4: Performance Analysis
Deep-dive on a specific metric:
1. Current performance vs. target
2. Trend analysis (30/60/90 day)
3. Breakdown by segment
4. Root cause of underperformance
5. Improvement recommendations
6. Projected impact of changes

### MODE 5: Automated Reporting Workflow
Design the automation behind reports:
1. Data collection triggers
2. Aggregation logic
3. Template rendering
4. Distribution method
5. Error handling
6. Archive storage

### MODE 6: Scorecard
Executive summary scorecard:
1. Top-line metrics (5-7)
2. Red/Yellow/Green status
3. Trend arrows
4. Key wins and concerns
5. Action items
6. 30-day outlook

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Daily digest | n8n MCP — Daily KPI Digest | Cron 9 PM | Generate and distribute daily report |
| Weekly summary | n8n scheduled | Monday 8 AM | Generate and distribute weekly report |
| Monthly report | n8n scheduled | 1st of month | Generate comprehensive monthly report |
| Real-time dashboard | n8n + Supabase | Webhook/cron | Update dashboard data |
| Alert triggers | n8n + Supabase | Threshold crossed | Send alert to relevant owner |
| Pipeline snapshot | n8n cron | Daily midnight | Capture pipeline analytics snapshot |
| Social metrics pull | n8n + APIs | Every 6 hours | Pull and store platform metrics |
| Event metrics | n8n + Supabase | Post-event | Generate event performance report |
