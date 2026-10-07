# CampusPilot — Software Requirements Document (SRD)

**Document status:** Phase 0 — Baseline
**Version:** 1.0
**Scope:** Four-hour hackathon MVP
**Runtime target:** Web/PWA, responsive mobile-first UI

---

## 1. System Objective

CampusPilot shall provide one normalized campus-information system that:

1. Accepts campus items from an authorized publisher workflow.
2. Stores those items in a normalized database.
3. Stores student interest preferences.
4. Produces personalized rankings for students.
5. Keeps critical campus information visible independently of preferences.
6. Allows students to save items to a personal plan.
7. Detects simple time conflicts.
8. Supports poster/announcement extraction into structured CampusItems.

---

## 2. Actors

### STUDENT

Can:

- Select interests.
- Edit interests.
- Browse personalized feed.
- Browse all campus categories.
- Open item details.
- Add/remove plan items.
- View important campus items.
- View recommendation reasons.

### PUBLISHER

Can:

- Create a campus item.
- Upload/paste poster content.
- Review extracted metadata.
- Publish/update/cancel permitted items.

### SYSTEM

Can:

- Extract structured fields.
- Rank items.
- Calculate urgency.
- Detect simple conflicts.
- Preserve critical items outside personalization.

### FUTURE ADMIN

Not required for MVP. The schema should permit role-based expansion.

---

## 3. Functional Requirements

### FR-001 — Interest Selection

The system shall provide a set of predefined interest categories.

**Input:** category IDs

**Output:** persisted user preference set

**Rules:**

- A user may select zero or more categories.
- Preference changes should take effect on the next feed retrieval.
- Critical campus information remains eligible regardless of preferences.

### FR-002 — Campus Item Retrieval

The system shall return published CampusItems.

Supported filters:

- category
- date range
- status
- audience
- optional text search

### FR-003 — Personalized Ranking

The system shall calculate a relevance score for a student and an item.

Minimum score inputs:

- interest overlap
- time relevance
- urgency/deadline
- popularity
- discovery factor

### FR-004 — Critical Information

CampusItems with a critical/important classification shall appear in the Important Campus channel even if not matched to a student's selected interests.

### FR-005 — Item Detail

A CampusItem detail view shall show:

- title
- category
- description
- date/time
- venue
- organizer
- deadline if present
- registration/action link if present
- recommendation reason if personalized
- source/verification indicator where available

### FR-006 — My Plan

A student shall be able to create a personal list/schedule from CampusItems.

The system shall prevent accidental duplication of the same item within a user's plan.

### FR-007 — Conflict Detection

For two plan items A and B:

```text
conflict = A.start < B.end AND B.start < A.end
```

The MVP only needs exact time-overlap detection. Travel-time optimization is future scope.

### FR-008 — Publisher Creation

A publisher shall be able to create a CampusItem directly or through extracted fields.

### FR-009 — Poster/Announcement Extraction

The extraction service shall return structured fields with nullable values where the source does not contain enough information.

Never invent missing event data.

### FR-010 — Review Before Publish

AI/extracted content shall remain editable and shall not become public until the publisher confirms it.

### FR-011 — Status Management

CampusItem status must support at least:

- draft
- published
- cancelled
- archived

### FR-012 — Source Metadata

Each CampusItem should retain a source type such as:

- publisher_manual
- poster_extraction
- future_integration

---

## 4. Non-Functional Requirements

### NFR-001 — Performance

For the hackathon, typical feed requests should target a responsive experience with no unnecessary client-side blocking.

Use pagination or capped result sets for feed requests.

### NFR-002 — Reliability

The application must continue to work when the AI provider is unavailable for non-AI paths.

Recommendation logic must have a deterministic fallback.

### NFR-003 — Maintainability

Use clear module boundaries and small units of responsibility.

No page should contain database logic, extraction logic, recommendation logic, and presentation logic in one file.

### NFR-004 — Extensibility

Adding a new campus category must not require changes across unrelated modules.

Adding a new ingestion source must be possible through a new adapter/service rather than rewriting CampusItem logic.

### NFR-005 — Security

- Never expose service-role database credentials to the browser.
- Use public/client-safe keys only in client code.
- Validate publisher inputs server-side.
- Do not trust client-provided role/authorization values.
- Sanitize/render user-supplied text safely.

### NFR-006 — Privacy

Only collect data required for MVP personalization.

Do not collect precise location in the MVP.

Do not expose one student's preferences or plan to another student unless explicitly supported in a future feature.

### NFR-007 — Accessibility

Minimum expectations:

- keyboard-accessible controls where relevant
- semantic headings/buttons
- visible focus states
- readable contrast
- labels for interactive controls

### NFR-008 — Responsiveness

Primary design target: mobile-width experience.

Secondary target: desktop browser.

### NFR-009 — Deployment

The frontend shall be deployable on Vercel.

The backend/data layer shall use Supabase for the MVP.

---

## 5. Error Handling Requirements

### AI extraction failure

Display:

> "We couldn't confidently extract all fields. Please review the information manually."

Allow manual correction.

### Empty personalized feed

Do not display an empty screen.

Show:

> "Nothing matched your interests yet. Explore all campus activities."

### Database/network failure

Show a recoverable error state and preserve already-loaded content where possible.

### Invalid event data

Do not publish until minimum required fields are valid.

Recommended minimum for most items:

- title
- category
- date OR a valid announcement timestamp
- source/publisher

---

## 6. CampusItem Business Rules

### Required semantic categories

```text
technical
cultural_music
sports
social
career
wellness
academic_important
```

### Importance levels

```text
normal
high
critical
```

### Audience

At minimum:

```text
all_students
specific_group
specific_department
```

### Recommendation eligibility

A published item may be personalized unless:

- it is critical and must be shown through Important Campus, or
- it is explicitly excluded from recommendation.

---

## 7. Recommendation Contract

The recommendation module should accept:

```text
StudentProfile
- selectedCategories[]
- optional availableTimeWindow

CampusItem
- category
- subcategory
- start/end
- deadline
- importance
- popularity
- tags
```

It should return:

```text
RecommendationResult
- score: number 0..100
- reasons: string[]
- urgency: normal|soon|urgent
```

The UI must not depend on internal scoring details beyond the returned contract.

---

## 8. Suggested API/Data Operations

The exact transport layer can be implemented using Supabase APIs/server functions, but the logical contract should remain stable.

```text
GET    /campus-items
GET    /campus-items/:id
GET    /campus-items/important
GET    /campus-items/for-you
POST   /campus-items
PATCH  /campus-items/:id
POST   /plans/items
DELETE /plans/items/:id
GET    /plans
GET    /preferences
PUT    /preferences
POST   /publish/extract
```

These are logical operations; they do not require a separate REST server if Supabase server/client patterns are cleaner for the MVP.

---

## 9. Definition of Done — Engineering

A requirement is done only when:

- it works in the UI,
- the data path is real or intentionally mocked,
- failure state is handled,
- it does not break existing functionality,
- it has a clear owner,
- it is documented at the interface boundary.

---

## 10. Requirements Traceability

| Requirement | Owner | MVP phase |
|---|---|---:|
| FR-001 | Nidhi/Jayant | 6 |
| FR-002 | Jayant/Nidhi | 3, 6 |
| FR-003 | Prabhav | 4, 8 |
| FR-004 | Prabhav/Jayant | 3, 6 |
| FR-005 | Nidhi | 2, 6 |
| FR-006 | Nidhi/Jayant | 6, 8 |
| FR-007 | Prabhav | 8 |
| FR-008 | Jayant | 7 |
| FR-009 | Prabhav | 4 |
| FR-010 | Jayant/Nidhi | 7 |
| FR-011 | Jayant | 3, 7 |
| FR-012 | Jayant | 3 |
