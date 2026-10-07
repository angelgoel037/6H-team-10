# CampusPilot — Phase 2 Product Experience & Integration Specification

**Document Version:** 2.0 (Phase 2 Source of Truth)  
**Author / Lead:** Angel (Team Lead / Product / UX & Content Owner)  
**Target:** 4-person parallel hackathon engineering foundation  

---

## 1. Product Positioning & Differentiator (USP)

> **One campus. Thousands of experiences. One personalized feed.**

CampusPilot is a **personalized campus discovery and planning platform**. It bridges the gap between chaotic, scattered campus communication (posters, 50+ WhatsApp groups, Instagram stories, departmental notice boards) and the student's daily life.

```text
Student selects interests
        ↓
CampusPilot understands preferences
        ↓
Campus information normalized into unified CampusItem model
        ↓
Relevance + Time Proximity + Urgency evaluated
        ↓
Student discovers, plans around schedule, and takes action
```

### 💡 What Makes CampusPilot Unique
1. **Interest-Driven Personalization:** Students see what matches their passions (Coding, Music, Sports, Careers, Wellness) without searching dozens of club accounts.
2. **Institutional Non-Suppression:** Critical exam datesheets, result declarations, and administrative circulars **NEVER disappear**, regardless of interest filters.
3. **Actionable Campus Planner:** Students don't just "view" events—they add them to **My Plan** with automated time-conflict warnings.
4. **Explainable AI Matching:** Transparent match percentages with plain-language explanations (no black-box AI magic).

---

## 2. End-to-End Primary Student Journey

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. ONBOARDING                                               │
│    Headline: "Make CampusPilot yours."                      │
│    Student selects interests (or skips)                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. PERSONALIZED HOME FEED                                   │
│    • 🔥 DON'T MISS (Urgent deadlines & today's events)       │
│    • ✨ FOR YOU (High-match personalized cards)             │
│    • 📢 IMPORTANT CAMPUS (Official circulars & exams)       │
│    • 🧭 EXPLORE SOMETHING NEW (Serendipitous discovery)     │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌─────────────────────────────┐
│ 3. EVENT DISCOVERY & DETAIL  │ │ 4. EXPLORE ALL CATEGORIES   │
│    • Complete metadata       │ │    • 8-category filter pills │
│    • Explainable match badge │ │    • Search & date filters  │
│    • [Register] / [Add Plan] │ └─────────────┬───────────────┘
└──────────────┬───────────────┘               │
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. MY PLAN (Lightweight Personal Campus Planner)            │
│    • Chronological timeline by date & time                   │
│    • ⚠️ Automated Time Conflict Detection (FR-007)           │
│    • Conflict resolution actions ([Keep A] / [Keep B])      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Screen-by-Screen Experience Specification

### 3.1 Onboarding Experience (`/onboarding`)
- **Headline:** `Make CampusPilot yours.`
- **Subtitle:** `Pick what you care about. We’ll bring the rest together without overwhelming you.`
- **Category Chips:** 7 multi-select chips: `💻 Technical`, `🎭 Cultural`, `🏆 Sports`, `🎉 Social`, `💼 Career`, `🧠 Wellness`, `🔬 Learning & Research`.
- **Institutional Callout:** `💡 Important exam notices and university circulars will always reach you—even if you skip categories.`
- **Zero-Interest / Skip Handling:**
  - Clicking `Skip for now` immediately transitions to Home.
  - Home renders trending campus events with helper banner: *"Showing top campus highlights. Select interests in Profile to personalize!"*

---

### 3.2 Home Feed Experience (`/`)

#### Section 1: 🔥 DON'T MISS (Max 3 items)
- **Goal:** Drive imminent action on closing opportunities.
- **Criteria:** Registration closing in $<24$ hours, event happening today, or `importance: 'high'`.
- **Badges:** `Closes Tonight`, `Starts in 2 Hours`, `Limited Seats`.

#### Section 2: ✨ FOR YOU (Ranked Recommendation Stream)
- **Goal:** Personalized discovery based on student interests.
- **Scoring Heuristic:**
  $$\text{Score} = 40\% \text{ Interest Match} + 25\% \text{ Time Relevance} + 15\% \text{ Urgency} + 10\% \text{ Popularity} + 10\% \text{ Discovery}$$
- **Badge:** `94% MATCH` with expandable tooltip: *"Matches your Technical & Career interests · Happening this week · Registration closes soon"*.

#### Section 3: 📢 IMPORTANT CAMPUS (Institutional Channel)
- **Goal:** High-visibility administrative communication that bypasses personalization.
- **Criteria:** `category == 'important_campus'` OR `importance == 'critical'`.
- **Badges:** `CRITICAL NOTICE` (Red) or `OFFICIAL CIRCULAR` (Amber).

#### Section 4: 🧭 EXPLORE SOMETHING NEW (1–3 Discovery Cards)
- **Goal:** Prevent filter bubbles by showcasing high-quality events outside the student's normal profile.

---

### 3.3 Event Detail Modal / View
- **Card Anatomy:**
  - Category Badge & Icon (top-left) + Match % or Urgency Badge (top-right).
  - Title (Bold 2-line max).
  - Date (`Thu, Oct 15`), Time (`9:00 AM – 9:00 PM`), Venue (`Innovation Hub, Block C`), Organizer (`Google DSC`).
  - Full description & tags.
- **Primary CTAs:**
  - `[Register Now ↗]` (External registration URL).
  - `[+ Add to Plan]` / `[In Plan ✓]` (Personal schedule toggle).

---

### 3.4 My Plan Experience (`/plan`)
- **Concept:** Lightweight campus-life agenda (NOT a rigid classroom timetable).
- **Organization:** Chronological timeline grouped by date and time of day.
- **Time Conflict Detection (FR-007):**
  - Trigger: $A.start < B.end \land B.start < A.end$ on same date.
  - Visual: Amber alert container over conflicting cards with `⚠️ Time Conflict Detected`.
  - Actions: `[Keep Event A]` | `[Keep Event B]`.

---

## 4. Event Lifecycle States

```text
┌─────────────────┐
│ 1. DISCOVERED   │ (Rendered in feed / search)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. VIEWED       │ (Student opens event detail modal)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. ADDED TO PLAN│ (Saved to student's personal timeline in My Plan)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. REGISTERED   │ (Clicked external registration link)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. COMPLETED    │ (Event date has passed; archived)
└─────────────────┘
```

---

## 5. Standardized Content & Error States

| State | Visual Treatment | UX Copy / Microcopy | Recovery CTA |
|---|---|---|---|
| **Loading** | Shimmer skeleton cards | — | — |
| **Empty Personalized Feed** | Sparkle illustration ✨ | *"Nothing matched your interests for this week yet."* | `[Browse All Campus Events]` |
| **Empty My Plan** | Calendar illustration 📅 | *"Your campus plan is empty. Save events you want to attend."* | `[Find Events to Attend]` |
| **Empty Alerts** | Notification bell 🔔 | *"You're all caught up! ✨"* | — |
| **No Search Results** | Magnifying glass 🔍 | *"No matching events found."* | `[Clear Filters]` |
| **Registration Closed** | Disabled gray button | `Registration Closed` | `[View Details]` |
| **Event Cancelled** | Red strikethrough badge | `Cancelled by Organizer` | — |

---

## 6. Personalization Explainability Standards

### Allowed Reason Formats
- ✅ *"Matches your Technical interest"*
- ✅ *"Happening today on campus"*
- ✅ *"Registration closes tonight"*
- ✅ *"Popular among students interested in Cultural & Music"*
- ✅ *"Recommended career session for 3rd & 4th year students"*

### Forbidden Anti-Patterns
- ❌ *"Our neural network calculated a 0.941 probability vector"*
- ❌ Unexplained raw percentage numbers without reasons.
- ❌ Fabricated or hallucinated event details.

---

## 7. 3-Minute Hackathon Demo Script

```text
[0:00 - 0:30] Hook & Problem
"College students miss hundreds of hackathons, fests, and trials because campus life is 
scattered across 50 WhatsApp groups, while critical MST notices get buried in spam. 
CampusPilot is one personalized layer over campus life."

[0:30 - 1:00] Onboarding & Instant Feed Adaptation
"Watch Angel select Technical, Cultural, and Sports. In one click, Home dynamically builds:
1. Don't Miss: AI Hackathon closing in 4 hours
2. For You: Acoustic Open Mic and Basketball Semifinals with explainable 94% and 88% match scores
3. Important Campus: Official MST datesheet from the Controller of Examinations."

[1:00 - 1:45] Actionable Planning & Conflict Detection
"Angel clicks '+ Add to Plan' on the Hackathon. Then in Explore, discovers a Wellness workshop 
and adds it. Navigating to My Plan, CampusPilot immediately flags an overlap:
'⚠️ Time Conflict Detected on Oct 19 at 4:00 PM.' One click resolves the schedule."

[1:45 - 2:30] Institutional Guarantee & Conclusion
"Whether a student picks coding, music, or skips onboarding entirely, official exam schedules 
and result notices NEVER disappear. One campus. Thousands of experiences. One personalized feed."
```

---

## 8. Mobile-First & Accessibility Standards
- **Viewport Target:** Responsive PWA ($360\text{px}$ to $430\text{px}$ mobile baseline + desktop adaptation).
- **Navigation:** Fixed, thumb-accessible bottom navigation bar.
- **Tap Targets:** Minimum $44\text{px} \times 44\text{px}$ for all primary buttons and chips.
- **Contrast & Semantic HTML:** WCAG AA compliant contrast ratio ($\ge 4.5:1$); badges pair color with text/icons.
