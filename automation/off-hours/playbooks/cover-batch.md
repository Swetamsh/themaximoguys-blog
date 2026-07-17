# Night-Shift Job: Generate a Batch of Blog Cover Images

You are running unattended overnight inside `/root/themaximoguys-blog`. Your job is to
generate the missing cover images for the batch described in the work item appended at the
bottom of this prompt. Work autonomously; nobody will answer questions.

## Hard rules (violations = failed job)

1. **Never publish or sync** (no Sanity, no LinkedIn, no `git push`). Local `git commit` of
   new images at the end is allowed.
2. **Never edit post content.** Only create image files at the paths posts already reference.
3. **Style skills only — no raw/basic generation.** Every image goes through the style skill
   named in the item's `cover_style` field (SketchNote, DanKoeStyle, InfoBlocks, or
   BlueprintBoard), invoked via the Skill tool. No ad-hoc single prompts outside a skill.

## Step 1 — Determine the missing covers

- List the MDX files matching the item's `posts_glob`, restricted by the item's `batch`
  description (e.g. "first 4 posts by filename" or "remaining posts without covers").
- For each post, read its frontmatter `coverImage` path and its title/description/tags.
- A cover is "missing" if the referenced PNG does not exist on disk. Skip posts whose
  cover already exists.

## Step 2 — Generate each cover

Invoke the assigned style skill and follow its workflow for each post. Derive each image's
concept from that post's actual topic — every cover in the batch must be visually distinct.

Non-negotiable rules for every image:
- `mcp__nanobanana__generate_image` with `model_tier: "pro"`, `resolution: "2k"`,
  `thinking_level: "high"`, `aspect_ratio: "16:9"`. NEVER Flash tier. On 503, retry Pro
  (up to 3 times, 30s apart) — never downgrade.
- 80% visual / 20% text: bold visual metaphor for the post's core idea, title text of 3-8
  words, optional short subtitle, small `@themaximoguys` attribution bottom-right.
  NO bullet lists, NO tip lists, NO cheat-sheet/infographic layout (those are for social,
  not blog covers). SketchNote items use its visual-metaphor treatment, not CheatSheet.
- Save each PNG to the exact path the post's `coverImage` frontmatter references (create
  the series `images/` directory if needed).
- You may generate up to 4 images in parallel with a ~2 second stagger.

## Step 3 — Verify and finish

1. VIEW every generated PNG with the Read tool; regenerate any that are off-brand,
   text-heavy, malformed, or missing the attribution.
2. Confirm every post in the batch now has its cover file on disk.
3. `git add` the new images and `git commit -m "night-shift: <item id> — <N> covers (<style>)"`.
4. Print exactly one final line:
   `NIGHT-SHIFT-RESULT: SUCCESS <series> <N> covers generated`
   If any cover in the batch could not be produced, print instead:
   `NIGHT-SHIFT-RESULT: FAILED <one-line reason>`
