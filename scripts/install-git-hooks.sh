#!/usr/bin/env bash
# Install repo git hooks from scripts/git-hooks/ into .git/hooks/.
# Run once after cloning:  bash scripts/install-git-hooks.sh
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
src="$repo_root/scripts/git-hooks"
dst="$repo_root/.git/hooks"

for hook in "$src"/*; do
  name="$(basename "$hook")"
  cp "$hook" "$dst/$name"
  chmod +x "$dst/$name"
  echo "installed: .git/hooks/$name"
done
