# General Workflow

**Flexible blueprint infographic for any content in BlueprintBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the General workflow to create a blueprint infographic"}' \
  > /dev/null 2>&1 &
```

Running **General** in **BlueprintBoard**...

---

## Purpose

When the content doesn't fit neatly into CheatSheet, Guide, QuickReference, or Architecture workflows. This is the flexible fallback that maintains the BlueprintBoard aesthetic for any content.

---

## Layout Options

### Grid Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                      |
|  +---------+    +---------+         |
|  |  Box 1  |    |  Box 2  |         |
|  +---------+    +---------+         |
|                                      |
|  +---------+    +---------+         |
|  |  Box 3  |    |  Box 4  |         |
|  +---------+    +---------+         |
+-------------------------------------+
```

### List Layout
```
+-------------------------------------+
|  [TITLE]                            |
|                                      |
|  → Item 1 with line-art icon       |
|    "[gold annotation]"              |
|  → Item 2 with line-art icon       |
|  → Item 3 with line-art icon       |
|    "[gold annotation]"              |
|                                      |
|  [summary callout box]             |
+-------------------------------------+
```

### Hub and Spoke
```
+-------------------------------------+
|          [TITLE]                    |
|                                      |
|         [Branch A]                  |
|            /                        |
| [Branch B]--[CENTER]--[Branch C]    |
|            \                        |
|         [Branch D]                  |
+-------------------------------------+
```

---

## Universal Prompt Template

```
Engineering blueprint-style infographic on dark navy blue background with grid lines.

CONTENT: [What you're visualizing]

LAYOUT: [Choose appropriate layout from above]

STYLE REQUIREMENTS (MANDATORY):
- Background: Deep navy blue (#0D1B2A) with subtle grid lines (#1E3A5F)
- Text: White (#FFFFFF) hand-lettered — primary content
- Structure: Cyan/teal (#4ECDC4) arrows (→), headers, borders, connectors
- Annotations: Gold/amber (#FFD93D) for witty callouts in quotes
- Illustrations: White line-art — schematic/technical drawing style
- Warnings: Coral (#FF6B6B) for critical items (sparingly)
- Registration marks at corners
- Engineering title block at bottom-right
- NOT light background, NOT notebook paper, NOT chalk/marker
- NOT cyberpunk/neon glow — clean engineering aesthetic

COMPOSITION:
[Describe your specific layout and elements]

TITLE:
"[YOUR TITLE]" - large white ALL CAPS
"[Subtitle]" - cyan

MAIN ELEMENTS:
→ [Element 1]: [description] with white line-art [icon]
→ [Element 2]: [description] with white line-art [icon]
→ [Element 3]: [description] with white line-art [icon]

GOLD ANNOTATIONS (3-5):
"[annotation 1]" — gold, offset
"[annotation 2]" — gold, personal voice

TITLE BLOCK:
DRAWING: [Title] | BY: [Author] | REV: 1.0 | DATE: [Year]

CRITICAL CHECKLIST:
- Dark navy blue background with grid
- White text as primary
- Cyan for structure
- Gold for personality
- White line-art illustrations
- Engineering reference feel
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "1:1",
  output_path: "~/Downloads/blueprint-[topic].png"
)
```

---

## Validation

- [ ] Dark navy blue background with grid lines
- [ ] White hand-lettered text as primary
- [ ] Cyan arrows and structural elements
- [ ] Gold annotations with personal voice
- [ ] White line-art illustrations
- [ ] Engineering title block at bottom
- [ ] Content clear at a glance
- [ ] No light backgrounds, no notebook paper
