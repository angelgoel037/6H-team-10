# CampusPilot — Phase 2 Integration Contract Specification

**Document Status:** Phase 2 Final Baseline  
**Author / Owner:** Angel (Team Lead & Product Owner)  
**Target Audience:** Nidhi (Frontend), Jayant (Backend / Supabase), Prabhav (AI / Recommendation / Planning)  

---

> ### ⚠️ Precedence Notice
> **Existing contracts take precedence over this document.**
> The TypeScript definitions and Zod schemas located in [`src/domain/`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/campus-item/types.ts), [`src/application/`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/application/campus-items/index.ts), and [`shared/contracts/`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/shared/contracts/index.ts) constitute the canonical technical interfaces. This document clarifies the conceptual inputs, outputs, invariants, and failure behaviors required for seamless parallel integration across all four engineering tracks.

---

## 1. Track Integration Matrix

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        ANGEL (Product & UX)                            │
│           Defines Taxonomy, Copy, Card Schemas & User Journeys         │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
                   ▼                                 ▼
┌──────────────────────────────────────┐ ┌───────────────────────────────┐
│         NIDHI (Frontend)             │ │      JAYANT (Backend)         │
│  - Onboarding UI                     │ │  - Supabase Schema & Storage  │
│  - 4-Section Home Feed UI            │ │  - CampusItem CRUD API / RPC  │
│  - Explore & Filter Controls         │ │  - Preferences Persistence    │
│  - My Plan Timeline & Conflict UI    │ │  - Publisher Portal Flow      │
└──────────────────▲───────────────────┘ └───────────────┬───────────────┘
                   │                                     │
                   └──────────────────┬──────────────────┘
                                      │
                                      ▼
                   ┌─────────────────────────────────────┐
                   │       PRABHAV (Intelligence)        │
                   │  - Multi-Factor Recommendation     │
                   │  - Explainable Match Reason String │
                   │  - Time-Conflict Detection Logic    │
                   │  - AI Poster Draft Extraction       │
                   └─────────────────────────────────────┘
```

---

## 2. Interface Contracts & Expectations

### Contract A: `CampusItem` Data Flow
**Owner / Producer:** Jayant (Backend / Supabase)  
**Consumers:** Nidhi (Presentation Layer), Prabhav (Ranking Engine)  
**Canonical Type:** `CampusItem` in [`src/domain/campus-item/types.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/campus-item/types.ts)

#### Conceptual Input / Output
- **Input Filter:** `CampusItemFilter { category?, categories?, status?, importance?, audience?, searchQuery? }`
- **Output:** `CampusItem[]` (normalized, validated array).

#### Expected Field Guarantees
1. `category`: Strictly one of the 8 canonical values (`technical`, `cultural`, `sports`, `social`, `career`, `wellness`, `learning_research`, `important_campus`).
2. `importance`: `'normal' | 'high' | 'critical'`.
3. `date`: Always valid `YYYY-MM-DD` ISO date string.
4. `startTime` / `endTime`: `HH:mm` 24-hour format or `null` (never empty string `""` or invalid string).
5. `registrationUrl`: Absolute URL starting with `http://` or `https://`, or `null`.
6. `imageUrl`: Publicly resolvable HTTPS image URL or `null`.

---

### Contract B: `StudentPreferences` Data Flow
**Owner / Producer:** Nidhi (Frontend Onboarding / Profile) & Jayant (Supabase Persistence)  
**Consumer:** Prabhav (Recommendation Engine)  
**Canonical Type:** `StudentPreferences` in [`src/domain/preferences/index.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/preferences/index.ts)

#### Structure
```typescript
interface StudentPreferences {
  userId: string;
  selectedCategories: CampusCategory[];
  isOnboardingCompleted: boolean;
  updatedAt: string;
}
```

#### Behavioral Invariants
- `selectedCategories` contains 0 to 7 optional categories (excluding `important_campus`).
- If `selectedCategories.length === 0`, the recommendation engine MUST NOT crash or return an empty array. It must fall back to chronological / trending campus items.

---

### Contract C: `RecommendationResult` Data Flow
**Owner / Producer:** Prabhav (Recommendation Engine)  
**Consumer:** Nidhi (Home Screen `For You` Feed)  
**Canonical Type:** `RecommendationResult` in [`src/domain/recommendation/index.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/recommendation/index.ts)

#### Structure
```typescript
interface RecommendationResult {
  item: CampusItem;
  score: number;        // Integer 0 to 100
  reasons: string[];    // Array of human-readable explanation strings
  urgency: 'normal' | 'soon' | 'urgent';
}
```

#### Behavioral Invariants
1. `score`: Normalized to range `0..100`.
2. `reasons`: MUST contain at least one user-facing string explaining the match (e.g., `["Matches your Technical interest", "Happens today", "Registration closes tonight"]`).
3. **No black-box scores:** Never return `score` without corresponding `reasons`.
4. **Fallback:** If AI/ranking engine fails, return items sorted by `(date, urgency)` with default reason `["Upcoming campus event"]`.

---

### Contract D: `PlanItem` Data Flow
**Owner / Producer:** Nidhi (User interaction) & Jayant (Persistence)  
**Consumer:** Nidhi (My Plan Screen) & Prabhav (Conflict Detection)  
**Canonical Type:** `PlanItem` in [`src/domain/planning/index.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/planning/index.ts)

#### Structure
```typescript
interface PlanItem {
  id: string;
  userId: string;
  campusItemId: string;
  item: CampusItem;
  addedAt: string;
}
```

#### Behavioral Invariants
- Uniqueness: A student cannot add duplicate instances of the same `campusItemId` to their plan.
- Immutability: Adding to plan does NOT modify the underlying `CampusItem`.

---

### Contract E: Time Conflict Information
**Owner / Producer:** Prabhav (Planning Intelligence)  
**Consumer:** Nidhi (My Plan Screen Warning Banners)  
**Canonical Type:** `PlanConflict` in [`src/domain/planning/index.ts`](file:///c:/Users/angel/OneDrive/Desktop/Hackathon%20team/src/domain/planning/index.ts)

#### Structure
```typescript
interface PlanConflict {
  itemA: CampusItem;
  itemB: CampusItem;
  reason: string; // e.g. "AI Hackathon and Debate overlap on Oct 19 between 4:00 PM and 5:00 PM"
}
```

#### Conflict Formula Contract (FR-007)
Two items $A$ and $B$ conflict if and only if:
$$\text{itemA.date} == \text{itemB.date} \quad\land\quad \text{itemA.startTime} < \text{itemB.endTime} \quad\land\quad \text{itemB.startTime} < \text{itemA.endTime}$$
- Items without `startTime` or `endTime` do NOT trigger time conflicts.

---

### Contract F: `Important Campus` Information Flow
**Owner / Producer:** Jayant (Backend) / Authorized Publishers  
**Consumers:** Nidhi (Home Screen Section 3 & Alerts Screen)  
**Contract Criteria:**
$$\text{category} == \text{'important_campus'} \quad\lor\quad \text{importance} == \text{'critical'}$$

#### Non-Suppression Invariant
- These items MUST ALWAYS be returned by `GetImportantCampusUpdatesUseCase` and displayed in the `Important Campus` home section and `Alerts` tab, regardless of student interest preferences.

---

## 3. Discrepancy & Evolution Policy

1. If any teammate discovers a missing field in `CampusItem` during Phase 3/4:
   - File an issue / propose a typed addition in `src/domain/campus-item/types.ts`.
   - Maintain optionality (`?` / `null`) for backward compatibility.
2. Under no circumstances should any module bypass the domain layer and directly invoke database or AI vendor SDKs from presentational React components.
