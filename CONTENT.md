# Editing content

Quick guide for the things on the site that move or need care. You only ever edit HTML text. Don't touch `js/site.js` for content changes.

## Photos
- Save the photo in `assets/images/` (JPG, about 1600px on the long side is plenty).
- Find the navy "Photo: ..." box on the page. The comment above it has the exact line to paste in.
- Want the blue duotone look (like the Home and Scholarships photos)? Use `class="photo duotone"`. It shows full color on hover.

## The names ticker (Home page)
- Each moving row is one `<ul>` of `<li>` names in `index.html`. Add or remove `<li>` lines. That's it.
- Don't copy the list to make the loop. The script does that for you.
- Only use names that are public or approved. **Donor names need alumni board sign-off and an opt-out before they go up** (RAIL item 33).

## Stats and count-ups
- Numbers like `<strong data-countup>$50K</strong>` animate up to whatever you write. Change the text, nothing else.
- Use exact or clearly approximate numbers ("~$200K"). Don't put a count-up on an approximate number.

## Owners
- Donor list: treasurer and alumni board, reviewed every semester.
- Scholarship numbers: scholarship chairman.
- Photos: shared Drive folder (RAIL item 25).

## House rules
- No em dashes in site text. Use a period, comma or colon.
- Colors, fonts and spacing live at the top of `css/styles.css`. Motion lives in the "MOTION AND PHOTO TREATMENT" section at the bottom.

## Writing for the site (writers start here)
Your tasks are in the RAIL with "Writers" in the "Working on it" column. Send finished text to whoever is editing the site, or edit the HTML yourself.
- **Short beats long.** Headlines 8 words or fewer. The text under a headline: 25 words or fewer. Home hero intro: 20 words max.
- **Plain and specific.** Real numbers, names and years ("$49,975 last year") beat adjectives ("amazing", "elevate", "unparalleled").
- **One voice.** Confident and warm, like a brother talking to an alumnus or a parent. No slang, no corporate filler.
- **No em dashes or en dashes.** Use a period, comma or colon. Use a plain hyphen for ranges (2026-27).
- **Same template for repeated things.** Every bio, event or news post follows the same pattern as the others on that page.
- **Alt text** for photos: one plain sentence saying who and what is in the photo. Don't start with "Image of".
- **No private info.** No phone numbers, personal emails or anything a brother hasn't agreed to put online. This repo and site are public.
- **Approval:** the mission statement, donor names and alumni board details need chapter or alumni board sign-off before they go live.
