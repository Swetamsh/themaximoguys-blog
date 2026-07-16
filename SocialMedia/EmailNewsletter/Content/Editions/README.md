# Editions

One folder per newsletter issue, created by `Scripts/new-issue.sh`.

## Structure

```
Content/Editions/
├── 001-april-30-cliff/
│   ├── DRAFT.md      ← working copy (status: draft → review → scheduled)
│   ├── FINAL.md      ← locked-in copy sent via Beehiiv
│   ├── SOURCES.md    ← fact-check trail (every link traces here)
│   └── assets/       ← images referenced in the issue
├── 002-maximoworld-preview/
├── W-17-week-of-apr-27/
└── ...
```

## Naming convention

- **Monthly flagship:** `NNN-slug` (e.g., `001-april-30-cliff`)
- **Weekly wire:** `W-NN-slug` (e.g., `W-17-week-of-apr-27`)

Zero-pad monthly issue numbers to 3 digits so they sort correctly.

## Lifecycle

1. `Scripts/new-issue.sh NUMBER SLUG` creates the folder + DRAFT.md
2. Draft status flows: `draft` → `review` → `scheduled` → `sent`
3. When scheduled in Beehiiv, copy DRAFT.md to FINAL.md and lock it
4. Post-send: update frontmatter status to `sent`, add published URL
