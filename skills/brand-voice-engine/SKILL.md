---
name: brand-voice-engine
description: >
  Brand voice compliance and content generation engine for all 48+ Kollective brands. Use this
  skill whenever the user wants to: write content in a specific brand voice, check if content
  matches brand guidelines, generate brand-consistent copy, create brand voice guidelines for
  a new brand, or ensure any written output matches the correct brand personality. Triggers
  include: 'brand voice', 'tone check', 'voice guidelines', 'brand copy', 'write as [brand]',
  'does this sound like [brand]', 'brand consistency', 'voice compliance'. Maps to n8n workflow:
  BRAND VOICE, MCP — Copy Generator (Brand Voice). Maps to agents: CREATIVE-04 CaptionWriter.
---

# Brand Voice Engine

Every piece of content produced for a Kollective brand must sound like that brand wrote it — not like a generic AI, not like a corporate template, not like another brand in the portfolio.

## Voice Architecture

### Tier 1: Division-Level Voice DNA

| Division | Voice DNA | Temperature |
|---|---|---|
| **Casper Group** | Calm, procedural, corporate allocation tone. Like something official arrived. | Cool |
| **HugLife Events** | Confident, slightly exclusive, culturally magnetic. Like an insider invitation. | Warm |
| **Scented Flowers** | Museum-grade authority, cultural reverence, editorial precision. | Cool-Warm |
| **Umbrella Group** | Professional, trust-building, solution-oriented. No fluff. | Neutral |
| **Bodegea** | Premium product confidence, sensory language, lifestyle aspiration. | Warm |
| **Opulence Designs** | Artistic, expressive, culturally rich, visually descriptive. | Hot |
| **Inner Circle** | Tech-forward, utility-focused, clean and direct. | Cool |
| **Playmakers** | Community-driven, heart-forward, purpose-led. | Warm |

### Tier 2: Brand-Level Voice Profiles

#### CASPER GROUP BRANDS
- **Angel Wings** — Comfort food warmth, southern hospitality undertone
- **Pasta Bish** — Playful, bold, unapologetic. Personality-driven.
- **Taco Yaki** — Fusion energy, adventurous, culturally curious
- **Patty Daddy** — Big, bold, indulgent. Unapologetically satisfying.
- **Espresso Co** — Sophisticated daily ritual, café culture, refined casual
- **Morning After** — Recovery brunch energy, relatable, slightly cheeky
- **Toss'd** — Fresh, quick, health-conscious without being preachy
- **Sweet Tooth** — Indulgent, playful, dessert-as-experience
- **Mojo Juice** — Vibrant, energizing, wellness-positive
- **Mr. Oyster** — Refined, coastal luxury, premium seafood experience

#### HUGLIFE EVENT BRANDS
- **Gangsta Gospel** — Spiritual + street. Reverent rebellion. Deep culture.
- **Sunday's Best** — Elevated daytime gathering. Dressed up. Feel-good.
- **Paparazzi** — Glamour, flash, celebrity energy. Main character vibes.
- **Pawchella** — Playful, pet-loving, community joy. Wholesome fun.
- **Black Ball** — Formal, prestigious, once-a-year occasion. Black tie energy.
- **Beauty & The Beast** — Duality, contrast, dramatic elegance.
- **Taste of Art** — Cultural fusion of food + art. Sensory sophistication.
- **Haunted House** — Spooky, immersive, theatrical. Dark fun.
- **Monster's Ball** — Halloween celebration. Costume culture. Wild energy.
- **Snow Ball** — Winter celebration. Festive, warm, holiday magic.
- **Winter Wonderland** — Immersive holiday installation. Family + wonder.

#### SCENTED FLOWERS EXHIBITIONS
- **Forever Futbol** — Museum-grade futbol reverence. "Past. Present. Eternal."
- **Living Legends** — Tribute to living icons. Respect + celebration.
- **Women Make The World** — Empowerment. Strength. Cultural impact.
- **Fallen Stars** — Memorial. Remembrance. Legacy preservation.

#### BODEGEA PRODUCTS
- **Infinity Water** — Purity, premium hydration, clean luxury
- **Pronto Energy** — Fast, bold, performance-driven
- **Noir (Espresso Liqueur)** — Dark sophistication, after-hours luxury
- **Stush** — Caribbean premium, elevated island culture

## Voice Compliance Rules

### Scoring Matrix (0-100)

| Dimension | Weight | Description |
|---|---|---|
| Tone Match | 30% | Does it sound like the brand? |
| Vocabulary Compliance | 20% | Does it use approved language, avoid forbidden terms? |
| Message Alignment | 20% | Does it communicate the brand's core message? |
| Legal Safety | 15% | No false claims, no forbidden promises? |
| Channel Fit | 15% | Appropriate for the channel (email vs DM vs text vs caption)? |

### Score Routing
- **90-100:** Auto-approve → publish/send
- **70-89:** Flag for review → generate suggestions
- **Below 70:** Reject → generate rewrite

## Content Generation Modes

### MODE 1: Write Fresh Content
Input: brand name + content type + topic + channel
Output: 2-3 variants in brand voice, ready to use

### MODE 2: Voice Check
Input: draft content + brand name
Output: Score (0-100) + specific feedback + suggested rewrites

### MODE 3: Voice Translation
Input: generic content + target brand
Output: Content rewritten in target brand voice

### MODE 4: Brand Voice Brief
Input: new brand name + description
Output: Complete voice profile (tone, vocabulary, do/don't, examples)

## Channel-Specific Voice Adjustments

| Channel | Adjustment |
|---|---|
| **Email** | Slightly more formal, complete sentences, professional sign-off |
| **Instagram DM** | Shorter, more casual, emoji-light, personality forward |
| **Instagram Caption** | Hook in first line, brand personality at max, hashtag strategy |
| **Text Message** | Under 160 chars, direct, action-oriented |
| **Phone Script** | Conversational, confident, binary close |
| **Website Copy** | Editorial precision, hierarchy-driven, conversion-aware |
| **Event Description** | Sensory, aspirational, urgency-laced |

## Forbidden Across All Brands

- Generic AI phrases ("I'd be happy to", "Sure thing!", "Great question!")
- Corporate buzzwords without substance ("synergy", "leverage", "optimize")
- Desperate sales language ("Don't miss out!", "Limited time!", "Act now!")
- Self-deprecating brand language ("We're just a small...", "We're trying to...")
- Competitor mentions by name
- Unverified claims or statistics
- Price guarantees without authorization
- Legal promises (Casper: no "guaranteed income")

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Voice compliance check | BRAND VOICE | Webhook on content submission |
| Generate brand copy | MCP — Copy Generator | Morning schedule + webhook |
| Caption generation | CONTENT FACTORY | Webhook on campaign brief |
