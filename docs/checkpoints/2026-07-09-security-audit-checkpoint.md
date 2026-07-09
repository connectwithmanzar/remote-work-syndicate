# Remote Work Syndicate — Security Audit Checkpoint

Date: 2026-07-09

## Status

The npm security audit has been reviewed and fixed safely.

## Issue found

npm audit reported moderate vulnerabilities from a nested PostCSS dependency inside Next.js.

The automatic fix suggested by npm was unsafe because it would have downgraded Next.js to an old breaking version.

## Safe fix applied

Added an npm override for PostCSS:

postcss = 8.5.16

## Verified

- npm audit reports 0 vulnerabilities.
- npm run lint passes.
- npm run build passes.
- Next.js remains on the current version.
- No force downgrade was used.

## Notes

Do not run npm audit fix --force blindly because it can introduce breaking dependency changes.
