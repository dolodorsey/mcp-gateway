---
name: content-factory
description: >
  Content production and campaign engine for all Kollective brands. Use this skill whenever the
  user wants to: create content campaigns, generate multi-post series, build content strategies,
  produce email copy, create ad copy, write press releases, build campaign briefs, generate
  images/graphics prompts, or produce any content asset at scale. Triggers include: 'content',
  'campaign', 'content strategy', 'content plan', 'email copy', 'ad copy', 'press release',
  'campaign brief', 'content series', 'batch content', 'content production', 'creative brief',
  'image prompt', 'graphics'. Maps to n8n workflows: CONTENT FACTORY, GRAPHICS ENGINE,
  EVENT LAUNCH ENGINE, MCP — Copy Generator. Maps to agents: CREATIVE-01 through
  CREATIVE-06, SOCIAL-05, SOCIAL-06.
---

# Content Factory

Scalable content production system for the entire Kollective portfolio.

## Content Types & Templates

### 1. Social Posts (IG/FB/TikTok)
**Input:** Brand + topic + channel + mood
**Output:** Caption + image prompt + hashtags + posting time recommendation

### 2. Email Campaigns
**Input:** Brand + purpose + audience segment + CTA
**Output:** Subject lines (3 options) + body copy + preview text

### 3. Event Promotion Series
**Input:** Event name + date + city + brand voice
**Output:** 5-post sequence (announcement → hype → urgency → day-of → recap)

### 4. Press Releases
**Input:** Brand + news item + target media
**Output:** Headline + subhead + body (inverted pyramid) + boilerplate + media contact

### 5. Newsletter Content
**Input:** Brand + theme + audience
**Output:** Subject + header + sections + CTA blocks + footer

### 6. Ad Copy
**Input:** Brand + product/event + platform + objective
**Output:** Headline + body + CTA + visual direction

### 7. Flyer/Graphic Briefs
**Input:** Brand + event/product + visual style
**Output:** Complete design brief for GRAPHICS ENGINE

## Campaign Architecture

### Multi-Post Campaign Structure
```
POST 1 — ANNOUNCE: "It's happening." (Awareness)
POST 2 — EDUCATE: "Here's what it is." (Information)
POST 3 — SOCIAL PROOF: "Look who's involved." (Credibility)
POST 4 — URGENCY: "Spots are filling." (Scarcity)
POST 5 — FINAL: "Last chance / See you there." (Conversion)
```

### Email Sequence Structure
```
EMAIL 1 — COLD OPEN: Hook + value prop + soft CTA
EMAIL 2 — VALUE: Deeper info + social proof + medium CTA
EMAIL 3 — OBJECTION: Address common hesitations + strong CTA
EMAIL 4 — URGENCY: Deadline/scarcity + final CTA
EMAIL 5 — BREAK-UP: "Closing the loop" + last shot
```

## Image/Graphics Prompt System

### Prompt Template for GRAPHICS ENGINE
```
BRAND: [Brand Name]
TYPE: [Flyer / Social Post / Story / Ad / Menu / Banner]
DIMENSIONS: [1080x1080 / 1080x1920 / 1920x1080 / Custom]
VISUAL STYLE: [Dark luxury / Bright minimal / Street culture / Editorial / Museum-grade]
COLOR PALETTE: [Brand-specific hex codes or descriptors]
MUST INCLUDE: [Logo, date, city, RSVP link, QR code, tagline]
MOOD: [1-3 words]
REFERENCE: [Any visual reference or similar brand aesthetic]
TEXT OVERLAY: [Exact text to appear on the graphic]
```

### Visual Style Guide Per Division
| Division | Default Style | Color Direction | Typography |
|---|---|---|---|
| Casper Group | Clean, appetizing, warm tones | Brand-specific per restaurant | Modern, readable |
| HugLife | Bold, cultural, nightlife energy | Dark backgrounds, vivid accents | Display + sans-serif |
| Scented Flowers | Museum editorial, gallery aesthetic | Muted earth + accent color | Serif + clean sans |
| Umbrella Group | Professional, trust-forward | Navy, white, accent color | Corporate clean |
| Bodegea | Premium product, lifestyle | Product-specific palette | Modern luxury |
| Opulence Designs | Artistic, expressive, gallery | Bold color + texture | Artistic display |

## Content Quality Standards

### Every Piece Must:
1. Match the exact brand voice (reference Brand Voice Engine)
2. Have a clear purpose (awareness, engagement, conversion, retention)
3. Include a CTA or engagement prompt
4. Be formatted for the target channel
5. Be copy-paste ready or design-brief ready

### Every Piece Must NOT:
1. Sound generic or AI-templated
2. Blend brand voices
3. Make unverified claims
4. Use competitor names
5. Include placeholder text in final output

## Batch Production Mode

For producing content at scale:

**Input:** Brand + number of pieces + content type + date range
**Output:** Complete content calendar with all assets ready

### Example: "Generate 2 weeks of IG content for Paparazzi"
Output:
- 14 feed post captions with image prompts
- 14 story concepts
- 3 reel scripts
- Hashtag sets for each post
- Posting schedule with optimal times

## n8n Workflow Integration

| Action | Workflow | Trigger |
|---|---|---|
| Campaign strategy generation | CONTENT FACTORY | Webhook — campaign brief |
| Image generation | GRAPHICS ENGINE — Nano Banana | Webhook — image prompt |
| Event content package | EVENT LAUNCH ENGINE | Webhook — event brief |
| Brand copy generation | MCP — Copy Generator | Morning schedule + webhook |
| Caption writing | CONTENT FACTORY (post loop) | Per-post in campaign |
| Email copy | PR SEND PITCH + FOLLOWUPS | Webhook |
| Newsletter content | NEWSLETTER ENGINE | Webhook |
