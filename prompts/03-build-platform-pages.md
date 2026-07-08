# Codex Prompt 03 — Build Platform Pages

Build the platforms directory and platform detail pages.

Read:

- `/docs/02-prd.md` sections 10.4 and 10.5
- `/docs/03-architecture.md`
- `/docs/04-database.md`
- `/docs/06-ui.md`
- `/docs/07-seo.md`

## Routes

```text
/platforms
/platforms/[slug]
```

## Build Components

- PlatformCard
- PlatformList
- PlatformDetailHeader
- PlatformStats
- PlatformJobs
- PlatformProsCons
- PlatformProcessTimeline
- PlatformCommunityInsightsPlaceholder
- OutcomeReportCTA
- ReferralDisclosure

## Platforms Directory Requirements

Show cards with:

- platform name
- logo placeholder
- short description
- best for
- role categories
- pay range
- hiring status
- referral status
- trust score
- last verified
- view details button

Add basic search/filter if simple.

## Platform Detail Requirements

Sections:

1. Overview
2. Quick facts
3. Best for
4. Types of roles
5. Pay range
6. Country eligibility
7. Application process
8. Interview/assessment process
9. Difficulty rating
10. Pros and cons
11. Referral availability
12. Current jobs
13. Related comparisons
14. Related guides
15. Community hiring insights placeholder
16. Submit outcome CTA

## SEO

Add metadata generation for platform pages.

Use title pattern:

```text
[Platform] Review: AI Remote Work Platform, Pay, Jobs & Application Process
```

## Trust Rules

- Show last verified date.
- Show referral disclosure if referral is available.
- Do not show fake community stats.
- Use “Coming soon” for community insights if no reports exist.

## Acceptance Criteria

- `/platforms` works.
- `/platforms/mercor` and other seed slugs work.
- Platform pages are visually rich and trustworthy.
- Related jobs/guides/comparisons display where available.
- Mobile experience is strong.
