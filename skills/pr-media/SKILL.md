---
name: pr-media
description: >
  PR, media relations, and press outreach engine for all Kollective brands. Use this skill
  whenever the user wants to: write press releases, pitch media, build media lists, create
  press kits, manage PR campaigns, handle media inquiries, write op-eds, build media
  relationships, or execute any PR strategy. Triggers include: 'PR', 'press', 'media',
  'press release', 'media list', 'press kit', 'journalist', 'media pitch', 'press coverage',
  'media outreach', 'publication', 'editorial'. Maps to n8n workflows: PR INTAKE + DEDUP,
  PR ENRICH + SCORE, PR SEND PITCH + FOLLOWUPS, PR REPLY ROUTER.
  Maps to agents: OUTREACH-04, OUTREACH-07, OUTREACH-08.
---

# PR & Media Engine

Press relations and media outreach system for the Kollective portfolio.

## Media Targeting

### Outlet Tiers
| Tier | Examples | Approach |
|---|---|---|
| Tier 1 (National) | NYT, Forbes, CNN, GMA, Vogue | Warm intro or agency placement |
| Tier 2 (Trade/Vertical) | Eater, Food & Wine, Hypebeast, Complex | Direct pitch, exclusivity offer |
| Tier 3 (Local/Regional) | Atlanta Magazine, Houston Chronicle, LAist | Direct pitch, local angle |
| Tier 4 (Digital/Blog) | Local food bloggers, culture blogs, niche outlets | DM + email, easy access |
| Tier 5 (Social Media) | Journalists with social presence | DM first, email follow-up |

### Beat Mapping
| Brand/Division | Target Beats |
|---|---|
| Casper Group | Food, restaurant industry, ghost kitchens, delivery, entrepreneurship |
| HugLife Events | Entertainment, nightlife, culture, events, lifestyle |
| Scented Flowers | Arts, culture, sports (futbol), museums, exhibitions |
| Bodegea | CPG, beverages, wellness, Black-owned business |
| Umbrella Group | Business services, legal, real estate, auto |
| Opulence Designs | Art, design, culture, creativity |
| Playmakers | Sports, nonprofit, youth development, community |

## Press Release Template

```
FOR IMMEDIATE RELEASE

[HEADLINE — Active verb, newsworthy, clear]
[SUBHEAD — Additional context, location, date]

[CITY, STATE] — [DATE] — [Opening paragraph: Who, What, When, Where, Why.
Lead with the most newsworthy element. 2-3 sentences max.]

[Second paragraph: Context, significance, quotes from principal (Dr. Dorsey
or brand lead). Why this matters now.]

[Third paragraph: Details — dates, locations, logistics, specifics.
What the reader needs to know to take action or cover the story.]

[Fourth paragraph: Background on the brand/organization. Brief history,
scale, relevance. 2-3 sentences.]

[Boilerplate: Standard "About [Brand]" paragraph. Consistent across releases.]

###

MEDIA CONTACT:
[Name]
[Title]
[Email]
[Phone]
```

## Pitch Email Template

### Subject Line Options (rotate)
- "Story idea: [Newsworthy hook] — [Brand]"
- "[Brand] launching [what] in [city] — [date]"
- "Exclusive: [brand] + [cultural moment/partnership]"
- "Quick pitch: [1-line hook]"

### Body
```
Hi [Reporter Name],

[1 sentence: Why you're reaching out to THEM specifically — reference their beat or recent article.]

[2-3 sentences: The story. What's happening, why it matters, why now.]

[1 sentence: What you can offer — interview, exclusive, early access, photos/video.]

[1 sentence: Binary ask — "Quick call today or tomorrow?" or "Can I send the full release?"]

Best,
[Name]
[Brand]
[Phone]
```

## PR Pipeline Stages

```
NEW → Contact identified, not yet pitched
ENRICHED → Contact scored and verified
PITCHED → Initial pitch sent
FOLLOWED UP → 1-2 follow-ups sent
INTERESTED → Replied with interest
CONFIRMED → Coverage confirmed / interview scheduled
PUBLISHED → Story live
ARCHIVED → Not interested / no response after sequence
```

## PR Sequence (5-Touch)

1. **Day 0:** Pitch email (personalized, beat-specific)
2. **Day 3:** Follow-up email ("Bumping this up — wanted to make sure it landed")
3. **Day 7:** Different angle email (new hook, same story)
4. **Day 10:** Quick text or DM if social presence exists
5. **Day 14:** Final touch ("Closing the pitch window — last look")

## Press Kit Components

### Standard Press Kit
1. Press release (current)
2. Brand fact sheet (1-page overview)
3. High-res logos (PNG + SVG, light + dark versions)
4. Key photos (3-5 hero images, properly credited)
5. Founder bio + headshot (Dr. Dorsey)
6. Brand leadership bios (as relevant)
7. FAQ sheet (common questions pre-answered)
8. Social media handles + links
9. Past press coverage links (if available)

## n8n Workflow Map

| Action | Workflow | Trigger |
|---|---|---|
| Contact intake + dedup | PR INTAKE + DEDUP | Webhook |
| Contact enrichment + scoring | PR ENRICH + SCORE | Every 2 hours |
| Pitch + follow-up sends | PR SEND PITCH + FOLLOWUPS | Hourly |
| Reply routing | PR REPLY ROUTER | Webhook on reply |
| Touch logging | MCP — Touch Logger | Webhook |
