# Prabhav — AI Extraction, Recommendation & Planning Intelligence Ownership

## Role & Responsibilities
- **Recommendation Engine**: Multi-factor scoring heuristic (Interest Match, Time Relevance, Urgency, Popularity, Discovery).
- **Key Modules**:
  - `src/domain/recommendation/` — Ranking contracts, score calculation, explainable reason generator
  - `src/domain/planning/` — Time conflict detection logic (`A.start < B.end && B.start < A.end`)
  - `src/application/recommendations/` — Feed ranking orchestration & deterministic fallbacks
  - `src/infrastructure/ai/` — Provider-agnostic AI adapters (`IContentExtractor`, Mock & External implementations)
- **AI Safety & Reliability**: Guard against hallucinated dates/venues; fallback gracefully when AI is offline.

## Git Working Branch
- Branch prefix: `feat/prabhav/*`
- Example: `feat/prabhav/recommendation-engine`

## Key Interfaces & Collaboration Touchpoints
- **With Angel (Lead)**: Align heuristic weights with product discovery goals.
- **With Nidhi (Frontend)**: Contract for recommendation output (`RecommendationResult` with score and reasons).
- **With Jayant (Backend)**: Extraction contract for publisher poster ingestion.
