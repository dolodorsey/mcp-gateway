---
name: lead-pipeline
description: >
  Lead generation, scoring, nurturing, and conversion engine for all Kollective divisions. Use
  this skill whenever the user wants to: score leads, build nurture sequences, manage lead
  queues, create lead lists, design retargeting audiences, segment contacts, build daily
  outreach queues, or optimize any lead-to-close workflow. Triggers include: 'lead', 'lead
  score', 'lead nurture', 'lead list', 'daily queue', 'hot lead', 'warm lead', 'cold lead',
  'retarget', 'segment', 'nurture sequence', 'drip campaign', 'lead routing', 'conversion'.
  Maps to n8n workflows: GROWTH-02 Lead Enrichment, GROWTH-04 Audience Segmentation,
  MCP — Daily Queue Builder, MCP — Retarget Audience Builder. Cross-references crm-pipeline,
  data-enrichment, and outreach-playbook.
---

# Lead Pipeline Engine

Lead generation, scoring, nurturing, and conversion system for all Kollective divisions. The pipeline transforms raw contacts into qualified opportunities through systematic enrichment, scoring, and nurture.

## Core Principle

Not all leads are equal. The Lead Pipeline Engine ensures the right leads get the right attention at the right time. High-value prospects get immediate personalized outreach. Low-quality contacts get automated nurture until they qualify. Nothing sits unscored or unrouted.

## Lead Sources

| Source | Division | Quality Tier | Volume |
|---|---|---|---|
| Google Maps scraping | Casper Group | Medium | High |
| IG profile research | HugLife, Scented Flowers | Medium-High | Medium |
| LinkedIn research | All B2B divisions | High | Low-Medium |
| Event attendee lists | HugLife | Medium | High (per event) |
| Website form submissions | All | Medium-High | Low-Medium |
| Referrals | All | High | Low |
| Cold list imports (CSV) | All | Low-Medium | Variable |
| GHL inbound | All (22 locations) | Medium-High | Medium |
| Social DM inquiries | All | High (inbound) | Low-Medium |
| Partner introductions | HugLife, Scented Flowers | Very High | Low |
| Google Ads leads | Umbrella Group | Medium | Medium |
| Eventbrite data | HugLife | Medium | Per event |

## Lead Scoring Model

### Score Components (0-100)

#### Profile Score (0-40 points)
| Factor | Points | Logic |
|---|---|---|
| Decision maker title confirmed | 10 | Title matches target list (CMO, GM, Owner, Director, etc.) |
| Company size match | 5 | Fits ideal customer profile for division |
| Industry match | 5 | Relevant industry for the offer |
| Location match | 5 | In active market (ATL, HOU, LA, DC, CLT, MIA) |
| Valid email confirmed | 5 | Email validated, not bounced |
| Valid phone confirmed | 5 | Phone validated |
| LinkedIn profile found | 3 | Professional presence confirmed |
| Instagram presence | 2 | Social presence for B2C/event leads |

#### Engagement Score (0-30 points)
| Factor | Points | Logic |
|---|---|---|
| Replied to outreach | 10 | Any response (positive or neutral) |
| Opened email (2+ times) | 5 | Multiple opens indicate interest |
| Clicked link in email | 5 | Active engagement |
| Visited website | 3 | Tracking pixel / analytics |
| Attended past event | 5 | Repeat engagement |
| Engaged on social (like, comment, DM) | 2 | Social interaction |

#### Timing Score (0-15 points)
| Factor | Points | Logic |
|---|---|---|
| Inbound inquiry | 10 | They came to us |
| Responded within 24 hours | 5 | Fast response = high interest |
| Active in last 7 days | 5 | Recent engagement |
| Active in last 30 days | 3 | Relatively recent |
| No activity in 60+ days | -5 | Negative points for dormancy |

#### Fit Score (0-15 points)
| Factor | Points | Logic |
|---|---|---|
| Budget authority indicated | 5 | Title or conversation suggests budget control |
| Explicit interest stated | 5 | "Yes, let's talk" or similar |
| Referral source | 5 | Came through trusted referral |
| Competitor relationship | -3 | Already committed elsewhere (partial deduction) |

### Score Routing
| Score | Tier | Action | Urgency |
|---|---|---|---|
| 80-100 | HOT | Immediate personalized outreach, book call same day | Within 2 hours |
| 60-79 | WARM | Personalized sequence within 24 hours | Within 24 hours |
| 40-59 | COOL | Template outreach, nurture sequence | Within 3 days |
| 20-39 | COLD | Automated drip only | Weekly batch |
| 0-19 | RAW | Enrich before any outreach | Queue for enrichment |

## Nurture Sequences

### HOT Lead (80-100) — 5-Day Sprint
```
Day 1: Personalized email (reference their specific business/role)
       + Phone call attempt
       + IG DM (if handle known)
Day 2: Text message (if phone available)
       + Follow-up email if no response
Day 3: Phone call attempt #2
       + LinkedIn connection request (if B2B)
Day 4: "Quick question" email (shorter, different angle)
Day 5: Final touch — "closing the loop" email
       → If no response: Move to WARM, re-engage in 14 days
```

### WARM Lead (60-79) — 10-Day Nurture
```
Day 1: Email (Template A — primary pitch)
Day 3: IG DM or text message
Day 5: Follow-up email (Template B — different angle)
Day 7: Phone call attempt
Day 10: Email (Template C — value-add content or new development)
Day 14: Final email — "keeping you on the list"
       → If no response: Move to COOL, re-engage in 30 days
```

### COOL Lead (40-59) — 30-Day Drip
```
Week 1: Email (general awareness)
Week 2: Social engagement (comment on their content)
Week 3: Email (case study or social proof)
Week 4: Email (new event/product/opportunity)
       → If no response: Move to COLD
       → If engagement: Rescore and upgrade
```

### COLD Lead (0-39) — 90-Day Drip
```
Month 1: Monthly newsletter only
Month 2: Monthly newsletter + one targeted email
Month 3: Re-engagement attempt ("Something new")
       → If no engagement: Archive (but keep in database)
       → If engagement: Rescore, potentially upgrade to COOL/WARM
```

## Daily Queue Builder (MCP — Daily Queue Builder)

### Queue Generation Logic
```
[Cron: 8 AM daily]
  → [Pull all leads from Supabase where:]
    → score >= 60 AND last_action_date < today AND status = ACTIVE
    → OR score >= 40 AND assigned_sequence_step_due = today
    → OR score >= 80 AND created_at = yesterday (new HOT leads)
  → [Score and rank by priority:]
    → HOT leads first (80+)
    → Overdue actions second
    → Scheduled sequence steps third
  → [Assign to team members based on:]
    → Division assignment
    → Current workload (max 50 actions/day per person)
    → Skill match (phone vs email vs DM)
  → [Write to daily_queues table]
  → [Push to Slack with summary]
  → [Track completion through the day]
```

### Queue Item Format
```
| Priority | Contact | Brand | Score | Action | Channel | Due | Owner |
|---|---|---|---|---|---|---|---|
| P1 | John Smith (GM, XYZ Restaurant) | Casper | 92 | First outreach — call + email | Phone + Email | 9 AM | Team A |
| P2 | Sarah Lee (Marketing Dir, Brand Co) | HugLife | 85 | Follow-up — deck sent 3 days ago | Email + Phone | 10 AM | Team B |
```

## Audience Segmentation (GROWTH-04)

### Primary Segments
| Segment | Criteria | Size (est.) | Primary Use |
|---|---|---|---|
| Kitchen Prospects | Restaurant owners/GMs in active markets | ~5,000 | Casper Group outreach |
| Sponsor Prospects | Marketing/partnership decision makers | ~3,000 | HugLife + Scented Flowers outreach |
| Event Enthusiasts | Past attendees, social engagers | ~15,000 | Event promotion |
| Food Customers | Delivery orderers, food followers | ~50,000 | Casper Group marketing |
| Service Leads | Business owners needing services | ~5,000 | Umbrella Group outreach |
| Product Buyers | DTC customers, retail buyers | ~2,000 | Bodegea distribution |
| Media/Press | Journalists, bloggers, influencers | ~1,000 | PR outreach |
| VIP/Inner Circle | High-value contacts across all divisions | ~500 | Exclusive access, priority treatment |

### Dynamic Lists (auto-updating via n8n)
| List Name | Update Logic | Refresh |
|---|---|---|
| ATL_HOT_LEADS | Score >= 80 AND city = Atlanta | Real-time |
| SPONSOR_WARM | Score >= 60 AND division = HugLife/Scented AND stage <= DECK_SENT | Daily |
| KITCHEN_READY | Score >= 70 AND division = Casper AND stage = QUALIFIED | Daily |
| EVENT_BUYERS | Purchased ticket in last 90 days | Weekly |
| DORMANT_90DAY | No activity in 90 days AND score was >= 50 | Weekly |
| RE_ENGAGE_QUEUE | Dormant + previously engaged + not unsubscribed | Weekly |

## Retarget Audience Builder (MCP — Retarget Audience Builder)

### Retarget Segments for Paid Ads
| Audience | Source | Platform | Use |
|---|---|---|---|
| Website visitors (30 day) | Pixel | Meta, Google | Event promotion, brand awareness |
| Event page visitors (no purchase) | Pixel | Meta | Ticket abandonment retarget |
| Past attendees | Email list | Meta (Custom Audience) | Next event promotion |
| Lookalike: past attendees | Meta algorithm | Meta | New audience acquisition |
| Email openers (no click) | Email platform | Meta (Custom Audience) | Re-engagement |
| IG engagers | IG business | Meta | Event promotion |

## Output Modes

### MODE 1: Lead Scoring Model
Design scoring system for a specific division:
1. Profile factors with weights
2. Engagement factors with weights
3. Timing factors
4. Fit factors
5. Score thresholds and routing rules
6. Automation triggers per tier

### MODE 2: Nurture Sequence Design
Multi-touch nurture for a specific segment:
1. Sequence length and cadence
2. Channel per touch
3. Message framework per touch
4. Exit conditions (upgraded or archived)
5. Re-engagement triggers
6. Performance benchmarks

### MODE 3: Daily Queue Configuration
Configure the daily outreach queue:
1. Selection criteria
2. Priority ranking logic
3. Assignment rules
4. Capacity limits
5. Tracking method
6. Completion reporting

### MODE 4: Segment Builder
Create a targeted audience segment:
1. Criteria definition (Supabase query)
2. Estimated size
3. Quality distribution
4. Recommended action per segment
5. Automation integration

### MODE 5: Lead Source Audit
Analyze lead source effectiveness:
1. Volume by source
2. Quality by source
3. Conversion rate by source
4. Cost per lead by source
5. Best/worst sources
6. Optimization recommendations

### MODE 6: Pipeline Conversion Analysis
Diagnose conversion bottlenecks:
1. Stage-by-stage conversion rates
2. Drop-off points identified
3. Average time per stage
4. Score correlation with conversion
5. Channel effectiveness comparison
6. Improvement recommendations

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Lead scoring | n8n + Supabase | New contact or engagement event | Calculate/recalculate score |
| Queue builder | n8n MCP — Daily Queue Builder | Cron 8 AM | Generate daily queue |
| Sequence trigger | n8n + Supabase | Score threshold crossed | Enroll in appropriate nurture |
| Score upgrade | n8n + Supabase | Engagement detected | Rescore + potentially upgrade tier |
| Retarget sync | n8n MCP — Retarget Audience Builder | Weekly | Push segments to ad platforms |
| Enrichment trigger | n8n + GROWTH-02 | New RAW lead | Auto-enrich before scoring |
| Dormancy detection | n8n scheduled | Weekly | Flag dormant leads, trigger re-engagement |
| Source tracking | n8n + Supabase | Lead created | Tag source, update source analytics |
