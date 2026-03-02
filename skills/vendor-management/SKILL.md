---
name: vendor-management
description: >
  Vendor procurement, management, and performance tracking for all Kollective divisions.
  Use this skill whenever the user wants to: source vendors, manage vendor relationships,
  create purchase orders, process invoices, negotiate vendor contracts, evaluate vendor
  performance, build vendor rosters by city, or manage any supplier/contractor relationship.
  Triggers include: 'vendor', 'supplier', 'contractor', 'purchase order', 'PO', 'invoice',
  'procurement', 'vendor list', 'vendor review', 'vendor contract', 'sourcing'. Maps to
  Supabase tables: vendors, vendor_reviews, purchase_orders, invoices. Maps to n8n workflow:
  OPS — Vendor Management. Cross-references multi-city-logistics for city-specific vendors.
---

# Vendor Management Engine

Procurement and vendor relationship system for all Kollective divisions across all operating cities.

## Core Principle

Every vendor interaction represents the Kollective brand they serve. Vendors are extensions of the operation — unreliable vendors create unreliable experiences. The system prioritizes locked relationships with proven operators over constantly sourcing new vendors.

## Vendor Categories by Division

### Casper Group (Food Operations)
| Category | What They Provide | Frequency | Critical Level |
|---|---|---|---|
| Food suppliers | Ingredients, raw materials per brand recipe | Daily/weekly | Critical |
| Packaging suppliers | Branded containers, bags, utensils | Weekly/monthly | High |
| Delivery platform support | DoorDash, UberEats, Grubhub account management | Ongoing | Critical |
| Kitchen equipment | Prep tools, cooking equipment, maintenance | As needed | Medium |
| Cleaning services | Kitchen deep clean, post-shift | Daily/weekly | High |
| Health inspection prep | Compliance audits, certifications | Quarterly | High |
| Printer/labels | Menu cards, stickers, branded labels | Monthly | Medium |

### HugLife Events
| Category | What They Provide | Frequency | Critical Level |
|---|---|---|---|
| Venue providers | Event spaces, clubs, outdoor venues | Per event | Critical |
| AV/Production | Sound, lighting, staging, LED screens | Per event | Critical |
| Security | Licensed guards, crowd management | Per event | Critical |
| Bar/Catering | Beverage service, bartenders | Per event | High |
| Photography | Event photography, content capture | Per event | High |
| Videography | Event video, recap reels | Per event | High |
| DJ/Talent | Entertainment, hosts, performers | Per event | High |
| Décor/Staging | Visual environment, props, florals | Per event | Medium |
| Cleaning | Post-event cleanup | Per event | Medium |
| Staffing agencies | Door staff, brand ambassadors | Per event | Medium |
| Print/Signage | Banners, step & repeat, directional | Per event | Medium |
| Transportation | Shuttles, VIP transport | Per event | Low |
| Insurance | Event liability coverage | Per event | Critical |

### Scented Flowers (Museums)
| Category | What They Provide | Frequency | Critical Level |
|---|---|---|---|
| Fabrication/Build-out | Museum installation construction | Per installation | Critical |
| Exhibit design | Curation, layout, display systems | Per installation | Critical |
| AV/Interactive | Audio guides, interactive displays, projections | Per installation | High |
| Venue/Real estate | Gallery/warehouse spaces | Per city | Critical |
| Art handling | Transport, installation of artwork | Per exhibition | High |
| Insurance | Fine art + event liability | Per installation | Critical |
| Marketing/PR | Local press, influencer activations | Per city launch | Medium |

### Bodegea (Products)
| Category | What They Provide | Frequency | Critical Level |
|---|---|---|---|
| Manufacturers | Product production (water, energy, spirits) | Ongoing | Critical |
| Packaging/Labeling | Bottles, cans, labels, boxes | Per production run | Critical |
| Distribution | Warehousing, logistics, delivery | Ongoing | Critical |
| Compliance/Testing | Lab testing, FDA compliance, licensing | Per product | Critical |
| Design/Branding | Packaging design, label design | Per product launch | High |

### Umbrella Group (Services)
| Category | What They Provide | Frequency | Critical Level |
|---|---|---|---|
| Legal counsel | Contract review, compliance | Ongoing | High |
| Accounting/Bookkeeping | Financial management support | Monthly | High |
| IT/Tech support | Systems maintenance, development | Ongoing | Medium |
| Office supplies | Operational materials | Monthly | Low |
| Marketing agencies | Ad campaigns, creative support | Per campaign | Medium |

## Vendor Tier System

| Tier | Name | Criteria | Payment Terms | Relationship |
|---|---|---|---|---|
| 1 | Locked Partner | Proven over 5+ events/engagements, excellent ratings, exclusive | Net 30 | Long-term contract |
| 2 | Preferred | Proven over 3+ events, strong ratings | Net 15 or due on event | Repeat, first-call |
| 3 | On-Call | Vetted, used 1-2 times, reliable | Due on event or Net 7 | Available backup |
| 4 | Trial | New, unvetted, first engagement | Prepay or COD | Single trial basis |
| 5 | Blacklisted | Failed performance, reliability, or trust | N/A | Do not use |

### Tier Movement Rules
- **Trial → On-Call:** After 1 successful engagement + 4.0+ average rating
- **On-Call → Preferred:** After 3 successful engagements + 4.2+ average
- **Preferred → Locked:** After 5 successful engagements + 4.5+ average + contract signed
- **Any → Blacklisted:** 2+ critical failures OR 1 trust/integrity violation
- **Blacklist review:** Annual review, can be reinstated if conditions documented and resolved

## Procurement Workflow

### Standard Procurement Process
```
1. NEED IDENTIFIED → Event planned, supply needed, service required
2. VENDOR CHECK → Search Supabase vendors table for existing Tier 1-3 vendors
3. IF EXISTS → Contact vendor, confirm availability, get quote
4. IF NEW → Source 3 candidates, evaluate, trial one
5. QUOTE REVIEW → Compare to budget, negotiate if needed
6. PO ISSUED → Purchase order generated with all details
7. SERVICE DELIVERED → Vendor performs
8. QUALITY CHECK → Verify delivery matches PO specifications
9. INVOICE PROCESSED → Receive invoice, match to PO, approve
10. PAYMENT → Process per vendor tier payment terms
11. PERFORMANCE REVIEW → Rate vendor post-engagement
12. DATABASE UPDATE → Update Supabase vendor record
```

## Purchase Order Template

```
PURCHASE ORDER #: PO-{DIVISION}-{YEAR}-{SEQUENCE}
DATE: {date}
VENDOR: {vendor_name}
VENDOR ID: {supabase_vendor_id}

BRAND/DIVISION: {brand_name}
EVENT/PROJECT: {reference}
DELIVERY DATE: {date}
DELIVERY LOCATION: {address}

ITEMS:
| # | Description | Qty | Unit Price | Total |
|---|---|---|---|---|
| 1 | {item} | {qty} | ${price} | ${total} |
| 2 | {item} | {qty} | ${price} | ${total} |

SUBTOTAL: ${subtotal}
TAX: ${tax}
TOTAL: ${total}

PAYMENT TERMS: {per vendor tier}
SPECIAL INSTRUCTIONS: {any notes}

AUTHORIZED BY: {name}
DATE: {date}
```

## Invoice Processing

### Invoice Verification Checklist
- [ ] Invoice matches PO number and amounts
- [ ] Vendor name and details match database
- [ ] Quantities delivered match quantities invoiced
- [ ] Quality of delivery verified
- [ ] Tax calculations correct
- [ ] Payment terms match agreed terms
- [ ] No duplicate invoice (check against existing)
- [ ] Authorized approver sign-off

### Approval Thresholds
| Amount | Approval Required |
|---|---|
| Under $500 | Operations manager |
| $500 - $2,500 | Division head |
| $2,500 - $10,000 | Dr. Dorsey |
| Over $10,000 | Dr. Dorsey + finance review |

## Vendor Performance Tracking

### Post-Engagement Rating (Every Interaction)
| Dimension | Score (1-5) | Weight |
|---|---|---|
| Punctuality | Did they show up/deliver on time? | 20% |
| Quality | Did the output meet specifications? | 30% |
| Communication | Were they responsive and clear? | 20% |
| Problem Resolution | How did they handle issues? | 15% |
| Value | Was pricing fair for quality delivered? | 15% |

**Composite Score = Weighted average**

### Quarterly Vendor Review
- Pull all vendor ratings from Supabase
- Rank vendors by category and city
- Identify underperformers (below 3.5 average)
- Identify star performers (above 4.5 average)
- Recommend tier changes
- Flag contracts for renewal or termination

## Vendor Database Schema (Supabase)

```sql
vendors:
  id, name, category, division, city, tier,
  contact_name, contact_email, contact_phone,
  payment_terms, tax_id, insurance_status,
  average_rating, total_engagements,
  last_engagement_date, notes, active,
  created_at, updated_at

vendor_reviews:
  id, vendor_id, event_id, project_id,
  punctuality_score, quality_score,
  communication_score, problem_resolution_score,
  value_score, composite_score,
  notes, reviewer, review_date

purchase_orders:
  id, po_number, vendor_id, brand, division,
  event_id, items (jsonb), subtotal, tax, total,
  payment_terms, status, approved_by,
  created_at, delivered_at, paid_at

invoices:
  id, invoice_number, vendor_id, po_id,
  amount, tax, total, status,
  received_date, approved_date, paid_date,
  approved_by, notes
```

## Output Modes

### MODE 1: Vendor Sourcing
Find and evaluate vendors for a specific need:
1. Category and requirements definition
2. City/market specification
3. Budget parameters
4. Search existing database first
5. If new vendors needed: sourcing criteria
6. Evaluation matrix
7. Outreach template for vendor inquiry
8. Comparison framework

### MODE 2: Vendor Roster
Complete vendor list for a city or event:
- All categories covered
- Tier assignments
- Contact info
- Payment terms
- Availability notes
- Backup vendors per category

### MODE 3: Purchase Order Generation
Create PO from specifications:
- Auto-populate vendor details from database
- Line items with pricing
- Payment terms per vendor tier
- Approval routing
- Delivery instructions

### MODE 4: Performance Report
Vendor performance analysis:
- Individual vendor scorecard
- Category benchmarking
- City-level comparison
- Tier change recommendations
- Contract renewal decisions
- Cost optimization opportunities

### MODE 5: Contract Template
Standard vendor contract framework:
- Scope of services
- Payment terms and schedule
- Quality standards
- Cancellation policy
- Insurance requirements
- Liability provisions
- Exclusivity terms (if applicable)
- Renewal conditions

### MODE 6: Vendor Onboarding
New vendor setup process:
- Information collection checklist
- Insurance verification
- Tax documentation
- Database entry
- Trial engagement plan
- Performance benchmark expectations

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| Vendor search | n8n + Supabase | Event created | Auto-pull available vendors by city/category |
| PO generation | n8n webhook | PO request | Generate PO, route for approval |
| Invoice matching | n8n + Supabase | Invoice received | Match to PO, flag discrepancies |
| Performance logging | n8n webhook | Event completed | Trigger rating forms for each vendor used |
| Tier review | n8n scheduled | Quarterly | Run performance analysis, recommend tier changes |
| Payment reminders | n8n scheduled | Invoice approved | Track payment due dates, send reminders |
| Insurance expiry alerts | n8n scheduled | Monthly | Flag vendors with expiring insurance |
| Vendor communication | n8n + email | Various | Booking confirmations, schedule changes, follow-ups |
