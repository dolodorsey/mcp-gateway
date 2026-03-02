---
name: data-enrichment
description: >
  Contact and lead data enrichment, verification, and intelligence system. Use this skill
  whenever the user wants to: enrich contact data, verify emails, find missing information,
  build prospect profiles, research companies, scrape lead data, or improve data quality.
  Triggers include: 'enrich', 'enrichment', 'verify', 'data quality', 'research contact',
  'find email', 'find phone', 'prospect research', 'company research', 'scrape', 'data
  append'. Maps to n8n workflows: PR ENRICH + SCORE, MCP — Lead Intake + Score.
  Maps to agents: GROWTH-01 LeadScraper, GROWTH-02 LeadEnricher.
---

# Data Enrichment Engine

Contact intelligence and data quality system for the Kollective CRM.

## Enrichment Layers

### Layer 1: Basic Identity
- Full name (first, last)
- Primary email (verified)
- Phone number
- City, state
- Company name
- Job title

### Layer 2: Professional Profile
- LinkedIn URL
- Instagram handle
- Company website
- Company size (employees)
- Industry/vertical
- Decision-making authority (yes/no/unknown)

### Layer 3: Intelligence
- Recent social media activity themes
- Company news/events
- Mutual connections
- Content they engage with
- Tech stack (for B2B)
- Funding/growth signals

## Enrichment Sources & Methods

| Source | Data Points | Method |
|---|---|---|
| Instagram bio | Name, role, company, email, website | Bio parsing |
| LinkedIn | Title, company, location, connections | Manual lookup / slow scrape |
| Company website | About page, team page, contact info | Web scrape |
| Google search | News, press, social profiles | Search + parse |
| Email verification | Valid/invalid/catch-all | Verification API |
| Phone lookup | Carrier, type (mobile/landline) | Lookup API |

## Slow Scraping Protocol (GROWTH-01)

### Rules
- Maximum 50 profiles per hour per platform
- Randomized delays between requests (30-120 seconds)
- Rotate user agents
- Respect robots.txt
- No aggressive scraping — quality over quantity
- Store raw data in `scrape_pages` → process into `leads_raw` → qualify into `leads`

### Target Sources for Each Division
| Division | Scrape Targets |
|---|---|
| Casper Group | Restaurant listing sites, Google Maps, Yelp business profiles |
| HugLife/Scented Flowers | Brand marketing departments, experiential agencies, CMO lists |
| Umbrella Group | Local business directories, industry associations |
| Bodegea | Retail buyer contacts, distributor directories |

## Data Quality Scoring

### Contact Completeness Score (0-100)
| Field | Points |
|---|---|
| First name | 5 |
| Last name | 5 |
| Verified email | 20 |
| Phone number | 15 |
| Company name | 10 |
| Job title | 10 |
| City/state | 5 |
| LinkedIn URL | 10 |
| Instagram handle | 10 |
| Decision maker confirmed | 10 |

### Quality Tiers
- 80-100: Ready for outreach
- 60-79: Needs 1-2 fields enriched
- 40-59: Needs significant enrichment
- Below 40: Needs manual research or discard

## Enrichment Pipeline

```
RAW LEAD INTAKE →
  ├── Parse available fields
  ├── Check for duplicates (dedup against existing)
  ├── Score completeness
  ├── If score < 80 → Queue for enrichment
  │   ├── Auto-enrichment (email verification, bio parsing)
  │   ├── Semi-auto (LinkedIn lookup, web search)
  │   └── Manual queue (for high-value targets only)
  ├── Re-score after enrichment
  └── Route to lead scoring (MCP — Lead Intake + Score)
```

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| Contact enrichment + scoring | PR ENRICH + SCORE | Every 2 hours |
| Lead intake + scoring | MCP — Lead Intake + Score | Webhook |
| Scraping jobs | Custom (GROWTH-01) | Scheduled |
| Data quality report | MCP — Daily KPI Digest | Nightly |
