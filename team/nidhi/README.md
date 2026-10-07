# Nidhi — Frontend & PWA Engineering Ownership

## Role & Responsibilities
- **Student-Facing Application**: Develop the Next.js App Router presentation layer.
- **Key Modules**:
  - `src/features/onboarding/` — Interest onboarding flow and category selection
  - `src/features/feed/` — Personalized Home Feed ("Don't Miss", "For You", "Important Campus")
  - `src/features/explore/` — Campus discovery, category browsing, search/filter
  - `src/features/plan/` — "My Plan" calendar/timeline view
  - `src/features/alerts/` — Urgent notifications & institutional announcements
- **PWA & Responsiveness**: Mobile-first layout, service worker / manifest setup, offline shell.
- **Component Architecture**: Reusable UI components in `components/`, maintaining pure presentational boundaries (no direct DB/AI imports).

## Git Working Branch
- Branch prefix: `feat/nidhi/*`
- Example: `feat/nidhi/onboarding-ui`

## Key Interfaces & Collaboration Touchpoints
- **With Angel (Lead/UX)**: Implement UX flows, match design spec, and integrate design system.
- **With Jayant (Backend)**: Consume repository hooks and application-layer use cases.
- **With Prabhav (AI/Intel)**: Render match scores and explainable recommendation badges.
