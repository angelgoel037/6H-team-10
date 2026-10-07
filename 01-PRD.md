# CampusPilot — Product Requirements Document (PRD)

**Document status:** Phase 0 — Baseline
**Version:** 1.0
**Product:** CampusPilot
**Target:** 4-hour hackathon MVP; architected for later campus-scale expansion
**Primary users:** College students
**Secondary users:** Student societies, clubs, departments, campus committees, authorized staff/admins

---

## 1. Product Summary

CampusPilot is a **personalized campus discovery and planning PWA**. It brings fragmented campus information—technical events, hackathons, cultural activities, sports, music, clubs, career opportunities, wellness/psychology sessions, freshers, fests, parties, guest lectures, and a small set of critical academic/campus notices—into one place.

The product does **not** attempt to become a full ERP, attendance system, assignment manager, hostel manager, or fee portal.

The core product promise is:

> **One campus. Thousands of experiences. One personalized feed.**

Students choose the themes they care about during onboarding. CampusPilot then ranks relevant campus items for them while preserving a separate stream for critical institutional information such as exam/MST notifications and result declarations.

The product is designed around the following pipeline:

```text
Fragmented campus information
        ↓
Structured campus item
        ↓
Student interest + time + urgency
        ↓
Personalized relevance
        ↓
Discover / Save / Plan / Act
```

---

## 2. Problem Statement

Campus information is fragmented across posters, society announcements, departmental notices, WhatsApp groups, Instagram posts, emails, Google Forms, and informal student networks.

This creates four specific problems:

1. **Discovery problem:** students do not know what is happening across campus.
2. **Relevance problem:** a large event feed contains much more information than any one student cares about.
3. **Action problem:** students learn about useful events but fail to register, save, or attend them.
4. **Critical-information problem:** important institutional notices can be buried among low-priority activity announcements.

CampusPilot addresses these by separating information into:

- **For You:** personalized based on selected interests.
- **Important Campus:** high-importance institutional information shown independently of interest preferences.
- **Explore:** the complete campus landscape for intentional discovery.
- **My Plan:** the student's chosen campus activities.
- **Alerts / Don't Miss:** urgent and time-sensitive items.

---

## 3. Product Vision

CampusPilot should become the **personalized information layer over campus life**.

The long-term vision is not "another college events app." It is a campus intelligence layer that can accept information from multiple sources and normalize it into a common campus-item model, while allowing students to control what they see.

### Long-term direction

```text
Official departments ─┐
Societies / clubs ────┤
Posters ──────────────┤
Email / forms ────────┤ → Campus Item Layer → Personalization → Student Action
Campus websites ──────┤
Future connectors ────┘
```

The MVP intentionally uses a small number of controlled input methods so it can be deployed reliably within four hours.

---

## 4. Target Users

### 4.1 Primary — Students

A student who wants to know what is happening on campus without monitoring many channels.

Typical goals:

- Discover relevant events.
- Select preferred themes.
- Plan a few activities around free time.
- Avoid missing registrations.
- See major academic/campus announcements without being overloaded by them.

### 4.2 Secondary — Student Organizations

A society or club that needs a simple way to publish an event or announcement.

Typical goals:

- Upload a poster or announcement.
- Convert it into structured information.
- Verify extracted fields.
- Publish to the campus feed.

### 4.3 Secondary — Departments / Authorized Publishers

Authorized publishers can post important campus information such as exam schedules, result declarations, career sessions, and official notices.

---

## 5. Category Taxonomy

The MVP uses seven primary categories.

| Category | Examples | Personalized? | Critical override possible? |
|---|---|---:|---:|
| Technical | Hackathons, coding, AI, robotics, technical workshops | Yes | No |
| Cultural & Music | Music society, dance, drama, art, open mic | Yes | No |
| Sports | Cricket, football, basketball, athletics, esports | Yes | No |
| Social & Campus Life | Freshers, farewell, fests, parties, student gatherings | Yes | No |
| Career | Placement talks, internships, company sessions, resume workshops | Yes | Yes |
| Wellness | Psychology sessions, health camps, wellbeing workshops | Yes | Yes |
| Academic & Important | MST/exams, result declarations, major academic notices, university notices | Usually light | Yes |

### Personalization rule

A student may select any combination of interest categories.

Example:

```text
Technical ✅
Cultural & Music ✅
Sports ✅
Career ✅
Wellness ❌
Academic & Important → always retained for critical notifications
```

Students are **not forced** to consume the full campus feed.

---

## 6. Core Features — MVP

### F-01 — Interest Onboarding

Students select the themes they want to see prominently.

**Acceptance criteria**

- Category chips are selectable/unselectable.
- At least one category is recommended but the UI must allow a student to skip selection.
- Preferences are persisted.
- Preferences can be edited later.

### F-02 — Personalized Home Feed

The Home screen presents:

1. **Don't Miss**
2. **For You**
3. **Important Campus**
4. **Explore Something New**

**Acceptance criteria**

- For You ranking changes when interests change.
- Important Campus items remain visible independently of preference filters.
- Cards show enough context to decide whether to open them.

### F-03 — Campus Discovery

The Explore screen exposes the broader campus feed with category and basic time/status filtering.

**Acceptance criteria**

- Users can browse beyond their personalized recommendations.
- Users can filter by category.
- Users can open a CampusItem detail page.

### F-04 — My Plan

A student can save selected campus items into a personal plan.

**Acceptance criteria**

- Add/remove is possible.
- Plan is date-aware.
- Basic time conflicts can be detected.
- The plan is visualized chronologically.

### F-05 — Don't Miss / Urgency

Surface items with meaningful urgency such as an imminent registration deadline or upcoming important session.

**Acceptance criteria**

- Deadline and start-time proximity affect ranking.
- Urgency is visible without generating unnecessary notification spam.

### F-06 — Publisher / Organizer Upload

An authorized publisher can upload a poster or announcement and generate a structured CampusItem.

**Acceptance criteria**

- Upload or paste content.
- AI/extraction returns editable structured fields.
- Publisher reviews before publishing.
- Published item becomes available through the same CampusItem pipeline.

### F-07 — Critical Information Channel

Important notices can bypass personalization.

Examples:

- MST/exam schedule released.
- Result declaration.
- Major campus closure.
- Major placement/career notice.

### F-08 — Explainable Recommendation

Recommendations display a simple human-readable reason.

Example:

> **94% match** — Matches your Technical interest, happens today, and registration closes tonight.

---

## 7. MVP User Journey

```text
Open CampusPilot
    ↓
Select interests / Skip
    ↓
Home: For You + Don't Miss + Important Campus
    ↓
Open a CampusItem
    ↓
Register / Add to My Plan / Explore
    ↓
My Plan shows selected activities
    ↓
Optional: resolve a time conflict
```

Publisher journey:

```text
Publisher
  ↓
Upload poster / announcement
  ↓
Extraction
  ↓
Review fields
  ↓
Publish
  ↓
CampusItem database
  ↓
Personalized student delivery
```

---

## 8. Explicit Non-Goals for the Hackathon

The following are **not MVP features**:

- Full college ERP.
- Attendance management.
- Assignment submission/tracking system.
- Fee/payment system.
- Hostel/mess management.
- Full timetable replacement.
- Instagram scraping as a required dependency.
- WhatsApp scraping as a required dependency.
- Complex social networking/chat.
- Payment processing.
- Full push-notification infrastructure.
- Advanced ML training or custom model training.

These may appear in a future roadmap, but they must not enter the four-hour MVP unless the core product is already stable.

---

## 9. Personalization Model

The system should personalize **importance and ordering**, not erase institutional information.

### Priority score — MVP heuristic

```text
40% Interest Match
25% Time Relevance
15% Urgency
10% Popularity / social proof
10% Discovery factor
```

The score is a ranking mechanism, not a claim of factual importance.

### Important information override

Critical campus information should be delivered outside the personalized ranking.

Example:

```text
For You
  → Music Open Mic
  → AI Workshop
  → Basketball semifinal

Important Campus
  → MST timetable released
  → Semester results declared
```

---

## 10. Information Lifecycle

Every item should follow:

```text
Draft → Extracted → Reviewed → Published → Updated / Cancelled → Archived
```

The MVP may simplify this to:

```text
Draft → Published → Cancelled / Archived
```

But the schema should not prevent future lifecycle states.

---

## 11. Success Criteria for the Hackathon

The MVP is successful if a judge can see, without developer intervention:

1. A student selects interests.
2. Relevant campus items appear.
3. Important academic/campus notices still appear.
4. A student adds items to My Plan.
5. The product detects a simple time conflict.
6. A publisher uploads a poster/notice.
7. Structured information is extracted.
8. The publisher reviews and publishes it.
9. The new item appears in the student experience.

---

## 12. Primary Product Metrics — Future

Not required for the hackathon, but architecturally relevant:

- Preference completion rate.
- Event detail open rate.
- Add-to-plan rate.
- Registration click-through rate.
- Recommendation acceptance rate.
- Publisher-to-publication time.
- Percentage of published items with corrected extracted fields.
- Critical-notice view rate.

---

## 13. Product Principles

1. **Student control:** personalization should be user-controlled.
2. **Critical information must not disappear:** important institutional notices have a separate channel.
3. **Action over clutter:** every important card should lead to a useful action.
4. **Explainable relevance:** recommendations should have understandable reasons.
5. **One CampusItem model:** different campus content types should use the same normalized data pipeline.
6. **MVP discipline:** do fewer things completely rather than many things partially.

---

## 14. Product Definition of Done

The product is considered MVP-complete only when the core user flow and publisher flow work end-to-end in production.

**Student:**

`Onboard → Personalize → Discover → Save → Plan → Act`

**Publisher:**

`Upload → Extract → Review → Publish → Deliver`

---

## 15. Out-of-Scope Growth Roadmap

Later versions may add pluggable source adapters for:

- Official college websites.
- Department systems.
- Email.
- Google/Microsoft calendar.
- Approved social/content feeds.
- ERP integrations.
- Multi-campus administration.

The current architecture must not hard-code the MVP to one source.
