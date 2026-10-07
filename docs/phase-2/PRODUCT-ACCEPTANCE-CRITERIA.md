# CampusPilot — Phase 2 Product Acceptance Criteria (PAC)

**Document Status:** Phase 2 Final Baseline  
**Author / Owner:** Angel (Team Lead & Product Owner)  
**Total Acceptance Criteria:** 24 Testable Criteria  

---

## 1. Onboarding & Preferences (AC-001 to AC-004)

### AC-001: Multi-Interest Selection
- **Description:** A student can select one or multiple categories from the 7 optional interest chips (`Technical`, `Cultural`, `Sports`, `Social & Campus Life`, `Career`, `Wellness`, `Learning & Research`).
- **Validation:** Selecting a chip toggles its visual active state (accent background, glowing border, checkmark icon).

### AC-002: Zero-Interest Continuation (Skip Handling)
- **Description:** A student can proceed into the application without selecting any optional interest chips by clicking `Skip for now` or `Build My Campus Feed →` with zero selections.
- **Validation:** The application does not block navigation, throws no errors, and loads the Home feed in default trending mode with an informational helper banner.

### AC-003: Preference Persistence
- **Description:** Selected student interests are saved to persistent storage (`StudentPreferences`).
- **Validation:** Reloading the app or navigating across tabs preserves the student's selected interest filters.

### AC-004: Preference Modification
- **Description:** A student can modify their selected interests at any time from the Profile tab.
- **Validation:** Saving updated preferences immediately re-ranks the `For You` feed on the Home screen upon return.

---

## 2. Homepage & Information Architecture (AC-005 to AC-009)

### AC-005: Strict 4-Section Homepage Hierarchy
- **Description:** The Home screen (`/`) displays exactly four vertical sections in designated order:
  1. `🔥 Don't Miss` (1–3 urgent cards)
  2. `✨ For You` (Personalized recommendation cards)
  3. `📢 Important Campus` (Official institutional circulars)
  4. `🧭 Explore Something New` (Serendipitous discovery cards)
- **Validation:** Section sequence is fixed and verified across all viewport sizes.

### AC-006: "Don't Miss" Urgency Filter
- **Description:** Section 1 (`Don't Miss`) only surfaces high-urgency items (imminent registration deadline, happening today, or `importance: 'high'`).
- **Validation:** No low-priority or non-urgent notices appear in Section 1. Max 3 cards rendered.

### AC-007: Explainable Recommendation Scoring
- **Description:** Every card rendered in `For You` displays a percentage match badge (`XX% MATCH`) and expandable tooltip with plain-language explanation reasons.
- **Validation:** Clicking or hovering on match badge displays human-readable reasons (e.g. *"Matches your Technical interest · Happening today"*). No unexplained scores exist.

### AC-008: Non-Suppression of Important Campus Information
- **Description:** Items classified with `category: 'important_campus'` or `importance: 'critical'` remain visible in Section 3 and the Alerts tab, regardless of student interest preferences.
- **Validation:** A student who only selects `sports` still sees MST datesheets and semester result declarations.

### AC-009: "Explore Something New" Serendipity
- **Description:** Section 4 (`Explore Something New`) deliberately highlights 1–3 high-quality campus activities outside the student's selected interest categories to prevent echo-chambers.
- **Validation:** A tech-only student sees arts or wellness items in Section 4.

---

## 3. Event Detail & Actions (AC-010 to AC-013)

### AC-010: Complete Event Detail Anatomy
- **Description:** Opening an event detail view displays full title, category badge, date, time range, venue, organizer, full description, deadline (if applicable), and tags.
- **Validation:** All fields from `CampusItem` are rendered cleanly without placeholder text or undefined values.

### AC-011: Direct External Registration Action
- **Description:** If a `CampusItem` includes `registrationUrl`, the card/modal displays a prominent `Register Now ↗` CTA button.
- **Validation:** Clicking the button opens the valid external registration URL in a new tab.

### AC-012: Add to Plan Toggle Action
- **Description:** A student can click `+ Add to Plan` on any event card or detail view.
- **Validation:** Button state toggles immediately to `In Plan ✓` with subtle haptic/visual feedback, and the item is appended to `My Plan`.

### AC-013: Plan De-duplication
- **Description:** Attempting to add an already-saved event to `My Plan` does not create duplicate entries in the student's schedule.
- **Validation:** The plan list contains exactly one instance of the selected `campusItemId`.

---

## 4. "My Plan" & Conflict Intelligence (AC-014 to AC-017)

### AC-014: Chronological Plan Timeline
- **Description:** The `My Plan` screen displays saved campus activities ordered chronologically by date and start time.
- **Validation:** Events for `Oct 15` appear before `Oct 16`; within the same day, `10:00 AM` appears before `4:00 PM`.

### AC-015: Automated Time Conflict Detection (FR-007)
- **Description:** If two plan items occur on the same date and their time ranges overlap ($A.start < B.end \land B.start < A.end$), the UI renders an alert banner: `⚠️ Time Conflict Detected`.
- **Validation:** Overlapping events (e.g. 17:00–18:00 and 17:30–18:30) trigger the conflict state; non-overlapping sequential events (e.g. 17:00–18:00 and 18:00–19:00) do not.

### AC-016: Conflict Resolution Action
- **Description:** When a time conflict is detected, the UI provides resolution buttons (`[Keep Event A]` / `[Keep Event B]`).
- **Validation:** Clicking `[Keep Event A]` removes Event B from the plan and dismisses the conflict alert banner.

### AC-017: Remove from Plan Action
- **Description:** A student can remove an event from their plan at any time from the `My Plan` screen or by untoggling the card button.
- **Validation:** The event is removed from the timeline immediately.

---

## 5. Explore, Search & Alerts (AC-018 to AC-020)

### AC-018: 8-Category Taxonomy Filtering
- **Description:** The `Explore` screen provides horizontal scrolling filter chips representing all 8 canonical categories plus an `All` filter.
- **Validation:** Selecting `💻 Technical` filters the list strictly to technical items; selecting `All` resets the filter.

### AC-019: Real-time Keyword Search
- **Description:** Typing keywords into the search input dynamically filters campus items by title, organizer, tags, and venue.
- **Validation:** Searching for "hackathon" returns all hackathon items across categories.

### AC-020: Grouped Alerts Channel
- **Description:** The `Alerts` tab organizes notifications into two distinct sections: `🔥 Don't Miss` (urgent deadlines) and `📢 Important Campus` (official circulars).
- **Validation:** Critical notices display red badge; urgent deadlines display amber countdown badge.

---

## 6. Content States & Quality (AC-021 to AC-024)

### AC-021: Actionable Empty States
- **Description:** Empty feeds (e.g. no plan items saved, no alerts, or zero search results) render dedicated illustrations, explanatory text, and recovery CTA buttons.
- **Validation:** The app never displays blank screens, raw errors, or broken layouts.

### AC-022: Expired & Cancelled Item Handling
- **Description:** Past events and items with `status: 'cancelled'` are visually flagged with appropriate status badges (`Cancelled`, `Completed`) and excluded from upcoming `For You` recommendations.
- **Validation:** Cancelled events disable registration CTAs.

### AC-023: Mobile-First Responsive PWA Experience
- **Description:** Application layout is optimized for mobile screens (360px–430px) with fixed bottom navigation, thumb-friendly tap targets ($\ge 44\text{px}\times 44\text{px}$), and smooth scroll transitions.
- **Validation:** Experience renders seamlessly on mobile viewports and desktop browser windows without horizontal overflow.

### AC-024: Accessibility & Text Contrast
- **Description:** All text meets WCAG AA contrast standards ($\ge 4.5:1$ for normal text), interactive controls have visible focus rings, and badges never rely exclusively on color to convey meaning (always paired with text/icons).
- **Validation:** Verified across dark mode color tokens.
