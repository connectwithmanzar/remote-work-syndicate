# Remote Work Syndicate — Codex Prompt Library v1.0



---

# 01-scaffold-app.md

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



---

# 02-build-homepage.md

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



---

# 03-build-platform-pages.md

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



---

# 04-build-jobs.md

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



---

# 05-build-guides-and-comparisons.md

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



---

# 06-build-platform-match-quiz.md

# Codex Prompt 06 — Build Platform Match Quiz

Build the Platform Match Quiz.

Read:

- `/docs/02-prd.md` section 10.8 and 17
- `/docs/03-architecture.md` section 10
- `/docs/05-api.md` section 5.2
- `/docs/06-ui.md` section 14

## Routes

```text
/quiz
/quiz/results
```

You may render results inline or use `/quiz/results`, but keep routing clean.

## Build Components

- QuizForm
- QuizStep
- QuizProgress
- QuizResults
- PlatformMatchCard
- MatchScoreRing
- EmailResultsCTA

## Questions

Include:

1. Country
2. Primary skill category
3. Years of experience
4. English level
5. Coding ability
6. Domain expertise
7. Preferred work type
8. Available hours per week
9. Desired pay range
10. Platforms already applied to
11. Current application outcomes

## UX

- Multi-step form
- Card-based choices where possible
- Progress indicator
- Back button
- Mobile-first
- No login required
- Optional email only at result page

## Scoring

Implement rules-based scoring in:

```text
/lib/quiz/scoring.ts
```

Use factors:

- country eligibility
- skill match
- experience level
- English level
- coding ability
- availability
- desired pay

Do not use referral payout as the primary ranking factor.

Do not top-rank platforms known to be ineligible for the user.

## Results

Show top 3–5 platforms with:

- platform name
- match percentage
- reasons
- warnings
- suggested roles
- apply link
- related guides

## Acceptance Criteria

- Quiz can be completed anonymously.
- Results feel useful and premium.
- Match reasons are clear.
- No fake guarantees.
- No mandatory signup.
- Email capture is optional.



---

# 07-build-forms-and-api.md

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



---

# 08-build-seo-foundation.md

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



---

# 09-integrate-supabase.md

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



---

# 10-polish-and-launch-checklist.md

# Codex Prompt 10 — Polish and Launch Checklist

Prepare the app for public launch.

Read:

- `/docs/08-launch-plan.md`
- `/docs/06-ui.md`
- `/docs/07-seo.md`
- `/docs/09-backlog.md`

## Goal

Polish the MVP for launch on `remoteworksyndicate.com`.

## Check

### UX

- Homepage is clear in under 10 seconds.
- Mobile nav works.
- Quiz works on mobile.
- Job filters work.
- Platform pages look premium.
- Apply buttons work.
- Newsletter form works.
- Outcome CTA works.

### Trust

- Referral disclosure visible.
- Last verified dates visible.
- No fake income claims.
- No fake community stats.
- Expired jobs not shown as active.
- Privacy/terms/contact pages exist.

### SEO

- Sitemap works.
- Robots works.
- Metadata exists.
- Canonical URLs use production domain.
- Open Graph previews work.
- JSON-LD valid.

### Performance

- Avoid excessive client JS.
- Optimize images.
- Use server components where possible.
- Avoid heavy animations.

## Acceptance Criteria

- Production build passes.
- No TypeScript errors.
- No critical console errors.
- Site is ready to deploy to Vercel.

