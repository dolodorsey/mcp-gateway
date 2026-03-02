---
name: vendor-management
description: >
  Vendor and supplier coordination system for all Kollective divisions. Use this skill whenever
  the user wants to: manage vendors, create purchase orders, handle supplier communications,
  process invoices, request quotes, compare vendors, or manage any vendor relationship.
  Triggers include: 'vendor', 'supplier', 'purchase order', 'PO', 'invoice', 'quote', 'RFQ',
  'procurement', 'supply chain', 'ordering'. Maps to n8n workflow: VENDOR & SUPPLIER
  ORCHESTRATOR. Maps to agents: OPS-03 VendorCoordinator.
---

# Vendor Management System

Supplier coordination and procurement across all Kollective divisions.

## Vendor Categories by Division

### Casper Group
| Category | Examples | Frequency |
|---|---|---|
| Proteins | Meat/seafood distributors | Weekly |
| Produce | Fresh produce suppliers | 2-3x/week |
| Dry goods | Packaging, staples, spices | Bi-weekly |
| Equipment | Kitchen equipment, maintenance | As needed |
| Cleaning | Cleaning supplies, sanitation | Weekly |

### HugLife Events
| Category | Examples | Frequency |
|---|---|---|
| Venues | Event spaces, rental companies | Per-event |
| AV/Production | Sound, lighting, staging | Per-event |
| Catering | Food/beverage for events | Per-event |
| Security | Event security teams | Per-event |
| Photography/Video | Content production teams | Per-event |
| Print | Flyers, banners, signage | Per-event |

### Bodegea
| Category | Examples | Frequency |
|---|---|---|
| Manufacturing | Beverage co-packers | Monthly |
| Packaging | Bottles, labels, boxes | Monthly |
| Distribution | Logistics, warehousing | Ongoing |
| Retail | Store buyers, account managers | Ongoing |

## Procurement Workflow

```
NEED IDENTIFIED →
  ├── Check preferred supplier list
  ├── If preferred supplier exists → Generate PO → Send → Track
  ├── If no preferred supplier → Generate RFQ → Send to 3 vendors → Compare → Select → PO
  └── If urgent → Expedited PO with approval gate
```

## Purchase Order Template

```
PURCHASE ORDER #[AUTO-GENERATED]
DATE: [Date]
VENDOR: [Vendor name]
BRAND: [Kollective brand]
LOCATION: [Delivery location]

ITEMS:
| Item | Qty | Unit Price | Total |
|---|---|---|---|
| [Item 1] | [Qty] | $[Price] | $[Total] |

SUBTOTAL: $[Amount]
TAX: $[Amount]
TOTAL: $[Amount]

DELIVERY DATE: [Date]
PAYMENT TERMS: [Net 30 / COD / etc.]
SPECIAL INSTRUCTIONS: [Any notes]

AUTHORIZED BY: [Name]
```

## Invoice Processing

```
INVOICE RECEIVED →
  ├── OCR parse (extract vendor, amount, items, date)
  ├── Match to PO (verify items + amounts)
  ├── Auto-approve if: match < 5% variance AND under $1,000
  ├── Route to AP manager if: variance > 5% OR over $1,000
  └── Log in accounting system
```

## Vendor Performance Tracking

| Metric | Target | Action if Below |
|---|---|---|
| On-time delivery | 95%+ | Warning after 2 misses |
| Order accuracy | 98%+ | Issue report + credit request |
| Price competitiveness | Within 10% of market | Trigger RFQ for alternatives |
| Communication responsiveness | Within 24 hours | Escalation note |
| Quality consistency | <2% rejection rate | Quality meeting + potential replacement |

## n8n Integration

| Action | Workflow | Trigger |
|---|---|---|
| PO generation + send | VENDOR & SUPPLIER ORCHESTRATOR | Webhook — PO request |
| Invoice processing | VENDOR & SUPPLIER ORCHESTRATOR | Webhook — invoice received |
| RFQ process | VENDOR & SUPPLIER ORCHESTRATOR | Webhook — RFQ trigger |
| Vendor issue report | VENDOR & SUPPLIER ORCHESTRATOR | Webhook — issue logged |
| Vendor performance report | MCP — Daily KPI Digest | Monthly |
