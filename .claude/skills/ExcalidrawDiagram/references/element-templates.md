# Excalidraw Element Templates

Copy-paste JSON templates for each element type. Replace IDs, positions, colors, and text as needed.

---

## 1. Rectangle (with contained text)

```json
{
  "id": "rect_process",
  "type": "rectangle",
  "x": 100,
  "y": 100,
  "width": 180,
  "height": 90,
  "angle": 0,
  "strokeColor": "#1e3a5f",
  "backgroundColor": "#3b82f6",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": { "type": 3 },
  "seed": 1234567,
  "version": 1,
  "versionNonce": 7654321,
  "index": "a0",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": [
    { "id": "rect_process_text", "type": "text" }
  ],
  "updated": 1700000000000,
  "link": null,
  "locked": false
},
{
  "id": "rect_process_text",
  "type": "text",
  "x": 110,
  "y": 130,
  "width": 160,
  "height": 25,
  "angle": 0,
  "strokeColor": "#ffffff",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": null,
  "seed": 2345678,
  "version": 1,
  "versionNonce": 8765432,
  "index": "a1",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false,
  "fontSize": 16,
  "fontFamily": 3,
  "text": "Process Step",
  "originalText": "Process Step",
  "textAlign": "center",
  "verticalAlign": "middle",
  "containerId": "rect_process",
  "autoResize": true,
  "lineHeight": 1.25
}
```

---

## 2. Ellipse (Start/End Node)

```json
{
  "id": "start_node",
  "type": "ellipse",
  "x": 50,
  "y": 50,
  "width": 120,
  "height": 60,
  "angle": 0,
  "strokeColor": "#c2410c",
  "backgroundColor": "#fed7aa",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": null,
  "seed": 3456789,
  "version": 1,
  "versionNonce": 9876543,
  "index": "a0",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": [
    { "id": "start_text", "type": "text" }
  ],
  "updated": 1700000000000,
  "link": null,
  "locked": false
}
```

---

## 3. Diamond (Decision)

```json
{
  "id": "decision_budget",
  "type": "diamond",
  "x": 200,
  "y": 200,
  "width": 140,
  "height": 100,
  "angle": 0,
  "strokeColor": "#b45309",
  "backgroundColor": "#fef3c7",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": { "type": 2 },
  "seed": 4567890,
  "version": 1,
  "versionNonce": 1098765,
  "index": "a2",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": [
    { "id": "decision_text", "type": "text" }
  ],
  "updated": 1700000000000,
  "link": null,
  "locked": false
}
```

---

## 4. Arrow (Connecting Two Shapes)

```json
{
  "id": "arrow_start_to_process",
  "type": "arrow",
  "x": 170,
  "y": 80,
  "width": 130,
  "height": 0,
  "angle": 0,
  "strokeColor": "#1e3a5f",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": { "type": 2 },
  "seed": 5678901,
  "version": 1,
  "versionNonce": 2109876,
  "index": "a3",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false,
  "points": [[0, 0], [130, 0]],
  "startBinding": {
    "elementId": "start_node",
    "fixedPoint": [1, 0.5],
    "mode": "inside"
  },
  "endBinding": {
    "elementId": "rect_process",
    "fixedPoint": [0, 0.5],
    "mode": "inside"
  },
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "elbowed": false
}
```

**Remember:** Both `start_node` and `rect_process` must include `{"id": "arrow_start_to_process", "type": "arrow"}` in their `boundElements` arrays.

---

## 5. Free-Floating Text (Label/Annotation)

```json
{
  "id": "label_yes",
  "type": "text",
  "x": 300,
  "y": 180,
  "width": 30,
  "height": 20,
  "angle": 0,
  "strokeColor": "#047857",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": null,
  "seed": 6789012,
  "version": 1,
  "versionNonce": 3210987,
  "index": "a4",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false,
  "fontSize": 14,
  "fontFamily": 3,
  "text": "YES",
  "originalText": "YES",
  "textAlign": "center",
  "verticalAlign": "top",
  "containerId": null,
  "autoResize": true,
  "lineHeight": 1.25
}
```

---

## 6. Line (Structural/Divider)

```json
{
  "id": "divider_line",
  "type": "line",
  "x": 50,
  "y": 300,
  "width": 400,
  "height": 0,
  "angle": 0,
  "strokeColor": "#64748b",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "dashed",
  "roughness": 0,
  "opacity": 60,
  "roundness": { "type": 2 },
  "seed": 7890123,
  "version": 1,
  "versionNonce": 4321098,
  "index": "a5",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false,
  "points": [[0, 0], [400, 0]],
  "startBinding": null,
  "endBinding": null,
  "startArrowhead": null,
  "endArrowhead": null
}
```

---

## 7. Dot/Marker (Timeline Point)

```json
{
  "id": "marker_1",
  "type": "ellipse",
  "x": 100,
  "y": 297,
  "width": 12,
  "height": 12,
  "angle": 0,
  "strokeColor": "#1e3a5f",
  "backgroundColor": "#3b82f6",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": null,
  "seed": 8901234,
  "version": 1,
  "versionNonce": 5432109,
  "index": "a6",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false
}
```

---

## 8. Evidence Artifact (Code/Data Block)

```json
{
  "id": "evidence_json",
  "type": "rectangle",
  "x": 100,
  "y": 400,
  "width": 250,
  "height": 120,
  "angle": 0,
  "strokeColor": "#334155",
  "backgroundColor": "#1e293b",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": { "type": 3 },
  "seed": 9012345,
  "version": 1,
  "versionNonce": 6543210,
  "index": "a7",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": [
    { "id": "evidence_json_text", "type": "text" }
  ],
  "updated": 1700000000000,
  "link": null,
  "locked": false
},
{
  "id": "evidence_json_text",
  "type": "text",
  "x": 110,
  "y": 410,
  "width": 230,
  "height": 100,
  "angle": 0,
  "strokeColor": "#22c55e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 1,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "roundness": null,
  "seed": 1123456,
  "version": 1,
  "versionNonce": 7654321,
  "index": "a8",
  "isDeleted": false,
  "groupIds": [],
  "frameId": null,
  "boundElements": null,
  "updated": 1700000000000,
  "link": null,
  "locked": false,
  "fontSize": 12,
  "fontFamily": 3,
  "text": "{\n  \"status\": \"APPR\",\n  \"totalCost\": 25000\n}",
  "originalText": "{\n  \"status\": \"APPR\",\n  \"totalCost\": 25000\n}",
  "textAlign": "left",
  "verticalAlign": "top",
  "containerId": "evidence_json",
  "autoResize": false,
  "lineHeight": 1.25
}
```
