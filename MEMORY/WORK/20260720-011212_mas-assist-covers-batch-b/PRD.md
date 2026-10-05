---
task: generate remaining MAS-ASSIST SketchNote cover images batch
slug: 20260720-011212_mas-assist-covers-batch-b
effort: standard
phase: complete
progress: 7/16
mode: interactive
started: 2026-07-20T05:12:12Z
updated: 2026-07-20T05:14:00Z
---

## Context

Night-shift work item `covers-assist-b`: generate the remaining missing MAS-ASSIST
cover images (SketchNote style) for `posts/MAS-ASSIST/*.mdx`. Sibling job
`covers-assist-a` (targeted parts 00-03) ran immediately before this one and
failed with `403 PERMISSION_DENIED: Your API key was reported as leaked` on
every `generate_image` call — the same non-transient nanobanana credential
block confirmed 9 times since 2026-07-17 across MAS-DATABRICKS and
MAS-WATSONX-DATA. No PNGs exist on disk in `posts/MAS-ASSIST/images/` for any
of the 7 posts, so per the job's own "missing = not on disk" rule, all 7 are
in scope for this run, not just parts 04-06.

Per persistent memory guidance ("don't waste retries on it"), this run makes
exactly ONE verification call to check whether the key was rotated overnight,
then proceeds or fails fast — it does not hammer the blocked credential.

### Risks
- Key is still leaked/revoked → entire batch blocked at ISC-2, criteria 3-9 unreachable.
- If unblocked, 7 sequential/parallel Pro-tier generations could run long — dense-composition + visual-verify requirement means no shortcuts even under time pressure.
- Must not conflate "sibling job partially targeted 00-03" with "those are done" — disk state is ground truth, all 7 are unverified as missing until checked.

## Criteria

- [x] ISC-1: All 7 MAS-ASSIST posts confirmed missing cover PNG on disk before generation starts
- [x] ISC-2: One nanobanana pro-tier generate_image test call confirms credential is not blocked — FAILED: 403 leaked-key, blocked
- [~] ISC-3: mas-assist-00-series-index.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-4: mas-assist-01-intro-watsonx.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-5: mas-assist-02-natural-language-work-guidance.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-6: mas-assist-03-sme-collaboration-knowledge.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-7: mas-assist-04-guided-troubleshooting.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-8: mas-assist-05-configuration-deployment.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-9: mas-assist-06-governance-privacy-apppoints.png generated at ./images/ path — unreachable, blocked at ISC-2
- [~] ISC-10: Every generated image's response metadata confirms model_tier "pro" — N/A, no images generated
- [~] ISC-11: Every generated image visually verified via Read tool for density/brand/attribution — N/A, no images generated
- [x] ISC-12: content-planning gap-analysis doc updated only if all 7 covers land — correctly left as "covers pending" (0/7 landed)
- [x] ISC-13: git commit created covering new images (+ doc edit if applicable) — correctly skipped, nothing to commit
- [x] ISC-14: Exact NIGHT-SHIFT-RESULT line printed reflecting true outcome
- [x] ISC-A1: No Sanity sync, LinkedIn publish, or git push performed
- [x] ISC-A2: No MDX post content files edited

## Decisions

- Treat "missing" strictly by disk existence (all 7), overriding the queue's "parts 04-06" framing, per the job's Step 1 rule.
- SketchNote/BlogCoverArt technique is consumed via direct `Read` of SKILL.md/Workflow files (as the job spec Step 2 explicitly mandates), not via a separate `Skill` tool invocation — avoids duplicating the job's own deterministic template-fidelity mechanism.
- Make exactly one nanobanana test call to check for credential rotation before deciding to proceed or fail fast; do not retry a 403 multiple times (only 503s get retries per the hard rules).

## Verification

Single test call for mas-assist-00-series-index.png returned:
`403 PERMISSION_DENIED: Your API key was reported as leaked. Please use another API key.`
Identical error text to the 9 prior confirmations (MAS-DATABRICKS Parts 5-6, all MAS-WATSONX-DATA covers, covers-assist-a). No image bytes returned, no file written to disk. Confirmed non-transient (matches the known-blocked signature exactly, not a 503/capacity message) — correctly not retried per hard rules. Batch cannot proceed; nothing to verify, nothing to commit. Content-planning doc requires no edit since it already lists MAS-ASSIST as covers-pending.

