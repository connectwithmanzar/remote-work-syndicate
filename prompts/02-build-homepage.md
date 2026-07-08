# Codex Prompt 02 — Build Homepage

You are building the Remote Work Syndicate homepage.

Read:

- `/docs/02-prd.md`
- `/docs/03-architecture.md`
- `/docs/06-ui.md`
- `/docs/07-seo.md`

## Goal

Build a premium, modern, visually rich homepage that explains the product and drives users to the Platform Match Quiz, job browsing, and newsletter signup.

## Route

```text
/
```

## Required Sections

1. Hero
2. Problem section
3. How it works
4. Featured platforms
5. Platform Match Quiz feature block
6. Latest verified opportunities
7. Popular comparisons
8. Latest guides
9. Hiring insights teaser
10. Newsletter CTA
11. Trust/disclosure section

## Hero Requirements

Headline:

```text
Find the AI work platform that actually fits your profile.
```

Subheadline:

```text
Compare platforms like Mercor, micro1, Outlier, DataAnnotation, and more. Discover verified opportunities, understand the hiring process, and apply with better context.
```

Primary CTA:

```text
Find My Best Platform
```

Secondary CTA:

```text
Browse Verified Jobs
```

Trust line:

```text
Independent platform intelligence. Verified opportunities. No fake job guarantees.
```

## Visual Direction

Create a premium hero visual with:

- dark gradient background
- subtle grid
- floating platform match cards
- example match scores
- verified badges
- no fake community stats

Use tasteful motion if framer-motion is already installed. Respect reduced motion.

## Data

Use placeholder seed data from `/lib/data/seed.ts`.

Do not invent fake statistics. If needed, label early data as “Coming soon” or “Early sample.”

## Acceptance Criteria

- Homepage is understandable in under 10 seconds.
- Looks premium and modern on desktop and mobile.
- Primary CTA links to `/quiz`.
- Secondary CTA links to `/jobs`.
- Featured platforms link to platform pages.
- Latest jobs link to job pages.
- Newsletter form is visible.
- Referral/trust disclosure is visible.
