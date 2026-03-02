---
name: account-infrastructure
description: >
  Digital account infrastructure setup, management, and security for all Kollective brands.
  Use this skill whenever the user wants to: create accounts for new brands, organize digital
  infrastructure, set up social accounts, manage email accounts, configure ad managers,
  set up analytics tools, manage domains, organize cloud storage, handle platform access,
  audit account security, document account credentials, or build any account ecosystem.
  Triggers include: 'account setup', 'create accounts', 'social accounts', 'email setup',
  'domain', 'ad manager', 'platform access', 'credentials', 'account audit', 'security',
  'password', 'account infrastructure', 'digital setup', 'brand accounts', 'username'.
---

# Account Infrastructure Engine

Digital account setup, organization, security, and documentation for the entire Kollective Hospitality Group. 48+ brands across 8 divisions — each requires its own complete digital footprint.

## Core Principle

Account infrastructure is the foundation everything else runs on. A missing password, a locked account, or an unrecovered profile can halt an entire brand's operations. Every account must be owned, documented, secured, and recoverable by the organization — never dependent on a single person.

## Account Stack by Category

### Tier 1: Critical (Brand Cannot Operate Without)
| Account Type | Purpose | Per-Brand? | Owner |
|---|---|---|---|
| Email (primary) | Central communications, account recovery | Yes | Kollective |
| Instagram | Primary social presence | Yes | Kollective |
| Domain | Website, email routing | Yes | Kollective |
| GHL location | CRM, pipeline, messaging | Yes (22 locations) | Kollective |
| Supabase | Database (shared instance) | Shared, tenant-isolated | Kollective |
| Stripe | Payment processing | Per division minimum | Kollective |

### Tier 2: High Priority (Growth + Revenue)
| Account Type | Purpose | Per-Brand? | Owner |
|---|---|---|---|
| TikTok | Video content, growth | Yes (active brands) | Kollective |
| Facebook Page | Social presence, ads | Yes | Kollective |
| Meta Business Manager | Ad management | Per division | Kollective |
| Google Business Profile | Local search, reviews | Per physical location | Kollective |
| Eventbrite / ticketing | Ticket sales | Per event brand | Kollective |
| YouTube | Video content | Per active brand | Kollective |
| X / Twitter | Social presence | Selective | Kollective |

### Tier 3: Operational
| Account Type | Purpose | Per-Brand? | Owner |
|---|---|---|---|
| Google Workspace | Email, Drive, Calendar | Shared org | Kollective |
| n8n | Automation | Shared instance | Kollective |
| GitHub | Version control, skills | Shared org | Kollective |
| Canva (or design tool) | Graphics production | Shared team | Kollective |
| Cloudinary / image storage | Asset management | Shared | Kollective |
| Analytics (GA4, Mixpanel) | Tracking | Per website/app | Kollective |

### Tier 4: As-Needed
| Account Type | Purpose | Per-Brand? | Owner |
|---|---|---|---|
| LinkedIn | B2B presence, PR | Selective | Kollective |
| Pinterest | Visual discovery | Selective | Kollective |
| Spotify (for playlists) | Brand playlists | Selective | Kollective |
| Threads | Social presence | Selective | Kollective |
| App Store / Play Store | App publishing | Per app | Kollective |
| Podcast hosting | Audio content | If applicable | Kollective |

## Naming & Username Convention

### Email Convention
```
Primary:       hello@[brand].com
Support:        support@[brand].com
Press:          press@[brand].com
Partnerships:   partners@[brand].com
Admin/Recovery: admin@[brand].com
Personal:       [firstname]@kollectivehg.com
Division:       hello@[division].com
```

### Social Username Convention
```
Instagram:  @[brandname] or @[brandname]official
TikTok:     @[brandname]
Twitter/X:  @[brandname]
Facebook:   [Brand Name] (page)
YouTube:    [Brand Name]
LinkedIn:   [Brand Name] or [Kollective Hospitality Group]
```

**Rules:**
- No underscores unless required by platform
- No numbers unless brand name includes them
- Consistent across all platforms for same brand
- Reserve usernames on all platforms immediately — even if not active yet
- Document all usernames in master account sheet

### Domain Convention
```
Brand domain:       [brand].com (preferred) or [brand].[tld]
Division domain:    [division].com
Corporate:          kollectivehg.com
Subdomains:         [brand].kollectivehg.com (fallback if .com unavailable)
```

## Security & Recovery Architecture

### Password Management
- All accounts use a centralized password manager (1Password, Bitwarden, or equivalent)
- No passwords stored in spreadsheets, notes, or DMs
- Every account has a unique password (never reused)
- Minimum 16 characters, mixed case, numbers, symbols
- Passwords rotated quarterly for critical accounts

### Two-Factor Authentication (2FA)
- Required on ALL Tier 1 and Tier 2 accounts
- Use authenticator app (not SMS) where possible
- Backup codes stored securely in password manager
- Recovery email set to admin@kollectivehg.com (not personal email)

### Admin / Owner Structure
```
Level 1 — Owner:        Dr. Dorsey (cannot be removed)
Level 2 — Admin:        Operations lead (full access, can manage team)
Level 3 — Manager:      Division leads (access to their division's accounts)
Level 4 — Operator:     VAs, team members (limited access, task-specific)
Level 5 — Viewer:       External partners, temporary access
```

**Rules:**
- Every account must have minimum 2 admins
- Owner access cannot depend on a single person's phone or email
- Recovery methods must be organizational, not personal
- When team members leave, access revoked within 24 hours
- Monthly audit of who has access to what

### Recovery Plan
For every critical account, document:
1. Primary login method
2. Recovery email
3. Recovery phone
4. Backup codes location
5. Security questions (if applicable)
6. Admin contacts who can recover
7. Platform support contact method
8. Last verification date

## Brand Account Setup Checklist

When launching a new brand, execute in this order:

### Phase 1: Foundation (Day 1)
- [ ] Register domain
- [ ] Create primary email (hello@brand.com)
- [ ] Create admin email (admin@brand.com)
- [ ] Reserve Instagram username
- [ ] Reserve TikTok username
- [ ] Reserve Twitter/X username
- [ ] Create Facebook Page
- [ ] Add to password manager
- [ ] Document all credentials in master sheet

### Phase 2: Infrastructure (Day 2-3)
- [ ] Set up GHL location (if applicable)
- [ ] Create Google Business Profile (if physical location)
- [ ] Set up Meta Business Manager (add to org)
- [ ] Set up Google Analytics (GA4)
- [ ] Configure DNS records (domain → hosting)
- [ ] Set up email routing
- [ ] Create Supabase tenant record
- [ ] Enable 2FA on all accounts

### Phase 3: Operational (Day 4-7)
- [ ] Upload brand logo and assets to all profiles
- [ ] Write and post bio/about on all platforms
- [ ] Link all accounts (IG → FB, etc.)
- [ ] Set up Canva brand kit
- [ ] Create Google Drive folder structure
- [ ] Add to n8n workflow configuration
- [ ] Brief team on new brand access

### Phase 4: Verification (Day 7-14)
- [ ] Verify all accounts are accessible
- [ ] Test 2FA recovery on critical accounts
- [ ] Verify backup admin can access everything
- [ ] Run security audit
- [ ] Document in master account sheet
- [ ] Confirm all naming conventions followed

## Master Account Tracking Sheet

### Required Fields
| Field | Purpose |
|---|---|
| Brand name | Which brand |
| Division | Parent division |
| Account type | Platform/service |
| Username/handle | Login identifier |
| Email used | Associated email |
| URL | Direct link to account |
| Owner level | Who has owner access |
| Admin(s) | Who has admin access |
| 2FA enabled | Yes/No |
| Recovery method | How to recover |
| Created date | When set up |
| Last verified | When last checked |
| Status | Active/Inactive/Suspended |
| Notes | Any special considerations |

## Output Modes

### MODE 1: New Brand Setup
Complete account creation plan for a new brand:
1. All accounts needed (by tier)
2. Naming/username recommendations
3. Setup sequence with timeline
4. Security configuration
5. Team access plan
6. Documentation checklist

### MODE 2: Account Audit
Security and completeness audit:
1. Account inventory (what exists)
2. Missing accounts identified
3. Security gaps (no 2FA, single admin, etc.)
4. Recovery readiness assessment
5. Access control review
6. Remediation plan

### MODE 3: Access Management
Team access configuration:
1. Role definitions
2. Permission levels per account
3. Onboarding access SOP
4. Offboarding revocation SOP
5. Monthly audit procedure

### MODE 4: Migration / Consolidation
When accounts need restructuring:
1. Current state inventory
2. Target state architecture
3. Migration sequence
4. Risk mitigation (avoid lockouts)
5. Verification plan
6. Documentation update

### MODE 5: Incident Response (Account Compromise)
If an account is hacked or locked:
1. Immediate containment steps
2. Recovery procedure
3. Password rotation scope
4. Access audit
5. Security hardening
6. Communication plan (if public-facing)

## Automation Hooks

| Hook | System | Trigger | Action |
|---|---|---|---|
| New brand setup | n8n webhook | Brand created in Supabase | Generate setup checklist + assign tasks |
| Monthly security audit | n8n scheduled | 1st of month | Check 2FA, admin access, last verified dates |
| Access revocation | n8n webhook | Team member offboarded | Revoke all access, rotate shared credentials |
| Account health check | n8n scheduled | Weekly | Verify critical accounts accessible |
| Credential rotation | n8n scheduled | Quarterly | Trigger password changes for critical accounts |
