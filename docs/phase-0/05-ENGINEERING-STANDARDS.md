# CampusPilot — Engineering Standards, SOLID & Git Workflow

**Document status:** Phase 0 — Baseline
**Version:** 1.0
**Audience:** Angel, Nidhi, Jayant, Prabhav and future contributors

---

## 1. Engineering Objective

CampusPilot is a hackathon product, but the implementation must not become disposable code.

The target is:

> **Fast to build, easy to debug, easy to extend.**

The project shall use clear modular boundaries and apply **SOLID principles where they reduce coupling and improve maintainability**. SOLID should be treated as an engineering tool, not as a requirement to create unnecessary abstractions in a four-hour prototype.

Microsoft's software architecture guidance describes SOLID as five principles—Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion—and emphasizes loose coupling, modularity, and testability. Dependency inversion is commonly supported through dependency injection. [References listed below.]

---

## 2. SOLID Policy for CampusPilot

### S — Single Responsibility Principle

A module/class/function should have one clear reason to change.

**CampusPilot examples:**

Good:

```text
RecommendationEngine
→ calculates relevance.

CampusItemRepository
→ reads/writes CampusItems.

PosterExtractor
→ converts source content into a CampusItemDraft.

FeedComposer
→ assembles For You / Important / Don't Miss sections.
```

Avoid:

```text
CampusManager
→ database + AI + ranking + UI formatting + validation + notifications
```

For this project, SRP applies equally to React components, server functions, domain modules, and utilities.

---

### O — Open/Closed Principle

Core modules should be open to extension without requiring repeated modification of tested logic.

**CampusPilot example:**

Adding a new source:

```text
InstagramApprovedSource
```

should implement the existing source contract rather than modify the CampusItem domain model.

Adding a new category:

```text
Research
```

should primarily require configuration/data changes, not rewrites across the recommendation engine.

---

### L — Liskov Substitution Principle

An implementation of an abstraction must remain safely usable wherever that abstraction is expected.

**CampusPilot example:**

If the application depends on:

```text
ContentExtractor
```

then:

```text
AIContentExtractor
MockContentExtractor
ManualContentExtractor
```

must all return a compatible `CampusItemDraft` contract and predictable error semantics.

Do not create an abstraction whose implementations behave incompatibly.

---

### I — Interface Segregation Principle

Do not create a giant interface that every implementation must implement.

Bad:

```text
CampusService
→ getItems()
→ publish()
→ extractPoster()
→ rank()
→ notify()
→ manageUsers()
→ uploadImage()
```

Prefer narrow contracts:

```text
CampusItemReader
CampusItemWriter
ContentExtractor
RecommendationEngine
PlanManager
```

This is especially important for future integrations.

---

### D — Dependency Inversion Principle

High-level product logic should depend on abstractions rather than concrete infrastructure details.

For example:

```text
RecommendationUseCase
        ↓
RecommendationEngine interface
        ↓
WeightedRecommendationEngine
```

rather than:

```text
RecommendationUseCase
        ↓
Supabase / OpenAI / fetch / SDK directly
```

Infrastructure should implement contracts required by the application.

Microsoft's architecture guidance specifically describes dependency inversion as a way to keep higher-level policy decoupled from implementation details and improve testability and modularity.

---

## 3. Important Caveat — Do Not Over-Engineer

SOLID does **not** mean:

- create an interface for every function,
- create factories for trivial objects,
- create microservices,
- create abstract classes without a real substitution need.

This project has a four-hour constraint.

Use an abstraction when there is a meaningful variation point, such as:

- AI provider,
- content source,
- repository implementation,
- recommendation engine.

Do not add abstraction simply to claim SOLID compliance.

---

## 4. Dependency Direction

Use this conceptual dependency direction:

```text
UI
 ↓
Application / Use Cases
 ↓
Domain
 ↑
Infrastructure adapters
```

Infrastructure implements contracts defined by the higher-level layers.

The domain must not import:

- React,
- Next.js UI modules,
- Supabase SDK,
- AI vendor SDKs.

---

## 5. React / Frontend Standards

### Components

Components should primarily handle:

- presentation,
- local interaction,
- accessibility,
- composition.

Keep database calls and recommendation calculations out of presentational components.

### Hooks

Hooks should have one clear purpose.

Example:

```text
useCampusFeed
usePreferences
usePlan
```

Avoid a single `useCampusEverything()` hook.

### Shared components

Create reusable components only when reuse is real or highly likely during the MVP.

---

## 6. TypeScript Standards

- Prefer strict TypeScript.
- Avoid `any` unless there is a documented reason.
- Define shared types for CampusItem and RecommendationResult.
- Validate external input before converting it to domain types.
- Avoid type assertions as a substitute for validation.

---

## 7. Data Validation

External information is untrusted.

Validate:

- dates,
- URLs,
- category values,
- enum-like status values,
- publisher inputs,
- extracted AI fields.

AI output must be considered **untrusted structured data** until validated.

---

## 8. AI Safety / Reliability Rules

### Rule 1
Never allow raw model output to be rendered as trusted structured data without validation.

### Rule 2
Never let the model silently invent:

- date,
- time,
- venue,
- organizer,
- deadline,
- registration URL.

Unknown values should be `null` / `unknown` and reviewed.

### Rule 3
AI extraction must be followed by human review before publishing.

### Rule 4
The student feed must continue functioning if the AI provider fails.

### Rule 5
Do not expose provider secrets to client-side code.

---

## 9. Git Workflow

### Branch model

```text
main
│
├── feat/angel/*
├── feat/nidhi/*
├── feat/jayant/*
└── feat/prabhav/*
```

Each contributor works primarily in their owned area.

### Commit format

```text
feat(angel): add product specification
feat(nidhi): add onboarding flow
feat(jayant): create campus item schema
feat(prabhav): add recommendation scoring
fix(nidhi): handle empty personalized feed
fix(jayant): validate publisher fields
```

### Pull requests

Every PR should state:

```text
What changed?
Why?
How tested?
Known limitations?
```

---

## 10. Ownership Map

| Owner | Primary module |
|---|---|
| Angel | product/content/UX |
| Nidhi | frontend/PWA |
| Jayant | backend/database/publisher data flow |
| Prabhav | AI/extraction/recommendation/planning intelligence |

Cross-team integration is allowed only through documented interfaces/contracts.

---

## 11. Antigravity Generation Rules

When generating code with Antigravity, every phase prompt should include:

```text
IMPORTANT:
1. Work ONLY on the requested phase.
2. Preserve existing functionality.
3. Do not rewrite unrelated modules.
4. Do not introduce unnecessary dependencies.
5. Follow the existing folder and architecture boundaries.
6. Apply SOLID principles where they meaningfully reduce coupling.
7. Validate external/AI data before use.
8. Keep the app runnable after the change.
9. Report files created and modified.
10. Report dependencies added.
11. Report setup/test commands.
12. Report known limitations.
```

Antigravity output should be treated as generated code that requires review and testing before merging.

---

## 12. Testing Strategy

The hackathon MVP should prioritize tests around the highest-risk business logic rather than achieving arbitrary coverage.

### Must-test logic

1. Interest matching.
2. Recommendation scoring.
3. Important-item override.
4. Deadline/urgency classification.
5. Time conflict detection.
6. CampusItem validation.
7. Extraction output validation.

### Example test

```text
Student interests: [technical, sports]

Item A: hackathon, technical
Item B: music open mic, cultural

Expected:
A ranks above B.
```

### Conflict test

```text
A: 17:00–18:00
B: 17:30–18:30

Expected: conflict = true
```

### Non-conflict test

```text
A: 17:00–18:00
B: 18:00–19:00

Expected: conflict = false
```

---

## 13. Code Review Checklist

Before merging:

- [ ] Does the change belong to this module?
- [ ] Is the responsibility clear?
- [ ] Is business logic outside presentational components?
- [ ] Are external inputs validated?
- [ ] Are AI outputs treated as untrusted?
- [ ] Are secrets protected?
- [ ] Is the dependency direction correct?
- [ ] Could the change be made simpler?
- [ ] Does the application still run?
- [ ] Has the primary flow been tested?

---

## 14. Refactoring Rule

Keep changes small and test after meaningful changes.

Do not mix major refactoring with feature development during the hackathon unless the refactor is necessary to unblock the feature.

A working small module is preferable to a theoretically perfect abstraction that delays the demo.

---

## 15. Sources / Engineering References

- Microsoft Learn — **Architectural principles for .NET**, including Single Responsibility and Dependency Inversion guidance.
- Microsoft Learn — **Designing the microservice application layer and Web API**, including the five SOLID principles and dependency injection discussion.
- Robert C. Martin — the five principles summarized as Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
- Refactoring.Guru — SOLID and refactoring guidance; useful as a practical secondary reference.

These principles should be applied pragmatically. SOLID is a means of controlling coupling and responsibility, not a requirement to maximize abstraction.
