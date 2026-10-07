# CampusPilot — Phase 1 Product & Content Specification for Frontend (Nidhi)

**Document Status:** Phase 1 Final Baseline  
**Author:** Angel (Team Lead / UX / Product)  
**Primary Consumer:** Nidhi (Frontend & PWA Developer)  
**Reference Docs:** `docs/phase-0/04-UX-UI-DESIGN.md`, `team/angel/content-taxonomy.md`, `team/angel/ux-copy.md`  

---

## 1. Executive Summary for Frontend

This document is your definitive, contract-level specification for implementing the CampusPilot student frontend screens in Phase 2.

### Golden Rules
1. **Never suppress Important Campus:** Items with `category: 'important_campus'` or `importance: 'critical'` must remain visible even if the student selected no academic categories.
2. **Explainable ranking:** Every card in `For You` must display its percentage match badge (e.g., `94% MATCH`) and support tapping/hovering to see the explanation.
3. **PWA Mobile-First:** Single-column layout with fixed bottom navigation bar (`Home`, `Explore`, `My Plan`, `Alerts`, `Profile`).

---

## 2. Category Taxonomy & Display Tokens

Use the 8 canonical categories defined in [`src/shared/constants/index.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/shared/constants/index.ts):

| Category ID | UI Label | Emoji / Icon | Accent Color | Subtitle / Scope |
|---|---|---|---|---|
| `technical` | **Technical** | 💻 | Indigo (`#6366f1`) | Hackathons, coding, AI/ML, robotics |
| `cultural` | **Cultural** | 🎭 | Pink / Rose (`#f43f5e`) | Music, dance, drama, arts, fests |
| `sports` | **Sports** | 🏆 | Amber / Orange (`#f59e0b`) | Cricket, football, basketball, esports |
| `social` | **Social** | 🎉 | Violet (`#8b5cf6`) | Freshers, farewells, meetups, parties |
| `career` | **Career** | 💼 | Emerald / Teal (`#10b981`) | Placements, internships, resume clinics |
| `wellness` | **Wellness** | 🧠 | Cyan / Sky (`#06b6d4`) | Mental health, yoga, stress relief |
| `learning_research` | **Learning & Research** | 🔬 | Blue (`#3b82f6`) | Guest lectures, seminars, paper writing |
| `important_campus` | **Important Campus** | 📢 | Crimson / Red (`#ef4444`) | MST/exam datesheets, results, notices |

---

## 3. Screen-by-Screen UI Contracts

### 3.1 Screen: Interest Onboarding (`/onboarding`)
- **Headline:** `Make CampusPilot yours.`
- **Subtitle:** `Pick what you care about. We’ll bring the rest together without overwhelming you.`
- **Components:**
  - Grid of 7 interest chips (all categories except `important_campus` which is auto-enrolled).
  - Selected state: Glowing border, colored background pill, checkmark icon.
  - Persistent Callout Box: `💡 Important exam notices and university circulars will always reach you—even if you skip categories.`
- **CTAs:**
  - Primary button: `Build My Campus Feed →` (Persists preferences & redirects to `/`)
  - Secondary text button: `Skip for now` (Enrolls student with default broad discovery mode)

---

### 3.2 Screen: Home (`/`)
The Home feed MUST follow this strict 4-section vertical hierarchy:

```text
┌─────────────────────────────────────────────────────────────┐
│ Header: "Good morning, Angel 👋"                            │
│ Subtitle: "Here's what matters on your campus today."       │
├─────────────────────────────────────────────────────────────┤
│ 1. 🔥 DON'T MISS (1–3 urgent cards)                          │
│    - Urgent deadline badges: "Closes Tonight", "Starts 4 PM"│
│    - Quick [Register] & [+ Add to Plan] action buttons      │
├─────────────────────────────────────────────────────────────┤
│ 2. ✨ FOR YOU (Personalized recommendation cards)            │
│    - Top match % badge (e.g. "94% MATCH")                   │
│    - Match reason expandable tooltip                        │
│    - Category icon, Date/Time, Venue, Organizer             │
├─────────────────────────────────────────────────────────────┤
│ 3. 📢 IMPORTANT CAMPUS (Institutional updates)              │
│    - Red "CRITICAL NOTICE" or Amber "OFFICIAL" badge        │
│    - Clear issuer attribution (e.g. "Examination Cell")     │
│    - [View Notice] CTA button                               │
├─────────────────────────────────────────────────────────────┤
│ 4. 🧭 EXPLORE SOMETHING NEW (1–3 discovery cards)           │
│    - Curated outside-profile items                          │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.3 Screen: Event Card Anatomy (Reusable Component)

Every standard `CampusItem` card must contain:
1. **Header Row:** Category Icon + Category Label (left), Match % badge or Urgency badge (right).
2. **Title:** 2-line truncated bold text (e.g., *Campus AI & Robotics Hackathon 2026*).
3. **Metadata Row:**
   - 📅 `Date` (e.g., `Thu, Oct 15`)
   - ⏰ `Time` (e.g., `9:00 AM – 9:00 PM`)
   - 📍 `Venue` (e.g., `Innovation Hub, Block C`)
   - 🏛️ `Organizer` (e.g., `Google Developer Student Club`)
4. **Action Buttons:**
   - If `registrationUrl` present: `[Register Now ↗]` (Opens external link)
   - Bookmark button: `[+ Add to Plan]` / `[In Plan ✓]` toggle

---

### 3.4 Screen: Explore (`/explore`)
- **Top Controls:**
  - Search input box with placeholder: `Search events, clubs, hackathons, or venues...`
  - Horizontal scrolling category filter pills (`All`, `💻 Tech`, `🎭 Cultural`, `🏆 Sports`, `🎉 Social`, `💼 Career`, `🧠 Wellness`, `🔬 Research`).
  - Time filter chips (`All`, `Today`, `This Weekend`, `Next 7 Days`).
- **Body:** Grid/List of matching `CampusItem` cards with active count badge (e.g., `Showing 18 events`).

---

### 3.5 Screen: My Plan (`/plan`)
- **Header:** `📅 My Plan` with calendar day switcher.
- **Timeline View:** Chronological cards grouped by time of day (Morning, Afternoon, Evening).
- **Time Conflict Detection (FR-007):**
  - If two plan items overlap on the same date (`A.start < B.end && B.start < A.end`):
    - Display alert container: `⚠️ Time Conflict Detected`
    - Text: `[Item A] and [Item B] overlap at [Time].`
    - Action buttons: `[Keep Item A]` | `[Keep Item B]`

---

### 3.6 Screen: Alerts (`/alerts`)
Grouped into two visual sections:
1. **🔥 Don't Miss:** Urgent registrations, closing deadlines, and events starting today.
2. **📢 Important Campus:** Exam datesheets, result announcements, administrative circulars.

---

## 4. Standardized Empty States

| Condition | Icon | Heading | Body Text | Action Button |
|---|---|---|---|---|
| **Empty Personalized Feed** | ✨ | `Nothing matched yet.` | *Explore all campus activities or adjust your interests.* | `[Browse All Events]` |
| **Empty My Plan** | 📅 | `Your campus plan is empty.` | *Save events and workshops to build your daily schedule.* | `[Find Events to Attend]` |
| **Empty Alerts** | 🔔 | `You're all caught up! ✨` | *No urgent deadlines or critical notices right now.* | — |
| **No Search Results** | 🔍 | `No matching events found.` | *Try searching for a different keyword or category.* | `[Clear Filters]` |

---

## 5. Summary Checklist for Frontend Development

- [ ] Onboarding allows skipping and persists selected interest categories.
- [ ] Home screen implements all 4 sections in order (*Don't Miss*, *For You*, *Important Campus*, *Explore*).
- [ ] Match percentage badge and explanation tooltip display correctly.
- [ ] `important_campus` notices bypass interest filtering.
- [ ] `My Plan` displays chronological timeline and triggers conflict warning when times overlap.
- [ ] Mobile bottom navigation is responsive and sticky.
