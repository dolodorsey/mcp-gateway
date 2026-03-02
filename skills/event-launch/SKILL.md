---
name: event-launch
description: >
  Event launch, promotion, and operations engine for HugLife Events and all Kollective event
  brands. Use this skill whenever the user wants to: launch an event, create event marketing
  materials, build event timelines, generate flyers/captions/email blasts, plan event logistics,
  manage RSVPs, create check-in systems, or handle post-event follow-up. Triggers include:
  'event', 'launch', 'flyer', 'RSVP', 'check-in', 'event marketing', 'event timeline', 'event
  promo', 'event ops', any HugLife event name (Gangsta Gospel, Sunday's Best, Paparazzi,
  Pawchella, Black Ball, Beauty & The Beast, Taste of Art, Haunted House, Monster's Ball,
  Snow Ball, Winter Wonderland), or any event date reference. Maps to n8n workflow: EVENT
  LAUNCH ENGINE. Maps to agents: EVENT-01 through EVENT-04.
---

# Event Launch Engine

End-to-end event execution system for HugLife Events and all Kollective event brands.

## HugLife 2026 Master Calendar

### TASTE OF ART
- Apr 24 — Los Angeles, CA
- May 15 — Atlanta, GA
- Jun 12 — Washington, DC
- Jul 10 — Houston, TX
- Aug 14 — Houston, TX
- Dec 04 — Miami, FL (Art Basel)

### PAPARAZZI
- May 31 — Los Angeles, CA
- Jun 14 — Los Angeles, CA (BET Weekend)
- Jul 12 — Washington, DC
- Aug 09 — Charlotte, NC
- Sep 13 — Atlanta, GA

### SUNDAY'S BEST
- May 24 — TBD (Memorial Day Weekend)
- Jul 05 — TBD (Independence Weekend)
- Sep 06 — TBD (Labor Day Weekend)
- Nov 29 — TBD (Thanksgiving Weekend)

### GANGSTA GOSPEL
- Jun 19 — Atlanta, GA (Juneteenth)
- Aug 01 — Houston, TX
- Sep 05 — Los Angeles, CA

### PAWCHELLA (SUMMER)
- Aug 22 — Atlanta, GA

### BEAUTY & THE BEAST
- Sep 12 — Atlanta, GA

### HAUNTED HOUSE
- Oct 01–31 — Atlanta, GA (Month-Long)

### MONSTER'S BALL
- Oct 31 — TBD (Halloween Night)

### BLACK BALL
- Nov 21 — Atlanta, GA

### SNOW BALL
- Dec 12 — Atlanta, GA

### WINTER WONDERLAND
- Dec 01–31 — Atlanta, GA

### DR. DORSEY BIRTHDAY WEEKEND
- Jun 27 — Houston, TX
- Jul 02 — Atlanta, GA
- Jul 04 — Las Vegas, NV

### WORLD CUP ACTIVATIONS
- Jun 11 – Jul 19 — Atlanta · Houston · Los Angeles (Multi-City)

## Event Launch Sequence (T-minus Timeline)

### T-30 Days (Pre-Launch)
1. Lock venue + date + capacity
2. Generate event brief (name, city, date, vibe, target audience)
3. Create flyer (trigger GRAPHICS ENGINE workflow)
4. Write announcement caption (brand voice)
5. Build RSVP/ticket landing page
6. Seed sponsor outreach (trigger SPONSOR OUTREACH ENGINE)
7. Draft influencer invite list

### T-21 Days (Awareness Push)
8. Post announcement flyer on IG/FB/TikTok
9. Send email blast to city-specific list
10. Launch DM outreach to target influencers
11. Start comment engagement on related accounts
12. Schedule 3-post drip over next 2 weeks

### T-14 Days (Momentum)
13. Release behind-the-scenes content
14. Activate partner cross-promotion
15. Second email blast (RSVP reminder)
16. Influencer confirmation + content brief
17. Vendor/supplier confirmations

### T-7 Days (Urgency)
18. "Limited spots" / "Almost full" messaging
19. Final email blast with scarcity
20. IG Stories countdown
21. Confirm all logistics (AV, staffing, catering, security)
22. Print/digital check-in list prep

### T-1 Day (Final Prep)
23. Venue walk-through
24. Check-in system test
25. Staff briefing
26. "Tomorrow" social post
27. Text blast to RSVP list

### Day-Of
28. Check-in ops (EVENT-02)
29. Real-time social posting
30. Photographer/videographer coordination
31. Sponsor integration execution
32. VIP management

### Post-Event (T+1 to T+7)
33. Thank-you emails to attendees (EVENT-03)
34. Recap content creation (photos, reels, highlights)
35. Sponsor follow-up with content deliverables
36. Event performance report (EVENT-04)
37. Feedback collection
38. Database update (attendees → CRM)
39. Retarget audience build for next event

## Event Brief Template

```
EVENT NAME: [Brand Name]
CITY: [City, State]
DATE: [Date]
VENUE: [Venue Name]
CAPACITY: [Number]
VIBE: [1-2 sentences describing the energy/aesthetic]
TARGET AUDIENCE: [Demographics + psychographics]
TICKET STRATEGY: [Free RSVP / Paid / Tiered]
SPONSOR INTEGRATION: [Active sponsors + placement needs]
CONTENT PLAN: [Pre/During/Post content requirements]
SPECIAL NOTES: [Holiday tie-in, cultural moment, special guests]
```

## Flyer Generation Prompt Template

```
Create an event flyer for [EVENT NAME].
City: [CITY]
Date: [DATE]
Brand personality: [BRAND VOICE DESCRIPTION]
Visual style: [Aesthetic direction — dark/light, bold/minimal, etc.]
Must include: event name, date, city, RSVP link/QR code, brand logo
Color palette: [Brand-specific colors]
Typography: [Brand-specific font direction]
Mood: [1-2 words — glamorous, spiritual, playful, dark, elegant, wild]
```

## Caption Templates Per Event Brand

### Gangsta Gospel
"[City]. [Date]. Church is in session. 🙏🏾 Not your average Sunday. This one's for the ones who live between the sacred and the streets. RSVP: [link]"

### Sunday's Best
"Dressed up. Day vibes. Good company. Sunday's Best — [City]. [Date]. [Holiday Weekend]. The invite is yours. RSVP: [link]"

### Paparazzi
"📸 The cameras are coming. [City]. [Date]. Main character energy only. RSVP: [link]"

### Pawchella
"Bring your best friend. The four-legged one. 🐾 Pawchella — [City]. [Date]. RSVP: [link]"

### Black Ball
"One night. All black. No exceptions. 🖤 Black Ball — [City]. [Date]. RSVP: [link]"

### Beauty & The Beast
"Elegance meets edge. Beauty & The Beast — [City]. [Date]. RSVP: [link]"

### Taste of Art
"Where flavor meets canvas. Taste of Art — [City]. [Date]. Art. Food. Culture. RSVP: [link]"

## Event Performance Metrics (EVENT-04)

| Metric | Source | Target |
|---|---|---|
| RSVPs | Eventbrite/Partiful/Custom | Track vs capacity |
| Check-ins | Check-in system | Track vs RSVP (target 60%+) |
| Social reach | IG/FB/TikTok analytics | Posts + stories + tags |
| Content yield | Photographer/videographer | Photos, reels, highlights |
| Sponsor deliverables | Internal tracking | Integration proof for each sponsor |
| Email engagement | Gmail/newsletter | Open rate, click rate |
| Revenue | Ticket sales + bar + merch | Per-event P&L |
| New contacts | CRM intake | Added to database |
| NPS/Feedback | Post-event survey | Score + qualitative |

## n8n Workflow Integration

| Action | Workflow | Trigger |
|---|---|---|
| Generate flyer + caption | EVENT LAUNCH ENGINE | Webhook — event brief |
| RSVP intake | MCP — Lead Intake + Score | Webhook |
| Check-in ops | Custom (EVENT-02) | Day-of webhook |
| Post-event follow-up | PR SEND PITCH + FOLLOWUPS | Scheduled |
| Performance report | MCP — Daily KPI Digest | Post-event trigger |
| Retarget audience build | MCP — Retarget Audience Builder | Nightly after event |
