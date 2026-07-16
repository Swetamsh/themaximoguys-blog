#!/usr/bin/env bash
#
# new-issue.sh — scaffold a new newsletter issue (monthly or weekly)
#
# Usage:
#   ./SocialMedia/EmailNewsletter/Scripts/new-issue.sh NUMBER SLUG [TYPE]
#
# Examples:
#   ./SocialMedia/EmailNewsletter/Scripts/new-issue.sh 001 april-30-cliff
#   ./SocialMedia/EmailNewsletter/Scripts/new-issue.sh W-18 week-of-apr-20 weekly
#
# Creates:
#   Content/Editions/NNN-slug/
#     DRAFT.md          (from template with placeholders substituted)
#     assets/           (for images referenced in the issue)
#     SOURCES.md        (blank fact-check trail)

set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Usage: $0 NUMBER SLUG [monthly|weekly]"
  echo "  NUMBER: issue number (e.g., 001, 002, W-18)"
  echo "  SLUG:   kebab-case slug (e.g., april-30-cliff)"
  echo "  TYPE:   monthly (default) | weekly"
  exit 1
fi

NUMBER="$1"
SLUG="$2"
TYPE="${3:-monthly}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NEWSLETTER_DIR="$(dirname "$SCRIPT_DIR")"

case "$TYPE" in
  monthly) TEMPLATE="$NEWSLETTER_DIR/Content/Templates/monthly-issue.md" ;;
  weekly)  TEMPLATE="$NEWSLETTER_DIR/Content/Templates/weekly-wire.md" ;;
  *)
    echo "Unknown type: $TYPE (use 'monthly' or 'weekly')"
    exit 1
    ;;
esac

if [ ! -f "$TEMPLATE" ]; then
  echo "Template not found: $TEMPLATE"
  exit 1
fi

ISSUE_DIR="$NEWSLETTER_DIR/Content/Editions/${NUMBER}-${SLUG}"

if [ -d "$ISSUE_DIR" ]; then
  echo "Issue already exists: $ISSUE_DIR"
  exit 1
fi

mkdir -p "$ISSUE_DIR/assets"

# Substitute placeholders
TODAY=$(date +%Y-%m-%d)
SEND_DATE=$(date -d "+14 days" +%Y-%m-%d 2>/dev/null || date -v+14d +%Y-%m-%d)

sed -e "s|{{NUMBER}}|$NUMBER|g" \
    -e "s|{{SLUG}}|$SLUG|g" \
    -e "s|{{WEEK_NUMBER}}|$NUMBER|g" \
    -e "s|{{SUBJECT_LINE}}|TODO: write subject line|g" \
    -e "s|{{PREHEADER_140_CHARS}}|TODO: write preheader (140 chars max)|g" \
    -e "s|{{ONE_LINE_TEASER}}|TODO: one-line teaser|g" \
    -e "s|YYYY-MM-DD|$SEND_DATE|g" \
    "$TEMPLATE" > "$ISSUE_DIR/DRAFT.md"

cat > "$ISSUE_DIR/SOURCES.md" <<EOF
# Sources — Issue #$NUMBER ($SLUG)

Fact-check trail for every claim in DRAFT.md. Every link in the final
issue must trace to a citation here.

## Research briefings used
- \`../../../Research/$(date +%Y-%m)/perplexity.md\`
- \`../../../Research/$(date +%Y-%m)/grok.md\`
- \`../../../Research/$(date +%Y-%m)/claude.md\`

## Primary sources cited

| Claim | Section | Source URL | Verified |
|---|---|---|---|
|   |   |   |   |

## Unverified claims (flagged)

-
EOF

echo "✅ Created issue scaffold:"
echo "   $ISSUE_DIR/"
echo ""
echo "Next steps:"
echo "  1. Read $NEWSLETTER_DIR/Research/$(date +%Y-%m)/ if research is done"
echo "     (if not, see $NEWSLETTER_DIR/Scripts/gather-research.md first)"
echo "  2. Edit $ISSUE_DIR/DRAFT.md"
echo "  3. Fill $ISSUE_DIR/SOURCES.md as you cite"
echo "  4. When ready: change frontmatter status to 'review'"
