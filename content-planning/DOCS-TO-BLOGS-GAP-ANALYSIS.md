# MAS 9 Docs -> Blogs: Gap Analysis & Decision Status

**Updated:** 2026-07-16 (night-shift: MAS-OPTIMIZER Part 5 added)  
**Author:** Swetansh (via TheMaximoGuys AI pipeline)  
**Source docs:** `/root/TMG_MAS9_UPGRADE/DOC1..DOC12.md`  
**Blog root:** `/root/themaximoguys-blog/posts/`  
**Audit basis:** repo scan of `posts/` on 2026-07-16, post counts, source/reference sections,
word-count depth, and cover-image path checks.

> Current decision state: the original DOC-to-blog backlog is mostly converted into deep blog
> drafts. WO Missing Pieces is production-ready with covers. Assist, Optimizer, Nuclear,
> Reliability, and Supply Chain are deep text-complete but still need cover assets before they
> should be treated as fully published/production-complete. Databricks/Lakehouse, Parts Identifier,
> and Civil Infrastructure remain the main unbuilt content decisions.

---

## 1. Executive Status

| Bucket | Count | Status |
|---|---:|---|
| Fully built and asset-complete | 7 source areas | DOC1, DOC3, DOC4, DOC6, DOC7, plus existing DOC2 Health/Monitor/Predict/MVI coverage |
| Deep research/text complete, covers pending | 5 series | MAS-ASSIST, MAS-OPTIMIZER, MAS-NUCLEAR, MAS-RELIABILITY, MAS-SUPPLY-CHAIN |
| Still pending as new deep blog work | 3 series | MAS-DATABRICKS, MAS-PARTS-IDENTIFIER, MAS-CIVIL-INFRASTRUCTURE |
| Optional single-post gaps | 3 posts | DOC1 reporting, DOC1 upgrade gotchas, DOC6 extension crossovers |

**Important distinction:** "content complete" below means the MDX posts exist, are long-form, and
include references. "Production complete" means the posts also have local cover assets resolved on disk.

---

## 2. Coverage Matrix

| DOC | Topic | Current verdict | Built by | Remaining decision |
|-----|-------|-----------------|----------|--------------------|
| DOC1 | Manage Upgrade Roadmap | ✅ **PRODUCTION COMPLETE** | `posts/MAS-MANAGE` (12 posts) | Optional: Reporting BIRT -> Cognos/KPI Manager; Upgrade Gotchas |
| DOC2 | Suite Add-Ons | ⚠️ **MOSTLY BUILT** | Health(9), Monitor(9), Predict(9), MVI(13), Assist(7), Optimizer(5) | Parts Identifier and Civil Infrastructure still need standalone deep series if wanted |
| DOC3 | Paid Add-Ons & Industry | ✅ **PRODUCTION COMPLETE** | `posts/MAS-FEATURES` parts 15-20, 25 | None |
| DOC4 | Supply Chain Features | ✅ **PRODUCTION COMPLETE** | `posts/MAS-FEATURES` parts 21-25 plus `MAS-MANAGE-09` | None for feature coverage |
| DOC5 | Data Analytics & Databricks | ⛔ **PENDING** | Native analytics only across Features/Health/Monitor/Predict | Build MAS-DATABRICKS/lakehouse series or explicitly defer |
| DOC6 | Java Extensions | ✅ **PRODUCTION COMPLETE** | `posts/MAS-JAVA-EXTENSIONS` (7 posts + covers) | Optional extension-crossovers post |
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
| `MAS-JAVA-EXTENSIONS` | DOC6 | 7 | Java extensions, PLUS registry, product XML, DB add-ons, MAS 9 deployment, Java 17. |
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
| `MAS-OPTIMIZER` | DOC2 | 6 | ~18.6k words | optimization rationale, constraints/objectives model, data prerequisites, routing/ArcGIS, dispatching/AppPoints/phased rollout (Part 5 now written) | 6 covers (1 of 6 done — Part 5) |
| `MAS-SUPPLY-CHAIN` | DOC8-10 | 11 | ~38.7k words | storekeeper first hour, inventory usage, receiving/barcode, cycle counts, reservations, buyer start center, PR->PO, sourcing, expedite/match-pay, lifecycle | 11 covers |
| `MAS-RELIABILITY` | DOC11 | 8 | ~29.5k words | RCM/FMEA, MTBF/MTTR, reliability spine, analysis-to-action, APM layer, data load sequence, phased rollout | 8 covers |
| `MAS-NUCLEAR` | DOC12 | 8 | ~20.6k words | product lineage/AppPoints, tech specs/LCO, configuration control, Maintenance Rule, CAP/tagout, regulatory crosswalk, MAS 9.2 reality | 8 covers |

**Optimizer note:** `MAS-OPTIMIZER` Part 5 (`mas-optimizer-dispatching-rollout`) has been written
(2026-07-16, night-shift), closing the structural gap the index/navigation already referenced. The
series is now content-complete at 6 files (index + 5 parts); only cover-image asset work remains
(5 of 6 covers still pending — Part 5's is done).

---

## 4. Pending Blog Decisions

### Highest-Value Pending Content

| Priority | Series | Source | Why it is still pending | Recommended decision |
|---:|---|---|---|---|
| 1 | `MAS-DATABRICKS` | DOC5 | No standalone Databricks/lakehouse series exists. Current posts mention Databricks only incidentally. | Build if analytics/lakehouse authority matters this quarter. |
| 2 | `MAS-PARTS-IDENTIFIER` | DOC2 | Directory exists but has no MDX files. Coverage today is only shallow inside `MAS-FEATURES-14/24`. | Build a short 5-part computer-vision/parts workflow series or explicitly fold into Supply Chain. |
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
| `MAS-MANAGE` | Optional dedicated covers; current covers use existing borrowed assets |

---

## 5. Recommended Next Decision

1. ~~**Fix Optimizer first**~~ — done 2026-07-16 (night-shift): `mas-optimizer-dispatching-rollout`
written as Part 5, nav chain confirmed intact end to end.
2. **Generate covers for text-complete series:** Assist, Supply Chain, Reliability, Nuclear, and
Optimizer can become production-complete once their `./images/*.png` assets exist (Optimizer Part 5
cover is done; index + Parts 1-4 remain).
3. **Choose one remaining net-new content lane:** Databricks has the strongest strategic authority
value; Parts Identifier is the fastest; Civil Infrastructure is niche and should wait unless the
audience is active.

---

## 6. What Not to Rebuild

- Do not rebuild DOC1, DOC3, DOC4, DOC6, or DOC7 as new series.
- Do not split DOC8/DOC9/DOC10 into separate series; the merged Supply Chain Playbook is already built.
- Do not build a generic DOC12 "Maximo 7.6 vs MAS" comparison; THINK-MAS and MAS-FEATURES already own it.
- Do not duplicate Health/Monitor/Predict/MVI from DOC2; those app series already exist.
