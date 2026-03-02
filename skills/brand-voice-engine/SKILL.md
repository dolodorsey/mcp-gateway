---
name: brand-voice-engine
description: >
  Brand voice compliance and content generation engine for all 48+ Kollective brands. Use this
  skill whenever the user wants to: write content in a specific brand voice, check if content
  matches brand guidelines, generate brand-consistent copy, create brand voice guidelines for
  a new brand, translate content between brand voices, audit content for voice drift, or ensure
  any written output matches the correct brand personality. Triggers include: 'brand voice',
  'tone check', 'voice guidelines', 'brand copy', 'write as [brand]', 'does this sound like
  [brand]', 'brand consistency', 'voice compliance', 'brand personality', 'tone of voice',
  'brand writing', 'copy check'. Maps to n8n workflow: BRAND VOICE, MCP — Copy Generator.
  Maps to agents: CREATIVE-04 CaptionWriter. Cross-references outreach-law-engine for
  outreach-specific compliance.
---

# Brand Voice Engine

Every piece of content produced for a Kollective brand must sound like that brand wrote it — not like a generic AI, not like a corporate template, not like another brand in the portfolio.

## Core Principle

Voice is the invisible brand asset. Two people can sell the same product, but the one with the distinct voice wins the relationship. The Kollective operates 48+ brands — if they all sound the same, there's no reason to have 48 brands. Brand voice is what makes each entity feel independently alive.

## Voice Architecture

### Tier 1: Division-Level Voice DNA

Every division has a foundational voice temperature and personality. Individual brands within the division inherit this DNA but add their own distinct flavor.

| Division | Voice DNA | Temperature | Communication Style | Vocabulary Level |
|---|---|---|---|---|
| **Casper Group** | Calm, procedural, corporate allocation tone. Like something official arrived. | Cool | Formal-professional | Business |
| **HugLife Events** | Confident, slightly exclusive, culturally magnetic. Like an insider invitation. | Warm | Confident-casual | Cultural |
| **Scented Flowers** | Museum-grade authority, cultural reverence, editorial precision. | Cool-Warm | Editorial-authoritative | Elevated |
| **Umbrella Group** | Professional, trust-building, solution-oriented. No fluff. | Neutral | Direct-professional | Professional |
| **Bodegea** | Premium product confidence, sensory language, lifestyle aspiration. | Warm | Aspirational-sensory | Lifestyle |
| **Opulence Designs** | Artistic, expressive, culturally rich, visually descriptive. | Hot | Expressive-poetic | Artistic |
| **Inner Circle** | Tech-forward, utility-focused, clean and direct. | Cool | Concise-functional | Tech |
| **Playmakers** | Community-driven, heart-forward, purpose-led. | Warm | Warm-inspiring | Community |

### Tier 2: Brand-Level Voice Profiles

#### CASPER GROUP BRANDS

| Brand | Voice Personality | Signature Phrases | Never Says | Reference Sound |
|---|---|---|---|---|
| **Angel Wings** | Comfort food warmth, southern hospitality undertone | "Come as you are", "Soul food, delivered" | Pretentious food language | Your favorite aunt who cooks |
| **Pasta Bish** | Playful, bold, unapologetic, personality-driven | "No cap, just carbs", "Talk pasta to me" | Formal/corporate language | Your bold friend who doesn't filter |
| **Taco Yaki** | Fusion energy, adventurous, culturally curious | "East meets West in every bite" | "Authentic" (it's fusion, own it) | A world-traveler food lover |
| **Patty Daddy** | Big, bold, indulgent, unapologetically satisfying | "Go big or go home", "Built different" | Diet language, "light option" | A confident, no-apologies chef |
| **Espresso Co** | Sophisticated daily ritual, café culture, refined casual | "Elevated every morning", "Your ritual, refined" | Trendy slang, rushed tone | A European café owner |
| **Morning After** | Recovery brunch energy, relatable, slightly cheeky | "We don't judge", "Worth the night before" | Preachy, health-lecture tone | Your hungover best friend |
| **Toss'd** | Fresh, quick, health-conscious without being preachy | "Fresh. Fast. Feel good." | "Cheat meal", guilt language | A personal trainer who also cooks |
| **Sweet Tooth** | Indulgent, playful, dessert-as-experience | "Life's too short for boring dessert" | "Guilty pleasure" (no guilt) | A kid in a candy shop (grown up) |
| **Mojo Juice** | Vibrant, energizing, wellness-positive | "Fuel your glow", "Sip the energy" | Medical claims, "cure" | A yoga instructor at a juice bar |
| **Mr. Oyster** | Refined, coastal luxury, premium seafood experience | "Where the ocean meets the plate" | Casual food slang | A Michelin-adjacent chef |

#### HUGLIFE EVENT BRANDS

| Brand | Voice Personality | Signature Phrases | Never Says | Reference Sound |
|---|---|---|---|---|
| **Gangsta Gospel** | Spiritual + street, reverent rebellion, deep culture | "Where the spirit meets the street" | Disrespectful to faith, trivializing spirituality | A preacher who grew up on hip-hop |
| **Sunday's Best** | Elevated daytime, dressed up, feel-good | "Pull up looking like somebody" | Casual/sloppy language | A well-dressed host at brunch |
| **Paparazzi** | Glamour, flash, celebrity energy, main character vibes | "Flash. Click. Iconic.", "Camera ready?" | Understated language, "low-key" | A Hollywood publicist |
| **Pawchella** | Playful, pet-loving, community joy, wholesome fun | "Paws up!", "Best day of their life" | Negative pet language | A dog park regular who throws parties |
| **Black Ball** | Formal elegance, exclusive, sophisticated nightlife | "By invitation only", "The standard" | Casual language, "party" | A private club host |
| **Beauty & The Beast** | Dramatic, romantic, dual-nature, theatrical | "Which side are you?", "Embrace the contrast" | One-dimensional language | A theatrical director |
| **Taste of Art** | Creative, curated, food meets art, culturally rich | "Where flavor meets canvas" | Basic food language | A gallery curator who loves food |
| **Haunted House** | Spooky, immersive, theatrical horror | "Enter if you dare", "No escape" | Genuinely threatening language | A horror movie director |
| **Monster's Ball** | Wild, costume-culture, Halloween energy, unhinged fun | "Unmask yourself", "Go all out" | Reserved/formal language | The friend who goes hardest at Halloween |
| **Snow Ball** | Holiday elegance, winter warmth, celebration | "Sparkle season", "Magic on ice" | Sad/cold language | A holiday party planner |
| **Winter Wonderland** | Immersive winter, family-friendly, magical | "Step into the magic", "Winter lives here" | Exclusive/adult-only language | A Christmas movie narrator |

#### SCENTED FLOWERS BRANDS

| Brand | Voice Personality | Signature Phrases | Never Says |
|---|---|---|---|
| **Forever Futbol** | Museum-grade authority, global futbol reverence | "Past. Present. Eternal.", "Futbol Lives Here." | "Soccer", casual sports bro language |
| **Living Legends** | Biographical power, honoring greatness | "Their story. Your experience." | Reductive language about subjects |
| **Women Make The World** | Empowering, reverent, strength-celebrating | "Every story here changed the world." | Patronizing or diminishing language |
| **Fallen Stars** | Memorial, tribute, reflective honor | "Gone but never forgotten." | Sensationalist or tabloid language |

#### BODEGEA BRANDS

| Brand | Voice Personality | Signature Phrases | Never Says |
|---|---|---|---|
| **Infinity Water** | Pure, premium, endless refreshment | "Infinite refresh", "Pure. Always." | "Just water", commodity language |
| **Pronto Energy** | Charged, powerful, movement-oriented | "Ready when you are", "Fuel the moment" | Medical/health claims |
| **Noir** | Sophisticated, indulgent, dark luxury | "Dark. Rich. Unapologetic." | Light/casual drink language |
| **Stush** | [Voice TBD — define when product launches] | [TBD] | [TBD] |

#### UMBRELLA GROUP BRANDS

| Brand | Voice Personality | Signature Phrases |
|---|---|---|
| **Umbrella Auto Exchange** | Trustworthy, straightforward, no-pressure | "Your deal. Your terms." |
| **Umbrella Injury Network** | Compassionate, protective, action-oriented | "We fight so you don't have to." |
| **Umbrella Realty Group** | Professional, market-smart, client-first | "Your next chapter starts here." |
| **Umbrella Clean Services** | Reliable, thorough, no-nonsense | "Clean. Every time." |
| **The People's Dept.** | Accessible, community-focused, empowering | "For the people, by the people." |
| **Umbrella Accounting** | Precise, trustworthy, organized | "Your numbers. Our expertise." |
| **The Brand Studio** | Creative, strategic, results-oriented | "Brands that move." |
| **The Automation Office** | Efficient, technical, forward-thinking | "Automate everything." |
| **The Mind Studio** | Supportive, understanding, professional | "Your mind matters." |
| **Umbrella Legal & Compliance** | Authoritative, protective, thorough | "Protected. Period." |

## Voice Compliance Rules

### Scoring Matrix (0-100)
| Dimension | Weight | Criteria |
|---|---|---|
| Tone match | 30% | Does it sound like this brand's personality? |
| Vocabulary alignment | 20% | Are word choices appropriate for this brand? |
| Forbidden phrase absence | 20% | No banned words/phrases present? |
| Channel appropriateness | 15% | Does the tone fit the channel (social, email, DM, etc.)? |
| Brand separation | 15% | No bleed from other Kollective brands? |

### Score Routing
| Score | Status | Action |
|---|---|---|
| 90-100 | Approved | Publish/send |
| 75-89 | Minor revision | Adjust tone, re-check |
| 50-74 | Major revision | Rewrite with voice profile reference |
| Below 50 | Rejected | Full rewrite required — wrong voice entirely |

## Content Generation Modes

### MODE 1: Write Fresh Content
Given a brand + channel + topic, generate content in exact brand voice:
1. Load brand voice profile
2. Apply channel-specific adjustments
3. Generate content
4. Self-score against compliance matrix
5. Output content + score + any flags

### MODE 2: Voice Check / Audit
Given existing content + target brand, evaluate compliance:
1. Load brand voice profile
2. Score content against all dimensions
3. Identify specific violations (wrong tone, banned phrases, brand bleed)
4. Provide corrected version
5. Output: score, violations, corrected content

### MODE 3: Voice Translation
Convert content written for one brand into another brand's voice:
1. Identify source brand voice
2. Load target brand voice
3. Rewrite preserving meaning but transforming personality
4. Score new version
5. Output: translated content + score

### MODE 4: Brand Voice Brief
Create complete voice guidelines for a new brand:
1. Brand personality definition (3-5 traits)
2. Voice temperature (cool/neutral/warm/hot)
3. Vocabulary bank (approved terms, phrases)
4. Forbidden language list
5. Channel-specific adjustments
6. Reference sounds ("sounds like...")
7. Example content in-voice (3-5 samples)
8. Anti-patterns (what this brand should NEVER sound like)

### MODE 5: Multi-Brand Campaign Check
When content spans multiple brands (e.g., Kollective-wide campaign):
1. Verify each brand's section uses correct voice
2. Check for brand contamination between sections
3. Ensure visual language direction matches verbal voice
4. Score each brand section independently
5. Flag any cross-brand bleed

### MODE 6: Voice Drift Analysis
Audit a collection of content for consistency over time:
1. Sample content from multiple dates
2. Score each piece against brand profile
3. Identify drift patterns (getting more casual, losing signature phrases, etc.)
4. Recommend corrections
5. Update voice brief if intentional evolution

## Channel-Specific Voice Adjustments

| Channel | Adjustment | Example |
|---|---|---|
| Instagram caption | Shorter, punchier, emoji-allowed (brand-appropriate), hashtag strategy | "Flash. Click. Iconic. 📸 #Paparazzi" |
| Instagram Story | Ultra-short, reactive, casual within brand range | "Tonight. Pull up." |
| Email subject | Concise, curiosity or action-driven | "Your spot at Black Ball" |
| Email body | Slightly more formal than social, structured | Full sentences, clear CTA |
| Text/SMS | Direct, personal, conversational | "{{Name}}—tickets live. Link below." |
| Phone script | Professional, warm, structured with flexibility | Follows script framework with natural delivery |
| DM (cold outreach) | Brand voice + professional + concise | 3-4 lines max, clear ask |
| Press release | Formal, factual, quotable | Third person, brand context |
| Website copy | Brand voice at its most refined and intentional | Headline-driven, benefit-focused |

## Forbidden Across All Brands

These are NEVER acceptable in any Kollective content, regardless of brand:

- Generic AI phrases: "In today's fast-paced world...", "Let's dive in...", "I'd be happy to..."
- Corporate clichés: "synergy", "leverage", "circle back", "touch base"
- Competitor references (negative context)
- Profanity (unless explicitly part of brand identity — currently none)
- Medical/legal claims without disclaimer
- Guaranteed outcomes language
- Discriminatory or exclusionary language
- Copied content from other sources
- Excessive punctuation (!!!, ???, ...)
- ALL CAPS for emphasis (bold or italic instead)

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Voice check gate | n8n webhook | Content generated | Score against brand profile before publish |
| Caption generator | n8n CREATIVE-04 | Content request | Generate brand-voice caption |
| Voice drift scan | n8n scheduled | Monthly | Audit recent content per brand |
| Brand voice lookup | n8n function | Any content workflow | Load correct voice profile by brand name |
| Multi-brand separator | n8n function | Campaign content | Verify no brand contamination |
| New brand voice setup | n8n webhook | New brand added | Generate initial voice brief |
| Copy generator | n8n MCP — Copy Generator | Webhook | Generate any copy type in brand voice |
