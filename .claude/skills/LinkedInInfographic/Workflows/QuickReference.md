# QuickReference Workflow

**Keyboard shortcuts, commands, configs, or reference card infographic for LinkedIn.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running QuickReference workflow in LinkedInInfographic to generate a reference card from blog content"}' \
  > /dev/null 2>&1 &
```

Running **QuickReference** in **LinkedInInfographic**...

---

## When to Use

- Blog contains keyboard shortcuts, hotkeys, or key combinations
- Blog lists commands, property names, configuration keys
- Blog has tables of settings, parameters, or codes
- Blog is a quick-reference or cheat-sheet of technical items

**Visual Style Selection:**
- Keyboard shortcuts / practical reference → **SketchNote** (read `~/.claude/skills/SketchNote/Workflows/QuickReference.md`)
- System properties / config reference → **BlueprintBoard** (read `~/.claude/skills/BlueprintBoard/Workflows/QuickReference.md`)

---

## Step 1: Extract Content

Read `ContentExtraction.md` and extract the QuickReference structure:

```yaml
title: "[Reference Card Title]"
subtitle: "[The Cheat Sheet Every [Role] Needs]"
scope: "[MAS 9.x / Manage / Legacy 7.6.x]"
badge: "[Platform logo/badge]"

sections:
  - header: "[Section Name — e.g., Everyday Essentials]"
    icon: "[section icon]"
    items:
      - key: "[Ctrl+Alt+I]"
        value: "[Insert/New Record]"
        annotation: "[game changer!]"  # optional
      - key: "[Ctrl+Alt+S]"
        value: "[Save Record]"
      - key: "[Ctrl+Alt+A]"
        value: "[Change Status]"
        annotation: "[use this constantly!]"
      # ... 4-8 items per section

  - header: "[Section 2 — e.g., Navigation & Search]"
    icon: "[section icon]"
    items:
      - key: "[Alt+G]"
        value: "[Go To (app navigation)]"
        annotation: "[THE KING of shortcuts]"
      # ... 4-8 items

  - header: "[Section 3 — e.g., Date Field Tricks]"
    icon: "[section icon]"
    items:
      # ... 4-8 items

# 3-5 sections total, each with 4-8 items
# Total items: 15-30 (the maximum for readability)
```

---

## Step 2: Group and Prioritize

**If the blog has many reference items (>30), group and filter:**

1. **Group by function** — navigation, editing, search, dates, tables
2. **Star the essential ones** — items people use daily get emphasis
3. **Flag the hidden gems** — items most people don't know get annotation callouts
4. **Cut the obscure** — if an item requires 2+ sentences to explain, it's not reference-card material

**Layout structure:**
```
TITLE + SUBTITLE
[SECTION 1 — most essential]
  Key → Value    Key → Value
  Key → Value    Key → Value

[SECTION 2 — next most useful]
  Key → Value    Key → Value
  Key → Value    Key → Value

[SECTION 3 — hidden gems]
  Key → Value    Key → Value

[SECTION 4 — power moves]  (optional)
  Key → Value    Key → Value
```

**Two-column layout within sections** to maximize space (key → value pairs side by side).

---

## Step 3: Build the Image Prompt

**Read the selected style's QuickReference workflow for the FULL prompt template:**
- SketchNote: `~/.claude/skills/SketchNote/Workflows/QuickReference.md`
- BlueprintBoard: `~/.claude/skills/BlueprintBoard/Workflows/QuickReference.md`

**Key adaptations for LinkedIn reference infographic:**
- **Key → Value format** throughout (consistent arrow separator)
- **Section headers with icons** — colored, underlined, emoji prefix
- **Two-column within sections** — fits more items legibly
- **"Game changer!" / "hidden gem!" annotations** on 3-5 standout items
- **Red circle on THE most important shortcut** — "if you memorize nothing else..."
- **MIND BLOWN annotation** on the one item nobody expects
- **"Verified from [source]"** badge at bottom — authority signal

---

## Step 4: Add Personality Layer

- [ ] **Hook:** "Stop clicking through 47 menus" or "your keyboard is faster than your mouse"
- [ ] **3-5 annotations** on standout items:
  - "game changer!"
  - "hidden gem!"
  - "MIND BLOWN"
  - "memorize these 3 screen codes"
  - "use this constantly!"
- [ ] **Red circle** on THE most essential item
- [ ] **"Verified from [official docs]"** at bottom
- [ ] **"Works on [versions]"** scope badge
- [ ] **CTA:** "Save this. Print it. Tape it to your monitor."
- [ ] **Attribution:** "by @themaximoguys"
- [ ] **"@themaximoguys"** in corner

---

## Step 5: Generate Image

```
mcp__nanobanana__generate_image(
  prompt: "[FULL PROMPT WITH EXTRACTED CONTENT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "4:5",
  output_path: "~/Downloads/linkedin-infographic-reference-[slug].png",
  thinking_level: "high"
)
```

---

## Step 6: Generate LinkedIn Post Copy

Read `LinkedInPostCopy.md` and generate post copy using the **QuickReference** template.

---

## Validation

- [ ] Sections clearly labeled with icons
- [ ] Key → Value format consistent throughout
- [ ] Two-column within sections where applicable
- [ ] 3-5 annotation callouts on standout items
- [ ] Red circle/emphasis on most critical item
- [ ] "Verified from..." source badge
- [ ] Version/scope badge present
- [ ] Attribution with credentials
- [ ] "@themaximoguys" present
- [ ] 4:5 portrait aspect ratio
- [ ] Total items ≤ 30 (readable at feed size)
- [ ] CTA at bottom: "Save this" variant
- [ ] Follows selected visual style's aesthetic rules
