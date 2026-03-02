---
name: multi-city-logistics
description: >
  Multi-city event logistics, venue coordination, and vendor management engine for
  HugLife Events, Scented Flowers museums, and all touring Kollective brands. Use this
  skill whenever the user wants to: plan multi-city rollouts, coordinate venues across
  markets, manage vendor relationships by city, build city-specific operations plans,
  handle permitting, schedule production teams, or manage any logistics that span
  multiple cities. Triggers include: 'multi-city', 'logistics', 'venue', 'city planning',
  'tour logistics', 'rollout', 'production schedule', 'permitting', 'vendor by city',
  'city operations', 'ATL', 'HOU', 'LA', 'DC', 'Charlotte', 'Miami'. Maps to n8n
  workflow: EVENT LAUNCH ENGINE, multi-city coordination. Maps to Supabase tables:
  venues, vendors, city_operations, event_logistics.
---

# Multi-City Logistics Engine

Operations coordination system for all touring Kollective brands across multiple markets.

## Active Markets (2026)

| City | Code | Divisions Active | Event Count (2026) |
|---|---|---|---|
| Atlanta, GA | ATL | HugLife, Scented Flowers, Casper | Primary hub — 15+ events |
| Houston, TX | HOU | HugLife, Scented Flowers | 5+ events |
| Los Angeles, CA | LA | HugLife, Scented Flowers | 8+ events |
| Washington, DC | DC | HugLife | 3+ events |
| Charlotte, NC | CLT | HugLife | 3+ events |
| Miami, FL | MIA | HugLife (Art Basel) | 1-2 events |
| Las Vegas, NV | LV | Special (Dr. Dorsey Birthday) | 1 event |

## 2026 Calendar by City

### ATLANTA (Home Base)
| Date | Event | Type |
|---|---|---|
| May 15 | Taste of Art | Culture/Art |
| Jun 19 | Gangsta Gospel | Juneteenth |
| Jul 02 | Dr. Dorsey Birthday Weekend | Private |
| Jul 25 | Shut Up & Dance | Dance/Nightlife |
| Aug 07 | Espresso | Coffee Culture |
| Aug 22 | Pawchella | Pet Festival |
| Sep 13 | Paparazzi | Glamour/Nightlife |
| Sep 12 | Beauty & The Beast | Experience |
| Oct 01-31 | Haunted House | Month-Long |
| Oct 31 | Monster's Ball | Halloween |
| Nov 21 | Black Ball | Gala |
| Dec 01-31 | Winter Wonderland | Month-Long |
| Dec 12 | Snow Ball | Holiday Gala |

### HOUSTON
| Date | Event | Type |
|---|---|---|
| Jun 27 | Dr. Dorsey Birthday Weekend | Private |
| Jul 10 | Taste of Art | Culture/Art |
| Jul 18 | Napkin King | Food/Culture |
| Aug 01 | Gangsta Gospel | Culture |
| Aug 14 | Taste of Art | Culture/Art |

### LOS ANGELES
| Date | Event | Type |
|---|---|---|
| Apr 24 | Taste of Art | Culture/Art |
| May 29 | Espresso | Coffee Culture |
| May 31 | Paparazzi | Glamour/Nightlife |
| Jun 14 | Paparazzi (BET Weekend) | Glamour/Nightlife |
| Jul 31 | Espresso | Coffee Culture |
| Aug 29 | Napkin King | Food/Culture |
| Sep 05 | Gangsta Gospel | Culture |
| Sep 26 | Shut Up & Dance | Dance/Nightlife |

### WASHINGTON, DC
| Date | Event | Type |
|---|---|---|
| Apr 17 | Espresso | Coffee Culture |
| Jun 12 | Taste of Art | Culture/Art |
| Jul 12 | Paparazzi | Glamour/Nightlife |
| Sep 04 | Espresso | Coffee Culture |

### CHARLOTTE
| Date | Event | Type |
|---|---|---|
| May 02 | Shut Up & Dance | Dance/Nightlife |
| Jun 05 | Espresso | Coffee Culture |
| Aug 09 | Paparazzi | Glamour/Nightlife |
| Sep 19 | Napkin King | Food/Culture |

### MIAMI
| Date | Event | Type |
|---|---|---|
| Dec 04 | Taste of Art (Art Basel) | Culture/Art |

### LAS VEGAS
| Date | Event | Type |
|---|---|---|
| Jul 04 | Dr. Dorsey Birthday Weekend | Private |

### WORLD CUP ACTIVATIONS (Multi-City)
| Dates | Cities | Type |
|---|---|---|
| Jun 11 – Jul 19 | ATL, HOU, LA | Forever Futbol + branded activations |

## City Operations Framework

### Per-City Requirements Checklist

For EACH city where the Kollective operates, the following must be established:

**Venue:**
- [ ] Primary venue identified and contracted
- [ ] Backup venue identified
- [ ] Capacity confirmed for event type
- [ ] Load-in/load-out schedule confirmed
- [ ] Parking/transportation plan
- [ ] ADA compliance verified
- [ ] Noise ordinance hours confirmed

**Permits & Legal:**
- [ ] Event permit application filed
- [ ] Liquor license (if applicable)
- [ ] Fire marshal capacity approval
- [ ] Insurance certificate (venue as additional insured)
- [ ] Health department approval (if food service)
- [ ] Music/entertainment license
- [ ] Street closure permit (if applicable)

**Vendors (City-Specific):**
- [ ] Sound/AV production company
- [ ] Lighting company
- [ ] Security company (licensed in state)
- [ ] Bar service / catering
- [ ] Photography/videography team
- [ ] DJ / talent (local or traveling)
- [ ] Cleaning crew (post-event)
- [ ] Equipment rental (tables, chairs, staging)
- [ ] Transportation/shuttle (if needed)
- [ ] Floral/décor (event-specific)

**Staffing:**
- [ ] Event manager (on-site lead)
- [ ] Door/check-in team
- [ ] Bar staff
- [ ] Security detail
- [ ] Brand ambassadors
- [ ] Photographer(s)
- [ ] Videographer(s)
- [ ] Operations assistant(s)

**Marketing (City-Specific):**
- [ ] Local influencer partnerships activated
- [ ] City-specific social content calendar
- [ ] Local press/media outreach
- [ ] City-specific ticket link live
- [ ] Local partner cross-promotion

## Vendor Management

### Vendor Tiers
| Tier | Relationship | Payment Terms | Usage |
|---|---|---|---|
| Tier 1: Locked | Long-term contract, preferred | Net 30 | Every event in that city |
| Tier 2: Preferred | Proven, repeat | Due on event | Most events |
| Tier 3: On-Call | Available, vetted | Due on event | As-needed backup |
| Tier 4: New | Unvetted | Prepay or COD | Trial basis only |

### Vendor Categories

| Category | What They Provide | Critical Rating |
|---|---|---|
| Production (AV) | Sound, lighting, staging, screens | Critical — event cannot happen without |
| Security | Licensed guards, crowd management | Critical — legally required |
| Bar/Catering | Beverage service, food if applicable | High — major revenue driver |
| Photography | Event photos, content for partners | High — content yield depends on it |
| Videography | Event video, reels, recap content | High — content yield |
| DJ/Talent | Entertainment, atmosphere | High — event experience |
| Cleaning | Post-event cleanup | Medium — contractually required |
| Décor/Staging | Visual environment | Medium — event-type dependent |
| Transportation | Shuttles, VIP transport | Low — event-type dependent |

### Vendor Performance Tracking
After every event, rate each vendor:
- Punctuality (1-5)
- Quality (1-5)
- Communication (1-5)
- Problem resolution (1-5)
- Value (1-5)
- Rebook? (Yes/No/Conditional)

Store in Supabase `vendor_reviews` table linked to event + city.

## Production Timeline Template

### 8 Weeks Out
- Venue confirmed and contracted
- Production vendor booked
- Security company booked
- Permits application filed
- Ticket page live
- Marketing campaign launched

### 6 Weeks Out
- All vendor contracts signed
- DJ/talent confirmed
- Sponsor integrations planned
- Bar/catering menu finalized
- Staffing plan complete

### 4 Weeks Out
- Event run-of-show drafted
- Load-in schedule confirmed
- All permits received
- Press outreach begins
- Influencer outreach begins
- Sponsor assets received

### 2 Weeks Out
- Final run-of-show distributed
- Vendor load-in times confirmed
- Staff briefing scheduled
- Ticket sales checkpoint (adjust marketing if needed)
- All sponsor materials produced
- Event day timeline locked

### 1 Week Out
- Final walkthrough with venue
- Equipment inventory verified
- Staff roles assigned
- Emergency plan reviewed
- Weather contingency confirmed (outdoor events)
- All digital assets (ticket scanner, check-in system) tested

### Day-Of
- Load-in per schedule
- Sound check
- Lighting check
- Security briefing
- Staff check-in and role assignment
- Doors open
- Event runs per run-of-show
- Real-time issue resolution
- Content capture throughout
- Wrap and load-out

### Post-Event (48 Hours)
- Vendor settlement / payment
- Content review and selection
- Social media recap posts
- Partner content delivery
- Attendance and revenue tallied
- Event recap internal debrief
- Vendor performance reviews logged
- P&L finalized

## Output Modes

### MODE 1: City Operations Plan
Full operational plan for a single city:
1. Venue selection criteria and recommendations
2. Vendor roster (by category, with contacts)
3. Permit requirements and timeline
4. Staffing plan
5. Production schedule
6. Marketing localization plan
7. Budget allocation
8. Risk assessment

### MODE 2: Multi-City Calendar
Consolidated calendar showing:
- All events across all cities
- Overlap detection (resource conflicts)
- Travel requirements between cities
- Vendor availability windows
- Permit deadline tracking

### MODE 3: Event Production Plan
Single event logistics plan:
- Full production timeline (8 weeks)
- Vendor assignments
- Run-of-show
- Staffing plan
- Setup/teardown schedule
- Contingency plan

### MODE 4: Vendor Sourcing
Find and evaluate vendors for a specific city/need:
- Category requirements
- Budget parameters
- Evaluation criteria
- Outreach template
- Comparison matrix

### MODE 5: Tour Logistics
Multi-city tour planning:
- City sequence optimization
- Equipment transport between cities
- Team travel schedule
- Per-city setup requirements
- Cost modeling (per-city and total)

### MODE 6: Post-Event Report
Event completion documentation:
- Attendance vs. target
- Revenue vs. budget
- Vendor performance
- Content captured
- Sponsor fulfillment status
- Lessons learned
- Next-event improvements

## Automation Hooks

| Hook | System | Purpose |
|---|---|---|
| Event creation trigger | n8n + Supabase | New event added → auto-generate checklist + timeline |
| Permit deadline alerts | n8n scheduled | Track permit deadlines, alert 2 weeks before due |
| Vendor booking reminders | n8n scheduled | Alert when vendors not yet confirmed for upcoming event |
| Post-event report trigger | n8n + Supabase | Event date passes → auto-trigger report template |
| Multi-city conflict detection | n8n + Supabase | Flag when events in different cities overlap within 48 hours |
| Budget tracking | n8n + Supabase | Vendor costs logged → auto-update event budget |
