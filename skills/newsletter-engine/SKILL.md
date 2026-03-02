---
name: newsletter-engine
description: >
  Newsletter creation and email marketing engine for all Kollective brands. Use this skill
  whenever the user wants to: create newsletters, build email marketing campaigns, design
  email templates, write email content, manage subscriber lists, plan drip sequences,
  design welcome series, create re-engagement campaigns, write subject lines, or execute
  any email marketing strategy. Triggers include: 'newsletter', 'email marketing', 'email
  campaign', 'subscriber', 'email template', 'email blast', 'mailing list', 'email design',
  'drip campaign', 'welcome series', 'email sequence', 'subject line', 'open rate',
  'click rate', 'unsubscribe'. Maps to n8n workflow: NEWSLETTER ENGINE, EMAIL SEND
  THROTTLE. Maps to agents: CREATIVE-06 (email content generation).
---

# Newsletter Engine

Email marketing and newsletter production for the entire Kollective portfolio. Every email sent represents a brand — it must feel like that brand wrote it, designed it, and sent it intentionally.

## Core Principle

Email is the most owned channel the Kollective has. Social platforms can change algorithms. Ads can get expensive. But a subscriber list is an asset that compounds. Every newsletter builds trust, drives action, and deepens brand relationship.

## Newsletter Types

| Type | Frequency | Purpose | Brands | Length |
|---|---|---|---|---|
| Brand newsletter | Weekly/Bi-weekly | Updates, content, engagement | Per-brand | 3-5 sections |
| Event announcement | As needed | Event promotion + RSVP | HugLife, Scented Flowers | 2-3 sections |
| Product launch | As needed | New product/menu launch | Casper, Bodegea | 2-4 sections |
| Partner update | Monthly | Sponsor/partner communications | HugLife, Scented Flowers | 3-4 sections |
| Digest | Weekly | Multi-brand roundup | Kollective-wide | 5-7 sections |
| Welcome series | Automated | New subscriber onboarding | All brands | 3-5 emails |
| Re-engagement | Triggered | Win back inactive subscribers | All brands | 3 emails |
| VIP/insider | Monthly | Exclusive content for top segment | HugLife, Scented Flowers | 2-3 sections |
| Post-event recap | After events | Highlights, photos, next event | HugLife | 3-4 sections |
| Sponsor report | Monthly/Quarterly | Partner performance data | HugLife, Scented Flowers | 4-5 sections |

## Email Template Structure

### Standard Newsletter Layout
```
[PREHEADER TEXT — 85-100 chars, complements subject line]

[HEADER]
  Brand logo (linked to website)
  Navigation links (optional — 3 max)

[HERO SECTION]
  Full-width image or graphic (600px wide)
  Headline (8 words max)
  Subheadline (15 words max)
  Primary CTA button

[SECTION 1: Primary Content]
  Image + text (side by side or stacked)
  2-3 short paragraphs
  Secondary CTA (if needed)

[SECTION 2: Supporting Content]
  Cards or grid (2-3 items)
  Brief descriptions
  Links to full content

[SECTION 3: Quick Hits]
  3-4 bullet-style items
  Links, dates, announcements

[CTA BLOCK]
  Full-width background color
  Single clear action
  Button (contrasting color)

[FOOTER]
  Social media icons (linked)
  Unsubscribe link (required)
  Physical address (CAN-SPAM required)
  "You're receiving this because..." line
  Manage preferences link
```

### Event Announcement Layout
```
[PREHEADER: Event name + city + date]

[HERO: Event flyer or promotional image — full width]

[EVENT DETAILS]
  Event name (large)
  Date + Time
  City + Venue (if public)
  1-2 sentence description

[CTA: GET TICKETS / RSVP]

[ADDITIONAL INFO]
  What to expect
  Dress code (if applicable)
  Special guests / lineup teaser

[SOCIAL PROOF]
  Past event photos (2-3)
  Testimonial or press quote

[FINAL CTA: Don't miss this]

[FOOTER]
```

### Welcome Series Structure (3-5 emails)
```
Email 1 (Immediate): Welcome + brand story + what to expect
Email 2 (Day 2): Best content / most popular — social proof
Email 3 (Day 5): Exclusive offer or insider access
Email 4 (Day 8): Community invitation (follow socials, join events)
Email 5 (Day 14): Personalized recommendation based on signup source
```

## Subject Line Framework

### Formulas (rotate by type)
| Formula | Example | Best For |
|---|---|---|
| Direct | "Paparazzi LA: June 14 Tickets Live" | Event announcements |
| Curiosity | "The one thing we're not supposed to share yet..." | Pre-release / exclusive |
| Urgency | "48 hours: Gangsta Gospel Juneteenth tickets" | Limited availability |
| Personal | "{{Name}}, your spot at Black Ball" | VIP / personalized |
| Number | "5 events. 3 cities. 1 summer." | Roundups / digests |
| Question | "Ready for the World Cup window?" | Engagement / opens |
| Social proof | "1,200 people already confirmed" | Momentum / FOMO |
| Behind-the-scenes | "Inside the Forever Futbol build" | Content / story |

### Subject Line Rules
- Under 50 characters ideal (40 for mobile-first)
- No ALL CAPS
- No excessive punctuation (max 1 exclamation)
- No spam triggers: "FREE", "ACT NOW", "LIMITED TIME!!!"
- Preview text (preheader) must complement — never repeat — the subject
- Test 2-3 variants per send (A/B test subject lines on 20% of list, winner sends to 80%)
- Personalization tokens increase opens 15-25%: use {{first_name}} when available

## Brand-Specific Email Voice

### Casper Group Emails
- **Tone:** Clean, appetizing, warm — food-forward language
- **Visuals:** Food photography dominant, brand-colored headers
- **CTA style:** "Order Now" / "See the Menu" / "Find Your Location"
- **Per-brand variation:** Each restaurant brand (Angel Wings, Pasta Bish, etc.) has distinct header design, color scheme, and copy personality

### HugLife Event Emails
- **Tone:** Insider energy, exclusive access, cultural magnetism
- **Visuals:** Event photography, bold typography, dark backgrounds
- **CTA style:** "Get Tickets" / "RSVP Now" / "Lock Your Spot"
- **Per-event variation:** Each event brand has its own email template matching its visual identity (Gangsta Gospel = gold/black, Paparazzi = flash/silver, etc.)

### Forever Futbol / Scented Flowers Emails
- **Tone:** Museum-grade authority, cultural reverence, editorial quality
- **Visuals:** Gallery-style layout, editorial photography, premium typography
- **CTA style:** "Reserve Your Visit" / "Explore the Exhibition" / "Partner With Us"
- **Sponsor-facing emails:** Different template — corporate, data-backed, partnership-focused

### Umbrella Group Emails
- **Tone:** Professional, trust-building, solution-oriented
- **Visuals:** Clean corporate design, service-specific imagery
- **CTA style:** "Schedule a Consultation" / "Get Started" / "Learn More"

### Bodegea Product Emails
- **Tone:** Premium product confidence, lifestyle aspiration, sensory language
- **Visuals:** Product photography, lifestyle shots, clean layout
- **CTA style:** "Shop Now" / "Try It" / "Find Yours"

## Sending Rules

### Throttling (EMAIL SEND THROTTLE)
| Rule | Limit | Action if Exceeded |
|---|---|---|
| Send rate | 200 emails/hour per brand account | Queue remainder, send next hour |
| Daily max | 2,000 per brand account | Pause, resume next day |
| New domain warmup | Week 1: 50/day → Week 4: 500/day | Gradual increase per schedule |
| Bounce rate | Pause if > 5% | Clean list before resuming |
| Spam complaint rate | Pause if > 0.1% | Review content + list source |
| Unsubscribe rate | Alert if > 2% per send | Review content relevance |

### Optimal Send Times
| Audience | Best Send Time | Best Days | Worst Times |
|---|---|---|---|
| B2B (sponsors, partners) | 9-11 AM local | Tuesday-Thursday | Weekends, Monday AM |
| B2C (event attendees) | 12-2 PM or 7-9 PM | Thursday-Saturday | Monday-Wednesday AM |
| Food customers | 11 AM or 5 PM | Any day | Before 9 AM |
| VIP/insider | 8 PM | Friday | Monday |
| Welcome series | Immediate, then spaced | Any day | N/A (automated) |

### List Hygiene Protocol
1. **Hard bounces:** Remove immediately after first bounce
2. **Soft bounces:** Remove after 3 consecutive soft bounces
3. **Unsubscribes:** Process within 24 hours (legally required within 10 days)
4. **Inactive (90 days no open):** Move to re-engagement campaign
5. **Re-engagement fail (no open after 3 re-engagement emails):** Remove from active list, move to archive
6. **Purchased lists:** NEVER — violates CAN-SPAM and destroys deliverability
7. **Monthly audit:** Remove duplicates, fix formatting errors, validate email syntax
8. **Segment health:** Each segment must have >15% open rate or trigger review

## Subscriber Segmentation

### Primary Segments
| Segment | Criteria | Content Strategy |
|---|---|---|
| Event Enthusiasts | Attended 2+ events OR opened 3+ event emails | Priority event announcements, early access |
| Food Lovers | Ordered from Casper brands OR engaged with food content | Menu updates, new brand launches, food events |
| Culture Seekers | Engaged with museum/art content | Exhibition announcements, cultural programming |
| VIP | Top 10% by engagement score | Exclusive content, early access, insider updates |
| New Subscribers | Joined within 30 days | Welcome series, brand introduction |
| Dormant | No opens in 60+ days | Re-engagement campaign |
| Partners/Sponsors | Business contacts | Partner updates, performance reports, opportunities |
| City-Specific | Based on location | City-relevant events and activations |

### Dynamic Lists (auto-updating via n8n)
- ATL subscribers → Atlanta events
- HOU subscribers → Houston events
- LA subscribers → Los Angeles events
- World Cup interested → Forever Futbol updates
- High engagement (>50% open rate) → VIP upgrade candidates

## Campaign Architecture

### Single-Event Campaign (7 emails)
```
T-30: Save the date (awareness)
T-21: Early bird tickets live (action)
T-14: Lineup / details reveal (excitement)
T-7: Last chance pricing (urgency)
T-3: Final reminder (FOMO)
T-1: Tomorrow night (anticipation)
T+2: Recap + next event (retention)
```

### Product Launch Campaign (5 emails)
```
Day 1: Teaser — something's coming
Day 3: Reveal — the product / brand
Day 5: Deep dive — story, ingredients, why
Day 7: Social proof — reviews, testimonials
Day 10: Last call — limited availability or special offer
```

### Re-Engagement Campaign (3 emails)
```
Email 1: "We miss you" — highlight what they're missing
Email 2: "Here's what's new" — best recent content/events
Email 3: "Last chance" — will be removed from list if no engagement
```

## Output Modes

### MODE 1: Full Newsletter Creation
Complete newsletter including:
1. Subject line (3 variants for A/B testing)
2. Preheader text
3. Full email body copy (section by section)
4. CTA text and placement
5. Image direction for each section
6. Brand voice compliance check
7. Send time recommendation
8. Segment targeting recommendation

### MODE 2: Subject Line Generation
Generate 10 subject line options with:
- Formula type for each
- Predicted open rate ranking
- Preheader text pair for each
- A/B test recommendation (top 2-3)

### MODE 3: Email Sequence Design
Multi-email campaign architecture:
- Number of emails and timing
- Subject line for each
- Content brief for each
- Trigger/automation logic
- Exit conditions
- Performance benchmarks

### MODE 4: Template Design Brief
Design specification for email template:
- Layout wireframe (text-based)
- Color specifications (brand-matched)
- Typography direction
- Image requirements
- Mobile optimization notes
- HTML/CSS framework recommendation

### MODE 5: List Strategy
Subscriber list management plan:
- Segmentation architecture
- Growth strategy (how to build list)
- Hygiene schedule
- Re-engagement triggers
- Deliverability optimization
- Compliance checklist

### MODE 6: Performance Audit
Analyze email performance:
- Open rate by segment
- Click rate by content type
- Unsubscribe patterns
- Best-performing subject lines
- Optimal send times (from data)
- Improvement recommendations

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Newsletter send | n8n NEWSLETTER ENGINE | Webhook / scheduled | Generate + send email |
| Throttle check | n8n EMAIL SEND THROTTLE | Pre-send | Rate limit enforcement |
| Subscriber ingest | n8n LINDA — Form Ingest | Form submission | Add to Supabase + segment |
| Welcome series | n8n automated | New subscriber | Trigger 5-email sequence |
| Re-engagement | n8n scheduled | 90-day inactivity | Trigger 3-email win-back |
| A/B test routing | n8n function | Send trigger | Split list, track, send winner |
| List cleanup | n8n scheduled | Weekly | Remove bounces, process unsubs |
| Performance log | n8n + Supabase | Post-send | Log opens, clicks, unsubs to analytics |
| Event email trigger | n8n + Supabase | New event created | Auto-generate announcement email |
| Post-event recap | n8n + Supabase | Event date +48hrs | Auto-generate recap email |

## Quality Gates

Before sending any email:
- [ ] Subject line under 50 characters
- [ ] Preheader text present and complementary
- [ ] Brand voice matches target brand
- [ ] All links tested and working
- [ ] Unsubscribe link present and functional
- [ ] Physical address in footer (CAN-SPAM)
- [ ] Images have alt text
- [ ] Mobile preview checked
- [ ] Personalization tokens rendering correctly
- [ ] Send time optimized for target segment
- [ ] List is clean (no bounces, no unsubs)
- [ ] A/B test configured (if applicable)
