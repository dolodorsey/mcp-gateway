---
name: sponsor-pitch
description: >
  Sponsor acquisition and partnership pitch engine for HugLife Events and Scented Flowers
  exhibitions. Use this skill whenever the user wants to: pitch sponsors, create sponsor
  decks, build partnership proposals, define category slots, structure sponsor tiers,
  write sponsor outreach, handle sponsor objections, or manage any sponsorship pipeline.
  Triggers include: 'sponsor', 'sponsorship', 'partner deck', 'category slot', 'brand
  partner', 'sponsor pitch', 'sponsor tier', 'sponsor outreach', 'partnership proposal'.
  Maps to n8n workflow: SPONSOR OUTREACH ENGINE. Maps to agents: OUTREACH-04.
---

# Sponsor Pitch Engine

Sponsor acquisition system for HugLife Events and Scented Flowers Museum Series.

## Positioning Rule

We NEVER say "sponsorship." We say "partnership placement" and "category slot."

We are not asking for money. We are offering controlled category ownership inside a premium platform.

## Category Slot Architecture

### HugLife Events — Available Categories
| Category | Examples | Exclusivity |
|---|---|---|
| Water | Infinity Water (internal), or external brand | Per-tour or per-event |
| Energy | Pronto Energy (internal), or external brand | Per-tour |
| Spirits / Tequila | External brand | Per-event or per-tour |
| Beer | External brand | Per-event |
| Hookah / Smoke | External brand | Per-event |
| Apparel | External brand or collaboration | Per-tour |
| Rideshare / Transportation | Uber, Lyft, etc. | Per-tour |
| Tech | External brand | Per-tour |
| Media | External brand | Per-tour |
| Beauty / Grooming | External brand | Per-event type |
| Cannabis / CBD | Where legal, external brand | Per-event |
| Food / Snack | External brand | Per-event |

### Forever Futbol Museum — Available Categories
| Category | Examples | Exclusivity |
|---|---|---|
| Water | Premium water brand | Per-city or full tour |
| Energy | Energy drink brand | Per-city or full tour |
| Spirits | Tequila/beer brand | Per-city |
| Travel / Airline | Airline or hotel brand | Full tour |
| Rideshare | Transportation brand | Full tour |
| Apparel | Soccer/fashion brand | Full tour |
| Tech | Tech/innovation brand | Full tour |
| Media | Streaming/media brand | Full tour |

## Sponsor Tier Structure

### Tier 1: Title Partner ($$$)
- Category exclusivity across ALL cities
- Museum/event integration (custom branded moments)
- Logo on all marketing materials
- Content package (professional photos, video, social tags)
- VIP access + hospitality at every activation
- First right of refusal for next cycle

### Tier 2: Category Partner ($$)
- Category exclusivity in SELECT cities
- On-site integration (sampling, lounge, signage)
- Content package (photos, social mentions)
- VIP access at partner events
- Co-branded content opportunity

### Tier 3: Supporting Partner ($)
- On-site presence (sampling, signage)
- Social media mentions
- Logo inclusion on select materials
- Event access

### Tier 4: In-Kind / Product Partner
- Product provision in exchange for integration
- Brand mentions and social content
- On-site sampling placement
- Good for brands entering the space

## Pitch Deck Outline

### Slide 1: Cover
[Brand Logo] + "Partner Placement Opportunity" + Year

### Slide 2: The Platform
What [HugLife/Forever Futbol] is — 2-3 sentences max. Touring. Multi-city. Premium.

### Slide 3: The Opportunity Window
Why now — cultural moment, attention concentration, rare access.

### Slide 4: The Calendar
Cities + dates + event types. Visual map.

### Slide 5: Audience Profile
Demographics, psychographics, estimated reach per city.

### Slide 6: Partner Integration
How brands appear inside the experience. Photos/mockups.

### Slide 7: Category Slots
Available categories. Show which are open vs held.

### Slide 8: What Partners Receive
Tiered benefits breakdown. Clean comparison table.

### Slide 9: Content Deliverables
What content the partner gets back. Photo, video, social proof.

### Slide 10: Past Activations (if available)
Social proof. Photos from previous events. Testimonials.

### Slide 11: Next Steps
"10-minute call → Category hold → Agreement → Integration planning"

### Slide 12: Contact
Name, title, email, phone. Clean.

## Objection Handling

| Objection | Response |
|---|---|
| "We need to see numbers" | "We'll share projections by city on the call. The value is: multi-city + cultural moment + category ownership." |
| "Our budget is allocated" | "Understood. We also do product-only placements. Category presence without the cash outlay." |
| "We already sponsor events" | "This is a platform, not a single event. Repeat touchpoints and touring visibility." |
| "Send the deck" | "Pre-release — we do a quick 10-min call first to match you to the right slot. Deck goes out right after." |
| "What's the ROI?" | "Content yield + on-site impressions + social reach + category ownership. We'll model it on the call." |
| "We need board approval" | "Totally understand. Let me send a 1-pager you can route internally. What's the best email?" |

## Internal Product Placement Priority

Before going external, check if a Bodegea product fills the category:
- **Water** → Infinity Water (internal)
- **Energy** → Pronto Energy (internal)
- **Espresso Liqueur** → Noir (internal)

If internal product fills the slot, no external partner needed for that category. Revenue stays in-house.

## n8n Workflow Integration

| Action | Workflow | Trigger |
|---|---|---|
| Generate sponsor pitch | SPONSOR OUTREACH ENGINE | Webhook |
| Send sponsor email | PR SEND PITCH + FOLLOWUPS | Hourly schedule |
| Track sponsor pipeline | OUTREACH COMMAND CENTER | Every 4 hours |
| Log sponsor touch | MCP — Touch Logger | Webhook |
| Score sponsor lead | MCP — Lead Intake + Score | Webhook |
