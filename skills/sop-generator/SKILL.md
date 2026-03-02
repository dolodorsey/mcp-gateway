---
name: sop-generator
description: >
  Standard Operating Procedure generation, process documentation, VA delegation, training
  material creation, and operational knowledge management for the entire Kollective. Use this
  skill whenever the user wants to: create SOPs, document processes, build VA instructions,
  create training materials, write delegation briefs, document any operational procedure,
  create checklists, build runbooks, design QC processes, create onboarding guides, or
  systematize any repeatable task. Triggers include: 'SOP', 'procedure', 'process document',
  'VA instructions', 'training', 'delegation', 'how-to', 'playbook', 'runbook', 'checklist',
  'workflow documentation', 'process map', 'standard procedure', 'operating procedure',
  'how do we do', 'document this process'. Maps to agent: OPS-06 SOPGenerator.
---

# SOP Generator

Standard Operating Procedure creation, process documentation, and operational knowledge management for the Kollective Hospitality Group.

## Core Principle

If a process can't be documented clearly enough for a new person to execute it without hand-holding, it's not a process — it's tribal knowledge. Tribal knowledge is a liability. SOPs are the insurance policy against key-person dependency, inconsistent execution, and quality collapse at scale. Every repeatable task in the Kollective should have an SOP.

## SOP Template — Full Standard

```
# [PROCEDURE NAME]
SOP ID: [DIVISION]-[CATEGORY]-[NUMBER] (e.g., HL-EVT-001)
Version: [1.0]
Last Updated: [Date]
Status: [Draft / Active / Under Review / Deprecated]

## Purpose
[1-2 sentences: What this procedure accomplishes and why it matters to the business.]

## Owner
- **Primary:** [Role/person who maintains this SOP]
- **Executor:** [Who actually performs this task — role, not person name]
- **Reviewer:** [Who QCs the output]

## Frequency
[When/how often: daily, per-event, on-trigger, weekly, per-new-lead, etc.]

## Prerequisites
- [ ] [Tool/access/credential needed]
- [ ] [Information/data needed before starting]
- [ ] [Prior step or dependency that must be completed]
- [ ] [Approvals needed]

## Procedure

### Step 1: [Action Verb + Object]
- **What:** [Specific action — be exact]
- **Where:** [Tool/platform/tab/page — be specific enough to navigate]
- **How:** [Detailed instructions with click paths if digital tool]
- **Time:** [Expected duration for this step]
- **Output:** [What this step produces — data, file, status change, etc.]
- **Verification:** [How to confirm this step was done correctly]

### Step 2: [Action Verb + Object]
[Same format — every step follows this structure]

### Step N: [Final Action]
[Same format]

## Decision Points
| Situation | Action | Escalate? |
|---|---|---|
| [If condition A] | [Do this] | No |
| [If condition B] | [Do this] | No |
| [If condition C — unusual] | [Stop and notify] | Yes → [who] |
| [If error/failure] | [Recovery steps] | Yes → [who] |

## Error Recovery
| Error Type | Symptoms | Fix | Prevention |
|---|---|---|---|
| [Error 1] | [What it looks like] | [How to fix] | [How to avoid] |
| [Error 2] | [What it looks like] | [How to fix] | [How to avoid] |

## Escalation Protocol
- **Level 1:** [Who to contact first + method + expected response time]
- **Level 2:** [If Level 1 doesn't resolve + who + method]
- **Level 3:** [Dr. Dorsey — only for [specific conditions]]

## Quality Checklist (Before Marking Complete)
- [ ] [Output matches expected result]
- [ ] [All data entered correctly]
- [ ] [No steps skipped]
- [ ] [Downstream systems updated]
- [ ] [Logged/documented appropriately]

## Examples
### Good Output Example:
[Show what a correctly completed task looks like]

### Common Mistakes:
- [Mistake 1] — [Why it's wrong] — [Correct approach]
- [Mistake 2] — [Why it's wrong] — [Correct approach]

## Revision History
| Date | Version | Change | Author |
|---|---|---|---|
| [Date] | 1.0 | Initial creation | [Name] |
```

## VA Delegation Brief Template

```
# TASK: [Task Name]
Delegation ID: [BRAND]-VA-[NUMBER]
Assigned To: [VA Name/Role]
Due: [Date/Time or "Recurring: [frequency]"]
Priority: [P0/P1/P2/P3]

## Context (Why This Matters)
[2-3 sentences: What this task is part of, why it matters, what breaks if it's done wrong.]

## Your Role
[1 sentence: What the VA is specifically responsible for delivering.]

## Tools You'll Use
| Tool | What You Do With It | Login/Access |
|---|---|---|
| [Tool 1] | [Specific actions] | [How to access] |
| [Tool 2] | [Specific actions] | [How to access] |

## Step-by-Step
1. [First action — specific, clickable, navigable]
2. [Second action]
3. [Continue — every step should be doable without asking questions]
N. [Final step — including where to report completion]

## Rules (Read Before Starting)
### DO:
- [Specific positive behavior]
- [Specific quality standard]
- [Specific communication expectation]

### DO NOT:
- [Specific prohibition — and WHY]
- [Specific prohibition]
- [Common mistake to avoid]

### IF [situation]:
- [What to do instead of guessing]

### ESCALATE IF:
- [Condition that means "stop and ask"]
- [Who to contact and how]

## Output Expected
[Exact description of what "done" looks like — be visual and specific]

## Time Expectation
- **Total time:** [Estimate for the full task]
- **Per-item time:** [If batched, time per unit]
- **Deadline:** [When this must be complete]

## Check-In Protocol
- [How to report progress: Slack, email, dashboard update]
- [Frequency: after each batch, end of day, upon completion]
- [What to include in check-in: count completed, issues found, blockers]

## QC (How I'll Check Your Work)
- [What I'll verify]
- [Acceptance criteria]
- [What triggers a redo]
```

## SOP Library — Master Categories

### Operations SOPs
| SOP ID | Name | Division | Frequency |
|---|---|---|---|
| OPS-001 | Daily Morning Ops Check | Casper Group | Daily 6 AM |
| OPS-002 | Daily Queue Build & Distribution | All | Daily 8 AM |
| OPS-003 | Nightly KPI Digest Generation | All | Daily 9 PM |
| OPS-004 | Inventory Check & Reorder | Casper, Bodegea | Twice daily |
| OPS-005 | Incident Response & Logging | All | On trigger |
| OPS-006 | Staff Scheduling | All | Weekly |
| OPS-007 | Vendor Coordination & PO Processing | All | Per engagement |
| OPS-008 | Monthly Vendor Performance Review | All | Monthly |
| OPS-009 | Account Security Audit | All | Monthly |
| OPS-010 | Data Backup Verification | All | Weekly |

### Outreach SOPs
| SOP ID | Name | Division | Frequency |
|---|---|---|---|
| OUT-001 | Lead Intake & Qualification | All | Per new lead |
| OUT-002 | Cold Email Sequence Execution | All | Daily batches |
| OUT-003 | DM Outreach Sequence | All | Daily batches |
| OUT-004 | Phone Outreach Cadence | All | Daily |
| OUT-005 | Follow-Up Management | All | Daily |
| OUT-006 | Sponsor Outreach Pipeline | HugLife, Scented | Per campaign |
| OUT-007 | Kitchen Prospect Research (Casper) | Casper Group | Per market |
| OUT-008 | PR Pitch Pipeline | All | Per story angle |
| OUT-009 | Response Handling & Triage | All | Real-time |
| OUT-010 | NDA Processing & Site Walk Scheduling | Casper Group | Per qualified lead |

### Event SOPs
| SOP ID | Name | Division | Frequency |
|---|---|---|---|
| EVT-001 | Event Launch T-Minus Sequence | HugLife, Scented | Per event |
| EVT-002 | Venue Walkthrough & Approval | HugLife, Scented | Per venue |
| EVT-003 | Vendor Booking & Confirmation | HugLife, Scented | Per event |
| EVT-004 | Day-Of Operations Checklist | HugLife, Scented | Per event |
| EVT-005 | Door/Check-In Management | HugLife | Per event |
| EVT-006 | Sponsor Activation Setup | HugLife, Scented | Per event |
| EVT-007 | Post-Event Breakdown & Settlement | HugLife, Scented | Per event |
| EVT-008 | Post-Event Content Capture & Distribution | HugLife, Scented | Per event |
| EVT-009 | Ticket Sales Monitoring & Promotion Triggers | HugLife | Per event |
| EVT-010 | Multi-City Tour Logistics Coordination | HugLife, Scented | Per tour |

### Content & Creative SOPs
| SOP ID | Name | Division | Frequency |
|---|---|---|---|
| CTN-001 | Content Calendar Generation | All | Monthly |
| CTN-002 | Social Media Posting Workflow | All | Daily |
| CTN-003 | Brand Voice Review & Approval | All | Per content piece |
| CTN-004 | Newsletter Production & Send | All | Per newsletter |
| CTN-005 | Graphics Request & Fulfillment | All | Per request |
| CTN-006 | Influencer Outreach & Management | HugLife, Bodegea | Per campaign |
| CTN-007 | Photo/Video Shoot Coordination | All | Per shoot |
| CTN-008 | Content Performance Review | All | Weekly |

### CRM & Data SOPs
| SOP ID | Name | Division | Frequency |
|---|---|---|---|
| CRM-001 | New Contact Data Entry | All | Per contact |
| CRM-002 | Contact Deduplication Process | All | Weekly |
| CRM-003 | Lead Scoring & Tier Assignment | All | Daily (automated) |
| CRM-004 | Pipeline Stage Management | All | Ongoing |
| CRM-005 | Data Enrichment Processing | All | Nightly (automated) |
| CRM-006 | GHL-Supabase Sync Verification | All | Daily |
| CRM-007 | Contact Import & Validation | All | Per import |
| CRM-008 | Monthly Data Quality Audit | All | Monthly |

## Auto-Generation Rules

When creating an SOP:
1. **Start with the outcome** — what does "done" look like? Define it precisely.
2. **Work backwards** — identify every step needed to reach that outcome.
3. **Include decision points** — not just the happy path. What if something goes wrong?
4. **Specify tools exactly** — not "update the CRM" but "go to Supabase → identities table → filter by tenant_id → update the stage field."
5. **Include time estimates** — per step and total.
6. **Add escalation paths** — who to contact, when, how.
7. **Make it executable by a stranger** — someone who has never done this before should be able to follow it without asking a single question.
8. **Include QC criteria** — how to verify each step was done correctly.
9. **Show examples** — what good output looks like vs. common mistakes.
10. **Version control** — every SOP gets a version number and revision history.

## Output Modes

### MODE 1: Full SOP
Complete standard operating procedure:
1. Full SOP template populated
2. Every step detailed with tool paths
3. Decision points mapped
4. Error recovery documented
5. Quality checklist
6. Escalation protocol
7. Examples of good and bad output

### MODE 2: VA Delegation Brief
Task delegation document:
1. Context and importance
2. Tool access and instructions
3. Step-by-step execution guide
4. Rules and boundaries
5. Output expectations
6. QC criteria
7. Check-in protocol

### MODE 3: Quick Checklist
Simplified execution checklist:
1. Pre-task verification items
2. Step-by-step checkboxes
3. Post-task verification items
4. Completion confirmation

### MODE 4: Training Document
Onboarding or skill-building material:
1. Concept overview (why this matters)
2. Tool familiarization
3. Guided walkthrough (first time doing it)
4. Practice exercises
5. Common mistakes and fixes
6. Proficiency checklist
7. Reference links to full SOPs

### MODE 5: Process Map
Visual process documentation:
1. Trigger/start condition
2. Step sequence (linear or branching)
3. Decision nodes
4. Parallel tracks (if applicable)
5. End states
6. Handoff points
7. Mermaid diagram output

### MODE 6: SOP Audit
Review existing SOPs:
1. Completeness check (all required sections present?)
2. Accuracy check (steps still correct?)
3. Tool check (tools/platforms still current?)
4. Role check (right people assigned?)
5. Gap identification
6. Update recommendations
7. Version bump

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| SOP creation request | n8n webhook | New process identified | Generate SOP template with pre-filled context |
| VA task assignment | n8n + Supabase | Task created | Generate delegation brief from SOP |
| SOP review reminder | n8n scheduled | Quarterly | Flag SOPs due for review |
| Training trigger | n8n webhook | New team member onboarded | Generate training packet from relevant SOPs |
| Process change alert | n8n webhook | Tool/workflow updated | Flag affected SOPs for update |
| Checklist generation | n8n function | Event created | Generate day-of checklist from EVT SOPs |
