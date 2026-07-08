# Remote Work Syndicate — Product Requirements Document v1.0

## 1. Product Name

**Remote Work Syndicate**

Domain: `remoteworksyndicate.com`

---

## 2. Product Summary

Remote Work Syndicate is an independent AI career intelligence platform that helps people discover, compare, and succeed in AI-powered remote work opportunities.

The product is not a generic job board. It combines:

- Verified AI remote job listings
- Platform comparison pages
- Interview and application guides
- Referral-based apply links
- Platform Match Quiz
- Personalized job alerts
- Community hiring outcome data

The goal is to help users answer:

> “Which AI remote work platform should I apply to, and how can I maximize my chance of getting accepted?”

---

## 3. Product Philosophy

Remote Work Syndicate should be:

- Useful before asking for signup
- Trustworthy before monetized aggressively
- Content-led for acquisition
- Product-led for retention
- Manual-first before automation
- Built around hiring outcomes, not page views

---

## 4. North Star Metric

**Qualified applications sent through Remote Work Syndicate**

A qualified application means:

- User clicks an apply/referral link from Remote Work Syndicate
- The platform/job is relevant to their profile or search intent
- The click leads to a real application opportunity

Supporting metrics:

- Apply clicks
- Platform Match Quiz completions
- Newsletter signups
- Community outcome reports submitted
- Returning users
- Referral payouts
- Organic search traffic

---

## 5. Target Users

### Primary Users — V1

People actively seeking AI-related remote work.

Examples:

- AI trainers
- AI evaluators
- Prompt engineers
- LLM evaluators
- Data annotators
- Domain experts doing AI training work
- Language experts
- Coding evaluators

### Secondary Users — Later

- Software engineers
- ML engineers
- Data scientists
- Product managers
- Designers
- Recruiters
- Employers

### Initial Geographic Focus

The product is global, but early content should strongly support:

- India
- United States
- United Kingdom
- Canada
- Europe
- Remote worldwide seekers

India deserves special attention because many users will search for remote AI work from India.

---

## 6. User Problems

### Problem 1: Fragmented opportunities

Users must visit many platforms individually:

- Mercor
- micro1
- Outlier
- Alignerr
- DataAnnotation
- Braintrust
- TELUS Digital AI
- Appen/CrowdGen
- Mindrift
- RWS TrainAI

This wastes time.

### Problem 2: Low transparency

Users do not know:

- Which platforms are legitimate
- Which platforms are actively hiring
- Which countries are accepted
- What the application process looks like
- How long responses take
- What pay ranges are realistic
- Which platforms fit their skills

### Problem 3: Poor preparation

Users often apply without understanding:

- Resume/profile expectations
- Interview format
- Assessment difficulty
- Required skills
- Common rejection reasons

### Problem 4: No single trusted guide

Existing job boards list jobs. They do not help users choose the best AI work platform or improve their odds of acceptance.

---

## 7. Core Value Proposition

Remote Work Syndicate helps users:

1. Find legitimate AI remote work opportunities.
2. Compare platforms before applying.
3. Choose the best-fit platforms based on their profile.
4. Prepare for interviews and assessments.
5. Track and share application outcomes over time.

---

## 8. MVP Scope

### MVP Goal

Launch a content-first AI remote work platform with enough product functionality to generate:

- Search traffic
- Newsletter signups
- Apply/referral clicks
- Early community hiring reports
- Platform Match Quiz completions

### MVP Must Include

1. Homepage
2. Jobs directory
3. Job detail pages
4. Platforms directory
5. Platform detail pages
6. Comparison pages
7. Guides/blog
8. Platform Match Quiz
9. Newsletter capture
10. Community outcome report forms
11. Admin/manual data management
12. SEO-ready architecture

### MVP Must Not Include

These are deliberately excluded from V1:

- Mandatory user accounts
- Complex dashboards
- Paid memberships
- Resume upload analysis
- Employer portal
- Recruiter portal
- Real-time scraping
- AI chatbot
- Payment processing
- Mobile app
- Native community forum
- Full application tracker

These can come later.

---

## 9. Authentication Strategy

Authentication is optional.

### Anonymous users can:

- Browse jobs
- Search jobs
- View platform pages
- Read guides
- Use the Platform Match Quiz
- Click referral/apply links
- Submit basic reports
- Subscribe to newsletter

### Account required later for:

- Saved jobs
- Application tracker
- Personalized alerts dashboard
- Resume/profile review
- Community contributor profile
- Premium tools

### Principle

No user should be blocked from discovering value by a signup wall.

---

## 10. Core Pages

### 10.1 Homepage

#### Goal

Explain what Remote Work Syndicate does and route users to the highest-value actions.

#### Primary CTA

**Find My Best Platform**

This leads to the Platform Match Quiz.

#### Secondary CTA

**Browse AI Remote Jobs**

#### Homepage Sections

1. Hero
2. Platform Match Quiz CTA
3. Featured AI work platforms
4. Latest verified opportunities
5. Compare popular platforms
6. Latest guides
7. Community hiring insights teaser
8. Newsletter signup
9. Trust/disclaimer section

#### Hero Copy Draft

Headline:

> Find the best AI remote work platform for your skills.

Subheadline:

> Discover verified AI work opportunities, compare platforms like Mercor, micro1, Outlier, and DataAnnotation, and learn how to improve your chances of getting accepted.

CTA buttons:

- Find My Best Platform
- Browse Jobs

---

### 10.2 Jobs Directory

#### Goal

Allow users to browse active AI remote work opportunities.

#### Required Filters

- Keyword
- Platform
- Category
- Remote region/country eligibility
- Pay range
- Experience level
- Work type
- Skill tags
- Referral available
- Last verified

#### Job Categories

- AI Trainer
- AI Evaluator
- LLM Evaluator
- Data Annotation
- Coding Evaluator
- Prompt Engineering
- Language Expert
- Domain Expert
- Software Engineering
- Research
- Writing
- Other

#### Job Card Fields

Each job card should show:

- Job title
- Platform
- Category
- Pay range if available
- Remote eligibility
- Work type
- Skills
- Referral available badge
- Last verified date
- Apply button
- Details button

#### Sorting

Default sort:

1. Featured/referral-friendly
2. Recently verified
3. Highest relevance

Other sort options:

- Newest
- Highest pay
- Platform
- Category

---

### 10.3 Job Detail Page

#### Goal

Help the user decide whether to apply.

#### Required Sections

1. Job overview
2. Platform summary
3. Pay range
4. Eligibility
5. Required skills
6. Application process
7. Interview/assessment difficulty
8. Why this role may be a good fit
9. Related guides
10. Similar jobs
11. Community signals
12. Apply CTA

#### Important Trust Elements

Every job page must show:

- Last verified date
- Source platform
- Referral disclosure if applicable
- Expiry status if known
- Disclaimer that availability can change

#### CTA

Primary:

> Apply on [Platform]

Secondary:

> Track / Share Outcome

For V1, “Track / Share Outcome” can link to an external form.

---

### 10.4 Platforms Directory

#### Goal

Help users compare AI work platforms.

#### Platform Card Fields

- Platform name
- Logo
- Short description
- Best for
- Role categories
- Pay range
- Countries/remote eligibility
- Referral available badge
- Hiring status
- Trust score
- View details button

#### Initial Platform List

##### Monetization-first platforms

1. Mercor
2. micro1
3. Outlier
4. Terac
5. Braintrust
6. LetsRemotify
7. VanHack

##### Trust/inventory platforms

8. Alignerr
9. DataAnnotation
10. TELUS Digital AI
11. CrowdGen/Appen
12. Mindrift
13. RWS TrainAI
14. Remotasks/Scale AI
15. Meridial

---

### 10.5 Platform Detail Page

#### Goal

Become the best independent page on the internet for understanding each AI work platform.

#### Required Sections

1. Platform overview
2. Best for
3. Types of roles
4. Pay range
5. Country eligibility
6. Application process
7. Interview/assessment process
8. Difficulty rating
9. Pros
10. Cons
11. Referral availability
12. Current jobs
13. Related comparisons
14. Related guides
15. Community hiring insights
16. Submit outcome CTA

#### Example URL Structure

- `/platforms/mercor`
- `/platforms/micro1`
- `/platforms/outlier`

#### Platform Page CTA

Primary:

> Find matching roles on [Platform]

Secondary:

> Compare [Platform] with others

---

### 10.6 Comparison Pages

#### Goal

Capture high-intent SEO searches and help users choose between platforms.

#### Example Pages

- Mercor vs micro1
- Mercor vs Outlier
- micro1 vs Outlier
- DataAnnotation vs Outlier
- Alignerr vs DataAnnotation
- Braintrust vs Toptal
- VanHack vs Arc.dev

#### Required Comparison Fields

- Best for
- Role types
- Pay potential
- Application difficulty
- Interview difficulty
- Country availability
- Work availability
- Response time
- Referral availability
- Pros
- Cons
- Which one should you choose?

#### Final Section

Always include:

> Which platform is better for you?

Then route to Platform Match Quiz.

---

### 10.7 Guides / Blog

#### Goal

Drive SEO traffic and help users prepare.

#### Guide Categories

- Platform reviews
- Interview guides
- Resume/profile guides
- Salary/pay guides
- Country-specific guides
- Role-specific guides
- Comparison guides
- Weekly hiring signal reports

#### Example Guides

- How to Pass the Mercor Interview
- Best AI Trainer Jobs for Beginners
- Best AI Remote Work Platforms in India
- How to Get Accepted by micro1
- Outlier AI Review
- DataAnnotation vs Outlier
- How to Write an AI Trainer Resume
- Best Remote AI Jobs That Pay in USD

#### Guide Page Requirements

Each guide should have:

- SEO title
- Meta description
- Author/date
- Last updated date
- Table of contents
- Internal links to platforms
- Internal links to jobs
- Newsletter CTA
- Outcome contribution CTA where relevant

---

### 10.8 Platform Match Quiz

#### Goal

Recommend the best AI work platforms based on user profile.

This is the first product-amplification feature.

#### Entry Points

- Homepage hero
- Platform pages
- Comparison pages
- Job pages
- Guides
- Newsletter CTA

#### Quiz Questions

Minimum V1 questions:

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

#### Result Page

Show:

- Top 3–5 recommended platforms
- Match percentage
- Why each platform fits
- Role categories to target
- Apply/referral link
- Suggested guides
- Newsletter signup
- Option to submit/update outcome later

#### Example Result

> Mercor — 91% match  
> Best for: domain experts, coders, and high-skill AI evaluation.  
> Why: You have Python experience, strong English, and can work 15+ hours/week.

#### Data Capture

Quiz can be completed anonymously.

At the result page, ask:

> Want us to email your personalized recommendations and new matching jobs?

Email is optional.

---

### 10.9 Newsletter Signup

#### Goal

Build owned audience.

#### Signup Locations

- Homepage
- Guide pages
- Job pages
- Platform pages
- Quiz results
- Exit intent / scroll-based prompt later

#### Newsletter Promise

> Get verified AI remote work opportunities, platform updates, and interview tips every week.

#### Required Fields

V1:

- Email

Optional later:

- Country
- Role interest
- Skill category

---

### 10.10 Community Outcome Reports

#### Goal

Collect applicant and worker data to build platform intelligence.

#### V1 Implementation

Use external forms or simple internal forms.

Forms:

1. Application Outcome Report
2. Platform Experience Report
3. Personal Recommendation Intake

#### CTA Locations

- Platform pages
- Job pages
- Guides
- Quiz result page
- Newsletter
- LinkedIn/email follow-ups

#### Public Display

Only aggregated insights should be shown publicly.

No raw personal reports by default.

---

## 11. Admin Requirements

V1 requires a simple admin workflow.

This can start in Supabase admin/Airtable, but eventually needs an admin dashboard.

### Admin must be able to manage:

- Platforms
- Jobs
- Guides
- Comparison pages
- Referral links
- Community reports
- Verification status
- Featured content
- Expired jobs
- Newsletter exports

### Manual Job Verification Workflow

Every job should have:

- `source_url`
- `last_verified_at`
- `verified_by`
- `status`

Statuses:

- Draft
- Active
- Expired
- Hidden
- Needs review

---

## 12. Referral and Disclosure Requirements

Remote Work Syndicate must clearly disclose referral relationships.

### Disclosure placement

- Job detail page near apply button
- Platform detail page
- Footer/global disclaimer
- Affiliate/referral disclosure page

### Example disclosure

> Remote Work Syndicate may earn a referral commission if you apply through some links. We only recommend platforms we believe are relevant to users, and referral availability does not determine our platform rankings.

### Rule

Never rank a platform higher only because it pays more.

---

## 13. Community Data Verification Levels

Reports should have verification levels.

| Level | Name | Description |
|---|---|---|
| 1 | Anonymous | No identity verification |
| 2 | Email verified | Email submitted/confirmed |
| 3 | Social verified | LinkedIn/direct communication |
| 4 | Evidence verified | Screenshot or proof reviewed |
| 5 | Referral matched | Matched to referral dashboard/payout |

Public insights should weight higher-confidence reports more heavily.

---

## 14. Trust and Safety Requirements

Remote Work Syndicate must avoid becoming a scammy “easy money” site.

### Required Trust Rules

- No fake income claims
- No fake job guarantees
- No misleading “hiring now” claims
- No expired jobs shown as active
- No undisclosed referral incentives
- No publishing private user data
- No guaranteed acceptance claims

### Required disclaimers

- Job availability can change
- Platform terms may change
- Pay ranges are estimates or platform/community reported
- Community reports are not official platform data
- Applying through RWS does not guarantee acceptance

---

## 15. SEO Requirements

### URL Structure

Homepage:

- `/`

Jobs:

- `/jobs`
- `/jobs/[slug]`

Platforms:

- `/platforms`
- `/platforms/[slug]`

Comparisons:

- `/compare`
- `/compare/[platform-a]-vs-[platform-b]`

Guides:

- `/guides`
- `/guides/[slug]`

Categories:

- `/categories/ai-trainer-jobs`
- `/categories/ai-evaluator-jobs`
- `/categories/data-annotation-jobs`

Countries:

- `/countries/india`
- `/countries/united-states`
- `/countries/canada`

Quiz:

- `/quiz`
- `/quiz/results`

Reports:

- `/reports/hiring-signal`

Legal:

- `/about`
- `/contact`
- `/referral-disclosure`
- `/privacy`
- `/terms`

### SEO Metadata

Every indexable page needs:

- SEO title
- Meta description
- Canonical URL
- Open Graph title
- Open Graph description
- OG image
- Last updated date where relevant

### Structured Data

Use schema where relevant:

- JobPosting schema for job pages
- Article schema for guides
- FAQ schema for FAQ sections
- Breadcrumb schema
- Organization schema

### Internal Linking

Every guide should link to:

- Relevant platform page
- Relevant jobs
- Relevant comparison page
- Platform Match Quiz

Every platform page should link to:

- Current jobs
- Comparisons
- Guides
- Outcome report form

---

## 16. Initial Content Plan

### First 20 Platform Pages

1. Mercor
2. micro1
3. Outlier
4. Terac
5. Braintrust
6. LetsRemotify
7. VanHack
8. Alignerr
9. DataAnnotation
10. TELUS Digital AI
11. CrowdGen/Appen
12. Mindrift
13. RWS TrainAI
14. Remotasks/Scale AI
15. Meridial
16. Toptal
17. Arc.dev
18. Turing
19. Crossover
20. Lemon.io

### First 20 Comparison Pages

1. Mercor vs micro1
2. Mercor vs Outlier
3. Mercor vs DataAnnotation
4. micro1 vs Outlier
5. Outlier vs DataAnnotation
6. Alignerr vs DataAnnotation
7. Alignerr vs Outlier
8. Braintrust vs Toptal
9. Braintrust vs Arc.dev
10. VanHack vs Turing
11. Toptal vs Arc.dev
12. TELUS Digital AI vs Appen
13. Mindrift vs Outlier
14. RWS TrainAI vs TELUS Digital AI
15. Mercor vs Terac
16. micro1 vs Terac
17. Braintrust vs VanHack
18. Remotasks vs Outlier
19. DataAnnotation vs Mindrift
20. Arc.dev vs Turing

### First 20 Guides

1. How to become an AI trainer
2. Best AI trainer jobs for beginners
3. Best AI remote work platforms
4. Best AI remote jobs in India
5. How to pass the Mercor interview
6. How to get accepted by micro1
7. Outlier AI application guide
8. DataAnnotation application guide
9. AI trainer resume guide
10. Prompt engineer remote job guide
11. LLM evaluator job guide
12. Data annotation job guide
13. Best remote AI jobs that pay in USD
14. How to avoid remote job scams
15. Best platforms for coding AI trainers
16. Best platforms for language experts
17. Best platforms for domain experts
18. How long do AI platforms take to respond?
19. Why AI trainer applications get rejected
20. Weekly AI work hiring signal report

---

## 17. Platform Match Quiz Logic — V1

V1 does not need machine learning. Use rules-based scoring.

### Example scoring factors

#### Country eligibility

If platform accepts user country:

`+20`

If unclear:

`+5`

If not accepted:

`-50`

#### Skill match

If platform supports user’s primary skill category:

`+25`

Partial match:

`+10`

No match:

`-20`

#### Experience level

If platform fits experience level:

`+15`

#### English level

High English required and user has high English:

`+10`

High English required and user has low English:

`-15`

#### Coding ability

Coding platform + coding user:

`+20`

Coding platform + non-coding user:

`-10`

#### Availability

Platform supports part-time and user wants part-time:

`+10`

Platform mostly full-time and user wants part-time:

`-10`

#### Desired pay

Platform likely meets desired pay:

`+10`

Does not meet desired pay:

`-10`

### Output

Sort platforms by score.

Convert score to match percentage.

Show top 3–5.

---

## 18. Analytics Requirements

Track the following events:

### Traffic

- Page view
- Platform page view
- Job page view
- Guide page view
- Comparison page view

### Conversion

- Apply click
- Referral click
- Newsletter signup
- Quiz started
- Quiz completed
- Quiz result viewed
- Outcome report clicked
- Outcome report submitted

### Engagement

- Search performed
- Filter applied
- Platform comparison viewed
- Internal link clicked
- Guide CTA clicked

### Business

- Qualified application sent
- Successful referral manually recorded
- Referral revenue manually recorded

---

## 19. MVP Success Criteria

### 30-Day Targets

- 15 platform pages published
- 50–100 active curated jobs
- 10 guides published
- Platform Match Quiz live
- Newsletter signup live
- 100 newsletter subscribers
- 100 apply/referral clicks
- 10 community reports

### 90-Day Targets

- 20+ platform pages
- 300 active/verified jobs
- 50 guides
- 1,000 newsletter subscribers
- 5,000 monthly organic visitors
- 100+ referral applications
- First referral payout
- 100+ community outcome reports

---

## 20. Non-Goals for V1

To prevent overbuilding, V1 will not include:

- Native mobile app
- Paid subscriptions
- User-to-user community
- Employer dashboard
- Recruiter CRM
- Complex AI recommendations
- Resume scoring
- Interview simulator
- Automated scraping
- Browser extension
- Advanced personalization dashboard

These are future opportunities, not MVP requirements.

---

## 21. Future Roadmap

### Phase 1 — Content + Referral MVP

- Platform pages
- Jobs
- Guides
- Quiz
- Newsletter
- Outcome forms

### Phase 2 — Retention Layer

- Personalized job alerts
- Saved jobs
- Application tracker
- Email reminders

### Phase 3 — Data Moat

- Aggregated hiring insights
- Platform intelligence dashboards
- Verified contributor badges
- Hiring signal reports

### Phase 4 — Monetization Expansion

- Sponsorships
- Premium tools
- Resume/profile review
- Interview prep
- Recruiting partnerships
- Employer products

---

## 22. Codex Development Guidance

Codex should follow this PRD strictly.

### Rules for Codex

- Do not invent new product features.
- Do not require authentication for public browsing.
- Do not create payment features in V1.
- Use SEO-friendly routing.
- Keep data models aligned with the database schema.
- Prioritize clean, maintainable code.
- Build reusable components.
- Keep referral disclosure visible.
- Make admin/manual updating easy.

### Recommended first Codex task

> Build the public MVP scaffold for Remote Work Syndicate using Next.js App Router, TypeScript, Tailwind, and a database-ready structure. Include homepage, jobs directory, platforms directory, platform detail page, guides directory, guide detail page, comparison page structure, and Platform Match Quiz route. Use placeholder data first, but structure it so it can later connect to Supabase.

---

## 23. PRD Decision Summary

### Locked for V1

- Content-first platform
- Optional authentication
- Platform Match Quiz
- Curated AI remote jobs
- Platform pages
- Comparison pages
- Guides
- Newsletter
- Community outcome forms
- Referral disclosures
- Manual verification

### Deferred

- User dashboard
- Application tracker
- Saved jobs
- Paid tools
- AI resume review
- Employer portal
- Native community
