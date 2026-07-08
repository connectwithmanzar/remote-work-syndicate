# Codex Prompt 07 — Build Forms and API Routes

Build the public form/API endpoints for newsletter, quiz, outcome reports, and apply-click tracking.

Read:

- `/docs/05-api.md`
- `/docs/04-database.md`
- `/docs/03-architecture.md`

## API Routes

Build:

```text
POST /api/newsletter
POST /api/quiz
POST /api/outcome-report
POST /api/track-apply-click
```

## Validation

Use zod schemas in:

```text
/lib/validation/newsletter.ts
/lib/validation/quiz.ts
/lib/validation/outcome-report.ts
/lib/validation/apply-click.ts
```

## Response Format

Use standard success/error response shape from `/docs/05-api.md`.

## Newsletter

- validate email
- handle duplicates gracefully
- store/mimic storage
- return success message

## Quiz

- validate quiz input
- score recommendations
- store/mimic submission
- optionally subscribe user if consent is true

## Outcome Report

- validate report
- default verification level to anonymous
- never publish raw report
- return pending review message

## Apply Click Tracking

- validate destination URL
- record/mimic event
- return clickId and destinationUrl

## Security

- Do not expose service role key.
- Do not expose private/internal fields.
- Do not require auth.
- Sanitize long text fields where needed.

## Acceptance Criteria

- All endpoints compile.
- Invalid requests return validation errors.
- Valid requests return expected shapes.
- UI forms can call the endpoints.
- No private data is publicly exposed.
