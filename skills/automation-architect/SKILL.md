---
name: automation-architect
description: >
  Workflow automation design and n8n architecture engine for the entire Kollective system. Use
  this skill whenever the user wants to: design n8n workflows, create webhook endpoints, build
  automation sequences, debug workflow execution, plan data flow between systems, integrate
  APIs, design trigger logic, build scheduled jobs, create AI agent workflows, or architect
  any automation across Supabase, GoHighLevel, Google Sheets, social platforms, and AI
  providers. Triggers include: 'n8n', 'workflow', 'automation', 'webhook', 'trigger',
  'scheduled', 'API integration', 'data flow', 'sync', 'automate', 'bot workflow',
  'agent workflow', 'execution', 'cron', 'queue'. Maps to n8n instance:
  drdorsey.app.n8n.cloud. This skill designs the automation — other skills provide the
  content that flows through it.
---

# Automation Architect

Enterprise workflow design system for the Kollective Hospitality Group. 59+ active workflows, 111+ Supabase tables, 22 GHL locations, multi-AI provider integration.

## Architecture Philosophy

1. **Every manual process is a workflow waiting to be built** — if a human does it more than twice, automate it
2. **Webhooks are the nervous system** — every external input enters through a webhook
3. **Supabase is the brain** — all persistent state lives in Supabase, not in n8n
4. **n8n is the muscle** — it executes, transforms, routes, and delivers
5. **AI providers are the voice** — Claude, ChatGPT, Gemini generate content; n8n orchestrates them
6. **Brand separation at the data layer** — tenant_id on every record, never cross-contaminate

## System Map

### Core Infrastructure
| System | Role | Connection Method |
|---|---|---|
| **Supabase** | Database, auth, storage, real-time | REST API + service key |
| **n8n** | Workflow automation, scheduling, webhooks | Self-hosted cloud instance |
| **GoHighLevel** | CRM per location, pipelines, messaging | PIT tokens per location |
| **Google Sheets** | Data sourcing, import/export | OAuth + Sheets API |
| **GitHub** | Version control, skill storage | PAT token |
| **Claude API** | Content generation, analysis, compliance | API key via n8n HTTP node |
| **ChatGPT API** | Alternative content generation | API key via n8n HTTP node |
| **Gemini API** | Alternative content generation | API key via n8n HTTP node |
| **Social platforms** | IG, Twitter/X, LinkedIn, TikTok | Platform-specific APIs |

### Workflow Categories (59+ active)

| Category | Count | Purpose |
|---|---|---|
| Outreach Engine | 8 | Cold email, DM, text, phone script generation + sending |
| Social Media | 6 | Post scheduling, DM automation, engagement tracking |
| Lead Pipeline | 5 | Lead intake, scoring, routing, qualification |
| CRM Sync | 4 | GHL ↔ Supabase ↔ Sheets synchronization |
| Content Factory | 5 | Caption generation, blog posts, newsletter content |
| Event Operations | 4 | RSVP tracking, check-in, post-event follow-up |
| Data Enrichment | 3 | Contact enrichment, dedup, profile completion |
| Analytics | 4 | KPI calculation, dashboard data, reporting |
| AI Agent Hub | 6 | Multi-provider AI routing, prompt management |
| Sponsor Pipeline | 3 | Sponsor outreach, deck delivery, follow-up |
| PR/Media | 3 | Press pitch generation, media list management |
| Operations | 5 | Task management, SOP distribution, team notifications |
| Master Plan | 3 | Daily queue generation, priority scoring, execution tracking |

## Workflow Design Patterns

### Pattern 1: Webhook → Process → Store → Notify
The most common pattern. External trigger → transformation → Supabase insert/update → notification.
```
[Webhook Trigger]
  → [Parse Input / Validate]
  → [Supabase: Query/Insert/Update]
  → [Conditional: Route by brand/type]
  → [AI Generate (if content needed)]
  → [Supabase: Store result]
  → [Notify: Slack/Email/GHL]
```

### Pattern 2: Scheduled → Query → Process → Execute
Time-based automation. Cron trigger → pull pending items → process batch → execute actions.
```
[Cron Trigger (daily/hourly)]
  → [Supabase: Query pending items]
  → [Loop: For each item]
    → [AI Generate / Transform]
    → [Execute: Send email / DM / update CRM]
    → [Supabase: Mark complete + log]
  → [Summary: Log batch results]
```

### Pattern 3: AI Agent Router
Multi-provider AI with fallback logic.
```
[Webhook: Agent Request]
  → [Parse: Extract prompt + context + brand]
  → [Switch: Provider selection]
    → [Claude API] (primary)
    → [ChatGPT API] (fallback 1)
    → [Gemini API] (fallback 2)
  → [Post-process: Brand voice compliance check]
  → [Supabase: Log interaction]
  → [Return: Response via webhook response / Supabase update]
```

### Pattern 4: Multi-Brand Fanout
Single trigger dispatches to brand-specific processing.
```
[Trigger: New lead / New event / New content request]
  → [Supabase: Determine brand/tenant]
  → [Switch: Brand routing]
    → [Casper Group path] → specific voice + CRM + pipeline
    → [HugLife path] → specific voice + CRM + pipeline
    → [Forever Futbol path] → specific voice + CRM + pipeline
    → [Default path] → generic processing
  → [Merge: Common logging]
  → [Supabase: Unified audit trail]
```

### Pattern 5: Queue-Based Execution (Master Plan)
Daily automated queue with priority scoring.
```
[Cron: 6 AM daily]
  → [Supabase: Pull all pending tasks across brands]
  → [Score: Priority algorithm (deadline × impact × brand weight)]
  → [Sort: Highest priority first]
  → [Generate: Daily queue with assignments]
  → [Supabase: Write to daily_queues table]
  → [Notify: Push queue to team channels]
  → [Track: Monitor completion throughout day]
```

## n8n Node Reference (Most Used)

### Trigger Nodes
| Node | Use Case | Config Notes |
|---|---|---|
| Webhook | External API calls, form submissions, AI requests | Always use POST, validate headers |
| Cron | Scheduled jobs | Use UTC, document timezone offset |
| Supabase Trigger | Database change detection | Use on insert/update for real-time |

### Data Nodes
| Node | Use Case | Config Notes |
|---|---|---|
| Supabase | CRUD operations | Use service key, include tenant_id filter |
| Google Sheets | Import/export data | Batch operations, rate limit aware |
| HTTP Request | API calls (GHL, social, AI) | Set timeout, handle errors, retry logic |

### Processing Nodes
| Node | Use Case | Config Notes |
|---|---|---|
| Function | Custom JS logic | Keep stateless, log errors |
| Switch | Brand routing, conditional paths | Always include default/fallback |
| Merge | Combine parallel paths | Use "Merge by position" or "Merge by key" |
| Split In Batches | Process large datasets | 50 items per batch for API calls |
| IF | Simple conditionals | Chain for complex logic |

### AI Nodes
| Node | Use Case | Config Notes |
|---|---|---|
| HTTP Request → Claude | Content generation | Model: claude-sonnet-4-20250514, max_tokens: 4096 |
| HTTP Request → ChatGPT | Fallback generation | Model: gpt-4o |
| HTTP Request → Gemini | Fallback generation | Model: gemini-2.0-flash |

### Output Nodes
| Node | Use Case | Config Notes |
|---|---|---|
| Send Email | Outreach, notifications | SMTP or service integration |
| HTTP Request → GHL | CRM updates, contact creation | PIT token per location |
| Slack | Team notifications | Webhook URL per channel |

## Supabase Integration Patterns

### Headers (Standard)
```
apikey: [service_role_key]
Authorization: Bearer [service_role_key]
Content-Type: application/json
Prefer: return=representation
```

### Bulk Upsert Pattern
```
POST /rest/v1/[table]
Headers:
  Prefer: resolution=merge-duplicates,return=representation
Body: [array of records]
```

### Tenant-Filtered Query
```
GET /rest/v1/[table]?tenant_id=eq.[tenant]&select=*
```

### Real-Time Subscription (for dashboard)
```javascript
supabase.channel('changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'table_name' }, callback)
  .subscribe()
```

## GHL Integration Patterns

### Authentication
Each of the 22 GHL locations has its own PIT (Private Integration Token). Token format:
```
pit-[location-specific-hash]
```
Tokens are stored in Supabase `ghl_locations` table with fields: location_id, location_name, pit_token, division, active.

### Common GHL API Calls
| Operation | Method | Endpoint |
|---|---|---|
| Create contact | POST | /contacts/ |
| Update contact | PUT | /contacts/{id} |
| Add to pipeline | POST | /opportunities/ |
| Move pipeline stage | PUT | /opportunities/{id}/status |
| Send SMS | POST | /conversations/messages |
| Add tag | POST | /contacts/{id}/tags |
| Create task | POST | /contacts/{id}/tasks |

### Pipeline Mapping
Pipelines must be created per location with consistent stage names. Standard stages by division are defined in the crm-pipeline skill.

## Workflow Naming Convention

All workflows follow: `[CATEGORY] — [Action] ([Brand/Scope])`

Examples:
- `OUTREACH — Send Cold Email (Casper Group)`
- `SOCIAL — Schedule Posts (HugLife)`
- `LEAD — Score and Route (All Brands)`
- `EVENT — RSVP Tracker (Paparazzi)`
- `MASTER PLAN — Daily Queue Generator`
- `AI AGENT — Content Generator (Brand Voice)`
- `CRM — GHL Sync (Location 14)`
- `ANALYTICS — Weekly KPI Calculator`

## Output Modes

### MODE 1: Full Workflow Design
Complete n8n workflow blueprint including:
1. Trigger specification
2. Node-by-node flow diagram (text-based)
3. Data schema at each step
4. Error handling strategy
5. Supabase table interactions
6. GHL API calls (if applicable)
7. AI prompts (if applicable)
8. Notification/output destinations
9. Testing checklist
10. Monitoring plan

### MODE 2: Webhook Endpoint Design
Design a webhook endpoint including:
- URL structure
- Expected payload format
- Authentication/validation
- Processing logic
- Response format
- Error responses
- Rate limiting considerations

### MODE 3: Workflow Debugging
Given a failing workflow:
1. Identify failure point
2. Check data flow at each node
3. Validate API credentials/headers
4. Check Supabase query syntax
5. Verify conditional logic
6. Propose fix with specific node changes

### MODE 4: Integration Architecture
Design how two or more systems connect:
- Data mapping between systems
- Sync direction (one-way, two-way, event-driven)
- Conflict resolution strategy
- Error recovery plan
- Monitoring and alerting

### MODE 5: Batch Automation
Design high-volume processing workflows:
- Batch sizing strategy
- Rate limit management
- Progress tracking
- Partial failure handling
- Resume/retry logic
- Completion notification

### MODE 6: AI Agent Workflow
Design an AI-powered automation:
- Prompt engineering for the specific task
- Provider selection logic
- Context injection (brand voice, CRM data, history)
- Output parsing and validation
- Compliance check integration
- Result storage and routing

## Error Handling Standards

Every workflow MUST include:
1. **Try/catch on every API call** — HTTP nodes set to "Continue on Fail"
2. **Fallback paths** — If primary fails, route to fallback or queue for retry
3. **Error logging** — All errors written to Supabase `workflow_errors` table
4. **Alerting** — Critical failures trigger Slack notification
5. **Retry logic** — Transient failures retry 3x with exponential backoff
6. **Dead letter queue** — Failed items after max retries stored for manual review

## Performance Rules

1. **Batch API calls** — Never make individual calls when batch is available
2. **Rate limit awareness** — GHL: 100 req/min, Supabase: 1000 req/sec, Claude: varies by tier
3. **Minimize workflow steps** — Each node adds latency; combine where possible
4. **Use Supabase functions** — Complex queries as Postgres functions, not multiple API calls
5. **Cache when possible** — Store frequently accessed data in workflow static data
6. **Monitor execution time** — Flag workflows exceeding 30 seconds

## Quality Gates

Before deploying any workflow:
- [ ] Tested with real data (not mock)
- [ ] Error handling on every external call
- [ ] Tenant isolation verified (brand data doesn't leak)
- [ ] Naming convention followed
- [ ] Supabase tables exist and schema matches
- [ ] API credentials are current (not expired)
- [ ] Rate limits won't be exceeded at production volume
- [ ] Monitoring/alerting configured
- [ ] Documentation in workflow notes
- [ ] Rollback plan identified
