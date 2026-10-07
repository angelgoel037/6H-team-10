# CampusPilot — Product Definition & Information Architecture

**Phase:** Phase 1 (Product & Content Foundation)  
**Author:** Angel (Team Lead / Product / UX)  

---

## 1. Product Positioning & Non-Goals

CampusPilot is a **personalized campus discovery and planning platform**. It connects students with relevant campus activities, fests, hackathons, sports, career opportunities, and critical university announcements.

```text
Student selects interests
        ↓
CampusPilot understands preferences
        ↓
Campus items normalized into unified CampusItem model
        ↓
Relevance + Time + Urgency evaluated
        ↓
Student discovers, saves to My Plan, and acts
```

### 🚫 Non-Goals for CampusPilot MVP
To preserve product clarity and avoid turning into a clunky enterprise portal, CampusPilot is:
- **NOT an ERP / Attendance Tracker** (We do not track class attendance or lecture roll-calls).
- **NOT an Assignment / LMS System** (We do not submit homework or grade lab files).
- **NOT a Fee or Hostel Management Portal**.
- **NOT a Timetable Replacer**.

The product focus remains purely on **campus life, opportunities, discovery, and personal planning**.

---

## 2. Information Priority Hierarchy

Every piece of campus information is categorized into one of four priority tiers:

```text
┌─────────────────────────────────────────────────────────────────┐
│ 🔴 CRITICAL                                                     │
│ MST & exam datesheets, result declarations, campus closures     │
├─────────────────────────────────────────────────────────────────┤
│ 🟠 HIGH                                                         │
│ Registrations closing tonight, high-match flagship hackathons   │
├─────────────────────────────────────────────────────────────────┤
│ 🔵 NORMAL                                                       │
│ Upcoming society workshops, open mics, sports league matches    │
├─────────────────────────────────────────────────────────────────┤
│ 🟣 DISCOVERY                                                    │
│ Broad opportunities outside selected interests to avoid bubbles │
└─────────────────────────────────────────────────────────────────┘
```

### Priority Tier Definitions

| Tier | Importance Value | User Experience Treatment | Examples |
|---|---|---|---|
| **CRITICAL** | `critical` | **Institutional Override.** Highlighted with distinct red/rose badge; displayed prominently in *Important Campus* section regardless of user preferences. | MST schedule released, Semester results out, Severe weather closure notice. |
| **HIGH** | `high` | **Urgent Action.** Filtered into *Don't Miss* carousel or top of *For You* feed; displays countdown/urgency badge. | "Registration closes in 4 hours", Google Hackathon 2026, FAANG placement talk. |
| **NORMAL** | `normal` | **Personalized Feed.** Standard cards ordered by calculated match score in *For You* feed. | Acoustic open mic night, Intra-college badminton singles, LaTeX documentation workshop. |
| **DISCOVERY** | `normal` / `low` | **Serendipity.** Curated items outside user's selected interests shown in *Explore Something New* to prevent echo-chambers. | Yoga workshop shown to a tech-focused student. |

---

## 3. Personalization Model

### Two Distinct Information Channels

1. **`FOR YOU` (Interest-Driven Personalization)**
   - Powered by the student's selected interests (e.g., Technical, Cultural, Sports, Career, Wellness, Learning).
   - Dynamically re-ranked using the multi-factor scoring formula:
     $$\text{Score} = 40\% \text{ Interest Match} + 25\% \text{ Time Relevance} + 15\% \text{ Urgency} + 10\% \text{ Popularity} + 10\% \text{ Discovery}$$
   - Every card displays a clear, explainable match reason badge (e.g., *"94% match — Matches your Technical & Career interests"*).

2. **`IMPORTANT CAMPUS` (Institutional Persistence)**
   - High-importance circulars from the Examination Cell, Dean's Office, and University Administration.
   - **Guaranteed visibility:** Items classified under `important_campus` or with `importance: 'critical'` NEVER disappear, even if the student unselects Academic interests.

### 🛡️ Graceful Handling of Edge Cases

- **Zero Interests Selected (User skipped onboarding):**
  - Do NOT block entry.
  - Display trending campus events ordered by date/urgency in *For You*.
  - Show a gentle banner: *"Tip: Select your favorite interests in Profile to personalize this feed."*
  - Retain full *Important Campus* notices.
- **Empty Personalized Feed (No events matching rare interests):**
  - Render an actionable empty state: *"Nothing matched your interests for this week yet. Explore all campus activities."*
  - CTA button: `[Explore All Events]`.

---

## 4. Homepage Information Architecture

The Home screen follows an exact 4-section vertical hierarchy:

```text
┌──────────────────────────────────────────────────────────────┐
│ Header: "Good morning, [Name] 👋"                            │
│ Sub: "Here's what matters on your campus today."             │
├──────────────────────────────────────────────────────────────┤
│ 1. 🔥 DON'T MISS (1–3 high-urgency cards)                     │
│    - Imminent registration deadlines                         │
│    - Events happening today/tonight                          │
├──────────────────────────────────────────────────────────────┤
│ 2. ✨ FOR YOU (Personalized feed cards)                       │
│    - Ranked by student interest match %                      │
│    - Date, time, venue, match explanation badge              │
│    - [Register] [Add to Plan] CTAs                           │
├──────────────────────────────────────────────────────────────┤
│ 3. 📢 IMPORTANT CAMPUS (Institutional updates)               │
│    - Examination & MST notices                               │
│    - Results & official circulars                            │
│    - Clear publisher / office attribution                    │
├──────────────────────────────────────────────────────────────┤
│ 4. 🧭 EXPLORE SOMETHING NEW (1–3 discovery cards)            │
│    - Intentionally broad activities outside usual profile    │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Navigation & Core Screens

| Tab | Screen Name | Core Objective |
|---|---|---|
| 🏠 | **Home** | Personalized daily briefing: Don't Miss, For You, Important Campus, Explore. |
| 🔍 | **Explore** | Full campus landscape with category pills, date filters, and search bar. |
| 📅 | **My Plan** | Chronological timeline of saved events with automated time-conflict warning badges. |
| 🔔 | **Alerts** | Grouped streams: 🔥 *Don't Miss* & 📢 *Important Campus*. |
| 👤 | **Profile** | View & update interest preferences, student year/dept details. |
