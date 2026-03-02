---
name: newsletter-engine
description: >
  Newsletter creation and email marketing engine for all Kollective brands. Use this skill
  whenever the user wants to: create newsletters, build email marketing campaigns, design
  email templates, write email content, manage subscriber lists, or execute any email
  marketing strategy. Triggers include: 'newsletter', 'email marketing', 'email campaign',
  'subscriber', 'email template', 'email blast', 'mailing list', 'email design'.
  Maps to n8n workflow: NEWSLETTER ENGINE, EMAIL SEND THROTTLE.
---

# Newsletter Engine

Email marketing and newsletter production for the Kollective portfolio.

## Newsletter Types

| Type | Frequency | Purpose | Brands |
|---|---|---|---|
| Brand newsletter | Weekly/Bi-weekly | Updates, content, engagement | Per-brand |
| Event announcement | As needed | Event promotion + RSVP | HugLife, Scented Flowers |
| Product launch | As needed | New product/menu announcements | Casper, Bodegea |
| Partner update | Monthly | Sponsor/partner communications | HugLife, Scented Flowers |
| Digest | Weekly | Multi-brand roundup | Kollective-wide |

## Email Template Structure

```html
[HEADER: Brand logo + tagline]

[HERO: Feature image/graphic + headline]

[SECTION 1: Primary content — news, update, story]

[SECTION 2: Secondary content — event, product, highlight]

[CTA BLOCK: Primary action button]

[SECTION 3: Quick links / Additional content]

[FOOTER: Unsubscribe + social links + address]
```

## Subject Line Framework

### Formulas (rotate)
- Direct: "[Brand]: [What's inside]"
- Curiosity: "The one about [teaser]..."
- Urgency: "[Event] is [timeframe] away"
- Personal: "[Name], your [brand-specific hook]"
- Number: "[X] things happening at [Brand] this month"

### Rules
- Under 50 characters ideal
- No ALL CAPS
- No excessive punctuation
- Preview text (preheader) complements — doesn't repeat — the subject

## Sending Rules

### Throttling (EMAIL SEND THROTTLE)
- Maximum 200 emails per hour per brand account
- Stagger sends across time windows
- Warm up new sending domains gradually
- Monitor bounce rate — pause if > 5%
- Monitor spam complaints — pause if > 0.1%

### Timing
| Audience | Best Send Time | Best Days |
|---|---|---|
| B2B (sponsors, partners) | 9-11 AM local | Tuesday-Thursday |
| B2C (event attendees) | 12-2 PM or 7-9 PM | Thursday-Saturday |
| Food customers | 11 AM or 5 PM | Any day |

### List Hygiene
- Remove hard bounces immediately
- Remove soft bounces after 3 consecutive
- Remove unsubscribes within 24 hours
- Re-engage campaign for 90-day inactive → remove if no response
- Never purchase lists

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Newsletter send | NEWSLETTER ENGINE | Webhook |
| Throttle check | EMAIL SEND THROTTLE | Pre-send webhook |
| Subscriber management | LINDA — Form Ingest | Webhook |
