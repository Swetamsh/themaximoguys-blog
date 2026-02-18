---
name: StyleGuide
description: Visual specification for the sketch-note carousel art style
---

# SketchCarousel Style Guide

Based on reference images: Maryam Miradi LinkedIn infographic style + PAI Art skill aesthetic (cream paper background).

## Core Aesthetic: "Hand-Drawn Sketch-Note on Textured Paper"

A polished, detailed hand-drawn educational infographic style on warm textured paper. Think: professional whiteboard illustration meets editorial infographic meets vintage notebook. NOT crude stick figures — detailed, expressive sketch illustrations with **hand-written style typography** on a warm cream crumpled-paper background.

## Visual Elements

### Background
- **Color**: Light cream / sepia (#F5E6D3) — matches PAI Art skill default
- **Texture**: Very subtle, LIGHT paper texture — faint paper grain only, minimal creases. The texture should NOT overpower illustrations or text
- **Intensity**: The paper texture should be barely noticeable — think "hint of aged paper" not "crumpled grocery bag." Content readability is the priority
- **Feel**: Like a clean premium sketchpad page with a slight warmth — NOT heavily crumpled or distressed
- **NOT**: Pure white, dark backgrounds, gradients, solid flat colors, or heavy/overwhelming paper crumple texture
- **Consistency**: Same light cream paper texture across ALL slides in a carousel
- **Prompt hint**: Use "very light cream paper background with subtle warm texture" NOT "crumpled paper" or "aged parchment"

### Typography (Rendered in Image)
- **Headlines**: Bold **hand-written / hand-lettered style**, VERY large, creative mixed sizing
- **Font feel**: Like marker on paper — slightly imperfect, organic, warm. NOT computer-perfect sans-serif
- **Creative typography**: Key words can be LARGER or in accent color within headlines (e.g., "The MAXIMO Mindset Shift" where MAXIMO is hand-lettered in teal)
- **Weight**: Extra-bold hand-drawn for headlines, lighter hand-written for body
- **Case**: Mix of title case and ALL CAPS for emphasis words
- **Size hierarchy**: Clear 3-level hierarchy — headline > section headers > body text
- **Numbered steps**: Hand-drawn circled numbers with colored fills

### Section Headers / Badges
- **Style**: Rounded pill/badge shapes with colored background
- **Colors**: Muted olive green, teal blue, or gold background with white/dark text
- **Usage**: Label sections like "Step 1", "Domain 1", category names
- **Position**: Left-aligned or top of each section

### Explanation Boxes
- **Shape**: Rounded rectangle, slightly rough/hand-drawn edges
- **Background**: Slightly lighter cream (#FAF5EB) or white with paper texture
- **Border**: Hand-drawn thin brown/gray line — not computer-perfect
- **Text**: Hand-written style, readable body text
- **Position**: Integrated into the infographic flow

### Characters & Illustrations
- **Style**: Detailed sketch illustrations — NOT simple stick figures
- **People**: Proportional cartoon figures with recognizable features (hair, clothing, expressions), sitting at desks, holding devices, gesturing
- **Robots/Tech**: Friendly robot illustrations with antenna, screen face, articulated arms
- **Objects**: Detailed hand-drawn computers, monitors, servers, phones, documents, flowcharts
- **Detail level**: Medium detail — clearly hand-drawn but with proper proportions and recognizable elements
- **Expressions**: Rich facial expressions and body language
- **Labels**: Characters can wear labeled t-shirts or hold signs
- **Size**: Illustrations support the text, not dominate — typically 20-30% of slide area
- **Count**: 2-5 small illustrations per slide, distributed around the text

### Flow Diagrams & Architecture
- **Arrows**: Hand-drawn curved arrows connecting concepts
- **Boxes**: Rounded rectangles with labels for system components
- **Connections**: Dotted or dashed lines for relationships
- **Layout**: Hub-and-spoke, linear flow, or hierarchical tree structures

### Icons & Small Graphics
- **Style**: Detailed but hand-drawn doodle icons
- **Examples**: Lightbulbs, gears, checkmarks, warning signs, clouds, databases, locks, magnifying glasses
- **Size**: Small supporting elements next to text points
- **Color**: Can have accent color fills (olive, teal, gold)

### Color Palette

| Element | Color | Hex |
|---|---|---|
| Background | Light cream / sepia paper | #F5E6D3 |
| Thumbnail bg | Warm sepia | #EAE9DF |
| Headlines | Pure black (hand-lettered) | #000000 |
| Body text | Dark charcoal (hand-written) | #333333 |
| Accent keyword | Teal blue | #2E8B8B |
| Section badge bg | Muted olive green | #6B8E4E |
| Section badge alt | Warm gold | #C5A644 |
| Section badge alt2 | Dusty rose | #C07070 |
| Numbered circles | Olive green or teal | #6B8E4E |
| Character outlines | Black | #000000 |
| Character fill | Light skin tone or cream | #F5E6D0 |
| Illustration accents | Teal, olive, gold (muted) | varies |
| Connector arrows | Dark brown/charcoal | #4A3728 |
| Box borders | Warm brown | #C8B99A |
| Explanation box bg | Lighter cream | #FAF5EB |

**Rule**: Cream paper background is consistent across all slides. Use 2-3 muted accent colors per slide for section badges, keyword highlights, and illustration details. Colors should feel warm and organic — like markers and colored pencils on craft paper. Never neon, never garish. The palette feels like a premium sketchpad with a curated marker set (black, teal, olive, gold, brown).

## Slide Layout Templates

### Template A: Numbered Steps Infographic
```
┌─────────────────────────────┐
│  [Author photo]  HEADLINE   │  ← Author + creative headline
│                  with mixed │
│                  sizing     │
│                             │
│  [1] Step title             │
│      Description text       │  ← Numbered steps with
│      [small illustration]   │     supporting illustrations
│                             │
│  [2] Step title             │
│      Description text       │
│      [small illustration]   │
│                             │
│  [3] Step title             │
│      Description text       │
│                             │
└─────────────────────────────┘
```

### Template B: Comparison / Old vs New
```
┌─────────────────────────────┐
│       BOLD HEADLINE         │
│                             │
│  ┌──────────┐ ┌──────────┐ │
│  │ OLD WAY  │ │ NEW WAY  │ │
│  │ [badge]  │ │ [badge]  │ │
│  │          │ │          │ │
│  │ [illust] │ │ [illust] │ │
│  │ text     │ │ text     │ │
│  └──────────┘ └──────────┘ │
│                             │
│  [Key insight text box]     │
│                             │
└─────────────────────────────┘
```

### Template C: Hub-and-Spoke / Architecture
```
┌─────────────────────────────┐
│       BOLD HEADLINE         │
│                             │
│         ┌───────┐           │
│    ┌────│ Center│────┐      │
│    │    └───────┘    │      │
│    ▼         ▼       ▼      │
│ [Node1]  [Node2]  [Node3]   │
│  desc     desc     desc     │
│                             │
│  [Supporting illustration]  │
│                             │
└─────────────────────────────┘
```

### Template D: Hook Slide (Title + Illustration)
```
┌─────────────────────────────┐
│                             │
│    CREATIVE                 │
│    LARGE HEADLINE           │
│    with accent word         │
│                             │
│  [Detailed illustration     │
│   related to topic —        │
│   robot, person at desk,    │
│   or conceptual scene]      │
│                             │
│  [Author info / TMG brand]  │
│                             │
└─────────────────────────────┘
```

### Template E: Category List
```
┌─────────────────────────────┐
│  [Number] HEADLINE          │
│       subtitle              │
│                             │
│  [Badge: Category 1]        │
│  • Item 1  • Item 2         │
│  • Item 3  • Item 4         │
│                             │
│  [Badge: Category 2]        │
│  • Item 1  • Item 2         │
│  • Item 3                   │
│                             │
│  [Badge: Category 3]        │
│  • Item 1  • Item 2         │
│                             │
└─────────────────────────────┘
```

### Template F: Flow / Decision Tree
```
┌─────────────────────────────┐
│       BOLD HEADLINE         │
│                             │
│  ┌─────┐                    │
│  │Start│                    │
│  └──┬──┘                    │
│     ▼                       │
│  ┌─────────┐   ┌────────┐  │
│  │Decision ?│──▶│Option A│  │
│  └────┬────┘   └────────┘  │
│       ▼                     │
│  ┌────────┐                 │
│  │Option B│                 │
│  └────────┘                 │
│                             │
└─────────────────────────────┘
```

## Character Design for TMG Content

For TheMaximoGuys carousel content, use these detailed character designs:

| Character | Appearance | Role | Props |
|---|---|---|---|
| Legacy Dev | Person at old desktop computer, slightly frustrated expression, messy desk | Old way perspective | Stack of manuals, old monitor, tangled cables |
| MAS Dev | Person at modern laptop, confident smile, clean workspace | New way perspective | Cloud icons, API symbols, clean architecture diagram |
| Admin | Person at monitoring console with multiple screens | Operations perspective | Dashboard screens, metrics, alert icons |
| Integrator | Person connecting cables/arrows between systems | Integration perspective | API endpoints, event streams, connectors |
| The Guide (TMG) | Friendly figure with pointer/marker, teaching pose | TheMaximoGuys narrator | Whiteboard, marker, lightbulb |

## Prompt Engineering Notes

### What works well with Gemini 3 Pro Image Preview:
- "Professional sketch-note infographic style on clean white background"
- "Detailed hand-drawn illustrations, not simple stick figures"
- "Bold creative typography with mixed sizes"
- "Muted olive green and teal blue accent colors"
- "Numbered steps with colored badge circles"
- "Hand-drawn arrows connecting concepts"
- Specific text in quotes renders better with detailed context

### What works well with GPT-Image-1:
- Best text rendering accuracy of all models
- "Professional LinkedIn infographic illustration"
- Handles complex layouts with multiple text elements
- Best for decision trees and flow diagrams with text labels

### What to avoid:
- Don't ask for photorealistic anything
- Don't specify complex gradients or 3D effects
- Don't put more than 20 words in any single text element
- Don't request too many illustrations in one image (max 5-6)
- Avoid asking for specific fonts (the model chooses)
- Don't ask for "stick figures" — ask for "detailed sketch illustrations"

### Model recommendations (priority order):
1. **GPT-Image-1**: Best overall. Superior text rendering, detailed illustrations, clean layouts.
2. **gemini-3-pro-image-preview** (nano-banana-pro at 2K+): High quality Gemini model. Good compositions and detail.
3. **gemini-2.0-flash-exp-image-generation**: Decent fallback but weaker text rendering, simpler illustrations.
4. **Flux**: Not recommended (too photorealistic, poor text).

### Quality Notes:
- **gemini-2.0-flash-exp-image-generation** produces noticeably lower quality: text typos, simplified illustrations, less professional feel. Use only as last resort.
- Always prefer higher-tier models for final production slides.
- Generate test slides and inspect text rendering before full batch.

## Doodle-Style Company & Platform Logos

When referencing companies, platforms, or tools in slides, render their logos in a **hand-drawn doodle style** that matches the sketch-note aesthetic. More detailed than simple line drawings — recognizable and professional.

### Logo Doodle Rules
- **Style**: Detailed hand-drawn version of the recognizable logo shape
- **Lines**: Clean but hand-drawn feel — not computer-perfect, not wobbly
- **Color**: Black outline with signature color fill
- **Size**: Small supporting element, not the focus
- **Label**: Include hand-written text label next to the doodle logo

### Common Platform Doodles for TMG Content

| Platform/Company | Doodle Description | Signature Element |
|---|---|---|
| **IBM** | Horizontal striped letters "IBM" in doodle style | Blue striped text |
| **Red Hat** | Detailed fedora hat doodle | Red fill |
| **Kubernetes** | Ship's wheel with 7 spokes, hand-drawn | Blue outline |
| **OpenShift** | Circle with upward arrow, hand-drawn | Red circle |
| **Docker** | Whale with containers on back | Blue whale |
| **Kafka** | Stylized "K" with streaming lines | Black |
| **GraphQL** | Hexagon with connected dots | Pink/magenta |
| **React** | Atom symbol, hand-drawn orbits | Blue |
| **Python** | Two intertwined snakes | Blue/yellow |
| **GitHub** | Octocat face, detailed doodle | Black |
| **LinkedIn** | "in" in a rounded square | Blue |
| **WebSphere** | Globe with "WS" text | Blue/yellow |
| **Maximo** | "MX" in a rounded square with gear icon | Blue |
| **Prometheus** | Flame/torch icon | Orange |
| **Grafana** | Dashboard icon with bars | Orange/yellow |

### Prompt fragment for doodle logos:
```
Include a small hand-drawn doodle-style [PLATFORM] logo next to [ELEMENT].
The logo should be a detailed, recognizable sketch version — not the official logo,
but clearly identifiable. Black outline with [SIGNATURE COLOR] fill.
```
