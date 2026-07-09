-- Remote Work Syndicate
-- 004_admin_india_time_views.sql
-- Creates admin convenience views showing timestamps in India time.
-- These are views, not duplicate tables.

create or replace view public.newsletter_signups_admin_india_time
with (security_invoker = true)
as
select
  id,
  email,
  source,
  consent,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.newsletter_signups
order by created_at desc;


create or replace view public.quiz_submissions_admin_india_time
with (security_invoker = true)
as
select
  id,
  email,
  country,
  primary_skill_category,
  years_of_experience,
  english_level,
  coding_ability,
  preferred_work_type,
  available_hours_per_week,
  consent_to_subscribe,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.quiz_submissions
order by created_at desc;


create or replace view public.outcome_reports_admin_india_time
with (security_invoker = true)
as
select
  id,
  platform_slug,
  job_slug,
  report_status,
  country,
  role_category,
  email,
  status,
  verification_level,
  published,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.outcome_reports
order by created_at desc;


create or replace view public.apply_click_events_admin_india_time
with (security_invoker = true)
as
select
  id,
  destination_url,
  platform_slug,
  job_slug,
  referral_available,
  source_page,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.apply_click_events
order by created_at desc;


create or replace view public.admin_recent_activity_india_time
with (security_invoker = true)
as
select
  'newsletter_signup' as activity_type,
  id as record_id,
  email,
  null::text as platform_slug,
  null::text as job_slug,
  source as source_detail,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.newsletter_signups

union all

select
  'quiz_submission' as activity_type,
  id as record_id,
  email,
  null::text as platform_slug,
  null::text as job_slug,
  primary_skill_category as source_detail,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.quiz_submissions

union all

select
  'outcome_report' as activity_type,
  id as record_id,
  email,
  platform_slug,
  job_slug,
  report_status as source_detail,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.outcome_reports

union all

select
  'apply_click' as activity_type,
  id as record_id,
  null::text as email,
  platform_slug,
  job_slug,
  source_page as source_detail,
  created_at,
  created_at at time zone 'Asia/Kolkata' as created_at_india_time,
  to_char(
    created_at at time zone 'Asia/Kolkata',
    'DD Mon YYYY, HH12:MI AM'
  ) || ' IST' as created_at_india_time_display
from public.apply_click_events

order by created_at desc;
