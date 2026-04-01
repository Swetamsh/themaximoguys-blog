# Excalidraw Arrow Bindings Reference

How arrows connect to shapes. Getting this right is critical — broken bindings = arrows that don't move with shapes.

---

## Binding Structure

When an arrow connects to a shape, TWO things must be set:

### 1. Arrow Side — `startBinding` / `endBinding`

```json
{
  "elementId": "target_shape_id",
  "fixedPoint": [0.5, 1.0],
  "mode": "inside"
}
```

| Property | Type | Description |
|---|---|---|
| `elementId` | `string` | ID of the shape being connected to |
| `fixedPoint` | `[number, number]` | `[x_ratio, y_ratio]` — where on the shape the arrow attaches (0.0 to 1.0) |
| `mode` | `string` | `"inside"` (arrow enters shape) or `"orbit"` (arrow stays outside) |

### 2. Shape Side — `boundElements`

The target shape must reference the arrow back:

```json
"boundElements": [
  { "id": "arrow_id", "type": "arrow" }
]
```

**Both sides must be set.** If you only set the arrow's binding but forget the shape's `boundElements`, the connection won't work properly.

---

## fixedPoint Coordinates

`fixedPoint` uses a `[horizontal, vertical]` ratio system where `[0, 0]` is top-left and `[1, 1]` is bottom-right:

```
    [0.5, 0]
      TOP
       │
[0, 0.5] ─── CENTER [0.5, 0.5] ─── [1, 0.5]
  LEFT                                 RIGHT
       │
    [0.5, 1]
     BOTTOM
```

### Common Connection Points

| Position | fixedPoint | Use |
|---|---|---|
| Top center | `[0.5, 0]` | Arrows entering from above |
| Bottom center | `[0.5, 1]` | Arrows exiting downward |
| Left center | `[0, 0.5]` | Arrows entering from left |
| Right center | `[1, 0.5]` | Arrows exiting to the right |
| Top-left | `[0, 0]` | Corner connections |
| Top-right | `[1, 0]` | Corner connections |
| Bottom-left | `[0, 1]` | Corner connections |
| Bottom-right | `[1, 1]` | Corner connections |

---

## Complete Binding Example

Connecting `rect_a` (right side) → `rect_b` (left side):

**Arrow element:**
```json
{
  "id": "arrow_a_to_b",
  "type": "arrow",
  "x": 280,
  "y": 145,
  "width": 120,
  "height": 0,
  "points": [[0, 0], [120, 0]],
  "startBinding": {
    "elementId": "rect_a",
    "fixedPoint": [1, 0.5],
    "mode": "inside"
  },
  "endBinding": {
    "elementId": "rect_b",
    "fixedPoint": [0, 0.5],
    "mode": "inside"
  },
  "startArrowhead": null,
  "endArrowhead": "arrow"
}
```

**rect_a must include:**
```json
"boundElements": [{ "id": "arrow_a_to_b", "type": "arrow" }]
```

**rect_b must include:**
```json
"boundElements": [{ "id": "arrow_a_to_b", "type": "arrow" }]
```

---

## Bindable Element Types

These element types can have arrows bound to them:
- `rectangle`
- `diamond`
- `ellipse`
- `text`
- `image`
- `frame`

---

## Text Binding (Text Inside Shapes)

Text inside a container uses a similar bidirectional system:

**Text element:**
```json
{
  "id": "label_text",
  "type": "text",
  "containerId": "parent_rect",
  "textAlign": "center",
  "verticalAlign": "middle"
}
```

**Container shape:**
```json
{
  "id": "parent_rect",
  "type": "rectangle",
  "boundElements": [
    { "id": "label_text", "type": "text" },
    { "id": "arrow_1", "type": "arrow" }
  ]
}
```

A shape's `boundElements` can contain BOTH arrow bindings and text bindings.

---

## Multi-Point Arrows

Arrows can have intermediate points for routing around obstacles:

```json
"points": [[0, 0], [100, 0], [100, 100], [200, 100]]
```

This creates an arrow that goes right, then down, then right again. The `width` and `height` must be the bounding box of all points.

For the example above: `width: 200`, `height: 100`.

---

## Elbowed (Right-Angle) Arrows

Set `"elbowed": true` for arrows that route with 90-degree angles:

```json
{
  "type": "arrow",
  "elbowed": true,
  "points": [[0, 0], [100, 0], [100, 80], [200, 80]]
}
```

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Missing `boundElements` on shape | Arrow doesn't move with shape | Add `{"id": "arrow_id", "type": "arrow"}` to shape's boundElements |
| Missing `startBinding`/`endBinding` on arrow | Arrow floats free | Add binding object with elementId and fixedPoint |
| Wrong `elementId` in binding | Arrow points to nothing | Verify ID matches the target shape exactly |
| `points[0]` not `[0, 0]` | Arrow renders at wrong position | First point must always be `[0, 0]` |
| `width`/`height` doesn't match points bounding box | Arrow clips or overflows | Calculate from max/min of all points |
| `containerId` set but no matching `boundElements` | Text appears outside shape | Add `{"id": "text_id", "type": "text"}` to container's boundElements |
