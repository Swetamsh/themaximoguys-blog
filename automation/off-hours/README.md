# Off-Hours Night Shift — Automated Blog Production

Autonomous blog production between **23:00 and 06:00** so daytime Claude usage stays free
for interactive work. A cron job ticks hourly in the window; each tick processes exactly
**one** queue item with a headless Claude Code run.

## How it works

```
cron (hourly 23:10–05:10)
  └─ night-shift.sh
       ├─ window guard (23:00–06:00 only) + lockfile (no overlap, stale-lock cleanup)
       ├─ picks 1 pending item from queue.json (lowest priority number first)
       ├─ builds prompt = playbooks/{type}.md + item JSON
       ├─ claude -p --dangerously-skip-permissions --model sonnet --max-turns 80
       ├─ success detection: job must print "NIGHT-SHIFT-RESULT: SUCCESS ..."
       └─ marks item done/failed; logs to logs/night-shift.log + per-job logs
```

Item types:
- **blog-post** → full MDX post (draft: true) + its 16:9 cover via the assigned style skill
- **cover-batch** → missing covers for an existing series, one style per series

Cover style rotation (never raw/basic generation, never Flash tier — always nanobanana
**Pro / 2k / thinking high / 16:9**):

| Style | Used for |
|---|---|
| SketchNote | primary — sketched-pager visual metaphors (Assist, Supply Chain, Parts ID) |
| DanKoeStyle | frameworks / mental models (Reliability, Databricks strategy posts) |
| InfoBlocks | 3D isometric — corporate/model topics (Optimizer, governance posts) |
| BlueprintBoard | engineering/architecture topics (Nuclear, data-flow posts) |

## Operating it

```bash
# See what would run next (no side effects)
automation/off-hours/night-shift.sh --dry-run

# Run one item right now, ignoring the time window
automation/off-hours/night-shift.sh --force

# Pause the whole system
crontab -e   # comment out the night-shift line

# Retry a failed item
jq '(.items[] | select(.id=="ITEM_ID")).status = "pending"' automation/off-hours/queue.json > /tmp/q && mv /tmp/q automation/off-hours/queue.json

# Add work: append an object to .items[] in queue.json (see existing items for fields)
```

Config via env (set in crontab line if desired):
- `NIGHT_SHIFT_MODEL` — default `sonnet` (cheaper overnight drafting; set `opus` for hard posts)
- `NIGHT_SHIFT_TIMEOUT` — default `50m` hard cap per job

## Guardrails

- Posts are created with `draft: true`; **nothing is ever synced to Sanity or LinkedIn**
  automatically — morning review then `npm run sync` stays a human decision.
- One item per hour caps token burn; failed items are NOT auto-retried.
- Jobs commit locally (`night-shift:` prefix) so morning review is a simple `git log`/diff.
- Per-job transcripts land in `logs/night-shift-<item>-<timestamp>.log`.

## Morning review checklist

1. `tail -40 logs/night-shift.log` — what ran, what failed
2. `git log --oneline --since=yesterday` — review night-shift commits
3. Open new posts, review content, flip `draft: false` when approved
4. `npm run sync` to publish approved posts
