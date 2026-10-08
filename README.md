# thetaxias-website

Public website for Theta Xi Fraternity, Alpha Sigma Chapter at Bradley University (thetaxias.org).

## Where we are

The live site runs on GoDaddy Website Builder, which has no export option. The `baseline/` folder is a saved copy of the live pages from October 2026, so we have a starting point. We are rebuilding the site as a simple static site that we can work on together.

## Plan

1. Rebuild each page as plain HTML and CSS, using the baseline as the reference.
2. Everyone runs the site on localhost while building.
3. When it's ready, host it on GitHub Pages and point thetaxias.org at it by changing the DNS records in GoDaddy. GoDaddy keeps only the domain.

## Run it on your computer (localhost)

1. Get the repo onto your computer. Easiest is GitHub Desktop: File, Clone repository, pick `thetaxias-website`. Or run `git clone https://github.com/Gavinb8/thetaxias-website`.
2. Open a terminal in the repo folder and run `python -m http.server 8000` (on Windows you can also use `py -m http.server 8000`).
3. Open http://localhost:8000 in your browser. Refresh the page after you change a file.

Before you start working, pull the latest changes so you don't overwrite someone else's work. When you're done, commit and push.

## Folder layout

- `index.html` and the other page files at the top level are the site itself.
- `css/styles.css` is the only stylesheet. Colors, fonts and spacing are tokens at the top of that file, so change them there instead of in page files. `js/site.js` handles the mobile menu, scroll fade-ins and the placeholder form message.
- Photos we don't have yet show as navy "Photo: ..." boxes. Each one has a TODO comment above it with the file name to save and the `<img>` line to swap in.
- `assets/images/` is where site photos go. Put the Home hero photo at `assets/images/hero.jpg`.

## What's in baseline/

- `original/` holds the saved pages exactly as exported (Home, About, Join, Scholarships, News and Events, Giving Back, Contact). Don't edit these. They are the reference.
- `assets/` holds the few images the export saved.
- `image-urls.txt` lists the photos each page loads from GoDaddy's servers, since the export didn't save most of them.

## Ground rules

- This repo is public. Don't commit private member info, phone numbers, or anything we wouldn't put on the website.
- Work items live in the Google Sheet "Theta Xi Website RAIL". Update it when you pick something up.
- The same sheet has a "Weekly Log" tab. Add a line for anything you finished so the weekly report to the team is easy to write.
- Don't use em dashes in visible site text. Use a period, comma or colon.
