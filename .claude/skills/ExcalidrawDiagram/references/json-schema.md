# Excalidraw JSON Schema Reference

Complete reference for the `.excalidraw` JSON format.

---

## Top-Level Structure

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": 20
  },
  "files": {}
}
```

| Field | Type | Description |
|---|---|---|
| `type` | `"excalidraw"` | Always this literal |
| `version` | `number` | Format version (currently `2`) |
| `source` | `string` | Origin URL |
| `elements` | `array` | All drawing elements |
| `appState` | `object` | Canvas state |
| `files` | `object` | Embedded binary files (images), keyed by FileId |

---

## Base Element Properties (All Types)

Every element has these properties:

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | YES | Unique identifier (use descriptive strings like `"start_node"`) |
| `type` | `string` | YES | Element type discriminator |
| `x` | `number` | YES | X position (top-left corner) |
| `y` | `number` | YES | Y position (top-left corner) |
| `width` | `number` | YES | Width in pixels |
| `height` | `number` | YES | Height in pixels |
| `angle` | `number` | YES | Rotation in radians (`0` = none) |
| `strokeColor` | `string` | YES | Stroke/border color (hex) |
| `backgroundColor` | `string` | YES | Fill color (hex or `"transparent"`) |
| `fillStyle` | `string` | YES | `"solid"`, `"hachure"`, `"cross-hatch"`, `"zigzag"` |
| `strokeWidth` | `number` | YES | Stroke width: `1`, `2`, or `4` |
| `strokeStyle` | `string` | YES | `"solid"`, `"dashed"`, `"dotted"` |
| `roughness` | `number` | YES | `0` (clean), `1` (artist), `2` (cartoonist) |
| `opacity` | `number` | YES | `0`–`100` |
| `roundness` | `object|null` | YES | `null` or `{"type": 3}` for rounded corners |
| `seed` | `number` | YES | Random integer for roughjs rendering |
| `version` | `number` | YES | Start at `1` |
| `versionNonce` | `number` | YES | Random integer |
| `index` | `string` | YES | Z-order fractional index (`"a0"`, `"a1"`, etc.) |
| `isDeleted` | `boolean` | YES | `false` for visible elements |
| `groupIds` | `array` | YES | Group memberships (empty array `[]` if none) |
| `frameId` | `string|null` | YES | Parent frame ID or `null` |
| `boundElements` | `array|null` | YES | Elements bound to this one (arrows, text) |
| `updated` | `number` | YES | Epoch milliseconds timestamp |
| `link` | `string|null` | YES | Hyperlink or `null` |
| `locked` | `boolean` | YES | Lock state |

### `roundness` Values

| `type` | Used For |
|---|---|
| `1` | Legacy rectangles |
| `2` | Linear elements (arrows, lines), diamonds |
| `3` | Current default for rectangles (adaptive radius) |

### `boundElements` Format

```json
"boundElements": [
  { "id": "arrow_1", "type": "arrow" },
  { "id": "label_text", "type": "text" }
]
```

---

## Element Types

### Shapes: `rectangle`, `ellipse`, `diamond`

No additional properties beyond the base. These are the core shapes.

```json
{ "type": "rectangle", "roundness": { "type": 3 } }
{ "type": "ellipse", "roundness": null }
{ "type": "diamond", "roundness": { "type": 2 } }
```

### `text` — Text Element

Additional properties:

| Property | Type | Description |
|---|---|---|
| `fontSize` | `number` | Font size in px (default `20`) |
| `fontFamily` | `number` | `1`=Virgil, `2`=Helvetica, `3`=Cascadia(mono), `5`=Excalifont |
| `text` | `string` | Displayed text (with line breaks) |
| `originalText` | `string` | Same as `text` for new elements |
| `textAlign` | `string` | `"left"`, `"center"`, `"right"` |
| `verticalAlign` | `string` | `"top"`, `"middle"`, `"bottom"` |
| `containerId` | `string|null` | Parent shape ID, or `null` for standalone |
| `autoResize` | `boolean` | `true` = width fits text |
| `lineHeight` | `number` | Line height multiplier (typically `1.25`) |

**Standalone text:** `containerId: null`, `verticalAlign: "top"`
**Contained text:** `containerId: "<shape-id>"`, `verticalAlign: "middle"`, `textAlign: "center"`

### `arrow` — Arrow Element

Additional properties:

| Property | Type | Description |
|---|---|---|
| `points` | `array` | Array of `[x, y]` relative to element origin. First point always `[0, 0]` |
| `startBinding` | `object|null` | Binding to shape at start |
| `endBinding` | `object|null` | Binding to shape at end |
| `startArrowhead` | `string|null` | `null`, `"arrow"`, `"bar"`, `"dot"`, `"triangle"`, `"diamond"` |
| `endArrowhead` | `string|null` | Same options as startArrowhead |
| `elbowed` | `boolean` | `true` for right-angle arrows |

**Binding structure:**
```json
{
  "elementId": "target_shape_id",
  "fixedPoint": [0.5, 1.0],
  "mode": "inside"
}
```

See `references/arrow-bindings.md` for complete binding reference.

### `line` — Line Element

Same as arrow but without arrowheads. Additional:

| Property | Type | Description |
|---|---|---|
| `points` | `array` | Same as arrow |
| `startBinding` | `object|null` | Usually `null` for lines |
| `endBinding` | `object|null` | Usually `null` for lines |

### `freedraw` — Freehand Drawing

| Property | Type | Description |
|---|---|---|
| `points` | `array` | Path points relative to origin |
| `pressures` | `array` | Pressure values per point |
| `simulatePressure` | `boolean` | Simulate pressure variation |

### `image` — Image Element

| Property | Type | Description |
|---|---|---|
| `fileId` | `string|null` | Key into top-level `files` dictionary |
| `status` | `string` | `"pending"`, `"saved"`, `"error"` |
| `scale` | `array` | `[1, 1]` default, `[-1, 1]` for horizontal flip |

### `frame` — Frame/Group Element

| Property | Type | Description |
|---|---|---|
| `name` | `string|null` | Frame label |

Child elements reference the frame via their `frameId` property.

---

## Arrowhead Types

| Value | Visual |
|---|---|
| `null` | No arrowhead |
| `"arrow"` | Standard arrow tip (most common) |
| `"bar"` | Flat bar |
| `"triangle"` | Filled triangle |
| `"triangle_outline"` | Outline triangle |
| `"diamond"` | Filled diamond |
| `"diamond_outline"` | Outline diamond |
| `"circle"` | Filled circle |
| `"circle_outline"` | Outline circle |

---

## Key Rules for Valid JSON

1. **IDs must be unique** across all elements
2. **`seed` and `versionNonce`** must be random integers (any value works)
3. **Arrow `points`** — first point is always `[0, 0]`, subsequent points are relative offsets
4. **Arrow `width`/`height`** — must equal the bounding box of `points`
5. **Bidirectional binding** — arrow's `startBinding`/`endBinding` AND target shape's `boundElements` must both reference each other
6. **Text `containerId`** — if set, the container's `boundElements` must include `{"id": "text_id", "type": "text"}`
7. **`index`** — use sequential strings: `"a0"`, `"a1"`, `"a2"`, etc. for z-ordering
