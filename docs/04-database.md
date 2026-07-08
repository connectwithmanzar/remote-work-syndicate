# Remote Work Syndicate — Database Schema v1.0

Recommended database: PostgreSQL via Supabase.

This schema supports the V1 product defined in the PRD:

- Platforms directory
- Jobs directory
- Platform detail pages
- Job detail pages
- Guides
- Comparison pages
- Platform Match Quiz
- Newsletter capture
- Community outcome reports
- Referral tracking
- Manual admin workflow

V1 should remain mostly public and anonymous. Authentication is optional and should not block discovery.

---

## 1. Database Principles

1. Public browsing must not require authentication.
2. Manual data management comes before automation.
3. Every job must have a verification status and last verified date.
4. Referral links must be stored separately from editorial platform data.
5. Community reports must support verification levels.
6. Public insights should be aggregated, not raw personal reports.
7. Data models should support SEO-friendly pages.
8. Soft deletion/status fields are preferred over destructive deletion.
9. Every major public record should support slugs.
10. The schema should be flexible enough for future user accounts, alerts, saved jobs, and application tracking.

---

## 2. Core Entities

V1 core entities:

1. platforms
2. jobs
3. guides
4. comparisons
5. platform_referral_links
6. community_reports
7. quiz_submissions
8. newsletter_subscribers
9. application_clicks
10. categories
11. tags
12. countries
13. referral_outcomes

---

## 3. Enums

Use PostgreSQL enums or text fields with check constraints.

```sql
CREATE TYPE platform_status AS ENUM ('draft','active','inactive','needs_review','hidden');
CREATE TYPE hiring_status AS ENUM ('actively_hiring','limited_hiring','waitlist','not_hiring','unknown');
CREATE TYPE job_status AS ENUM ('draft','active','expired','hidden','needs_review');
CREATE TYPE work_type AS ENUM ('part_time','full_time','contract','freelance','temporary','internship','unknown');
CREATE TYPE experience_level AS ENUM ('beginner','intermediate','advanced','expert','any','unknown');
CREATE TYPE pay_type AS ENUM ('hourly','fixed','monthly','annual','per_task','unknown');
CREATE TYPE referral_status AS ENUM ('available','not_available','unknown','partner_only','paused');
CREATE TYPE report_status AS ENUM ('planned_to_apply','applied','assessment_received','interview_received','accepted','rejected','waitlisted','no_response','started_work','paid');
CREATE TYPE verification_level AS ENUM ('anonymous','email_verified','social_verified','evidence_verified','referral_matched');
CREATE TYPE content_status AS ENUM ('draft','published','scheduled','archived','needs_review');
CREATE TYPE skill_category AS ENUM ('ai_trainer','ai_evaluator','llm_evaluator','data_annotation','coding_evaluator','prompt_engineering','language_expert','domain_expert','software_engineering','data_science','machine_learning','research','writing','translation','finance','legal','medical','education','other');
```

---

## 4. Tables

### 4.1 platforms

Stores platform-level data for Mercor, micro1, Outlier, Terac, Braintrust, etc.

```sql
CREATE TABLE platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  short_description TEXT,
  overview TEXT,
  status platform_status NOT NULL DEFAULT 'draft',
  hiring_status hiring_status NOT NULL DEFAULT 'unknown',
  best_for TEXT[],
  role_categories skill_category[],
  accepted_countries TEXT[],
  remote_regions TEXT[],
  pay_min NUMERIC,
  pay_max NUMERIC,
  pay_currency TEXT DEFAULT 'USD',
  pay_type pay_type DEFAULT 'unknown',
  pay_notes TEXT,
  application_difficulty SMALLINT CHECK (application_difficulty BETWEEN 1 AND 5),
  interview_difficulty SMALLINT CHECK (interview_difficulty BETWEEN 1 AND 5),
  estimated_response_days_min INTEGER,
  estimated_response_days_max INTEGER,
  referral_status referral_status NOT NULL DEFAULT 'unknown',
  trust_score SMALLINT CHECK (trust_score BETWEEN 1 AND 100),
  editorial_score SMALLINT CHECK (editorial_score BETWEEN 1 AND 100),
  pros TEXT[],
  cons TEXT[],
  application_process TEXT,
  interview_process TEXT,
  requirements TEXT,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  last_verified_at TIMESTAMPTZ,
  verified_by UUID,
  source_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Notes:
- `trust_score` reflects editorial confidence, legitimacy, verification, and quality.
- `editorial_score` can support ranking, but should not be based only on referral payouts.
- `accepted_countries` can start as a text array for MVP.

---

### 4.2 platform_referral_links

Stores referral/affiliate links separately from platform editorial data.

```sql
CREATE TABLE platform_referral_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  referral_url TEXT NOT NULL,
  referral_code TEXT,
  payout_min NUMERIC,
  payout_max NUMERIC,
  payout_currency TEXT DEFAULT 'USD',
  payout_notes TEXT,
  public_promotion_allowed BOOLEAN,
  terms_url TEXT,
  tracking_method TEXT,
  cookie_window_days INTEGER,
  status referral_status NOT NULL DEFAULT 'unknown',
  is_primary BOOLEAN NOT NULL DEFAULT false,
  disclosure_text TEXT,
  last_verified_at TIMESTAMPTZ,
  verified_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 4.3 jobs

Stores manually curated jobs/opportunities.

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  status job_status NOT NULL DEFAULT 'draft',
  category skill_category NOT NULL,
  work_type work_type DEFAULT 'unknown',
  experience_level experience_level DEFAULT 'unknown',
  source_url TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  referral_link_id UUID REFERENCES platform_referral_links(id) ON DELETE SET NULL,
  referral_available BOOLEAN NOT NULL DEFAULT false,
  remote BOOLEAN NOT NULL DEFAULT true,
  countries_allowed TEXT[],
  regions_allowed TEXT[],
  pay_min NUMERIC,
  pay_max NUMERIC,
  pay_currency TEXT DEFAULT 'USD',
  pay_type pay_type DEFAULT 'unknown',
  pay_notes TEXT,
  skills TEXT[],
  requirements TEXT,
  application_process TEXT,
  assessment_notes TEXT,
  application_difficulty SMALLINT CHECK (application_difficulty BETWEEN 1 AND 5),
  interview_difficulty SMALLINT CHECK (interview_difficulty BETWEEN 1 AND 5),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  last_verified_at TIMESTAMPTZ,
  verified_by UUID,
  verification_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Every public job should show `last_verified_at`. Jobs without recent verification should be downgraded or hidden.

---

### 4.4 categories

Stores category landing pages such as AI Trainer Jobs, Data Annotation Jobs, LLM Evaluator Jobs.

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category skill_category NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  intro_content TEXT,
  faq JSONB,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 4.5 countries

Stores country landing pages and eligibility data.

```sql
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  iso_code TEXT UNIQUE,
  region TEXT,
  seo_title TEXT,
  seo_description TEXT,
  intro_content TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 4.6 guides

Stores blog/guides content.

```sql
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content_markdown TEXT NOT NULL,
  status content_status NOT NULL DEFAULT 'draft',
  guide_type TEXT,
  related_platform_ids UUID[],
  related_job_ids UUID[],
  related_categories skill_category[],
  related_country_codes TEXT[],
  author_name TEXT,
  published_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

guide_type examples:
- platform_review
- interview_guide
- resume_guide
- salary_guide
- country_guide
- comparison_guide
- weekly_hiring_signal
- scam_avoidance
- role_guide

---

### 4.7 comparisons

Stores platform comparison pages.

```sql
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_a_id UUID NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  platform_b_id UUID NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  verdict TEXT,
  best_for_a TEXT,
  best_for_b TEXT,
  pay_comparison TEXT,
  difficulty_comparison TEXT,
  country_comparison TEXT,
  work_availability_comparison TEXT,
  referral_comparison TEXT,
  pros_a TEXT[],
  cons_a TEXT[],
  pros_b TEXT[],
  cons_b TEXT[],
  content_markdown TEXT,
  status content_status NOT NULL DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  published_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT different_platforms CHECK (platform_a_id <> platform_b_id)
);
```

---

### 4.8 newsletter_subscribers

Stores email subscribers.

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  country TEXT,
  role_interest skill_category,
  skill_tags TEXT[],
  source TEXT,
  source_page TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT true,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 4.9 quiz_submissions

Stores Platform Match Quiz submissions.

```sql
CREATE TABLE quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT,
  country TEXT,
  primary_skill_category skill_category,
  years_experience NUMERIC,
  experience_level experience_level,
  english_level TEXT,
  coding_ability TEXT,
  domain_expertise TEXT[],
  preferred_work_type work_type,
  available_hours_per_week INTEGER,
  desired_pay_min NUMERIC,
  desired_pay_currency TEXT DEFAULT 'USD',
  platforms_already_applied TEXT[],
  current_outcomes JSONB,
  recommended_platforms JSONB,
  top_platform_id UUID REFERENCES platforms(id) ON DELETE SET NULL,
  source_page TEXT,
  consent_to_email BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

recommended_platforms JSONB example:

```json
[
  {
    "platform_id": "uuid",
    "platform_name": "Mercor",
    "score": 91,
    "reasons": ["Strong match for coding ability", "Accepts your country"]
  }
]
```

---

### 4.10 community_reports

Stores application outcome reports, platform experience reports, and personal recommendation intake results.

```sql
CREATE TABLE community_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT,
  email_hash TEXT,
  linkedin_url TEXT,
  report_type TEXT NOT NULL,
  platform_id UUID REFERENCES platforms(id) ON DELETE SET NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  country TEXT,
  role_category skill_category,
  experience_level experience_level,
  status report_status,
  date_applied DATE,
  date_response DATE,
  response_days INTEGER,
  assessment_difficulty SMALLINT CHECK (assessment_difficulty BETWEEN 1 AND 5),
  interview_difficulty SMALLINT CHECK (interview_difficulty BETWEEN 1 AND 5),
  pay_min NUMERIC,
  pay_max NUMERIC,
  pay_currency TEXT DEFAULT 'USD',
  pay_type pay_type DEFAULT 'unknown',
  payment_received BOOLEAN,
  report_text TEXT,
  advice_text TEXT,
  pros TEXT[],
  cons TEXT[],
  would_recommend BOOLEAN,
  verification_level verification_level NOT NULL DEFAULT 'anonymous',
  verification_method TEXT,
  confidence_score SMALLINT CHECK (confidence_score BETWEEN 1 AND 100),
  evidence_url TEXT,
  permission_to_contact BOOLEAN DEFAULT false,
  permission_to_publish_anonymized BOOLEAN DEFAULT false,
  internal_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

report_type values:
- application_outcome
- platform_experience
- personal_recommendation_intake
- interview_report
- payment_report

---

### 4.11 application_clicks

Tracks apply/referral clicks, supporting the North Star Metric.

```sql
CREATE TABLE application_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES platforms(id) ON DELETE SET NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  referral_link_id UUID REFERENCES platform_referral_links(id) ON DELETE SET NULL,
  quiz_submission_id UUID REFERENCES quiz_submissions(id) ON DELETE SET NULL,
  source_page TEXT,
  source_component TEXT,
  destination_url TEXT NOT NULL,
  user_id UUID,
  anonymous_id TEXT,
  session_id TEXT,
  country TEXT,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  qualified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

This is the operational table for the North Star Metric. It does not prove the user completed an external application, but it measures outbound qualified intent.

---

### 4.12 referral_outcomes

Manual table for tracking successful referrals and revenue.

```sql
CREATE TABLE referral_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID REFERENCES platforms(id) ON DELETE SET NULL,
  referral_link_id UUID REFERENCES platform_referral_links(id) ON DELETE SET NULL,
  application_click_id UUID REFERENCES application_clicks(id) ON DELETE SET NULL,
  community_report_id UUID REFERENCES community_reports(id) ON DELETE SET NULL,
  candidate_email_hash TEXT,
  status TEXT NOT NULL,
  payout_amount NUMERIC,
  payout_currency TEXT DEFAULT 'USD',
  payout_expected_at DATE,
  payout_received_at DATE,
  source_dashboard TEXT,
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

status examples:
- pending
- approved
- rejected
- started_work
- payout_pending
- paid

---

### 4.13 tags

Generic tags for jobs, platforms, and guides.

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

### 4.14 entity_tags

Polymorphic tag relationship.

```sql
CREATE TABLE entity_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tag_id, entity_type, entity_id)
);
```

entity_type values:
- platform
- job
- guide
- comparison

---

### 4.15 page_views

Optional lightweight analytics table if not relying only on PostHog.

```sql
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  page_type TEXT,
  entity_id UUID,
  anonymous_id TEXT,
  session_id TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  country TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 5. Relationships

```text
platforms.id -> jobs.platform_id
platforms.id -> platform_referral_links.platform_id
platform_referral_links.id -> jobs.referral_link_id
platforms.id -> comparisons.platform_a_id
platforms.id -> comparisons.platform_b_id
platforms.id -> community_reports.platform_id
jobs.id -> community_reports.job_id
platforms.id -> quiz_submissions.top_platform_id
platforms.id -> application_clicks.platform_id
jobs.id -> application_clicks.job_id
platform_referral_links.id -> application_clicks.referral_link_id
quiz_submissions.id -> application_clicks.quiz_submission_id
```

---

## 6. Recommended Indexes

```sql
CREATE INDEX idx_platforms_slug ON platforms(slug);
CREATE INDEX idx_platforms_status ON platforms(status);
CREATE INDEX idx_platforms_hiring_status ON platforms(hiring_status);
CREATE INDEX idx_platforms_referral_status ON platforms(referral_status);

CREATE INDEX idx_jobs_slug ON jobs(slug);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_platform_id ON jobs(platform_id);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_work_type ON jobs(work_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_jobs_last_verified_at ON jobs(last_verified_at);
CREATE INDEX idx_jobs_is_featured ON jobs(is_featured);

CREATE INDEX idx_guides_slug ON guides(slug);
CREATE INDEX idx_guides_status ON guides(status);
CREATE INDEX idx_guides_published_at ON guides(published_at);

CREATE INDEX idx_comparisons_slug ON comparisons(slug);
CREATE INDEX idx_comparisons_platform_a ON comparisons(platform_a_id);
CREATE INDEX idx_comparisons_platform_b ON comparisons(platform_b_id);

CREATE INDEX idx_community_reports_platform_id ON community_reports(platform_id);
CREATE INDEX idx_community_reports_job_id ON community_reports(job_id);
CREATE INDEX idx_community_reports_status ON community_reports(status);
CREATE INDEX idx_community_reports_verification_level ON community_reports(verification_level);
CREATE INDEX idx_community_reports_created_at ON community_reports(created_at);

CREATE INDEX idx_quiz_submissions_created_at ON quiz_submissions(created_at);
CREATE INDEX idx_quiz_submissions_top_platform_id ON quiz_submissions(top_platform_id);

CREATE INDEX idx_application_clicks_platform_id ON application_clicks(platform_id);
CREATE INDEX idx_application_clicks_job_id ON application_clicks(job_id);
CREATE INDEX idx_application_clicks_created_at ON application_clicks(created_at);
CREATE INDEX idx_application_clicks_qualified ON application_clicks(qualified);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
```

---

## 7. Full-Text Search

For V1, use simple PostgreSQL text search or application-level filtering.

Recommended generated search vectors later:

- platforms: name, short_description, overview, best_for
- jobs: title, description, skills, requirements
- guides: title, excerpt, content_markdown
- comparisons: title, summary, verdict

Example:

```sql
ALTER TABLE jobs ADD COLUMN search_vector tsvector;
CREATE INDEX idx_jobs_search_vector ON jobs USING GIN(search_vector);
```

A trigger can update `search_vector` later.

---

## 8. Row Level Security Notes

If using Supabase, enable RLS.

### Public read

Allow public read for:

- published platforms
- active jobs
- published guides
- published comparisons
- published categories
- published countries

### Public insert

Allow anonymous insert for:

- newsletter_subscribers
- quiz_submissions
- community_reports, with limited fields
- application_clicks

### Admin write

Only authenticated admins can:

- create/update/delete platforms
- create/update/delete jobs
- create/update/delete guides
- review community reports
- update referral outcomes

For MVP, admin updates can happen directly through the Supabase dashboard.

---

## 9. Seed Platforms for V1

Initial monetization-first platforms:

```text
Mercor
micro1
Outlier
Terac
Braintrust
LetsRemotify
VanHack
```

Initial trust/inventory platforms:

```text
Alignerr
DataAnnotation
TELUS Digital AI
CrowdGen/Appen
Mindrift
RWS TrainAI
Remotasks/Scale AI
Meridial
```

Additional content platforms:

```text
Toptal
Arc.dev
Turing
Crossover
Lemon.io
```

---

## 10. Seed Tags

```text
AI Trainer
AI Evaluator
LLM Evaluator
Data Annotation
Prompt Engineering
Coding Evaluator
Software Engineering
Remote Worldwide
India Friendly
Beginner Friendly
High Pay
Part Time
Full Time
Contract
Referral Available
No Degree Required
English Required
Python
JavaScript
STEM
Finance
Legal
Medical
Language Expert
Writing
Translation
```

---

## 11. Platform Match Quiz Data Requirements

The quiz scoring engine needs platform-level data from:

- accepted_countries
- role_categories
- pay_min
- pay_max
- pay_type
- hiring_status
- application_difficulty
- interview_difficulty
- best_for
- referral_status

V1 quiz logic can live in application code and use the `platforms` table.

Do not build ML recommendation logic in V1.

---

## 12. Reporting Views

Create database views later for aggregated public insights.

### platform_community_stats

Recommended fields:

```text
platform_id
report_count
verified_report_count
median_response_days
average_assessment_difficulty
average_interview_difficulty
accepted_count
rejected_count
no_response_count
average_pay_min
average_pay_max
last_report_at
```

### application_click_stats

Recommended fields:

```text
platform_id
job_id
click_count
qualified_click_count
first_click_at
last_click_at
```

---

## 13. MVP Admin Workflow

In V1, admin can use Supabase dashboard directly.

Daily manual workflow:

1. Review platforms that need updates.
2. Check source pages for active jobs.
3. Add or update jobs.
4. Mark expired jobs as expired.
5. Update `last_verified_at`.
6. Review community reports.
7. Update platform community stats manually or through future views.
8. Check referral dashboard and update `referral_outcomes`.

---

## 14. Codex Instructions

When implementing this schema:

1. Use TypeScript types generated from Supabase when possible.
2. Keep enums aligned with this document.
3. Do not create mandatory authentication in V1.
4. Use slugs for public routes.
5. Use `status` fields to control visibility.
6. Do not expose raw community reports publicly.
7. Always show referral disclosure when referral links are present.
8. Build reusable data access functions.
9. Use placeholder seed data first if Supabase is not connected.
10. Do not invent extra tables unless clearly required.

---

## 15. Deferred Tables

Do not build these in V1 unless needed:

- saved_jobs
- application_tracker
- user_alert_preferences
- premium_subscriptions
- payments
- employer_accounts
- recruiter_accounts
- resume_reviews
- interview_prep_sessions
- user_badges
- community_comments

These belong in later retention and monetization phases.

---

## 16. V1 Definition of Done

The database schema is ready for V1 when it supports:

- 15+ platform records
- 50–100 curated jobs
- platform detail pages
- job detail pages
- guide pages
- comparison pages
- quiz submissions
- newsletter signups
- application click tracking
- community outcome reports
- manual referral outcome tracking
- public SEO pages without authentication
