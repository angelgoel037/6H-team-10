# CampusPilot — Phase 0 Documentation Hub

This directory contains the foundational specifications, requirements, architecture, design system, and engineering standards for **CampusPilot**. These documents represent the agreed single source of truth for all four engineering tracks.

---

## Specification Documents

| Document | Purpose & Role | Primary Focus |
|---|---|---|
| [`00-README.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/00-README.md) | **Overview & Source of Truth** | Reading guide, priority rules for document conflicts, and core user journey summary. |
| [`01-PRD.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/01-PRD.md) | **Product Requirements Document** | What and Why: problem statement, target users, category taxonomy, MVP scope, non-goals, and success criteria. |
| [`02-SRD.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/02-SRD.md) | **Software Requirements Document** | Behavior and Acceptance: functional & non-functional requirements, data flows, contracts, and error handling. |
| [`03-ARCHITECTURE.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/03-ARCHITECTURE.md) | **Software Architecture Document** | System structure: modular monolith, layer boundaries, dependency direction, `CampusItem` domain model, and ADRs. |
| [`04-UX-UI-DESIGN.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/04-UX-UI-DESIGN.md) | **UX / UI Design Specification** | Experience and Design: design personality, screens (Onboarding, Home, Explore, Plan, Alerts, Publisher), and accessibility. |
| [`05-ENGINEERING-STANDARDS.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/05-ENGINEERING-STANDARDS.md) | **Engineering Standards & Git Rules** | Code quality: SOLID principles applied pragmatically, AI safety rules, branch/commit conventions, and testing expectations. |

---

## Conflict Resolution Hierarchy

When questions or ambiguities arise during implementation:

1. **PRD** decides *what and why*.
2. **SRD** decides *behavior, contracts, and acceptance*.
3. **Architecture** decides *where and how responsibilities are separated*.
4. **UX/UI** decides *how students and publishers experience the interface*.
5. **Engineering Standards** decide *how code is written, validated, and integrated*.

If two documents appear to conflict, stop and align with team lead (Angel) before committing code.
