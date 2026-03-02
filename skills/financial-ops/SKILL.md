---
name: financial-ops
description: >
  Financial operations, modeling, and reporting engine for all Kollective divisions. Use this
  skill whenever the user wants to: create P&L statements, model profit share structures,
  build budgets, forecast revenue, calculate event economics, model kitchen placement
  profitability, create sponsor pricing tiers, track expenses, or build any financial model
  or report. Triggers include: 'P&L', 'profit', 'revenue', 'budget', 'forecast', 'expenses',
  'pricing', 'financial model', 'profit share', 'cost analysis', 'event budget', 'sponsor
  pricing', 'ROI', 'unit economics', 'break even', 'margins', 'cash flow'. Maps to Supabase
  tables: financial_records, revenue_tracking, expense_tracking, sponsor_deals. Maps to
  n8n workflow: ANALYTICS — Revenue Tracker, ANALYTICS — Expense Logger.
---

# Financial Operations Engine

Financial modeling, tracking, and reporting system for the Kollective Hospitality Group. 8 divisions, 48+ brands, each with distinct revenue models and cost structures.

## Core Principle

Every brand in the Kollective is a P&L center. Division-level financials roll up to the enterprise, but each brand must be independently accountable. Financial models must be conservative, defensible, and built for investor scrutiny.

## Revenue Models by Division

### Casper Group (Food/Ghost Kitchen)
**Model:** Delivery volume → revenue share → net profit split with kitchen partner
- Revenue = Delivery orders × average order value
- COGS = Food cost (managed by Casper) + packaging + platform fees
- Gross profit = Revenue - COGS
- Kitchen partner share = Gross profit × 25% (target)
- Casper net = Gross profit × 75%
- Per-location target: $3K-8K/month net to Casper per active kitchen
- Activation cost: Training + initial inventory + systems setup

**Key Metrics:**
| Metric | Target | Calculation |
|---|---|---|
| Average order value | $18-25 | Revenue / orders |
| Orders per day per kitchen | 25-50 | Daily order count |
| Food cost % | 28-32% | COGS / revenue |
| Platform fee % | 15-30% | Varies by platform (DoorDash, UberEats, etc.) |
| Net margin per kitchen | 18-25% | Net profit / revenue |
| Activation cost | $2K-5K | One-time per kitchen |
| Payback period | 30-60 days | Activation cost / monthly net |

### HugLife Events
**Model:** Ticket sales + sponsor revenue + bar/concession + content licensing
- Ticket revenue = Tickets sold × price tier weighted average
- Sponsor revenue = Category slot fees (per event or per tour)
- Bar/concession = Per-head spend × attendance × margin
- Content licensing = Post-event content packages to partners

**Per-Event Budget Template:**
| Category | Typical Range | Notes |
|---|---|---|
| Venue rental | $2K-15K | Varies by city/venue tier |
| Production | $3K-10K | Sound, lighting, staging |
| Talent/DJ | $1K-8K | Varies by event type |
| Marketing | $1K-5K | Ads, flyers, influencer fees |
| Staffing | $1K-4K | Security, bar, door, operations |
| Insurance | $500-2K | Per-event liability |
| Permits/licensing | $200-1K | City/venue dependent |
| Miscellaneous | $500-2K | Contingency buffer |
| **Total expense** | **$9K-47K** | |
| Ticket revenue target | $15K-60K | Based on capacity × price |
| Sponsor revenue | $5K-50K | Per partner slot value |
| Bar revenue | $3K-15K | Per-head × attendance |
| **Total revenue target** | **$23K-125K** | |
| **Target margin** | **40-60%** | After all expenses |

### Forever Futbol (Museum Series)
**Model:** Ticket sales + sponsor integration + merchandise + content
- Ticket revenue = Daily capacity × ticket price × operating days × sell-through rate
- Sponsor revenue = Category slots × per-city fee × number of cities
- Merchandise = On-site sales + online (margin-dependent)

**Per-City Installation Economics:**
| Line Item | Range |
|---|---|
| Venue lease (3-6 months) | $15K-60K |
| Build-out/fabrication | $20K-80K |
| Staffing (duration) | $10K-40K |
| Marketing/launch | $5K-20K |
| Insurance + permits | $2K-8K |
| Operations/maintenance | $5K-15K |
| **Total investment per city** | **$57K-223K** |
| Target ticket revenue | $80K-300K |
| Target sponsor revenue | $50K-200K |
| **Target return** | **2-3x investment** |

### Scented Flowers (Other Museum Series)
Similar to Forever Futbol but varies by installation:
- Living Legends, Women Make The World, Fallen Stars — each has unique cost structure
- Revenue model identical: tickets + sponsors + merchandise + content

### Umbrella Group (Services)
**Model:** Fee-for-service + referral commissions + recurring contracts
- Each service entity has its own revenue model
- Auto Exchange: Referral fees per transaction
- Injury Network: Referral fees per case
- Realty Group: Commission splits
- Clean Services: Recurring service contracts
- Accounting: Monthly retainer + project fees
- Brand Studio: Project-based creative fees
- Automation Office: Setup + monthly management fees
- Mind Studio: Session-based + program fees
- Legal & Compliance: Retainer + hourly

### Bodegea (Products)
**Model:** Wholesale + DTC + event/venue placement + licensing
- Infinity Water: Per-case wholesale, venue contracts, event placement
- Pronto Energy: Same structure as water with energy drink margins
- Noir (Espresso Liqueur): Higher margin, smaller volume, premium placement
- Stush: Product-dependent

**Product Economics Template:**
| Metric | Water/Energy | Spirits |
|---|---|---|
| COGS per unit | $0.30-0.80 | $4-8 |
| Wholesale price | $1.00-2.00 | $15-25 |
| Retail/DTC price | $2.50-4.00 | $35-55 |
| Gross margin (wholesale) | 50-65% | 55-70% |
| Gross margin (DTC) | 70-82% | 75-85% |

### Opulence Designs (Art)
**Model:** Art sales + commissions + licensing + exhibition fees
- Per-piece pricing based on medium, size, artist
- Commission structure for custom work
- Licensing for reproduction/merchandise

### Inner Circle (Apps)
**Model:** Freemium + subscription + transaction fees
- Good Times: Event discovery → ticket transaction fees
- Roadside: Service access → per-use or subscription
- On Call: Service platform → transaction/subscription hybrid

### Playmakers (Non-Profit)
**Model:** Donations + grants + event fundraising + corporate partnerships
- Sole Exchange: Shoe drive events, corporate sponsorship
- Let's Talk About It: Workshop fees, grants, speaking fees

## Financial Reporting Structure

### Level 1: Brand P&L (Monthly)
Every brand produces:
- Revenue by stream
- COGS / direct costs
- Gross profit + margin
- Operating expenses
- Net profit + margin
- Key metrics vs. targets
- Variance analysis

### Level 2: Division P&L (Monthly)
Each division aggregates brand P&Ls:
- Total division revenue
- Division-level expenses (shared costs)
- Division net contribution
- Brand performance ranking

### Level 3: Enterprise P&L (Monthly)
Kollective Hospitality Group consolidated:
- All division contributions
- Corporate overhead
- Total enterprise revenue
- Total enterprise net
- Cash position
- Key ratios

## Output Modes

### MODE 1: Full Financial Model
Complete financial model including:
1. Revenue assumptions by stream
2. Cost structure (fixed + variable)
3. Monthly projections (12 months)
4. Break-even analysis
5. Sensitivity analysis (best/base/worst)
6. Key metrics dashboard
7. Cash flow projection

### MODE 2: Event Budget
Single event financial plan:
- Expense budget by category
- Revenue targets by stream
- Break-even attendance
- Sponsor revenue needed
- Contingency allocation
- Post-event P&L template

### MODE 3: Sponsor Pricing
Tier-based pricing structure:
- Category slot definitions
- Per-city pricing
- Multi-city bundle pricing
- Value justification per tier
- Negotiation floor and ceiling
- Payment terms

### MODE 4: Unit Economics
Per-unit profitability analysis:
- Revenue per unit (kitchen, event, installation, product)
- Cost per unit
- Margin per unit
- Payback period
- Lifetime value
- Acquisition cost

### MODE 5: Budget Template
Operational budget:
- Department/brand allocation
- Monthly spend limits
- Approval thresholds
- Variance tracking format
- Reforecast triggers

### MODE 6: Investor Financial Package
Investor-ready financials:
- Historical performance
- Forward projections (3 years)
- Assumptions documentation
- Comparable analysis
- Return modeling
- Use of funds breakdown

## Automation Hooks

| Hook | System | Purpose |
|---|---|---|
| Revenue logging | n8n + Supabase | Auto-log revenue from GHL deals, ticket sales, product orders |
| Expense tracking | n8n + Supabase | Receipt/invoice capture → categorize → log |
| Monthly P&L generation | n8n scheduled | Pull data → calculate → generate report → distribute |
| Budget variance alerts | n8n + Supabase | Actual vs. budget → flag overages → notify |
| Sponsor deal tracking | n8n + Supabase | Deal stage changes → update financial projections |
| Cash flow monitoring | n8n scheduled | Daily cash position check → alert if below threshold |

## Financial Rules

1. **Conservative projections** — Use base case, not best case, for planning
2. **No vanity metrics** — Report real revenue, real margins, real cash
3. **Brand-level accountability** — Every brand has its own P&L, no hiding underperformers
4. **Investor-ready always** — Financials should be audit-ready at any time
5. **Real-time where possible** — Dashboard data should update daily, not monthly
6. **Separate books** — Each entity maintains clean financial separation
