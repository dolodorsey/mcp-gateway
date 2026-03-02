---
name: crm-pipeline
description: >
  CRM pipeline management across Supabase and all contact/deal systems. Use this skill
  whenever the user wants to: manage contacts, build pipelines, track deals, create CRM
  workflows, manage opportunity stages, segment contacts, handle contact deduplication,
  or build any CRM-related system. Triggers include: 'CRM', 'pipeline', 'contacts',
  'deals', 'opportunities', 'stage', 'funnel', 'contact management', 'dedup',
  'database', 'Supabase contacts'. Maps to Supabase tables: identities, opportunities,
  threads, messages, lead_lists, segments.
---

# CRM Pipeline System

Unified contact and deal management across all Kollective brands via Supabase.

## Database Architecture

### Core Tables
| Table | Purpose |
|---|---|
| `identities` | Unified contact records — one record per person across all brands |
| `identity_identifiers` | Links identities to platform accounts (email, IG, phone, etc.) |
| `opportunities` | Sales/partnership deals with stage tracking |
| `threads` | Conversation containers (email, DM, text) |
| `messages` | Individual messages within threads |
| `lead_lists` | Named lists for segmentation |
| `segments` | Identity-to-list mapping |
| `tasks` | Action items tied to contacts/opportunities |

### Multi-Tenant Isolation
Every record has a `tenant_id` linking to the `tenants` table. RLS enforced — brands cannot see each other's data.

| Tenant | Division |
|---|---|
| casper-group | Casper Group (Food) |
| huglife-events | HugLife Events |
| scented-flowers | Scented Flowers (Museums) |
| umbrella-group | Umbrella Group (Services) |
| bodegea | Bodegea (Products) |
| opulence-designs | Opulence Designs (Art) |
| inner-circle | Inner Circle (Apps) |

## Pipeline Stages by Division

### Casper Group (Kitchen Placement)
```
NEW → QUALIFIED → NDA SENT → SITE WALK SCHEDULED → SITE APPROVED → TRAINING → ACTIVE → CHURNED
```

### HugLife Events (Sponsor/Partner)
```
NEW → PITCHED → CALL SCHEDULED → CALL COMPLETED → PROPOSAL SENT → NEGOTIATING → CONTRACTED → ACTIVE → RENEWED/CHURNED
```

### Scented Flowers (Sponsor/Partner)
```
NEW → PITCHED → CALL SCHEDULED → DECK SENT → NEGOTIATING → CONTRACTED → ACTIVE
```

### Umbrella Group (Service Lead)
```
NEW → QUALIFIED → CONSULTATION SCHEDULED → QUOTE SENT → NEGOTIATING → CLOSED WON → IN SERVICE / CLOSED LOST
```

### Bodegea (Distribution/Retail)
```
NEW → SAMPLED → MEETING SCHEDULED → ORDER PLACED → DELIVERING → REORDER → ACTIVE ACCOUNT
```

## Contact Deduplication Rules

### Match Priority
1. Email exact match → merge
2. Phone exact match → merge
3. Instagram handle match → merge
4. First name + last name + city match → flag for review
5. Company + title match → flag for review

### Merge Rules
- Keep the record with the most data
- Preserve all identifiers from both records
- Keep the highest lead score
- Keep the most recent activity timestamp
- Log merge event in audit trail

## Opportunity Management

### Required Fields
- `identity_id` — linked contact
- `tenant_id` — brand/division
- `stage` — current pipeline stage
- `value` — estimated deal value
- `source` — how they entered pipeline
- `assigned_to` — responsible team member
- `next_action` — what needs to happen next
- `next_action_date` — when it needs to happen

### Automated Stage Transitions
| Trigger | Stage Change |
|---|---|
| Email reply received | NEW → PITCHED (auto) |
| Call booked | PITCHED → CALL SCHEDULED |
| NDA signed | QUALIFIED → NDA SENT → next |
| Proposal viewed | PROPOSAL SENT (timestamp update) |
| 30 days no activity | Current → STALE (flag for re-engage) |

## Reporting Views

### Pipeline Summary (per brand)
- Total opportunities by stage
- Total pipeline value
- Average time in each stage
- Conversion rate between stages
- Stale opportunities (30+ days no movement)

### Contact Health
- Total contacts by brand
- Contacts with email vs without
- Contacts with phone vs without
- Duplicate rate
- Engagement score distribution

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Contact upsert | LINDA — Form Ingest | Webhook |
| Opportunity creation | MCP — Lead Intake + Score | Webhook |
| Stage transition | MCP Core Router | Webhook on trigger event |
| Pipeline reporting | MCP Dashboard API | On-demand |
| Dedup scan | Custom (scheduled) | Nightly |
