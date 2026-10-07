# Jayant — Backend, Database & Publisher Flow Ownership

## Role & Responsibilities
- **Data Persistence**: Supabase PostgreSQL schema, migrations, and repository adapters.
- **Key Modules**:
  - `src/infrastructure/supabase/` — Supabase client configuration and repository implementations (`SupabaseCampusItemRepository`, etc.)
  - `src/application/campus-items/` — Campus item retrieval and persistence use cases
  - `src/application/publishing/` — Publisher creation, review, and publishing workflows
  - `src/features/publisher/` — Publisher dashboard / portal UI for poster upload and metadata verification
- **Security & Validation**: Server-side input validation with Zod, database policies, role handling.

## Git Working Branch
- Branch prefix: `feat/jayant/*`
- Example: `feat/jayant/supabase-schema`

## Key Interfaces & Collaboration Touchpoints
- **With Angel (Lead)**: Align on data models and campus item categories.
- **With Nidhi (Frontend)**: Provide clean application-layer hooks and data access interfaces.
- **With Prabhav (AI/Intel)**: Wire extraction output into publisher draft review flow before persistence.
