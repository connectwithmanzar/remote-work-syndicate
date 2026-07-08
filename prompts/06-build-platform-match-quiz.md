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
