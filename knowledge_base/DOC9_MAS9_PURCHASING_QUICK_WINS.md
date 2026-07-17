# MAS 9 Purchasing Quick Wins

**Document:** DOC9 — Purchasing Quick Wins, Data Cleansing & Confident Auto-Reorder

**Version:** 1.0

**Date:** April 22, 2026

**Audience:** Buyers, procurement specialists, contract administrators, accounts-payable buyers, purchasing supervisors, procurement managers, and the admins who support them.

**Scope:** Day-to-day purchasing work in MAS 9 Manage — from "where do I click to approve this PR?" to "how do we run an auto-reorder pipeline we actually trust." Focused on practical, hands-on wins that make a buyer's day faster, cleaner, and defensible to audit.

**Upgrade Context:** Maximo 7.6.1.3 → MAS 9 (Manage 9.0 / 9.1)

**Companion Reading:**
- **DOC4** (Supply Chain Management Roadmap) — procurement architecture, contracts, integrations.
- **DOC8** (Storekeeper Quick Wins) — inventory/receiving/reorder from the storeroom side; every Tier 2 win here has a storeroom counterpart there.
- **DOC7** (Work Order Management Roadmap) — PR demand signals from maintenance.
- **DOC5** (Data Analytics / Databricks) — the strategic home for spend analytics once BIRT is retired.

This document is the **operator-level companion** for buyers — DOC4 is the architecture view, DOC9 is the buyer desk view. If you're reading this and you haven't read DOC8, read DOC8 first. Purchasing and the storeroom share the data that drives the auto-reorder pipeline, and a broken storeroom poisons every win in this doc.

---

## How to Use This Document

The wins are organized in **three tiers**. The ordering is not arbitrary. Before you build an auto-reorder pipeline (Tier 3) you must have clean vendors (Tier 1), a working RFQ process (Tier 2), and reorder points you trust (Tier 2). Skipping tiers buys you *faster automation of bad data* — which is worse than the manual process it replaced.

| Tier | Who | Time to value | Admin effort |
|------|-----|---------------|--------------|
| **Tier 0 — Starter pack** | Every buyer, Day 1 | Hour 1 | Admin: 60-90 min |
| **Tier 1 — Simple** | Every buyer, Day 1 | Same day | None — pure UI use |
| **Tier 2 — Intermediate** | Buyer + admin (contracts lead for some) | 1–10 days each | Config, minor scripting, no Java |
| **Tier 3 — Advanced** | Procurement lead + architect + AP | Sprints (2–6 weeks) | Config + integration + governance |

Each win follows the same shape:
- **What it is** — one sentence
- **Why buyers care** — the pain it removes
- **How to do it** — numbered steps or bullets
- **Gotchas** — what bites you in MAS 9 specifically
- **Done when** — verification

**Recurring theme: Data cleansing is the single biggest predictor of whether your purchasing upgrade is a success or a three-year catastrophe.** A MAS 9 upgrade is the one time in a decade when you have organizational permission to fix the vendor master, the reorder points, and the buyer assignments. Take it. Section "T2-W9 Vendor Master Cleansing" is the longest in this document for a reason.

---

## Table of Contents

### Tier 0 — Hour 1 Starter Pack (deploy before anyone logs in)
- [Why Tier 0 exists](#why-tier-0-exists)
- [Starter Saved Queries — Copy/Paste Ready](#starter-saved-queries--copypaste-ready)
- [Starter Start Center Portlets — Template Ready](#starter-start-center-portlets--template-ready)
- [60-Minute Admin Deployment Plan](#60-minute-admin-deployment-plan)
- [Buyer Hour-1 Checklist](#buyer-hour-1-checklist)

### Tier 1 — Same-Day Wins (no admin needed)
1. [Start Center — Buyer Edition](#1-start-center--buyer-edition)
2. [Purchase Requisition → PO Conversion Flow](#2-pr--po-conversion-flow)
3. [Saved Queries and Bookmarks for Buyers](#3-saved-queries-and-bookmarks-for-buyers)
4. [Desktop Requisitions (Self-Service)](#4-desktop-requisitions-self-service)
5. [Approval Inbox Hygiene — Stop Approving Blind](#5-approval-inbox-hygiene)
6. [Stale PR / Open PO / Orphan Line Cleanup](#6-stale-pr--open-po--orphan-line-cleanup)
7. [Favorites, Inbox Shortcuts, Result Sets](#7-favorites-inbox-result-sets)
8. [Attach Quotes, Invoices, SOWs — the right way](#8-attach-docs-the-right-way)

### Tier 2 — Intermediate (1–10 days, needs admin)
9. [Vendor Master Data Cleansing — The Foundation](#9-vendor-master-data-cleansing)
10. [Reorder Point, Safety Stock, EOQ — Setup You Can Trust](#10-reorder-points-safety-stock-eoq)
11. [RFQ Process — 3-Bid Discipline Without the Pain](#11-rfq-process)
12. [Automatic Reordering With Confidence](#12-auto-reorder-with-confidence)
13. [Contract-Based Purchasing (Purchase, Blanket, Price)](#13-contract-based-purchasing)
14. [Vendor Performance Scorecarding](#14-vendor-performance-scorecarding)
15. [PR / PO Approval Workflows with Thresholds](#15-pr-po-approval-workflows)
16. [Invoice Matching (2-way, 3-way, 4-way)](#16-invoice-matching)
17. [BIRT Reports in the Purchasing Process](#17-birt-reports-in-purchasing)
18. [Terms & Conditions Library + Standard Language](#18-terms-conditions-library)
19. [Buyer Assignment, Commodity Codes, and Routing](#19-buyer-assignment-commodities-routing)

### Tier 3 — Advanced (sprints, cross-functional)
20. [Consolidated Reorder Across Sites](#20-consolidated-reorder-across-sites)
21. [Vendor Managed Inventory (VMI) from the Buyer Side](#21-vmi-from-the-buyer-side)
22. [e-Procurement / Punch-out Catalogs](#22-e-procurement-punchout-catalogs)
23. [ERP Integration (SAP / Oracle / Workday for PO and Invoice)](#23-erp-integration)
24. [Maximo AI Assist — Supply Chain Capabilities](#24-maximo-ai-assist--supply-chain-capabilities)
24b. [Maximo Parts Identifier](#24b-maximo-parts-identifier)
25. [MRO Inventory Optimization — The Auto-Reorder Confidence Accelerator](#25-mro-inventory-optimization--the-auto-reorder-confidence-accelerator)
25b. [Databricks Spend Analytics — the BIRT Successor](#25b-databricks-spend-analytics--the-birt-successor)
26. [Supplier Collaboration Portal](#26-supplier-collaboration-portal)

### Reference
27. [Daily / Weekly / Monthly Buyer Rhythm](#27-daily--weekly--monthly-buyer-rhythm)
28. [7.6 → MAS 9 Purchasing App Mapping](#28-76--mas-9-purchasing-app-mapping)
29. [Common Purchasing Gotchas Post-Upgrade](#29-common-purchasing-gotchas-post-upgrade)
30. [Role-Based Learning Path (Buyer / Procurement Mgr / Admin)](#30-role-based-learning-path)
31. [Data Cleansing Master Checklist](#31-data-cleansing-master-checklist)

---

# TIER 0 — HOUR 1 STARTER PACK

The pre-loaded version of wins #1, #3, and #7. This is what the Maximo admin deploys **before** the first buyer logs in on go-live morning. Every query and portlet below is ready to copy into Query Manager and the Start Center template.

---

## Why Tier 0 exists

A buyer on go-live morning should not see: (a) an empty Start Center, (b) 3,000 PRs in ENTERED status because the 7.6 queues migrated, (c) an inbox full of stale workflow approvals nobody triaged, (d) a Vendor app with 14,000 companies and no way to find the active ones. That is how MAS 9 rollouts generate PO-processing backlogs that last a quarter.

Tier 0 fixes this by pre-loading:
1. **18 saved queries** across the 8 purchasing apps, marked Public, bound to the BUYER security group.
2. **A Start Center template** (BUYER_HOME) with 7 Result Set portlets, 5 KPI portlets, Favorites, and Inbox — pushed to every user in the BUYER group.
3. **A 60-minute admin deployment plan** so one person ships this before coffee break.
4. **A buyer hour-1 checklist** so every user verifies they have it.

Do Tier 0 first. Every other win in this document assumes Tier 0 is live.

---

## Starter Saved Queries — Copy/Paste Ready

Every query uses the `:BUYER` and `:SITEID` substitution parameters so one query serves every buyer — each user's session substitutes their own buyer code.

Set the default buyer code per user in **People → Main tab → Buyer**, or via the labor/person record.

### Purchase Requisitions (app: PR, object: PR)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **My Open PRs — Ready to Source** | Y | Y | `status = 'APPR' AND buyer = :BUYER AND ponum IS NULL AND siteid = :SITEID` |
| **PRs Awaiting Approval (mine to approve)** | Y | N | `status = 'WAPPR' AND buyer = :BUYER` |
| **PRs Older Than 14 Days — Unsourced** | Y | N | `status = 'APPR' AND buyer = :BUYER AND ponum IS NULL AND changedate < SYSDATE - 14` |
| **PRs Requiring RFQ (high-value, no contract)** | Y | N | `status = 'APPR' AND buyer = :BUYER AND totalcost >= 5000 AND ponum IS NULL AND contractrefnum IS NULL` |

### Purchase Orders (app: PO, object: PO)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **My Open POs — Awaiting Receipt** | Y | Y | `status IN ('APPR','INPRG') AND buyer = :BUYER AND siteid = :SITEID` |
| **POs Awaiting Approval** | Y | N | `status = 'WAPPR' AND buyer = :BUYER` |
| **POs Past Required Date — Expedite** | Y | N | `status IN ('APPR','INPRG') AND EXISTS (SELECT 1 FROM poline pl WHERE pl.ponum = po.ponum AND pl.requireddate < SYSDATE AND pl.receivedqty < pl.orderqty) AND buyer = :BUYER` |
| **POs Closed This Month (mine)** | Y | N | `status = 'CLOSE' AND buyer = :BUYER AND statusdate >= TRUNC(SYSDATE, 'MM')` |
| **POs With Invoice Mismatch (no match yet)** | Y | N | `status IN ('APPR','INPRG') AND ponum IN (SELECT ponum FROM invoice WHERE status = 'WAPPR') AND buyer = :BUYER` |

### RFQ (app: RFQ, object: RFQ)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **My Active RFQs** | Y | Y | `status IN ('INPRG','SENT') AND buyer = :BUYER` |
| **RFQs Due Today / Tomorrow** | Y | N | `status = 'SENT' AND replyduedate <= SYSDATE + 1 AND buyer = :BUYER` |
| **RFQs Past Reply Date — No Response** | Y | N | `status = 'SENT' AND replyduedate < SYSDATE AND buyer = :BUYER` |

### Vendor / Companies (app: COMPANY, object: COMPANIES)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Active Vendors With Missing Tax ID** | Y | N | `disabled = 0 AND (federalidnum IS NULL OR TRIM(federalidnum) = '') AND type = 'V'` |
| **Active Vendors Used In Past 24 Months** | Y | N | `disabled = 0 AND company IN (SELECT DISTINCT vendor FROM po WHERE orderdate > SYSDATE - 730)` |
| **Active Vendors — No PO in 24+ Months (candidates to disable)** | Y | N | `disabled = 0 AND company NOT IN (SELECT DISTINCT vendor FROM po WHERE orderdate > SYSDATE - 730)` |
| **Duplicate Vendor Candidates (same tax ID)** | Y | N | `federalidnum IS NOT NULL AND federalidnum IN (SELECT federalidnum FROM companies GROUP BY federalidnum HAVING COUNT(*) > 1)` |

### Contracts (app: CONTRACT, object: CONTRACT)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Contracts Expiring in 90 Days** | Y | N | `status = 'APPR' AND enddate <= SYSDATE + 90 AND buyer = :BUYER` |
| **Contracts Auto-Renew This Quarter** | Y | N | `status = 'APPR' AND autorenew = 1 AND enddate <= ADD_MONTHS(TRUNC(SYSDATE,'Q'),3)` |

### Receiving / Shipments (app: RECEIVING, RCVSHIP)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **My POs With Partial Receipts** | Y | N | `EXISTS (SELECT 1 FROM poline pl WHERE pl.ponum = po.ponum AND pl.receivedqty > 0 AND pl.receivedqty < pl.orderqty) AND buyer = :BUYER` |

### Query notes
- All queries above use ANSI SQL that works on Db2 and Oracle backends.
- `:BUYER` and `:SITEID` resolve from the logged-in user's session.
- Mark Public so they appear in the group's Start Center Result Set picker; do not mark Private or they disappear from the group.
- Only **one** query per app can be marked **Default** per user — pick the one listed as `Default = Y` above.

---

## Starter Start Center Portlets — Template Ready

Deploy as a single template named **BUYER_HOME**, then push to the BUYER security group. Everyone gets the same layout; the `:BUYER` bind variable personalizes the content.

### Layout (2-column, top-down)

**Left column (Result Sets — the work queue):**

| Slot | Portlet Name | Portlet Type | Source Query | Refresh |
|---|---|---|---|---|
| L1 | My Open PRs — Ready to Source | Result Set | PR → My Open PRs — Ready to Source | 10 min |
| L2 | POs Past Required Date — Expedite | Result Set | PO → POs Past Required Date — Expedite | 15 min |
| L3 | My Active RFQs | Result Set | RFQ → My Active RFQs | 30 min |
| L4 | PRs Older Than 14 Days — Unsourced | Result Set | PR → PRs Older Than 14 Days — Unsourced | daily |
| L5 | Contracts Expiring in 90 Days | Result Set | Contract → Contracts Expiring in 90 Days | daily |
| L6 | POs With Invoice Mismatch | Result Set | PO → POs With Invoice Mismatch | 30 min |
| L7 | My POs With Partial Receipts | Result Set | Receiving → My POs With Partial Receipts | 1 hour |

**Right column (KPIs + navigation):**

| Slot | Portlet Name | Portlet Type | Metric |
|---|---|---|---|
| R1 | Open PR Value ($) | KPI | `SUM(totalcost) FROM pr WHERE status = 'APPR' AND buyer = :BUYER AND ponum IS NULL` |
| R2 | Open PO Value ($) | KPI | `SUM(totalcost) FROM po WHERE status IN ('APPR','INPRG') AND buyer = :BUYER` |
| R3 | PO Cycle Time — 30 Day Avg | KPI | `AVG(po.orderdate - pr.changedate) WHERE po.buyer = :BUYER AND po.orderdate > SYSDATE - 30` |
| R4 | Invoice Match Rate This Month | KPI | `COUNT(matched)/COUNT(*) FROM invoice WHERE buyer = :BUYER AND invoicedate >= TRUNC(SYSDATE,'MM')` |
| R5 | RFQs Awaiting Reply | KPI | `COUNT(*) FROM rfq WHERE status = 'SENT' AND buyer = :BUYER` |
| R6 | Favorite Applications | Favorites | PR, PO, RFQ, Contract, Company, Invoice, Receiving, Item Master, Reorder |
| R7 | Inbox / Assignments | Inbox | out of the box |

### KPI thresholds (traffic-light colors)

| KPI | Green | Yellow | Red |
|---|---|---|---|
| PO Cycle Time (days from PR approved → PO issued) | ≤ 3 | 4–7 | > 7 |
| Open PR Value ($) — drift from monthly baseline | ±10% | ±10–25% | > ±25% |
| Invoice Match Rate This Month | ≥ 95% | 85–94% | < 85% |
| RFQs Awaiting Reply | ≤ 5 | 6–15 | > 15 |
| Contracts Expiring < 30 days — uncaught | 0 | 1–2 | > 2 |

Tune thresholds during the first 30 days based on your actual buyer workload.

### Template metadata
- **Template name:** BUYER_HOME
- **Assigned to security groups:** BUYER, BUYER_SUPV, PROCUREMENT_MGR
- **Allow user modification:** Yes (buyers add personal portlets; base is locked)
- **Default on first login:** Yes

---

## 60-Minute Admin Deployment Plan

One Maximo admin, ~60 minutes, before go-live morning.

| Min | Step | Where |
|---|---|---|
| 0–5 | Verify BUYER, BUYER_SUPV, PROCUREMENT_MGR security groups exist; confirm membership. | Security Groups app |
| 5–15 | Confirm every buyer has a **Buyer Code** on People record and a default **Purchasing Site**. This is what `:BUYER` / `:SITEID` resolve to. | People app → Main tab |
| 15–35 | Create all 18 starter queries in **Query Manager**. Mark Public, set Default where indicated. | Query Manager from each listed app's list view |
| 35–50 | Build the **BUYER_HOME** template with 12 portlets. Bind each Result Set to its query. Configure KPI SQL + thresholds. | Start Center → Template Administration |
| 50–57 | Assign BUYER_HOME to security groups. Mark as default on first login. | Template Admin → Assign |
| 57–60 | Log in as a test buyer user. Verify Start Center renders, queries return data, KPIs compute. | Test login |

### Smoke test checklist (run before go-live)
- [ ] Log in as **test buyer #1** (buyer code BUYER01) — Start Center shows data for BUYER01, not blanks.
- [ ] Log in as **test buyer #2** (buyer code BUYER02) — Start Center shows different numbers from #1.
- [ ] Open **PR** — defaulted query "My Open PRs — Ready to Source" loads automatically.
- [ ] Open **PO** — defaulted query "My Open POs — Awaiting Receipt" loads automatically.
- [ ] Click each Result Set portlet — drills into the underlying app list.
- [ ] Inbox shows at least the workflow assignments routed to buyers.
- [ ] KPI refresh on manual click works without error.

---

## Buyer Hour-1 Checklist

Give this to every buyer on go-live morning. If they can't tick every box, their admin has not finished Tier 0 — call them back.

- [ ] I logged into MAS 9 Manage and my Start Center shows **my buyer code's numbers**, not blanks.
- [ ] I see at least 7 Result Set portlets with real data.
- [ ] I see at least 5 KPI tiles with numbers.
- [ ] Opening **PR** filters to "My Open PRs — Ready to Source" automatically.
- [ ] Opening **PO** filters to "My Open POs — Awaiting Receipt" automatically.
- [ ] Opening **RFQ** filters to "My Active RFQs" automatically.
- [ ] My **Favorites** menu has PR, PO, RFQ, Contract, Company, Invoice, Receiving pinned.
- [ ] I can see the **Inbox** icon in the top bar and it shows my pending approvals.
- [ ] I know my **Buyer Code** (ask your supervisor if you don't).
- [ ] I know my assigned **commodity codes** (this is what auto-routing uses — see Tier 2 win #19).

Once this checklist passes, move to Tier 1 wins below.

---

# TIER 1 — SAME-DAY WINS

These require no configuration, no admin ticket, no license upgrade. A buyer can do every one on the first day after go-live.

---

## 1. Start Center — Buyer Edition

### What it is
Your home page in MAS 9. Out of the box it is generic. In five minutes of personalization (on top of the BUYER_HOME template from Tier 0) it becomes the single screen that runs your desk.

### Why buyers care
- One screen: what PRs need sourcing today, what POs are late, what RFQs are awaiting reply, what invoices are stuck.
- Replaces opening 6 apps every morning.
- Kills the "I didn't know that PR was sitting there" excuse.

### How to do it (personal additions on top of BUYER_HOME)
1. Log in. Top-right → **Display Settings** → **Modify Existing Templates**.
2. Copy the BUYER_HOME template as your personal layout.
3. Add **Result Set** portlets for your own quirks:

| Portlet Name | Application | Query Logic |
|---|---|---|
| **PRs From My Requestors (favorites list)** | PR | `status = 'APPR' AND requestedby IN ('user1','user2',...)` |
| **POs Over $50k Requiring VP Sign-off** | PO | `totalcost >= 50000 AND status = 'WAPPR' AND buyer = :BUYER` |
| **Vendor Audit Queue — New Vendors This Month** | Company | `createdate >= TRUNC(SYSDATE,'MM') AND type = 'V'` |

4. Add **KPI portlets** for at-a-glance numbers personal to your commodity area (e.g., steel pipe open PO value, bearings lead time drift).
5. Add **Favorite Applications** portlet with: PR, PO, RFQ, Contract, Company, Invoice, Receiving, Item Master, Storerooms, Reorder.
6. Save as your personal template.

### Gotchas
- MAS 9 Carbon UI renders Start Center portlets differently than 7.6 — **some custom portlet code from 7.6 will not carry forward** and needs to be rebuilt as Result Set + KPI.
- Flash/SVG graph portlets from 7.6 are gone. Use Result Set + KPI.
- Substitution parameters (`:BUYER`, `:SITEID`, `:USER`) still work — keep using them so one template personalizes across the group.

### Done when
Every buyer has a Start Center with at least 6 Result Sets and 3 KPIs, and they no longer open the PR application cold every morning.

---

## 2. PR → PO Conversion Flow

### What it is
The end-to-end flow: Desktop Requisition → PR → optional RFQ → PO → receipt → invoice match → close. MAS 9 rationalized some of the 7.6 clicks but the core objects (PR, RFQ, PO, MATRECTRANS, INVOICE) are unchanged.

### Why buyers care
- Getting from an approved PR to an issued PO is the #1 buyer metric (cycle time).
- 7.6 required: PR list → select → Select For PO → PO app → save → approve → issue. **MAS 9 compresses this** into the PR's action menu: **Create Purchase Order** (one click from an APPR PR).

### How to do it — simplest path (no RFQ, contract vendor already set)
1. Open **PR**, open the approved PR.
2. Action menu → **Create Purchase Order**.
3. MAS 9 carries over: vendor, line items, quantities, GL, project, task. You fill: buyer (defaults to you), FOB, ship-to if not defaulted.
4. **Save**. Status = WAPPR.
5. Route for approval (workflow) or approve directly if within your authorization threshold.
6. Status = APPR. Print/email to vendor (see win #17 BIRT reports).

### How to do it — requires RFQ first
1. PR in APPR status → action menu → **Create RFQ**. See win #11.
2. After award, from RFQ → action menu → **Create PO from Award**. Winning vendor, line items, awarded prices flow to the PO.
3. Approve, issue, done.

### How to do it — from contract (blanket release)
1. PR in APPR status, contract reference already populated → action menu → **Create Purchase Order**.
2. Prices pull from the contract (you cannot edit without breaking the contract link).
3. Approve, issue, done.

### Gotchas
- **Status flow terminology changed subtly.** 7.6 had WAPPR → APPR → INPRG → CLOSE. MAS 9 is identical — but **PRINTED** sub-status is now automated via a flag, not a separate manual action. If a buyer used to hit "Print" to change status, that is automatic now on PO issue.
- **Copy PO** is still there but **Copy PR-to-PR** now skips lines with inactive items — a clean behavior, but workflow people who depended on copying sometimes get fewer lines than expected.
- In 7.6 you could split a PR across multiple POs by manual line selection. MAS 9 still supports this via the PR line's **Vendor** field — set different vendors on different lines, then use **Create PO** to produce one PO per vendor automatically.

### Done when
Buyers convert a single-vendor PR to issued PO in ≤ 2 minutes without switching apps more than twice.

---

## 3. Saved Queries and Bookmarks for Buyers

### What it is
Every list page in MAS 9 has **Save Query** (binoculars icon). Save the filters you run ten times a day on top of the Tier 0 starters.

### Why buyers care
- Stop retyping `status = 'APPR' AND buyer = 'BUYER01'` every morning.
- Mark one query per app as **Default** so the list opens filtered.
- Share with the buyer group in one click.

### How to do it
1. PR list → filter to the view you want (e.g., status APPR, unsourced, your commodity group).
2. **Save Query** → name it descriptively.
3. Check **Default** to make it your opening view.
4. Check **Public** to share.

### Recommended personal saved queries on top of Tier 0

| App | Query Name | Logic |
|---|---|---|
| PR | My Rush PRs (priority 1) | `buyer = :BUYER AND priority = 1 AND status = 'APPR'` |
| PO | POs With Rejected Receipts | `buyer = :BUYER AND ponum IN (SELECT DISTINCT ponum FROM matrectrans WHERE rejectqty > 0)` |
| RFQ | RFQ Awards Pending My Action | `buyer = :BUYER AND status = 'AWARD' AND EXISTS (SELECT 1 FROM rfqline WHERE rfqline.rfqnum = rfq.rfqnum AND rfqline.awardstatus IS NULL)` |
| Company | My Commodity's Active Vendors | `disabled = 0 AND company IN (SELECT company FROM vendorcommodity WHERE commoditygroup IN (...))` |
| Invoice | Invoices I Approved This Week | `approvedby = :USER AND statusdate >= TRUNC(SYSDATE,'IW')` |

### Gotchas
- In 7.6 the "Save As" query sometimes leaked across sites. MAS 9 Carbon UI scopes queries per user by default — supervisors must explicitly mark public.
- Queries with bind variables still work; avoid hard-coding buyer codes or vendor numbers.

### Done when
Every buyer has 5+ personal saved queries on top of Tier 0 and opens every app to a defaulted filter.

---

## 4. Desktop Requisitions (Self-Service)

### What it is
**Desktop Requisitions (DR)** is the self-service app for requestors — site managers, planners, engineers — to create a PR without opening the full PR application. In MAS 9 it is the preferred intake for non-inventory buys. DOC4 §3.8 capabilities:
- **Template Requisitions** — save templates for recurring orders.
- **Frequently Ordered Items** — personal lists of commonly ordered items.
- **Status Tracking** — monitor approval progress and receipt status end to end.
- **Auto-PO Creation flag** — on final approval, DR can create the PR *and* the PO automatically for contract-priced items (skipping the manual buyer step for routine low-value replenishment).

### Why buyers care
- Pushes PR creation **upstream** to the person who knows what they need — fewer "what did you mean by that?" clarification cycles for buyers.
- DRs auto-route to the correct buyer using commodity-code rules (see win #19).
- Only fully-filled DRs become APPR; malformed DRs never hit your queue.
- **Auto-PO on DR** eliminates buyer-step latency for routine buys that are fully contracted — the single biggest daily time saver for buyers of MRO consumables.

### How it works (as a buyer — you see the result, not the DR itself)
1. Requestor fills a DR with item, qty, required date, GL.
2. DR goes through manager approval workflow.
3. On final approval, DR becomes a PR in **APPR** status, auto-assigned to the buyer who owns the item's commodity code.
4. You see it in **My Open PRs — Ready to Source**.

### What buyers need to configure (with admin)
- Commodity-to-buyer assignment table populated.
- DR approval hierarchy — typically 2-tier (requestor's supervisor + finance at threshold).
- Email template so requestors get notified when their DR becomes a PR and a PO.

### Gotchas
- If commodity code is missing on an item, DR auto-routing fails and the PR lands in a "Default Buyer" queue. Clean item master commodity codes during Tier 2 win #19.
- **Desktop Requisition is separate from a PR** (different object, DESKTOPREQ vs PR). Buyers see the PR, not the DR, after conversion. If a buyer needs to trace back, use the DRNUM field on the PR.

### Done when
80% of non-inventory PRs originate from Desktop Requisition rather than direct PR entry.

---

## 5. Approval Inbox Hygiene

### What it is
The **Inbox** in the top bar holds workflow approvals for PRs, POs, invoices, contract changes, and adjustments above threshold. In 7.6 many buyers ignored the inbox and approved via email. MAS 9 makes the inbox the sanctioned path.

### Why buyers care
- Email-based approvals are audit-hostile (no Maximo-side audit trail on who clicked what).
- Inbox in MAS 9 supports **bulk approve** with a single comment — 10 PRs approved in one click.
- Inbox tracks delegation: "approve on behalf of" is a first-class feature, not a hack.

### How to do it
1. Click Inbox icon → approval queue renders.
2. For each item, click to drill in; review amount, vendor, GL, description.
3. **Approve**, **Reject**, or **Reassign** (to a different approver).
4. Use the **Comments** field — required by audit for rejects.
5. For bulk approval: select multiple items with the checkboxes → **Bulk Approve** → single comment applies to all.

### Delegation setup (Tier 2 precursor but worth doing Day 1)
- Go to **Labor** → your record → **Delegation** tab.
- Enter delegate (name, start date, end date).
- During delegation period, your inbox items also appear in the delegate's inbox.
- This is the sanctioned way to cover PTO — never share passwords.

### Gotchas
- **Email approvals still work** (backward-compatible workflow action) but the audit trail is weaker. Turn them off when your organization is ready, typically 90 days post-upgrade.
- **Reassigning** an approval does not change the workflow route — it just hands THIS decision to someone else. The NEXT step still goes where the workflow says.
- Inbox filters can be saved — e.g., "PRs > $10k only" so a procurement manager never sees routine under-threshold stuff.

### Done when
Buyers approve from the inbox, not from email. Median approval age drops to < 24 hours.

---

## 6. Stale PR / Open PO / Orphan Line Cleanup

### What it is
In most Maximo 7.6 environments, migrations bring over 1,000+ stale PRs, 500+ open POs that should have been closed, and hundreds of POs with one unreceived line holding the whole PO open. MAS 9 gives you the saved queries and bulk actions to clean these in a single afternoon.

### Why buyers care
- Stale PRs distort open commitment on financial reports.
- Open POs block PO close → invoice accrual piles up.
- Orphan lines (received 0 of 1 unit 11 months ago) are almost always "vendor never shipped the last item; nobody closed the PO."

### How to do it — PR cleanup
1. Run saved query: PR → **PRs Older Than 14 Days — Unsourced**.
2. Triage into 4 buckets: (a) still needed → source today, (b) cancel → contact requestor, (c) consolidate with other PRs to the same vendor → convert in a batch, (d) escalate to procurement mgr.
3. Cancel PRs directly: select → action menu → **Change Status → CAN**. Add comment: "Cancel — superseded by PR/PO XYZ" or "Cancel — no longer needed per [requestor]".

### How to do it — PO cleanup
1. Run saved query: PO → **POs Past Required Date — Expedite**.
2. For each: (a) contact vendor for updated ETA, (b) short-receive and close if delivery impossible, (c) cancel unshipped lines via PO line action menu → **Cancel Line**.
3. Close PO: action menu → **Change Status → CLOSE**. Requires zero open lines and all received lines matched to invoice.

### Bulk actions (admin helps you set this up)
- **Cron task: SC_POCloseCronTask** (custom in many 7.6 environments; stock MAS 9 has equivalents) — auto-closes POs where all lines are fully received and invoiced, over a configurable age threshold.
- **Action: auto-cancel PR lines for inactive items** — nightly cron that cancels orphaned PR lines referencing disabled items.

### Gotchas
- **PO close is irreversible in the UI.** Make sure receipts/invoices are settled first. A reopened PO requires a workflow override.
- **Canceled PRs still exist** (not deleted) — historical audit. If you need to purge, use archive tools, not delete.
- If the PO has a **Contract reference**, cancellation may trigger a contract-revision workflow depending on your config. Check with your contracts admin.

### Done when
Open PR count older than 30 days drops under 20. Open PO count older than 180 days (excluding blankets) drops under 50.

---

## 7. Favorites, Inbox, Result Sets

### What it is
The **Favorites** side menu in MAS 9 holds your most-used apps; the **Inbox** holds approvals; Result Set portlets on the Start Center hold your saved queries as live dashboards.

### Why buyers care
- Cut 4 clicks off every app switch.
- Approvals don't get lost in email.
- Live queue visible on login, not buried under menus.

### How to do it
1. Click the star on any app tile in **Go To → Supply Chain Management**. It moves to Favorites.
2. Recommended for buyers: PR, PO, RFQ, Contract, Company, Invoice, Receiving, Item Master, Storerooms, Reorder.
3. Inbox is already visible in the top bar — check it every morning.
4. Ask your admin to route **PR > $5k**, **PO > $25k**, **Invoice mismatch > $500** to your inbox.

### Done when
First-click-after-login opens an app that is one click away.

---

## 8. Attach Docs the Right Way

### What it is
MAS 9 Attached Docs supports: vendor quotes, signed SOWs, PDF invoices, certificates of insurance, mill test reports, drawings. Every purchasing object (PR, PO, Contract, Company, Invoice) has an **Attachments** section.

### Why buyers care
- Audit defensibility — every PO has its sourcing evidence (quote, RFQ, contract) attached.
- Kill the shared drive: "the quote from vendor X is on the S: drive somewhere."
- Searchable via **Attached Doc** descriptions, not just file names.

### How to do it — attach a quote to a PR
1. Open PR → **Attachments** icon (paperclip).
2. Click **Add New Attachments → Add from File**.
3. Upload the PDF, enter description (e.g., "Vendor ACME quote #Q-2026-0412 — valid 30 days").
4. Set **Folder** — create standard folders: Quotes, Contracts, SOWs, Insurance, Mill Tests.
5. Set **Document Type** = QUOTE (for easy filtering later).
6. Save.

### Required attachments by object type (recommend as a policy)

| Object | Required Attachments |
|---|---|
| Non-contract PO ≥ $5k | Original quote + RFQ scores (if applicable) + vendor W-9 |
| Contract | Signed contract PDF + insurance cert + SOW |
| Company (new vendor) | W-9, insurance cert, supplier qualification form |
| Invoice > $10k mismatch | Vendor's copy + internal reconciliation memo |

### Gotchas
- **Attached Docs now live on cloud storage** (S3 / Azure Blob) in MAS 9, not on the WebSphere filesystem. File size limits differ; check with admin.
- **Bulk attach** via integration is supported but requires Doctype + Folder pre-creation.
- **Copy PO** in MAS 9 does copy attachments by default — in 7.6 this was a toggle. Be aware when cloning POs so you don't re-send old vendor quotes.

### Done when
Every PO ≥ $5k has at least one quote PDF attached, and buyer audit findings drop to zero on "missing sourcing evidence."

---

# TIER 2 — INTERMEDIATE WINS

Each of these needs 1–10 days of config, usually with an admin and sometimes with a contracts lead or AP lead. Done in the first 90–120 days post-upgrade. This is where the data-cleansing foundation gets poured — and this section is the longest in the document because **data cleansing is the make-or-break of a purchasing upgrade.**

---

## 9. Vendor Master Data Cleansing — The Foundation

### What it is
A deliberate, 4-week campaign to reduce the Company master (table COMPANIES, app Company Master) to **only vendors you actually use**, with complete and consistent data. This is the single highest-leverage purchasing upgrade activity.

### Why buyers care
- Searching for "Acme" returns 1 vendor, not 8 (Acme Inc, Acme, Inc., ACME Inc., ACME Incorporated, Acme Corp, Acme Corporation, A.C.M.E., Acme Incorporated DBA Acme).
- Payment terms apply consistently, not per-vendor-variant.
- Vendor scorecarding actually works (you cannot score 8 instances of the same vendor).
- RFQ distribution lists work (you don't send the same RFQ to 8 email addresses of the same company).
- 1099 / tax reporting is accurate.
- **This is the single biggest reason a purchasing upgrade succeeds or fails.** A MAS 9 upgrade is the rare moment when you have organizational permission to do this.

### The 4-week campaign (recommended)

**Week 1 — Census:**
1. Run query: `Active Vendors With Missing Tax ID` — these are the obvious problems.
2. Run query: `Active Vendors — No PO in 24+ Months (candidates to disable)` — these are the dead ones.
3. Run query: `Duplicate Vendor Candidates (same tax ID)` — these are the duplicates.
4. Export to CSV, share with AP and procurement leads.

**Week 2 — Deduplication (highest leverage):**
1. For each duplicate group (same tax ID, similar name):
   - Identify the **primary** (the one with the most POs, the most recent invoice, the correct name).
   - Identify the **secondaries** (to be merged and disabled).
2. Use the **Merge Vendors** action (action menu → **Merge Company**). MAS 9 has a stock merge tool; customized 7.6 environments may have extended it. Merge updates open PRs, POs, invoices, contracts to point at the primary.
3. Disable the secondaries: set `disabled = 1` with a comment referencing the primary.
4. Document every merge in a running spreadsheet for audit.

**Week 3 — Completeness audit (standardize the primaries):**
1. For every remaining active vendor, verify:
   - Tax ID (federal ID) present and valid format.
   - At least one active address (remit-to).
   - Payment terms set (not blank — blank defaults to NET 30 in 7.6, may default differently in MAS 9; verify).
   - At least one commodity code assigned.
   - W-9 attached (Attachments).
   - Certificate of insurance attached if required category.
2. Flag vendors missing any → remediate or disable.

**Week 4 — Inactivation:**
1. For vendors in the "No PO in 24 months" bucket that haven't been used:
   - Check contracts — any active contract? If yes, keep but mark for contract review.
   - Check open PRs/POs — any open commitment? If yes, keep.
   - Otherwise → disable. Do not delete.
2. Export the before/after vendor count. Expect **30–50% reduction** in active vendors for a typical SC utility after a 4-week campaign.

### The Company Master fields you must get right

| Field | Why critical | Standard / Convention |
|---|---|---|
| **Company** (code) | Primary key | 6-10 char upper; no leading zeros; no special chars except dash |
| **Name** | What buyers search | Full legal name, one way to spell it |
| **Type** | V / M / I (Vendor/Mfr/Internal) | Never blank |
| **Federal ID (Tax ID / EIN)** | Duplicate detection + 1099 | Always required for V type |
| **Payment Terms** | Drives AP scheduling | Never blank |
| **Currency** | FX + matching | Never blank |
| **Disabled** | Exclusion from search | 1 for sunset vendors |
| **Commodity Codes** (child table) | RFQ distribution, buyer routing | Minimum 1 |
| **Vendor Addresses** (child table) | Remit-to + physical | At least 1 active address |

### Cron tasks to lock in cleanliness after Week 4

| Cron Task | What it does |
|---|---|
| **SC_CompInactiveCronTask** (legacy-custom) | Auto-disables vendors with no PO in 24 months, monthly |
| **VENDOR_MISSING_DATA_EMAIL** | Nightly email to procurement manager listing new active vendors with missing tax ID / commodity / address |
| **DUPLICATE_VENDOR_ALERT** | Nightly flag: new vendor added whose tax ID matches an existing active vendor |

### Gotchas (these are the real landmines)
- **Do NOT delete vendors. Ever. Disable instead.** Deletion cascades against orphaned PO history if constraints are loose; even with constraints holding, you lose reportability on historical spend.
- **Merge requires all statuses to be compatible** — you cannot merge a vendor with an open PO to a vendor with a different currency. Clean currency first.
- **1099 reporting** pulls from the tax ID — if you merge and the primary has a different tax ID than one of the secondaries, you lose the tax history. Do the merge in this order: secondaries tax-reported for the current year stay separate until year-end 1099 close, then merge in January.
- **Vendor Contacts** (sub-table under Company) often has more bad data than the company itself — outdated emails, departed reps. Clean these as a separate pass in Week 3.
- **Contracts pointing at secondaries**: the merge tool updates the contract's vendor reference, but contract history attachments may still reference the old name. Don't lose the attachments.
- **Integration-sourced vendors** (pushed from SAP / Oracle / Workday) — do not merge Maximo-side unless the ERP-side is also merged, or the next integration run will re-create the secondary.
- **7.6 had a VENDOR table separate from COMPANIES in some older deployments.** MAS 9 unifies; if you were still running a split, resolve during pre-upgrade staging.

### BIRT report to support the campaign
- **Vendor Master Health Report** (new or extended) — runs weekly during the campaign: active vendors, with/without tax ID, with/without commodity, PO count in 24 months, spend in 24 months, duplicate-candidate flag. One row per vendor. This is the campaign's tracking dashboard.
- Historical SC equivalents: `Vendors_Without_Activity_YYYYMM.rptdesign`, `Duplicate_Vendor_Candidates.rptdesign`. Re-point to MAS 9 data source; keep the logic.

### Done when
- Active vendor count drops by 30%+ from pre-upgrade baseline.
- 100% of active vendors have tax ID, payment terms, currency, at least one commodity code.
- Zero duplicate tax IDs among active vendors (verified by SQL).
- Weekly Vendor Master Health Report lands in procurement manager's inbox and shows <5 newly-bad vendors per week.
- Buyers stop saying "let me figure out which Acme to use."

---

## 10. Reorder Points, Safety Stock, EOQ — Setup You Can Trust

### What it is
Per-item/per-storeroom settings (table INVENTORY) that drive automatic reorder generation: **ROP** (reorder point = when to reorder), **order quantity** (how much to order each time), **safety stock** (buffer for demand/lead-time variance). The triplet that determines 80% of stockouts and 80% of stockroom bloat.

### Why buyers care
- Stockouts embarrass the maintenance team and cost emergency shipping premiums (10–30% markup).
- Over-stock ties up working capital and storeroom space.
- **Auto-reorder (win #12) is only as good as these numbers.** The #1 reason clients distrust auto-reorder is that the reorder points are garbage from a 2012 load. You can't automate your way out of bad data.

### The 3-week setup campaign

**Week 1 — Classify:**
1. Run **ABC analysis** on the inventory (storekeeper doc win #10 covers this in depth). Output: every stock line tagged A (top 10% of items by annual issue value, usually 70% of value), B (next 20%), C (remaining 70% of items, often 10% of value).
2. Different policies apply by class:

| ABC | Review cadence | Safety stock | ROP policy |
|---|---|---|---|
| **A** | Monthly buyer review | Conservative (high) | Calculated ROP, reviewed |
| **B** | Quarterly review | Moderate | Calculated ROP, auto-maintained |
| **C** | Annual review | Low | Min/Max flat, auto-reorder approved |

**Week 2 — Calculate ROP, Safety Stock, EOQ:**

> **MAS 9 upgrade dividend — use the built-in dynamic lead time calculation.** MAS 9 Manage continuously refines the stored lead time per item as new receipts post, using the formula documented in DOC4 §3.13:
>
> `newLeadTime = currentLeadTime × (1 − recentLeadTimeWeight) + lastPODays × recentLeadTimeWeight`
>
> Default `recentLeadTimeWeight = 20%` (historical 80% / recent 20%). The longer MAS 9 is in production, the more accurate the lead time becomes automatically. **Do not override with a static lead time unless the vendor is new** (no history) or the vendor's lead time behavior has changed radically (new contract, factory relocation). The formula is the base for steps 3 and 5 below.

For each active stock line:

1. **Lead time** (days) — Use the MAS 9 dynamically-maintained value from Item / Inventory. For new items with no history, seed from vendor category average.
2. **Average daily demand** — Compute from MATUSETRANS over the last 12 months:
   ```
   AVG_DAILY_DEMAND = SUM(quantity issued past 365 days) / 365
   ```
3. **Demand standard deviation** — Same 365-day window, std dev of daily issues.
4. **Safety Stock** — Z-score-based:
   ```
   SAFETY_STOCK = Z × STDDEV_DEMAND × SQRT(LEAD_TIME_DAYS)
   ```
   Where Z = 1.645 (95% service level) for B-items, 2.326 (99%) for A-items, 1.282 (90%) for C-items.
5. **Reorder Point (ROP)**:
   ```
   ROP = (AVG_DAILY_DEMAND × LEAD_TIME_DAYS) + SAFETY_STOCK
   ```
6. **EOQ (Economic Order Quantity) — optional but powerful**:
   ```
   EOQ = SQRT((2 × ANNUAL_DEMAND × ORDER_COST) / (UNIT_COST × HOLDING_COST_PCT))
   ```
   Use `ORDER_COST ≈ $50–150` (your PO processing cost), `HOLDING_COST_PCT ≈ 20%` (carrying cost as a fraction of unit cost per year).

These formulas can be implemented as:
- A **BIRT report** (read-only — run monthly, present to buyer for review).
- An **automation script** (writes directly to INVENTORY.minlevel / maxlevel / orderqty for C-items; flags proposed values for A/B buyer review).
- A **Databricks pipeline** that computes and publishes back via REST (long-term, Tier 3).

**Week 3 — Apply and monitor:**
1. For C-items: apply calculated values automatically via the script. Monitor for 2 weeks; sampling confirms reorder behavior is sane.
2. For B-items: admin generates a proposed-ROP report; buyers review each in their commodity and approve/override. 
3. For A-items: buyer-led item-by-item review. Typically 200–500 items per buyer; one week dedicated.

### Cron task + BIRT report combo

| Artifact | What it does |
|---|---|
| **SC_GenInvCronTask** (common as a legacy 7.6 customization — generates MRs/PRs on ROP breach) | Nightly: for every stock line where `currentbal <= minlevel`, generate a reorder PR using configured vendor, order quantity, and GL. |
| **BIRT: Reorder_Proposal.rptdesign** | Weekly: show every stock line that SHOULD be reordered next week per formula, with computed quantity and vendor. Buyer reviews before the cron runs. |
| **BIRT: ROP_Health.rptdesign** | Monthly: ROP deviation from formula for every active item. Items where actual ROP is off by > 30% from calculated ROP flagged for buyer review. |
| **BIRT: Stockout_History.rptdesign** | Weekly: items that hit zero balance in the past 7 days — root cause tagging: late vendor, bad ROP, demand spike, lost shipment. |

### Gotchas
- **Garbage data in = garbage ROP out.** If MATUSETRANS has 2 years of abnormal demand (a plant shutdown, a COVID-era spike), the 365-day average is wrong. Filter out or weight recent periods more heavily.
- **Lead time drift.** Vendors changed lead time in the past 2 years and nobody updated the vendor master. Cross-check by running: average (receipt date - PO date) per vendor per commodity. Use the actual, not the contracted, lead time.
- **Seasonal items.** A C-item with 80% of its annual demand in April (irrigation parts) has a garbage 365-day-average. Use seasonal decomposition or tag as a special case.
- **Min level vs reorder point** — MAS 9 (like 7.6) uses `MINLEVEL` as the ROP trigger. MAXLEVEL is the target balance. ORDERQTY is the fixed order quantity (use this OR EOQ, not both). Decide per item which policy.
- **Issuing storeroom vs owning storeroom.** In multi-storeroom setups, reorder point is per stock line (storeroom-specific). A centralized reorder policy at the site level needs an aggregation layer (win #20).
- **Rotating items** don't fit ROP logic cleanly — they're counted in units but consumed as whole assets. Typically Min=0, Max=N, and reorder is policy-driven, not formula-driven.

### Done when
- Every active stock line has non-zero, formula-justified Min, Max, Order Qty.
- Monthly ROP Health Report shows < 10% of items off by more than 30% from calculated values.
- Stockout rate drops 40%+ vs pre-upgrade baseline.
- Emergency-PO rate (priority 1 PRs raised due to stockout) drops 50%+.

---

## 11. RFQ Process — 3-Bid Discipline Without the Pain

### What it is
**Request for Quotation (RFQ)** in MAS 9 is the structured way to get competitive bids from 2–5 vendors for a high-value or non-contract buy. Many buyers skip it ("I'll just call Bob at Acme") because 7.6 made it painful. MAS 9's flow is cleaner and, once templated, faster than the phone call.

### Why buyers care
- **Audit defensibility** — "why did you pick this vendor?" has a report-generated answer.
- **Better prices** — 3-bid discipline saves 5–15% on typical non-contract spend.
- **Vendor development** — spreads opportunity, prevents single-source capture.
- **Scorecarding evidence** (win #14) — quote response time and accuracy feeds vendor performance.

### When to require an RFQ (policy)
Recommended defaults, adjust to your org:

| Trigger | Action |
|---|---|
| Non-contract PR ≥ $5,000 | RFQ required, 3 bids |
| Non-contract PR ≥ $25,000 | RFQ required, 3 bids + procurement manager review |
| Non-contract PR ≥ $100,000 | RFQ required, 3+ bids + CFO sign-off + legal review |
| Contract PR (any $) | RFQ optional (price is contracted) |
| Emergency (priority 1) | RFQ waiver allowed with post-facto documentation |
| Sole source | Waiver form attached, signed by procurement manager |

Enforce via workflow: PR can't transition WAPPR → APPR at these thresholds without an RFQ reference or an explicit waiver code.

### How to do it — happy path
1. PR in APPR status → action menu → **Create RFQ**.
2. Lines and vendor list carry over. Add more vendors from the Company master (filter by commodity code).
3. Header tab: set **Reply Due Date**, **Terms**, **Delivery Date Required**, **FOB**.
4. Attach your spec doc (PDF, drawing).
5. Status → **INPRG → SENT**. Sending triggers:
   - **BIRT RFQ.rptdesign** generates the RFQ PDF per vendor (with that vendor's contact info and line items; prices blank).
   - Email to each vendor's contact address with the PDF attached (via Comm Template).
6. As vendors reply, buyer enters their prices in the **RFQ Vendor** and **RFQ Line** sub-tables. Attach the vendor's reply PDF to the RFQ (Attachments).
7. When all expected replies in (or reply-due-date passed), status → **AWARD**.
8. Award per line (or whole RFQ to one vendor): set **Award Status = AWARD** on the winning vendor's lines.
9. Action menu → **Create PO from Award**. PO inherits awarded prices and vendor.

### Template-driven RFQ (recommended — kills 90% of RFQ setup time)
- Admin defines RFQ templates per commodity (mechanical, electrical, janitorial, IT, rentals). Each has:
  - Pre-filled terms & conditions reference (win #18).
  - Standard delivery terms.
  - Default reply period (e.g., 5 business days).
  - Default vendor list (top 3–5 approved vendors per commodity).
  - Default BIRT report format.
- Buyer: **Create RFQ from Template** → pick template → adjust → send. 15 minutes, not 2 hours.

### Vendor reply tracking
- Set up Comm Templates so buyers get an email when:
  - Reply-due-date minus 48 hours, no response → nudge vendor automatically.
  - Reply-due-date passed, no response → buyer inbox alert.
- Track reply metrics per vendor (on time / late / no reply) — feeds scorecard (win #14).

### BIRT reports involved
| Report | Purpose |
|---|---|
| **RFQ.rptdesign** | Outbound RFQ PDF per vendor |
| **RFQ_Award_Summary.rptdesign** | Side-by-side price comparison across vendors for award decision, attached to PO as sourcing evidence |
| **RFQ_Response_History.rptdesign** | Monthly: RFQ cycle time, vendor response rate, award-to-lowest-price rate |

### Gotchas
- **Do not send RFQs from your personal email** — use the MAS 9 Comm Template so the audit trail is Maximo-side.
- **Missing vendor contact emails** is the #1 reason RFQs fail silently. Run a vendor-email audit as part of Tier 2 win #9 (vendor cleansing).
- **Award must go to a line item, not just a vendor** if lines are split across vendors. MAS 9 supports split award; use it.
- **RFQ attachment to PO** — confirm your config carries the RFQ PDF to the resulting PO's attachments. This is the audit trail auditors look for.
- In legacy-custom 7.6 environments: **SC_MODACTION_SENDRFQ**, **SC_MODACTION_AUTOACCEPT**, **SC_MODACTION_EMAILCHG** — these are wired into the RFQ workflow. Preserve equivalents in MAS 9.

### Done when
- 90% of non-contract POs ≥ $5k cite an RFQ reference.
- RFQ cycle time (sent → award) median drops to ≤ 10 business days.
- Vendor reply rate ≥ 80%.
- Auditors find zero high-value POs without sourcing evidence.

---

## 12. Automatic Reordering With Confidence

### What it is
A pipeline that watches INVENTORY balances, detects `currentbal <= minlevel`, and auto-creates a PR (or, at higher maturity, an auto-approved PO) for replenishment — with zero daily buyer intervention on C-items and with proposal-only for A/B items. **"With confidence"** means the buyer trusts the pipeline enough to let it run without daily babysitting.

This is the payoff for wins #9 (vendor cleansing) and #10 (reorder points). Without them, auto-reorder is a liability. With them, it is a 40-hour-per-week labor saver for a large storeroom.

### Why buyers care
- Kills the "run the reorder report, scroll through 400 rows, click each" morning ritual.
- Kills missed reorders (buyer was on PTO, no backup).
- Fast turnaround means fewer stockouts even on longer-lead items.
- Buyer time shifts from click-labor to exception handling — where the value is.

### The maturity ladder — build confidence tier by tier

**Level 0 (pre-upgrade baseline):** Reorder app (REORDER) generates a PR when `currentbal <= minlevel`. Buyer runs it manually each morning. Reviews each line. Converts in batch. Most clients stop here.

**Level 1 (auto-generate, manual approve):**
- Cron task **SC_GenInvCronTask** (common as a legacy 7.6 customization) runs nightly for each site.
- For each stock line below reorder, creates a PR in **WAPPR** status with:
  - Vendor = primary vendor from Item Master (or last PO vendor).
  - Quantity = ORDERQTY.
  - Required date = today + lead time.
  - Buyer = commodity-code-assigned buyer.
- Buyer opens inbox, reviews the PR batch, approves in bulk or edits individually.
- Auto-reorder now runs overnight, not manually. Buyer's daily effort drops 80%.

**Level 2 (auto-approve C-items, manual approve A/B items):**
- Extend the cron to set status directly to APPR for items where:
  - ABC class = C
  - Vendor has an active contract OR vendor has been used ≥ 3 times in past 12 months
  - Order value < $X threshold (e.g., $500)
  - No exception flags (late vendor, price deviation > 10%, etc.)
- A/B items stay in WAPPR for buyer review.
- Buyer now reviews ~20% of daily reorders instead of 100%.

**Level 3 (auto-PR for A/B, auto-PO for C with contract):**
- For C-items under active contract: cron generates PR, auto-approves, converts to PO, and auto-approves the PO in one batch (using the contract's pre-negotiated prices).
- Buyer sees a daily audit report of auto-POs issued, reviews exceptions only.

**Level 4 (predictive reorder — MAS 9 Predict + Monitor + MRO Inventory Optimization):**

This is where the MAS 9 upgrade pays for itself if you have the entitlements. Three IBM products stack on top of Manage to give you *prediction-grade* reorder instead of *reactive* reorder:

- **Maximo Predict** (DOC4 §5.4) — ML-based asset-failure prediction. The supply-chain payoff: **you stock for failures before they happen**, not after. When Predict raises an imminent-failure probability on a critical asset, the auto-reorder pipeline pre-positions spares (creates a PR in APPR, holds for buyer acknowledgement, then releases to PO on failure confirmation or at a configured advance date).
- **Maximo Monitor** (DOC4 §5.5) — IoT consumption triggers. For consumables whose usage is metered (lube oil, filter hours, chemical dosing), Monitor publishes consumption events that drive replenishment *from actual telemetry*, not periodic cycle counts. This is better than safety-stock math for high-velocity consumables.
- **Maximo MRO Inventory Optimization** (DOC4 Part Four / §6.x) — the IBM SaaS add-on that is *specifically designed* to solve the "auto-reorder with confidence" problem. It reads your 7.6-era / MAS-9-era procurement and consumption history, runs AI forecasting + criticality + service-level analysis, and pushes **optimized ROP/MAX values** back to Item Master via REST. See Tier 3 win #25 below — this add-on is the fastest path to Level-4 confidence for most SC utilities and should be evaluated before building a Databricks ML pipeline from scratch.

Also: **Databricks / custom ML** (DOC5) remains the bespoke path for org-specific signals (weather, work-order backlog, season). Usually a later move, after MRO Inventory Optimization has shown value.

**Which Level 4 product is right for you?**

| Driver | Best fit |
|---|---|
| You have 10k+ SKUs and want fastest ROI on reorder optimization | MRO Inventory Optimization (Essentials) |
| Your main pain is unplanned asset failure → surprise part demand | Maximo Predict |
| You have IoT-instrumented consumables (filters, lubes, chemicals) | Maximo Monitor |
| You need custom signals (weather, work-order backlog, macro demand) and already run a data platform | Databricks / DOC5 |
| All of the above | Start with MRO Inventory Optimization pilot; layer Predict/Monitor as asset-criticality demands |

### Confidence-building safeguards (non-negotiable before Level 2+)
All of these must be in place, scripted, tested, and monitored:

1. **Vendor data quality gate.** Auto-reorder skips any item whose primary vendor:
   - Is disabled.
   - Has no active address.
   - Has no active payment terms.
   - Has a commodity mismatch vs the item's commodity.
   Skipped items land in a buyer exception queue.

2. **Price sanity check.** If the proposed PO's unit price differs from the item's last-received unit price by > X%, flag for buyer review. Don't auto-approve.

3. **Order quantity sanity check.** If the proposed ORDERQTY is > 3× the item's average monthly consumption, flag.

4. **Open order check.** If there is already an open PR or PO for this item/storeroom, skip (don't double-order).

5. **Demand anomaly check.** If the ROP trigger was caused by a single large issue (one work order consumed 80% of the stock in one day), flag for buyer review — a planned outage, not a steady-state reorder.

6. **Daily exception report** (BIRT: **AutoReorder_Exceptions.rptdesign**) — landed in buyer inbox daily with: PRs created, PRs auto-approved, PRs flagged, items skipped with reason. Buyer reviews exceptions; no exception = no action.

7. **Audit log** — every auto-generated PR/PO has `createdby = 'SC_AUTOREORDER'` and references the cron task run ID for traceability.

### Build order (10-day plan)
- **Day 1–2:** Confirm Tier 2 wins #9 (vendor cleansing) and #10 (reorder points) are ≥ 80% complete. If not, stop — don't automate garbage.
- **Day 3:** Review the legacy cron task **SC_GenInvCronTask** and related classes in the Java catalog. Confirm it works post-upgrade or convert to automation script.
- **Day 4–5:** Enable Level 1. Monitor daily output for one week.
- **Day 6–7:** Tune Level 1 — fix any vendors or ROPs surfaced by exceptions.
- **Day 8–10:** Advance to Level 2 for C-items in one commodity group as a pilot. Monitor for 2 weeks before expanding.

### BIRT reports involved
| Report | Purpose |
|---|---|
| **AutoReorder_DailyRun.rptdesign** | Buyer's morning digest: X PRs created, Y auto-approved, Z exceptions flagged |
| **AutoReorder_Exceptions.rptdesign** | Per-exception detail: item, storeroom, reason, buyer action required |
| **AutoReorder_KPI_Monthly.rptdesign** | Monthly: auto-approve rate by ABC class, stockout rate, emergency PO rate, buyer time saved |
| **AutoReorder_PriceDrift.rptdesign** | Weekly: items whose auto-proposed price differs > 10% from last PO — audit trigger |

### Gotchas
- **Do not enable Level 2+ across all sites simultaneously.** Pilot one site, one commodity for 2 weeks.
- **Multi-site items** — auto-reorder per site needs to respect storeroom ownership; otherwise you get 4 sites each reordering the same item 4x in a day. Use site-level aggregation cron if your org is large (win #20).
- **Contract prices stale** — auto-reorder pulls price from the contract; if the contract's price is 18 months old and vendor hasn't re-negotiated, you buy at stale rates. Add a contract-age check: contracts older than 12 months require renewal before auto-reorder uses them.
- **Vendor on probation** — if a vendor is underperforming per scorecard (win #14), auto-reorder should skip or drop to Level 1 for that vendor. Build the flag into the sanity-check logic.
- **End-of-fiscal-year** — auto-reorder ignores your fiscal calendar by default. Turn it off for the last 3 business days of fiscal close if your org freezes PRs.
- **Tax / customs / import** — auto-reorder typically doesn't know about customs, freight, or tax. If your org needs those on every PO line, require the buyer step.

### Done when
- C-item auto-reorder runs Level 2 in production with ≥ 95% straight-through rate.
- Buyer's daily reorder effort drops from ~2 hours to ~30 minutes (exception handling only).
- Stockout rate drops ≥ 40% vs pre-upgrade baseline.
- Month-over-month buyer trust increases: ask buyers "do you still spot-check every auto-PR?" — answer moves from "yes, all of them" to "no, just the exceptions."

---

## 13. Contract-Based Purchasing

### What it is
A **Purchase Contract** is a pre-negotiated agreement that locks vendor, items, prices, and terms. Releases against it (blanket releases) inherit the contract's prices automatically. MAS 9 supports several contract types: Purchase, Blanket, Price, Master, Labor Rate, Lease/Rental, Warranty, Software.

### Why buyers care
- Negotiated prices apply consistently — no buyer re-negotiates per PO.
- Faster PR→PO cycle: contract reference on the PR auto-populates the PO.
- Volume discount tiers auto-applied.
- Spend analytics (win #25) separate contract spend (good) from spot spend (flag for contract candidacy).

### The contract hierarchy (MAS 9 — 9 contract types + Master)

Per DOC4 §3.9, MAS 9 supports **nine contract types plus the Master umbrella**. Pick the narrowest fit:

| Contract Type | Use when |
|---|---|
| **Purchase Contract** | Specific prices & terms for agreed-rate material buys. |
| **Blanket (Volume) Contract** | Total-dollar agreement; release POs draw down against it. |
| **Pricing Contract** | Catalog pricing for services or materials without volume commit. |
| **Labor Contract** | Craft/skill rates; auto-generates invoices for approved labor (contract-labor timesheets). |
| **Lease Contract** | Fixed-term equipment lease with buy-out clause. |
| **Rental Contract** | Equipment rental terminated at will. |
| **Service Contract** | Service delivery terms with per-incident billing. |
| **Warranty Contract** | Warranty coverage for purchased assets / parts + claim rules. |
| **Software Contract** | Software licensing + maintenance + renewal dates + user counts. |
| **Master Contract** | Umbrella for a vendor; sub-contracts of any of the above types cite it. |

### How to do it (new contract, buyer-initiated)
1. **Contract** app → **New Contract**. Set Type, Vendor, Start Date, End Date.
2. **Properties** tab: terms, auto-renew, notification lead time, currency.
3. **Terms and Conditions** tab: pull from library (win #18).
4. **Lines** tab: items, prices, commodity rates (for labor contracts).
5. **Authorizing Sites** tab: which sites can release against this contract.
6. **Attachments**: signed PDF, insurance cert, SOW.
7. Route for approval workflow.
8. Approved → `status = APPR` → contract is active for release.

### PR / PO referencing a contract
1. New PR → pick item → system auto-detects a matching active contract line → populates `contractrefnum`.
2. Price and vendor pulled from contract (cannot be edited without breaking the contract link).
3. PR → PO: contract reference carries.
4. PO receipt increments contract usage counters (visible on Contract Lines).

### Contract lifecycle hygiene
- **Contracts expiring in 90 days** query in Tier 0 — buyer sees upcoming renewals weekly.
- **Auto-renew flag** — for evergreen contracts, set renew automatically with notice. Workflow alerts the buyer 60 days pre-renewal so they can opt out or renegotiate.
- **Usage tracking** — watch `contractline.remaining_amount`. When near exhaustion, decide: renew, increase, or let expire.

### Cron task + BIRT
- **SC_UpdPOLstActivityDate** (legacy-custom) — keeps PO last-activity linked to contract usage.
- **BIRT: Contract_Expiring.rptdesign** — weekly digest of expiring contracts grouped by buyer.
- **BIRT: Spot_Spend_Contract_Candidates.rptdesign** — monthly: vendors/items with repeated spot POs that should be on a blanket contract. Size = annualized value.

### Gotchas
- **Editing a contract after approval** requires a **revision**, not a direct edit. MAS 9 handles revision workflow; don't try to edit a WAPPR-active contract.
- **Contract authorization by site** — a contract approved for Site A cannot be referenced from Site B unless Site B is in the **Authorizing Sites** tab. Surprises buyers migrating from a single-site config.
- **Contract vs Master** — don't confuse. Master contracts don't have lines with prices; they set T&Cs. Use Blanket or Price for pricing.
- **Price escalation clauses** — if a contract has "annual 3% increase on 7/1," MAS 9 doesn't update the price automatically. Build a revision workflow or a scheduled automation script.

### Done when
- ≥ 60% of annual spend is on-contract.
- Average PR→PO cycle time is **half** for contract PRs vs non-contract PRs.
- Zero contracts expire without buyer awareness (90-day warning works).

---

## 14. Vendor Performance Scorecarding

### What it is
A monthly scorecard per vendor combining: on-time delivery rate, quantity accuracy, price drift vs contract, quality (rejects on receipt), invoice accuracy, and RFQ responsiveness. In MAS 9, this is implemented with BIRT reports pulling from MATRECTRANS, PO, Invoice, and RFQ tables.

### Why buyers care
- Data-driven conversations with vendors: "you were 82% on-time in Q3; the contract says 95% or we rebid."
- Clear path to probation / disqualification.
- Feeds auto-reorder confidence (win #12 — skip underperforming vendors).

### The scorecard metrics

| Metric | Formula | Source | Target |
|---|---|---|---|
| **On-Time Delivery** | % receipts where `receiptdate <= requireddate` | MATRECTRANS join PO | ≥ 95% |
| **Quantity Accuracy** | % receipts where `receivedqty = orderqty` ± tolerance | MATRECTRANS | ≥ 98% |
| **Quality (Reject Rate)** | `SUM(rejectqty) / SUM(receivedqty)` | MATRECTRANS | ≤ 2% |
| **Price Accuracy** | % PO lines where invoice price = PO price | INVOICETRANS | ≥ 99% |
| **Invoice Accuracy** | % invoices matched first-pass (no dispute) | INVOICE | ≥ 95% |
| **RFQ Responsiveness** | % RFQs replied before reply-due-date | RFQ, RFQLINE | ≥ 80% |
| **Lead Time Adherence** | Actual lead time vs contracted | PO, MATRECTRANS | within ±10% |

### How to do it
1. Define scorecard metric formulas (or reuse SC_ stored procedures — many 7.6 environments have these).
2. Build BIRT report **Vendor_Scorecard_Monthly.rptdesign** with: vendor, 12-month rolling metrics, trend arrow, status (green/yellow/red).
3. Schedule cron: runs 1st of month, emails to procurement manager + buyers.
4. Buyer reviews red/yellow vendors in monthly ops review.
5. Probation / rebid workflows trigger when a vendor drops below threshold for 2 consecutive months.

### Gotchas
- **New vendors** don't have enough data — exclude from scorecarding until 3 months of activity.
- **Low-volume vendors** (< 5 POs/year) have noisy metrics — aggregate across quarters instead of months.
- **Contract-protected vendors** — don't expose scorecards to vendors without legal review of the contract's performance clause.

### Done when
Monthly scorecard runs, procurement reviews red vendors, and at least one underperforming vendor per quarter is either remediated or rebid.

---

## 15. PR / PO Approval Workflows with Thresholds

### What it is
Workflow-driven approval routing based on PR/PO amount, commodity, site, and project. MAS 9 ships stock PR/PO workflow processes that can be customized via the Workflow Designer (app: WFDESIGN).

### Why buyers care
- PRs routed to the right approver automatically.
- Stops "approver shopping" (emailing until someone says yes).
- Clear audit trail per approval stage.

### Tiered thresholds (recommended starting policy)

| Amount | Approver |
|---|---|
| < $1,000 | Requestor's supervisor |
| $1,000–$10,000 | Supervisor + department head |
| $10,000–$50,000 | Above + site director |
| $50,000–$250,000 | Above + procurement manager |
| $250,000+ | Above + CFO |
| Any amount, capital project | Add project manager |
| Any amount, contract | Only buyer approval (contract pre-approved the spend) |

### How to build / tune
1. Workflow Designer app: open the `PRSTATUS` or `POSTATUS` workflow.
2. Add conditional routing nodes: `totalcost >= 10000` → route to department head.
3. Use **Conditions** (CONDITION table — customized 7.6 environments often carry dozens of custom ones) for complex routing.
4. Test in dev by submitting PRs at each threshold and verifying inbox routing.

### Gotchas
- **Out-of-office** — approvers on PTO cause backup. Use delegation (Labor → Delegation tab); workflow honors delegates.
- **Workflow reassignment** mid-flight — MAS 9 supports it via the inbox's Reassign action, but the reassigned approver inherits the amount/commodity rules (they must still be authorized).
- **Escalation** — add timed escalation: if not approved in 48 hours, route to backup approver. Uses the ESCALATION table.
- **Approval comments audit** — require comment on reject. Don't allow silent rejects.

### Done when
Median PR approval time < 24 hours. Zero "lost in someone's inbox" complaints per month.

---

## 16. Invoice Matching (2-way, 3-way, 4-way)

### What it is
Automated reconciliation of vendor invoice against PO (2-way), PO + receipt (3-way), and PO + receipt + inspection (4-way). Controls how much scrutiny each invoice gets before AP pays.

### Why buyers care
- **Buyers own the PO and the contract; AP owns payment; matching is the hand-off.**
- A PO with bad data causes invoice mismatches that land back on the buyer's desk.
- Clean matching = fast AP close = on-time vendor payment = happy vendor.

### The three levels

| Match | Compares | Use for |
|---|---|---|
| **2-way** | Invoice vs PO | Low-value services, subscriptions |
| **3-way** | Invoice vs PO vs Receipt | Standard materials (most POs) |
| **4-way** | Above + Inspection | High-spec / regulated items |

### How to configure
1. **Organizations → Purchasing Options** set the default match level by PO type and commodity.
2. Tolerances per match level — usually:
   - Qty: ±2% or ±1 unit (whichever is larger)
   - Price: ±1%
   - Out of tolerance = invoice goes to WAPPR for buyer/AP reconciliation.
3. Exception workflow: invoice in WAPPR ≥ 3 days → escalate to procurement manager.

### BIRT reports involved
- **Invoice_Match_Rate.rptdesign** — monthly first-pass match %.
- **Invoice_Mismatch_Aging.rptdesign** — weekly: invoices in WAPPR with age and dollar value.
- **Invoice_Disputes_By_Vendor.rptdesign** — quarterly input to vendor scorecard.

### Gotchas
- **Freight and tax** often on invoice but not on PO → always mismatch. Create a "misc charges" allow-list.
- **Short-pays** (vendor invoices for less than received) — easy, auto-match.
- **Over-pays** (vendor invoices for more than received/ordered) — hard, always review.
- **Lump-sum invoices** covering multiple POs — 7.6 required manual split; MAS 9 supports multi-PO invoice linking natively. Use it.

### Done when
First-pass match rate ≥ 95%. Invoice-mismatch-aging > 7 days drops to zero.

---

## 17. BIRT Reports in the Purchasing Process

### What it is
BIRT is the embedded Maximo reporting engine (7.6 and MAS 9 both support it). Your existing purchasing reports — RFQ PDFs, vendor scorecards, spend summaries, auto-reorder digests — are likely BIRT. MAS 9 keeps BIRT but pushes longer-term analytics toward Databricks (DOC5 / Tier 3 win #25).

### Why buyers care
- BIRT is how buyers hand physical paper to vendors, AP, and auditors.
- Every operational report in this doc (AutoReorder_DailyRun, Vendor_Scorecard, Contract_Expiring, etc.) is a BIRT report.
- Broken BIRT reports post-upgrade are the #1 buyer complaint at week 2.

### The purchasing BIRT portfolio (typical SC utility org)

| Report | Purpose | Cadence | Primary consumer |
|---|---|---|---|
| **PO.rptdesign** | Printed/emailed PO to vendor | Per PO issue | Vendor |
| **RFQ.rptdesign** | Outbound RFQ PDF | Per RFQ send | Vendor |
| **PR.rptdesign** | Internal PR printout | On request | Requestor, approver |
| **Contract.rptdesign** | Contract document | Per contract print | Vendor, legal |
| **AutoReorder_DailyRun.rptdesign** | Cron output, daily digest | Daily | Buyer |
| **AutoReorder_Exceptions.rptdesign** | Auto-reorder exceptions | Daily | Buyer |
| **Vendor_Scorecard_Monthly.rptdesign** | Vendor metrics | Monthly | Procurement mgr |
| **Contract_Expiring.rptdesign** | Expiring contract digest | Weekly | Buyer |
| **Reorder_Proposal.rptdesign** | Proposed reorder list | Weekly | Buyer |
| **Invoice_Match_Rate.rptdesign** | First-pass match % | Monthly | AP, procurement mgr |
| **Open_PO_Aging.rptdesign** | Aged open POs | Weekly | Buyer |
| **Spend_By_Commodity.rptdesign** | Commodity spend | Monthly | Procurement mgr |
| **Spot_Spend_Contract_Candidates.rptdesign** | Spend off-contract | Monthly | Procurement mgr |
| **Vendor_Master_Health.rptdesign** | Vendor cleansing progress | Weekly (during campaign) | Admin, buyer |

### BIRT upgrade tasks (for the admin)
1. **Inventory** every BIRT report in the existing 7.6 environment. Most are in `tools/maximo/reports/birt/libraries` and `reports` folders, plus custom reports registered in REPORT table.
2. **Categorize**: stock reports (ship with Maximo, MAS 9 usually has an updated version — replace), custom reports (SC-specific — need to be re-validated), custom-of-stock (SC extended a stock report — need manual merge).
3. **Update data sources** — any JDBC connection string hard-coded for Oracle 12c will break against a new Db2 / Postgres backend. Fix once in the library, re-deploy.
4. **Update hardcoded URLs** — reports that embed "http://webspheremaximoprod..." links break post-upgrade. Use Maximo-relative URLs.
5. **Fonts and images** — BIRT reports using custom fonts not installed on the new Liberty/Linux OpenShift pod will render with fallbacks. Ship fonts in the report library or move to standard.
6. **Rendering engine** — MAS 9 BIRT rendering is on Liberty on OpenShift; rendering quirks for Excel output and multi-page PDFs vary vs WebSphere. Test each report.
7. **Email delivery** — reports delivered via SMTP: confirm SMTP settings against the new Comm Template engine.

### Cron-delivered report examples (scheduled via CRONTASK → REPORTSCHEDULE)
- **BIRTAUTOCRON** (legacy-custom, e.g. a `*.util.*BIRTAutoCron` class) — generic framework for scheduled BIRT runs, emails output to configured recipients.
- **AutoReportGenerationCronTask** (legacy-custom, e.g. a `*.dpa.report.crontask.AutoReportGenerationCronTask` class) — DPA framework scheduled report generation.

### Gotchas
- **Dataset scripts with Oracle-only SQL** (PIVOT, CONNECT BY, MODEL clause) break on Db2. Rewrite to ANSI before upgrade.
- **Report parameters with bind variable syntax** — the `:USER` substitution works in MAS 9, but some older reports used JavaScript expressions that referenced removed Maximo APIs. Test.
- **Large report timeouts** — BIRT on Liberty has a different default timeout than WebSphere. Long-running spend reports (12-month summaries) may need timeout bumps.
- **Long-term plan: migrate analytics reports to Databricks** (win #25). Keep transactional reports (PO, RFQ, PR, Contract printouts) in BIRT — that's what BIRT is good at. Move dashboards and analytics out.

### Done when
Every BIRT report on the purchasing BIRT portfolio list runs, produces a pixel-identical output to pre-upgrade, and the crons that schedule them deliver to the right inbox.

---

## 18. Terms and Conditions Library + Standard Language

### What it is
A reusable library of pre-approved T&Cs (payment terms, warranty clauses, liability caps, insurance requirements, delivery terms, confidentiality, termination). Each PO / Contract / RFQ pulls relevant clauses by reference rather than retyping.

### Why buyers care
- Legal pre-approves the library; buyers stop re-inventing.
- Consistent language across vendors reduces risk.
- PDF PO output reads professionally.

### How to set up
1. Maximo **Terms and Conditions** app — create the library.
2. Organize by category: Payment, Warranty, Insurance, Delivery, IP, Confidentiality.
3. Legal reviews and approves each clause.
4. On PR/PO/Contract: **Terms and Conditions** tab → add by reference.
5. BIRT PO.rptdesign formats and prints the referenced clauses on the PO.

### Gotchas
- **Legal ownership** — one named legal liaison owns the library and signs changes. Without an owner, the library drifts.
- **Vendor-specific overrides** allowed but flagged — a vendor's pushback on a clause must be captured as a variance, not a silent edit.

### Done when
≥ 95% of POs / Contracts pull T&Cs from the library, not from ad-hoc typing.

---

## 19. Buyer Assignment, Commodity Codes, and Routing

### What it is
Assign buyers to commodity groups (e.g., BUYER01 owns HVAC + electrical; BUYER02 owns janitorial + office). Route PRs by commodity automatically. Gives every buyer a clear portfolio.

### Why buyers care
- Stop being "the default buyer" for random one-off PRs outside your expertise.
- Vendor relationships deepen when one buyer owns one commodity.
- Load-balance buyers by volume.

### How to set up
1. **Commodity Groups** app: create groups (COMMGRP) and codes (COMMODITY).
2. **Item Master**: assign each item a commodity code.
3. **Buyer assignment table** (often a custom table or the stock COMMODITY → Buyer map): BUYER01 → HVAC, ELEC. BUYER02 → JAN, OFFICE.
4. PR creation: system looks at PR line's item → commodity code → assigned buyer → sets `PR.buyer`.
5. PR appears in that buyer's Tier 0 saved query "My Open PRs — Ready to Source".

### Gotchas
- **Items with no commodity** — PR defaults to "default buyer." Fix as part of vendor cleansing (win #9 sibling: item cleansing).
- **Multi-commodity PRs** — one PR with 2 lines in different commodities defaults to the first commodity's buyer. For purity, split the PR (rare; usually fine).
- **Commodity-code tree depth** — don't go deeper than 3 levels; harder to assign and maintain.
- **Backup / cross-training** — every commodity should have a primary and a backup buyer. Use Delegation for PTO.

### Done when
90%+ of PRs auto-route to the correct buyer by commodity. Buyer workload is balanced within ±20%.

---

# TIER 3 — ADVANCED WINS

Sprint-level (2–6 weeks), cross-functional (buyer + admin + AP + IT). Usually 6–12 months post-upgrade.

---

## 20. Consolidated Reorder Across Sites

### What it is
For multi-site organizations, a centralized reorder layer that aggregates demand across sites, consolidates to fewer POs, captures volume discounts, and reduces vendor invoicing burden.

### Why buyers care
- 4 sites each ordering 100 of the same bearing monthly = 4 POs, 4 receipts, 4 invoices. Consolidated = 1 PO of 400, 4 cross-docked deliveries, 1 invoice.
- Volume pricing tiers in contracts now apply meaningfully.
- Freight savings.

### Approach
- **Site-level reorder** stays as-is per storeroom (win #10).
- **Daily aggregation cron** scans all site reorder triggers, groups by item + vendor, and either:
  - Creates a single multi-site PO with line-level storeroom shipping, OR
  - Creates a master PO at central warehouse + internal transfers to sites.
- Choose one model based on your existing logistics (cross-dock vs direct ship).

### Gotchas
- **Site authorization** on contracts (win #13) must include all sites.
- **Accounting rules** differ for inter-site transfers vs direct ship to site — involve finance early.
- **Storeroom ownership** of inventory affects scorecarding — clear ownership rules.

### Done when
10%+ spend consolidation across sites; volume discounts captured.

---

## 21. VMI from the Buyer Side

### What it is
**Vendor Managed Inventory** — the vendor replenishes your bins based on daily consumption data you publish. The storekeeper doc (DOC8 win #19) covers VMI from the storeroom side. The buyer side: you negotiate the VMI contract, monitor compliance, and settle billing.

### Why buyers care
- Zero reorder work on VMI SKUs.
- Vendor bears the inventory risk.
- Spend scales with actual consumption, not with stock.

### Buyer setup tasks
1. Negotiate VMI contract with performance clauses (fill rate, stockout compensation).
2. Configure Maximo to share consumption data with vendor (API, EDI, or weekly file).
3. VMI PO is a standing PO with self-billing or scheduled release; receipts auto-post on vendor confirmation.
4. Monthly settlement: invoice vs consumption with tolerance.

### Gotchas
- **Vendor lock-in** — VMI makes switching vendors expensive. Don't VMI strategic items.
- **Pricing discipline** — VMI contracts often quietly creep on price over years. Annual benchmark against non-VMI peers.
- **Data hand-off security** — consumption data going to vendor is a data-sharing agreement. Legal review required.

### Done when
VMI running on 5+ SKUs with zero buyer daily involvement.

---

## 22. e-Procurement / Punch-out Catalogs

### What it is
Buyers "punch out" from Maximo to a vendor's catalog (Grainger, Fisher Scientific, Cintas), build a cart, and the cart returns to Maximo as a PR — with real-time pricing and availability.

### Why buyers care
- Catalog pricing always current.
- Stock images and detailed descriptions carry over.
- Zero manual item-master maintenance for these vendors.

### Integration approach
- cXML or OCI protocol (whichever the vendor supports).
- Maximo Integration Framework (MIF) handles the round-trip.
- Punch-out launched from PR app → vendor catalog → returned with line items.

### Gotchas
- **Item mapping** — returned items may not exist in Item Master. Either auto-create with a "EXTITEM" prefix or reject and require a master item.
- **Approval flow** — punched-out carts must still approve per thresholds.
- **Vendor catalog drift** — pricing and items change on vendor side; your spend reports may show vendor-side SKUs, not your master SKUs.

### Done when
3+ strategic distributors on punch-out; 40%+ of MRO spend through punch-out.

---

## 23. ERP Integration (SAP / Oracle / Workday)

### What it is
Bi-directional integration with the enterprise financial system. Maximo sends approved POs and receipts; ERP sends back GL postings, vendor master updates, and invoice-match confirmations.

### Why buyers care
- Vendor master is owned in one place (usually ERP), synced to Maximo.
- POs hit the GL at approval, not at month-end batch.
- AP / finance reporting from ERP includes Maximo spend.

### The main integration points
| Direction | Object | Frequency |
|---|---|---|
| Maximo → ERP | PO approved | Real-time or near-real-time |
| Maximo → ERP | PO receipt | Real-time |
| Maximo → ERP | PR approved (optional) | Real-time |
| ERP → Maximo | Vendor master | Real-time or hourly |
| ERP → Maximo | GL components | Daily |
| ERP → Maximo | Invoice (if ERP owns AP) | Real-time |

### Gotchas
- **Vendor master as the source of truth** — decide once. Typically ERP wins; Maximo is a consumer.
- **Field-level mapping** hazards — MAS 9 field lengths and types may not match ERP. Validate.
- **Eventing model** — MAS 9 uses publish channels / enterprise services (many 7.6 environments have these already configured — inventory them before the upgrade). Leverage these, don't build new from scratch.

### Done when
PO sync lag is under 5 minutes. Vendor master is in sync daily. AP close time drops 2+ days.

---

## 24. Maximo AI Assist — Supply Chain Capabilities

### What it is
**Maximo AI Assist** (watsonx.ai-powered, available in your MAS 9 entitlement — verify AppPoints per DOC4 §5.1). It brings generative AI directly into purchasing workflows.

### Capabilities most relevant to buyers (from DOC4 §5.1)

| Capability | Buyer-desk use case |
|---|---|
| **Intelligent Search** | Natural-language search across POs, PRs, vendors, contracts. *"Find all POs for bearing assemblies from ACME in the last 6 months."* Kills most spreadsheet lookups. |
| **Work Order Material Recommendations** | When a WO is created, AI suggests materials based on historical patterns, failure codes, and asset history. Upstream demand signal — fewer surprise rush PRs. |
| **Troubleshooting Assistance** | Technicians describe symptoms; AI recommends parts from manuals and historical WOs. Reduces "wrong part ordered" returns. |
| **Knowledge Base Access** | Query maintenance manuals, vendor documentation through conversational UI — buyers use this to validate part specs vs spec sheets. |
| **Document Summarization** | Summarize long vendor contracts, SOWs, or spec docs into a 1-page brief. The single-biggest time saver for contract review. |
| **Failure-to-Parts Mapping** | AI maps failure modes → likely parts needed, improving material planning accuracy on the buyer side. |

### Why buyers care
- 5× faster contract review via summarization.
- Fewer wrong-part orders (Parts Identifier companion — win #24b).
- Natural-language search ends the "which field was that filter on?" problem.

### How to enable
- Admin enables AI Assist per MAS 9.1 docs; assigns AppPoints.
- Index scope configured to include: Contract library, Company master, prior SOWs, RFQ history, PO history.
- Buyer access via AI Assist panel in Manage.

### Gotchas
- **AppPoints cost.** AI Assist consumes AppPoints per user — verify entitlement with IBM account team before enabling for the whole buyer group.
- **Confidentiality.** Inputs transit to watsonx service; check your data-residency and privilege policies (legal / compliance review).
- **Hallucination.** The model will confidently recommend vendors that *don't match* your commodity restrictions. Always human-review.
- **Indexing freshness.** If the contract index isn't refreshed after a vendor merge (Tier 2 win #9), AI Assist may surface the disabled secondary. Add a re-index step to the vendor-merge runbook.

### Done when
Buyers use AI Assist for ≥ 20% of non-routine contract reviews, spec validations, and vendor queries.

---

## 24b. Maximo Parts Identifier

### What it is
Computer-vision part identification (DOC4 §5.2). Technician (or buyer) snaps a photo of an unknown part, and the service matches it against your item catalog, returning item number, manufacturer cross-reference, and current stock.

### Why buyers care
- Cuts the "can you come look at this thing in bin 47?" calls to zero.
- Eliminates wrong-part PRs from field descriptions like "that round metal thing."
- Cross-references to manufacturer / vendor part numbers — useful for sourcing from an alternate supplier.

### How to enable
- Admin enables per MAS 9 docs.
- Item master images must be populated for matching to work — build image capture into the item-onboarding process.
- Mobile app integration (phone camera → Parts Identifier service → Item Master lookup).

### Gotchas
- **Training-set quality** — matches are only as good as the images you've uploaded. Start by photographing top-200 A-class items.
- **Legacy items with no image** fall back to text search.
- **Confusability** — similar-looking parts with different spec (inch vs metric) can mismatch. Always confirm dimensions post-identification.

### Done when
Top-500 A-items have catalog images, and field PR rework rate drops ≥ 50%.

---

## 25. MRO Inventory Optimization — The Auto-Reorder Confidence Accelerator

### What it is
**IBM Maximo MRO Inventory Optimization** (DOC4 Part Four / §6.x) — a cloud SaaS add-on that runs AI forecasting, criticality analysis, and service-level analysis against your Manage data and pushes **optimized ROP/MAX values back to Item Master** via REST. Did not exist in 7.6 — is a pure upside of the MAS 9 ecosystem.

This is the fastest shortcut to "auto-reorder with confidence" for most utilities. You skip the in-house Databricks build; you get purpose-built inventory-optimization AI that IBM has tuned for MRO (not generic retail-demand ML).

### Why buyers care (the industry data — from DOC4 §6.1)
- **Organizations carry 20–40% more MRO inventory than needed.**
- **81% of order quantities are wrong** based on manual calculations.
- **30% of stocked parts will never be used.**
- **50% of open work orders are waiting on parts.**
- **25% of technician time** is spent searching for parts.

If your auto-reorder (win #12) has been stuck at Level 1 for 6 months because nobody trusts the ROPs, MRO Inventory Optimization is the lever that breaks through.

### What it does (DOC4 §6.2 capabilities)

| Capability | Buyer impact |
|---|---|
| **ROP / MAX Recommendations** | AI-calculated values per item — the heart of the product. |
| **Stockout Detection** | Flags items at risk before next delivery. Proactive PR generation. |
| **Excess Inventory Identification** | Flags slow movers, over-stocked, and candidates for obsolescence. Working capital release. |
| **Demand Forecasting** | AI-driven future parts usage — seasonality, trend, criticality aware. |
| **Criticality Analysis** | Stock levels weighted by asset criticality (Standard package). |
| **Lead Time Analysis** | Factors supplier lead-time variance — feeds back into ROP safety stock. |
| **Service Level Analysis** | Balances stock vs target service levels (fill rate per commodity). |
| **What-If Analysis** | Model scenarios (budget cut, demand spike) before committing. |
| **Baseline Analysis** | Compare current ROP/MAX against AI-recommended side-by-side. |
| **AI Smart Review** | Automated review/approval of recommendations (Standard package). |
| **Automation Workflows** | Auto-apply approved recommendations to Item Master via API. |
| **Prioritized Alerts** | Notifications for items requiring immediate attention. |
| **Quick Reports / Dashboards** | Pre-built inventory performance analytics. |

### Essentials vs Standard package (DOC4 §6.3)

| Feature area | Essentials ($3,094+/month) | Standard (custom pricing) |
|---|---|---|
| Up to $50M inventory value / 10,000 items | ✓ | Unlimited |
| ROP/MAX recommendations | ✓ | ✓ |
| Prioritized alerts | ✓ | ✓ |
| Wizard-based setup | ✓ | ✓ |
| Automated continuous monitoring | — | ✓ |
| Configurable work queues | — | ✓ |
| Automation workflows (auto-push to Manage) | — | ✓ |
| AI Smart Review | — | ✓ |
| Service level analysis | — | ✓ |
| Criticality analysis | — | ✓ |
| Lead-time analysis | — | ✓ |
| Demand forecasting | — | ✓ |
| What-If analysis | — | ✓ |

**Recommended path for a utility coming off 7.6:** start with **Essentials for a 3-month pilot** on one storeroom (500–2,000 items), measure excess reduction + stockout prevention, then decide on Standard.

### Implementation approach (DOC4 §6.6 — condensed 10-14 week plan)

| Phase | Weeks | Buyer / procurement role |
|---|---|---|
| 1. Discovery | 2 | Identify pilot storeroom; export ROP/MAX baseline |
| 2. Data prep | 2 | Clean item data (leans on Tier 2 wins #9, #10, #19) |
| 3. Pilot setup | 1–2 | IBM configures Essentials; IT wires API |
| 4. Pilot execution | 12 (3 months) | Compare AI recs vs current values weekly |
| 5. ROI measurement | 2 | Excess reduction $, stockouts avoided, service lift |
| 6. Go/no-go on Standard | 1 | Finance + procurement decide |
| 7. Full rollout | 8–12 | All storerooms; enable automation workflows |

### Integration with Manage (DOC4 §6.4)
- REST API connection to MAS 9 Manage.
- Reads inventory data, work-order history, purchase history.
- Pushes optimized ROP/MAX back to Item Master.
- Runs entirely in IBM Cloud — no impact on your OpenShift cluster.

### How this makes auto-reorder confident (the payoff for wins #10, #12)
1. Your buyers agreed Level-1 auto-reorder was generating too many exceptions because **ROP data was garbage** (common after 7.6 migration).
2. MRO Inventory Optimization replaces garbage ROPs with AI-optimized ROPs in ≤ 90 days for the pilot storeroom.
3. Now Level-2 auto-approve threshold rate jumps from 60% to 95% straight-through because the ROPs are trustworthy.
4. The pipeline you built in win #12 now runs as designed, with buyer effort on exceptions only.

### Competitor alternatives (from DOC4 §7.x — know the landscape)
If your organization wants to bake off against IBM's offering, the main competitors are **Syncron** (IDC MarketScape leader, probabilistic ML for intermittent demand), **Baxter Planning** (total-cost optimization, Kinaxis ecosystem), **PTC Servigistics**, **IFS Cloud ERP Spare Parts Planning**, **Verusen** (AI MRO intelligence). None of these have native Maximo integration the way IBM's SaaS does — they all require a data-feed layer. For a utility standardized on MAS 9, IBM's product is the path of least integration friction.

### Gotchas
- **Data quality is still the gate.** MRO IO cannot fix a vendor master full of duplicates or an Item Master with missing commodity codes. Tier 2 wins #9 and #10 are still mandatory; MRO IO accelerates what comes after.
- **Essentials doesn't push automatically** — it recommends; a buyer approves and applies. Fine for pilot; upgrade to Standard when you're ready for automation.
- **Pricing is subscription** — $3,094+/month for Essentials at entry. Get finance on board early.
- **Data residency** — confirm IBM Cloud region matches your compliance posture.

### Done when
- Pilot storeroom shows ≥ 15% excess inventory reduction at equal or better service level.
- Stockouts in pilot drop ≥ 30% vs pre-pilot.
- Buyer auto-reorder trust (win #12 Level 2) rises to ≥ 95% straight-through rate.
- Full rollout funded and scheduled.

---

## 25b. Databricks Spend Analytics — the BIRT Successor

### What it is
Strategic analytics (spend, supplier risk, contract utilization, predictive reorder) migrate from BIRT to Databricks per DOC5. Keep operational BIRT reports (PO printout, RFQ PDF, daily digest); move dashboards to Databricks / Power BI / Cognos.

### Why buyers care
- Cross-source analytics: Maximo + ERP + CRM + market data in one view.
- Predictive vendor risk scoring using external data (credit reports, news sentiment).
- Spend categorization via ML beats manual commodity coding.

### Migration approach (per DOC5)
1. Maximo → Databricks ingestion (Event Streams or batch).
2. Dashboards rebuilt in Databricks SQL / Power BI / Cognos.
3. BIRT operational reports stay.

### Gotchas
- **Data freshness trade-off** — Databricks is usually minutes-behind, not real-time. Don't move alerting dashboards off BIRT without real-time sync.
- **Governance** — procurement mgr owns the BI content; IT owns the pipeline. Clear separation.

### Done when
All monthly/quarterly spend analytics run on Databricks; BIRT portfolio shrinks to transactional reports only.

---

## 26. Supplier Collaboration Portal

### What it is
A vendor-facing portal (browser-based) where vendors can: view their open POs, confirm ship dates, submit shipping notices, upload invoices, view payment status, respond to RFQs, and view their scorecard.

### Why buyers care
- Fewer emails and phone calls.
- Vendor self-service on routine status questions.
- Invoice submission portal reduces paper.

### Implementation options
- MAS 9 Supplier Portal (if licensed).
- Maximo Anywhere / custom portal tied to MAS APIs.
- Third-party (Coupa, Ariba) integrated with Maximo.

### Gotchas
- **Vendor onboarding** takes quarters, not weeks. Pilot with top 10 vendors.
- **Identity** — federated ID (vendors don't want another password). Integrate with SSO.
- **Scorecard transparency** — before exposing to vendors, legal must review.

### Done when
Top-20-spend vendors use the portal for PO status and invoice submission. Buyer email volume on routine status drops 50%+.

---

# REFERENCE

---

## 27. Daily / Weekly / Monthly Buyer Rhythm

### Daily (20 minutes first thing)
- Check Inbox — approvals, escalations, rejects.
- Review My Open PRs — Ready to Source; pick the oldest or most urgent.
- Review AutoReorder_Exceptions digest — action any flagged items.
- Skim POs Past Required Date — expedite any late deliveries.
- Check RFQs Due Today — nudge non-responders.

### Weekly (1 hour, typically Monday)
- Review PRs Older Than 14 Days — Unsourced; push or cancel.
- Review Stale PR / Open PO / Orphan Line query; close stragglers.
- Review Contracts Expiring in 90 Days; initiate renewals.
- Run Reorder Proposal report; review and approve batch.
- Scan Vendor Master Health report for new bad vendors.

### Monthly (half day, first week of month)
- Vendor scorecard review; flag red vendors.
- Contract utilization review; renegotiate / renew as needed.
- Spend by commodity — look for spot-spend-contract candidates.
- Auto-reorder KPI review — any drift in straight-through rate?
- Invoice match rate; review dispute patterns.

### Quarterly
- ROP / safety stock / EOQ audit on top 100 A-items (sample 20 per review).
- Vendor cleansing audit: any new duplicates, new missing-tax-ID vendors?
- Buyer load balance review — any buyer overloaded vs commodity plan?
- Contract audit: all active contracts with valid insurance, current.

### Annually
- Vendor master re-cert (big one): every vendor confirms they're still active, tax ID still valid, address correct.
- Annual RFQ / rebid on 20% of strategic categories.
- Review of approval thresholds, commodity assignments, buyer territories.

---

## 28. 7.6 → MAS 9 Purchasing App Mapping

| 7.6 App | MAS 9 App | Change |
|---|---|---|
| Purchase Requisitions | Purchase Requisitions | Same, Carbon UI |
| Purchase Orders | Purchase Orders | Same, Carbon UI |
| Request for Quotation | Request for Quotation | Same |
| Contracts (various types) | Contracts | Consolidated under one shell |
| Companies | Companies | Same |
| Terms and Conditions | Terms and Conditions | Same |
| Invoices | Invoices | Same; improved matching |
| Receiving | Receiving | Same |
| Shipment Receiving | Shipment Receiving | Same |
| Reorder | Reorder | Same logic; UI refresh |
| Desktop Requisitions | Desktop Requisitions | Same |
| Commodity Groups | Commodity Groups | Same |
| **Purchasing Work Center** | *removed* | Use role-based app shell + BUYER_HOME start center |
| **Inventory Planner Work Center** | *removed* | Use Reorder + Inventory apps directly |

Any work-center customizations from 7.6 **do not migrate**. Use role-based apps + Start Centers.

---

## 29. Common Purchasing Gotchas Post-Upgrade

1. **Vendor master pre-cleansing was skipped** — duplicates reappear in auto-reorder and RFQ distribution. **Fix:** run Tier 2 win #9.
2. **BIRT PO.rptdesign renders with wrong logo / layout** — WebSphere vs Liberty font / image paths. **Fix:** BIRT upgrade tasks in win #17.
3. **Email approvals stopped working** — SMTP config not migrated or expired SMTP creds. **Fix:** verify Comm Templates and SMTP endpoint.
4. **PR auto-routing broke** — commodity-code map missing for new items. **Fix:** Tier 2 win #19.
5. **Approval workflows hang at first node** — approver's delegate relation not migrated. **Fix:** re-enter Labor → Delegation.
6. **Inbox blank** — workflow re-assignment from migration did not run. **Fix:** admin re-runs workflow reassignment cron.
7. **PO copy brings stale attachments** — default attachment-carry changed in MAS 9. **Fix:** configure copy-attachment behavior in Org Purchasing Options.
8. **Auto-reorder creates 10× expected PRs on day 1** — ROP data drift during upgrade. **Fix:** disable the cron for 48 hours post-upgrade, validate ROPs, re-enable.
9. **RFQ emails sent but not logged** — Comm Template configuration mismatch. **Fix:** verify Comm Template is tied to the RFQ object and uses SMTP endpoint.
10. **"My Buyer" filter returns nothing** — buyer code on People record blank post-migration. **Fix:** re-populate from baseline export.

---

## 30. Role-Based Learning Path

### Buyer (Day 1 → Day 30)
- Day 1: Tier 0 + Tier 1 wins 1–3.
- Day 2–5: Tier 1 wins 4–8.
- Day 5–10: Shadow a senior buyer on Tier 2 wins 11 (RFQ) and 13 (contract).
- Day 10–20: Own Tier 2 wins 11, 13, 15 (approvals).
- Day 20–30: Participate in win 9 (vendor cleansing) + win 10 (reorder point) reviews.

### Procurement Manager (Day 1 → Day 60)
- Day 1: Tier 0 + ensure BUYER_HOME template deployed org-wide.
- Day 1–10: Drive Tier 2 win 9 (vendor cleansing) — the single most important thing a procurement manager does in the first 90 days.
- Day 10–30: Drive Tier 2 wins 10 (reorder points) and 11 (RFQ discipline).
- Day 30–60: Launch Tier 2 win 14 (scorecarding) and win 19 (commodity / buyer assignment).
- Day 60+: Tier 3 discussions with IT and finance.

### Maximo Admin (Day -7 → Day 14)
- Day -7: Test Tier 0 deployment in dev.
- Day -1: Deploy Tier 0 to prod.
- Day 1: Standby for inbox / query / Start Center issues.
- Day 2–5: Address BIRT report issues (win #17).
- Day 5–10: Set up win 15 approval workflows and win 19 commodity routing.
- Day 10–14: Enable Tier 2 win 12 Level 1 auto-reorder in pilot.

### Contracts Lead (Day 1 → Day 60)
- Day 1: Verify contract migration; Tier 0 + buyer training.
- Day 5: Own Tier 2 wins 13 (contract hygiene) and 18 (T&C library).
- Day 30+: Support win 22 (punch-out) and win 24 (AI clause drafting).

### AP Lead (Day 1 → Day 30)
- Day 1: Tier 0 (for visibility on POs and vendor master).
- Day 5: Tier 2 win 16 (invoice matching) — your flagship.
- Day 15: Tier 2 win 9 support (vendor cleansing from AP angle — tax ID, payment terms).
- Day 30: Tier 2 win 14 (scorecarding input from AP data).

---

## 31. Data Cleansing Master Checklist

The single most important checklist in this document. Run this quarterly; leadership reviews it monthly during the first year post-upgrade.

### Vendors (from win #9)
- [ ] Active vendor count reduced by ≥ 30% from pre-upgrade baseline.
- [ ] Zero active vendors with missing tax ID.
- [ ] Zero active vendors with blank payment terms.
- [ ] Zero active vendors with no commodity code.
- [ ] Zero duplicate tax IDs among active vendors.
- [ ] 100% of active vendors have at least one active remit-to address.
- [ ] New-vendor onboarding checklist enforced (tax ID, W-9, insurance, commodity, payment terms) before activation.
- [ ] Weekly Vendor Master Health Report landing in procurement mgr's inbox.

### Items (supports wins #9, #10, #12, #19)
- [ ] 100% of active items have a commodity code.
- [ ] 100% of active stock lines (INVENTORY) have ABC classification.
- [ ] 100% of active stock lines have Min, Max, Order Qty (non-zero, formula-justified).
- [ ] 100% of active stock lines have a primary vendor set on Item Master.
- [ ] Obsolete items flagged / disabled; not reorderable.

### Contracts (from win #13)
- [ ] 100% of active contracts have Start Date, End Date, Status = APPR, Vendor, Sites.
- [ ] 100% of active contracts have signed-PDF attachment.
- [ ] Zero contracts with end-date already in past still in APPR status.
- [ ] Contracts expiring in 90 days — weekly review landed.

### POs (from wins #2, #6)
- [ ] Open PO count older than 180 days (non-blanket) < 50.
- [ ] Every PO ≥ $5k has sourcing evidence attached (quote, RFQ, contract).
- [ ] Zero POs in WAPPR > 7 days (approval aging).

### PRs (from wins #2, #6)
- [ ] Open PR count in APPR + unsourced < 100.
- [ ] Zero PRs > 30 days in APPR status.
- [ ] 100% of PRs have a buyer assigned (no "default buyer" bucket).

### Reorder Points (from win #10)
- [ ] Monthly ROP Health Report shows < 10% of items off > 30% from calculated.
- [ ] Stockout rate trending down month-over-month.
- [ ] Lead time data in vendor master verified against receipt history within 10%.

### Auto-Reorder (from win #12)
- [ ] Level 1 running for 30+ days without overreach.
- [ ] Daily Exception Report < 10% of generated PRs.
- [ ] Level 2 pilot per commodity showing straight-through rate ≥ 95%.

### Invoicing (from win #16)
- [ ] First-pass match rate ≥ 95%.
- [ ] Mismatch-aging > 7 days = zero at month close.
- [ ] Zero invoices paid without PO match (unless explicitly configured as service buy).

---

*End of DOC9.*

**Related docs:**
- **DOC4** — MAS 9 Supply Chain Management Roadmap. The architectural complement to this doc. Section cross-references from DOC9:
  - DOC4 §3.8 Procurement Module — Desktop Reqs, PRs, POs, RFQs (our wins #2, #4, #11)
  - DOC4 §3.9 Contracts Module — 9 contract types (our win #13)
  - DOC4 §3.10 Receiving & Inspection (our post-PO receipt flow)
  - DOC4 §3.13 Lead Time Calculation — the dynamic formula cited in our win #10
  - DOC4 §3.14 Item Status Lifecycle — PLANNING → ACTIVE → PENDOBS → OBSOLETE (our win #19 commodity cleanup)
  - DOC4 §3.15 Reorder Processing & Safety Stock (our win #10, #12)
  - DOC4 §5.1 Maximo AI Assist (our win #24)
  - DOC4 §5.2 Maximo Parts Identifier (our win #24b)
  - DOC4 §5.4 Maximo Predict (our win #12 Level 4)
  - DOC4 §5.5 Maximo Monitor (our win #12 Level 4 — consumable replenishment)
  - DOC4 §5.6 Maximo Optimizer — material-aware scheduling (upstream demand signal)
  - DOC4 Part Four §6.1–§6.6 MRO Inventory Optimization (our win #25)
  - DOC4 Part Five §7.x Competitor Analysis — Syncron, Baxter Planning, Servigistics, IFS, Verusen (reference in our win #25)
- **DOC8** — MAS 9 Storekeeper Quick Wins (operations companion; purchasing and storeroom share the auto-reorder pipeline).
- **DOC7** — MAS 9 Work Order Management Roadmap (PR demand-signal upstream; Optimizer-driven material coordination).
- **DOC5** — Data Analytics / Databricks / Maximo (the BIRT successor path; our win #25b).
- **DOC6** — MAS 9 Java Extensions Hierarchy (for customization migration — relevant when a legacy 7.6 environment carries dozens of purchasing custom classes).

**Inventory your customizations first:** Before deciding which MAS 9 native feature replaces each customization, build a teardown of exactly what your environment has customized in PR, PO, RFQ, Invoice, Contract, and Company. Catalog every custom Java class, MOD action, comm template, and auto-script bound to those apps. Use that inventory when mapping each legacy customization to its MAS 9 native equivalent.
