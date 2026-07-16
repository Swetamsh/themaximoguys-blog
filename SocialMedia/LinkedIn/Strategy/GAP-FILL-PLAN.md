# LinkedIn Gap-Fill Plan — Validated Against Notion

**Date:** 2026-07-15
**Source of truth:** [TMG LinkedIn Content Calendar](https://www.notion.so/333638519ab181aa96cce62459aa08ea) (118 rows, queried 2026-07-15)
**Owner:** Surendra Katta (personal) + TheMaximoGuys (company page)
**Companion to:** `MARKETING-STRATEGY.md`, `TRAFFIC-STRATEGY.md`

> ⚠️ **Correction note:** An earlier draft of this plan (built from repo files only) claimed 6 series had "zero LinkedIn presence." Validation against the live Notion calendar disproved most of it — Health, Monitor, Predict, MVI, Admin, and the developer/Java posts are already in the pipeline (mostly posted or scheduled). The **real, verified gaps are just two series** plus one workflow bottleneck. This document reflects the validated state.

---

## What Notion Actually Shows (118 posts)

| Series (by blog link) | In Notion | Status | Verdict |
|---|---|---|---|
| MAS Features | 53 | 30 posted / 23 approved | ✅ Covered |
| Think MAS (incl. dev/Java) | 16 | all posted (Surendra personal) | ✅ Covered |
| Visual Inspection | 13 | 1-5 posted, 6-12 approved (→Aug 14) | ✅ In flight |
| MAS Health | 8 | posted | ✅ Covered |
| MAS Monitor | 8 | posted | ✅ Covered |
| MAS Predict | 8 | posted | ✅ Covered |
| MAS Admin | 10 | **all DRAFT** | ⚠️ Stuck |
| TMG Tools | 2 | posted/approved | ✅ Covered |
| **MAS-INTEGRATION** | **0** | — | ❌ **GAP** |
| **MAS-MANAGE** | **0** | — | ❌ **GAP** |

**Posted-by split:** Company Page 51 · Surendra Katta 39 · Laxmi 10. Surendra is *not* short of content — he's running an active daily Health/Monitor/Predict personal campaign (Jul 2026).

**Developer/Java content is already live** as Surendra personal posts:
`from-mbos-to-microservices`, `stop-customizing-old-way` (the "Replace Java, DB tricks & 3rd-party tools" flagship), `beyond-mif-event-driven`, `websphere-to-platform-engineer`, `integration-modernization`. Only `dev-mindset-01-identity-crisis` is missing.

---

## The Real Gaps (verified)

### GAP 1 — MAS-INTEGRATION (8 blogs) ⭐ TOP PRIORITY
Not even a Series option in the Notion schema. Zero rows. Every "integration" hit in the calendar points to *other* blogs (integration-reporting, integration-modernization, predict-integration, monitor-integration-apis) — the dedicated 8-part integration series has **no LinkedIn footprint at all.** This is the deepest developer/Java-adjacent content in the catalog and the single biggest untapped pillar.

| Blog | Personal hook (Surendra) | Format |
|---|---|---|
| 01 legacy-mif-deep-dive | "A eulogy for the MIF I built my career on" | Story |
| 02 api-first-architecture | "API-first isn't a buzzword — it's the new contract" | Hot-take |
| 03 event-driven-transformation | "Publish channels → events: the shift I underestimated" | Story + carousel |
| 04 rest-api-guide | "The MAS REST calls every dev should bookmark" | Cheat-sheet carousel |
| 05 enterprise-patterns | "App Connect vs Kafka: when to reach for which" | Comparison carousel |
| 06 erp-modernization | "SAP/Oracle ↔ Maximo: the new integration playbook" | Listicle |
| 07 iot-realtime | "Connecting the physical world to Maximo in real time" | Concept |
| 08 security-governance | "Integration security nobody budgets for — until the audit" | Hot-take |

**Target:** 8 posts + 3 carousels. Company-led with Surendra amplification.

### GAP 2 — MAS-MANAGE (11 blogs)
Zero rows in Notion. Newest content (Jun 2026), core product. Not a Series option either.

| Blog | Hook |
|---|---|
| 01 the-new-manage | "What actually changed in Manage — and what didn't" |
| 02 work-centers-to-rba | "Work Centers are gone. Role-based apps replace them." |
| 03 work-management | "Work orders, job plans, PMs — reimagined" |
| 04 reliability-strategies | "58,000 failure modes shipped in the box (FMEA/RCM)" |
| 05 inspections-digital-forms | "The Inspection Form Builder changes field data capture" |
| 06 maximo-mobile | "Offline-first field work: the end of 'no signal' excuses" |
| 07 graphical-scheduling-fsm | "Graphical scheduling + FSM in one place" |
| 08 asset-location-management | "Hierarchies, linear assets, meters, ACM" |
| 09 inventory-procurement | "Storerooms → role-based procurement apps" |
| 10 ai-inside-manage | "The Maximo Assistant inside Manage" |
| 11 configuration-administration | "The admin/developer split in Manage 9" |

**Target:** 1 index carousel + 11 single infographics.

### GAP 3 (workflow, not content) — MAS-ADMIN drafts stuck
10 MAS-Admin posts already drafted in Notion, all in **DRAFT** status — never reviewed or posted. No new content needed; this is a **review-and-schedule** action, not authoring.

### GAP 4 (minor) — dev-mindset-01-identity-crisis
The one developer/Java blog with no LinkedIn post. One personal post from Surendra closes it.

---

## Corrected Priority

| Priority | Action | Type | Effort |
|---|---|---|---|
| **P0** | MAS-INTEGRATION series → LinkedIn | New content | 8 posts + 3 carousels |
| **P1** | MAS-MANAGE series → LinkedIn | New content | 12 assets |
| **P2** | Push MAS-ADMIN 10 drafts → review → schedule | Workflow | 0 authoring |
| **P3** | dev-mindset-01-identity-crisis personal post | New content | 1 post |

**Everything else (Features, Think MAS, Health, Monitor, Predict, MVI, TMG Tools) is already covered or scheduled — do not re-create.**

---

## Production Pipeline (per gap series)

1. `/micro-blog <series>` → post copy + infographic per blog
2. `/sketch-carousel` or `/linkedin-carousel` → carousels
3. Draft Surendra personal variants (post-then-edit link per `TRAFFIC-STRATEGY.md`)
4. **Add rows to the Notion calendar** with `Series`, `Posted By`, `Status: DRAFT` (note: add "MAS Integration" and "MAS Manage" as Series options first)
5. Publish via `LinkedInPublish.ts` + Playwright first comment
6. Update Notion `Status → POSTED` + `Published URL`

---

## Totals (validated scope)

| Gap | Posts | Carousels |
|---|---|---|
| P0 MAS-INTEGRATION | 8 | 3 |
| P1 MAS-MANAGE | 11 | 1 |
| P2 MAS-ADMIN (unstick drafts) | 10 existing | — |
| P3 identity-crisis | 1 | — |
| **New authoring** | **~20 posts** | **4 carousels** |

The opportunity is **two untapped series (Integration + Manage)** and **10 stuck Admin drafts** — far narrower, and far more actionable, than the original repo-based estimate.
