# Architecture Workflow

**System architecture and technical diagrams in BlueprintBoard style.**

## Voice Notification

```bash
curl -s -X POST http://localhost:8888/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Running the Architecture workflow to create a blueprint technical diagram"}' \
  > /dev/null 2>&1 &
```

Running **Architecture** in **BlueprintBoard**...

---

## Purpose

Create system architecture diagrams, technical schematics, and component relationship visuals. Engineering drawing style with boxes, connectors, and labeled components.

**Classic Examples:**
- MAS Platform Architecture
- Integration Framework Diagram
- Data Flow Schematic
- System Component Map
- Network/Deployment Topology

---

## Composition Structure

```
+----------------------------------------------------------+
|  [TITLE — white, ALL CAPS]                                |
|  [Subtitle — cyan]                          [LOGO]        |
+----------------------------------------------------------+
|                                                           |
|  +--------+     +--------+     +--------+                |
|  | COMP 1 |---->| COMP 2 |---->| COMP 3 |                |
|  | [icon] |     | [icon] |     | [icon] |                |
|  +--------+     +--------+     +--------+                |
|       |              |              |                     |
|       v              v              v                     |
|  +--------+     +--------+     +--------+                |
|  | COMP 4 |     | COMP 5 |     | COMP 6 |                |
|  +--------+     +--------+     +--------+                |
|                                                           |
|  "[gold annotation about the architecture]"               |
|                                                           |
|  LEGEND: ─── data flow  - - - optional  ═══ critical     |
|                                                           |
|  [Title block]                                            |
+----------------------------------------------------------+
```

---

## Color Strategy

- **Title:** White, ALL CAPS
- **Component Boxes:** Cyan (#4ECDC4) borders, white text labels
- **Connectors:** White solid lines (required), white dashed (optional)
- **Data Flow Arrows:** Cyan arrowheads
- **Critical Paths:** Coral (#FF6B6B) highlighted
- **Annotations:** Gold (#FFD93D) for architectural insights
- **Legend:** Light cyan text
- **Background Elements:** Grid lines as base layer

---

## Prompt Template

```
Engineering blueprint-style architecture diagram on dark navy blue background with grid lines.

COMPOSITION: Technical system architecture schematic
- Deep navy blue (#0D1B2A) background with subtle grid lines
- Component boxes with connectors showing relationships
- Engineering schematic layout — clean, structured

TITLE:
"[ARCHITECTURE TITLE]" - large white ALL CAPS
"[Subtitle]" - cyan below

COMPONENTS (cyan-bordered boxes with white labels):

[COMPONENT 1]: "[Name]"
- Description: [what it does]
- White line-art icon inside box
- Position: [location in diagram]

[COMPONENT 2]: "[Name]"
- Description: [what it does]
- Connected to [Component 1] via [connector type]

[COMPONENT 3]: "[Name]"
- Description: [what it does]
- Connected to [Component 2] via [connector type]

CONNECTORS:
- Solid white lines = required data flow
- Dashed white lines = optional connections
- Cyan arrowheads showing direction
- Coral (#FF6B6B) for critical/high-load paths

ANNOTATIONS:
"[Architectural insight 1]" — gold (#FFD93D)
"[Architectural insight 2]" — gold

LEGEND (bottom-left):
─── Required flow | - - - Optional | ═══ Critical path

TITLE BLOCK (bottom-right):
DRAWING: [Title] | BY: [Author] | REV: 1.0

STYLE:
- Engineering schematic — NOT org chart, NOT flowchart
- Cyan borders on component boxes, white line-art inside
- Clean connectors with arrowheads
- Gold annotations for architectural wisdom
- Grid lines visible beneath everything
- Professional technical documentation feel
```

---

## Generate Command

```
mcp__nanobanana__generate_image(
  prompt: "[YOUR ARCHITECTURE PROMPT]",
  model_tier: "pro",
  resolution: "2k",
  aspect_ratio: "16:9",
  output_path: "~/Downloads/blueprint-architecture-[topic].png"
)
```

---

## Validation

- [ ] Components clearly boxed with cyan borders
- [ ] Connectors show relationships with direction
- [ ] Dark navy blue background with grid lines
- [ ] White line-art icons inside component boxes
- [ ] Gold annotations on architectural decisions
- [ ] Legend explaining connector types
- [ ] Engineering title block at bottom
- [ ] Schematic reads left-to-right or top-to-bottom
