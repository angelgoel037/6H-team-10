# CampusPilot — Software Architecture Document

**Document status:** Phase 0 — Baseline
**Version:** 1.0
**Architecture style:** Modular monolith / layered web application
**Deployment:** Vercel + Supabase
**Primary client:** Next.js PWA

---

## 1. Architectural Decision

CampusPilot will use a **modular monolith** for the hackathon rather than microservices.

This is intentional.

A four-hour build benefits from:

- one deployable frontend/application,
- one managed database/backend platform,
- clear internal boundaries,
- minimal operational overhead.

The application must still enforce separation of concerns internally so that the future system can extract services or adapters without rewriting the domain model.

---

## 2. High-Level Architecture

```text
                     ┌─────────────────────────┐
                     │     Student PWA          │
                     │      Next.js             │
                     └────────────┬────────────┘
                                  │
                                  ▼
                     ┌─────────────────────────┐
                     │ Application / Domain    │
                     │                         │
                     │ Campus Items            │
                     │ Personalization         │
                     │ Planning                 │
                     │ Critical Info            │
                     └───────┬─────────┬───────┘
                             │         │
                ┌────────────┘         └─────────────┐
                ▼                                    ▼
      ┌─────────────────────┐              ┌──────────────────┐
      │ Supabase             │              │ Intelligence     │
      │ PostgreSQL/Auth      │              │ Extraction       │
      │ Storage              │              │ Ranking          │
      └─────────────────────┘              │ Conflict logic  │
                                           └──────────────────┘
```

---

## 3. Architectural Layers

### 3.1 Presentation Layer

Responsibilities:

- render UI,
- capture user interactions,
- call application interfaces,
- handle loading/error states.

Must not contain:

- SQL queries,
- recommendation formulas,
- raw AI prompt construction,
- publisher authorization logic.

### 3.2 Application Layer

Responsibilities:

- use-case orchestration,
- retrieving campus items,
- saving plans,
- requesting recommendations,
- orchestrating extraction/review/publish.

Examples:

```text
GetPersonalizedFeed
GetImportantCampusUpdates
AddItemToPlan
BuildCampusPlan
ExtractCampusItem
PublishCampusItem
```

### 3.3 Domain Layer

Responsibilities:

- CampusItem model/rules,
- category semantics,
- recommendation contracts,
- urgency semantics,
- conflict rules,
- preference rules.

The domain layer should not import Supabase SDKs or UI components.

### 3.4 Infrastructure Layer

Responsibilities:

- Supabase persistence,
- storage,
- external AI provider,
- future ingestion providers,
- network adapters.

Infrastructure implements interfaces required by the application/domain layers.

---

## 4. Module Boundaries

```text
src/
├── app/                  # Next.js routing/pages
├── features/
│   ├── onboarding/
│   ├── feed/
│   ├── explore/
│   ├── plan/
│   ├── alerts/
│   └── publisher/
│
├── domain/
│   ├── campus-item/
│   ├── preferences/
│   ├── recommendation/
│   └── planning/
│
├── application/
│   ├── campus-items/
│   ├── recommendations/
│   ├── planning/
│   └── publishing/
│
├── infrastructure/
│   ├── supabase/
│   ├── ai/
│   └── ingestion/
│
├── shared/
│   ├── types/
│   ├── constants/
│   ├── validation/
│   └── utils/
│
└── tests/
```

The exact folder names may be adapted to the Antigravity-generated project, but the **responsibility boundaries must remain**.

---

## 5. Core Domain Object — CampusItem

The entire product revolves around one normalized information object.

```text
CampusItem
├── id
├── title
├── description
├── category
├── subCategory
├── date
├── startTime
├── endTime
├── venue
├── organizer
├── registrationUrl
├── deadline
├── audience
├── importance
├── tags
├── source
├── status
├── imageUrl
├── createdAt
└── updatedAt
```

### Why one domain object?

It prevents separate logic trees for:

- hackathons,
- sports,
- cultural events,
- career sessions,
- psychology sessions,
- exams,
- results,
- campus notices.

The UI may present them differently, but the core pipeline remains shared.

---

## 6. Data Flow — Student

```text
Student
  ↓
Select interests
  ↓
Save Preferences
  ↓
Request Feed
  ↓
Retrieve Published CampusItems
  ↓
Critical-item separation
  ↓
Recommendation ranking
  ↓
Feed composition
  ↓
UI
```

---

## 7. Data Flow — Publisher

```text
Publisher
  ↓
Upload poster / text
  ↓
Extraction Adapter
  ↓
Structured Draft CampusItem
  ↓
Validation
  ↓
Human Review
  ↓
Publish
  ↓
Supabase
  ↓
Feed eligibility
```

AI must not directly publish unreviewed information.

---

## 8. Ingestion Architecture

The MVP should expose the concept of an ingestion adapter without implementing every source.

```text
IContentSource
     │
     ├── ManualPublisherSource
     ├── PosterExtractionSource
     └── Future:
          ├── EmailSource
          ├── WebsiteSource
          ├── ERPSource
          └── ApprovedSocialSource
```

Adding a source should create a new adapter rather than change the CampusItem domain model.

---

## 9. Intelligence Architecture

### Recommendation

```text
RecommendationEngine
      ↓
interestMatch
      + timeRelevance
      + urgency
      + popularity
      + discovery
      ↓
RecommendationResult
```

### Extraction

```text
IContentExtractor
      ↓
ExternalAIExtractor OR MockExtractor
      ↓
CampusItemDraft
```

This allows AI providers to be changed without changing publisher logic.

---

## 10. Security Boundary

Client-side application must never contain:

- Supabase service-role secret,
- privileged publisher credentials,
- private AI provider keys.

Any privileged operation must run through a trusted server boundary.

The frontend is untrusted input.

---

## 11. State Strategy

Keep the MVP state model simple.

### Server state

- campus items
- preferences
- plans
- publisher data

### Local UI state

- selected categories before save
- filters
- modal visibility
- loading states
- temporary extraction edits

Do not introduce a heavy global state library unless the generated application genuinely needs it.

---

## 12. Failure Strategy

### AI provider unavailable

Use manual entry or deterministic mock extraction for the demo.

### Recommendation engine unavailable

Sort by deterministic fallback:

```text
critical/important → soonest deadline → category match → date
```

### Supabase unavailable

Display a useful error state. Do not silently show stale or fabricated data.

### Missing fields from source

Keep fields nullable and request publisher review.

---

## 13. Scalability Direction

The MVP is not distributed, but its boundaries support future scaling.

Potential future extraction:

```text
Ingestion Service
Recommendation Service
Notification Service
Analytics Service
```

Do not build these as separate services during the hackathon.

---

## 14. Architecture Decision Records — MVP

### ADR-001 — Modular Monolith

**Decision:** Use a modular monolith.

**Reason:** Fast development, low operational complexity, easy Vercel deployment, while preserving internal boundaries.

### ADR-002 — Supabase

**Decision:** Use Supabase PostgreSQL and managed services.

**Reason:** Fast schema iteration, authentication/storage options, and minimal infrastructure work.

### ADR-003 — Next.js PWA

**Decision:** Use Next.js for the student-facing PWA.

**Reason:** Fast React development, route organization, deployability on Vercel, responsive web experience.

### ADR-004 — One CampusItem Model

**Decision:** Normalize all supported campus content into one domain model.

**Reason:** New categories should not require new backend architectures.

### ADR-005 — Human Review After AI Extraction

**Decision:** AI may propose data but may not publish directly.

**Reason:** Campus information can be wrong or ambiguous. Human review provides a reliability boundary.

### ADR-006 — Explainable Ranking

**Decision:** Start with deterministic weighted ranking rather than trained ML.

**Reason:** Four-hour scope, testability, debuggability, and transparency.

---

## 15. Architecture Definition of Done

The architecture is considered correctly implemented when:

- UI does not directly own domain logic.
- Domain logic does not import infrastructure SDKs.
- AI provider code is replaceable.
- Data access is isolated.
- Adding a new category does not require cross-cutting rewrites.
- The core student flow works without direct database manipulation.
