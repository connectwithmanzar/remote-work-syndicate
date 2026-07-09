-- Remote Work Syndicate
-- 002_indexes_and_constraints.sql
-- Adds MVP database indexes and stricter validation constraints.

-- -------------------------
-- Newsletter signups
-- -------------------------

create unique index if not exists newsletter_signups_email_lower_unique_idx
on public.newsletter_signups (lower(email));

create index if not exists newsletter_signups_created_at_idx
on public.newsletter_signups (created_at desc);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'newsletter_signups_email_format_check'
  ) then
    alter table public.newsletter_signups
    add constraint newsletter_signups_email_format_check
    check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
  end if;
end $$;


-- -------------------------
-- Quiz submissions
-- -------------------------

create index if not exists quiz_submissions_created_at_idx
on public.quiz_submissions (created_at desc);

create index if not exists quiz_submissions_country_idx
on public.quiz_submissions (country);

create index if not exists quiz_submissions_primary_skill_category_idx
on public.quiz_submissions (primary_skill_category);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_years_of_experience_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_years_of_experience_check
    check (years_of_experience >= 0 and years_of_experience <= 50);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_available_hours_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_available_hours_check
    check (available_hours_per_week >= 1 and available_hours_per_week <= 80);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_desired_pay_min_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_desired_pay_min_check
    check (desired_pay_min is null or (desired_pay_min >= 0 and desired_pay_min <= 1000));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_english_level_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_english_level_check
    check (english_level in ('basic', 'conversational', 'professional', 'native_like'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_coding_ability_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_coding_ability_check
    check (coding_ability in ('none', 'beginner', 'intermediate', 'advanced'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'quiz_submissions_preferred_work_type_check'
  ) then
    alter table public.quiz_submissions
    add constraint quiz_submissions_preferred_work_type_check
    check (preferred_work_type in ('part_time', 'full_time', 'contract', 'freelance', 'flexible'));
  end if;
end $$;


-- -------------------------
-- Outcome reports
-- -------------------------

create index if not exists outcome_reports_created_at_idx
on public.outcome_reports (created_at desc);

create index if not exists outcome_reports_platform_slug_idx
on public.outcome_reports (platform_slug);

create index if not exists outcome_reports_status_idx
on public.outcome_reports (status);

create index if not exists outcome_reports_published_idx
on public.outcome_reports (published);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_report_status_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_report_status_check
    check (
      report_status in (
        'planned_to_apply',
        'applied',
        'assessment_received',
        'interview_received',
        'accepted',
        'rejected',
        'waitlisted',
        'no_response',
        'started_work',
        'paid'
      )
    );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_response_days_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_response_days_check
    check (response_days is null or (response_days >= 0 and response_days <= 365));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_interview_difficulty_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_interview_difficulty_check
    check (interview_difficulty is null or (interview_difficulty >= 1 and interview_difficulty <= 5));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_pay_rate_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_pay_rate_check
    check (pay_rate is null or (pay_rate >= 0 and pay_rate <= 10000));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_review_status_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_review_status_check
    check (status in ('pending_review', 'approved', 'rejected', 'hidden'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'outcome_reports_verification_level_check'
  ) then
    alter table public.outcome_reports
    add constraint outcome_reports_verification_level_check
    check (verification_level in ('anonymous', 'email_verified', 'manual_verified'));
  end if;
end $$;


-- -------------------------
-- Apply click events
-- -------------------------

create index if not exists apply_click_events_created_at_idx
on public.apply_click_events (created_at desc);

create index if not exists apply_click_events_platform_slug_idx
on public.apply_click_events (platform_slug);

create index if not exists apply_click_events_job_slug_idx
on public.apply_click_events (job_slug);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'apply_click_events_destination_url_format_check'
  ) then
    alter table public.apply_click_events
    add constraint apply_click_events_destination_url_format_check
    check (destination_url ~* '^https?://');
  end if;
end $$;
