# Angel — Product Lead, Content & UX/UI Ownership

## Role & Track Overview
- **Team Lead:** Project vision, MVP scope defense, demo flow, team coordination.
- **Product & Content:** Canonical category taxonomy, priority levels, realistic campus datasets, student personas.
- **UX/UI Design:** Screen-by-screen specifications, microcopy guidelines, component contracts.

---

## Phase 1 Deliverables Summary (Completed)

| Deliverable | Location | Description |
|---|---|---|
| **Canonical Content Taxonomy** | [`team/angel/content-taxonomy.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/content-taxonomy.md) | 8 primary categories, subcategories, canonical tags, and examples. |
| **Product & Hierarchy Spec** | [`team/angel/phase-1-product.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/phase-1-product.md) | Product positioning, non-goals, priority levels (CRITICAL/HIGH/NORMAL/DISCOVERY), and 4-section Home IA. |
| **Realistic Campus Dataset** | [`shared/sample-data/campus-items.sample.json`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/shared/sample-data/campus-items.sample.json) | 40 production-ready CampusItems spanning all 8 categories. |
| **Student Persona Profiles** | [`shared/sample-data/student-personas.sample.json`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/shared/sample-data/student-personas.sample.json) | 4 multi-disciplinary student personas with interest profiles and sample plan item IDs. |
| **Canonical UX Copy Guide** | [`team/angel/ux-copy.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/ux-copy.md) | Standardized copy for onboarding, headings, card CTAs, empty states, and match explanations. |
| **Judge Demo Scenarios** | [`team/angel/demo-scenarios.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/demo-scenarios.md) | 3 complete live demo flows (Personalized feed, Critical notice override, Serendipitous plan conflict). |
| **Frontend Content Specification** | [`docs/phase-1/PRODUCT-CONTENT-SPEC.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-1/PRODUCT-CONTENT-SPEC.md) | Concrete implementation contract for Nidhi covering all screens, tokens, and state rules. |

---

## Canonical 8 Categories (Unified Contract)

1. `technical` — 💻 Technical & Coding (Hackathons, AI/ML, robotics, coding contests)
2. `cultural` — 🎭 Cultural & Arts (Music, dance, drama/theatre, fine arts, debate)
3. `sports` — 🏆 Sports & Esports (Cricket, football, basketball, esports, athletics)
4. `social` — 🎉 Social & Campus Life (Fests, freshers, farewell, parties, social meetups)
5. `career` — 💼 Career & Internships (Placements, internships, resume clinics, company sessions)
6. `wellness` — 🧠 Wellness & Psychology (Mental health, stress relief, yoga, health camps)
7. `learning_research` — 🔬 Learning & Research (Guest lectures, seminars, research symposiums)
8. `important_campus` — 📢 Important Campus (MST/exam datesheets, results, official circulars)

---

## Team Handoff & Track Instructions

### 🎨 For Nidhi (Frontend & PWA)
- Review [`docs/phase-1/PRODUCT-CONTENT-SPEC.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/docs/phase-1/PRODUCT-CONTENT-SPEC.md) before building screens.
- Ensure the Home screen follows the strict 4-section vertical order:
  1. `🔥 Don't Miss` (1–3 urgent cards)
  2. `✨ For You` (Ranked recommendation cards with match % badge)
  3. `📢 Important Campus` (Official circulars with red/amber badges)
  4. `🧭 Explore Something New` (Curated discovery cards)
- Use copy strictly from [`team/angel/ux-copy.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/ux-copy.md) for buttons, empty states, and banners.
- Remember: `important_campus` items must NEVER disappear from the user's view.

### 💾 For Jayant (Backend & Supabase)
- Use [`shared/sample-data/campus-items.sample.json`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/shared/sample-data/campus-items.sample.json) (40 items) to seed the initial Supabase database table `campus_items`.
- Ensure the `category` column enum/check constraint accepts the 8 canonical category keys.
- Ensure the query for `GET /campus-items/important` or `findImportant()` filters by `category = 'important_campus'` OR `importance = 'critical'`.

### 🧠 For Prabhav (AI & Intelligence)
- The recommendation engine must implement the 5-factor scoring heuristic documented in [`team/angel/phase-1-product.md`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/team/angel/phase-1-product.md):
  $$\text{Score} = 40\% \text{ Interest} + 25\% \text{ Time} + 15\% \text{ Urgency} + 10\% \text{ Popularity} + 10\% \text{ Discovery}$$
- Ensure the recommendation output contract includes readable match explanation strings (e.g., *"Matches your Technical interest, happens today, registration closes tonight"*).
- For AI extraction, map poster text strictly into one of the 8 canonical category keys with confidence fallbacks.

---

## Unresolved Product Questions
*None at this time. All categories, priorities, dataset distributions, and screen contracts are finalized for Phase 1.*
