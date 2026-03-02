---
name: data-enrichment
description: >
  Contact data enrichment, quality scoring, and profile completion engine for the Kollective
  CRM system. Use this skill whenever the user wants to: enrich contact records, scrape
  public profiles, build lead intelligence, score data quality, deduplicate contacts,
  validate emails/phones, build prospect lists, or improve any contact data in Supabase.
  Triggers include: 'enrich', 'data quality', 'scrape', 'profile', 'email validation',
  'phone validation', 'dedup', 'deduplicate', 'lead list', 'prospect research', 'contact
  intelligence', 'data cleanup', 'data health'. Maps to n8n workflow: GROWTH-01 Slow
  Scraper, GROWTH-02 Lead Enrichment, GROWTH-03 Data Quality. Maps to Supabase tables:
  identities, identity_identifiers, enrichment_logs.
---

# Data Enrichment Engine

Contact intelligence and data quality system for the Kollective's 112,000+ contact database across all divisions.

## Core Principle

Bad data produces bad outreach, bad analytics, and bad decisions. The Kollective's contact database is only as valuable as its accuracy and completeness. Every contact record should have enough intelligence to power personalized outreach without a single manual lookup.

## Enrichment Architecture

### Layer 1: Basic Identity (Required — minimum viable contact)
| Field | Source | Priority |
|---|---|---|
| Full name | Form, import, manual | Critical |
| Email | Form, import, scrape | Critical |
| Phone | Form, import, scrape | High |
| City/State | Form, IP geolocation, manual | High |
| Source | Auto-tagged on creation | Critical |
| Brand/Division | Auto-assigned based on source | Critical |

### Layer 2: Professional Profile (Enriched — for B2B outreach)
| Field | Source | Priority |
|---|---|---|
| Company name | LinkedIn, website, manual | High |
| Job title | LinkedIn, email signature, manual | High |
| Industry | Company lookup, manual | Medium |
| Company size | LinkedIn, database lookup | Medium |
| LinkedIn URL | Scrape, manual | High |
| Instagram handle | Scrape, form, manual | High |
| Website | Company lookup, manual | Medium |
| Decision maker status | Manual tag or title inference | High |

### Layer 3: Intelligence (Advanced — for personalized outreach)
| Field | Source | Priority |
|---|---|---|
| Past event attendance | Supabase event records | High |
| Purchase history | Supabase order records | High |
| Engagement score | Calculated from interactions | High |
| Content interests | Inferred from behavior | Medium |
| Preferred contact channel | Response data analysis | Medium |
| Best contact time | Response time analysis | Medium |
| Referral source | CRM tracking | Medium |
| Partnership potential score | Calculated from profile + behavior | Medium |
| Competitor relationships | Research, social monitoring | Low |
| Budget authority indicator | Title + company size inference | Medium |

### Layer 4: Brand-Specific Intelligence
| Division | Extra Fields | Source |
|---|---|---|
| Casper Group | Kitchen type, capacity, current platforms, compliance status | Site visit, research |
| HugLife Events | Past sponsorships, brand category, partnership value range | Research, outreach history |
| Forever Futbol | Sports marketing budget, WC activation plans, category fit | Research |
| Bodegea | Distribution channels, retail presence, buyer type | Research |
| Umbrella Group | Service needs, pain points, contract status | Intake, consultation |

## Enrichment Sources & Methods

### Automated Sources (n8n workflows)
| Source | Data Yielded | Rate Limit | Method |
|---|---|---|---|
| LinkedIn (public) | Title, company, bio, connections | 50/hour | GROWTH-01 slow scrape |
| Instagram (public) | Bio, follower count, content type | 100/hour | API + scrape |
| Company websites | About page, team, contact info | 200/hour | Web scrape |
| Google Maps/Places | Business info, reviews, hours | 100/hour | Places API |
| Email validation services | Valid/invalid/risky status | Bulk batch | API (ZeroBounce, NeverBounce) |
| Phone validation | Valid/invalid, carrier, type | Bulk batch | API (Twilio Lookup) |
| Clearbit/Apollo | Company data, contacts | Per plan limits | API |

### Manual Enrichment (VA tasks)
| Task | When | Target | SOP |
|---|---|---|---|
| LinkedIn profile lookup | High-value leads | Decision makers | Search by name + company, capture all Layer 2 fields |
| Instagram audit | Event/sponsor prospects | Brand accounts | Capture handle, follower count, content style, engagement rate |
| Website research | Kitchen prospects (Casper) | Restaurant websites | Capture menu, hours, platform presence, owner info |
| Google Maps verification | All business contacts | Physical locations | Verify address, hours, phone, reviews |

### Slow Scraping Protocol (GROWTH-01)

#### Rules (Compliance-First)
1. Only scrape publicly available information
2. Respect robots.txt on all sites
3. Rate limit: never exceed 50 requests/hour per source
4. Rotate user agents and IPs
5. Never scrape behind login walls
6. Never scrape private/protected profiles
7. Store scraped data with source attribution
8. Respect GDPR/CCPA — honor opt-out/deletion requests
9. No scraping from social platforms that explicitly prohibit it in ToS (use official APIs where available)
10. Log all scrape operations in `enrichment_logs` table

#### Target Sources by Division
| Division | Primary Scrape Sources |
|---|---|
| Casper Group | Google Maps, Yelp, DoorDash listings, restaurant websites |
| HugLife Events | LinkedIn, Instagram, brand websites, Eventbrite |
| Scented Flowers | LinkedIn, brand websites, sponsorship databases |
| Bodegea | Retailer websites, distributor directories, LinkedIn |
| Umbrella Group | LinkedIn, Google Business, industry directories |

## Data Quality Scoring

### Contact Completeness Score (0-100)

| Field Present | Points |
|---|---|
| Full name | 10 |
| Valid email | 15 |
| Valid phone | 10 |
| City/State | 5 |
| Company name | 10 |
| Job title | 10 |
| LinkedIn URL | 5 |
| Instagram handle | 5 |
| Decision maker confirmed | 10 |
| Engagement history (any interaction) | 10 |
| Source tracked | 5 |
| Brand/Division assigned | 5 |
| **Total possible** | **100** |

### Quality Tiers
| Tier | Score | Action |
|---|---|---|
| Gold | 80-100 | Ready for personalized outreach |
| Silver | 60-79 | Enrichment recommended before outreach |
| Bronze | 40-59 | Needs significant enrichment |
| Raw | 0-39 | Incomplete — enrich or archive |

### Quality Rules
- Never send personalized outreach to Bronze or Raw contacts
- Silver contacts get generic (template-only) outreach
- Gold contacts get fully personalized outreach
- Run quality scoring nightly via n8n scheduled workflow
- Flag contacts that drop from Gold/Silver (data decay detection)

## Deduplication System

### Match Priority (in order)
1. **Exact email match** — highest confidence, auto-merge
2. **Exact phone match** — high confidence, auto-merge if email also matches
3. **Name + company match** — medium confidence, flag for review
4. **Name + city match** — low confidence, flag for manual review
5. **Fuzzy name match** (Levenshtein distance ≤ 2) — flag for manual review

### Merge Rules
When duplicates confirmed:
1. Keep the record with the highest completeness score as primary
2. Merge all unique data points from secondary into primary
3. Preserve all thread/message history from both records
4. Combine tags (union, not intersection)
5. Keep earliest `created_at` date
6. Keep most recent `updated_at` date
7. Log merge in `enrichment_logs` with both record IDs
8. Soft-delete secondary record (don't hard delete — maintain audit trail)

### Cross-Brand Dedup
- One person may be a contact in multiple brands (e.g., a sponsor prospect for HugLife AND Forever Futbol)
- Use `identities` table as unified record, `identity_identifiers` for brand-specific references
- NEVER merge records across tenants — link them via shared identity ID
- Each brand sees their own view of the contact with brand-specific fields

## Enrichment Pipeline (n8n Workflow)

### Automated Nightly Enrichment
```
[Cron: 2 AM nightly]
  → [Supabase: Pull contacts with quality score < 60]
  → [Batch: 50 contacts per run]
  → [For each contact:]
    → [IF missing email validation → validate email]
    → [IF missing phone validation → validate phone]
    → [IF missing company → attempt company lookup]
    → [IF missing LinkedIn → attempt LinkedIn search]
    → [IF missing IG → attempt Instagram search]
    → [Recalculate quality score]
    → [Update Supabase record]
    → [Log enrichment actions]
  → [Summary: Log batch results to enrichment_logs]
```

### On-Demand Enrichment (Webhook)
```
[Webhook: /enrich-contact]
  → [Receive: contact_id or email]
  → [Pull current record from Supabase]
  → [Run all enrichment layers]
  → [Update record]
  → [Return enriched profile]
```

### Bulk Import + Enrichment
```
[Webhook: /bulk-import]
  → [Receive: CSV or JSON array]
  → [Parse and validate format]
  → [Dedup check against existing database]
  → [Insert new records]
  → [Queue for enrichment pipeline]
  → [Return import summary: added, duplicates, errors]
```

## Output Modes

### MODE 1: Contact Enrichment
Enrich a single contact or batch:
1. Current data audit (what's missing)
2. Enrichment plan (which sources to query)
3. Enriched profile output
4. Quality score before and after
5. Recommended next action (outreach-ready or needs more)

### MODE 2: Data Quality Audit
Analyze database health:
1. Total contacts by quality tier
2. Missing field analysis (which fields are most incomplete)
3. Stale data detection (records not updated in 90+ days)
4. Duplicate estimate
5. Division-level quality comparison
6. Improvement recommendations

### MODE 3: Deduplication Run
Execute or plan dedup:
1. Duplicate detection (by match type)
2. Merge recommendations
3. Confidence scoring
4. Manual review queue
5. Post-merge validation

### MODE 4: Lead List Building
Build targeted prospect lists:
1. Criteria definition (title, industry, city, company size)
2. Source selection (which databases/platforms to search)
3. List generation with enrichment
4. Quality scoring of list
5. Segmentation for outreach
6. Export format (CSV, Supabase direct, GHL import)

### MODE 5: Enrichment Pipeline Design
Design custom enrichment workflow:
1. Target data points
2. Source prioritization
3. Rate limit planning
4. Error handling
5. Storage schema
6. Quality validation rules

### MODE 6: Data Decay Report
Track data freshness:
1. Records by last-updated date
2. Bounce rate trends (email decay)
3. Phone number validity trends
4. Company/title change detection
5. Re-enrichment recommendations
6. Archive candidates (contacts too decayed to recover)

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Nightly enrichment | n8n GROWTH-02 | Cron 2 AM | Enrich lowest-quality contacts |
| Quality scoring | n8n GROWTH-03 | Cron 3 AM | Recalculate all quality scores |
| Dedup scan | n8n scheduled | Weekly | Detect and flag duplicates |
| Email validation | n8n + API | New contact created | Validate email immediately |
| Phone validation | n8n + API | New contact created | Validate phone immediately |
| Bulk import | n8n webhook | CSV upload | Parse, dedup, import, queue enrichment |
| Enrichment on stage change | n8n + Supabase | Pipeline stage → "Qualified" | Full enrichment run on contact |
| Decay detection | n8n scheduled | Monthly | Flag stale records for re-enrichment |
| Quality dashboard update | n8n + Supabase | After enrichment runs | Update quality metrics for Command Center |

## Data Privacy & Compliance

1. **CCPA/GDPR:** Honor all opt-out and deletion requests within 30 days
2. **Data minimization:** Only collect data needed for operational purpose
3. **Source attribution:** Every data point must have source logged
4. **Consent tracking:** Track how/when contact was added and their consent status
5. **Right to access:** Be able to export all data held on any individual upon request
6. **Retention policy:** Archive inactive contacts after 2 years, delete after 3
7. **No dark patterns:** Never scrape private data, never buy lists, never harvest without consent
