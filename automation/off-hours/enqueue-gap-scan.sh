#!/usr/bin/env bash
# Weekly: enqueue one gap-scan item so the next night-shift tick refreshes
# knowledge_base/DOC00_MAXIMO_CHANGES_AND_COVERAGE_GAPS.md. Idempotent per day.
set -euo pipefail
QUEUE="$(cd "$(dirname "$0")" && pwd)/queue.json"
ID="gap-scan-$(date +%Y%m%d)"
if jq -e --arg id "$ID" '.items[] | select(.id == $id)' "$QUEUE" >/dev/null; then
  echo "$(date -Iseconds) $ID already queued"; exit 0
fi
tmp=$(mktemp)
jq --arg id "$ID" --arg ts "$(date -Iseconds)" \
  '.items += [{"id":$id,"type":"gap-scan","priority":1,"status":"pending","updated":$ts}]' \
  "$QUEUE" > "$tmp" && mv "$tmp" "$QUEUE" && chmod 600 "$QUEUE"
echo "$(date -Iseconds) queued $ID"
