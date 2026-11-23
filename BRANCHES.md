# Branch history and current state (updated 2026-11-23)

Read this before doing any Git work in this repo. It explains why there are 8 branches, which one is current, and what was done on 2026-11-23 so nobody redoes or undoes it.

## TL;DR

- **`launch-prep` is the current working branch.** Start all new work from it.
- **`main` is frozen on purpose** (still at `509ab93`, the Oct 7 first rebuild). It gets `launch-prep` merged in once in one PR, after the Writers tasks in the RAIL are done. Nothing is live from `main` yet: thetaxias.org still runs on GoDaddy, and GitHub Pages is not on.
- **Every other branch is fully contained in `launch-prep`.** Verified 2026-11-23 with `git rev-list --count origin/launch-prep..origin/<branch>` = 0 for all of them. They are kept only until the team has seen this note, then they will be deleted.

## Why this was needed

By early November the work was spread across six branches, and nothing after Oct 7 had reached `main`:

| Branch | What it held | Status on 2026-11-23 |
|---|---|---|
| `main` | Oct 7 first rebuild only | Untouched, frozen |
| `redesign` | Redesign up to Oct 8, plus the site map (`fc93c07`, Nov 2) | Behind `meeting-notes-pass`. Its only unique commit was the site map. Merged into `launch-prep`. |
| `scholarship-files` | PR #1 (RAIL 52, 14, 17) | Inside `meeting-notes-pass`, so inside `launch-prep` |
| `instagram-link` | PR #2 (RAIL 2) | Inside `meeting-notes-pass`, so inside `launch-prep` |
| `claude-rail-pass` | Share image, link previews, hero stripe fix (RAIL 51, 54) | Inside `meeting-notes-pass`, so inside `launch-prep` |
| `meeting-notes-pass` | Everything above + all Oct 19 meeting work: Why Theta Xi page, member cards, Meet the House, Pages CMS (`.pages.yml`, `data/*.json`, `HOWTO.md`) | Most complete branch before today. Inside `launch-prep` |
| `connor-rail-26-55` | Built on `meeting-notes-pass`. Mobile pass and nav contrast fix (RAIL 55, 60), then a fix so the Join link no longer hides behind the floating Menu button | Inside `launch-prep` |

The important catch: the RAIL said to "review the `redesign` branch and merge it", but `redesign` was 10 commits behind `meeting-notes-pass`. Merging `redesign` alone into `main` would have left out all the Oct 13 to Oct 19 work, including both PRs and the CMS setup.

## What was done on 2026-11-23

1. Audited every RAIL item against the actual code on every branch (not against the RAIL's Status column).
2. Committed and pushed some mobile and contrast work that was sitting uncommitted on a laptop (`connor-rail-26-55`).
3. Fixed the mobile menu so the Join button is never covered by the floating Menu button. Tested at 320 to 1366 px wide: no sideways scrolling on any of the 8 pages, no script errors.
4. Created `launch-prep` from `connor-rail-26-55` and merged `redesign` into it (for the site map). Zero conflicts.
5. Checked `launch-prep` contains every commit from every branch. It does.

Nothing was merged into `main`. Nothing was deleted. No GoDaddy or DNS settings were touched.

## Rules for anyone (person or AI agent) working here

- Branch from `launch-prep`, and open PRs into `launch-prep`, not `main`.
- Do not merge into `main` until the team agrees the Writers content is in.
- Do not delete branches. The old ones will be removed together once everyone has read this.
- Pages CMS can point at `launch-prep` (see `HOWTO.md`), so content can be entered there before launch.
- PR #1 and PR #2 are superseded: their commits are already in `launch-prep`. They close when the old branches are deleted or when `launch-prep` reaches `main`.
- The launch plan for RAIL 26 (GitHub Pages + GoDaddy DNS) was written and shared with the team separately. It is not in this repo.

## Known open items that affect launch

- Contact and Join forms still have `action="#"` and send nowhere (RAIL 20, 58).
- `baseline/` is a saved copy of the old GoDaddy site. When GitHub Pages is turned on, it will be published as live pages, so decide before then whether to remove it from the launch branch (it stays in Git history either way).
- `docs/site-map.html` was generated from `redesign`, so it does not show the Why Theta Xi page or the `data/` files. Refresh it or remove it.
- The repo and the GitHub Pages domain verification are on a personal account. The plan is to move the repo to a chapter GitHub organization before launch so it can be handed down each year.
