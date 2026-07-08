# Remote Work Syndicate — Product Backlog v1.0

Recommended file path:

`/docs/09-backlog.md`

This backlog turns the strategy, PRD, architecture, database, API, UI system, SEO roadmap, and launch plan into concrete implementation work.

The backlog is organized by epics. Each task includes priority, scope, and acceptance criteria.

Priority definitions:

- **P0:** Required for MVP launch.
- **P1:** Strongly recommended for first 30 days.
- **P2:** Useful after launch.
- **P3:** Future.

---

## 1. Current Product Stage

Stage:

```text
Pre-MVP build
```

Primary objective:

```text
Launch a useful, trustworthy, content-led MVP for AI remote work discovery and platform comparison.
```

North Star Metric:

```text
Qualified applications sent through Remote Work Syndicate
```

First product feature:

```text
Platform Match Quiz
```

---

## 2. MVP Epics

### Epic 1: Project Foundation

Goal:

Set up the technical foundation for a modern, SEO-ready Next.js product.

#### Task 1.1 — Create Next.js project

Priority: P0

Scope:

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- `/app` directory
- basic project structure

Acceptance criteria:

- Project runs locally.
- TypeScript compiles.
- Tailwind works.
- App Router routes load.
- No auth, payments, or dashboard added.

---

#### Task 1.2 — Install UI and utility dependencies

Priority: P0

Scope:

- shadcn/ui
- lucide-react
- zod
- react-hook-form
- @hookform/resolvers
- clsx / tailwind-merge
- optional framer-motion

Acceptance criteria:

- UI primitives available.
- Form validation stack installed.
- Motion dependency added only if used tastefully.

---

#### Task 1.3 — Create base folder structure

Priority: P0

Scope:

Create folders:

```text
app/
components/
lib/
docs/
prompts/
public/
```

Acceptance criteria:

- Structure follows `/docs/03-architecture.md`.
- Components are grouped by domain.
- Data access functions live under `/lib/data`.
- Quiz logic lives under `/lib/quiz`.

---

### Epic 2: Design System and Layout

Goal:

Build the premium, modern UI foundation.

#### Task 2.1 — Configure global theme

Priority: P0

Scope:

- Dark premium theme
- Tailwind tokens
- background colors
- text colors
- card surfaces
- borders
- gradients
- focus states

Acceptance criteria:

- Site visually matches `/docs/06-ui.md`.
- Contrast is readable.
- No cheap/generic job-board look.

---

#### Task 2.2 — Build layout components

Priority: P0

Components:

- Header
- Footer
- MobileNav
- Container
- Section
- Breadcrumbs

Acceptance criteria:

- Header works on desktop and mobile.
- Footer includes referral disclosure link, privacy, terms, contact.
- Layout is responsive.

---

#### Task 2.3 — Build reusable UI components

Priority: P0

Components:

- Button
- Card
- Badge
- DataPill
- TrustBadge
- ReferralDisclosure
- NewsletterBlock
- OutcomeReportCTA

Acceptance criteria:

- Components are reusable.
- Styling is consistent.
- Buttons have clear variants.
- Referral disclosure is easy to add anywhere.

---

### Epic 3: Placeholder Data Layer

Goal:

Allow Codex to build the UI before Supabase is connected.

#### Task 3.1 — Create seed data

Priority: P0

File:

```text
/lib/data/seed.ts
```

Include:

- 15 platforms
- 20 jobs
- 10 guides
- 10 comparisons

Acceptance criteria:

- Data matches database schema concepts.
- No fake community statistics.
- Placeholder data is realistic but clearly safe.
- Slugs are present.

---

#### Task 3.2 — Create data access functions

Priority: P0

Files:

```text
/lib/data/platforms.ts
/lib/data/jobs.ts
/lib/data/guides.ts
/lib/data/comparisons.ts
```

Functions:

```text
getPlatforms()
getPlatformBySlug()
getJobs()
getJobBySlug()
getGuides()
getGuideBySlug()
getComparisons()
getComparisonBySlug()
```

Acceptance criteria:

- Pages use data functions, not raw imports everywhere.
- Future Supabase integration can replace internals without rewriting pages.

---

### Epic 4: Homepage

Goal:

Build a premium landing page that explains the product and converts users into quiz starts, job browsing, and newsletter signups.

#### Task 4.1 — Build homepage route

Priority: P0

Route:

```text
/
```

Sections:

- Hero
- Problem section
- How it works
- Featured platforms
- Platform Match Quiz feature block
- Latest verified opportunities
- Popular comparisons
- Latest guides
- Hiring insights teaser
- Newsletter CTA
- Trust/disclosure section

Acceptance criteria:

- Product is understandable within 10 seconds.
- Primary CTA is “Find My Best Platform.”
- Secondary CTA is “Browse Jobs.”
- Mobile layout is excellent.
- Visual storytelling is present.

---

#### Task 4.2 — Add premium homepage visuals

Priority: P1

Scope:

- Floating platform match cards
- Match score mockup
- Subtle grid/gradient background
- Animated but tasteful hero elements

Acceptance criteria:

- Visuals feel modern and premium.
- Motion respects reduced-motion preference.
- No fake statistics.

---

### Epic 5: Platforms

Goal:

Build the platform directory and platform detail pages.

#### Task 5.1 — Build platforms directory

Priority: P0

Route:

```text
/platforms
```

Features:

- Platform cards
- Search/filter basics
- Featured monetization-first platforms
- Trust/inventory platforms

Acceptance criteria:

- All seed platforms display.
- Cards show best for, role categories, pay range, hiring status, referral status, last verified.
- Page links to platform detail pages.

---

#### Task 5.2 — Build platform detail page

Priority: P0

Route:

```text
/platforms/[slug]
```

Sections:

- Overview
- Quick facts
- Best for
- Roles
- Pay
- Country eligibility
- Application process
- Interview process
- Pros/cons
- Referral availability
- Current jobs
- Related comparisons
- Related guides
- Community insights placeholder
- Outcome CTA

Acceptance criteria:

- Page is SEO-friendly.
- Last verified date shown.
- Referral disclosure shown where needed.
- No raw community data displayed.

---

### Epic 6: Jobs

Goal:

Build jobs directory and job detail pages.

#### Task 6.1 — Build jobs directory

Priority: P0

Route:

```text
/jobs
```

Features:

- Job cards
- Filters
- Search
- Sort options

Filters:

- Keyword
- Platform
- Category
- Country
- Work type
- Experience
- Referral available

Acceptance criteria:

- Active jobs display.
- Filters work on seed data.
- Mobile filter experience is usable.
- Empty states are helpful.

---

#### Task 6.2 — Build job detail page

Priority: P0

Route:

```text
/jobs/[slug]
```

Sections:

- Job overview
- Key facts
- Pay
- Eligibility
- Skills
- Application process
- Platform context
- Related guides
- Similar jobs
- Apply CTA
- Outcome CTA

Acceptance criteria:

- Apply button shows destination platform clearly.
- Last verified date shown.
- Referral disclosure shown.
- Availability disclaimer shown.

---

### Epic 7: Guides

Goal:

Build guide directory and guide detail pages.

#### Task 7.1 — Build guides directory

Priority: P0

Route:

```text
/guides
```

Features:

- Guide cards
- Guide type/category filters
- Search

Acceptance criteria:

- Published guides display.
- Cards show title, excerpt, type, last updated.
- Links work.

---

#### Task 7.2 — Build guide detail page

Priority: P0

Route:

```text
/guides/[slug]
```

Features:

- Article layout
- Last updated date
- Table of contents
- Related platform/job cards
- Newsletter CTA
- Quiz CTA

Acceptance criteria:

- Guide is readable.
- Article layout feels premium.
- SEO metadata exists.
- Internal links present.

---

### Epic 8: Comparisons

Goal:

Build comparison directory and comparison detail pages.

#### Task 8.1 — Build compare directory

Priority: P1

Route:

```text
/compare
```

Acceptance criteria:

- Comparison cards display.
- Users can access popular comparisons.
- Links work.

---

#### Task 8.2 — Build comparison detail page

Priority: P0

Route:

```text
/compare/[slug]
```

Sections:

- Summary verdict
- Side-by-side platform cards
- Comparison table
- Choose A if / Choose B if
- Pros/cons
- Related jobs
- Quiz CTA

Acceptance criteria:

- Page helps user decide.
- Quiz CTA is prominent.
- SEO metadata exists.

---

### Epic 9: Platform Match Quiz

Goal:

Build the first product-amplification feature.

#### Task 9.1 — Build quiz UI

Priority: P0

Route:

```text
/quiz
```

Features:

- Multi-step form
- Progress indicator
- Back/next buttons
- Card-based choices
- Mobile-first design

Questions:

- Country
- Skill category
- Experience
- English level
- Coding ability
- Domain expertise
- Preferred work type
- Hours/week
- Desired pay
- Platforms already applied to

Acceptance criteria:

- No login required.
- Form is not overwhelming.
- Validation works.
- User can complete on mobile.

---

#### Task 9.2 — Implement quiz scoring

Priority: P0

File:

```text
/lib/quiz/scoring.ts
```

Acceptance criteria:

- Rules-based scoring works.
- Top 3–5 platforms returned.
- Reasons and warnings generated.
- Referral payout is not primary ranking factor.
- Ineligible platforms are not top-ranked.

---

#### Task 9.3 — Build quiz results

Priority: P0

Features:

- Match cards
- Score ring/bar
- Reasons
- Warnings
- Suggested roles
- Apply links
- Related guides
- Email results CTA

Acceptance criteria:

- Results feel useful and premium.
- User understands why platform is recommended.
- Apply clicks can be tracked later.

---

### Epic 10: Forms and API

Goal:

Capture newsletter signups, reports, quiz submissions, and apply clicks.

#### Task 10.1 — Newsletter API and form

Priority: P0

Endpoint:

```text
POST /api/newsletter
```

Acceptance criteria:

- Email validated.
- Subscriber stored or mocked.
- Duplicate handling works.
- Success/error states shown.

---

#### Task 10.2 — Quiz submission API

Priority: P1

Endpoint:

```text
POST /api/quiz
```

Acceptance criteria:

- Request validated.
- Submission stored or mocked.
- Recommendations returned.
- Optional email handled.

---

#### Task 10.3 — Outcome report API/form

Priority: P1

Endpoint:

```text
POST /api/outcome-report
```

Acceptance criteria:

- Report form works.
- User can submit application outcome.
- Raw reports are not public.
- Success message is clear.

---

#### Task 10.4 — Apply click tracking API

Priority: P0

Endpoint:

```text
POST /api/track-apply-click
```

Acceptance criteria:

- Apply click event is recorded or mocked.
- Destination URL returned.
- User can still reach application page.
- Event supports North Star Metric.

---

### Epic 11: SEO Foundation

Goal:

Make the MVP indexable and technically sound.

#### Task 11.1 — Dynamic metadata

Priority: P0

Scope:

- Homepage
- Platforms
- Jobs
- Guides
- Comparisons

Acceptance criteria:

- Unique title and description per page.
- Canonical URLs included.
- Open Graph metadata included.

---

#### Task 11.2 — Sitemap and robots

Priority: P0

Files:

```text
app/sitemap.ts
app/robots.ts
```

Acceptance criteria:

- Sitemap includes indexable public pages.
- Robots allows public content.
- No admin/personalized pages indexed.

---

#### Task 11.3 — Structured data

Priority: P1

Schemas:

- Organization
- WebSite
- BreadcrumbList
- Article
- JobPosting where appropriate
- FAQPage where appropriate

Acceptance criteria:

- JSON-LD valid.
- No fake job data.
- No fake reviews/statistics.

---

### Epic 12: Legal and Trust Pages

Goal:

Protect brand trust and referral compliance.

#### Task 12.1 — Build legal/trust pages

Priority: P0

Routes:

```text
/about
/contact
/referral-disclosure
/privacy
/terms
```

Acceptance criteria:

- Pages exist.
- Referral disclosure is clear.
- Privacy policy explains data collection.
- Terms include job availability disclaimers.

---

#### Task 12.2 — Add disclosure components

Priority: P0

Scope:

- Job pages
- Platform pages
- Footer
- Apply modules

Acceptance criteria:

- Referral disclosure visible before/near apply CTA.
- Editorial independence statement present.

---

### Epic 13: Analytics

Goal:

Track the events needed to validate the business.

#### Task 13.1 — Define analytics events

Priority: P0

File:

```text
/lib/analytics/events.ts
```

Events:

- page_view
- platform_page_view
- job_page_view
- guide_page_view
- comparison_page_view
- quiz_started
- quiz_completed
- quiz_result_viewed
- newsletter_signup
- apply_click
- referral_click
- outcome_report_submitted
- qualified_application_sent

Acceptance criteria:

- Events are named consistently.
- Apply clicks are tracked even before full analytics provider integration.

---

#### Task 13.2 — Add PostHog or placeholder analytics

Priority: P1

Acceptance criteria:

- Analytics can be swapped in cleanly.
- No client secrets exposed.

---

### Epic 14: Supabase Integration

Goal:

Move from placeholder data to real database-backed content.

#### Task 14.1 — Add Supabase client

Priority: P1

Files:

```text
/lib/supabase/client.ts
/lib/supabase/server.ts
/lib/supabase/types.ts
```

Acceptance criteria:

- Environment variables used.
- No service role key exposed.
- Data functions can call Supabase.

---

#### Task 14.2 — Replace seed reads with Supabase reads

Priority: P2

Acceptance criteria:

- Platforms come from database.
- Jobs come from database.
- Guides come from database or MDX.
- Comparisons come from database.
- Public pages only show active/published records.

---

### Epic 15: Deployment

Goal:

Launch on production domain.

#### Task 15.1 — Deploy to Vercel

Priority: P0

Acceptance criteria:

- Production build passes.
- Site deploys.
- Environment variables configured.
- No critical console errors.

---

#### Task 15.2 — Connect domain

Priority: P0

Domain:

```text
remoteworksyndicate.com
```

Acceptance criteria:

- Domain resolves.
- HTTPS works.
- Canonical URL uses production domain.

---

#### Task 15.3 — Submit to Google Search Console

Priority: P0

Acceptance criteria:

- Domain verified.
- Sitemap submitted.
- Indexing request started for key pages.

---

## 3. First Sprint: Codex Build Order

This is the recommended first implementation sequence.

### Sprint 1 Goal

Build a visually strong public scaffold using placeholder data.

### Sprint 1 Tasks

1. Project scaffold
2. Theme and layout
3. Seed data
4. Homepage
5. Platforms directory
6. Platform detail page
7. Jobs directory
8. Job detail page
9. Newsletter form
10. Referral disclosure page

### Sprint 1 Definition of Done

- Site runs locally.
- Homepage looks premium.
- Platform pages work.
- Job pages work.
- Navigation works.
- Mobile works.
- No auth required.
- No fake stats.
- Referral disclosure present.

---

## 4. Second Sprint: Product and SEO

### Sprint 2 Goal

Add the Platform Match Quiz and SEO foundation.

### Sprint 2 Tasks

1. Quiz UI
2. Quiz scoring
3. Quiz results
4. Comparison pages
5. Guides pages
6. Metadata
7. Sitemap
8. Robots
9. Basic JSON-LD
10. Apply click tracking

### Sprint 2 Definition of Done

- Quiz is usable.
- Quiz results are useful.
- Comparison pages work.
- Guides work.
- SEO foundation exists.
- Apply clicks can be tracked.

---

## 5. Third Sprint: Data and Launch Prep

### Sprint 3 Goal

Prepare for production launch.

### Sprint 3 Tasks

1. Supabase setup
2. Newsletter storage
3. Outcome report storage
4. Application click storage
5. Legal pages
6. Analytics events
7. Mobile polish
8. Content polish
9. Vercel deployment
10. Google Search Console

### Sprint 3 Definition of Done

- Site can launch publicly.
- Data capture works.
- Tracking works.
- Legal/trust pages exist.
- Production deployment works.

---

## 6. Deferred Backlog

Do not build until after MVP validation.

### Retention features

- Saved jobs
- Personalized job alerts
- Application tracker
- Email reminders
- User dashboard

### Monetization features

- Premium membership
- Resume/profile review
- Interview prep tool
- Sponsorship management
- Employer products

### Community features

- Verified contributor profiles
- Community comments
- Public report pages
- Badges
- Reputation system

### Automation

- Job scraping
- Auto-verification
- AI summarization
- ML recommendations
- Automated outreach

---

## 7. Critical Product Rules

1. No mandatory login in V1.
2. No fake community statistics.
3. No fake income guarantees.
4. No undisclosed referral links.
5. No expired jobs shown as active.
6. No raw community reports shown publicly.
7. Referral payout must not determine recommendations.
8. Manual verification before automation.
9. Trust over short-term revenue.
10. Build features that improve hiring outcomes.

---

## 8. Codex Usage Rules

When using Codex:

1. Give one focused task at a time.
2. Reference relevant docs.
3. Include acceptance criteria.
4. Tell Codex what not to build.
5. Review generated code before moving on.
6. Avoid huge vague prompts.
7. Keep product decisions in docs.
8. Update docs when product decisions change.

---

## 9. Current Next Action

Start implementation with:

```text
/prompts/01-scaffold-app.md
```

Then:

```text
/prompts/02-build-homepage.md
/prompts/03-build-platform-pages.md
/prompts/04-build-jobs.md
/prompts/05-build-quiz.md
/prompts/06-build-seo.md
```
