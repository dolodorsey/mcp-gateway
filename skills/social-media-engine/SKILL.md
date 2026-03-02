---
name: social-media-engine
description: >
  Social media content, scheduling, engagement, and growth engine for all Kollective brands.
  Use this skill whenever the user wants to: create social media posts, write captions, plan
  content calendars, manage DMs, handle comments, build engagement strategies, manage
  influencer outreach, create stories/reels scripts, optimize hashtags, schedule posts, or
  manage social presence across IG/FB/TikTok for any Kollective brand. Triggers include:
  'social media', 'caption', 'post', 'Instagram', 'IG', 'Facebook', 'TikTok', 'stories',
  'reels', 'hashtags', 'engagement', 'DMs', 'comments', 'influencer', 'content calendar',
  'social strategy', 'social schedule'. Maps to n8n workflows: SOCIAL INBOX, SOCIAL SEND
  DMS, SOCIAL MESSAGE GENERATOR, SOCIAL REPLY TRIAGE, SOCIAL DAILY TARGET PULL,
  IG COMMENT ENGINE, CONTENT FACTORY. Maps to agents: SOCIAL-01 through SOCIAL-10.
---

# Social Media Engine

Multi-brand social media operations for the entire Kollective portfolio.

## Platform Strategy

### Instagram (Primary)
- Feed posts: High-quality visuals, brand-voice captions, strategic hashtags
- Stories: Daily presence, behind-the-scenes, polls, countdowns, reposts
- Reels: Short-form video, trending audio, brand personality moments
- DMs: Outreach, customer service, relationship building
- Comments: Engagement farming, community building, brand warmth

### Facebook (Secondary)
- Events: Official event pages with RSVP integration
- Community: Group management for brand communities
- Cross-post: Adapted IG content (not identical copy)

### TikTok (Growth)
- Short-form video: Trend-jacking with brand personality
- Behind-the-scenes: Kitchen ops (Casper), event prep (HugLife), product (Bodegea)
- Creator collaborations: Micro-influencer content

## Content Pillars Per Division

### Casper Group (Food Brands)
1. **Food porn** — Close-up shots, plating, steam, texture
2. **Behind the kitchen** — Prep, cooking process, team moments
3. **Customer moments** — Reviews, reactions, unboxing deliveries
4. **Menu drops** — New items, seasonal specials, limited runs
5. **Brand personality** — Each sub-brand's unique voice and humor

### HugLife Events
1. **Event recaps** — Photos, highlights, atmosphere shots
2. **Countdown content** — T-minus posts building anticipation
3. **Behind the scenes** — Setup, planning, sneak peeks
4. **Attendee spotlight** — Best dressed, VIP moments, crowd energy
5. **Partner integration** — Sponsor content woven naturally

### Scented Flowers (Museums)
1. **Exhibition previews** — Teaser content, artifact highlights
2. **Cultural education** — Stories behind the exhibits
3. **Visitor experience** — Walk-throughs, reactions, testimonials
4. **Partner/sponsor content** — Brand integration moments
5. **City-specific** — Local tie-ins per installation city

### Bodegea Products
1. **Product beauty** — Clean shots, lifestyle integration
2. **Sampling moments** — Events, retail, influencer unboxing
3. **Brand story** — Origin, values, differentiation
4. **User content** — Customer photos, reviews, lifestyle
5. **Distribution wins** — New locations, retail presence

## Caption Framework

### Structure (All Brands)
```
[HOOK — first 7 words must stop the scroll]
[BODY — 1-3 sentences, brand voice, value or emotion]
[CTA — action, question, or engagement prompt]
.
.
.
[HASHTAGS — 15-20, mix of branded + discovery + niche]
```

### Hook Formulas
- Statement: "This is what [X] looks like."
- Question: "When's the last time you [X]?"
- Command: "Stop scrolling. [Brand moment]."
- Contrast: "[Common thing] but make it [brand twist]."
- Social proof: "[Number] people already [action]."

## Hashtag Strategy

### Branded (always include)
- #KollectiveHospitality
- #[BrandName] (e.g., #HugLifeEvents, #ForeverFutbol, #CasperGroup)
- #[EventName] (e.g., #GangstaGospel, #BlackBall, #TasteOfArt)

### Discovery (rotate by content type)
- Food: #FoodPorn #ATLEats #DeliveryFood #GhostKitchen #Foodie
- Events: #ATLEvents #NightLife #CultureATL #EventLife #PartyATL
- Museum: #ArtExhibition #CulturalExperience #MuseumLife #FutbolCulture
- Product: #PremiumWater #EnergyDrink #BlackOwned #NewProduct

### Niche (city-specific, rotate)
- Atlanta: #ATL #Atlanta #AtlantaEvents #ATLNightlife
- Houston: #Houston #HTX #HoustonEvents #HoustonFood
- LA: #LosAngeles #LA #LAEvents #LAFood
- DC: #WashingtonDC #DC #DCEvents #DCNightlife
- Charlotte: #Charlotte #CLT #CharlotteEvents

## Engagement Operations

### Daily Target Pull (SOCIAL DAILY TARGET PULL)
- Pull 20-50 accounts per brand from target lists
- Prioritize: local influencers, venue partners, media, complementary brands
- Actions: like 3 posts, comment on 1, follow if not following

### Comment Generation (IG COMMENT ENGINE)
- Every 2 hours: scan target accounts for new posts
- Generate brand-voice comments (not generic — specific to the post content)
- Never: "🔥🔥🔥", "Amazing!", "Love this!" alone
- Always: Reference something specific in the post + brand personality

### DM Outreach (SOCIAL SEND DMS)
- Hourly schedule with throttling
- Personalized per target using brand playbook templates
- Track: sent, opened, replied, converted
- Escalation: 3 DMs max per target before pause

### Reply Triage (SOCIAL REPLY TRIAGE)
- Inbound DMs and comments categorized:
  - **Hot lead** — booking inquiry, partnership interest, media request → Route to decision maker
  - **Customer service** — complaint, question, issue → Generate draft reply for approval
  - **Engagement** — compliment, tag, share → Like + brief reply
  - **Spam** — ignore/block

## Influencer Operations (SOCIAL-08)

### Tier System
| Tier | Followers | Engagement | Use Case |
|---|---|---|---|
| Nano | 1K-10K | 5%+ | Local events, authentic content |
| Micro | 10K-50K | 3%+ | City-specific campaigns, brand ambassadors |
| Mid | 50K-200K | 2%+ | Multi-city coverage, content partnerships |
| Macro | 200K+ | 1%+ | Major launches, headline moments |

### Outreach Template (Influencer)
```
Hey [Name] — [Brand] here. Love your content, especially [specific post/theme].

We're [doing X] in [City] on [Date] and think you'd be a great fit.

[Offer: invite + VIP access / paid collab / product gifting / content exchange]

Quick 10-min call to walk through details?
```

## Content Calendar Structure

| Day | Content Type | Platforms |
|---|---|---|
| Monday | Motivational / Brand story | IG + FB |
| Tuesday | Product / Menu / Feature | IG + TikTok |
| Wednesday | Behind the scenes | Stories + TikTok |
| Thursday | User/customer content | IG + FB |
| Friday | Weekend preview / Event push | All platforms |
| Saturday | Event day / Live content | Stories + TikTok |
| Sunday | Recap / Community engagement | IG + FB |

## n8n Workflow Map

| Action | Workflow | Schedule |
|---|---|---|
| Pull daily targets | SOCIAL DAILY TARGET PULL | Every 6 hours |
| Generate comments | IG COMMENT ENGINE | Every 2 hours |
| Send DMs | SOCIAL SEND DMS | Every hour |
| Generate messages | SOCIAL MESSAGE GENERATOR | On-demand webhook |
| Triage replies | SOCIAL REPLY TRIAGE | Webhook on reply |
| Inbox monitoring | SOCIAL INBOX | Every 5 minutes |
| Content creation | CONTENT FACTORY | Webhook on brief |
| Outreach command | OUTREACH COMMAND CENTER | Every 4 hours |
