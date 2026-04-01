# Excalidraw Render Pipeline

Render `.excalidraw` JSON files to PNG images for visual validation using Playwright + headless Chromium.

---

## Prerequisites

```bash
# Install dependencies
pip install playwright>=1.40.0
playwright install chromium
```

Or with uv:
```bash
uv sync
uv run playwright install chromium
```

---

## Usage

```bash
# Render a diagram to PNG
python references/render_excalidraw.py diagram.excalidraw

# Output: diagram.excalidraw.png (same directory)
```

---

## How It Works

1. `render_excalidraw.py` reads and validates the `.excalidraw` JSON
2. Computes bounding box from all elements (including arrow/line points)
3. Opens `render_template.html` in headless Chromium via Playwright
4. Injects diagram data via `window.renderDiagram()` JavaScript call
5. Waits for `window.__renderComplete` flag
6. Screenshots the rendered SVG element
7. Outputs PNG at 2x scale, max 1920px width

---

## Render-Validate Loop

After generating any `.excalidraw` file, follow this loop:

1. **Render:** `python references/render_excalidraw.py output.excalidraw`
2. **View:** Use the Read tool to view the PNG
3. **Audit:** Check for:
   - Overlapping text
   - Misaligned arrows (not connecting to shapes)
   - Cramped layout (elements too close)
   - Text clipping (text larger than its container)
   - Missing connections (arrows not bound)
   - Color contrast issues (light text on light background)
4. **Fix:** Edit the JSON to resolve issues
5. **Re-render:** Repeat until clean (typically 2-4 iterations)

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Blank PNG | No elements or all elements off-canvas | Check element x/y positions are reasonable (0-2000 range) |
| Elements cut off | Bounding box calculation wrong | Verify width/height match points for arrows/lines |
| Arrows disconnected | Missing bindings | Check both arrow bindings AND shape boundElements |
| Text invisible | Color matches background | Check strokeColor vs backgroundColor contrast |
| Script fails | Playwright not installed | Run `playwright install chromium` |

---

## Without Render Pipeline

If Playwright is not available, validate manually:

1. Open https://excalidraw.com in a browser
2. Import the `.excalidraw` file (drag and drop or File > Open)
3. Visually inspect the diagram
4. Make adjustments as needed

Or use the Obsidian Excalidraw plugin to open `.excalidraw` files directly.
