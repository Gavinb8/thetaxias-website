# thetaxias-website

Public website for Theta Xi Fraternity, Alpha Sigma Chapter at Bradley University (thetaxias.org).

## Where we are

The live site runs on GoDaddy Website Builder, which has no export option. The `baseline/` folder is a saved copy of the live pages from October 2026, so we have a starting point. We are rebuilding the site as a simple static site that we can work on together.

## Plan

1. Rebuild each page as plain HTML and CSS, using the baseline as the reference.
2. Everyone runs the site on localhost while building.
3. When it's ready, host it on GitHub Pages and point thetaxias.org at it by changing the DNS records in GoDaddy. GoDaddy keeps only the domain.

## What's in baseline/

- `original/` holds the saved pages exactly as exported (Home, About, Join, Scholarships, News and Events, Giving Back, Contact). Don't edit these. They are the reference.
- `assets/` holds the few images the export saved.
- `image-urls.txt` lists the photos each page loads from GoDaddy's servers, since the export didn't save most of them.

## Ground rules

- This repo is public. Don't commit private member info, phone numbers, or anything we wouldn't put on the website.
- Work items live in the Google Sheet "Theta Xi Website RAIL". Update it when you pick something up.
