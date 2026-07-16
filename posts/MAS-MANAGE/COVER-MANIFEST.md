# MAS-MANAGE — Cover Image Generation Manifest

**Status:** READY FOR REVIEW — hold for generation (user will review & start)
**Gap:** 12/12 posts currently borrow MAS-FEATURES placeholder covers. `images/` dir is empty.
**Target:** 12 dedicated 16:9 covers saved to `posts/MAS-MANAGE/images/`

## Global rules (from memory: Blog Cover Image Rules)
- **16:9 landscape**, `aspect_ratio: "16:9"`
- Pipeline: `mcp__nanobanana__generate_image`, `model_tier: "pro"`, `resolution: "2k"`, `thinking_level: "high"`
- **80% visual / 20% text** — bold visual metaphor, NOT an infographic/cheat-sheet
- Text allowed: short title (3-8 words) + optional subtitle ONLY
- **`@themaximoguys` attribution**, small, bottom-right corner, every cover
- Series cohesion: **MarkerBoard aesthetic** — thick saturated art-marker strokes on deep matte black (#0A0A0A); palette Electric Blue #2D9CDB, Signal Red #EB5757, Lime Green #6FCF97, Warm Amber #F2994A, Violet #BB6BD9
- Consistent small "MAS MANAGE · Part N" tag treatment for series identity

## Post-generation rewire (run AFTER images exist — do NOT run yet)
```bash
cd posts/MAS-MANAGE
# index
sed -i 's#^coverImage:.*#coverImage: "./images/mas-manage-series-index.png"#' 2026-06-02-manage-00-series-index.mdx
# parts 1-11
for n in 01 02 03 04 05 06 07 08 09 10 11; do
  f=$(ls 2026-06-02-manage-${n}-*.mdx)
  sed -i "s#^coverImage:.*#coverImage: \"./images/mas-manage-part-${n#0}.png\"#" "$f"
done
```

---

## The 12 covers

### 00 — Series Index → `mas-manage-series-index.png`
**Title on art:** "MAS MANAGE" / sub: "The Complete Guide · MAS 9"
**Concept:** A central glowing hub/control tower with 11 labeled module spokes radiating outward (Work, Reliability, Inspections, Mobile, Scheduling, Assets, Inventory, AI, Config…), marker-drawn on matte black — the whole suite at a glance.
**Prompt:** MarkerBoard style, deep matte black background #0A0A0A, bold saturated art-marker illustration of a central luminous control hub with eleven radiating spokes ending in small module glyphs, electric blue and amber strokes with signal-red accents, hand-drawn ink-bleed feel, large title text "MAS MANAGE" and small subtitle "The Complete Guide · MAS 9", small "@themaximoguys" bottom-right, 16:9 landscape, 80% visual.

### 01 — The New Manage → `mas-manage-part-1.png`
**Title:** "The New Manage" / sub: "7.6 EAM → MAS 9"
**Concept:** An old monolithic building/mainframe morphing rightward into clean containerized cloud blocks — transformation arrow.
**Prompt:** MarkerBoard style on matte black, bold marker illustration of a heavy monolithic legacy block on the left dissolving/morphing into stacked modern container blocks floating in a cloud on the right, big transformation arrow, electric-blue-to-lime gradient strokes, ink bleed, title "The New Manage", subtitle "7.6 EAM → MAS 9", @themaximoguys bottom-right, 16:9.

### 02 — Work Centers → Role-Based Apps → `mas-manage-part-2.png`
**Title:** "Work Centers → Role-Based Apps"
**Concept:** Old flat dashboard tiles reshaping into persona "doors"/app cards, each tagged with a role silhouette.
**Prompt:** MarkerBoard on matte black, marker-drawn old grid of dashboard tiles on the left flowing into distinct role-based app cards on the right, each card bearing a small persona silhouette (planner, technician, supervisor), amber and violet strokes, title "Work Centers → Role-Based Apps", @themaximoguys bottom-right, 16:9, visual-first.

### 03 — Work Management → `mas-manage-part-3.png`
**Title:** "Work Management" / sub: "Work Orders · Job Plans · PMs"
**Concept:** A beating heart made of interlocking gears with a looping work-order lifecycle arrow — the heart of Manage.
**Prompt:** MarkerBoard on matte black, bold marker illustration of a mechanical heart built from interlocking gears with a circular lifecycle arrow wrapping it (approve → assign → execute → close), signal-red and electric-blue strokes with ink bleed, title "Work Management", subtitle "Work Orders · Job Plans · PMs", @themaximoguys bottom-right, 16:9.

### 04 — Reliability Strategies → `mas-manage-part-4.png`
**Title:** "Reliability Strategies" / sub: "FMEA · RCM · 58,000 Failure Modes"
**Concept:** A protective shield formed from a branching fault/failure-mode tree; library shelves of failure modes behind it.
**Prompt:** MarkerBoard on matte black, marker-drawn protective shield emblem made of a branching failure-mode fault tree, faint shelves of catalogued cards behind suggesting a vast library, lime-green and amber strokes, title "Reliability Strategies", subtitle "FMEA · RCM · 58,000 Failure Modes", @themaximoguys bottom-right, 16:9.

### 05 — Inspections & Digital Forms → `mas-manage-part-5.png`
**Title:** "Inspections & Digital Forms"
**Concept:** A digital clipboard/tablet with a checklist, a magnifier, and pass/fail score dial — form builder feel.
**Prompt:** MarkerBoard on matte black, bold marker illustration of a tablet showing a digital inspection checklist with checkmarks and a pass/fail score gauge, a magnifier hovering over an item, electric-blue and lime strokes with signal-red fail accent, title "Inspections & Digital Forms", @themaximoguys bottom-right, 16:9.

### 06 — Maximo Mobile → `mas-manage-part-6.png`
**Title:** "Maximo Mobile" / sub: "Offline-First Field Work"
**Concept:** A rugged phone held in a gloved field hand, a cloud with an offline slash, sync arrows — end of Anywhere.
**Prompt:** MarkerBoard on matte black, marker-drawn rugged smartphone in a technician's gloved hand out in the field, a cloud icon with a slash (offline) and circular sync arrows, amber and electric-blue strokes, industrial background hint, title "Maximo Mobile", subtitle "Offline-First Field Work", @themaximoguys bottom-right, 16:9.

### 07 — Graphical Scheduling & FSM → `mas-manage-part-7.png`
**Title:** "Graphical Scheduling & FSM"
**Concept:** A Gantt timeline with colored bars plus a dispatch map with assignment lines connecting crews to jobs.
**Prompt:** MarkerBoard on matte black, bold marker illustration of a Gantt-chart timeline with colored task bars beside a dispatch map where lines connect crew pins to job locations, electric-blue, amber, violet strokes, title "Graphical Scheduling & FSM", @themaximoguys bottom-right, 16:9, visual-first.

### 08 — Asset & Location Management → `mas-manage-part-8.png`
**Title:** "Assets & Locations" / sub: "Hierarchies · ACM · Linear · Meters"
**Concept:** An asset hierarchy tree branching down, a linear pipeline running across, and a meter gauge.
**Prompt:** MarkerBoard on matte black, marker-drawn asset hierarchy tree branching downward into equipment glyphs, a linear-asset pipeline crossing the frame with mile markers, a round meter gauge, lime-green and electric-blue strokes, title "Assets & Locations", subtitle "Hierarchies · ACM · Linear · Meters", @themaximoguys bottom-right, 16:9.

### 09 — Inventory & Procurement → `mas-manage-part-9.png`
**Title:** "Inventory & Procurement"
**Concept:** Warehouse storeroom shelves, a reorder loop arrow, and a purchase-order document flowing to a vendor truck.
**Prompt:** MarkerBoard on matte black, bold marker illustration of storeroom shelves stacked with parts bins, a circular reorder-point arrow, and a purchase-order sheet flowing toward a delivery truck, amber and electric-blue strokes with signal-red low-stock accent, title "Inventory & Procurement", @themaximoguys bottom-right, 16:9.

### 10 — The AI Inside Manage → `mas-manage-part-10.png`
**Title:** "The AI Inside Manage" / sub: "Work Order Intelligence · Assistant"
**Concept:** A glowing neural spark/brain nested inside a work-order card, a chat-assistant bubble beaming out.
**Prompt:** MarkerBoard on matte black, marker-drawn glowing AI brain/neural spark embedded inside a work-order card, a chat-assistant speech bubble emitting a soft glow, violet and electric-blue strokes with luminous ink bleed, title "The AI Inside Manage", subtitle "Work Order Intelligence · Assistant", @themaximoguys bottom-right, 16:9.

### 11 — Configuration & Administration → `mas-manage-part-11.png`
**Title:** "Configuration & Administration" / sub: "Scripts · Workflow · Dashboards"
**Concept:** A control panel with a wrench, a code/script window, and connected workflow nodes — the admin toolkit.
**Prompt:** MarkerBoard on matte black, bold marker illustration of an admin control panel featuring a wrench, a script/code window with brackets, and connected workflow decision nodes, electric-blue, amber, lime strokes, title "Configuration & Administration", subtitle "Scripts · Workflow · Dashboards", @themaximoguys bottom-right, 16:9.
