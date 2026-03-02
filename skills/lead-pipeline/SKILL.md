---
name: lead-pipeline
description: >
  Lead generation, scoring, enrichment, and nurture pipeline for all Kollective brands. Use
  this skill whenever the user wants to: capture leads, score prospects, build lead lists,
  create nurture sequences, enrich contact data, segment audiences, manage lead routing,
  or build any lead generation system. Triggers include: 'lead', 'leads', 'prospect', 'lead
  scoring', 'lead gen', 'nurture', 'drip campaign', 'lead list', 'contact enrichment',
  'audience segment', 'lead routing', 'pipeline', 'funnel', 'qualification'. Maps to n8n
  workflows: LEAD REVENUE, MCP — Lead Intake + Score, MCP — Daily Queue Builder,
  MCP — Retarget Audience Builder. Maps to agents: GROWTH-01 through GROWTH-06.
---

# Lead Pipeline

End-to-end lead management system across all Kollective divisions.

## Lead Sources

| Source | Division | Capture Method |
|---|---|---|
| Instagram DMs | All brands | SOCIAL SEND DMS → identity |
| Website forms | All brands | Webhook → Lead Intake |
| Event RSVPs | HugLife | Eventbrite/Partiful → RSVP Ingester |
| Sponsor inquiries | HugLife / Scented Flowers | Email/form → Lead Intake |
| Kitchen inquiries | Casper Group | Phone/email/form → Lead Intake |
| Service requests | Umbrella Group | Form/phone → Lead Intake |
| Product interest | Bodegea | DM/form → Lead Intake |
| Referrals | All | Referral form → Lead Intake |
| Scraping | All | GROWTH-01 LeadScraper → leads_raw |

## Lead Scoring Model

### Score Components (0-100)

| Factor | Points | Description |
|---|---|---|
| **Fit Score** (0-40) | | How well they match target profile |
| Industry match | 0-15 | Correct industry/vertical |
| Location match | 0-10 | In target geography |
| Company size | 0-10 | Appropriate scale |
| Title/role match | 0-5 | Decision maker vs gatekeeper |
| **Engagement Score** (0-40) | | How they've interacted |
| Email opened | +5 | Per open |
| Link clicked | +10 | Per click |
| Reply received | +15 | Any reply |
| Call completed | +20 | Spoke with them |
| Form submitted | +10 | Inbound interest |
| Social engagement | +5 | Liked/commented/DM'd |
| **Recency Score** (0-20) | | How recent the engagement |
| Last 24 hours | 20 | Hot |
| Last 7 days | 15 | Warm |
| Last 30 days | 10 | Cooling |
| 30+ days | 5 | Cold |

### Score Routing

| Score | Classification | Action |
|---|---|---|
| 80-100 | 🔥 HOT | Immediate alert → personal outreach → book call |
| 50-79 | 🟡 WARM | 7-day nurture sequence → escalate on engagement |
| 20-49 | 🔵 COOL | 30-day drip → re-score monthly |
| 0-19 | ⚪ COLD | 90-day drip → archive if no engagement |

## Lead Enrichment Pipeline (GROWTH-02)

### Data Points to Enrich
- Full name, title, company
- Email (verified), phone
- LinkedIn profile
- Instagram handle
- Company website, size, industry
- Location (city, state)
- Decision-making authority level

### Enrichment Sources
- LinkedIn (manual/slow scrape)
- Instagram bio parsing
- Google search
- Company website scraping
- Email verification services

## Nurture Sequences

### HOT Lead (80-100) — 5-Day Sprint
```
Day 0: Personal email from brand rep (reference their specific interest)
Day 1: Text message follow-up with binary time options
Day 2: Phone call attempt
Day 3: Second email (different angle, more value)
Day 5: "Closing the loop" email — last touch before pause
```

### WARM Lead (50-79) — 7-Day Nurture
```
Day 0: Initial outreach email (brand-specific playbook)
Day 3: Value-add email (case study, social proof, content)
Day 5: Text message (casual, direct)
Day 7: Phone call or final email
→ If engagement: escalate to HOT sequence
→ If no engagement: move to COOL drip
```

### COOL Lead (20-49) — 30-Day Drip
```
Week 1: Brand awareness email
Week 2: Value content (article, video, event invite)
Week 3: Social proof email (partner testimonials, numbers)
Week 4: Re-engagement attempt with new angle
→ If engagement: escalate to WARM
→ If no engagement: move to COLD
```

### COLD Lead (0-19) — 90-Day Drip
```
Month 1: Brand newsletter inclusion
Month 2: Event invitation or product update
Month 3: "Still interested?" with easy re-engagement CTA
→ If engagement: escalate to COOL
→ If no engagement: archive (keep in database, stop outreach)
```

## Audience Segmentation (GROWTH-04)

### Primary Segments
| Segment | Criteria | Brands Using |
|---|---|---|
| Restaurant owners/GMs | Food industry, management title | Casper Group |
| Brand marketing leads | Marketing/partnerships title, brand company | HugLife, Scented Flowers |
| Local influencers | 5K+ followers, city-specific, culture/food/nightlife | All |
| Event attendees | RSVP'd or attended past event | HugLife |
| Product buyers | Purchase history or inquiry | Bodegea |
| Service seekers | Service inquiry or referral | Umbrella Group |
| Media contacts | Journalist, editor, producer | All (PR) |
| Sponsor prospects | Brand partnerships role, relevant company | HugLife, Scented Flowers |

### Dynamic Lists (auto-updating)
- "Hot leads this week" — score 80+ in last 7 days
- "Engaged but not converted" — opened 3+ emails, no call booked
- "Event pipeline [City]" — leads in target city for upcoming event
- "Sponsor prospects [Brand]" — scored for specific brand partnership
- "Re-engage" — warm leads gone cold in last 30 days

## Daily Queue Builder (MCP — Daily Queue Builder)

Every morning, the system builds:
1. **Hot Queue:** All leads scored 80+ → immediate outreach
2. **Follow-Up Queue:** Leads due for next touch in sequence
3. **New Leads Queue:** Unscored leads from overnight intake
4. **Re-Engage Queue:** Warm leads at risk of going cold

## Retarget Audience Builder (MCP — Retarget Audience Builder)

Nightly build of retargeting audiences:
- Event attendees → next event in same city
- Email engagers → social media retarget
- Website visitors → email capture follow-up
- Sponsor prospects → multi-touch campaign

## n8n Workflow Map

| Action | Workflow | Trigger |
|---|---|---|
| Lead intake + scoring | MCP — Lead Intake + Score | Webhook |
| Lead enrichment | Custom (GROWTH-02) | Scheduled |
| Daily queue build | MCP — Daily Queue Builder | Morning schedule |
| Nurture sequence | LEAD REVENUE | Webhook on score route |
| Audience retarget | MCP — Retarget Audience Builder | Nightly schedule |
| Touch logging | MCP — Touch Logger | Webhook per touch |
| KPI reporting | MCP — Daily KPI Digest | Nightly schedule |
