# CampusPilot — Phase 0 Specification Pack

This folder contains the five baseline documents that should be treated as the source of truth before implementation begins.

## Documents

1. `01-PRD.md` — Product definition, users, scope, features, non-goals, success criteria.
2. `02-SRD.md` — Functional/non-functional requirements, contracts, rules, acceptance criteria.
3. `03-ARCHITECTURE.md` — System architecture, module boundaries, data flows, domain model, ADRs.
4. `04-UX-UI-DESIGN.md` — Screen-by-screen UX/UI behavior and design rules.
5. `05-ENGINEERING-STANDARDS.md` — SOLID policy, coding standards, AI reliability, Git workflow, review rules.

## Source of truth rule

When implementation questions arise:

1. PRD decides **what and why**.
2. SRD decides **behavior and acceptance**.
3. Architecture decides **where/how responsibilities are separated**.
4. UX/UI decides **how the student/publisher experiences it**.
5. Engineering Standards decide **how the code is written and integrated**.

If two documents conflict, stop and resolve the conflict before implementing the affected feature.

## MVP reminder

CampusPilot is a **personalized campus discovery and planning PWA**, not a full ERP.

The core experience is:

```text
Choose interests
      ↓
See what matters to you
      ↓
Never miss critical campus information
      ↓
Save what you care about
      ↓
Build your campus plan
      ↓
Take action
```

## Recommended Phase 0 Git commit

```text
chore(docs): add CampusPilot phase-zero specifications
```
