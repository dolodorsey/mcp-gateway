---
name: content-factory
description: >
  Content production and campaign management engine for all Kollective brands. Use this skill
  whenever the user wants to: create social content, write captions, build content calendars,
  design content campaigns, generate ad copy, create content briefs, plan content strategy,
  write blog posts, generate image prompts for content, or produce any content at scale.
  Triggers include: 'content', 'caption', 'content calendar', 'campaign', 'ad copy', 'blog',
  'content strategy', 'content plan', 'batch content', 'content series', 'content brief',
  'social content', 'content production'. Maps to n8n workflow: CONTENT FACTORY, MCP —
  Copy Generator. Maps to agents: CREATIVE-04, CREATIVE-05, CREATIVE-06. Cross-references
  brand-voice-engine for voice compliance and creative-production for visual assets.
---

# Content Factory

High-volume content production system for the entire Kollective portfolio. Content is the fuel that powers every brand's visibility, engagement, and conversion.

## Core Principle

Content is not a task — it's an operating system. Every Kollective brand needs consistent, on-brand content flowing through its channels. The Content Factory treats content like manufacturing: standardized inputs, quality-controlled production, reliable outputs, scaled distribution.

## Content Types & Templates

### 1. Social Posts (IG/FB/TikTok/X)

**Feed Post Template:**
```
[HOOK — first line that stops the scroll]
[BODY — 2-3 lines of context, story, or value]
[CTA — what to do next]
.
.
.
[HASHTAGS — brand + discovery + niche, 15-20 total]
```

**Story Template:**
```
Slide 1: Hook (text overlay on image/video)
Slide 2-4: Content (info, behind-the-scenes, countdown)
Slide 5: CTA (swipe up, link, DM, poll)
```

**Carousel Template:**
```
Slide 1: Cover — headline that creates curiosity
Slide 2-8: Content — one point per slide, visual + text
Slide 9: Summary or key takeaway
Slide 10: CTA — follow, save, share, link in bio
```

**Reel/TikTok Template:**
```
Second 0-1: Hook (text + visual that stops scroll)
Second 1-10: Setup (context, problem, or story start)
Second 10-25: Content (value, reveal, transformation)
Second 25-30: CTA (overlay text: follow, comment, share)
Caption: Hook line + context + CTA + hashtags
```

### 2. Email Content
See newsletter-engine skill for full email templates.
Content Factory generates the body copy; newsletter-engine handles template structure and delivery.

### 3. Event Promotion Series (7-post campaign)
```
T-30: Announcement — "Mark your calendar"
T-21: Details reveal — What to expect
T-14: Social proof — Past event highlights / early RSVPs
T-10: Lineup/talent — Who's performing/hosting
T-7: Urgency — "One week out" / ticket scarcity
T-3: Final push — "Almost sold out" / countdown
T-1: Night before — Anticipation + logistics
T+1: Recap — Best moments, photos, "you missed this"
T+3: Next event tease — "The next one is..."
```

### 4. Press Releases
See pr-media skill for full press release templates.

### 5. Blog/Article Content
```
[HEADLINE — SEO-optimized, brand-voice appropriate]
[HERO IMAGE — editorial quality]
[INTRO — 2-3 sentences, hook + context]
[SECTION 1 — Main point with supporting detail]
[SECTION 2 — Secondary point or expansion]
[SECTION 3 — Example, story, or data]
[CONCLUSION — Summary + CTA]
[AUTHOR — Brand attribution]
```

### 6. Ad Copy (Paid Social/Display)

**Single Image Ad:**
```
Primary text: [Hook + value prop + CTA — 125 chars]
Headline: [5-8 words]
Description: [Under 30 chars]
CTA button: [Shop Now / Learn More / Get Tickets / Sign Up]
```

**Carousel Ad (3-5 cards):**
```
Card 1: Problem or attention-grab
Card 2: Solution or product
Card 3: Social proof or benefit
Card 4: Differentiator
Card 5: CTA
Each card: Headline (5 words) + image
```

## Content Pillars by Division

### Casper Group (Food Brands)
| Pillar | Content Type | Frequency | Purpose |
|---|---|---|---|
| Menu highlights | Food photography + caption | 3x/week per brand | Drive orders |
| Behind the scenes | Kitchen/prep process | 1x/week | Build trust |
| Customer love | Reviews, UGC, testimonials | 1x/week | Social proof |
| Specials/promos | Limited offers, new items | As needed | Drive urgency |
| Brand personality | Memes, culture, lifestyle | 2x/week | Build following |

### HugLife Events
| Pillar | Content Type | Frequency | Purpose |
|---|---|---|---|
| Event promotion | Flyer, countdown, details | Campaign-based | Drive ticket sales |
| Past event highlights | Photos, videos, recaps | 2x/week (post-event) | Social proof, FOMO |
| Culture/lifestyle | Music, fashion, nightlife | 3x/week | Build brand identity |
| Behind the scenes | Setup, production, planning | 1x/week | Insider access feel |
| Partner spotlights | Sponsor/partner features | 1x/week (when active) | Partner value delivery |

### Scented Flowers (Museums)
| Pillar | Content Type | Frequency | Purpose |
|---|---|---|---|
| Exhibition previews | Installation glimpses, curated teases | 3x/week | Drive ticket sales |
| Cultural commentary | Futbol history, art analysis, cultural context | 2x/week | Authority building |
| Visitor experience | Guest photos, testimonials | 2x/week | Social proof |
| Sponsor integration | Partner features within museum context | 1x/week | Partner value |
| Behind the build | Construction, curation, design process | 1x/week | Premium perception |

### Bodegea (Products)
| Pillar | Content Type | Frequency | Purpose |
|---|---|---|---|
| Product showcase | Hero product shots, lifestyle | 3x/week | Drive sales |
| Lifestyle integration | Product in real life scenarios | 2x/week | Aspiration |
| Founder/brand story | Brand origin, values, vision | 1x/week | Connection |
| UGC/social proof | Customer photos, reviews | 1x/week | Trust |
| Availability | Where to find, new retail partners | As needed | Distribution |

## Campaign Architecture

### Multi-Post Campaign Structure
```
Post 1: TEASE — Something's coming (curiosity hook)
Post 2: REVEAL — Here it is (the thing itself)
Post 3: DETAILS — What you need to know (logistics, features, info)
Post 4: SOCIAL PROOF — Others are already in (testimonials, RSVPs, orders)
Post 5: URGENCY — Limited time/spots (scarcity, countdown)
Post 6: LAST CALL — Final push (deadline, final reminder)
Post 7: RECAP/THANK YOU — After the moment (results, gratitude, next thing)
```

### Content Calendar Structure (per brand)
| Day | Content Type | Pillar | Channel | Agent |
|---|---|---|---|---|
| Monday | Brand personality / culture | Lifestyle | IG Feed + Story | CREATIVE-04 |
| Tuesday | Product/menu highlight | Core offering | IG Feed + FB | CREATIVE-04 |
| Wednesday | Behind the scenes / process | Trust building | IG Story + TikTok | CREATIVE-05 |
| Thursday | Social proof / UGC | Credibility | IG Feed | CREATIVE-04 |
| Friday | Event promo / weekend push | Conversion | IG Feed + Story + Email | CREATIVE-04/06 |
| Saturday | Lifestyle / aspirational | Brand world | IG Story + TikTok | CREATIVE-05 |
| Sunday | Community / engagement | Relationship | IG Story (polls, Q&A) | CREATIVE-05 |

## Image/Graphics Prompt System

### Prompt Template for GRAPHICS ENGINE
```
{
  "brand": "[brand_name]",
  "asset_type": "[feed_post / story / carousel_cover / ad]",
  "dimensions": "[1080x1080 / 1080x1350 / 1080x1920]",
  "subject": "[what the image shows]",
  "mood": "[from brand visual system]",
  "colors": "[brand primary + secondary]",
  "text_overlay": "[headline text to include]",
  "text_placement": "[top / bottom / center / none]",
  "style": "[photography / illustration / abstract / mixed]",
  "reference": "[link or description of visual reference]"
}
```

## Batch Production Mode

For generating content at scale (2+ weeks at a time):

### Process
1. **Brief intake:** Brand + time period + special events/promotions
2. **Calendar generation:** Map content pillars to dates
3. **Copy batch:** Generate all captions in one run (brand voice locked)
4. **Visual brief batch:** Generate all image prompts
5. **Image generation:** Produce all visuals
6. **Review:** Quality check all content against brand voice + visual system
7. **Schedule:** Load into scheduling tool or n8n workflow
8. **Monitor:** Track performance, adjust strategy

### Example: "Generate 2 weeks of IG content for Paparazzi"
- 14 days × 1-2 posts/day = 14-28 posts
- Mix: 4 event promos, 3 past event highlights, 3 lifestyle, 2 culture, 2 partner features
- Each post: caption + image prompt + hashtag set + optimal post time
- Stories: 7 sets of 3-5 slides each
- Output: Full content calendar ready for scheduling

## Content Quality Standards

### Every Piece Must:
- Match exact brand voice (score 75+ on voice compliance)
- Have a clear hook in the first line
- Include a CTA (even if soft — "save this", "tag a friend")
- Use brand-appropriate hashtags
- Have visual direction that matches brand visual system
- Be channel-optimized (format, length, features)
- Be original (no copied content)

### Every Piece Must NOT:
- Sound generic or template-like
- Blend voices from multiple brands
- Use banned phrases from outreach-law-engine
- Make claims that can't be backed up
- Use low-quality or off-brand imagery
- Ignore platform best practices
- Be posted without review if generated by AI

## Output Modes

### MODE 1: Single Content Piece
Generate one piece of content:
1. Brand voice loaded
2. Channel-optimized format
3. Caption/copy with hook + body + CTA
4. Hashtag strategy
5. Image prompt/visual brief
6. Optimal post time
7. Voice compliance score

### MODE 2: Content Calendar
Generate a full content calendar:
1. Time period specified
2. Content pillars mapped to dates
3. Content types assigned
4. Themes/campaigns integrated
5. Special dates/events included
6. Export format (spreadsheet-ready)

### MODE 3: Campaign Package
Multi-post campaign for a specific goal:
1. Campaign objective
2. Post sequence with timing
3. All copy pieces
4. All visual briefs
5. Channel distribution plan
6. Performance benchmarks
7. Paid amplification recommendations

### MODE 4: Batch Production
High-volume content generation:
1. Brand + period + volume specified
2. Full calendar generated
3. All captions produced
4. All image prompts produced
5. Quality scored
6. Export-ready package

### MODE 5: Content Strategy
Strategic content plan:
1. Brand audit (current content performance)
2. Audience analysis
3. Content pillar recommendations
4. Platform strategy
5. Posting frequency
6. Growth tactics
7. KPI benchmarks

### MODE 6: Content Audit
Review existing content:
1. Voice consistency analysis
2. Content mix evaluation
3. Performance data review
4. Competitor comparison
5. Gap identification
6. Improvement recommendations

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Content generation | n8n CONTENT FACTORY | Webhook / scheduled | Generate content batch |
| Caption writing | n8n CREATIVE-04 | Content request | Write brand-voice caption |
| Image prompt | n8n + GRAPHICS ENGINE | Content approved | Generate visual asset |
| Calendar builder | n8n scheduled | Monthly | Generate next month's calendar |
| Voice check | n8n + brand-voice-engine | Content generated | Score before publish |
| Post scheduling | n8n + social API | Content approved | Schedule to platform |
| Performance tracking | n8n + analytics | Post published | Track engagement metrics |
| Repurpose engine | n8n function | Top-performing post | Adapt to other formats/channels |
