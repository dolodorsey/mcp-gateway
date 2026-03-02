---
name: ghl-operations
description: >
  GoHighLevel operations management for all 22 Kollective locations. Use this skill whenever
  the user wants to: manage GHL pipelines, create/update contacts, configure tags, build
  automations, manage subaccounts, standardize custom fields, set up workflows within GHL,
  handle PIT token management, or operate any GHL location. Triggers include: 'GHL',
  'GoHighLevel', 'pipeline', 'subaccount', 'location', 'PIT token', 'custom fields',
  'tags', 'GHL automation', 'GHL workflow', 'contact management', 'opportunity',
  'GHL API'. Maps to Supabase table: ghl_locations. Maps to n8n workflows: CRM — GHL
  Sync series.
---

# GHL Operations

GoHighLevel CRM and automation management across 22 Kollective locations spanning all divisions.

## System Architecture

### Location Structure
The Kollective operates 22 GHL locations (subaccounts), each representing a brand or functional unit. Every location has its own PIT token, pipelines, contacts, tags, and automations.

### Location Registry

| # | Location Name | Division | Status | Primary Use |
|---|---|---|---|---|
| 1 | Angel Wings | Casper Group | Active | Kitchen partner CRM |
| 2 | Pasta Bish | Casper Group | Active | Kitchen partner CRM |
| 3 | Taco Yaki | Casper Group | Active | Kitchen partner CRM |
| 4 | Patty Daddy | Casper Group | Active | Kitchen partner CRM |
| 5 | Espresso Co | Casper Group | Active | Kitchen partner CRM |
| 6 | Morning After | Casper Group | Active | Kitchen partner CRM |
| 7 | Toss'd | Casper Group | Active | Kitchen partner CRM |
| 8 | Sweet Tooth | Casper Group | Active | Kitchen partner CRM |
| 9 | Mojo Juice | Casper Group | Active | Kitchen partner CRM |
| 10 | Mr. Oyster | Casper Group | Active | Kitchen partner CRM |
| 11 | HugLife Events | HugLife | Active | Event partner/sponsor CRM |
| 12 | Forever Futbol | Scented Flowers | Active | Sponsor/partner CRM |
| 13 | Living Legends | Scented Flowers | Active | Sponsor/partner CRM |
| 14 | Women Make The World | Scented Flowers | Active | Sponsor/partner CRM |
| 15 | Fallen Stars | Scented Flowers | Active | Sponsor/partner CRM |
| 16 | Umbrella Group | Umbrella | Active | Service client CRM |
| 17 | Bodegea | Bodegea | Active | Product partner/distributor CRM |
| 18 | Opulence Designs | Opulence | Active | Art buyer/collector CRM |
| 19 | Inner Circle | Inner Circle | Active | App user management |
| 20 | Playmakers | Playmakers | Active | Donor/partner CRM |
| 21 | Kollective HQ | Corporate | Active | Master CRM, cross-brand |
| 22 | Brand Studio | Umbrella | Active | Client CRM |

### PIT Token Management
Each location requires a Private Integration Token (PIT) for API access. Tokens are stored in Supabase `ghl_locations` table.

**Token fields:**
- `location_id` — GHL internal location ID
- `location_name` — Human-readable name
- `pit_token` — The actual token
- `division` — Parent division
- `token_scope` — Permissions granted (contacts, pipelines, conversations, etc.)
- `last_verified` — Date token was last confirmed working
- `active` — Boolean

**Common Token Issues:**
- Pipeline creation requires elevated scope — many event subaccount tokens lack this
- Token expiration — PIT tokens can expire; refresh via GHL admin
- Scope limitations — Some operations (pipeline creation, workflow modification) require agency-level access

## Standard Pipeline Configurations

### Casper Group Pipeline (per kitchen brand)
```
NEW LEAD
  → QUALIFIED (kitchen verified, decision maker identified)
  → NDA SENT (NDA delivered, awaiting signature)
  → NDA SIGNED (NDA returned, details can be shared)
  → SITE WALK SCHEDULED (date confirmed)
  → SITE APPROVED (kitchen meets requirements)
  → TRAINING (staff training in progress)
  → ACTIVE (kitchen live, generating revenue)
  → CHURNED (kitchen deactivated)
```

### HugLife Events Pipeline
```
NEW PROSPECT
  → CONTACTED (first touch sent)
  → CALL BOOKED (10-min call scheduled)
  → CALL COMPLETED (call happened, interest confirmed)
  → DECK SENT (partner deck delivered)
  → NEGOTIATION (terms being discussed)
  → SLOT RESERVED (verbal commitment)
  → CONTRACT SENT (agreement delivered)
  → SIGNED (contract executed)
  → ACTIVATED (partner integrated into event)
  → COMPLETED (event finished, partner fulfilled)
```

### Forever Futbol / Scented Flowers Pipeline
```
NEW PROSPECT
  → CONTACTED (first outreach)
  → CALL BOOKED (10-min call)
  → CALL COMPLETED (interest confirmed)
  → DECK SENT (sponsor deck)
  → CATEGORY HELD (slot tentatively reserved)
  → NEGOTIATION (terms discussion)
  → CONTRACT SENT
  → SIGNED
  → INTEGRATION PLANNING (pre-event setup)
  → ACTIVATED (live in installation)
  → COMPLETED (installation finished)
```

### Umbrella Group Pipeline (per service)
```
INQUIRY
  → CONSULTATION BOOKED
  → CONSULTATION COMPLETED
  → PROPOSAL SENT
  → NEGOTIATION
  → AGREEMENT SIGNED
  → ONBOARDING
  → ACTIVE CLIENT
  → COMPLETED / RENEWED
```

### Bodegea Pipeline
```
LEAD
  → SAMPLE REQUESTED
  → SAMPLE SENT
  → FOLLOW-UP
  → ORDER NEGOTIATION
  → FIRST ORDER
  → REPEAT CUSTOMER
  → DISTRIBUTION PARTNER
```

## Standard Tag System

### Universal Tags (all locations)
| Tag | Purpose |
|---|---|
| `source:inbound` | Contact came to us |
| `source:outbound` | We reached out first |
| `source:referral` | Referred by someone |
| `source:event` | Met at event |
| `source:social` | From social media |
| `priority:high` | Top priority contact |
| `priority:medium` | Standard priority |
| `priority:low` | Low priority |
| `status:active` | Currently engaged |
| `status:dormant` | No activity 30+ days |
| `status:dnc` | Do not contact |

### Division-Specific Tags

**Casper Group:**
| Tag | Purpose |
|---|---|
| `kitchen:verified` | Kitchen inspected and qualified |
| `kitchen:compliant` | Meets all requirements |
| `nda:signed` | NDA executed |
| `nda:pending` | NDA sent, not returned |
| `site-walk:scheduled` | Visit date set |
| `site-walk:completed` | Visit done |
| `training:in-progress` | Staff being trained |
| `training:complete` | Ready to activate |
| `active-kitchen` | Live and generating orders |
| `churned` | Kitchen deactivated |

**HugLife Events:**
| Tag | Purpose |
|---|---|
| `partner:confirmed` | Signed partner |
| `partner:prospect` | In pipeline |
| `category:[type]` | e.g., category:water, category:spirits |
| `event:[name]` | e.g., event:paparazzi, event:gangsta-gospel |
| `city:[city]` | e.g., city:atlanta, city:houston |
| `tour:2026` | Part of 2026 tour roster |

**Forever Futbol:**
| Tag | Purpose |
|---|---|
| `sponsor:confirmed` | Signed sponsor |
| `sponsor:prospect` | In pipeline |
| `category:[type]` | Category slot type |
| `city:[city]` | Installation city |
| `world-cup-window` | World Cup period activation |

## Standard Custom Fields

### Universal Custom Fields (all locations)
| Field Name | Type | Purpose |
|---|---|---|
| `brand_source` | Dropdown | Which brand initiated contact |
| `division` | Dropdown | Parent division |
| `lead_score` | Number | 0-100 lead score |
| `last_outreach_date` | Date | Most recent outreach touch |
| `outreach_channel` | Dropdown | Email/DM/Text/Phone |
| `sequence_stage` | Dropdown | Where in outreach sequence |
| `decision_maker` | Yes/No | Is this the decision maker? |
| `dm_name` | Text | Decision maker name (if different) |
| `dm_email` | Text | Decision maker direct email |
| `dm_phone` | Text | Decision maker direct phone |

### Casper Group Custom Fields
| Field Name | Type | Purpose |
|---|---|---|
| `kitchen_address` | Text | Physical kitchen location |
| `kitchen_type` | Dropdown | Restaurant, cloud kitchen, commissary |
| `daily_capacity` | Number | Estimated daily order capacity |
| `current_platforms` | Multi-select | DoorDash, UberEats, Grubhub, etc. |
| `profit_share_pct` | Number | Agreed profit share percentage |
| `activation_date` | Date | When kitchen went live |
| `monthly_revenue` | Number | Trailing month revenue |

### Event Custom Fields
| Field Name | Type | Purpose |
|---|---|---|
| `partner_category` | Dropdown | Category slot type |
| `partnership_value` | Number | Dollar value of deal |
| `payment_type` | Dropdown | Cash, product, hybrid |
| `events_committed` | Number | How many events in deal |
| `cities_committed` | Multi-select | Which cities |

## GHL API Operations

### Contact Management
```
# Create Contact
POST https://services.leadconnectorhq.com/contacts/
Headers: Authorization: Bearer {pit_token}, Version: 2021-07-28
Body: { firstName, lastName, email, phone, tags: [], customFields: [] }

# Update Contact
PUT https://services.leadconnectorhq.com/contacts/{contactId}
Headers: Authorization: Bearer {pit_token}, Version: 2021-07-28
Body: { field: value }

# Add Tags
POST https://services.leadconnectorhq.com/contacts/{contactId}/tags
Body: { tags: ["tag1", "tag2"] }

# Search Contacts
GET https://services.leadconnectorhq.com/contacts/?query={search}&locationId={locationId}
```

### Pipeline Operations
```
# Create Opportunity
POST https://services.leadconnectorhq.com/opportunities/
Body: { pipelineId, pipelineStageId, contactId, name, monetaryValue }

# Update Stage
PUT https://services.leadconnectorhq.com/opportunities/{id}/status
Body: { status: "open/won/lost", pipelineStageId: "new_stage_id" }
```

### Conversation/Messaging
```
# Send SMS
POST https://services.leadconnectorhq.com/conversations/messages
Body: { type: "SMS", contactId, message }

# Send Email
POST https://services.leadconnectorhq.com/conversations/messages
Body: { type: "Email", contactId, subject, message, emailFrom }
```

## Output Modes

### MODE 1: Location Setup
Complete setup checklist for a new GHL location:
1. Subaccount creation
2. PIT token generation and storage
3. Pipeline configuration
4. Tag system setup
5. Custom field creation
6. Automation rules
7. n8n integration setup
8. Supabase sync configuration

### MODE 2: Pipeline Design
Custom pipeline for a specific brand/use case:
- Stage definitions with entry/exit criteria
- Automation triggers per stage
- Tag applications per stage
- Time-in-stage thresholds
- Escalation rules

### MODE 3: Standardization Audit
Audit all 22 locations for consistency:
- Pipeline stage naming
- Tag system compliance
- Custom field coverage
- Automation rule consistency
- Token status verification

### MODE 4: API Integration
Design GHL ↔ Supabase ↔ n8n integration:
- Data flow mapping
- Sync frequency
- Conflict resolution
- Error handling
- Field mapping

### MODE 5: Bulk Operations
Mass updates across multiple locations:
- Contact import/export
- Tag bulk apply/remove
- Pipeline stage migrations
- Custom field updates
- Cross-location reporting

## Known Issues & Workarounds

1. **Pipeline creation requires elevated scope** — Many PIT tokens lack `pipelines.write`. Workaround: Create pipelines manually in GHL admin, then manage via API.
2. **Token expiration** — Monitor `last_verified` dates. Refresh cycle: check monthly.
3. **Rate limits** — GHL API: 100 requests/minute per location. Batch operations in n8n with delays.
4. **Custom field sync** — GHL custom field IDs are location-specific. Map by name, not ID, when syncing across locations.
5. **Contact deduplication** — GHL does not auto-dedup. Run dedup via Supabase before syncing.

## Automation Hooks

| Hook | System | Purpose |
|---|---|---|
| Contact sync | n8n scheduled | GHL → Supabase bidirectional sync (hourly) |
| Pipeline stage change | n8n webhook | Trigger outreach, notifications on stage change |
| Token health check | n8n scheduled | Weekly verification of all 22 PIT tokens |
| Tag standardization | n8n scheduled | Monthly audit of tag usage across locations |
| Custom field sync | n8n scheduled | Ensure custom fields consistent across locations |
| Bulk contact import | n8n webhook | Receive CSV → parse → distribute to correct locations |
