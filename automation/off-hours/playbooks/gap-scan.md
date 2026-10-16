# Night-Shift Job: Weekly IBM Maximo Change & Coverage-Gap Scan (DOC00)

You are running unattended inside `/root/themaximoguys-blog`. Once a week this job refreshes
`knowledge_base/DOC00_MAXIMO_CHANGES_AND_COVERAGE_GAPS.md`. DOC00 is the living appendix that
records what changed at IBM (Maximo / MAS / related AI) and which topics the blog does not cover yet.

## Hard rules (violations = failed job)

1. **Never publish or sync** (no Sanity, no LinkedIn, no `git push`). A local `git commit` is allowed.
2. **Do not write blog posts, images, or queue items.** Only DOC00 changes. Proposed series go in
   DOC00 §5 as *proposals*. A human approves them before anything is queued.
3. **Do not fabricate.** Every new change entry needs a source URL, a date, and a tag:
   `[IBM]` (vendor), `[IND]` (independent) or `[UNVERIFIED]`. If you cannot verify a claim, leave it out
   or tag it `[UNVERIFIED]`.
4. Edit DOC00 in place: preserve its structure, keep all history in §6 (Changelog), and never delete
   past entries from §2 (Change Log). Mark superseded items instead of removing them.
5. Only modify `knowledge_base/DOC00_MAXIMO_CHANGES_AND_COVERAGE_GAPS.md`.

## Step 1 — Read the current state

1. Read DOC00 completely. Note its "Last scan" date. Your search window is from that date until today.
2. Build the coverage list: the `title:` and `date:` of every `posts/**/*.mdx`, and the series directory names.
3. Skim the headings of `knowledge_base/DOC*.md` and `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`,
   so you don't report already-covered or already-planned topics as gaps.

## Step 2 — Research what changed since the last scan

Run web searches (8–15 queries) across these sources:
- IBM newsroom, ibm.com/products/maximo, IBM announcement letters, the IBM support lifecycle pages;
- MAS / Manage / Mobile what's-new and fix readmes on IBM Docs (if WebFetch returns 403, use curl with a
  browser User-Agent against `https://www.ibm.com/docs/api/v1/content/<path>`);
- github.com/ibm-mas releases (mas-devops, cli, maf-local-dev-mode);
- MaximoSecrets, MoreMaximo, the IBM Community, TRM, MRM-EAM, Interloc and BPD Zenith/Naviam;
- trade press, and analyst press releases.

Cover these areas:
- releases and patches;
- lifecycle and end-of-support;
- licensing and AppPoints;
- AI and agentic work (Maximo AI Service, Assistant, MCP, watsonx Orchestrate, Bob);
- mobile and MAF;
- industry solutions;
- security bulletins;
- install and ops tooling;
- competitor moves that shape the narrative.

## Step 3 — Update DOC00

- **§1 Snapshot:** set the "Last scan" date to today and refresh the top-5 headline changes and top-5 gaps.
- **§2 Change Log:** append new dated entries, newest first, in the existing table format.
- **§3 Coverage Matrix:** for each tracked area, set the coverage status (COVERED / PARTIAL / NOT COVERED /
  PLANNED) using the post titles from Step 1. Add new areas you discovered.
- **§4 Ranked Gaps:** re-rank by demand × fit × freshness. Keep the stable ids (`GAP-###`), and add new ids
  for new gaps. When a gap becomes covered by posts, mark it `CLOSED (date, series)`.
- **§5 Series Proposals:** you may add or refine a proposal for any top-5 gap that has none. Use the existing
  format (folder, parts table, cover style, tier, sources), marked `PROPOSED — not queued`.
- **§6 Changelog:** add one line: date, what changed, and the counts of new changes and new/closed gaps.

## Step 4 — Commit and report

`git add knowledge_base/DOC00_MAXIMO_CHANGES_AND_COVERAGE_GAPS.md && git commit -m "night-shift: weekly gap-scan — <N> changes, <M> new gaps"`

Finish by printing exactly one line:
`NIGHT-SHIFT-RESULT: SUCCESS gap-scan <N> new changes, <M> new gaps, <K> closed`
or, if you could not complete the job,
`NIGHT-SHIFT-RESULT: FAILURE <reason>`.
