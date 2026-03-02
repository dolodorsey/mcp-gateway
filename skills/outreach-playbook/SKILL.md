---
name: outreach-playbook
description: >
  Multi-brand outreach execution engine for Kollective Hospitality Group. Use this skill whenever
  the user wants to: write outreach messages (cold email, DM, text, phone script), create outreach
  sequences, build gatekeeper scripts, handle objections, draft NDA transitions, write follow-ups,
  personalize outreach per brand, design A/B tests for outreach, or execute any outreach campaign
  across Casper Group, HugLife Events, Forever Futbol, Scented Flowers, Umbrella Group, Bodegea,
  or any Kollective brand. Triggers include: 'outreach', 'cold email', 'DM script', 'phone script',
  'gatekeeper', 'follow up', 'pitch', 'sequence', 'cadence', 'prospecting', 'partner outreach',
  'sponsor outreach', 'kitchen outreach', 'brand outreach', 'objection handling'. Maps to n8n
  workflows: SPONSOR OUTREACH ENGINE, SOCIAL MESSAGE GENERATOR, SOCIAL SEND DMS, PR SEND PITCH,
  OUTREACH COMMAND CENTER. Maps to agents: OUTREACH-01 through OUTREACH-08. Cross-references
  outreach-law-engine for compliance and brand-voice-engine for voice.
---

# Outreach Playbook Engine

Multi-brand outreach execution system for the Kollective Hospitality Group. Every outreach message must be written in the EXACT voice of the brand it represents. Never blend brand voices.

## Core Principle

Outreach is the revenue engine's fuel. The Kollective sends thousands of outreach messages weekly across brands, channels, and markets. Every message must feel intentional, brand-accurate, and compliance-safe. The goal is always the same: book the call, not close the deal in the message.

## Brand Voice Profiles (Quick Reference)

### CASPER GROUP
- **Tone:** Calm, corporate, procedural — like a program allocation
- **Hook:** "Passive income allocated to your location"
- **Close:** Binary — "Better today or tomorrow?"
- **NDA Gate:** Details only after NDA signed
- **Full voice profile:** See brand-voice-engine
- **Full compliance rules:** See outreach-law-engine

### HUGLIFE EVENTS
- **Tone:** Calm, confident, slightly exclusive — insider invitation
- **Hook:** "Category placement inside a touring platform with Atlanta as the anchor"
- **Close:** "Let's reserve the category slot while we finalize details."
- **Full voice profile:** See brand-voice-engine
- **Full compliance rules:** See outreach-law-engine

### FOREVER FUTBOL
- **Tone:** Museum-grade authority — cultural institution
- **Hook:** "Museum-grade futbol experience across ATL/HOU/LA tied to the World Cup window"
- **Close:** "If you want category protection, we should lock it before the roster is announced."
- **Full voice profile:** See brand-voice-engine
- **Full compliance rules:** See outreach-law-engine

### UMBRELLA GROUP
- **Tone:** Professional, trust-building, solution-oriented
- **Hook:** Service-specific value proposition
- **Close:** "Would a quick consultation make sense this week?"

### BODEGEA
- **Tone:** Premium product confidence, lifestyle aspiration
- **Hook:** Product sampling + distribution opportunity
- **Close:** "Happy to send samples — better this week or next?"

## Outreach Channel Templates

### Cold Email Structure
```
SUBJECT: [From approved subject line bank — see outreach-law-engine]

Hi {{Name}},

[LINE 1: Who you are — brand + your name]
[LINE 2-3: Why them — specific, not generic. Reference their location/brand/category fit]
[LINE 4-5: What this is — 2 sentences max. Not the full pitch.]
[LINE 6: Next step — always a call, never the close]
[LINE 7: Binary close — two specific times]

— {{Signature}}
```

### Instagram DM Structure
```
[MESSAGE 1: Max 4 lines]
Hey {{Name}} — [Brand] here.
[1 line: why them]
[1 line: what this is]
Quick 10-min call?

[MESSAGE 2 (if they ask details): NDA gate or call redirect]
Happy to share — [NDA gate language or "let's jump on a quick call to match you to the right slot"]

[MESSAGE 3 (if no response after 48hrs): One follow-up only]
Hey — just bumping this. [1 line restating value]. Still open?
```

### Phone Script Structure
```
"Hi {{Name}}, this is {{YourName}} with [Brand].
[20-second pitch — WHO we are, WHY them, WHAT this is, WHY now]
Quick 10 minutes today or tomorrow?"

CLOSE: "Better today at [time] or tomorrow at [time]?"
```

### Text Message Structure
```
"{{Name}} — {{YourName}}, [Brand]. [1 sentence: what + why]. Quick 10-min call today/tomorrow?"
```

### Gatekeeper Script
```
"Hi — who's the best person on the [management/marketing/partnerships] side to speak with regarding [brand-specific framing]?"

IF ASKED WHAT IT IS: "[Brand-specific deflection — see outreach-law-engine approved phrases]"
IF TOLD TO EMAIL: "Happy to — what's the direct email for [the decision maker/the person who handles X]?"
IF REFUSED: "No worries — can you confirm [DM name] and the best time they're available?"
```

## Sequence Architecture

### Standard 7-Touch Sequence
```
Day 1:  Email (Template A — primary angle)
Day 3:  Instagram DM (if IG handle available)
Day 5:  Text message (if phone available)
Day 7:  Follow-up email (Template B — different angle)
Day 10: Phone call attempt
Day 14: Follow-up email (Template C — urgency/closing window)
Day 21: Final email (Template D — "closing the file" tone)
```

### Urgency Sequence (Event-Specific, Time-Sensitive)
```
Day 1:  Email + DM simultaneously
Day 2:  Phone call
Day 3:  Text message
Day 5:  Follow-up email (stronger urgency)
Day 7:  Final touch (email or DM — "roster closing")
```

### Re-Engagement Sequence (90-Day Dormant)
```
Day 1:  "New development" email (new event, new property, new angle)
Day 5:  DM with fresh hook
Day 10: Phone attempt
Day 15: Final email — "keeping you on the list for future"
```

## Objection Handling Framework

| Objection | Response Strategy | Brand Notes |
|---|---|---|
| "Send a deck/info" | Gate behind call: "We match partners to the right slot on a quick call first" | All brands |
| "Not interested" | Accept gracefully, flag for 90-day re-engage | Never push |
| "What is this?" | One-sentence positioning, route to call | Brand-specific framing |
| "Who are you?" | Name + brand + 1 sentence positioning | Keep brief |
| "We don't have budget" | "Slots range from product-only to cash. Let's explore fit first." | HugLife, FF |
| "We already do this" | "Perfect — this complements what you're doing" | All brands |
| "Call me back later" | Capture specific callback time, set reminder | All brands |
| "Email me" | Capture direct email (not generic), send within 1 hour | All brands |
| "What's the cost?" | "Depends on the slot — let's do a quick call to match you" | Never give price in cold touch |
| "I need to check with..." | "Totally — who should I follow up with and when?" | Capture decision chain |

## Personalization Variables

| Variable | Source | Use Case |
|---|---|---|
| {{Name}} | CRM / research | All outreach |
| {{Company}} | CRM / research | All outreach |
| {{City/Area}} | CRM / geolocation | Location-specific pitches |
| {{Restaurant}} | Research | Casper Group kitchen outreach |
| {{Category}} | Research | Sponsor category fit |
| {{EventName}} | Calendar | Event-specific outreach |
| {{TimeA}} / {{TimeB}} | Scheduler | Binary close options |
| {{YourName}} | Sender profile | All outreach |
| {{Signature}} | Email config | All emails |

## A/B Testing Framework

### What to Test
| Element | Variants | Metric |
|---|---|---|
| Subject line | 2-3 options per campaign | Open rate |
| Opening line (hook) | 2 approaches | Response rate |
| CTA phrasing | Binary close vs. open-ended | Meeting booked rate |
| Channel sequence | Email-first vs. DM-first | Overall conversion |
| Time of send | Morning vs. afternoon | Open rate |
| Follow-up timing | 3-day vs. 5-day gaps | Response rate |

### Test Protocol
1. Split audience 50/50 (or 33/33/33 for 3 variants)
2. Run for minimum 50 contacts per variant
3. Measure primary metric after full sequence completes
4. Winner becomes new default
5. Log results in Supabase `outreach_tests` table
6. Test one variable at a time

## Decision Tree (Bot/VA Logic)

```
INCOMING CALL / CONTACT:
  ├── Gatekeeper answers
  │   ├── Ask for management contact using approved language
  │   ├── If pressed → brand-specific deflection
  │   ├── Capture: name, email, direct line, best time
  │   └── Log in CRM → trigger email sequence
  │
  ├── Decision maker answers
  │   ├── Deliver 20-second script
  │   ├── Book 10-min call
  │   ├── If interested → trigger NDA (Casper) or deck delivery (HugLife/FF)
  │   └── Log in CRM → move to CALL BOOKED stage
  │
  ├── Voicemail
  │   ├── Leave 15-second message (name, brand, callback number)
  │   ├── Follow up with email within 1 hour
  │   └── Retry call in 48 hours
  │
  ├── "Send info" response
  │   ├── Capture direct email
  │   ├── Send within 1 hour
  │   └── Follow up in 3 days
  │
  ├── "Not interested"
  │   ├── Accept gracefully
  │   ├── Flag for 90-day re-engagement
  │   └── Do NOT push
  │
  └── Negotiation attempt
      ├── ESCALATE to Dr. Dorsey
      └── Do NOT negotiate — bots/VAs never negotiate
```

## Output Modes

### MODE 1: Full Outreach Campaign
Complete outreach campaign for a specific brand/target:
1. Target audience definition
2. Channel strategy
3. Full sequence (all touches, all channels)
4. Message copy for each touch
5. Objection handling scripts
6. Compliance check (via outreach-law-engine)
7. CRM integration plan
8. Performance benchmarks

### MODE 2: Single Message
Generate one outreach message:
1. Brand voice loaded
2. Channel-optimized format
3. Personalized with available variables
4. Compliance-checked
5. Ready to send

### MODE 3: Sequence Design
Multi-touch sequence architecture:
1. Touch points with timing
2. Channel per touch
3. Escalation logic
4. Response handling per scenario
5. Exit conditions

### MODE 4: Objection Script
Comprehensive objection handling for a specific brand:
1. All common objections
2. Approved responses
3. Escalation triggers
4. Follow-up actions

### MODE 5: A/B Test Design
Outreach testing plan:
1. Hypothesis
2. Variants
3. Sample size
4. Duration
5. Success metric
6. Analysis plan

### MODE 6: Multi-Brand Outreach Plan
Coordinated outreach across multiple Kollective brands:
1. Brand-by-brand strategy
2. Shared target detection (avoid sending multiple brands to same person)
3. Sequencing to avoid overlap
4. Cross-brand opportunity identification

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Message generation | n8n SOCIAL MESSAGE GENERATOR | Webhook | Generate brand-voice message |
| DM sending | n8n SOCIAL SEND DMS | Queued | Send DMs per schedule |
| Email sending | n8n OUTREACH COMMAND CENTER | Queued | Send emails per sequence |
| PR pitch | n8n PR SEND PITCH | Webhook | Send press pitches |
| Response routing | n8n SOCIAL REPLY TRIAGE | Webhook | Route responses to correct handler |
| Compliance check | n8n + outreach-law-engine | Pre-send | Validate message before sending |
| CRM update | n8n + Supabase | Post-send | Log outreach, update pipeline stage |
| A/B tracking | n8n + Supabase | Post-campaign | Calculate variant performance |
| Re-engagement trigger | n8n scheduled | 90-day check | Trigger re-engage sequence for dormant contacts |
