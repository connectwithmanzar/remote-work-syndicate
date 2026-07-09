# Remote Work Syndicate — Google Search Console Checkpoint

Date: 2026-07-09

## Status

Google Search Console has been set up for Remote Work Syndicate.

## Verified

- Domain property verified through DNS TXT record.
- Sitemap submitted successfully.
- robots.txt points to the www sitemap.
- sitemap.xml uses the www production domain.

## Production sitemap

https://www.remoteworksyndicate.com/sitemap.xml

## Production robots.txt

https://www.remoteworksyndicate.com/robots.txt

## Notes

The first sitemap submission failed because sitemap and robots URLs were using the apex domain while the primary production domain is www.

The app was updated so SEO URLs, sitemap URLs, robots.txt sitemap reference, and metadata now use:

https://www.remoteworksyndicate.com
