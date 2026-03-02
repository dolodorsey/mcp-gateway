---
name: presentation-engine
description: >
  Presentation and deck creation engine for all Kollective brands. Use this skill whenever
  the user wants to: create pitch decks, sponsor decks, investor presentations, event recap
  decks, brand overview presentations, partnership proposals, media kits, or any slide-based
  deliverable. Triggers include: 'deck', 'presentation', 'pitch deck', 'sponsor deck',
  'investor deck', 'slides', 'pptx', 'media kit', 'one-pager', 'partnership proposal',
  'brand deck', 'event recap'. Always use in combination with brand-voice-engine for tone
  and creative-production for visual direction. Maps to n8n workflow: SPONSOR OUTREACH
  ENGINE (deck delivery step). Use the pptx skill for file generation.
---

# Presentation Engine

Enterprise deck and presentation system for the Kollective Hospitality Group. Every deck represents a brand — it must feel like that brand built it, not a generic template.

## Core Principle

Decks are the highest-stakes content the Kollective produces. A sponsor deck determines whether a brand gets a $50K partnership or gets ignored. An investor deck determines funding. A media kit determines press coverage. Every slide must earn its place.

## Deck Archetypes

### 1. Sponsor/Partner Deck
**Purpose:** Convert brand decision makers into locked partner slots
**Audience:** Marketing directors, CMOs, brand partnership leads, agency reps
**Tone:** Confident, exclusive, premium — not desperate, not salesy
**Length:** 12-18 slides
**Structure:**
1. Cover — Brand mark + tagline + "Partner Placement [Year]"
2. The Moment — Why now matters (World Cup window, cultural shift, market timing)
3. What We Are — Positioning statement (3-4 bullets max)
4. The Platform — Multi-city/multi-event footprint with dates
5. The Audience — Demographics, psychographics, cultural alignment
6. Category Slots — Available categories with visual examples
7. What Partners Get — Benefits grid (integration, visibility, content, protection)
8. Integration Examples — Mockups or past examples of brand integration
9. Content Yield — Sample content pieces partners receive
10. Multi-City Map — Visual footprint across markets
11. The Roster — Confirmed partners (or "roster in progress" if pre-launch)
12. Investment Tiers — Pricing structure (tiered, not single price)
13. Process — "How We Lock It" — 4-step process to partnership
14. Contact — Decision maker info + "Let's reserve your category slot"

### 2. Investor/Funding Deck
**Purpose:** Secure investment or strategic funding
**Audience:** Investors, family offices, strategic partners, funds
**Tone:** Enterprise authority, data-driven, vision + traction
**Length:** 15-20 slides
**Structure:**
1. Cover — Kollective Hospitality Group mark
2. Vision — One sentence that captures the empire
3. The Problem — Market gap or opportunity
4. The Solution — How the Kollective fills it
5. The Portfolio — All 8 divisions, 48+ brands visualized
6. Traction — Revenue, events, locations, contacts, growth metrics
7. Business Model — Revenue streams per division
8. Market Opportunity — TAM/SAM/SOM with supporting data
9. Competitive Landscape — Why no one else has this structure
10. Technology — Command Center, automation infrastructure, AI integration
11. Team — Dr. Dorsey + key operators
12. Financial Projections — 3-year model with key assumptions
13. Use of Funds — Where investment goes (by division)
14. Milestones — What's been achieved + what's next
15. The Ask — Investment amount, structure, terms
16. Contact + Next Steps

### 3. Event Recap Deck
**Purpose:** Document event success for sponsors, press, internal review
**Audience:** Partners, press, internal team
**Tone:** Celebratory but data-backed
**Length:** 10-15 slides
**Structure:**
1. Cover — Event name + date + city
2. By The Numbers — Attendance, impressions, content pieces, partner activations
3. The Moment — Hero image + 1-line summary
4. Audience Breakdown — Demographics of actual attendees
5. Partner Activations — How each partner was integrated (with photos)
6. Content Yield — Sample photos, reels, influencer posts
7. Social Metrics — Impressions, engagement, hashtag performance
8. Media Coverage — Press mentions, features, interviews
9. Testimonials — Partner quotes, attendee quotes
10. Lessons + Improvements — What's better next time
11. Next Event — Date, city, what's evolving
12. Thank You + Contact

### 4. Brand Overview / Media Kit
**Purpose:** Introduce a single brand for press, partnerships, or internal alignment
**Audience:** Press, potential partners, new team members
**Tone:** Matches the specific brand voice
**Length:** 8-12 slides
**Structure:**
1. Cover — Brand mark + tagline
2. What We Are — 3-line positioning
3. The Experience — What people encounter
4. Visual World — Photography, design language, color palette
5. Audience — Who we serve
6. Footprint — Where we operate
7. Key Metrics — Numbers that matter
8. Press/Social — Coverage highlights
9. Partnership Opportunities — How brands can participate
10. Contact

### 5. One-Pager / Leave-Behind
**Purpose:** Single-page summary for quick decision making
**Audience:** Anyone who needs the TL;DR
**Tone:** Dense, scannable, high-impact
**Length:** 1 page (front) or 2 pages (front/back)
**Structure:**
- Header: Brand mark + tagline
- Left column: What + Why + How
- Right column: Key metrics + dates + footprint
- Bottom: Contact + CTA + QR code

## Brand-Specific Deck Rules

### Casper Group Decks
- **Visual:** Clean, corporate, minimal — dark backgrounds, white/gold typography
- **Tone:** Program allocation feel — "here's what's been set up for you"
- **NDA requirement:** Full operational details only in NDA-protected decks
- **Never include:** Individual brand names in pre-NDA materials
- **Always include:** Profit participation structure (post-NDA), discretion language

### HugLife Event Decks
- **Visual:** Bold, cultural, energetic — event photography, strong typography
- **Tone:** Platform play — "this is where your brand lives repeatedly"
- **Always include:** Full calendar, multi-city map, category slots visual
- **Never include:** Specific pricing in deck sent before call
- **Emphasis:** Repeat touchpoints, content yield, tour visibility

### Forever Futbol Decks
- **Visual:** Museum-grade aesthetic — editorial layout, cultural imagery, premium
- **Tone:** Institutional authority — "this is a cultural moment"
- **Always include:** World Cup window context, multi-city installation map, category protection
- **Never include:** Foot traffic guarantees
- **Emphasis:** Global attention concentration, brand-safe environment, curated integration

### Scented Flowers (Museum Series) Decks
- **Visual:** Editorial, gallery-quality, museum aesthetic
- **Tone:** Cultural significance, artistic authority
- **Varies by installation:** Living Legends, Women Make The World, Fallen Stars each have unique visual identity

### Umbrella Group Decks
- **Visual:** Professional, trust-building, clean corporate
- **Tone:** Solution-oriented, no fluff
- **Per service:** Auto Exchange, Injury Network, Realty, Clean Services, etc. — each has own visual treatment

### Bodegea Product Decks
- **Visual:** Premium product photography, lifestyle aspiration, sensory appeal
- **Tone:** Product confidence — the product speaks for itself
- **Per product:** Infinity Water, Pronto Energy, Noir, Stush — each has distinct visual world

## Output Modes

### MODE 1: Full Deck Architecture
Complete deck blueprint including:
1. Deck type selection and rationale
2. Slide-by-slide outline with content direction per slide
3. Visual direction per slide (layout, imagery, color)
4. Speaker notes for each slide
5. Data requirements (metrics, photos, logos needed)
6. Brand voice compliance notes
7. CTA and close strategy

### MODE 2: Slide Content Generation
Given a deck outline, generate:
- Headline copy for each slide
- Body copy / bullet points
- Speaker notes
- Callout text / stat highlights
- CTA language

### MODE 3: Deck Strategy
Before building, determine:
- Which archetype fits
- Audience analysis
- Key messages that must land
- Objection pre-handling in deck flow
- Close strategy

### MODE 4: One-Pager Generation
Single-page leave-behind with:
- Brand positioning
- Key metrics
- Visual layout direction
- CTA
- QR code placement

### MODE 5: Deck Audit
Review an existing deck for:
- Brand voice consistency
- Slide flow logic
- Data accuracy
- Visual quality
- CTA strength
- Missing slides
- Redundant slides

### MODE 6: Build Prompt
Generate dev-ready instructions for creating the deck using the pptx skill, including:
- Exact slide count and order
- Content per slide
- Visual specifications (colors, fonts, layout)
- Image requirements
- File output specifications

## Slide Design Principles

1. **One idea per slide** — If you need a second point, add a slide
2. **Headlines do the work** — If someone only reads headlines, they get the story
3. **Data as ammunition** — Every number earns its place; no vanity metrics
4. **White space is premium** — Cluttered slides signal amateur operations
5. **Photography over stock** — Real images from real events/operations
6. **Consistent grid** — Same layout logic throughout; vary within the system
7. **Brand colors only** — No off-brand colors; every pixel represents the brand
8. **Speaker notes are mandatory** — The deck must work with and without a presenter

## Automation Hooks

| Hook | System | Purpose |
|---|---|---|
| Deck request trigger | n8n webhook | Sponsor requests deck → auto-generate personalized version |
| Post-call deck delivery | n8n + email | After 10-min call, auto-send brand-specific deck |
| Deck view tracking | Analytics link | Track if/when prospect opens deck |
| Deck personalization | n8n + Supabase | Pull prospect data, personalize deck fields |
| Recap deck auto-gen | n8n + event data | After event, auto-generate recap from attendance + social data |
