#!/usr/bin/env python3
"""Depth-contract and frontmatter checker for the MAS 9.2 series.

One binary pass/fail per post so each ISC structural criterion is a single test.

    python3 check_depth.py [glob]

Contract: >=3800 body words, >=7 '##' sections, >=3 tables, exactly 5 frontmatter
FAQs, >=5 references, draft:true, and a well-formed series block.
"""
import glob
import re
import sys

FLOOR_WORDS = 3800
# Series indexes are navigational, not articles. The 3800-word article floor does not
# apply: across the 20 existing indexes in this repo the range is 651-3818 words with a
# median near 2600, so padding an index to the article floor would fight the convention
# (and this series' own no-padding rule). Indexes are held to the repo median instead.
FLOOR_WORDS_INDEX = 2400
FLOOR_SECTIONS = 7
FLOOR_TABLES = 3
FAQ_COUNT = 5
FLOOR_REFS = 5


def split_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    return (m.group(1), m.group(2)) if m else ("", text)


def check(path):
    text = open(path, encoding="utf-8").read()
    fm, body = split_frontmatter(text)

    words = len(body.split())
    sections = len(re.findall(r"^## ", body, re.M))
    # A markdown table is identified by its header-separator row.
    tables = len(re.findall(r"^\|[\s:\-|]+\|\s*$", body, re.M))
    faqs = len(re.findall(r"^  - question:", fm, re.M))
    refs_block = re.search(r"^## References\s*$(.*?)(^## |\Z)", body, re.S | re.M)
    refs = len(re.findall(r"^- \[", refs_block.group(1), re.M)) if refs_block else 0

    draft_true = re.search(r"^draft:\s*true\s*$", fm, re.M) is not None
    series_ok = (re.search(r"^series:", fm, re.M) is not None
                 and re.search(r"^  part:\s*\d+", fm, re.M) is not None
                 and re.search(r"^  total:\s*\d+", fm, re.M) is not None)
    has_h1 = re.search(r"^# ", body, re.M) is not None
    has_nav = "Series Navigation" in body

    floor = FLOOR_WORDS_INDEX if "series-index" in path else FLOOR_WORDS
    checks = {
        "words": (words >= floor, f"{words}/{floor}"),
        "sections": (sections >= FLOOR_SECTIONS, f"{sections}/{FLOOR_SECTIONS}"),
        "tables": (tables >= FLOOR_TABLES, f"{tables}/{FLOOR_TABLES}"),
        "faqs": (faqs == FAQ_COUNT, f"{faqs}/{FAQ_COUNT}"),
        "refs": (refs >= FLOOR_REFS, f"{refs}/{FLOOR_REFS}"),
        "draft": (draft_true, "true" if draft_true else "NOT TRUE"),
        "series": (series_ok, "ok" if series_ok else "malformed"),
        "h1": (has_h1, "ok" if has_h1 else "missing"),
        "nav": (has_nav, "ok" if has_nav else "missing"),
    }
    failed = [f"{k}={v[1]}" for k, v in checks.items() if not v[0]]
    return failed, checks


def main():
    pattern = sys.argv[1] if len(sys.argv) > 1 else "posts/MAS-9-2/*.mdx"
    files = sorted(glob.glob(pattern))
    if not files:
        print(f"No files matched {pattern}")
        return 1
    all_pass = True
    for f in files:
        failed, checks = check(f)
        name = f.split("/")[-1]
        if failed:
            all_pass = False
            print(f"FAIL  {name}\n        {', '.join(failed)}")
        else:
            print(f"PASS  {name}  "
                  f"words={checks['words'][1].split('/')[0]} "
                  f"sec={checks['sections'][1].split('/')[0]} "
                  f"tbl={checks['tables'][1].split('/')[0]} "
                  f"refs={checks['refs'][1].split('/')[0]}")
    print(f"\n{len(files)} post(s) checked — {'ALL PASS' if all_pass else 'FAILURES PRESENT'}")
    return 0 if all_pass else 1


if __name__ == "__main__":
    sys.exit(main())
