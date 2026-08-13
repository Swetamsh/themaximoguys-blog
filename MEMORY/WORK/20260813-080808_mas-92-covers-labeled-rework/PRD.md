---
task: Rework MAS 9.2 covers with real readable labels
slug: 20260813-080808_mas-92-covers-labeled-rework
effort: advanced
phase: verify
progress: 26/27
mode: interactive
started: 2026-08-13T08:08:08-04:00
updated: 2026-08-13T08:33:00-04:00
iteration: 3
---

## Context

The eight MAS 9.2 covers in `posts/MAS-9-2/images/` were generated 2026-08-12 in the
approved warm-chalkboard style. Swetansh's verdict today: they read as **stale** and the
concepts are **not understandable** because there are **no labels**.

Verified by viewing `mas-92-00-series-index.png` and `mas-92-02-version-comparison.png`:
every board panel is filled with **squiggle placeholder marks and tally strokes** plus
generic icons (gear, robot, cloud, database, warning triangle). The scene is handsome and
the style is right — but it carries zero information. Cover 02 is literally titled "Three
Versions, One Table" and its three columns have scribbles where 9.0 / 9.1 / 9.2 should be.

**Root cause:** the previous run over-corrected. To stop the model hallucinating misspelled
words, the prompts banned all text except the title — see [[warm_chalkboard_cover_style]]
prompt trap #1. Banning text removed the hallucination risk *and* the meaning.

**The fix is the opposite constraint, not a looser one:** enumerate the exact label strings
that must appear, in an explicit closed list, and forbid any word outside that list. That
controls spelling *and* delivers concept.

Every label string below was pulled from the post's own headings/tables, not invented.

### Plan

1. Archive all 8 originals to `images/_archive/20260813-unlabeled/` (sync resolves covers
   by explicit frontmatter path only — verified in `scripts/sync-blog-to-sanity.ts:132-190`
   — so a subfolder there is inert).
2. Regenerate under the same 8 filenames so no MDX edit is needed.
3. Generate cover 00 first, view it, confirm the label treatment lands, then batch 01-07.
4. View every rendered PNG at full size before declaring done.

### Label sets (closed lists — nothing outside these strings)

- **00** "MAS 9.2 — THE GROUNDED READ": WHAT IT IS / 9.0 vs 9.1 vs 9.2 / INSIDE MANAGE /
  OUTSIDE MANAGE / AI LAYER / UPGRADE RISK / DO YOU QUALIFY
- **01** "WHAT 9.2 ACTUALLY IS": 25 JUNE 2026 / FEATURE CHANNEL / SUPPORT CYCLE-3 /
  8.x PAST END OF SUPPORT / SPCR
- **02** "THREE VERSIONS, ONE TABLE": 9.0 / 9.1 / 9.2 / AI / ABSENT / ASSISTIVE / AGENTIC /
  JAVA / NOT STATED / JAVA 17 / JAVA 25  (facts verified at post 02 lines 96, 286)
- **03** "INSIDE MANAGE 9.2": TICKETS / ALERTS / AI INSIGHTS / COLLABORATE / CALIBRATION /
  TIME ZONES / JAVA 25
- **04** "THE REST OF MAS 9.2": MONITOR / MVI / HEALTH / PREDICT / MAXIMO IT /
  REAL ESTATE / HSE / AIP
- **05** "THE AI LAYER, TIERED": DOCUMENTED / ANNOUNCED ONLY (**two** tier bands, corrected
  mid-flight — post 05 lines 82-83 define exactly two tiers, a third was my invention) +
  MCP SERVER / AGENTIC ASSISTANT / ALERT INSIGHTS / RAG LEASES (tier 1) +
  CONDITION INSIGHT / FIELD SERVICE AI / INCIDENT CLASSIFICATION (tier 2)
- **06** "RANKED BY HOW BADLY IT BITES": 1 DB2 12 LICENCE / 2 USER APIS GONE /
  3 ADD-ON PARITY / 4 SCIM / 5 ONE-WAY SETTINGS / 6 JAVA 25 / 7 MVI GPUS / 8 THE SMALL ONES
- **07** "DO YOU ACTUALLY QUALIFY?": CAN YOU MOVE? / SHOULD YOU MOVE? / GO / WAIT / STOP

### Risks

- Hallucinated spelling is the known failure mode — mitigated by closed lists + full-size view.
- Too many labels turns a cover into an infographic, violating the 80/20 visual rule.
  Mitigation: labels live on the drawn board *inside* the scene, people stay the subject.
- nanobanana Pro 503s under load — retry, never fall back to Flash.

## Criteria

- [x] ISC-1: All 8 original covers moved to `_archive/20260813-unlabeled/`
- [x] ISC-2: Archive folder carries README stating why
- [x] ISC-3: All 8 new files reuse the exact original filenames
- [x] ISC-4: No MDX file modified by this task
- [x] ISC-5: Every cover is 16:9 landscape
- [x] ISC-6: Every cover carries @themaximoguys bottom-right
- [x] ISC-7: Every cover keeps espresso #2A1D14 ground
- [x] ISC-8: Every cover generated at model_tier pro
- [x] ISC-9: Cover 00 shows its 7 part labels legibly
- [x] ISC-10: Cover 01 shows its 5 lifecycle labels legibly
- [x] ISC-11: Cover 02 shows 9.0 / 9.1 / 9.2 column heads legibly
- [x] ISC-12: Cover 02 shows the AI row values legibly
- [x] ISC-13: Cover 02 shows the Java row values legibly
- [x] ISC-14: Cover 03 shows its 7 Manage feature labels legibly
- [x] ISC-15: Cover 04 shows its 8 product labels legibly
- [x] ISC-16: Cover 05 shows **two** evidence-tier band labels legibly (criterion itself was
      wrong — said three; post 05 defines only Tier 1 documented and Tier 2 announced)
- [x] ISC-17: Cover 05 shows its 7 AI feature labels legibly, each exactly once
- [x] ISC-18: Cover 06 shows numbered ranking 1 through 8
- [x] ISC-19: Cover 06 shows the eight risk labels legibly
- [x] ISC-20: Cover 07 shows both gate question labels legibly
- [x] ISC-21: Cover 07 shows GO / WAIT / STOP verdict labels
- [x] ISC-22: Each of the 8 covers viewed full-size after generation
- [x] ISC-23: People-thinking composition retained on every cover
- [x] ISC-24: Camera angle or room varies across the eight covers
- [ ] ISC-A1: No squiggle or tally placeholder marks anywhere — **7 of 8 clean. Cover 01 keeps
      faint squiggle texture on the pinboard at the extreme left edge.** Dim and peripheral,
      reads as distant paper rather than a fake label, but it is technically a violation and
      is left open rather than papered over.
- [x] ISC-A2: No word appears outside the enumerated label set
- [x] ISC-A3: No cover becomes a bullet-list infographic

## Decisions

- **Inverted the text constraint rather than loosening it.** The previous run banned all board
  text to stop hallucinated spelling; that also removed all meaning. The fix is a *closed list*:
  enumerate the exact allowed strings, forbid every word outside the list, and separately ban
  squiggles / tally marks / fake illegible handwriting with "blank chalk space is better than a
  scribble." Zero misspellings across 8 covers and 60+ labels.
- **Verified facts against the posts before lettering them.** Cover 02's Java and AI rows came
  from post 02 lines 96/286. Cover 05's tiers came from post 05 lines 82-83 — which caught that
  my own planned third tier band did not exist.
- **Never ask for an object "in transit."** Cover 05 v1 asked for a card caught mid-air in a
  figure's hand; the model gave that card a real label, duplicating CONDITION INSIGHT. v2 removed
  the mid-air card, pinned every card inside its band, and stated the exact card count.

## Verification

All 8 regenerated at `model_tier: pro` / `gemini-3-pro-image-preview` / 2k / 16:9, 2752x1536,
each written to its original filename. All 8 viewed at full size — labels read as intended:

| # | Labels rendered | Verdict |
|---|---|---|
| 00 | 7 part labels | clean |
| 01 | 8.x PAST END OF SUPPORT / 25 JUNE 2026 / FEATURE CHANNEL / SUPPORT CYCLE-3 / SPCR | correct; faint edge texture (ISC-A1) |
| 02 | 9.0 / 9.1 / 9.2 · ABSENT / ASSISTIVE / AGENTIC · NOT STATED / JAVA 17 / JAVA 25 | clean |
| 03 | TICKETS / ALERTS / AI INSIGHTS / COLLABORATE / CALIBRATION / TIME ZONES / JAVA 25 | clean |
| 04 | MONITOR / MVI / HEALTH / PREDICT / MAXIMO IT / REAL ESTATE / HSE / AIP | clean |
| 05 | DOCUMENTED + 4 cards · ANNOUNCED ONLY + 3 cards | clean after v2 |
| 06 | 1-8 numbered watchlist rows | clean |
| 07 | CAN YOU MOVE? / SHOULD YOU MOVE? / GO / WAIT / STOP | clean |

`git status posts/MAS-9-2/` shows 8 modified PNGs and the untracked `_archive/` — no MDX touched.
Sync resolves covers by explicit frontmatter path only, so `_archive/` inside `images/` is inert.
