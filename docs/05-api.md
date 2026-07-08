# Remote Work Syndicate — API Spec v1.0

Recommended file path:

`/docs/05-api.md`

This document defines the API contract for Remote Work Syndicate V1.

The V1 API should support:

- Public content reads
- Newsletter signups
- Platform Match Quiz submissions
- Community outcome reports
- Apply/referral click tracking
- Future Supabase integration
- Optional admin workflows later

V1 should not require authentication for public browsing or basic submissions.

---

## 1. API Principles

1. Public discovery must not require authentication.
2. API routes should validate all inputs with `zod`.
3. Do not expose internal notes, private emails, raw community reports, or referral revenue publicly.
4. Referral/apply clicks should be tracked before redirecting or opening destination URLs.
5. Public read APIs should return only published/active content.
6. Use consistent response shapes.
7. Keep V1 APIs simple and reliable.
8. Do not build payment APIs in V1.
9. Do not build mandatory auth APIs in V1.
10. All public form endpoints should be rate-limited later.

---

## 2. Response Format

All API responses should follow this structure.

### Success

```json
{
  "success": true,
  "data": {},
  "message": "Optional success message"
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Pagination

For list endpoints:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

---

## 3. Error Codes

Use these standard error codes:

```text
VALIDATION_ERROR
NOT_FOUND
RATE_LIMITED
UNAUTHORIZED
FORBIDDEN
INTERNAL_ERROR
DUPLICATE_RECORD
INVALID_REQUEST
EXTERNAL_SERVICE_ERROR
```

---

## 4. Public Read Endpoints

Public read endpoints can be implemented either as API routes or direct server-side data-access functions.

For Next.js server components, prefer data-access functions in `/lib/data` over unnecessary API calls. Still, this API spec defines expected shapes so Codex can keep data consistent.

---

# 4.1 Get Platforms

## Endpoint

```http
GET /api/platforms
```

## Purpose

Return active platforms for directory pages and quiz scoring.

## Query Parameters

| Name | Type | Required | Description |
|---|---|---:|---|
| status | string | No | Defaults to `active` |
| category | string | No | Filter by role category |
| referral_available | boolean | No | Filter by referral availability |
| hiring_status | string | No | Filter by hiring status |
| q | string | No | Search query |
| page | number | No | Defaults to 1 |
| pageSize | number | No | Defaults to 20 |

## Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Mercor",
        "slug": "mercor",
        "websiteUrl": "https://mercor.com",
        "logoUrl": "/logos/mercor.png",
        "shortDescription": "AI expert work platform...",
        "hiringStatus": "actively_hiring",
        "bestFor": ["Domain experts", "Coders", "AI evaluators"],
        "roleCategories": ["ai_evaluator", "coding_evaluator", "domain_expert"],
        "payMin": 20,
        "payMax": 200,
        "payCurrency": "USD",
        "payType": "hourly",
        "referralStatus": "available",
        "trustScore": 85,
        "lastVerifiedAt": "2026-07-07T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 15,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}
```

## Visibility Rules

Return only platforms where:

```text
status = active
```

unless admin routes are built later.

---

# 4.2 Get Platform by Slug

## Endpoint

```http
GET /api/platforms/[slug]
```

## Purpose

Return full public platform detail.

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Mercor",
    "slug": "mercor",
    "websiteUrl": "https://mercor.com",
    "logoUrl": "/logos/mercor.png",
    "shortDescription": "AI expert work platform...",
    "overview": "Long-form overview...",
    "status": "active",
    "hiringStatus": "actively_hiring",
    "bestFor": ["Domain experts", "Coders"],
    "roleCategories": ["ai_evaluator", "coding_evaluator"],
    "acceptedCountries": ["India", "United States", "United Kingdom"],
    "remoteRegions": ["Worldwide"],
    "payMin": 20,
    "payMax": 200,
    "payCurrency": "USD",
    "payType": "hourly",
    "payNotes": "Varies by role and expertise.",
    "applicationDifficulty": 4,
    "interviewDifficulty": 4,
    "estimatedResponseDaysMin": 3,
    "estimatedResponseDaysMax": 14,
    "referralStatus": "available",
    "trustScore": 85,
    "pros": ["High-value roles", "Strong domain expert fit"],
    "cons": ["Competitive acceptance"],
    "applicationProcess": "Application process summary...",
    "interviewProcess": "Interview process summary...",
    "requirements": "Requirements summary...",
    "seoTitle": "Mercor Review: AI Remote Work Platform",
    "seoDescription": "Learn whether Mercor is right for you...",
    "lastVerifiedAt": "2026-07-07T00:00:00Z",
    "relatedJobs": [],
    "relatedGuides": [],
    "relatedComparisons": [],
    "communityStats": {
      "reportCount": 0,
      "medianResponseDays": null,
      "averageInterviewDifficulty": null,
      "lastUpdatedAt": null
    }
  }
}
```

## Do Not Return

- Internal notes
- Referral revenue
- Raw private community reports
- Admin-only verification notes

---

# 4.3 Get Jobs

## Endpoint

```http
GET /api/jobs
```

## Purpose

Return active jobs/opportunities.

## Query Parameters

| Name | Type | Required | Description |
|---|---|---:|---|
| q | string | No | Search |
| platform | string | No | Platform slug |
| category | string | No | Job category |
| work_type | string | No | Part-time, full-time, contract, etc. |
| experience_level | string | No | Beginner, intermediate, advanced, expert |
| country | string | No | Country eligibility |
| referral_available | boolean | No | Referral availability |
| min_pay | number | No | Minimum pay |
| page | number | No | Defaults to 1 |
| pageSize | number | No | Defaults to 20 |
| sort | string | No | `featured`, `newest`, `highest_pay`, `platform` |

## Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "platformId": "uuid",
        "platformName": "Mercor",
        "platformSlug": "mercor",
        "title": "AI Coding Evaluator",
        "slug": "mercor-ai-coding-evaluator",
        "shortDescription": "Evaluate AI-generated code...",
        "status": "active",
        "category": "coding_evaluator",
        "workType": "part_time",
        "experienceLevel": "advanced",
        "remote": true,
        "countriesAllowed": ["India", "United States"],
        "payMin": 40,
        "payMax": 100,
        "payCurrency": "USD",
        "payType": "hourly",
        "skills": ["Python", "JavaScript"],
        "referralAvailable": true,
        "isFeatured": true,
        "lastVerifiedAt": "2026-07-07T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## Visibility Rules

Return only jobs where:

```text
status = active
```

---

# 4.4 Get Job by Slug

## Endpoint

```http
GET /api/jobs/[slug]
```

## Purpose

Return public job detail page data.

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "platform": {
      "id": "uuid",
      "name": "Mercor",
      "slug": "mercor",
      "logoUrl": "/logos/mercor.png",
      "shortDescription": "AI expert work platform..."
    },
    "title": "AI Coding Evaluator",
    "slug": "mercor-ai-coding-evaluator",
    "description": "Full job description...",
    "shortDescription": "Evaluate AI-generated code...",
    "status": "active",
    "category": "coding_evaluator",
    "workType": "part_time",
    "experienceLevel": "advanced",
    "sourceUrl": "https://example.com/job",
    "applyUrl": "https://example.com/apply",
    "referralAvailable": true,
    "remote": true,
    "countriesAllowed": ["India", "United States"],
    "regionsAllowed": ["Worldwide"],
    "payMin": 40,
    "payMax": 100,
    "payCurrency": "USD",
    "payType": "hourly",
    "payNotes": "Pay varies by assessment and project.",
    "skills": ["Python", "JavaScript"],
    "requirements": "Requirements...",
    "applicationProcess": "Application process...",
    "assessmentNotes": "Assessment notes...",
    "applicationDifficulty": 4,
    "interviewDifficulty": 4,
    "expiresAt": null,
    "seoTitle": "AI Coding Evaluator Remote Job",
    "seoDescription": "Apply for remote AI coding evaluator work...",
    "lastVerifiedAt": "2026-07-07T00:00:00Z",
    "relatedGuides": [],
    "similarJobs": [],
    "disclosure": {
      "hasReferral": true,
      "text": "Remote Work Syndicate may earn a referral commission if you apply through this link."
    }
  }
}
```

---

# 4.5 Get Guides

## Endpoint

```http
GET /api/guides
```

## Purpose

Return published guides.

## Query Parameters

| Name | Type | Required | Description |
|---|---|---:|---|
| q | string | No | Search |
| guide_type | string | No | Guide type |
| platform | string | No | Platform slug |
| category | string | No | Category |
| country | string | No | Country |
| page | number | No | Defaults to 1 |
| pageSize | number | No | Defaults to 20 |

## Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "How to Pass the Mercor Interview",
        "slug": "how-to-pass-the-mercor-interview",
        "excerpt": "A practical guide...",
        "guideType": "interview_guide",
        "authorName": "Remote Work Syndicate",
        "publishedAt": "2026-07-07T00:00:00Z",
        "lastUpdatedAt": "2026-07-07T00:00:00Z",
        "seoTitle": "How to Pass the Mercor Interview",
        "seoDescription": "Prepare for Mercor interviews..."
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 10,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}
```

---

# 4.6 Get Guide by Slug

## Endpoint

```http
GET /api/guides/[slug]
```

## Purpose

Return full guide content.

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "How to Pass the Mercor Interview",
    "slug": "how-to-pass-the-mercor-interview",
    "excerpt": "A practical guide...",
    "contentMarkdown": "## Guide content...",
    "status": "published",
    "guideType": "interview_guide",
    "relatedPlatformIds": ["uuid"],
    "relatedJobIds": [],
    "relatedCategories": ["ai_evaluator"],
    "authorName": "Remote Work Syndicate",
    "publishedAt": "2026-07-07T00:00:00Z",
    "lastUpdatedAt": "2026-07-07T00:00:00Z",
    "seoTitle": "How to Pass the Mercor Interview",
    "seoDescription": "Prepare for Mercor interviews...",
    "relatedPlatforms": [],
    "relatedJobs": [],
    "relatedGuides": []
  }
}
```

---

# 4.7 Get Comparison by Slug

## Endpoint

```http
GET /api/compare/[slug]
```

## Purpose

Return platform comparison page data.

## Example

```http
GET /api/compare/mercor-vs-micro1
```

## Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "mercor-vs-micro1",
    "title": "Mercor vs micro1: Which AI Work Platform Is Better?",
    "summary": "Short summary...",
    "verdict": "Verdict...",
    "platformA": {
      "id": "uuid",
      "name": "Mercor",
      "slug": "mercor"
    },
    "platformB": {
      "id": "uuid",
      "name": "micro1",
      "slug": "micro1"
    },
    "bestForA": "Domain experts and coding evaluators",
    "bestForB": "AI trainers and expert evaluators",
    "payComparison": "Comparison text...",
    "difficultyComparison": "Comparison text...",
    "countryComparison": "Comparison text...",
    "workAvailabilityComparison": "Comparison text...",
    "referralComparison": "Comparison text...",
    "prosA": [],
    "consA": [],
    "prosB": [],
    "consB": [],
    "contentMarkdown": "Detailed comparison...",
    "seoTitle": "Mercor vs micro1",
    "seoDescription": "Compare Mercor and micro1...",
    "publishedAt": "2026-07-07T00:00:00Z",
    "lastUpdatedAt": "2026-07-07T00:00:00Z"
  }
}
```

---

## 5. Mutation Endpoints

---

# 5.1 Newsletter Signup

## Endpoint

```http
POST /api/newsletter
```

## Purpose

Capture email subscribers.

## Request Body

```json
{
  "email": "user@example.com",
  "name": "Optional Name",
  "country": "India",
  "roleInterest": "ai_trainer",
  "skillTags": ["Python", "LLM Evaluation"],
  "source": "homepage",
  "sourcePage": "/"
}
```

## Validation

| Field | Rule |
|---|---|
| email | Required, valid email |
| name | Optional, max 120 chars |
| country | Optional, max 100 chars |
| roleInterest | Optional enum `skill_category` |
| skillTags | Optional string array |
| source | Optional, max 100 chars |
| sourcePage | Optional, max 300 chars |

## Success Response

```json
{
  "success": true,
  "data": {
    "subscriberId": "uuid",
    "email": "user@example.com",
    "subscribed": true
  },
  "message": "You are subscribed."
}
```

## Duplicate Email Behavior

If email already exists and is subscribed:

```json
{
  "success": true,
  "data": {
    "subscriberId": "uuid",
    "email": "user@example.com",
    "subscribed": true
  },
  "message": "You are already subscribed."
}
```

If email exists but unsubscribed, do not automatically resubscribe without clear user consent.

---

# 5.2 Submit Platform Match Quiz

## Endpoint

```http
POST /api/quiz
```

## Purpose

Store quiz answers and return platform recommendations.

## Request Body

```json
{
  "email": "user@example.com",
  "country": "India",
  "primarySkillCategory": "coding_evaluator",
  "yearsExperience": 3,
  "experienceLevel": "intermediate",
  "englishLevel": "advanced",
  "codingAbility": "advanced",
  "domainExpertise": ["software_engineering", "data_science"],
  "preferredWorkType": "part_time",
  "availableHoursPerWeek": 15,
  "desiredPayMin": 30,
  "desiredPayCurrency": "USD",
  "platformsAlreadyApplied": ["Mercor", "Outlier"],
  "currentOutcomes": {
    "Mercor": "applied",
    "Outlier": "no_response"
  },
  "sourcePage": "/quiz",
  "consentToEmail": true
}
```

## Validation

| Field | Rule |
|---|---|
| email | Optional valid email |
| country | Required |
| primarySkillCategory | Required enum `skill_category` |
| yearsExperience | Optional number, 0–60 |
| experienceLevel | Optional enum |
| englishLevel | Required string enum in app code |
| codingAbility | Required string enum in app code |
| domainExpertise | Optional string array |
| preferredWorkType | Required enum `work_type` |
| availableHoursPerWeek | Required number, 1–80 |
| desiredPayMin | Optional number |
| desiredPayCurrency | Optional, default USD |
| platformsAlreadyApplied | Optional string array |
| currentOutcomes | Optional JSON |
| consentToEmail | Optional boolean |

## Suggested App-Level Enums

### englishLevel

```text
basic
intermediate
advanced
native_or_bilingual
```

### codingAbility

```text
none
basic
intermediate
advanced
expert
```

## Success Response

```json
{
  "success": true,
  "data": {
    "quizSubmissionId": "uuid",
    "recommendations": [
      {
        "platformId": "uuid",
        "platformName": "Mercor",
        "platformSlug": "mercor",
        "matchScore": 91,
        "matchPercentage": 91,
        "reasons": [
          "Strong match for coding evaluation work.",
          "Good fit for your country and availability."
        ],
        "warnings": [
          "Acceptance can be competitive."
        ],
        "suggestedRoles": [
          "AI Coding Evaluator",
          "LLM Evaluator"
        ],
        "applyUrl": "https://example.com/referral",
        "relatedGuides": [
          {
            "title": "How to Pass the Mercor Interview",
            "slug": "how-to-pass-the-mercor-interview"
          }
        ]
      }
    ],
    "newsletterSuggested": true
  }
}
```

## Business Rules

1. Referral payout must not be the primary ranking factor.
2. Do not recommend a platform as top match if country eligibility is known to be incompatible.
3. Explain recommendations clearly.
4. Store quiz submission even if user does not provide email.
5. If `consentToEmail = true` and email exists, also add/update newsletter subscriber.

---

# 5.3 Submit Community Outcome Report

## Endpoint

```http
POST /api/outcome-report
```

## Purpose

Collect application outcomes, platform experiences, and personal recommendation intake data.

## Request Body — Application Outcome Report

```json
{
  "reportType": "application_outcome",
  "email": "user@example.com",
  "linkedinUrl": "https://linkedin.com/in/example",
  "platformSlug": "mercor",
  "jobSlug": "mercor-ai-coding-evaluator",
  "country": "India",
  "roleCategory": "coding_evaluator",
  "experienceLevel": "intermediate",
  "status": "interview_received",
  "dateApplied": "2026-07-01",
  "dateResponse": "2026-07-05",
  "assessmentDifficulty": 4,
  "interviewDifficulty": 4,
  "payMin": 40,
  "payMax": 80,
  "payCurrency": "USD",
  "payType": "hourly",
  "reportText": "I received the assessment after four days.",
  "adviceText": "Prepare coding examples before applying.",
  "permissionToContact": true,
  "permissionToPublishAnonymized": true
}
```

## Request Body — Platform Experience Report

```json
{
  "reportType": "platform_experience",
  "email": "user@example.com",
  "platformSlug": "micro1",
  "country": "India",
  "roleCategory": "ai_evaluator",
  "status": "paid",
  "paymentReceived": true,
  "payMin": 25,
  "payMax": 50,
  "payCurrency": "USD",
  "payType": "hourly",
  "pros": ["Good pay", "Remote work"],
  "cons": ["Project availability varies"],
  "wouldRecommend": true,
  "reportText": "Overall experience was positive.",
  "permissionToContact": true,
  "permissionToPublishAnonymized": true
}
```

## Request Body — Personal Recommendation Intake

```json
{
  "reportType": "personal_recommendation_intake",
  "email": "user@example.com",
  "linkedinUrl": "https://linkedin.com/in/example",
  "country": "India",
  "roleCategory": "ai_trainer",
  "experienceLevel": "beginner",
  "reportText": "I want help choosing the best AI work platform.",
  "permissionToContact": true,
  "permissionToPublishAnonymized": false
}
```

## Validation

| Field | Rule |
|---|---|
| reportType | Required |
| email | Optional valid email |
| linkedinUrl | Optional URL |
| platformSlug | Optional, but required for application/platform reports when known |
| jobSlug | Optional |
| country | Required |
| roleCategory | Optional enum |
| experienceLevel | Optional enum |
| status | Optional enum `report_status` |
| dateApplied | Optional date |
| dateResponse | Optional date |
| assessmentDifficulty | Optional 1–5 |
| interviewDifficulty | Optional 1–5 |
| payMin | Optional number |
| payMax | Optional number |
| reportText | Optional max 5000 chars |
| adviceText | Optional max 3000 chars |
| permissionToContact | Optional boolean |
| permissionToPublishAnonymized | Optional boolean |

## Success Response

```json
{
  "success": true,
  "data": {
    "reportId": "uuid",
    "verificationLevel": "anonymous",
    "reviewStatus": "pending"
  },
  "message": "Thanks for sharing your report. We may review it before using it in aggregated insights."
}
```

## Business Rules

1. Raw reports are not public by default.
2. Default verification level is `anonymous`.
3. If email is provided, verification level may become `email_verified` after confirmation.
4. Reports with evidence or direct conversations can be manually upgraded.
5. Do not show unreviewed reports in public insights.
6. Calculate `responseDays` server-side when both dates exist.

---

# 5.4 Track Apply Click

## Endpoint

```http
POST /api/track-apply-click
```

## Purpose

Track qualified outbound application/referral intent.

This endpoint supports the North Star Metric.

## Request Body

```json
{
  "platformSlug": "mercor",
  "jobSlug": "mercor-ai-coding-evaluator",
  "referralLinkId": "uuid",
  "quizSubmissionId": "uuid",
  "sourcePage": "/jobs/mercor-ai-coding-evaluator",
  "sourceComponent": "job_detail_apply_button",
  "destinationUrl": "https://example.com/referral",
  "anonymousId": "anon_123",
  "sessionId": "sess_123",
  "utmSource": "linkedin",
  "utmMedium": "social",
  "utmCampaign": "launch"
}
```

## Validation

| Field | Rule |
|---|---|
| platformSlug | Optional but recommended |
| jobSlug | Optional |
| referralLinkId | Optional UUID |
| quizSubmissionId | Optional UUID |
| sourcePage | Required |
| sourceComponent | Required |
| destinationUrl | Required URL |
| anonymousId | Optional |
| sessionId | Optional |
| UTM fields | Optional |

## Success Response

```json
{
  "success": true,
  "data": {
    "clickId": "uuid",
    "qualified": true,
    "destinationUrl": "https://example.com/referral"
  }
}
```

## Business Rules

1. Destination URL must be a valid URL.
2. Do not hide the destination platform from the user.
3. Default `qualified` to true if the click is from a real apply/referral CTA.
4. Store user agent, referrer, and country if available.
5. This event should also trigger analytics event `apply_click` or `referral_click`.

---

## 6. Future Redirect Endpoint

Optional later.

## Endpoint

```http
GET /go/[type]/[slug]
```

## Purpose

Track and redirect outbound clicks server-side.

## Examples

```http
GET /go/job/mercor-ai-coding-evaluator
GET /go/platform/mercor
```

## Behavior

1. Find destination URL.
2. Store application click.
3. Redirect to destination.

This is not required for V1 if `/api/track-apply-click` is implemented.

---

## 7. Admin Endpoints — Deferred

Do not build custom admin endpoints in V1 unless needed.

Admin can initially use Supabase dashboard.

Future admin endpoints:

```http
POST /api/admin/platforms
PATCH /api/admin/platforms/[id]
POST /api/admin/jobs
PATCH /api/admin/jobs/[id]
POST /api/admin/guides
PATCH /api/admin/guides/[id]
POST /api/admin/comparisons
PATCH /api/admin/comparisons/[id]
PATCH /api/admin/community-reports/[id]
POST /api/admin/referral-outcomes
```

All admin endpoints must require authentication and admin authorization.

---

## 8. Zod Schema Locations

Recommended folder:

```text
/lib/validation/
```

Files:

```text
newsletter.ts
quiz.ts
outcome-report.ts
apply-click.ts
filters.ts
```

Each API route should import validation schemas from these files.

---

## 9. Rate Limiting

V1 can launch without advanced rate limiting, but add basic protection before meaningful traffic.

Priority endpoints for rate limiting:

1. `/api/newsletter`
2. `/api/quiz`
3. `/api/outcome-report`
4. `/api/track-apply-click`

Recommended later:

- Upstash Redis
- Vercel Edge Config
- Supabase-based throttling
- Cloudflare Turnstile for abuse-heavy forms

---

## 10. Privacy Requirements

1. Do not return subscriber emails in public read APIs.
2. Do not expose raw community reports publicly.
3. Store email hashes for matching when needed.
4. Keep evidence uploads private.
5. Do not publish personal names or LinkedIn URLs without explicit consent.
6. Community insights should be aggregated and anonymized.
7. Add privacy policy before collecting reports at scale.

---

## 11. Analytics Mapping

### `/api/newsletter`

Track:

```text
newsletter_signup
```

### `/api/quiz`

Track:

```text
quiz_completed
quiz_result_viewed
```

### `/api/outcome-report`

Track:

```text
outcome_report_submitted
```

### `/api/track-apply-click`

Track:

```text
apply_click
referral_click
qualified_application_sent
```

---

## 12. Codex Implementation Rules

1. Use TypeScript.
2. Validate request bodies with zod.
3. Use consistent response format.
4. Keep public endpoints auth-free.
5. Do not expose internal/admin fields.
6. Prefer server-side data access functions for public pages.
7. Use Supabase only through server-safe clients for writes.
8. Never expose service role key to client.
9. Keep endpoints small and testable.
10. Do not invent new APIs not listed here without updating this document.

---

## 13. V1 API Definition of Done

The V1 API is complete when:

1. Newsletter signups can be captured.
2. Quiz submissions can be scored and stored.
3. Community reports can be submitted.
4. Apply/referral clicks can be tracked.
5. Public pages can read active/published content.
6. Responses follow standard success/error shape.
7. All mutations validate input.
8. No public endpoint exposes private/admin data.
9. The API supports the North Star Metric: qualified applications sent.
