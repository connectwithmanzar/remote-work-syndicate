# Codex Prompt 05 — Build Guides and Comparisons

Build guide pages and comparison pages.

Read:

- `/docs/02-prd.md` sections 10.6 and 10.7
- `/docs/03-architecture.md`
- `/docs/06-ui.md`
- `/docs/07-seo.md`

## Routes

```text
/guides
/guides/[slug]
/compare
/compare/[slug]
```

## Guide Pages

Build:

- GuideCard
- GuideList
- Guide detail page
- TableOfContents
- Related platforms
- Related jobs
- Newsletter CTA
- Quiz CTA

Guide detail page should include:

- title
- excerpt
- author/date
- last updated
- table of contents
- article content
- callout boxes
- internal links

## Comparison Pages

Build:

- comparison directory
- comparison detail page
- ComparisonTable
- ComparisonVerdict
- Choose A if / Choose B if cards
- Pros/cons grid
- Quiz CTA

## Comparison Detail Sections

1. Summary verdict
2. Side-by-side platform cards
3. Comparison table
4. Choose Platform A if
5. Choose Platform B if
6. Pay comparison
7. Difficulty comparison
8. Country availability
9. Related jobs
10. Quiz CTA

## SEO

Add metadata for both guide and comparison pages.

Add Article schema where appropriate.

## Acceptance Criteria

- `/guides` works.
- `/guides/[slug]` works.
- `/compare` works.
- `/compare/[slug]` works.
- Pages are readable and premium.
- Comparison pages help users decide.
- Quiz CTA is prominent.
