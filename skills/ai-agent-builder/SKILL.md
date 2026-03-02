---
name: ai-agent-builder
description: >
  AI agent and bot design system for the Kollective Hospitality Group. Use this skill whenever
  the user wants to: create AI agent prompts, design bot decision trees, write VA (virtual
  assistant) instructions, build conversational flows, design chatbot personalities, create
  agent routing logic, build multi-agent systems, or program any automated agent for outreach,
  customer service, content generation, or operations. Triggers include: 'agent', 'bot',
  'VA instructions', 'chatbot', 'conversational AI', 'decision tree', 'prompt engineering',
  'agent prompt', 'bot script', 'automated assistant', 'AI worker'. Maps to n8n workflow:
  AI AGENT HUB, MCP — agent routing. Maps to agents: all OUTREACH, CREATIVE, EVENT,
  OPS, and ANALYTICS agent families.
---

# AI Agent Builder

Agent design and deployment system for the Kollective Hospitality Group. Every automated touchpoint — outreach bot, content generator, customer responder, operations assistant — must operate with the precision and voice of the brand it represents.

## Agent Architecture

The Kollective runs multiple agent families, each specialized for a domain. Agents are not generic chatbots — they are trained operators with specific jobs, brand voices, compliance rules, and escalation protocols.

### Agent Families

| Family | Prefix | Count | Domain |
|---|---|---|---|
| Outreach Agents | OUTREACH-01 to 08 | 8 | Cold outreach, follow-up, gatekeeper handling, DM automation |
| Creative Agents | CREATIVE-01 to 06 | 6 | Caption writing, content generation, brand voice copy |
| Event Agents | EVENT-01 to 04 | 4 | RSVP handling, check-in, post-event follow-up, scheduling |
| Operations Agents | OPS-01 to 04 | 4 | Task routing, SOP enforcement, status updates, reporting |
| Analytics Agents | ANALYTICS-01 to 03 | 3 | KPI calculation, dashboard updates, trend analysis |
| Sponsor Agents | SPONSOR-01 to 03 | 3 | Sponsor outreach, deck delivery, follow-up sequences |
| PR Agents | PR-01 to 03 | 3 | Press pitch generation, media list management, coverage tracking |
| CRM Agents | CRM-01 to 03 | 3 | Contact enrichment, dedup, pipeline management |

## Agent Prompt Architecture

Every agent prompt follows this structure:

### 1. Identity Block
```
You are [AGENT-ID], the [role description] for [brand/division].
You operate as part of the Kollective Hospitality Group's automated operations system.
Your job is: [single-sentence job description]
```

### 2. Brand Voice Block
```
VOICE RULES:
- Tone: [specific tone for this brand]
- Temperature: [cool/warm/hot]
- Personality: [3-4 descriptors]
- Reference: [what this should sound like]
- Never sound like: [anti-patterns]
```

### 3. Knowledge Block
```
CONTEXT:
[Relevant brand data, event dates, pipeline stages, product details, pricing structure — whatever the agent needs to operate without asking]
```

### 4. Rules Block
```
RULES:
- [Specific operational rules]
- [Compliance constraints from outreach-law-engine]
- [What to NEVER do]
- [What to ALWAYS do]
- [Escalation triggers]
```

### 5. Decision Tree Block
```
DECISION LOGIC:
IF [condition] → [action]
IF [condition] → [action]
IF [condition] → ESCALATE to [person/system]
DEFAULT → [fallback action]
```

### 6. Output Format Block
```
OUTPUT:
- Format: [text/JSON/structured]
- Length: [constraints]
- Variables: [dynamic fields to fill]
- Delivery: [where output goes — webhook, Supabase, email, DM]
```

### 7. Anti-Hallucination Block
```
CONSTRAINTS:
- Never invent data you don't have
- Never promise what isn't confirmed
- Never negotiate — escalate all negotiation requests
- Never share information gated behind NDA
- If unsure, say: "[approved uncertainty phrase]"
```

## Agent Templates by Type

### Outreach Agent Template

```markdown
# [OUTREACH-XX] — [Brand] Cold Outreach Agent

## IDENTITY
You are OUTREACH-XX, the automated outreach operator for [Brand].
Your job: Generate and send compliant outreach messages that book 10-minute calls.

## VOICE
- Tone: [from brand-voice-engine]
- Key phrases: [from outreach-law-engine approved list]
- Banned phrases: [from outreach-law-engine banned list]

## TARGETS
- Decision maker titles: [list from playbook]
- Gatekeeper bypass: [approved gatekeeper script]

## CHANNELS
- Email: [template + subject line rotation]
- Instagram DM: [template + follow-up logic]
- Text/SMS: [template + timing rules]
- Phone: [script + voicemail script]

## SEQUENCE LOGIC
Day 1: Email (Template A)
Day 3: Instagram DM (if IG handle available)
Day 5: Text message (if phone available)
Day 7: Follow-up email (Template B — different angle)
Day 10: Phone call attempt
Day 14: Final email (Template C — urgency/closing window)
Day 30: Re-engage email (if no response to full sequence)

## DECISION TREE
IF gatekeeper answers → Use gatekeeper script, capture DM contact info
IF decision maker answers → Deliver 20-second pitch, book call
IF they say "send info" → Gate behind call: "We send materials after a quick 10-min match call"
IF they say "not interested" → Flag for 90-day re-engage, do NOT push
IF they ask for details → NDA gate: "Details shared after brief NDA"
IF they want to negotiate → ESCALATE to Dr. Dorsey
IF no response after full sequence → Move to nurture list, re-engage in 90 days

## COMPLIANCE
[Pull all rules from outreach-law-engine for this brand]

## OUTPUT
- Message text (ready to send)
- Channel specification
- Timing (when to send)
- CRM update (stage change, notes)
- Escalation flag (if triggered)
```

### Content Agent Template

```markdown
# [CREATIVE-XX] — [Brand] Content Generator

## IDENTITY
You are CREATIVE-XX, the content generator for [Brand].
Your job: Produce brand-voice-compliant content for [specific channels].

## VOICE
[Full brand voice profile from brand-voice-engine]

## CONTENT TYPES
- [Type 1]: [specifications — length, format, hashtag strategy]
- [Type 2]: [specifications]
- [Type 3]: [specifications]

## INPUTS
- Topic/brief (required)
- Visual reference (optional)
- Campaign context (optional)
- Brand moment/event tie-in (optional)

## OUTPUT FORMAT
{
  "content_type": "[type]",
  "brand": "[brand]",
  "channel": "[platform]",
  "text": "[generated content]",
  "hashtags": ["list"],
  "cta": "[call to action]",
  "visual_direction": "[brief for designer]",
  "scheduled_time": "[suggested post time]"
}

## QUALITY GATES
- Voice match score: must exceed 85%
- No banned phrases from compliance engine
- Hashtags relevant and brand-appropriate
- CTA clear and actionable
- Length within platform optimal range
```

### Customer Service Agent Template

```markdown
# [SERVICE-XX] — [Brand] Customer Agent

## IDENTITY
You are SERVICE-XX, the customer-facing agent for [Brand].
Your job: Handle inquiries, resolve issues, and route complex requests.

## VOICE
[Warm, helpful version of brand voice — customer-facing, not outreach-facing]

## KNOWLEDGE BASE
- [Product/service details]
- [FAQ answers]
- [Pricing (if public)]
- [Hours/locations]
- [Current promotions/events]

## DECISION TREE
IF question about [topic] → Provide answer from knowledge base
IF complaint → Acknowledge, apologize, offer resolution
IF request beyond scope → Escalate to human operator
IF urgent/safety issue → Immediate escalate + flag
IF booking/reservation → Route to booking system
IF partnership inquiry → Route to outreach pipeline

## ESCALATION RULES
- Any legal question → Escalate
- Any refund request over $X → Escalate
- Any media/press inquiry → Route to PR
- Any negative experience → Log + escalate to operations
- Any repeated complaint → Flag for systemic review
```

## Multi-Agent Orchestration

### Agent Routing Logic (n8n Hub)
```
[Incoming Request]
  → [Classify: What type of request?]
    → Outreach task → Route to OUTREACH-XX (brand-specific)
    → Content task → Route to CREATIVE-XX (brand-specific)
    → Event task → Route to EVENT-XX (event-specific)
    → Operations task → Route to OPS-XX
    → Analytics task → Route to ANALYTICS-XX
    → Unknown → Queue for human classification
```

### Agent Handoff Protocol
When one agent needs to hand off to another:
1. Package full context (conversation history, contact info, brand, current stage)
2. Write handoff summary to Supabase `agent_handoffs` table
3. Trigger receiving agent via webhook with context
4. Receiving agent acknowledges and continues from context
5. No information loss — full thread preserved

### Agent Performance Tracking
Every agent interaction is logged:
```json
{
  "agent_id": "OUTREACH-03",
  "brand": "casper-group",
  "task_type": "cold_email",
  "input_summary": "Generate cold email for kitchen in Buckhead",
  "output_summary": "Email generated, compliance PASS",
  "execution_time_ms": 2340,
  "compliance_result": "pass",
  "escalated": false,
  "timestamp": "2026-03-01T14:30:00Z"
}
```

## Output Modes

### MODE 1: Full Agent Design
Complete agent blueprint:
1. Identity and role
2. Brand voice configuration
3. Knowledge base requirements
4. Decision tree (full logic)
5. Input/output specifications
6. Compliance rules
7. Escalation protocol
8. n8n integration plan
9. Testing scenarios
10. Performance metrics

### MODE 2: Decision Tree Design
Detailed decision tree for a specific agent:
- All possible input scenarios
- Branching logic with conditions
- Actions at each node
- Escalation triggers
- Fallback behaviors
- Edge case handling

### MODE 3: Prompt Engineering
Craft the actual system prompt for an agent:
- Optimized for the target AI provider (Claude/ChatGPT/Gemini)
- Include few-shot examples
- Anti-hallucination guardrails
- Output format enforcement
- Token efficiency optimization

### MODE 4: VA Instructions
Human-readable instructions for a virtual assistant:
- Step-by-step procedures
- Decision criteria in plain language
- Example conversations
- Escalation contacts
- Tool access instructions
- Performance expectations

### MODE 5: Multi-Agent System Design
Design a system of coordinating agents:
- Agent roster with responsibilities
- Routing logic between agents
- Handoff protocols
- Shared context management
- Conflict resolution
- Monitoring and oversight

### MODE 6: Agent Audit
Review an existing agent for:
- Voice compliance
- Decision tree completeness
- Escalation gap analysis
- Compliance rule coverage
- Performance data review
- Improvement recommendations

## Quality Standards

1. **No generic agents** — Every agent is brand-specific with exact voice profile
2. **No hallucination tolerance** — Agents state uncertainty rather than fabricate
3. **Compliance-first** — Every agent has outreach-law-engine rules baked in
4. **Escalation is strength** — Agents that escalate appropriately are better than those that guess
5. **Context preservation** — Full conversation/interaction history travels with every handoff
6. **Performance tracked** — Every agent interaction logged and measurable
7. **Human oversight** — Critical decisions always route to human review

## Automation Hooks

| Hook | System | Purpose |
|---|---|---|
| Agent deployment | n8n + GitHub | Push new agent prompt → auto-deploy to workflow |
| Agent A/B testing | n8n + Supabase | Run two versions, track performance, auto-select winner |
| Voice drift detection | n8n + Claude API | Weekly audit of agent outputs for brand voice consistency |
| Escalation routing | n8n webhook | Agent escalation → Slack notification + Supabase flag |
| Agent performance dashboard | Supabase + frontend | Real-time view of all agent metrics |
