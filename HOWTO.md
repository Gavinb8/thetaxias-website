# How to update the website

For anyone who has never touched this site before. You do not need to code.
Almost everything that changes each semester is edited through simple forms, not HTML.

## The short version

1. Open **app.pagescms.org** and sign in (see "Getting access" below).
2. Pick the **thetaxias-website** repo.
3. Pick what you want to change from the list on the left (Members, Events, and so on).
4. Edit the form, then press **Save**. The site updates a minute or two after it is saved.

## What you can edit in the forms

| Form in the CMS | What it changes |
|---|---|
| Members (cards on About) | Every member card: position, photo, class standing, graduation year, bio, past positions |
| Alumni board (About) | The alumni board list |
| Meet the house (photos on About) | The room and amenity photos |
| Why Theta Xi quotes | The quote cards on the Why Theta Xi page |
| Upcoming events | Events on News and Events. Past events hide themselves |
| News posts | The Recent news section. It stays hidden until you add a post |
| Site settings | The Instagram feed ID |

Anything not in that list (page intros, the mission statement, scholarship amounts) is
still plain text in the page files. See CONTENT.md, or ask the person who runs the site.

## Getting access

- **The person who owns the repo (the site lead)** signs in at app.pagescms.org with GitHub, installs
  the Pages CMS GitHub app on the account that holds `thetaxias-website`, and opens the repo.
  The file `.pages.yml` in the repo is what builds the forms. Do not edit it unless you are changing the forms.
- **Committee members** can be invited as collaborators. The Pages CMS docs (Configuration, Collaborators)
  say invited collaborators are added by email and can edit without having a GitHub account.
  If that does not work for someone, add them as a collaborator on the GitHub repo instead (Settings, Collaborators).
- **Each semester:** remove last semester's people and add the new committee. Nothing else changes hands.

## Every semester checklist

- [ ] Members: update positions, standing, graduation year, past positions. Add new members, remove people who left.
- [ ] Alumni board: get the current list from the alumni association and update it.
- [ ] Events: add upcoming events. Delete old ones if you like (they hide on their own anyway).
- [ ] News: add 2 or 3 posts about what the chapter did.
- [ ] Quotes: swap in new Why Theta Xi quotes if you have them.
- [ ] House photos: replace any that look old.
- [ ] Add and remove committee access.

## How to do the common things

**Add or change a member.** Open Members. Find the person (or add a new item at the bottom). Fill in:
- Which group: Executive board, Brothers, or Associate members. This decides where the card shows.
- Position now: for example President. Brothers with no office: Brother. Associate members: Associate member.
- Roll number: digits only (like 1016). Leave empty for associate members.
- Class standing and graduation year. The page shows them as "Junior, Class of 2028".
- Bio: 2 or 3 sentences, same style for everyone. Ask the brother first.
- Past positions: for example Secretary, Social Chair. Leave empty if none.
Empty fields show a soft "coming soon" line on the site, so nothing looks broken while you work.

**Add a photo.** In any form with a Photo field, press the photo box and upload a JPG. Use about 1600 pixels
on the long side. Member photos work best as portraits (taller than wide). Where there is a
"describe the photo" box, write one plain sentence about who and what is in it. That box is for screen readers.

**Add an event.** Open Upcoming events, add an item. Title and date are required. The date is the only
thing used to sort, soonest first.

**Add a news post.** Open News posts, add an item. Title is required. The newest date shows first.

**Add a Why Theta Xi quote.** Open Why Theta Xi quotes. One item per person: Brother or Alumnus, the quote,
their first and last name, and their class year (alumni can add what they do now). Only use words the person
gave you and approved. Never write a quote for someone.

## Turn on the Instagram feed (free)

The News page can show the chapter's latest Instagram posts using Behold, which has a free plan. The free plan
has a monthly limit on how many times the feed is viewed. If the limit is hit, the feed can stop showing until
the next month, so the **Follow on Instagram** button stays on the page either way. Check Behold's pricing page
for the current limits before you rely on it.

1. The chapter Instagram account must be a **Business or Creator** account. Switching is free in the Instagram
   app under Settings.
2. Make a free account at behold.so and connect the Instagram account.
3. Create a feed and a widget. Behold shows an embed code that looks like
   `<behold-widget feed-id="AbCd1234..."></behold-widget>`.
4. Copy only the part inside the quotes after `feed-id=`.
5. In the CMS open **Site settings** and paste it into **Behold feed ID**. Save.
6. Look at the News page in a minute or two. To turn the feed off, clear the box.

Facebook posts are the same as Instagram, so the site only uses Instagram.

## If you need to edit the files by hand

The same content lives in plain files in the `data` folder: `members.json`, `alumni-board.json`, `house.json`,
`quotes.json`, `events.json`, `news.json`, and `site.json`. They are lists of items. Rules:
- Keep every quote mark, comma, and bracket where it is. Only change the words between the quotes.
- Dates are written like `2026-11-14`.
- Photo paths look like `assets/images/first-last.jpg`, and the picture must be in `assets/images`.
- Do not put anything private in these files. The repo and site are public.

## Writing rules

- No em dashes. Use a period, comma, or colon.
- Short and specific beats long and fancy. Real numbers and names beat adjectives.
- No phone numbers or personal emails unless that person agreed to put them online.
- Mission statement, donor names, and alumni board details need chapter or alumni board approval before going live.

## Good to know

- The member, house, quote, event and news content loads when the page opens. If someone has JavaScript turned
  off, those parts show a short message instead.
- Saving in the CMS saves straight to the repo's branch. Check what you changed on the site afterward.
- The CMS works on whichever branch you pick. Make sure the `data` folder and `.pages.yml` are on `main`
  before the committee starts using it.
