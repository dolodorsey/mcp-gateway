---
name: creative-production
description: >
  Creative asset production system for all Kollective brands including flyers, menus, logos,
  social graphics, video thumbnails, brand templates, and design systems. Use this skill
  whenever the user wants to: create graphics, design flyers, build menus, create logos,
  generate thumbnails, build brand templates, create design systems, or produce any visual
  asset. Triggers include: 'flyer', 'menu', 'logo', 'graphic', 'design', 'thumbnail',
  'template', 'brand asset', 'visual', 'creative', 'mockup', 'animation', 'video thumbnail'.
  Maps to n8n workflow: GRAPHICS ENGINE — Nano Banana. Maps to agents: CREATIVE-01
  through CREATIVE-06.
---

# Creative Production Engine

Visual asset production for every Kollective brand.

## Asset Types

| Type | Use Case | Dimensions | Agent |
|---|---|---|---|
| Event flyer | HugLife events, museum openings | 1080x1350 (IG), 1080x1920 (Story) | CREATIVE-01 |
| Menu graphic | Casper Group restaurant menus | Custom per brand | CREATIVE-02 |
| Social post | All brands, feed content | 1080x1080, 1080x1350 | CREATIVE-04 |
| Story graphic | All brands, IG/FB stories | 1080x1920 | CREATIVE-05 |
| Video thumbnail | YouTube, TikTok, Reels cover | 1280x720 | CREATIVE-05 |
| Email header | Newsletter, campaigns | 600x200 | CREATIVE-06 |
| Logo variations | Brand sub-marks, event logos | Vector SVG + PNG | CREATIVE-03 |
| Sponsor integration | Partner logos on event materials | Context-dependent | CREATIVE-06 |
| Press kit assets | Media-ready brand images | High-res PNG | CREATIVE-03 |

## Brand Visual Systems

### Casper Group Brands
Each restaurant brand has its own visual identity. Never mix.
- **Angel Wings** — Warm gold/amber, comfort-food warmth, handwritten accents
- **Pasta Bish** — Bold red/black, playful, street-culture typography
- **Taco Yaki** — Vibrant fusion palette, Japanese-Mexican visual blend
- **Patty Daddy** — Heavy, bold, indulgent — dark backgrounds, big type
- **Espresso Co** — Refined, café-culture, cream/brown/black, serif elegance
- **Morning After** — Pastel/muted, brunch aesthetic, slightly cheeky
- **Toss'd** — Fresh green/white, clean minimal, health-forward
- **Sweet Tooth** — Candy colors, playful, dessert-first aesthetic
- **Mojo Juice** — Vibrant fruit colors, energizing, wellness glow
- **Mr. Oyster** — Deep ocean blue/pearl, refined coastal luxury

### HugLife Event Brands
- **Gangsta Gospel** — Gold/black, spiritual + street, reverent drama
- **Sunday's Best** — Warm pastels, elevated daytime, dressed-up aesthetic
- **Paparazzi** — Flash/silver/black, glamour, red carpet energy
- **Pawchella** — Playful earth tones, pet-friendly, joyful
- **Black Ball** — All black, gold accents, formal elegance
- **Beauty & The Beast** — Dual-tone contrast, dramatic, rose motif
- **Taste of Art** — Artistic palette, gallery-style, food + art fusion
- **Haunted House** — Dark/moody, theatrical horror, neon accents
- **Monster's Ball** — Halloween palette, costume-culture, wild energy
- **Snow Ball** — Winter whites/blues/silver, holiday warmth
- **Winter Wonderland** — Immersive winter, family-friendly magic

## Design Brief Template

```
BRAND: [Exact brand name]
ASSET TYPE: [Flyer / Social Post / Menu / etc.]
DIMENSIONS: [Width x Height]
HEADLINE: [Primary text]
SUBTEXT: [Secondary text — date, location, tagline]
MUST INCLUDE: [Logo, QR code, handles, partner logos]
VISUAL STYLE: [Reference brand visual system above]
MOOD: [1-3 descriptive words]
COLOR OVERRIDE: [Only if different from brand standard]
IMAGE DIRECTION: [Photo style, illustration style, abstract, etc.]
FILE FORMAT: [PNG / SVG / PDF]
DELIVERY: [Google Drive folder / Supabase storage / direct]
```

## Quality Checklist (Every Asset)

- [ ] Correct brand identity (colors, fonts, logo version)
- [ ] No brand voice blending
- [ ] All text legible at target display size
- [ ] CTA or action element present
- [ ] High-res output (minimum 300dpi for print, 72dpi for digital)
- [ ] Logo placement correct (brand guidelines)
- [ ] Social handles included where appropriate
- [ ] Date/location/time accurate
- [ ] Partner/sponsor logos placed if required
- [ ] File named with brand convention

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Generate graphic | GRAPHICS ENGINE — Nano Banana | Webhook |
| Event flyer package | EVENT LAUNCH ENGINE | Webhook |
| Brand asset storage | MCP — Asset Router | Webhook |
