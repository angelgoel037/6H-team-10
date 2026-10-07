# CampusPilot — UX / UI Design Specification

**Document status:** Phase 0 — Baseline
**Version:** 1.0
**Design objective:** Make a large campus feel personally relevant without feeling restrictive.

---

## 1. UX North Star

The interface must answer three questions immediately:

1. **What matters to me?**
2. **What should I not miss?**
3. **What can I do with my time?**

The experience should feel like a personalized campus companion, not a college administration portal.

---

## 2. Design Personality

CampusPilot should feel:

- modern,
- energetic,
- trustworthy,
- student-first,
- uncluttered,
- fast,
- personalized.

Avoid:

- government/ERP-looking layouts,
- dense tables on the student side,
- excessive dashboard widgets,
- overuse of gradients,
- decorative animation with no UX purpose.

---

## 3. Navigation

Mobile-first bottom navigation:

```text
┌────────┬────────┬────────┬────────┬────────┐
│  Home  │Explore │ My Plan│ Alerts │Profile │
└────────┴────────┴────────┴────────┴────────┘
```

Profile may contain interest preferences during MVP.

---

## 4. Onboarding

### Screen title

> **Make CampusPilot yours.**

### Subtitle

> Pick what you care about. We'll bring the rest together without overwhelming you.

### Category chips

```text
💻 Technical
🎵 Music & Cultural
🏆 Sports
🎉 Social & Campus Life
💼 Career
🧠 Wellness
🔬 Academic & Learning
```

### Critical information notice

A small persistent message:

> **Important exam, result, and major campus notices can still reach you even if you don't select Academic.**

### CTA

> **Build My Campus**

Secondary option:

> **Skip for now**

---

## 5. Home Screen

The Home screen must not be a chronological dump.

### Header

```text
Good morning, Angel 👋
Here's what matters on your campus.
```

### Section 1 — Don't Miss

Use sparingly: 1–3 items.

Example:

> 🔥 **Hackathon registration closes tonight**

Show deadline and action.

### Section 2 — For You

Personalized cards with match labels.

Example:

> **AI Workshop**
> 94% match
> Today · 4:00 PM
> Seminar Hall

### Section 3 — Important Campus

Visually distinct but not alarming by default.

Example:

> 📢 **MST timetable released**
> Examination Cell · 2 hours ago

### Section 4 — Explore Something New

Show 1–3 intentionally outside-profile items only when useful.

---

## 6. Event / Campus Item Card

Minimum information:

```text
Category label
Title
Date + time
Venue or context
Match percentage (if personalized)
Urgency/deadline (if applicable)
Primary action
```

Example:

```text
TECHNICAL                         94% MATCH
AI Hackathon 2026
Tomorrow · 10:00 AM
Innovation Hall
Registration closes tonight

[Register]     [Add to Plan]
```

---

## 7. Match Explanation

Do not display an unexplained number alone.

Use expandable/secondary text:

> **Why 94%?**
> Matches your Technical interest, happens during your preferred time, and registration closes soon.

The score is a UX aid, not a scientific prediction.

---

## 8. Explore Screen

Purpose: let students override personalization intentionally.

### Top controls

- Search
- Category filters
- Today / This Week

### Categories

Technical · Cultural · Sports · Social · Career · Wellness · Academic/Important

The user should always be able to discover something outside their selected preferences.

---

## 9. My Plan

The plan is a lightweight campus-life schedule, not a replacement for the college timetable.

Example:

```text
TODAY

4:00 PM
AI Workshop
Seminar Hall

5:30 PM
Basketball Semifinal
Sports Complex

7:00 PM
Open Mic
Amphitheatre
```

### Conflict state

```text
⚠️ Time conflict
AI Workshop and Debate both start at 5:00 PM.

[Keep Workshop] [Keep Debate]
```

MVP does not need route/travel optimization.

---

## 10. Alerts Screen

Divide into two groups:

### 🔥 Don't Miss

Personalized and time-sensitive.

### 📢 Important Campus

Critical institutional information.

Avoid making every notification visually urgent.

---

## 11. Publisher UI

The publisher flow should be intentionally utilitarian and separate from the student experience.

### Step 1

> Upload poster / notice

### Step 2

> Review extracted details

### Step 3

> Edit if needed

### Step 4

> Publish

The review page should visually indicate fields that the extractor is uncertain about.

---

## 12. Design System Guidance

### Typography

Use one modern sans-serif family and a clear scale.

Recommended hierarchy:

```text
Display / page title
Section heading
Card title
Body
Metadata
Caption
```

### Spacing

Use a consistent spacing scale rather than arbitrary margins.

### Radius

Moderately rounded cards/buttons; avoid excessive pill shapes except category/filter chips.

### Icons

Use a single icon family such as Lucide for consistency.

### Motion

Use subtle transitions for:

- preference selection,
- card hover/press,
- filter changes,
- plan addition,
- upload/extraction state.

Avoid continuous or decorative animations.

---

## 13. Empty States

### No personalized items

> **Nothing matched yet.**
> Explore the full campus or add more interests.

CTA:

> **Explore Campus**

### No plan

> **Your campus plan is empty.**
> Save events you want to attend.

CTA:

> **Find Something**

### No alerts

> **You're all caught up.**

---

## 14. Accessibility Expectations

- Use semantic buttons for actions.
- Never use color as the only meaning carrier.
- Ensure important state has text labels.
- Maintain keyboard access on desktop.
- Keep tap targets comfortably sized.
- Provide text alternatives for poster-derived information.

---

## 15. Responsive Behavior

### Mobile

Primary target.

- Single-column cards.
- Sticky bottom navigation.
- Compact filters.

### Tablet/Desktop

- Wider feed content.
- Optional two-column sections.
- Keep the information hierarchy identical.

Do not create separate product logic for desktop.

---

## 16. UX Anti-Patterns to Avoid

Do not:

- show 20 recommendations above the fold,
- bury Important Campus updates,
- make every notification red,
- force users to select interests,
- hide the full campus feed,
- present AI text that sounds confident when extracted information is uncertain,
- overload the first screen with administrative data.

---

## 17. UI Definition of Done

The student should be able to understand the Home page in under 10 seconds:

> **What matters to me?**
> **What should I not miss?**
> **What can I add to my plan?**

If the answer is not immediately visible, simplify the screen.
