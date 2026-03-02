---
name: outreach-playbook
description: >
  Multi-brand outreach execution engine for Kollective Hospitality Group. Use this skill whenever
  the user wants to: write outreach messages (cold email, DM, text, phone script), create outreach
  sequences, build gatekeeper scripts, handle objections, draft NDA transitions, write follow-ups,
  personalize outreach per brand, or execute any outreach campaign across Casper Group, HugLife
  Events, Forever Futbol, Scented Flowers, Umbrella Group, Bodegea, or any Kollective brand.
  Triggers include: 'outreach', 'cold email', 'DM script', 'phone script', 'gatekeeper', 'follow up',
  'pitch', 'sequence', 'cadence', 'prospecting', 'partner outreach', 'sponsor outreach', 'kitchen
  outreach', 'brand outreach'. Maps to n8n workflows: SPONSOR OUTREACH ENGINE, SOCIAL
  MESSAGE GENERATOR, SOCIAL SEND DMS, PR SEND PITCH, OUTREACH COMMAND CENTER.
  Maps to agents: OUTREACH-01 through OUTREACH-08.
---

# Outreach Playbook Engine

Multi-brand outreach execution system for the Kollective Hospitality Group.

Every outreach message must be written in the EXACT voice of the brand it represents. Never blend brand voices.

## Brand Voice Profiles

### CASPER GROUP (Ghost Kitchen Placements)
- **Tone:** Calm, corporate, procedural — like a program allocation
- **Hook:** "Passive income allocated to your location"
- **Vibe:** They've been selected. Something is waiting for them.
- **Discretion:** Management-level only. Not customer-facing.
- **Never:** Hype, desperate, "opportunity bro", "we need your kitchen"
- **Key phrases:** "flagged for placement", "allocated to this address", "location-specific benefit", "management review item", "passive income participation"
- **Avoid:** "free money", "guaranteed", "easy money", "risk-free", "refund", "rebate check", "claim your money"
- **Close:** Always binary — "Better today or tomorrow?"
- **NDA gate:** Details only shared after NDA — "Because this involves non-public operations, we handle details under a standard NDA."

### HUGLIFE EVENTS (National Event Platform)
- **Tone:** Calm, confident, slightly exclusive — not a party promoter
- **Hook:** "Category placement inside a touring platform with Atlanta as the anchor"
- **Vibe:** "You should already be involved" — inevitability + scarcity
- **Key phrases:** "partner roster", "category slot", "pre-release", "Atlanta anchor + national rollout", "10-minute call"
- **Never:** "you'd be stupid not to", "you better", promise attendance numbers, argue budget
- **Angles:** Category Placement (strongest), Tour Access, Content Engine
- **Close:** "Let's reserve the category slot while we finalize details."

### FOREVER FUTBOL (Museum Series)
- **Tone:** Museum-grade authority — cultural institution, not sports event
- **Hook:** "Museum-grade futbol experience across ATL/HOU/LA tied to the World Cup window"
- **Vibe:** Global attention concentrated here. Rare access. Brand-safe.
- **Key phrases:** "museum-grade", "ATL/HOU/LA", "World Cup window", "pre-release", "category slot", "10-minute call"
- **Never:** "the world will be watching" (overused), promise media coverage, guarantee foot traffic
- **Close:** "If you want category protection, we should lock it before the roster is announced."

### SCENTED FLOWERS (Museum Series — Other Exhibitions)
- **Tone:** Same museum-grade authority as Forever Futbol, adapted per exhibition
- **Exhibitions:** Living Legends, Women Make The World, Fallen Stars
- **Apply Forever Futbol voice framework but swap futbol specifics for exhibition-specific content

### UMBRELLA GROUP (Services)
- **Tone:** Professional, trust-building, solution-oriented
- **Vibe:** "We solve this problem for people like you"
- **Key phrases:** Varies by service vertical (Auto, Injury, Realty, Clean, Legal, Accounting)
- **Close:** Consultation booking with binary time options

### BODEGEA (Products)
- **Tone:** Premium product, confident positioning
- **Brands:** Infinity Water, Pronto Energy, Noir, Stush
- **Vibe:** Distribution/retail account acquisition — "We're placing product in select locations"
- **Close:** Sample/meeting booking

## Outreach Channel Templates

### Cold Email Structure
```
Subject: [Brand-specific subject line]

Hi {{Name}},

I'm {{YourName}} with [Brand].

[1 sentence: what we're doing + where]
[1 sentence: why their location/brand is a fit]
[1 sentence: what's in it for them — without overselling]

[1 sentence: next step — always specific and time-bound]

Better: {{Time A}} or {{Time B}}?

— {{Signature}}
```

### Instagram DM Structure
```
Message 1: [40 words max] Brand intro + why them + quick call ask
Message 2 (if they ask details): Gate to NDA or quick call — never negotiate in DMs
```

### Phone Script Structure
```
[20-second version] Name + Brand + Why calling + What it is + What's in it for them + Binary close
```

### Text Message Structure
```
[Under 160 chars] Name + Brand + Reason + Ask for 10-min call today/tomorrow
```

### Gatekeeper Script Structure
```
"Hi — who's the best person on the [management/partnerships] side to speak with regarding [brand-specific hook]?"
If pressed: "It's a positive [placement/benefit] conversation — I just need to route it correctly."
If they say email: "Happy to — what's the direct email for the person who signs off on [management items/partnerships]?"
```

## Objection Handling Framework

| Objection | Response Pattern |
|---|---|
| "Send a deck/info" | "Absolutely — we're pre-release, so we do a quick 10-min call first to match you. I'll send right after." |
| "What is it exactly?" | Gate to NDA (Casper) or gate to call (HugLife/FF) |
| "We're not interested" | "Totally understand — just wanted to make sure it reached the right person. Can I confirm who handles [X] in case the timing changes?" |
| "What do you need from us?" | "Depends on [the slot/the placement]. Could be [product/dollars/hybrid]. Best explained in 10 minutes." |
| "We already do this" | "Perfect — that means you understand the space. This complements what you're doing, doesn't replace it." |
| "What's the cost?" | Never lead with numbers. Gate to call. "We confirm specifics after the [site walk/fit check/call]." |

## Sequence Architecture

### Standard 5-Touch Sequence
1. **Day 0:** Initial outreach (email or DM)
2. **Day 2:** Follow-up text message
3. **Day 5:** Phone call attempt
4. **Day 8:** Second email (different angle/subject)
5. **Day 14:** Final touch — "closing the roster" / "moving to next location"

### Urgency Escalation
- Touch 1-2: Informational, assume-yes
- Touch 3-4: Slight scarcity ("we're finalizing now")
- Touch 5: Definitive ("we're closing this round — wanted to give you a last look")

## Decision Tree (Bot/VA Logic)

```
INBOUND/OUTBOUND →
  ├── Gatekeeper answers → Ask for decision maker using brand hook
  │   ├── Gives name/email → Log + move to DM sequence
  │   ├── Says "email it" → Get direct email → Send brand email template
  │   └── Refuses → Get GM name + best time → Schedule callback
  ├── Decision maker answers → Deliver 20-second script
  │   ├── Shows interest → Book 10-min call → Trigger NDA (Casper) or Deck (HugLife/FF)
  │   ├── Asks for details → Gate to NDA/call
  │   ├── Wants to negotiate → Escalate to Dr. Dorsey
  │   └── Not interested → Log + schedule Touch 5 in 14 days
  └── Voicemail → Leave 15-second message → Move to text/DM follow-up
```

## n8n Workflow Integration

| Skill Action | n8n Workflow | Webhook |
|---|---|---|
| Generate outreach message | SOCIAL MESSAGE GENERATOR | Manual trigger |
| Send DM sequence | SOCIAL SEND DMS | Hourly schedule |
| Send email pitch | PR SEND PITCH + FOLLOWUPS | Hourly schedule |
| Sponsor-specific outreach | SPONSOR OUTREACH ENGINE | Manual trigger |
| Track outreach status | OUTREACH COMMAND CENTER | Every 4 hours |
| Log touch | MCP — Touch Logger | Webhook |
| Score lead | MCP — Lead Intake + Score | Webhook |

## Personalization Variables

Always populate these before sending:
- `{{Name}}` — contact first name
- `{{YourName}}` — sender name (brand-specific)
- `{{Brand}}` — Casper Group / HugLife Events / Forever Futbol Museum
- `{{Area}}` — geographic area (Atlanta, Houston, LA, Charlotte, DC)
- `{{Restaurant}}` — location name (Casper only)
- `{{Time A}}` / `{{Time B}}` — binary time options
- `{{Signature}}` — brand-specific email signature

## Output Rules

1. Every message must be copy-paste ready
2. Every message must use the correct brand voice — no blending
3. Every message must end with a binary close or clear next step
4. Never negotiate in writing — gate to call
5. Never promise specific numbers (attendance, revenue, traffic)
6. Never use discount/coupon language for Casper
7. Never use "sponsor" for HugLife — use "partner" and "placement"
8. Always include subject line options for emails
9. Always provide 2-3 message variants when generating
