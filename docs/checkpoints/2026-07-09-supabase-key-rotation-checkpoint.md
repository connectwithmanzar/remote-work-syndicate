# Remote Work Syndicate — Supabase Key Rotation Checkpoint

Date: 2026-07-09

## Status

Supabase API keys were rotated after real keys were found in the old .env.example file history.

## Completed

- Sanitized .env.example so no real Supabase keys are tracked.
- Created/used new Supabase publishable key.
- Created/used new Supabase secret key.
- Updated local .env.local with new keys.
- Updated Vercel environment variables with new keys.
- Redeployed production.
- Verified newsletter form saves after key rotation.
- Verified outcome report form saves after key rotation.
- Revoked/disabled the old exposed Supabase service role key.
- Verified production still saves after revoking the old key.
- Cleaned key-rotation test rows from Supabase.

## Security notes

Supabase service role / secret keys must never be committed or shown publicly because they can bypass Row Level Security.

.env.local remains gitignored and private.

.env.example must only contain placeholder values.

## Production domain

https://www.remoteworksyndicate.com
