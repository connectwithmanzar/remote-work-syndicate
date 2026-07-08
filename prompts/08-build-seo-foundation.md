# Codex Prompt 08 — Build SEO Foundation

Build the technical SEO foundation.

Read:

- `/docs/07-seo.md`
- `/docs/03-architecture.md`
- `/docs/02-prd.md`

## Build

Create:

```text
/lib/seo/metadata.ts
/lib/seo/schema.ts
app/sitemap.ts
app/robots.ts
components/seo/JsonLd.tsx
components/seo/Breadcrumbs.tsx
```

## Metadata Functions

Implement:

```text
generatePlatformMetadata(platform)
generateJobMetadata(job)
generateGuideMetadata(guide)
generateComparisonMetadata(comparison)
generateCategoryMetadata(category)
generateCountryMetadata(country)
```

## Structured Data

Support:

- Organization
- WebSite
- BreadcrumbList
- Article
- JobPosting, only when data is safe
- FAQPage, if FAQs exist

## Sitemap

Include only:

- homepage
- active platform pages
- active job pages
- published guides
- published comparisons
- category pages
- country pages
- legal pages

Do not include:

- personalized quiz result pages
- admin pages
- expired jobs unless intentionally archived
- thin/tag pages

## Acceptance Criteria

- Sitemap route works.
- Robots route works.
- Metadata is unique per page.
- Breadcrumbs render.
- JSON-LD does not contain fake data.
- SEO follows `/docs/07-seo.md`.
