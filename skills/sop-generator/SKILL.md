---
name: sop-generator
description: >
  Standard Operating Procedure generation and documentation system. Use this skill whenever
  the user wants to: create SOPs, document processes, build VA instructions, create training
  materials, write delegation briefs, or document any operational procedure. Triggers include:
  'SOP', 'procedure', 'process document', 'VA instructions', 'training', 'delegation',
  'how-to', 'playbook', 'runbook', 'checklist', 'workflow documentation'.
  Maps to agent: OPS-06 SOPGenerator.
---

# SOP Generator

Standard Operating Procedure creation and process documentation.

## SOP Template

```
# [PROCEDURE NAME]

## Purpose
[1-2 sentences: What this procedure accomplishes and why it exists.]

## Owner
[Role/person responsible for this procedure]

## Frequency
[When/how often this procedure runs: daily, per-event, on-trigger, etc.]

## Prerequisites
- [Tool/access needed]
- [Information needed]
- [Prior step that must be completed]

## Procedure

### Step 1: [Action]
- **What:** [Specific action]
- **Where:** [Tool/platform/location]
- **How:** [Detailed instructions]
- **Output:** [What this step produces]

### Step 2: [Action]
[Same format]

### Step [N]: [Action]
[Same format]

## Decision Points
| If... | Then... |
|---|---|
| [Condition A] | [Action A] |
| [Condition B] | [Action B] |

## Escalation
- [When to escalate]
- [Who to escalate to]
- [How to escalate]

## Quality Check
- [ ] [Verification item 1]
- [ ] [Verification item 2]

## Revision History
| Date | Change | Author |
|---|---|---|
| [Date] | [Change description] | [Name] |
```

## VA Delegation Brief Template

```
# TASK: [Task Name]

## Context
[1-2 sentences: Why this task matters]

## Your Role
[What the VA is responsible for]

## Tools You'll Use
- [Tool 1]: [What you do with it]
- [Tool 2]: [What you do with it]

## Step-by-Step
1. [First thing to do]
2. [Second thing to do]
3. [Continue...]

## Rules
- DO: [Specific behavior]
- DO NOT: [Specific prohibition]
- IF [situation]: [What to do]
- ESCALATE IF: [Trigger for escalation]

## Output Expected
[What the completed task looks like]

## Time Expectation
[How long this should take]

## Check-In
[When/how to report progress]
```

## Common SOPs to Generate

### Operations
- Daily morning ops check (per division)
- Inventory management and reorder
- Incident response and logging
- Staff onboarding
- Vendor coordination

### Outreach
- Lead intake and qualification
- Outreach sequence execution
- Follow-up cadence management
- Sponsor outreach pipeline
- PR pitch pipeline

### Events
- Event launch T-minus sequence
- Day-of operations checklist
- Post-event follow-up
- Sponsor integration execution
- RSVP and check-in management

### Content
- Content creation workflow
- Social media posting schedule
- Brand voice review process
- Newsletter production
- Graphics request fulfillment

## Auto-Generation Rules

When creating an SOP:
1. Start with the outcome — what does "done" look like?
2. Work backwards to identify every step
3. Include decision points — not just the happy path
4. Specify tools and exact locations within tools
5. Include time estimates per step
6. Add escalation paths for exceptions
7. Make it executable by someone who has never done it before
