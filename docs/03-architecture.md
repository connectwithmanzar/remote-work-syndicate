# Remote Work Syndicate — Architecture & Tech Stack v1.0

Recommended file path:

`/docs/03-architecture.md`

This document defines the technical architecture for Remote Work Syndicate V1.

The goal is to build a lean, SEO-friendly, content-led platform that supports:

- Public browsing without login
- Platform pages
- Job pages
- Comparison pages
- Guides
- Platform Match Quiz
- Newsletter capture
- Community outcome reports
- Referral click tracking
- Manual admin workflows

---

## 1. Architecture Philosophy

Remote Work Syndicate V1 should be:

1. **SEO-first**
   - Public content must be indexable.
   - Pages should use server-rendering/static generation where possible.

2. **Simple before scalable**
   - Avoid unnecessary microservices.
   - Avoid complex background systems in V1.
   - Manual workflows are acceptable at launch.

3. **Content-led**
   - Platform pages, guides, and comparison pages are growth assets.
   - Routing and metadata must support SEO from day one.

4. **Product-amplified**
   - Platform Match Quiz, alerts, and reporting flows should increase retention and data collection.

5. **Anonymous by default**
   - No mandatory authentication for public browsing.
   - Accounts can be added later for saved jobs, trackers, and dashboards.

6. **Database-ready**
   - Use placeholder data during early UI development if needed.
   - Keep structure ready for Supabase.

7. **Codex-friendly**
   - Clear file structure.
   - Reusable components.
   - Strong TypeScript types.
   - No invented product features.

---

## 2. Recommended Tech Stack

### Frontend

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component system:** shadcn/ui
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod
- **Tables:** TanStack Table, later if admin dashboard is built

### Backend / Database

- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth, later and optional
- **Storage:** Supabase Storage, later for logos/evidence uploads
- **Server actions/API routes:** Next.js route handlers or server actions

### Email / Newsletter

V1 options:

- Beehiiv, Loops, ConvertKit, or Resend
- Start with simple email capture into Supabase
- Integrate newsletter provider after landing pages are live

Recommended V1:

- Store subscriber in Supabase
- Send to external provider later

### Analytics

Recommended:

- **PostHog** for product analytics
- **Google Search Console** for SEO
- **Plausible** or **Vercel Analytics** optional
- Manual referral revenue tracking in database

### Deployment

- **Hosting:** Vercel
- **Database:** Supabase
- **Domain:** remoteworksyndicate.com
- **Source control:** GitHub

### Content Format

V1 can use database content or local markdown/MDX.

Recommended approach:

- Use database for platforms, jobs, comparisons, and reports.
- Use MDX or database for guides.
- If speed matters, start guides as MDX and migrate later.

---

## 3. High-Level System Design

```text
User
  ↓
Next.js App Router
  ↓
Public SEO Pages
  ├── Platforms
  ├── Jobs
  ├── Guides
  ├── Comparisons
  ├── Categories
  ├── Countries
  └── Quiz

Next.js Server Layer
  ├── Data access functions
  ├── Quiz scoring logic
  ├── SEO metadata generation
  ├── Referral click tracking
  └── Form submission handlers

Supabase
  ├── platforms
  ├── jobs
  ├── guides
  ├── comparisons
  ├── newsletter_subscribers
  ├── quiz_submissions
  ├── community_reports
  ├── application_clicks
  └── referral_outcomes

External Services
  ├── Newsletter provider
  ├── PostHog
  ├── Google Search Console
  └── Referral dashboards
```

---

## 4. App Structure

Recommended Next.js folder structure:

```text
remote-work-syndicate/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── jobs/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── platforms/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── compare/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── guides/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── countries/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── quiz/
│   │   ├── page.tsx
│   │   └── results/
│   │       └── page.tsx
│   │
│   ├── reports/
│   │   └── hiring-signal/
│   │       └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── referral-disclosure/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   │
│   └── api/
│       ├── newsletter/
│       │   └── route.ts
│       ├── quiz/
│       │   └── route.ts
│       ├── outcome-report/
│       │   └── route.ts
│       └── track-apply-click/
│           └── route.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedPlatforms.tsx
│   │   ├── LatestJobs.tsx
│   │   ├── ComparisonTeaser.tsx
│   │   ├── LatestGuides.tsx
│   │   └── NewsletterBlock.tsx
│   │
│   ├── jobs/
│   │   ├── JobCard.tsx
│   │   ├── JobFilters.tsx
│   │   ├── JobList.tsx
│   │   ├── JobDetailHeader.tsx
│   │   └── ApplyButton.tsx
│   │
│   ├── platforms/
│   │   ├── PlatformCard.tsx
│   │   ├── PlatformList.tsx
│   │   ├── PlatformDetailHeader.tsx
│   │   ├── PlatformStats.tsx
│   │   └── PlatformJobs.tsx
│   │
│   ├── guides/
│   │   ├── GuideCard.tsx
│   │   ├── GuideList.tsx
│   │   └── TableOfContents.tsx
│   │
│   ├── compare/
│   │   ├── ComparisonTable.tsx
│   │   └── ComparisonVerdict.tsx
│   │
│   ├── quiz/
│   │   ├── QuizForm.tsx
│   │   ├── QuizStep.tsx
│   │   ├── QuizResults.tsx
│   │   └── PlatformMatchCard.tsx
│   │
│   ├── forms/
│   │   ├── NewsletterForm.tsx
│   │   ├── OutcomeReportForm.tsx
│   │   └── ContactForm.tsx
│   │
│   ├── seo/
│   │   ├── JsonLd.tsx
│   │   └── Breadcrumbs.tsx
│   │
│   └── ui/
│       └── shadcn components
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts
│   │
│   ├── data/
│   │   ├── platforms.ts
│   │   ├── jobs.ts
│   │   ├── guides.ts
│   │   ├── comparisons.ts
│   │   └── seed.ts
│   │
│   ├── quiz/
│   │   ├── scoring.ts
│   │   └── types.ts
│   │
│   ├── seo/
│   │   ├── metadata.ts
│   │   ├── schema.ts
│   │   └── sitemap.ts
│   │
│   ├── analytics/
│   │   ├── events.ts
│   │   └── posthog.ts
│   │
│   ├── utils.ts
│   └── constants.ts
│
├── docs/
│   ├── 01-business.md
│   ├── 02-prd.md
│   ├── 03-architecture.md
│   ├── 04-database.md
│   ├── 05-api.md
│   ├── 06-ui.md
│   ├── 07-seo.md
│   ├── 08-launch-plan.md
│   └── 09-backlog.md
│
├── prompts/
│   ├── 01-scaffold-app.md
│   ├── 02-build-homepage.md
│   ├── 03-build-platform-pages.md
│   ├── 04-build-jobs.md
│   ├── 05-build-quiz.md
│   └── 06-build-seo.md
│
├── public/
│   ├── images/
│   └── logos/
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 5. Routing Requirements

### Public routes

```text
/
```

Homepage.

```text
/jobs
/jobs/[slug]
```

Jobs directory and job details.

```text
/platforms
/platforms/[slug]
```

Platform directory and platform details.

```text
/compare
/compare/[platform-a]-vs-[platform-b]
```

Comparison directory and detail pages.

```text
/guides
/guides/[slug]
```

Guides/blog.

```text
/categories/[slug]
```

Category landing pages.

```text
/countries/[slug]
```

Country landing pages.

```text
/quiz
/quiz/results
```

Platform Match Quiz.

```text
/reports/hiring-signal
```

Hiring signal reports.

```text
/about
/contact
/referral-disclosure
/privacy
/terms
```

Legal/trust pages.

### API routes

```text
/api/newsletter
```

Stores newsletter subscriber.

```text
/api/quiz
```

Stores quiz submission and returns recommended platforms.

```text
/api/outcome-report
```

Stores community report.

```text
/api/track-apply-click
```

Tracks outbound apply/referral clicks.

---

## 6. Rendering Strategy

### Static or ISR pages

Use static generation or ISR for:

- Homepage
- Platforms directory
- Platform detail pages
- Jobs directory
- Job detail pages
- Guides
- Comparisons
- Category pages
- Country pages
- Legal pages

### Dynamic server rendering

Use server rendering where filtering/search requires fresh database reads.

### Client-side rendering

Use client components only when needed:

- Interactive filters
- Platform Match Quiz
- Newsletter forms
- Outcome report forms
- Mobile navigation
- Client analytics

### Recommendation

Start with simple server-rendered pages and client-side filters using local data. Move to database queries as data grows.

---

## 7. Data Access Pattern

Create data access functions in `/lib/data`.

Examples:

```text
getFeaturedPlatforms()
getPlatformBySlug(slug)
getPlatforms()
getJobs(filters)
getJobBySlug(slug)
getGuides(filters)
getGuideBySlug(slug)
getComparisonBySlug(slug)
getRelatedJobs(platformId, category)
getRelatedGuides(platformId)
```

Rules:

1. Pages should not directly contain complex Supabase queries.
2. Use typed data access functions.
3. Keep placeholder-data implementation swappable with Supabase implementation.
4. Return normalized objects for UI components.
5. Do not expose private fields such as internal notes or unreviewed reports.

---

## 8. Placeholder Data Strategy

During early development, Codex can use placeholder seed data.

Recommended placeholder files:

```text
/lib/data/seed.ts
```

Seed data should include:

- 15 platforms
- 20 jobs
- 10 guides
- 5 comparisons

This allows UI development before Supabase is fully connected.

The seed structure should match the database schema closely enough to migrate later.

---

## 9. Supabase Strategy

### V1

Use Supabase for:

- platforms
- jobs
- guides
- comparisons
- newsletter_subscribers
- quiz_submissions
- community_reports
- application_clicks
- referral_outcomes

### Auth

Do not require auth in V1.

Supabase Auth may be added later for:

- admin dashboard
- saved jobs
- application tracker
- personalized alerts

### RLS

Enable Row Level Security before production.

Public should be able to read only published/active content.

Public can insert:

- newsletter signups
- quiz submissions
- community reports
- application clicks

Only admins can update platform/job/content records.

---

## 10. Platform Match Quiz Architecture

The quiz should be implemented as a rules-based scoring system.

### Client flow

1. User opens `/quiz`
2. User answers questions
3. Client validates input with zod
4. Submit to `/api/quiz`
5. Server scores platforms
6. Store quiz submission
7. Return top matches
8. Show `/quiz/results` or render results on same page

### Scoring location

```text
/lib/quiz/scoring.ts
```

### Input fields

- country
- primary_skill_category
- years_experience
- english_level
- coding_ability
- domain_expertise
- preferred_work_type
- available_hours_per_week
- desired_pay_min
- platforms_already_applied
- current_outcomes
- optional email consent

### Output fields

- platform_id
- platform_name
- match_score
- match_percentage
- reasons
- warnings
- suggested_roles
- apply_url
- related_guides

### Rules

1. No machine learning in V1.
2. Use transparent scoring.
3. Explain why each platform was recommended.
4. Do not recommend unavailable platforms as top matches.
5. Referral payout must not be the primary ranking factor.

---

## 11. Referral Click Tracking

Outbound apply links should pass through tracking.

Recommended flow:

1. User clicks apply button.
2. Frontend calls `/api/track-apply-click`.
3. Backend stores click event.
4. User is redirected to destination URL.

Alternative:

Use a redirect route later:

```text
/go/[type]/[id]
```

Example:

```text
/go/job/mercor-ai-trainer
/go/platform/mercor
```

For V1, API tracking + direct link is acceptable.

### Must track

- platform_id
- job_id, if applicable
- referral_link_id, if applicable
- source_page
- source_component
- destination_url
- anonymous_id/session_id
- UTM fields where possible
- timestamp

### Important

Never cloak misleading links. The destination platform should be clear to the user.

---

## 12. Newsletter Architecture

### V1

Newsletter form submits to:

```text
/api/newsletter
```

Store:

- email
- name, optional
- source page
- country, optional later
- role interest, optional later

### Later

Sync to:

- Beehiiv
- Loops
- ConvertKit
- Resend audience

### Double opt-in

Optional for early MVP, but recommended before scaling email volume.

---

## 13. Community Report Architecture

### V1 Options

Option A:

- Use Tally/Typeform/Google Forms
- Store manually in Airtable/Supabase

Option B:

- Native form submitting to `/api/outcome-report`

Recommended:

Start with native simple form if development cost is low. Otherwise use Tally first.

### Required report types

- application_outcome
- platform_experience
- personal_recommendation_intake

### Public display rule

Do not display raw reports publicly.

Only show aggregated insights after manual review.

---

## 14. SEO Architecture

### Required technical SEO features

1. Dynamic metadata for every indexable page.
2. Canonical URLs.
3. Open Graph metadata.
4. Twitter card metadata.
5. Sitemap generation.
6. Robots.txt.
7. Breadcrumbs.
8. JSON-LD structured data.
9. Last updated dates.
10. Internal linking components.

### Metadata functions

Create:

```text
/lib/seo/metadata.ts
```

Functions:

```text
generatePlatformMetadata(platform)
generateJobMetadata(job)
generateGuideMetadata(guide)
generateComparisonMetadata(comparison)
generateCategoryMetadata(category)
generateCountryMetadata(country)
```

### Structured data

Create:

```text
/lib/seo/schema.ts
```

Schemas:

- Organization
- Website
- BreadcrumbList
- JobPosting
- Article
- FAQPage

### Sitemap

Use Next.js metadata route:

```text
app/sitemap.ts
app/robots.ts
```

Sitemap should include:

- Homepage
- Platform pages
- Job pages
- Guide pages
- Comparison pages
- Category pages
- Country pages

Only include published/active pages.

---

## 15. Analytics Architecture

Recommended events:

### Traffic

- page_view
- platform_page_view
- job_page_view
- guide_page_view
- comparison_page_view

### Conversion

- apply_click
- referral_click
- newsletter_signup
- quiz_started
- quiz_completed
- quiz_result_viewed
- outcome_report_clicked
- outcome_report_submitted

### Engagement

- search_performed
- filter_applied
- platform_comparison_viewed
- internal_link_clicked
- guide_cta_clicked

### Business

- qualified_application_sent
- successful_referral_recorded
- referral_revenue_recorded

Create event constants in:

```text
/lib/analytics/events.ts
```

Use PostHog later. For V1, application_clicks table is the most important business analytics table.

---

## 16. UI Architecture

Use reusable components.

### Layout components

- Header
- Footer
- MobileNav
- Container
- Section
- Breadcrumbs

### Content components

- PlatformCard
- JobCard
- GuideCard
- ComparisonTable
- TrustBadge
- ReferralDisclosure
- NewsletterBlock

### Product components

- QuizForm
- QuizStep
- QuizResults
- PlatformMatchCard
- ApplyButton
- OutcomeReportCTA

### Design rules

1. Clean and trustworthy.
2. Avoid scammy “make money fast” visuals.
3. Use clear disclosure around referral links.
4. Prioritize readability.
5. Cards should show verification and last updated signals.
6. Mobile-first.

---

## 17. Admin Architecture

V1 admin can be Supabase dashboard.

Do not build custom admin dashboard immediately unless it blocks execution.

### Manual admin tasks

- Add platforms
- Add jobs
- Mark jobs expired
- Update verified date
- Add guides
- Add comparison pages
- Review reports
- Update referral outcomes

### Later admin dashboard routes

```text
/admin
/admin/platforms
/admin/jobs
/admin/guides
/admin/reports
/admin/referrals
```

Requires authentication later.

---

## 18. Environment Variables

Recommended environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://remoteworksyndicate.com

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

RESEND_API_KEY=
NEWSLETTER_PROVIDER_API_KEY=

NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Never expose service role key to client-side code.

---

## 19. Performance Requirements

V1 should target:

- Lighthouse performance above 90 on main pages
- Fast loading static pages
- Optimized images
- Minimal client JavaScript
- Pagination or lazy loading for job lists
- Avoid heavy client-side libraries unless needed

Use:

- Next.js Image
- Static generation/ISR
- Server components by default
- Dynamic imports only where useful

---

## 20. Security Requirements

1. Validate all form inputs with zod.
2. Rate limit public form submissions later.
3. Sanitize community report text.
4. Do not expose internal notes publicly.
5. Do not expose raw emails publicly.
6. Hash email where needed for matching.
7. Enable RLS in Supabase before production.
8. Keep referral outcome data admin-only.
9. Keep evidence uploads private.
10. Never expose Supabase service role key on client.

---

## 21. Legal and Trust Architecture

Required public pages:

```text
/referral-disclosure
/privacy
/terms
/contact
/about
```

Every page with referral links should include a disclosure component.

Every job page should show:

- Source platform
- Last verified date
- Referral status
- Availability disclaimer

Every community data section should show:

- “Based on community-submitted reports”
- Sample size
- Last updated date
- Verification caveat

---

## 22. Deployment Plan

### Step 1

Create GitHub repository.

### Step 2

Initialize Next.js app.

Recommended command:

```bash
npx create-next-app@latest remote-work-syndicate --typescript --tailwind --eslint --app
```

### Step 3

Install UI dependencies.

```bash
npx shadcn@latest init
npm install lucide-react zod react-hook-form @hookform/resolvers
```

### Step 4

Add Supabase client.

```bash
npm install @supabase/supabase-js
```

### Step 5

Build placeholder-data MVP.

### Step 6

Deploy to Vercel.

### Step 7

Connect domain.

### Step 8

Connect Supabase.

### Step 9

Add analytics.

### Step 10

Submit sitemap to Google Search Console.

---

## 23. Codex Implementation Order

Codex should build in this order:

### Task 1: Project scaffold

- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- base layout
- header/footer
- placeholder data

### Task 2: Homepage

- hero
- featured platforms
- latest jobs
- comparison teasers
- latest guides
- newsletter block

### Task 3: Platforms

- platforms directory
- platform card
- platform detail page
- related jobs
- related guides

### Task 4: Jobs

- jobs directory
- filters
- job card
- job detail page
- apply button
- disclosure

### Task 5: Guides

- guides directory
- guide detail page
- metadata
- table of contents

### Task 6: Comparisons

- comparison list
- comparison detail page
- comparison table
- quiz CTA

### Task 7: Platform Match Quiz

- quiz form
- scoring logic
- result page
- recommended platforms

### Task 8: Forms and tracking

- newsletter API
- quiz submission API
- outcome report API
- apply click tracking API

### Task 9: SEO

- metadata
- sitemap
- robots
- JSON-LD
- breadcrumbs

### Task 10: Supabase integration

- replace placeholder data with real database calls
- add environment variables
- add database types

---

## 24. What Not to Build in V1

Do not build:

- Mandatory login
- Payment system
- Premium membership
- Full admin dashboard
- Employer dashboard
- Recruiter dashboard
- AI resume scoring
- Interview simulator
- Native mobile app
- Real-time job scraping
- Complex ML recommendations
- Public raw community reports
- User-to-user community

---

## 25. V1 Definition of Done

Architecture is complete when the app supports:

1. Public homepage.
2. Platforms directory and detail pages.
3. Jobs directory and detail pages.
4. Guides directory and guide pages.
5. Comparison pages.
6. Platform Match Quiz.
7. Newsletter signup.
8. Community report intake.
9. Apply/referral click tracking.
10. SEO metadata and sitemap.
11. Manual data management.
12. Deployment on Vercel.
13. Supabase-ready data layer.
14. No mandatory authentication.
15. Clear referral disclosures.
