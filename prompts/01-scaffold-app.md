# Codex Prompt 01 — Scaffold the App

You are building Remote Work Syndicate.

Read and follow these docs before coding:

- `/docs/01-business.md`
- `/docs/02-prd.md`
- `/docs/03-architecture.md`
- `/docs/06-ui.md`
- `/docs/09-backlog.md`

## Goal

Create the initial Next.js App Router scaffold for Remote Work Syndicate.

## Tech Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- zod
- react-hook-form
- @hookform/resolvers

## Build

Create:

- app layout
- homepage route placeholder
- global styles
- header
- footer
- mobile nav
- container component
- section component
- base design tokens
- placeholder seed data file
- reusable data access structure

## Required folder structure

Follow `/docs/03-architecture.md`.

Create at minimum:

```text
app/
components/
components/layout/
components/home/
components/jobs/
components/platforms/
components/guides/
components/compare/
components/quiz/
components/forms/
components/seo/
lib/
lib/data/
lib/quiz/
lib/seo/
lib/analytics/
public/
```

## Design Direction

Follow `/docs/06-ui.md`.

The site should feel premium, modern, dark, trustworthy, and not like a cheap job board.

## Do Not Build

Do not build:

- authentication
- payments
- admin dashboard
- scraping
- user dashboard
- premium features
- employer portal
- recruiter portal

## Acceptance Criteria

- App runs locally.
- TypeScript compiles.
- Tailwind works.
- Header and footer render.
- Homepage route exists.
- Folder structure is clean.
- No mandatory auth exists.
- Design foundation supports premium dark UI.
