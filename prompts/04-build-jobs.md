# Codex Prompt 04 — Build Jobs Pages

Build the jobs directory and job detail pages.

Read:

- `/docs/02-prd.md` sections 10.2 and 10.3
- `/docs/03-architecture.md`
- `/docs/04-database.md`
- `/docs/05-api.md`
- `/docs/06-ui.md`
- `/docs/07-seo.md`

## Routes

```text
/jobs
/jobs/[slug]
```

## Build Components

- JobCard
- JobFilters
- JobList
- JobDetailHeader
- JobKeyFacts
- ApplyButton
- SimilarJobs
- ReferralDisclosure
- OutcomeReportCTA

## Jobs Directory Requirements

Filters:

- keyword
- platform
- category
- country
- work type
- experience level
- referral available

Sorting:

- featured
- newest
- highest pay
- platform

## Job Card Fields

Show:

- job title
- platform
- category
- pay range
- remote eligibility
- work type
- skill tags
- referral badge
- last verified
- apply button
- details button

## Job Detail Requirements

Sections:

1. Job overview
2. Key facts
3. Pay range
4. Eligibility
5. Required skills
6. Application process
7. Platform context
8. Similar jobs
9. Related guides
10. Apply CTA
11. Outcome CTA

## Apply Button

The ApplyButton should:

- clearly show destination platform
- include disclosure when referral is available
- be structured so `/api/track-apply-click` can be added
- open external apply URL

## SEO

Add metadata for job detail pages.

Use JobPosting schema only if data is safe and sufficiently accurate.

## Acceptance Criteria

- `/jobs` works.
- Job filters work on seed data.
- Job detail pages work.
- Last verified date is visible.
- Referral disclosure is visible.
- Expired jobs are not shown as active.
- Mobile filter UI is usable.
