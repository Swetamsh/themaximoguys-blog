# MAS 9 Docs -> Blogs: Gap Analysis & Decision Status

**Updated:** 2026-07-18 (night-shift: MAS-OPTIMIZER Part 5 added, then deepened; MAS-JAVA-EXTENSIONS Part 7 deepened to 5,100+ words; MAS-DATABRICKS series index drafted, then Part 1 "Why Your Maximo Data Belongs in a Lakehouse" added with cover, then Part 2 "Getting Maximo Data Out: Kafka, Data Export, and CDC Patterns" added with cover, then Part 3 "Building the Asset Lakehouse: Bronze, Silver, Gold for Maximo Objects" added with cover, then Part 4 "Five Analytics Use Cases: Reliability, Cost, Inventory, Backlog, and PM Compliance on the Gold Layer" added with cover, then Part 5 "Custom ML in Databricks vs. Maximo Predict" drafted — content complete but cover generation blocked by a revoked/leaked nanobanana API key, needs operator credential rotation before the cover can be built; then Part 6 "Governance and Security for the MAS Lakehouse" (series finale) drafted 2026-07-18 — content complete, cover generation blocked by the SAME still-unrotated leaked API key, series is now content-complete end to end pending only the operator key rotation and both parts' covers; **then night-shift job `parts-id-00-index` audited MAS-PARTS-IDENTIFIER and found this section of the doc stale** — a 4-part MAS-PARTS-IDENTIFIER series (index + Parts 1-4, `posts/MAS-PARTS-IDENTIFIER/`, all `draft: false`, 3,400-4,300 words each, committed in `c429e81`) already exists and was NOT reflected here. `automation/off-hours/queue.json` still carries a stale `parts-id-00-index` item claiming "Directory exists but is empty" plus four more pending items (`parts-id-01..05`) describing a conflicting 5-part rebuild plan with different part topics. The job could not write the assigned index post — it already exists and is published, so overwriting it would violate the night-shift "do not modify existing published posts" rule. Only real remaining gap: all 5 files (index + 4 parts) have zero local cover images. This doc has been corrected below; `queue.json` itself was left untouched since the runner script owns queue state — a human or the next `replan` job should drop/rewrite `parts-id-01..05` and replace them with 5 cover-generation items for the files that already exist.)  
**Author:** Swetansh (via TheMaximoGuys AI pipeline)  
**Source docs:** `/root/TMG_MAS9_UPGRADE/DOC1..DOC12.md`  
**Blog root:** `/root/themaximoguys-blog/posts/`  
**Audit basis:** repo scan of `posts/` on 2026-07-16, post counts, source/reference sections,
word-count depth, and cover-image path checks.

> Current decision state: the original DOC-to-blog backlog is mostly converted into deep blog
> drafts. WO Missing Pieces is production-ready with covers. Assist, Optimizer, Nuclear,
> Reliability, Supply Chain, and Parts Identifier are deep text-complete but still need cover
> assets before they should be treated as fully published/production-complete. Civil
> Infrastructure remains the only true unbuilt content decision (Databricks is content-complete
> pending only an API-key rotation for its last two covers).

---

## 1. Executive Status

| Bucket | Count | Status |
|---|---:|---|
| Fully built and asset-complete | 7 source areas | DOC1, DOC3, DOC4, DOC6, DOC7, plus existing DOC2 Health/Monitor/Predict/MVI coverage |
| Deep research/text complete, covers pending | 7 series | MAS-ASSIST, MAS-OPTIMIZER, MAS-NUCLEAR, MAS-RELIABILITY, MAS-SUPPLY-CHAIN, MAS-DATABRICKS, MAS-PARTS-IDENTIFIER |
| Still pending as new deep blog work | 1 series | MAS-CIVIL-INFRASTRUCTURE |
| Optional single-post gaps | 3 posts | DOC1 reporting, DOC1 upgrade gotchas, DOC6 extension crossovers |

**Important distinction:** "content complete" below means the MDX posts exist, are long-form, and
include references. "Production complete" means the posts also have local cover assets resolved on disk.

---

## 2. Coverage Matrix

| DOC | Topic | Current verdict | Built by | Remaining decision |
|-----|-------|-----------------|----------|--------------------|
| DOC1 | Manage Upgrade Roadmap | ✅ **PRODUCTION COMPLETE** | `posts/MAS-MANAGE` (12 posts) | Optional: Reporting BIRT -> Cognos/KPI Manager; Upgrade Gotchas |
| DOC2 | Suite Add-Ons | ⚠️ **MOSTLY BUILT** | Health(9), Monitor(9), Predict(9), MVI(13), Assist(7), Optimizer(5), Parts Identifier(5) | Parts Identifier is content-complete (index + 4 parts), covers pending; Civil Infrastructure still needs a standalone series if wanted |
| DOC3 | Paid Add-Ons & Industry | ✅ **PRODUCTION COMPLETE** | `posts/MAS-FEATURES` parts 15-20, 25 | None |
| DOC4 | Supply Chain Features | ✅ **PRODUCTION COMPLETE** | `posts/MAS-FEATURES` parts 21-25 plus `MAS-MANAGE-09` | None for feature coverage |
| DOC5 | Data Analytics & Databricks | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-DATABRICKS` (index + Part 1 + Part 2 + Part 3 + Part 4 built 2026-07-17 with covers; Part 5 + Part 6 content built 2026-07-17/18, both covers blocked on the same nanobanana API key rotation) | Rotate the leaked nanobanana API key, then generate Part 5's and Part 6's covers |
| DOC6 | Java Extensions | ✅ **PRODUCTION COMPLETE** | `posts/MAS-JAVA-EXTENSIONS` (8 posts + covers, incl. Part 7 extension crossovers added 2026-07-16, deepened 2026-07-17 to 5,100+ words with Nuclear clone-upgrade guidance, expanded MAXOBJECT diagnostics, a troubleshooting section, and a Type 5 worked example) | None |
| DOC7 | Work Order Management | ✅ **PRODUCTION COMPLETE** | `posts/MAS-WORK-ORDER-OPS` (index + 6 posts + covers) | None |
| DOC8 | Storekeeper Quick Wins | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-SUPPLY-CHAIN` (merged playbook) | Generate 11 covers |
| DOC9 | Purchasing Quick Wins | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-SUPPLY-CHAIN` (merged playbook) | Generate 11 covers |
| DOC10 | Purchasing Lifecycle Flow | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-SUPPLY-CHAIN` (merged playbook) | Generate 11 covers |
| DOC11 | Reliability Strategies | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-RELIABILITY` (index + 7 posts) | Generate 8 covers |
| DOC12 | Nuclear Add-Ons (9.2) | 🟡 **CONTENT COMPLETE, ASSETS PENDING** | `posts/MAS-NUCLEAR` (index + 7 posts) | Generate 8 covers |

**Net movement since the 2026-07-15 audit:** DOC7, DOC8, DOC9, DOC10, DOC11, DOC12, DOC2 Assist,
and DOC2 Optimizer moved from backlog into actual long-form MDX drafts. The remaining content backlog
is now much smaller and more specific.

---

## 3. Completed Blog Inventory

### Production Complete

These have both substantive MDX content and local cover assets resolved on disk.

| Series | Source | Files | Status notes |
|---|---|---:|---|
| `MAS-MANAGE` | DOC1 | 12 | Manage upgrade roadmap series is built. Covers currently borrow existing feature assets; dedicated Manage covers remain optional polish. |
| `MAS-FEATURES` | DOC3, DOC4, parts of DOC2/DOC12 | 26 | Paid add-ons, industry solutions, supply-chain features, AI apps overview, licensing, and roadmap coverage. |
| `MAS-JAVA-EXTENSIONS` | DOC6 | 8 | Java extensions, PLUS registry, product XML, DB add-ons, MAS 9 deployment, Java 17, extension crossovers (PLUSV/Nuclear/shared concepts). |
| `MAS-WORK-ORDER-OPS` | DOC7 | 7 | Edge-filler series for service requests, approvals/e-sig, dashboards, KPIs, reporting, REST/Kafka. Covers exist. |
| `MAS-HEALTH` | DOC2 | 9 | Existing deep Health series. |
| `MAS-MONITOR` | DOC2 | 9 | Existing deep Monitor series. |
| `MAS-PREDICT` | DOC2 | 9 | Existing deep Predict series. |
| `MAS-VISUAL-INSPECTION` | DOC2 | 13 | Existing deep Visual Inspection/MVI series. |

### Deep Research / Text Complete, Covers Pending

These are ready for editorial review, but their frontmatter points at missing `./images/*.png` files.

| Series | Source | Files | Word-count depth | What is covered | Remaining asset work |
|---|---|---:|---:|---|---|
| `MAS-ASSIST` | DOC2 | 7 | ~22.8k words | watsonx foundation, natural-language work guidance, SME knowledge capture, guided troubleshooting, deployment, governance/AppPoints | 7 covers |
| `MAS-OPTIMIZER` | DOC2 | 6 | ~19.7k words | optimization rationale, constraints/objectives model, data prerequisites, routing/ArcGIS, dispatching/AppPoints/phased rollout (Part 5 deepened 2026-07-16: crew scheduling, resource leveling, dispatcher override-vs-reoptimize playbook, re-optimization edge cases, troubleshooting, MAS 9.1.x release-note detail) | 6 covers (1 of 6 done — Part 5) |
| `MAS-SUPPLY-CHAIN` | DOC8-10 | 11 | ~38.7k words | storekeeper first hour, inventory usage, receiving/barcode, cycle counts, reservations, buyer start center, PR->PO, sourcing, expedite/match-pay, lifecycle | 11 covers |
| `MAS-RELIABILITY` | DOC11 | 8 | ~29.5k words | RCM/FMEA, MTBF/MTTR, reliability spine, analysis-to-action, APM layer, data load sequence, phased rollout | 8 covers |
| `MAS-NUCLEAR` | DOC12 | 8 | ~20.6k words | product lineage/AppPoints, tech specs/LCO, configuration control, Maintenance Rule, CAP/tagout, regulatory crosswalk, MAS 9.2 reality | 8 covers |
| `MAS-PARTS-IDENTIFIER` | DOC2 | 5 | ~18.7k words | what the app is and how AI vision recognition works, mobile capture-to-match workflow and photo craft, catalog matching/inventory/ordering and item-master data quality, deployment/training-image methodology/accuracy metrics/pilot design | 5 covers (index + 4 parts, 0 done) |

**Parts Identifier note:** `MAS-PARTS-IDENTIFIER` (index + Parts 1-4, `posts/MAS-PARTS-IDENTIFIER/`,
committed 2026-07-16 in `c429e81`) was found already content-complete and published (`draft: false`)
during the 2026-07-18 night-shift run of item `parts-id-00-index` — this doc and `queue.json` had
gone stale and did not reflect it. `queue.json` still lists `parts-id-01..05` as pending items
describing a *different* 5-part rebuild plan (setup/training, storeroom workflow, mobile field,
governance/AppPoints) that would duplicate/conflict with the parts already written. Those queue
items should be replaced with 5 cover-generation items for the existing files, not run as-is.
**Update 2026-07-18 (job `parts-id-01-what-is`):** confirmed the same conflict on the next queued
item — its topic ("What Is the AI Parts Identifier and Why Storerooms Need It", slug
`mas-parts-identifier-01-overview`) duplicates the already-published Part 1
(`mas-parts-identifier-intro-ai-vision`, series.total 4). The job declined to write it and reported
`FAILED` rather than create a second, conflicting Part 1. `queue.json`'s `parts-id-02..05` remain
pending with the same defect and will fail identically until a human or `replan` job rewrites them.
**Update 2026-07-18 (job `parts-id-02-training`):** confirmed the same conflict on the next queued
item — its topic ("Setting Up and Training the Parts Model", slug
`mas-parts-identifier-02-setup-training`) would duplicate the already-published Part 2
(`mas-parts-identifier-mobile-recognition`, "The Mobile Part-Recognition Workflow", series.total
4, draft:false). The job declined to write it and reported `FAILED` rather than create a second,
conflicting Part 2. `queue.json`'s `parts-id-03..05` remain pending with the same defect and will
fail identically until a human or `replan` job rewrites them.
**Update 2026-07-18 (job `parts-id-03-storeroom-workflow`):** confirmed the same conflict on the
next queued item — its brief ("End-to-end storeroom flow: photo capture, candidate matches,
confirming the item, issuing against a work order", slug `mas-parts-identifier-03-storeroom-workflows`,
declared `series_total: 5`) duplicates ground already covered by the already-published Part 2
(`mas-parts-identifier-mobile-recognition` — capture, candidate list, confirm/verify) and Part 3
(`mas-parts-identifier-catalog-matching` — inventory lookup, issuing, ordering), both `series.total
4`, `draft:false`. Writing it would either collide with the existing Part 3 slug/number or force a
renumbering of the live published series, which the night-shift "do not modify existing published
posts" rule forbids. The job declined to write it and reported `FAILED`. `queue.json`'s
`parts-id-04..05` remain pending with the same defect and will fail identically until a human or
`replan` job rewrites them — the only real remaining gap for this series is the 5 missing cover
images on the existing files.

**Optimizer note:** `MAS-OPTIMIZER` Part 5 (`mas-optimizer-dispatching-rollout`) has been written
(2026-07-16, night-shift), closing the structural gap the index/navigation already referenced, and
subsequently deepened the same night from ~3.7k to ~4.3k body words with additional researched
sections (crew scheduling/resource leveling, a dispatcher override-vs-reoptimize decision table,
re-optimization edge cases, a troubleshooting table, and MAS 9.1.x Optimizer release-note detail
sourced from IBM release notes and practitioner community writeups). The series is now
content-complete at 6 files (index + 5 parts); only cover-image asset work remains (5 of 6 covers
still pending — Part 5's is done).

---

## 4. Pending Blog Decisions

### Highest-Value Pending Content

| Priority | Series | Source | Why it is still pending | Recommended decision |
|---:|---|---|---|---|
| 1 | `MAS-DATABRICKS` | DOC5 | **Content complete 2026-07-18 (night-shift):** series index (Part 0) through Part 6 all drafted — the full six-part series is content-complete. Part 5 ("Custom ML vs. Maximo Predict") and Part 6 ("Governance and Security for the MAS Lakehouse") both have their covers blocked by the same `403 PERMISSION_DENIED: API key reported as leaked` nanobanana failure, confirmed still unrotated as of 2026-07-18. | Rotate the nanobanana API key, then generate Part 5's and Part 6's covers — no further content work needed for this series. |
| ~~2~~ | ~~`MAS-PARTS-IDENTIFIER`~~ | DOC2 | **Resolved — already existed 2026-07-18 (night-shift discovery).** Index + Parts 1-4 are content-complete and published; this doc had gone stale claiming the directory was empty. | Generate 5 covers; correct `queue.json`'s conflicting `parts-id-01..05` rebuild items. |
| 3 | `MAS-CIVIL-INFRASTRUCTURE` | DOC2 | No standalone series exists. Coverage today is inside broader industry/add-on posts. | Build only if DOT/public infrastructure audience is a target. |
| ~~4~~ | ~~`MAS-OPTIMIZER` Part 5~~ | DOC2 | **Resolved 2026-07-16 (night-shift).** Part 5 written; nav chain confirmed intact. | Cover image still needed for Parts 1-4. |

### Pending Asset Work

| Series | Missing local covers |
|---|---:|
| `MAS-ASSIST` | 7 |
| `MAS-OPTIMIZER` | 5 (Part 5 cover done; Parts 1-4 + index still pending) |
| `MAS-SUPPLY-CHAIN` | 11 |
| `MAS-RELIABILITY` | 8 |
| `MAS-NUCLEAR` | 8 |
| `MAS-PARTS-IDENTIFIER` | 5 (index + Parts 1-4, none done) |
| `MAS-MANAGE` | Optional dedicated covers; current covers use existing borrowed assets |

---

## 5. Recommended Next Decision

1. ~~**Fix Optimizer first**~~ — done 2026-07-16 (night-shift): `mas-optimizer-dispatching-rollout`
written as Part 5, nav chain confirmed intact end to end.
2. **Generate covers for text-complete series:** Assist, Supply Chain, Reliability, Nuclear,
Parts Identifier, and Optimizer can become production-complete once their `./images/*.png` assets
exist (Optimizer Part 5 cover is done; Parts Identifier has zero of 5 done).
3. **Choose one remaining net-new content lane:** Civil Infrastructure is the only series with no
content yet — niche, build only if a DOT/public infrastructure audience is active. Databricks and
Parts Identifier are both content-complete and just need covers/key-rotation, not new writing.

---

## 6. What Not to Rebuild

- Do not rebuild DOC1, DOC3, DOC4, DOC6, or DOC7 as new series.
- Do not split DOC8/DOC9/DOC10 into separate series; the merged Supply Chain Playbook is already built.
- Do not build a generic DOC12 "Maximo 7.6 vs MAS" comparison; THINK-MAS and MAS-FEATURES already own it.
- Do not duplicate Health/Monitor/Predict/MVI from DOC2; those app series already exist.
