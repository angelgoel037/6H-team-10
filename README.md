# CampusPilot 🧭

> **One campus. Thousands of experiences. One personalized feed.**

CampusPilot is a **personalized campus discovery and planning PWA**. It aggregates fragmented campus life information—technical events, hackathons, cultural festivals, music nights, sports tournaments, career workshops, wellness sessions, and critical academic notices—into a single, tailored stream for college students.

---

## 🎯 Product Purpose & Context

Campus information is notoriously fragmented across society posters, WhatsApp groups, Instagram stories, department bulletin boards, and emails. CampusPilot provides:

1. **`FOR YOU` Channel**: Personalized rankings based on the student's selected interests (Technical, Cultural, Sports, Career, Wellness, Social).
2. **`IMPORTANT CAMPUS` Channel**: Institutionally critical notices (such as MST/exam schedules, results, and major campus closures) that remain visible regardless of selected interests.
3. **`EXPLORE`**: Intentional discovery across the entire campus ecosystem.
4. **`MY PLAN`**: A date-aware personal schedule with automated time-conflict detection.
5. **`PUBLISHER FLOW`**: Utilitarian ingestion with AI-assisted poster/text extraction paired with mandatory human review before publishing.

> **What CampusPilot is NOT**: Not a college ERP, not an attendance tracker, and not an assignment/fee portal. It is a modern discovery and planning layer over campus life.

---

## 🏛️ Architecture Summary

CampusPilot uses a **Modular Monolith** architecture with strict layer boundaries:

```text
Presentation Layer (Next.js App Router, React Components, Tailwind CSS)
    ↓
Application Layer (Use Cases: Campus Items, Ranking Orchestration, Plan Manager, Publishing)
    ↓
Domain Layer (Pure TypeScript: CampusItem, Preferences, Contracts, Conflict Rules)
    ↑
Infrastructure Adapters (Supabase PostgreSQL/Auth, Provider-Agnostic AI Extractors)
```

### Architectural Principles
- **No UI-to-Database coupling**: Presentation layer calls application use cases or repository hooks.
- **Pure Domain**: Domain modules have zero dependencies on React, Next.js, or vendor SDKs.
- **Provider-Agnostic AI**: AI extraction lives behind `IAIExtractorProvider` and supports offline mocks.
- **Pragmatic SOLID**: Clear single responsibilities, open/closed sources, and narrow interfaces.

---

## 👥 Team Ownership & Collaboration Tracks

| Team Member | Track & Primary Responsibilities | Git Branch Pattern |
|---|---|---|
| **Angel** *(Lead)* | Product Scope, Content Curation, UX/UI Specifications, Demo Flow | `feat/angel/*` |
| **Nidhi** | Frontend & PWA Development (`src/features/{onboarding,feed,explore,plan,alerts}`) | `feat/nidhi/*` |
| **Jayant** | Backend, Supabase Persistence, Schema, and Publisher Data Flow | `feat/jayant/*` |
| **Prabhav** | AI Extraction, Multi-factor Recommendation Engine & Conflict Intelligence | `feat/prabhav/*` |

*Note: All team members develop within the single unified codebase following the layered architecture.*

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `>= 18.x` (v20+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/angelgoel037/6H-team-10.git
cd 6H-team-10

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📋 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run typecheck` | Validates strict TypeScript compilation without emit |
| `npm run test` | Runs unit tests with Vitest |
| `npm run test:watch` | Runs Vitest in interactive watch mode |

---

## ⚙️ Environment Variables

Defined in `.env.example`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
AI_PROVIDER=mock # options: mock, openai, gemini, anthropic
AI_API_KEY=your-api-key-here
```

---

## 📚 Documentation & Specifications

Detailed Phase 0 specification documents are located in [`docs/phase-0/`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/README.md):

- [`01-PRD.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/01-PRD.md) — Product requirements, taxonomy, and success criteria.
- [`02-SRD.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/02-SRD.md) — Functional and non-functional specifications.
- [`03-ARCHITECTURE.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/03-ARCHITECTURE.md) — Layered architecture, data flows, and ADRs.
- [`04-UX-UI-DESIGN.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/04-UX-UI-DESIGN.md) — Screen-by-screen UX specifications.
- [`05-ENGINEERING-STANDARDS.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-0/05-ENGINEERING-STANDARDS.md) — SOLID policy, AI reliability rules, and Git standards.

---

## 🏁 Phase 0 Completion Status

- [x] Repository initialized and Git remote verified
- [x] Specification documents relocated to `docs/phase-0/`
- [x] Modular directory structure and layered architecture configured
- [x] Normalized `CampusItem` domain types and Zod validation schemas established
- [x] Provider-agnostic AI extraction contracts and mock fallback implemented
- [x] Vitest unit testing suite configured and passing
- [x] TypeScript strict typechecking and Next.js production build verified
- [x] Team ownership documentation and branch conventions created
