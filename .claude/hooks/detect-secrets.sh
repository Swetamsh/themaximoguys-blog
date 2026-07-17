#!/usr/bin/env bash
#
# PreToolUse/Write secret scanner for Claude Code.
# Reads the hook JSON payload on stdin, extracts the file content being
# written, and blocks (exit 2) if it contains a hardcoded secret.
#
# Mirrors the git pre-commit guard (scripts/git-hooks/pre-commit) so both
# the Claude write path and the git commit path are covered.
# Env-var references like "${FOO}" / "$FOO" are intentionally allowed.

input="$(cat)"

content="$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("content",""))' 2>/dev/null || true)"
file="$(printf '%s' "$input" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("file_path", d.get("filePath","")))' 2>/dev/null || true)"

[ -z "$content" ] && exit 0

# High-signal literal secrets + keyword="value" assignments whose value does
# NOT start with $ (so ${ENV_VAR} / $VAR references pass).
read -r -d '' PATTERN <<'EOF' || true
AIzaSy[0-9A-Za-z_-]{33}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{36,}|xox[baprs]-[0-9A-Za-z-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|(api[_-]?key|password|secret|token|bearer)["']?[[:space:]]*[=:][[:space:]]*["'][^"'$][^"']{7,}
EOF

if printf '%s' "$content" | grep -qEi -- "$PATTERN"; then
  echo "BLOCKED: Potential hardcoded secret detected in write to $file" >&2
  echo "Use \${ENV_VAR} and keep the real value in /root/.claude-pai/.env" >&2
  exit 2
fi

exit 0
