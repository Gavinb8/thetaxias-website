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
