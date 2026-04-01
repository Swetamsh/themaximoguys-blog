#!/usr/bin/env python3
"""Render an Excalidraw JSON file to PNG using Playwright + headless Chromium."""

import json
import sys
from pathlib import Path

def validate_excalidraw(data: dict) -> None:
    """Basic validation of Excalidraw JSON structure."""
    assert data.get("type") == "excalidraw", "Missing or wrong 'type' field"
    assert "elements" in data, "Missing 'elements' array"
    assert isinstance(data["elements"], list), "'elements' must be an array"

def compute_bounding_box(elements: list) -> tuple:
    """Compute bounding box from all elements, including arrow/line points."""
    min_x, min_y = float("inf"), float("inf")
    max_x, max_y = float("-inf"), float("-inf")

    for elem in elements:
        if elem.get("isDeleted"):
            continue

        x, y = elem.get("x", 0), elem.get("y", 0)
        w, h = elem.get("width", 0), elem.get("height", 0)

        # For linear elements, compute from points
        points = elem.get("points")
        if points and isinstance(points, list):
            for px, py in points:
                min_x = min(min_x, x + px)
                min_y = min(min_y, y + py)
                max_x = max(max_x, x + px)
                max_y = max(max_y, y + py)
        else:
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x + w)
            max_y = max(max_y, y + h)

    padding = 40
    return (min_x - padding, min_y - padding, max_x + padding, max_y + padding)

def render(input_path: str) -> str:
    """Render .excalidraw file to PNG. Returns output path."""
    from playwright.sync_api import sync_playwright

    input_file = Path(input_path)
    if not input_file.exists():
        print(f"Error: {input_file} not found")
        sys.exit(1)

    with open(input_file) as f:
        data = json.load(f)

    validate_excalidraw(data)

    if not data["elements"]:
        print("Warning: No elements in diagram")
        sys.exit(1)

    bbox = compute_bounding_box(data["elements"])
    width = int(bbox[2] - bbox[0])
    height = int(bbox[3] - bbox[1])

    # Scale for readability, cap at 1920px
    scale = 2
    max_width = 1920
    if width * scale > max_width:
        scale = max_width / width

    template_path = Path(__file__).parent / "render_template.html"
    output_path = input_file.with_suffix(input_file.suffix + ".png")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(
            viewport={"width": int(width * scale) + 100, "height": int(height * scale) + 100}
        )

        page.goto(f"file://{template_path.resolve()}")
        page.wait_for_function("typeof window.renderDiagram === 'function'", timeout=30000)

        page.evaluate(f"window.renderDiagram({json.dumps(data)})")
        page.wait_for_function("window.__renderComplete === true", timeout=30000)

        svg_element = page.query_selector("#excalidraw-svg svg")
        if svg_element:
            svg_element.screenshot(path=str(output_path), type="png")
        else:
            page.screenshot(path=str(output_path), type="png", full_page=True)

        browser.close()

    print(f"Rendered: {output_path}")
    return str(output_path)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python render_excalidraw.py <file.excalidraw>")
        sys.exit(1)
    render(sys.argv[1])
