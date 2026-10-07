# Contributing to CampusPilot

Welcome to the **CampusPilot** development workflow. This document outlines the engineering conventions, branch strategies, commit standards, and pull request rules for the hackathon.

---

## 🌳 Git Branch Strategy

Direct commits to `main` are restricted. All development must occur on dedicated feature branches mapped to individual ownership tracks.

### Branch Structure

```text
main
 │
 ├── feat/angel/*      # Product, Content, UX/UI Specifications & Demo
 ├── feat/nidhi/*      # Frontend, PWA, Navigation, Student Views
 ├── feat/jayant/*     # Backend, Supabase Persistence, Publisher Flow
 └── feat/prabhav/*    # AI Extraction, Recommendation Engine, Plan Logic
```

### Examples
- `feat/nidhi/onboarding-chips`
- `feat/jayant/supabase-schema-migration`
- `feat/prabhav/recommendation-scoring-heuristic`
- `fix/nidhi/empty-feed-state`
- `chore/phase-0/bootstrap`

---

## 📝 Commit Conventions

We follow the Conventional Commits specification.

### Format
```text
<type>(<scope>): <short description>
```

### Types
- `feat`: A new user-facing feature or domain capability
- `fix`: A bug fix
- `chore`: Tooling, build config, dependency, or documentation updates
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or modifying tests

### Examples
- `feat(nidhi): implement interest onboarding selection chips`
- `feat(jayant): add campus item persistence repository`
- `feat(prabhav): implement time conflict detection logic`
- `fix(nidhi): handle zero match fallback in personalized feed`
- `chore(phase-0): bootstrap CampusPilot codebase`

---

## 🤝 Pull Request (PR) Expectations

When opening a Pull Request:
1. Target branch must be `main`.
2. Provide a concise summary following this template:

```markdown
## Summary of Changes
- What changed?
- Why was this change made?

## Testing & Verification
- [ ] Unit tests pass (`npm run test`)
- [ ] Typecheck passes (`npm run typecheck`)
- [ ] Lint passes (`npm run lint`)
- [ ] Manual test description

## Ownership & Scope Boundary
- Verified that business logic remains decoupled from UI components.
- Verified that external/AI inputs are validated via Zod.
```

3. Obtain at least one review approval from the team lead (Angel) or cross-track peer before merging.

---

## 🛡️ Engineering Boundaries & Architectural Rules

1. **Layered Boundaries**: Presentation (`components/`, `app/`) must NOT contain raw database queries, SQL, recommendation formulas, or AI prompt strings.
2. **Pure Domain**: Modules in `src/domain/` must remain pure TypeScript (no React/Next.js/Supabase imports).
3. **AI Safety**: Raw AI extraction output is untrusted and MUST pass Zod validation and human review before publishing.
4. **No Secrets**: Never commit API keys or service role secrets. Use `.env.local` locally.
