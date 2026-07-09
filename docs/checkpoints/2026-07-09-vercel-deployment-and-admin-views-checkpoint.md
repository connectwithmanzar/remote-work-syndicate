# Remote Work Syndicate — Vercel Deployment and Admin Views Checkpoint

Date: 2026-07-09

## Status

The MVP is deployed on Vercel and connected to Supabase.

Latest tested deployment URL:

https://remote-work-syndicate-o9d62da5b-manzar298-4932s-projects.vercel.app/

## Verified working

- Homepage loads on Vercel.
- Newsletter form saves to Supabase.
- Quiz form saves to Supabase.
- Apply click tracking saves to Supabase.
- Outcome report form saves to Supabase.
- Outcome report form reset bug was fixed.
- API rate limiting works through Supabase-backed rate limit storage.
- Admin India-time views were created for easier Supabase review.

## Admin India-time views created

These views display UTC database timestamps alongside India/Kolkata display time:

- newsletter_signups_admin_india_time
- quiz_submissions_admin_india_time
- outcome_reports_admin_india_time
- apply_click_events_admin_india_time
- admin_recent_activity_india_time

## Notes

The real database timestamp columns continue to store UTC time.

India-time columns are display-only values in Supabase views. They do not duplicate or overwrite the original timestamp data.

## Latest relevant commits

- Fix outcome report form reset
- Add admin India time database views
