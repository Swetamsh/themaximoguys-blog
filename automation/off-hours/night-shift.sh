#!/usr/bin/env bash
# ============================================================================
# night-shift.sh — TheMaximoGuys off-hours blog production runner
#
# Runs from cron hourly between 23:00 and 06:00. Each invocation:
#   1. Verifies it is inside the night window (else exits silently)
#   2. Acquires a lockfile (skips if another run is active; clears stale locks)
#   3. Picks exactly ONE pending item from queue.json (lowest priority number,
#      then file order)
#   4. Builds a job prompt from the matching playbook + item JSON
#   5. Invokes headless Claude Code (claude -p) to do the work
#   6. Marks the item done/failed and logs the outcome
#
# Usage:
#   ./night-shift.sh                # normal run (cron)
#   ./night-shift.sh --dry-run      # show which item would run, do nothing
#   ./night-shift.sh --force        # ignore the time window (manual testing)
#
# Env overrides:
#   NIGHT_SHIFT_MODEL    model for headless runs (default: sonnet)
#   NIGHT_SHIFT_TIMEOUT  hard wall-clock cap per job (default: 50m)
# ============================================================================
set -uo pipefail

REPO="/root/themaximoguys-blog"
DIR="$REPO/automation/off-hours"
QUEUE="$DIR/queue.json"
LOCK="$DIR/.night-shift.lock"
LOG="$REPO/logs/night-shift.log"
CLAUDE_BIN="/root/.local/bin/claude"
MODEL="${NIGHT_SHIFT_MODEL:-sonnet}"
JOB_TIMEOUT="${NIGHT_SHIFT_TIMEOUT:-50m}"

DRY_RUN=false
FORCE=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --force)   FORCE=true ;;
  esac
done

mkdir -p "$REPO/logs"
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG"; }

# --- 1. Time window guard: 23:00 <= now < 06:00 -----------------------------
HOUR=$(date +%H)
if ! $FORCE && ! $DRY_RUN; then
  if [ "$HOUR" -lt 23 ] && [ "$HOUR" -ge 6 ]; then
    exit 0  # outside night window — silent no-op
  fi
fi

# --- 2. Lockfile (mkdir is atomic); clear locks older than 3h ---------------
if [ -d "$LOCK" ]; then
  LOCK_AGE=$(( $(date +%s) - $(stat -c %Y "$LOCK") ))
  if [ "$LOCK_AGE" -gt 10800 ]; then
    log "WARN stale lock (${LOCK_AGE}s old) — clearing"
    rm -rf "$LOCK"
  else
    log "SKIP another night-shift run is active (lock age ${LOCK_AGE}s)"
    exit 0
  fi
fi
if ! $DRY_RUN; then
  mkdir "$LOCK" || { log "SKIP failed to acquire lock"; exit 0; }
  trap 'rm -rf "$LOCK"' EXIT
fi

# --- 3. Pick one pending item (lowest priority, then file order) ------------
ITEM=$(jq -c '[.items[] | select(.status == "pending")] | sort_by(.priority) | .[0] // empty' "$QUEUE")
if [ -z "$ITEM" ]; then
  # Queue drained: run a replan job (max once per night) that audits knowledge_base +
  # content-planning against posts/ and refills the queue until the plan is fulfilled.
  REPLAN_STAMP="$DIR/.last-replan"
  if [ -f "$REPLAN_STAMP" ] && [ $(( $(date +%s) - $(stat -c %Y "$REPLAN_STAMP") )) -lt 64800 ]; then
    log "DONE queue empty — replan already ran in the last 18h"
    exit 0
  fi
  $DRY_RUN || touch "$REPLAN_STAMP"
  ITEM='{"id":"replan-'"$(date +%Y%m%d)"'","type":"replan"}'
fi
ITEM_ID=$(jq -r '.id' <<<"$ITEM")
ITEM_TYPE=$(jq -r '.type' <<<"$ITEM")

if $DRY_RUN; then
  echo "DRY-RUN would process:"
  jq . <<<"$ITEM"
  exit 0
fi

mark_status() {
  local id="$1" status="$2" note="${3:-}"
  local tmp
  tmp=$(mktemp)
  jq --arg id "$id" --arg st "$status" --arg note "$note" --arg ts "$(date -Iseconds)" \
     '(.items[] | select(.id == $id)) |= (.status = $st | .updated = $ts | if $note != "" then .note = $note else . end)' \
     "$QUEUE" > "$tmp" && mv "$tmp" "$QUEUE"
}

# --- 4. Build job prompt from playbook + item JSON --------------------------
case "$ITEM_TYPE" in
  blog-post)   PLAYBOOK="$DIR/playbooks/blog-post.md" ;;
  cover-batch) PLAYBOOK="$DIR/playbooks/cover-batch.md" ;;
  replan)      PLAYBOOK="$DIR/playbooks/replan.md" ;;
  *) log "FAIL $ITEM_ID unknown item type '$ITEM_TYPE'"; mark_status "$ITEM_ID" failed "unknown type"; exit 1 ;;
esac

PROMPT="$(cat "$PLAYBOOK")

## Your assigned work item (JSON)

\`\`\`json
$ITEM
\`\`\`"

# --- 5. Run headless Claude Code ---------------------------------------------
log "START $ITEM_ID ($ITEM_TYPE) model=$MODEL timeout=$JOB_TIMEOUT"
mark_status "$ITEM_ID" in_progress

# cron has a bare env: give claude + skills what they need
export HOME=/root
export PATH="/root/.local/bin:/usr/local/bin:/usr/bin:/bin"
export IS_SANDBOX=1  # required: --dangerously-skip-permissions is blocked for root without this
set -a; [ -f /root/.claude-pai/.env ] && . /root/.claude-pai/.env; set +a
cd "$REPO"

JOB_LOG="$REPO/logs/night-shift-${ITEM_ID}-$(date +%Y%m%d-%H%M%S).log"
timeout "$JOB_TIMEOUT" "$CLAUDE_BIN" -p "$PROMPT" \
  --dangerously-skip-permissions \
  --model "$MODEL" \
  --output-format text \
  > "$JOB_LOG" 2>&1
EXIT_CODE=$?

# --- 6. Verify + mark ---------------------------------------------------------
if [ $EXIT_CODE -eq 0 ] && grep -q "NIGHT-SHIFT-RESULT: SUCCESS" "$JOB_LOG"; then
  ARTIFACT=$(grep "NIGHT-SHIFT-RESULT: SUCCESS" "$JOB_LOG" | tail -1 | sed 's/.*SUCCESS //')
  mark_status "$ITEM_ID" done "$ARTIFACT"
  log "OK    $ITEM_ID -> $ARTIFACT (log: $(basename "$JOB_LOG"))"
else
  mark_status "$ITEM_ID" failed "exit=$EXIT_CODE, see $(basename "$JOB_LOG")"
  log "FAIL  $ITEM_ID exit=$EXIT_CODE (log: $(basename "$JOB_LOG")) — will NOT retry automatically; reset status to pending to retry"
fi
exit 0
