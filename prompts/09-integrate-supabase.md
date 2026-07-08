# Codex Prompt 09 — Integrate Supabase

Integrate Supabase without changing the product scope.

Read:

- `/docs/04-database.md`
- `/docs/03-architecture.md`
- `/docs/05-api.md`

## Goal

Move from placeholder data toward Supabase-backed data while keeping the app working.

## Build

Create:

```text
/lib/supabase/client.ts
/lib/supabase/server.ts
/lib/supabase/types.ts
```

Use environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Rules

- Never expose service role key to client.
- Public reads should only fetch active/published records.
- Public writes allowed only for newsletter, quiz submissions, community reports, and application clicks.
- No mandatory authentication in V1.

## Data Access

Update `/lib/data/*` functions to allow Supabase-backed reads.

Keep fallback seed data if Supabase env vars are missing.

## Acceptance Criteria

- App works with seed data when Supabase is not configured.
- App works with Supabase when env vars are configured.
- Public pages do not expose private fields.
- API routes can write to Supabase safely.
