# MAS 9 Storekeeper Quick Wins

**Document:** DOC8 — Storekeeper Quick Wins & Daily Rhythm

**Version:** 1.0

**Date:** April 20, 2026

**Audience:** Storeroom clerks, store supervisors, inventory controllers, storeroom leads, and the admins who support them

**Scope:** Day-to-day storeroom work in MAS 9 Manage — from "where do I click?" to "how do we run a modern storeroom." Focused on practical, hands-on wins that make a storekeeper's day faster, cleaner, and less error-prone.

**Upgrade Context:** Maximo 7.6.1.3 → MAS 9 (Manage 9.0 / 9.1)

**Companion Reading:** DOC4 (Supply Chain Management Roadmap) for procurement, contracts, RFQ, and cross-module integration. This document is the **operator-level companion** — DOC4 is the architecture view, DOC8 is the stockroom view.

---

## How to Use This Document

The wins are organized in **three tiers**. Each tier assumes you have mastered the previous one. Do not skip ahead — a beautifully configured VMI pipeline (Tier 3) is useless if your cycle counts are wrong (Tier 2) and your storekeepers hate the Start Center (Tier 1).

| Tier | Who | Time to value | Admin effort |
|------|-----|---------------|--------------|
| **Tier 1 — Simple** | Every storekeeper, Day 1 | Same day | None — pure UI use |
| **Tier 2 — Intermediate** | Storeroom supervisor with admin help | 1–5 days each | Config, no code |
| **Tier 3 — Advanced** | Storeroom lead + solution architect + procurement | Sprints (2–6 weeks) | Config + integration + governance |

Each win follows the same shape:
- **What it is** — one sentence
- **Why storekeepers care** — the pain it removes
- **How to do it** — numbered steps or bullets
- **Gotchas** — what bites you in MAS 9 specifically
- **Done when** — verification

---

## Table of Contents

### Tier 0 — Hour 1 Starter Pack (deploy before anyone logs in)
- [Why Tier 0 exists](#why-tier-0-exists)
- [Starter Saved Queries — Copy/Paste Ready](#starter-saved-queries--copypaste-ready)
- [Starter Start Center Portlets — Template Ready](#starter-start-center-portlets--template-ready)
- [60-Minute Admin Deployment Plan](#60-minute-admin-deployment-plan)
- [Storekeeper Hour-1 Checklist](#storekeeper-hour-1-checklist)

### Tier 1 — Same-Day Wins (no admin needed)
1. [Start Center — Storekeeper Edition](#1-start-center--storekeeper-edition)
2. [Inventory Usage (INVUSAGE) — One App for Issue, Return, Transfer](#2-inventory-usage-invusage--one-app-for-issue-return-transfer)
3. [Saved Queries and Bookmarks — Stop Retyping the Same Filter](#3-saved-queries-and-bookmarks)
4. [Bulk Issue on a Single INVUSAGE Document](#4-bulk-issue-on-a-single-invusage-document)
5. [Receiving App — Fast PO Receipts with Tolerance](#5-receiving-app--fast-po-receipts-with-tolerance)
6. [Barcode Scanning in Manage (Browser) and Mobile](#6-barcode-scanning-in-manage-and-mobile)
7. [Favorite Applications and Inbox Shortcuts](#7-favorite-applications-and-inbox-shortcuts)
8. [Stale Reservation & Overdue Issues — Find and Fix](#8-stale-reservation--overdue-issues)

### Tier 2 — Intermediate (1–5 days, needs admin)
9. [Maximo Mobile Inventory — The Real Work Center Replacement](#9-maximo-mobile-inventory)
10. [Cycle Counting with ABC Classification](#10-cycle-counting-with-abc-classification)
11. [Bin and Lot Control — Multi-Bin Picking](#11-bin-and-lot-control)
12. [Reorder Points, Safety Stock, EOQ — Stop Stockouts and Bloat](#12-reorder-points-safety-stock-eoq)
13. [Kitting — Issue 10 Parts with 1 Scan](#13-kitting)
14. [Hard vs Soft Reservations — Hygiene](#14-hard-vs-soft-reservations)
15. [Stocked Tools and Tool Returns](#15-stocked-tools-and-tool-returns)
16. [Condition-Enabled Items — Reuse Refurbished Parts](#16-condition-enabled-items)
17. [Rotating Items and Serialized Assets](#17-rotating-items-and-serialized-assets)

### Tier 3 — Advanced (sprints, cross-functional)
18. [Consignment Inventory](#18-consignment-inventory)
19. [Vendor Managed Inventory (VMI)](#19-vendor-managed-inventory)
20. [Auto-Reorder Pipeline (Min/Max → PR → PO)](#20-auto-reorder-pipeline)
21. [Storeroom-to-Storeroom Transfer with Staging Workflow](#21-storeroom-to-storeroom-transfer)
22. [AI Assistant and Smart Search (MAS 9.1)](#22-ai-assistant-and-smart-search)
23. [Demand Signals from Health, Predict, and Monitor](#23-demand-signals-from-health-predict-monitor)
24. [IoT-Based Replenishment (Weight Bins, RFID)](#24-iot-based-replenishment)
25. [ERP Integration (SAP, Oracle, Workday)](#25-erp-integration)

### Reference
26. [Daily / Weekly / Monthly Storekeeper Rhythm](#26-daily--weekly--monthly-rhythm)
27. [7.6 → MAS 9 Storekeeper Mapping](#27-76--mas-9-storekeeper-mapping)
28. [Common Gotchas Post-Upgrade](#28-common-gotchas-post-upgrade)
29. [Role-Based Learning Path](#29-role-based-learning-path)

---

# TIER 0 — HOUR 1 STARTER PACK

The pre-loaded version of wins #1 and #3. This is what the Maximo admin deploys **before** the first storekeeper logs in on go-live morning. Every query and portlet below is ready to copy into Query Manager and the Start Center template. Wins #1 and #3 explain the *why* and the mechanics; Tier 0 gives you the *what* to paste.

---

## Why Tier 0 exists

You do not want storekeepers discovering MAS 9 with an empty Start Center, a blank query bar, and 45 apps in "Go To". That is how a MAS 9 rollout generates a week of tickets and permanent bad habits (typing full item numbers, opening Inventory cold, ignoring cycle counts).

Tier 0 fixes this by pre-loading:
1. **15 saved queries** across the 7 storekeeper apps, marked Public, bound to the STOREROOM security group.
2. **A Start Center template** (STOREKEEPER_HOME) with 6 Result Set portlets, 4 KPI portlets, Favorites, and Inbox — pushed to every user in the STOREROOM group.
3. **A 60-minute admin deployment plan** so one person can ship this before coffee break.
4. **A storekeeper hour-1 checklist** so every user verifies they have it.

Do Tier 0 first. Everything else in this document assumes it.

---

## Starter Saved Queries — Copy/Paste Ready

Every query uses the `:STOREROOM` substitution parameter so one query serves every storekeeper — each user's session substitutes their home storeroom. Set the default storeroom per user in **Security Groups → Sites tab → Default Storeroom**, or via the user's profile.

### Inventory (app: INVENTOR, object: INVENTORY)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Below Reorder — My Storeroom** | Y | Y | `currentbal < minlevel AND location = :STOREROOM AND siteid = :SITEID` |
| **Zero Balance — My Storeroom** | Y | N | `currentbal = 0 AND location = :STOREROOM AND siteid = :SITEID` |
| **Slow Movers (180d) — My Storeroom** | Y | N | `lastissuedate < SYSDATE - 180 AND location = :STOREROOM AND currentbal > 0` |
| **High Value Active (>$10k) — My Storeroom** | Y | N | `currentbal * avgcost > 10000 AND location = :STOREROOM` |
| **Stock Lines Missing ABC Class** | Y | N | `(abctype IS NULL OR abctype = ' ') AND location = :STOREROOM` |

### Inventory Usage (app: USAGE, object: INVUSAGE)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Open Issues Today — My Storeroom** | Y | Y | `status = 'ENTERED' AND usagetype = 'ISSUE' AND storeloc = :STOREROOM` |
| **Stale Reservations (>30d) — My Storeroom** | Y | N | `status = 'ENTERED' AND storeloc = :STOREROOM AND changedate < SYSDATE - 30` |
| **Stale Reservations (>90d) — Escalate** | Y | N | `status = 'ENTERED' AND storeloc = :STOREROOM AND changedate < SYSDATE - 90` |
| **Completed Today — My Storeroom** | Y | N | `status = 'COMPLETE' AND storeloc = :STOREROOM AND TRUNC(statusdate) = TRUNC(SYSDATE)` |
| **Transfers Out — In Progress** | Y | N | `usagetype = 'TRANSFER' AND status IN ('ENTERED','STAGED','SHIPPED') AND storeloc = :STOREROOM` |

### Receiving (app: RECEIVING, object: MATRECTRANS / PO-based)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Pending PO Receipts — My Storeroom** | Y | Y | `EXISTS (SELECT 1 FROM po WHERE po.ponum = poline.ponum AND po.status = 'APPR') AND storeloc = :STOREROOM AND receivedqty < orderqty` |
| **Overdue Receipts (past required date)** | Y | N | `requireddate < SYSDATE AND receivedqty < orderqty AND storeloc = :STOREROOM` |
| **Inspection Hold** | Y | N | `inspectionrequired = 1 AND inspectedqty < receivedqty AND storeloc = :STOREROOM` |

### Physical Count (part of Inventory app — use INVBALANCES)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Cycle Counts Due This Week — My Storeroom** | Y | Y | `physcntdate <= SYSDATE + 7 AND location = :STOREROOM` |
| **Cycle Counts Overdue — My Storeroom** | Y | N | `physcntdate < SYSDATE AND location = :STOREROOM` |

### Shipment Receiving (app: SHIPMENT)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Inbound Transfers Pending — My Storeroom** | Y | Y | `status = 'SHIPPED' AND tostoreloc = :STOREROOM` |

### Reorder (app: REORDER)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Ready to Reorder — My Storeroom** | Y | Y | `location = :STOREROOM AND currentbal <= minlevel AND issiteinv = 1` |

### Item Master (app: ITEM)

| Query Name | Public | Default | WHERE clause |
|---|---|---|---|
| **Items Missing ABC — My Site** | Y | N | `(abctype IS NULL OR abctype = ' ') AND EXISTS (SELECT 1 FROM inventory inv WHERE inv.itemnum = item.itemnum AND inv.siteid = :SITEID)` |

### Query notes
- All queries above use ANSI SQL that works on Db2 and Oracle backends.
- `:STOREROOM` and `:SITEID` are Maximo bind variables resolved from the logged-in user's session.
- Queries default to **Public** so they are visible to every storekeeper; do **not** mark as **Private** or they won't show in the Start Center Result Set picker for the group.
- Only **one** query per app can be marked **Default** per user — pick the one listed as `Default = Y` above.

---

## Starter Start Center Portlets — Template Ready

Deploy as a single template named **STOREKEEPER_HOME**, then push to the STOREROOM security group. Everyone in the group gets the same layout, but the `:STOREROOM` bind variable personalizes the content.

### Layout (2-column, top-down)

**Left column (Result Sets):**

| Slot | Portlet Name | Portlet Type | Source Query | Refresh |
|---|---|---|---|---|
| L1 | Items Below Reorder | Result Set | Inventory → Below Reorder — My Storeroom | 15 min |
| L2 | Open Issues Today | Result Set | Inventory Usage → Open Issues Today — My Storeroom | 5 min |
| L3 | PO Receipts Pending | Result Set | Receiving → Pending PO Receipts — My Storeroom | 10 min |
| L4 | Cycle Counts Due This Week | Result Set | Physical Count → Cycle Counts Due This Week — My Storeroom | daily |
| L5 | Stale Reservations (>30d) | Result Set | Inventory Usage → Stale Reservations (>30d) — My Storeroom | daily |
| L6 | Inbound Transfers Pending | Result Set | Shipment Receiving → Inbound Transfers Pending — My Storeroom | 15 min |

**Right column (KPIs + navigation):**

| Slot | Portlet Name | Portlet Type | Metric |
|---|---|---|---|
| R1 | Inventory Value ($) | KPI | `SUM(currentbal * avgcost) WHERE location = :STOREROOM` |
| R2 | Below-Reorder Count | KPI | `COUNT(*) WHERE currentbal < minlevel AND location = :STOREROOM` |
| R3 | Open Reservations Count | KPI | `COUNT(*) FROM invusage WHERE status = 'ENTERED' AND storeloc = :STOREROOM` |
| R4 | Material Issued This Week ($) | KPI | `SUM(linecost) FROM matusetrans WHERE storeloc = :STOREROOM AND transdate >= TRUNC(SYSDATE,'IW')` |
| R5 | Favorite Applications | Favorites | Inventory, Inventory Usage, Receiving, Physical Count, Reorder, Shipment Receiving, Item Master, Storerooms |
| R6 | Inbox / Assignments | Inbox | (out of the box) |

### KPI thresholds (traffic-light colors)

| KPI | Green | Yellow | Red |
|---|---|---|---|
| Below-Reorder Count | ≤ 10 | 11–30 | > 30 |
| Open Reservations Count | ≤ 25 | 26–75 | > 75 |
| Inventory Value — drift from baseline | ±5% | ±5–15% | >±15% |
| Material Issued This Week — vs 4-week avg | ±20% | ±20–50% | >±50% |

Thresholds are illustrative — tune during the first 30 days based on your actual storeroom size.

### Template metadata
- **Template name:** STOREKEEPER_HOME
- **Assigned to security groups:** STOREROOM, STOREROOM_SUPV
- **Allow user modification:** Yes (supervisors can add their own portlets; base template is locked)
- **Default on first login:** Yes

---

## 60-Minute Admin Deployment Plan

One Maximo admin, ~60 minutes, before go-live morning.

| Min | Step | Where |
|---|---|---|
| 0–5 | Verify STOREROOM and STOREROOM_SUPV security groups exist; confirm membership. | Security Groups app |
| 5–10 | Confirm every storekeeper has **Default Storeroom** set on their Labor / Person record (this is what `:STOREROOM` resolves to). | People app → Main tab |
| 10–30 | Create all 15 starter queries above in **Query Manager** (one per app). Mark **Public**, set **Default** where indicated. | Query app (accessed from each listed application's list view → Save Query) |
| 30–45 | Build the **STOREKEEPER_HOME** template with the 12 portlets above. Bind each Result Set to its query. Configure KPI SQL + thresholds. | Start Center → Template Administration |
| 45–55 | Assign STOREKEEPER_HOME template to security groups STOREROOM and STOREROOM_SUPV. Mark as default on first login. | Start Center → Template Administration → Assign |
| 55–60 | Log in as a test storekeeper user. Verify Start Center renders, queries return data, KPIs compute. | Test login |

### Smoke test checklist (run before go-live)
- [ ] Log in as **test storekeeper #1** (storeroom A) — Start Center shows data from storeroom A.
- [ ] Log in as **test storekeeper #2** (storeroom B) — Start Center shows data from storeroom B (different numbers).
- [ ] Open **Inventory** — defaulted query "Below Reorder — My Storeroom" loads automatically.
- [ ] Open **Inventory Usage** — defaulted query "Open Issues Today — My Storeroom" loads automatically.
- [ ] Click through each Result Set portlet — drills through to the underlying app list.
- [ ] Inbox shows at least the workflow assignments from approvals.
- [ ] KPI refresh on manual click works without error.

---

## Storekeeper Hour-1 Checklist

Give this to every storekeeper on go-live morning. If they can't tick every box, their admin has not finished Tier 0 — call them back.

- [ ] I logged into MAS 9 Manage and my Start Center shows **my storeroom's numbers**, not blanks.
- [ ] I see at least 6 Result Set portlets with real data (Below Reorder, Open Issues, PO Receipts, Cycle Counts, Stale Reservations, Inbound Transfers).
- [ ] I see at least 4 KPI tiles with numbers (Inventory Value, Below-Reorder Count, Open Reservations, Material Issued This Week).
- [ ] When I open **Inventory**, the list is already filtered to "Below Reorder — My Storeroom".
- [ ] When I open **Inventory Usage**, the list is already filtered to "Open Issues Today — My Storeroom".
- [ ] My **Favorites** menu has at least 8 apps pre-pinned.
- [ ] I can see the **Inbox** icon in the top bar and it shows any pending approvals routed to me.
- [ ] I know the name of my default storeroom (ask your supervisor if you don't).

Once this checklist passes, move into Tier 1 win #1 (personalize Start Center further) and win #3 (add your own saved queries on top of the starter pack).

---

# TIER 1 — SAME-DAY WINS

These require no configuration, no admin ticket, no license upgrade. A storekeeper can do every one of these on the first day after go-live.

---

## 1. Start Center — Storekeeper Edition

### What it is
The Start Center is the storekeeper's home page when they log into Manage. Out of the box it is generic. In five minutes it becomes the single screen that runs the storeroom.

### Why storekeepers care
- One screen shows: what needs to be issued today, what is below reorder point, what PO receipts are pending, and what cycle counts are due.
- Replaces the habit of opening 6 apps every morning.
- Kills the "I didn't know we were out of that" excuse.

### How to do it
1. Log in. Top-right menu → **Display Settings** → **Modify Existing Templates** (or create new).
2. Add the following **Result Set** portlets — each is a saved query pinned to the home page:

| Portlet Name | Application | Query Logic |
|---|---|---|
| **Items Below Reorder Point** | Inventory | `currentbal < minlevel AND location = :YOUR_STOREROOM` |
| **Open Reservations — My Storeroom** | Inventory Usage | `status = 'ENTERED' AND fromstoreroom = :YOUR_STOREROOM` |
| **PO Receipts Pending Today** | Receiving | `pono IN (SELECT ponum FROM po WHERE status = 'APPR') AND receivedqty = 0` |
| **Cycle Counts Due This Week** | Inventory | `physcntdate <= SYSDATE + 7 AND location = :YOUR_STOREROOM` |
| **Transfers In — Pending Receipt** | Shipment Receiving | `status = 'SHIPPED' AND tostore = :YOUR_STOREROOM` |
| **Stale Reservations (>30 days)** | Inventory Usage | `status = 'ENTERED' AND changedate < SYSDATE - 30` |

3. Add **KPI portlets** for at-a-glance numbers:
   - Inventory value in my storeroom
   - Number of items below reorder
   - Number of open reservations
   - Dollar value of material issued this week
4. Add **Favorite Applications** portlet with: Inventory, Inventory Usage, Receiving, Physical Count, Reorder, Item Master, Storerooms.
5. Save as your personal template; supervisors can push a template to the whole storeroom security group.

### Gotchas
- MAS 9 Carbon UI renders Start Center portlets differently than 7.6 — **some custom portlet code from 7.6 will not carry forward** and needs to be rebuilt as a Result Set + KPI combination.
- Graph portlets that relied on old Flash/SVG rendering are gone; use Result Set + KPI instead.
- The `:YOUR_STOREROOM` bind variable is a **substitution parameter** — set it per user so the same template works for every storekeeper.

### Done when
Every storekeeper has a Start Center with at least 4 Result Sets and 2 KPIs, and they no longer open the Inventory application cold every morning.

---

## 2. Inventory Usage (INVUSAGE) — One App for Issue, Return, Transfer

### What it is
**Inventory Usage** (object name `INVUSAGE`, app name `USAGE`) is the single application in MAS 9 that handles material issues, returns, transfers, and staging. It replaced the three separate actions (**Issue Current Item**, **Transfer Out**, **Return**) that storekeepers used in 7.6 from the Inventory application.

### Why storekeepers care
- **One transaction, one number, one audit trail.** You can issue 5 parts, return 1, and transfer 2 on the same document.
- Line-level edits until the document is **completed** — mistakes are fixed in place, not reversed with negative transactions.
- Status workflow (`ENTERED → COMPLETE`) means a supervisor can review before the inventory balance moves.
- Works identically on desktop Manage and Maximo Mobile Inventory.

### How to do it — Issue Parts Against a Work Order
1. Go to **Inventory Usage** → **New Inventory Usage**.
2. Set **Usage Type = ISSUE**, **From Storeroom = [your storeroom]**.
3. Click **New Row** in the Lines tab.
4. Enter:
   - **Item** (scan barcode or type)
   - **Quantity**
   - **Issue To = Work Order** (or Location, or GL Account)
   - **Work Order** number — the app auto-populates asset, location, GL
   - **Bin** (if multi-bin storeroom — defaults to primary)
   - **Rotating Asset Number** (required for rotating items)
   - **Issued To Person** (mandatory for tools)
5. Add more lines for more parts on the same issue.
6. Change status to **COMPLETE**. Balance updates, reservation is consumed, WO actuals update, GL entries post.

### How to do it — Issue Without a Reservation
Same as above but leave **Reservation** blank. The app will ask whether to create the issue as unplanned — click yes.

### How to do it — Return to Storeroom
1. New Inventory Usage → **Usage Type = RETURN**.
2. Enter **Item**, **Quantity**, **Return From Work Order** (or location).
3. If item is **condition-enabled**, pick the returned condition (NEW, REFURB, SCRAP, etc.). Balance posts to the matching condition-code stock line.
4. Complete.

### How to do it — Transfer Between Storerooms (single-step, no staging)
1. New Inventory Usage → **Usage Type = TRANSFER**.
2. **From Storeroom** = source; each line has **To Storeroom** = destination.
3. Complete. Balances move immediately (no shipment record). Use this **only** for informal transfers within the same site.
4. For cross-site or audited transfers, use the staging workflow (see win #21).

### Gotchas
- In 7.6, **Issue Current Item** from Inventory → Item wrote straight to MATUSETRANS. In MAS 9, **everything flows through INVUSAGE and INVUSELINE first**, then posts to MATUSETRANS when status = COMPLETE. Any custom report or integration that read MATUSETRANS during an open issue transaction will need to read INVUSELINE instead.
- **Status flow matters.** Lines in status ENTERED are *not yet* reflected in current balance. Storekeepers frequently panic because "the balance didn't go down" — tell them to complete the document.
- **Cannot mix Usage Types on one document.** An issue and a return must be separate INVUSAGE records.
- **Rotating items must have the specific asset picked**, not just a quantity. The app blocks completion otherwise.
- **Tool issues require Issued To Person.** Non-negotiable.

### Done when
Storekeepers stop asking "where is Issue Current Item?" and they routinely process 5–10 line multi-item issues on a single INVUSAGE.

---

## 3. Saved Queries and Bookmarks

### What it is
Every list page in MAS 9 Manage has a **saved queries** menu (binoculars icon → **Save Query**). Save the filters you run ten times a day.

### Why storekeepers care
- Stop retyping `status = 'ENTERED' AND storeroom = 'CENTRAL'` every morning.
- Set a saved query as **default** so the list opens already filtered.
- Share a saved query with the whole storeroom security group in one click.

### How to do it
1. Go to Inventory Usage list.
2. Filter: status = ENTERED, from storeroom = CENTRAL, date today.
3. **Save Query** → name it "My Open Issues Today".
4. Check **Default** to make it the opening view.
5. Check **Public** if supervisors want it shared with the group.

### Recommended saved queries for every storekeeper
| App | Query Name | Logic |
|---|---|---|
| Inventory | Below Reorder | `currentbal < minlevel` |
| Inventory | Zero Balance | `currentbal = 0` |
| Inventory | Slow Movers | `lastissuedate < SYSDATE - 180` |
| Inventory Usage | Open Issues | `status = 'ENTERED' AND usagetype = 'ISSUE'` |
| Inventory Usage | Stale >30 days | `status = 'ENTERED' AND changedate < SYSDATE - 30` |
| Receiving | Pending PO Receipts | `pono.status = 'APPR' AND receivedqty < orderqty` |
| Physical Count | Due This Week | `physcntdate <= SYSDATE + 7` |
| Reorder | Ready to Reorder | `currentbal <= minlevel AND issiteinv = 1` |

### Gotchas
- In 7.6, the "Save As" query sometimes leaked across sites. In MAS 9 Carbon UI, queries are cleanly scoped per user by default — supervisors must explicitly mark them public.
- Queries with bind variables (`:USER`, `:SITE`) still work; keep using them to avoid hard-coding storeroom names.

### Done when
Every storekeeper has at least 5 personal saved queries and opens each primary app to a **defaulted** list, not an empty filter.

---

## 4. Bulk Issue on a Single INVUSAGE Document

### What it is
One INVUSAGE document can hold many lines. Use this instead of opening a new issue per part.

### Why storekeepers care
A 12-part PM kit issued to a work order was previously 12 Issue Current Item clicks in 7.6 (or a spreadsheet import). In MAS 9 it is one document, one paper printout, one GL posting batch.

### How to do it
1. **New Inventory Usage**, set header (storeroom, usage type = ISSUE).
2. In the Lines tab, click **Select Reserved Items** from the action menu → picks every reservation for a given work order and fills the lines automatically.
3. Alternatively, click **Select Spare Parts** to pull from the asset's spare parts list.
4. Adjust quantities if needed (partial issue) and complete.

### Pro tip
- If you scan barcodes in the Item column with a USB scanner, Manage will create a new line per scan with quantity 1. Scan each part in the kit and you have your multi-line issue in 20 seconds.
- Mobile Inventory does the same with a phone camera scan.

### Gotchas
- **Select Reserved Items** only pulls reservations whose status is active and whose storeroom matches the header storeroom.
- Partial issue leaves the remaining reservation open; it does not auto-cancel. Clean those up during Tier 2 (see win #14).

### Done when
Kit issues take one INVUSAGE document instead of N.

---

## 5. Receiving App — Fast PO Receipts with Tolerance

### What it is
The **Receiving** application is where POs turn into storeroom balance. In MAS 9 it supports barcode scan, tolerance receipts, and the same multi-line pattern as INVUSAGE.

### Why storekeepers care
- Receive 30 lines on a PO in one pass, not 30 separate clicks.
- Tolerance receipts (receive 102% of ordered qty) are handled without an exception workflow unless the tolerance is exceeded.
- Inspection-required items are flagged automatically and routed to a holding location until accepted.

### How to do it — Simple receipt
1. Open **Receiving**, enter PO number (scan barcode from packing slip if your POs print with a barcode — they should).
2. **Select Ordered Items** from action menu → all open lines load.
3. For each received line, confirm quantity (defaults to ordered qty), set bin, set condition code if condition-enabled.
4. Save. Balance increments. Receipt transaction posts to MATRECTRANS.

### How to do it — Inspection receipt
1. Receive into **holding location** (usually named HOLDING or QC).
2. Open **Inspection** → item appears in queue.
3. Accept (moves to storeroom bin) or reject (creates debit memo + return-to-vendor).

### Gotchas
- Tolerance settings live on **Organizations → Inventory Options**, not on the PO itself. Storekeepers can't receive beyond tolerance without supervisor override.
- **Rotating items** — each unit must have a unique asset number entered at receipt. MAS 9 can auto-generate them from an Autonumber sequence if configured.
- **Lot-controlled items** — lot number is required at receipt. Missing lot blocks the save.

### Done when
Storekeepers receive a 10-line PO in under 3 minutes and know the difference between a tolerance receipt and an exception.

---

## 6. Barcode Scanning in Manage and Mobile

### What it is
MAS 9 Carbon UI (browser) accepts USB barcode scanners as keyboard input on any numeric/text field. Maximo Mobile Inventory uses the phone camera.

### Why storekeepers care
- Eliminate keystroke errors on 13-character item numbers.
- 10× faster cycle counts.
- Scanning a bin label auto-populates the bin field.

### How to do it — Desktop
1. Plug a USB HID barcode scanner into the storeroom PC. No driver needed; it emulates a keyboard.
2. Click into the Item field on any INVUSAGE line.
3. Scan — the item populates, tab advances to Quantity.

### How to do it — Mobile
1. Open **Maximo Mobile Inventory** app on phone/tablet.
2. Tap the scan icon (camera) on the Item or Bin field.
3. Camera scans QR/1D barcode, field fills.

### What to barcode in your storeroom (if you don't already)
| Barcode on | Content encoded | Why |
|---|---|---|
| Item master cards | `ITEMNUM` | Scan at issue / count |
| Bin labels | `BIN` (or `LOCATION.BIN` concat) | Scan to auto-populate bin field |
| Shelf labels | Same as bin | Helps when bins are sub-shelves |
| PO packing slips | `PONUM` | Opens receiving on the right PO |
| Work order paper | `WONUM` | Opens WO from mobile |
| Asset tags | `ASSETNUM` | Rotating issue / location lookup |

### Gotchas
- Barcode scanner prefix/suffix settings — **always configure scanners to send Enter/Tab after the scan**, otherwise the field doesn't commit.
- Carbon UI's numeric fields occasionally eat leading zeros — use text-type fields for items with leading-zero item numbers, or change scanner to keyboard-wedge mode that types the zero first.
- Mobile camera scanning in poor warehouse lighting is unreliable — use a cheap Bluetooth ring scanner (~$60) paired to the phone for high-volume work.

### Done when
No storekeeper types a full item number by hand during normal work.

---

## 7. Favorite Applications and Inbox Shortcuts

### What it is
The **Favorites** side menu in MAS 9 holds your most-used apps; the **Inbox** holds workflow approvals and notifications.

### Why storekeepers care
- Cut 4 clicks off every app switch.
- Approvals (PR, PO, adjustments above threshold) don't get lost in email.

### How to do it
1. Click the star on any app tile in **Go To → Supply Chain Management**. It moves to Favorites.
2. Recommended favorites for storekeepers: Inventory, Inventory Usage, Receiving, Physical Count, Reorder, Shipment Receiving, Item Master, Storerooms.
3. Inbox is already visible in the top bar — click it every morning and clear.
4. Inbox is tied to workflows; configure your admin to route **adjustment > $1000** and **cycle count variance > 5%** to the storeroom supervisor's inbox (covered in Tier 2).

### Done when
Every storekeeper's first-click-after-login opens an app that is one click away.

---

## 8. Stale Reservation & Overdue Issues

### What it is
In 7.6, storekeepers had no clean view of reservations that had aged. The cleanup was a database script. In MAS 9, a saved query + a weekly rhythm solves it.

### Why storekeepers care
- Stale reservations block inventory that could be issued elsewhere.
- They distort Available balance and cause false stockouts.
- Fixing them is 10 minutes a week, not 10 hours a month.

### How to do it
1. Inventory Usage → saved query: `status = 'ENTERED' AND changedate < SYSDATE - 30`.
2. For each stale record, contact the requester (work order planner).
3. Either **complete** (if material was actually issued informally — correct the record) or **cancel** (reservation no longer needed).
4. For reservations whose work order is CLOSED or CANCELED, bulk-cancel using the action menu.

### Pro move
Ask your admin to schedule a **Cron Task** that flags reservations older than 90 days whose work order is not ACTIVE. Routes to supervisor inbox. Zero manual scan needed.

### Done when
Stale reservation count stays under 20 in your storeroom, permanently.

---

# TIER 2 — INTERMEDIATE WINS

Each of these needs 1–5 days of config work, usually with an admin. Done in the first 90 days post-upgrade.

---

## 9. Maximo Mobile Inventory

### What it is
**Maximo Mobile Inventory** is the native iOS/Android app that replaces the old **Inventory Work Center**. Work Centers were deprecated starting MAS 8.9; in MAS 9 they are fully removed. Mobile Inventory is the sanctioned successor.

### Why storekeepers care
- Issue, receive, count, and transfer from the phone, in-bin, without walking to a PC.
- Works offline — scan and stage in a low-signal warehouse, sync when back in coverage.
- Same underlying INVUSAGE, PHYSCOUNT, MATRECTRANS tables — no parallel data model.
- Role-based home screen surfaces only the tiles the storekeeper needs.

### How to do it (admin, then storekeeper)
**Admin (once):**
1. Install **Maximo Mobile** bundle from the MAS Application Catalog.
2. Assign **Inventory** app to the storekeeper security group.
3. Publish. Storekeepers receive app download link (or push from MDM).
4. Set offline data scope (which storerooms sync to the phone).

**Storekeeper:**
1. Install Maximo Mobile from App Store / Play Store / MDM.
2. Sign in with MAS credentials. Select Inventory tile.
3. Offline data auto-downloads (item master, bins, open reservations for your storerooms).
4. Work normally. Sync is automatic; manual sync is a pull-to-refresh.

### Tiles in Mobile Inventory
- **Issue Items** — INVUSAGE issue workflow, barcode-first
- **Receive Shipments** — INVUSAGE receive / transfer-in
- **Adjust Inventory** — physical count + adjustments
- **Check Balance** — lookup, see current/reserved/available
- **Transfer** — storeroom-to-storeroom

### Gotchas
- **Work Center customizations do NOT migrate.** If your 7.6 team built Script-based Work Center tweaks, those are gone. Evaluate whether the stock Mobile Inventory covers the use case; if not, use **Maximo Application Framework (MAF) / Graphite** to extend the mobile app — that is the supported path.
- **Offline conflicts** — two storekeepers can scan the same bin offline. Last sync wins. Configure conflict notifications to the supervisor's inbox, or restrict offline scope by storeroom/bin.
- **Camera/Barcode permissions** must be granted on the device; MDM should push this automatically.
- **Licensing** — Mobile Inventory is included with Manage AppPoints under most MAS entitlements, but verify with your IBM account team. Don't assume.

### Done when
- Every storeroom has at least 2 tablet or phone devices on Mobile Inventory.
- Storekeepers run a cycle count entirely from the phone, no paper.
- Issue transactions split 70/30 mobile/desktop within 90 days.

---

## 10. Cycle Counting with ABC Classification

### What it is
Instead of a once-a-year full wall-to-wall count (which shuts down the storeroom for days), cycle counting counts **A-class items monthly, B-class quarterly, C-class annually**. MAS 9 automates the scheduling.

### Why storekeepers care
- Count variance gets found in weeks, not a year.
- No storeroom shutdowns.
- Audit-ready inventory accuracy KPIs month over month.

### How to do it
1. **Classify items** — Inventory app → each item → **ABC Type** field (A, B, or C). Criterion is usually annual issue value:
   - A = top 80% of issue value (usually 10–20% of items)
   - B = next 15% (30% of items)
   - C = bottom 5% (50–60% of items)
2. **Set count frequency** per class on **Organizations → Inventory Options → ABC Type** section:
   - A = every 30 days
   - B = every 90 days
   - C = every 365 days
3. **Generate count lists** — Physical Count app → action **Generate Count Lists** based on `physcntdate <= SYSDATE`.
4. **Assign** count lists to storekeepers.
5. Storekeepers execute counts on Mobile Inventory or desktop.
6. **Reconcile variances** — variances above tolerance go to supervisor; below, auto-adjust.
7. Report: Inventory Accuracy % = (lines counted correctly / total lines counted).

### Variance tolerance
Set on Organizations → Inventory Options:
- **Count Variance %** — e.g., 2% for A items, 5% for B, 10% for C.
- **Count Variance $** — e.g., $100 absolute threshold.
Anything inside tolerance auto-adjusts on reconciliation. Anything outside routes to approval.

### Gotchas
- **Don't use one ABC classification for the whole company.** Different storerooms have different A-items. Classify per site or per storeroom.
- **ABC auto-recalculation** — MAS 9 can recompute ABC every quarter from issue history. Turn this on; otherwise classifications go stale in 2 years and your C-class list balloons.
- **Count date is per storeroom**, not per item master. If the same item is in 3 storerooms, each has its own count date.
- Cycle count tasks created offline on Mobile need a sync before reconciliation; warn storekeepers.

### Done when
- Every stocked item has an ABC Type.
- Count date auto-advances after each reconciliation.
- Monthly KPI dashboard shows inventory accuracy by class.

---

## 11. Bin and Lot Control

### What it is
**Bins** divide a storeroom into physical sub-locations (Aisle-Row-Shelf). **Lot control** tracks lot numbers for lot-sensitive items (expiry, serial batches, traceability).

### Why storekeepers care
- "Where is it?" answered in 5 seconds instead of 5 minutes.
- FIFO / FEFO (first expiry first out) for lot-controlled items prevents issuing expired stock.
- Bin-level cycle counts (count one aisle at a time) are dramatically faster.

### How to do it — Bins
1. **Inventory → Item in Storeroom → Bins tab** → add bin records (primary + alternate).
2. Set **Primary Bin** — default for new receipts.
3. At receipt or transfer, set target bin; at issue, system suggests primary bin, but storekeeper can override (for multi-bin picking).
4. Label every physical shelf slot with the bin code **as a barcode**.

### How to do it — Lot Control
1. Item Master → **Lot Type** = LOT (lot required) or NOLOT.
2. At receipt, storekeeper enters lot number + optional expiration date.
3. At issue, select which lot — system shows available lots sorted FEFO.
4. Lot balance goes to zero when lot is fully issued; lot record remains for traceability.

### Multi-bin picking on INVUSAGE
- On an issue line, after entering item + qty, click **Select Bins** → pick bins + partial qty from each.
- System creates one MATUSETRANS per bin split, behind the scenes.

### Gotchas
- **Lot + rotating + condition-enabled** on the same item is legal but creates a combinatorial explosion of stock lines. Test carefully.
- **Expiration tracking** requires the `expiration date required` flag on the item master; otherwise the lot record has no date.
- When an item is lot-controlled in one storeroom and not in another, the item master setting drives both. Standardize at item master level.

### Done when
- All high-value items have primary bin + alternate bins defined and barcoded.
- Lot-controlled items refuse receipts without lot numbers.
- FEFO is enforced at issue.

---

## 12. Reorder Points, Safety Stock, EOQ

### What it is
The three levers that drive the **Reorder** application.
- **Minimum Level (Reorder Point)** = when we reorder
- **Maximum Level** = how much we carry
- **EOQ (Economic Order Quantity)** = how much we order per PR

### Why storekeepers care
- Stockouts cost maintenance hours (and asset downtime).
- Over-ordering ties up cash and bin space.
- Right-sized levels reduce PR-to-PO churn.

### How to do it
1. **Inventory → Reorder Details tab** (per storeroom) — set Min, Max, EOQ for each stocked item.
2. Pull 12 months of issue history from the item's Issue History tab (or a BIRT/Cognos report).
3. Compute:
   - **Lead Time Demand** = avg daily issue × supplier lead time days
   - **Safety Stock** = lead time demand × 0.5 (or more for critical)
   - **Min = Lead Time Demand + Safety Stock**
   - **Max = Min + EOQ**
   - **EOQ = SQRT(2 × annual demand × order cost / holding cost)** — classic Wilson formula; use a spreadsheet.
4. **Run Reorder** — **Reorder application** → pick storeroom → generates PR lines for items below min.
5. Review before releasing; adjust manually for seasonality.

### Critical vs Commodity treatment
- Critical spares (downtime > $10K/hour) — higher safety stock, maybe min = 2× lead time demand.
- Commodity consumables (oil, rags) — JIT-ish, low safety stock.

### MAS 9 upgrade notes
- In 7.6, reorder logic lived in `INVENTORY.MINLEVEL`/`MAXLEVEL`. In MAS 9 the fields are unchanged but the **Reorder** application is now a role-based UI; storekeepers can run it without opening the Inventory record.
- MAS 9.1 adds **AI-assisted demand forecasting** (see Tier 3) that suggests Min/Max from historical patterns + seasonality. Use it as a starting point, not gospel.

### Gotchas
- **Reorder does not order.** It creates PR lines. Procurement still needs to convert to POs.
- **Direct-issue items** (non-stocked) are not in Reorder — those go via PR from work orders directly.
- **Reservations count against current balance** — an item with balance 10 and reservations 8 triggers reorder even though "it's on the shelf." That is correct behavior; don't disable it.
- **Seasonal items** will show false stockouts if you use a flat annual demand. Use monthly buckets.

### Done when
- All A-class and B-class items have Min/Max/EOQ set.
- Stockout count drops 50%+ in 90 days.
- PR creation is dominated by the Reorder app, not by planners typing part numbers by hand.

---

## 13. Kitting

### What it is
A **Kit** is a single item number that represents a bundle of child items. Issuing the kit issues all children in one go.

### Why storekeepers care
- A PM kit for a pump (gasket + bearing + o-ring + grease + nut + bolt) is one scan at issue, not six.
- Kits are exploded at issue, so balances roll down on every child part — the accounting is correct.
- Rebuilds inventory from returns by re-assembling kits.

### How to do it
1. **Item Master → create kit item** — mark **Kit = YES**.
2. Add **Kit Components** — each with quantity.
3. Stock kits in the storeroom via **Assemble Kits** action (consumes children, creates kit balance).
4. At issue, pick the kit item — system **disassembles** automatically (child balances decrement, kit balance decrements).
5. At return, pick kit item — system reassembles back to children (if parts are returnable) or writes off.

### Gotchas
- **A kit cannot be rotating.** MAS enforces this.
- **Kit balance** is physical — you must **Assemble** to create it, and it sits on the shelf as a pre-built kit in a bin.
- **Disassembly at issue** happens regardless of whether the kit is pre-assembled; the engine can disassemble on demand if children are in stock.
- Kits are great for PM kits, not for generic "group of parts" where composition varies. Don't over-use.

### Done when
- Top 5 PM types have kits defined.
- PM work orders automatically reserve kits, not individual children.
- Issue transactions per PM drop dramatically.

---

## 14. Hard vs Soft Reservations

### What it is
- **Hard reservation** = committed to a specific work order; counts against Available balance.
- **Soft reservation** = planned but not yet committed; visible, not binding.

Storekeepers often inherit a swamp of hard reservations that should be soft (or gone), which distorts Available balance and triggers false reorders.

### Why storekeepers care
- Clean reservation hygiene = accurate Available balance = correct reorder decisions = no ghost stockouts.
- Takes 30 minutes a week once set up.

### How to do it
1. **Identify reservation type** — Inventory Usage list, filter by reservation type.
2. **Policy** — discuss with planning:
   - Work orders in WAPPR (waiting approval) → soft reservations.
   - Work orders in APPR, SCHED → hard reservations.
   - Work orders in CLOSED, CANCELED → reservations must be deleted.
3. **Automation** — admin configures a workflow or escalation:
   - When WO status → APPR, upgrade soft → hard.
   - When WO status → CLOSED/CANCELED, delete reservations.
   - Notify storeroom supervisor on exceptions.

### Gotchas
- MAS 9 has **reservation direction type** (INTERNAL, AUTOMATIC, MANUAL). In 7.6 the options were fewer. Check how your reservations are being created post-upgrade; default behavior may differ.
- **Do not delete hard reservations manually in bulk** without notifying planning. They may be pointing at in-flight work.

### Done when
- Reservation aging dashboard shows zero reservations older than the longest planned WO lead time (typically 60–90 days).
- Available balance = Current balance − active hard reservations, consistently.

---

## 15. Stocked Tools and Tool Returns

### What it is
Tools that live in the storeroom and get checked out/returned, not consumed.

### Why storekeepers care
- Lost / unreturned tools are an unbudgeted expense.
- A structured issue-and-return flow prevents shrinkage.

### How to do it
1. **Item Master → mark as Tool**. Set **Tool = YES**, **Issue Unit = EACH**.
2. At issue via INVUSAGE: **Issued To Person** is **mandatory**.
3. Set up a **Tool Return** saved query (Inventory Usage with usage type = RETURN, or a scheduled tool audit report).
4. Rotate-enabled tools (specific serial numbers) should be **rotating items** so each one is tracked individually; see win #17.

### Gotchas
- Tools in MAS 9 still use the same INVUSAGE flow — no separate Tool Issue app. In 7.6, some organizations built custom Tool Checkout Work Centers; those are gone. Re-implement on Mobile Inventory using the standard issue flow plus a tool-specific saved query.
- **Tool issue to person is free-text unless you require PERSONID lookup** — turn on the lookup, otherwise storekeepers type "Joe" and you lose traceability.

### Done when
- Every tool has a PERSONID on issue.
- Overdue tool report runs weekly.
- Tool return rate > 95%.

---

## 16. Condition-Enabled Items

### What it is
An item can be stocked in multiple **conditions** — NEW, REFURB, SERVICEABLE, SCRAP. Each condition is a separate stock line with its own balance and value.

### Why storekeepers care
- Refurbished parts are reusable. Tracking them as REFURB keeps them on the shelf at a lower book value rather than scrapping.
- MRO shops with rebuild programs can show real savings.

### How to do it
1. **Item Master** → **Condition Enabled = YES**, define condition codes and their **% of new cost** (e.g., REFURB = 60% of NEW).
2. At receipt or return, storekeeper picks the condition code.
3. Inventory shows balance per condition.
4. At issue, storekeeper picks which condition to consume (policy: REFURB first if technical equivalent).

### Gotchas
- **All condition balances roll up for reorder** — min/max apply to total balance. That is usually what you want.
- **Cannot toggle condition-enabled on/off mid-life** without messy data migration. Decide at item creation.
- **Rotating + condition-enabled** works but increases transaction complexity — test on a pilot item.

### Done when
Refurbished parts from your rebuild shop are reissued against work orders, with the correct discounted cost reflected in WO actuals.

---

## 17. Rotating Items and Serialized Assets

### What it is
A **rotating item** in Maximo is an item that also exists as one or more specific **assets** with unique asset numbers — think motors, pumps, gearboxes. Each physical unit is tracked individually through its life: install → use → remove → repair → stock → reinstall.

### Why storekeepers care
- Keep a serialized repair history per physical unit.
- Issue the *specific* refurbished pump, not just "a pump."
- Return a failed unit to stock and track it through the repair shop, not write it off.

### How to do it
1. **Item Master → Rotating = YES**.
2. When receiving, enter each unit's **asset number** (or auto-generate from autonumber).
3. Each unit creates an ASSET record tied to the item.
4. At issue via INVUSAGE, pick the specific asset number. System installs that asset at the WO's location.
5. At remove/return, the asset comes back to the storeroom as an available rotating asset.
6. Repair history flows through the asset's work order history.

### Gotchas
- **MATRECTRANS + ASSET creation** must both succeed at receipt — if autonumber fails, receipt blocks. Have the admin pre-create the autonumber sequence.
- **Rotating + lot-controlled** is illegal. Pick one model per item.
- **Asset inheritance** — a rotating asset installed at a parent location inherits GL from the parent. Cost assignment can be surprising; test it.
- **Return from WO** — the asset status flips from OPERATING to INSTORES; check no one relies on OPERATING for asset reports.

### Done when
Every critical rotating spare has a unique asset number, repair history, and comes back to the same asset number after refurbishment.

---

# TIER 3 — ADVANCED WINS

These are sprints, not days. Cross-functional, touch procurement and finance, often need integration work.

---

## 18. Consignment Inventory

### What it is
Inventory that sits on your shelves but is still **owned by the supplier** until you issue it. Your books only take the cost at the moment of issue.

### Why storekeepers care
- Zero carrying cost for high-value, slow-turning critical spares.
- Stockroom looks full but cash doesn't tie up.

### How to do it
1. Supplier agrees to consignment; terms captured in a **Consignment Agreement** (contract).
2. **Inventory → Item in Storeroom → Vendor tab** — mark vendor as consignment.
3. Receive items — balance goes up but financial value is zero on your books.
4. On issue, the system creates a **consignment usage** record; triggers an auto-PO to pay the supplier for the consumed quantity.
5. Monthly reconciliation: storekeeper + supplier rep walk the shelves and verify.

### Gotchas
- **GL integration is the hard part.** Talk to finance early. The expense hits on issue, not receipt.
- **Physical count variance on consignment is financially asymmetric** — you owe the supplier for missing units unless you find them.
- **Mixing consignment and owned on the same item number** in the same storeroom is possible but messy. Prefer separate bins or separate item-storeroom records.

### Done when
At least one major supplier has a live consignment program; monthly consumption auto-invoicing is flowing.

---

## 19. Vendor Managed Inventory

### What it is
The supplier is responsible for replenishing your storeroom. You share consumption; they restock on their schedule. Often paired with consignment.

### Why storekeepers care
- Storekeepers stop chasing reorders for VMI items.
- Supplier is contractually on the hook for availability.

### How to do it
1. Contract defines the VMI terms (service level, visibility, ordering rules).
2. Share consumption via integration: supplier gets a feed of INVISSUE/INVADJUSTMENT from your storeroom (flat file, EDI, or MAS IoT integration).
3. Supplier generates replenishment POs and ships.
4. Your storekeeper receives against auto-created POs (or blanket PO releases).
5. Dashboard shows VMI service level: fill rate, stockouts, visits per month.

### Gotchas
- **Data sharing agreements** — legal and security review first.
- **Cross-site VMI** needs per-site item-storeroom records and separate feeds per site.
- **MAS 9.1 integration layer** (MAS Flow / IBM App Connect) is the supported modern path; 7.6 MIF interfaces still work for EDI but are legacy.

### Done when
VMI items never appear on the Reorder list for your storekeepers; fill rate > 98%.

---

## 20. Auto-Reorder Pipeline (Min/Max → PR → PO)

### What it is
Convert the manual Reorder cycle into a scheduled, mostly-hands-off pipeline.

### Why storekeepers care
- Reorder runs weekly at 2 AM instead of Monday-morning manual clicks.
- PRs route to procurement automatically; approved POs flow to suppliers.
- Storekeeper's job shifts from "did I order that?" to "exception handling only."

### How to do it
1. **Cron Task: PLUSPINVREORDER** (Maximo standard) — configure to run per storeroom on a schedule (weekly is typical).
2. Output: PR lines for items below Min.
3. **Workflow on PR** — auto-approve below dollar threshold; route above.
4. **Auto-convert PR → PO** for pre-approved vendors / contract lines.
5. **Supplier integration** — send POs via EDI (850) or MAS Supplier Portal if available.
6. Storekeeper's dashboard shows: cron last run time, PRs generated, exceptions.

### Gotchas
- **Auto-approve thresholds** are a finance discussion, not a tech one.
- **Cron task failures** — set up failure alerts. A silent cron that didn't run for 2 weeks is how stockouts happen.
- **Over-ordering risk** — if Min/Max are wrong, the cron will faithfully over-order. Tier 2 win #12 (right-sizing Min/Max) is a prerequisite. Do not skip.

### Done when
90% of routine reorders happen without a human touching a PR.

---

## 21. Storeroom-to-Storeroom Transfer with Staging Workflow

### What it is
The full transfer workflow — **ENTERED → STAGED → SHIPPED → COMPLETE** — with pick lists, staging bins, shipment records, and destination-side receiving. Use this for inter-site transfers or any transfer that needs an audit trail.

### Why storekeepers care
- Material in transit is visible as a real quantity — no more "it's somewhere between A and B."
- Pick tickets drive physical activity without verbal handoffs.
- Destination can plan around expected receipts.

### How to do it
1. **Source storekeeper** — create INVUSAGE, usage type = TRANSFER, set To Storeroom.
2. Save in status **ENTERED**.
3. Pick → **Stage Issues** — generates a pick list; quantities move from stock bin to **staging bin**.
4. When physically pulled and ready to ship → status **STAGED**.
5. Create **Shipment** record, attach INVUSELINE lines, record carrier + tracking.
6. Status **SHIPPED** — balance leaves source storeroom, appears as "In Transit" in destination.
7. **Destination storekeeper** — opens **Shipment Receiving**, receives against the shipment. Any differences flag as exceptions.
8. Status **COMPLETE** — balance posts in destination storeroom.

### Gotchas
- **Staging bins** need to be set up per storeroom; usually named STAGE or STAGING.
- **Intercompany transfers** (across organizations) involve GL + revenue recognition; loop in finance.
- **In-transit balance** shows on reports as a distinct status — train planners not to reserve against it.

### Done when
Every cross-site transfer has a shipment record with a tracking number and a destination receipt.

---

## 22. AI Assistant and Smart Search (MAS 9.1)

### What it is
MAS 9.1 introduced an **AI Assistant** embedded in Manage and Mobile. Storekeepers can ask natural-language questions ("where is bearing 6205 stocked?", "what's below reorder in Central?") and the assistant answers from live data.

### Why storekeepers care
- Non-expert storekeepers get answers without knowing which app to open.
- Cross-app lookups in one question.
- Reduces supervisor interruptions.

### How to do it
1. **Admin** — enable the MAS AI Assistant entitlement (check your MAS license).
2. Train it on your storeroom vocabulary (item aliases, bin naming, site codes) if your IBM entitlement supports custom fine-tuning.
3. Storekeepers access via Manage header or Mobile home screen → "Ask".

### Examples
- "Issue 2 of item 1234 to work order WO5678 from central storeroom" — builds an INVUSAGE draft for confirmation.
- "Show me slow movers worth more than $1000" — returns a filtered list.
- "Where is asset PUMP-042 right now?" — shows current location and history.

### Gotchas
- **AI is assistive, not authoritative.** All actions still post through the normal transaction engine; the storekeeper confirms before commit.
- **Data freshness** — confirm that the assistant reads live data, not a cached warehouse, for balance-sensitive questions.
- **Licensing** — AI Assistant usage may be metered separately. Verify your AppPoint entitlement with IBM.

### Done when
Storekeepers get meaningful answers on the phone without opening an app, at least for lookups.

---

## 23. Demand Signals from Health, Predict, Monitor

### What it is
MAS Suite components that feed forward-looking part demand into inventory planning.
- **Maximo Health** — asset condition scores; declining health → upcoming repair → upcoming part demand.
- **Maximo Predict** — predictive models for asset failure; demand forecast per failure mode.
- **Maximo Monitor** — IoT telemetry; real-time anomaly flags.

### Why storekeepers care
- Instead of reacting to a failure stockout, storekeepers pre-position spares for predicted failures.
- Reorder decisions informed by a forward view, not just historical consumption.

### How to do it
1. Health / Predict / Monitor surface **recommended work orders** or **failure forecasts**.
2. These feed into **Maximo Manage** as Service Requests or draft WOs.
3. Draft WOs carry job plan → job plan materials → reservations.
4. Reservations push demand into the Reorder pipeline pre-emptively.
5. Storekeeper sees forecast demand on a Start Center portlet.

### Gotchas
- **This is a cross-product integration.** You need entitlements for Health and/or Predict, plus the integration configured. Don't assume it is on out of the box.
- **Forecast confidence matters.** Don't order based on a 30% confidence prediction. Set thresholds.
- **Data quality is the bottleneck** — predictive models are useless without clean asset, failure, and WO history.

### Done when
At least one critical asset class has predictive spare positioning, and you can demonstrate prevented stockouts from the forecast.

---

## 24. IoT-Based Replenishment (Weight Bins, RFID)

### What it is
Physical sensors track actual bin contents in real time.
- **Weight bins** — bin weight drops below threshold → triggers replenishment.
- **RFID gates** — items tagged with RFID; picking from a bin without a transaction triggers an alert.

### Why storekeepers care
- Commodity consumables (gloves, rags, fasteners) replenish themselves.
- Shrinkage and unrecorded picks become visible.

### How to do it (high level)
1. Pilot on high-volume commodity items.
2. Sensors connect to **Maximo Monitor** (or supplier-branded equivalent).
3. Monitor surfaces anomalies as work requests or inventory adjustments.
4. Flow replenishment triggers into MAS Manage via integration.

### Gotchas
- **ROI is real for high-turn, low-value commodities**; marginal for mid-turn parts. Pilot first.
- **Sensor maintenance** becomes your problem; add to PM schedule.
- **Data volume** — IoT generates a lot of data. Monitor is sized for this; Manage isn't. Keep heavy telemetry in Monitor.

### Done when
At least one consumable category is auto-replenished with zero storekeeper touch for the reorder step.

---

## 25. ERP Integration (SAP, Oracle, Workday)

### What it is
Two-way data flow between MAS Manage and your enterprise ERP for master data, POs, GL, and invoicing.

### Why storekeepers care
- No duplicate item master entry across systems.
- POs issued in MAS appear in ERP for finance.
- Receipts post GL in ERP automatically.

### How to do it (high level)
1. **Define system of record** per entity — ERP is usually master for item number, vendor, GL; MAS is master for storeroom balance, reservations, issue transactions.
2. Use **MAS Integration Framework** (MIF) and/or **MAS Flow / App Connect** for modern integration.
3. Implement per entity: item master, vendor, PO, receipt, issue, adjustment, transfer.
4. Storekeeper sees the integration as invisible — fields auto-populate from ERP master data.

### Gotchas
- **Biggest upgrade risk for existing 7.6 integrations.** Your old MIF interfaces may need XSD + endpoint updates for MAS 9. Test every interface during UAT.
- **Data ownership** arguments will eat your project timeline — settle master/slave decisions early.
- **GL posting frequency** — nightly batch vs real-time — has storekeeper-visible consequences (wait times, reversal flows). Pick consciously.

### Done when
Storekeepers never re-enter data that already exists in ERP.

---

# REFERENCE

---

## 26. Daily / Weekly / Monthly Rhythm

### Daily (15 min)
- Check Start Center: open issues, below-reorder, pending receipts, cycle counts due.
- Clear Inbox: approvals, cycle count variances, stale reservation alerts.
- Process incoming receipts.
- Process outgoing issues.

### Weekly (1–2 hr)
- Review stale reservations (win #8 + #14). Close or cancel as needed.
- Review below-reorder list; escalate exceptions to procurement.
- Verify cycle count completion for the week.
- Quick walk of the storeroom — bin accuracy spot check.

### Monthly (half day)
- ABC reclassification review (auto-run + manual spot check).
- Slow-mover review (>180 days no issue) — discuss write-down / move / disposal.
- Stockout log review — tune Min/Max for offenders.
- Inventory value reconciliation with finance.

### Quarterly (1 day)
- ABC regeneration across all items.
- Vendor performance review for consignment / VMI partners.
- Storeroom KPI dashboard review with supervisor: accuracy, turns, stockout rate, fill rate, carrying cost.

### Annually
- Physical wall-to-wall audit (if required by finance/regulation).
- Review and revise all tolerance and threshold settings.
- Review and reclassify critical-spare designations with reliability team.

---

## 27. 7.6 → MAS 9 Storekeeper Mapping

| I used to... (7.6) | Now I... (MAS 9) |
|---|---|
| Issue Current Item (right-click on Inventory) | Open **Inventory Usage**, new record, usage type = ISSUE |
| Transfer Out (right-click on Inventory) | Open **Inventory Usage**, usage type = TRANSFER |
| Return (right-click on Inventory) | Open **Inventory Usage**, usage type = RETURN |
| Use the **Inventory Work Center** (web) | Use **Maximo Mobile Inventory** (phone/tablet) |
| Receive a PO in **Receiving** | Same application — Receiving — now Carbon UI |
| Run cycle count from paper | Run cycle count from Mobile Inventory |
| Adjust inventory from Inventory app | Same — **Physical Count / Adjust Balances** action |
| View stale reservations via SQL | Saved query in Inventory Usage |
| Generate reorder PRs from Inventory | **Reorder** role-based app — streamlined UI |
| Customize Start Center with portlets | Same concept — but custom portlet code often needs rebuild; prefer Result Set + KPI |
| Ask IT to run a report | Use saved queries, role-based app dashboards, AI Assistant |

---

## 28. Common Gotchas Post-Upgrade

| # | Gotcha | What to do |
|---|---|---|
| 1 | **Work Center customizations gone.** Work Centers were removed in MAS 8.9+. If your 7.6 team invested in custom Inventory/Receiving Work Centers, they did not migrate. | Re-assess the need. Usually stock Mobile Inventory covers it. For gaps, extend via MAF / Graphite, not by trying to resurrect Work Centers. |
| 2 | **Script-based portlets on Start Center broken.** | Rebuild as Result Sets + KPIs. It is usually cleaner anyway. |
| 3 | **MIF integration endpoints drift.** Some 7.6 MIF XSDs changed schema in MAS 9. | Rerun integration UAT for every inbound/outbound. Don't trust silent pass. |
| 4 | **Reservation behavior differs post-upgrade.** Default reservation direction may have changed; Available balance calculation can surprise. | Audit a week of reservations post-upgrade against a 7.6 baseline. |
| 5 | **GL posting timing.** Some GL postings that were real-time in 7.6 may be queued in MAS 9. | Check with finance; align posting frequency with their close process. |
| 6 | **Barcode scanner Enter/Tab behavior.** Carbon UI is stricter about commit events than classic UI. | Reconfigure scanners with explicit suffix. |
| 7 | **Mobile offline data scope too wide.** Default sync pulls everything; on a big item master it is slow. | Scope offline sync per storeroom and per user role. |
| 8 | **AppPoints licensing surprises.** Mobile Inventory, AI Assistant, and some integrations consume AppPoints differently than 7.6 authorized-user licenses. | Verify entitlement before rollout. Don't assume. |
| 9 | **Rotating item autonumber missing.** Receiving rotating items fails silently. | Pre-create autonumber sequence per rotating item class. |
| 10 | **Cycle count date not per storeroom.** People assume it's per item. | Train on the distinction; set counts per item-storeroom record. |
| 11 | **Condition-enabled toggle is permanent.** Flipping it on mid-life needs data migration. | Decide at item creation; plan migration carefully if you must switch. |
| 12 | **Old custom reports reading MATUSETRANS miss open issues.** In MAS 9, open issues live in INVUSELINE until complete. | Update reports to read both, or filter to COMPLETE INVUSAGE only. |

---

## 29. Role-Based Learning Path

### Storekeeper / Storeroom Clerk (frontline)
**Week 1:** Tier 1 wins 1–8. Daily rhythm. Barcode scanning. INVUSAGE fluency.
**Week 2–4:** Tier 2 wins 9–11. Mobile Inventory. Cycle counting. Bins.
**Month 2–3:** Tier 2 wins 12–17. Reorder. Kitting. Reservation hygiene. Tools. Condition. Rotating.

### Storeroom Supervisor
Everything above, plus:
**Month 2:** Ownership of ABC classification, reorder policy, cycle count variance review, reservation escalations.
**Month 3+:** Tier 3 wins 18–21. Consignment, VMI, auto-reorder, staged transfers.

### Storeroom Lead / Inventory Manager
Everything above, plus:
**Quarter 2:** Tier 3 wins 22–25. AI, predictive demand, IoT, ERP integration. Cross-functional sprints with procurement, finance, IT.

### Maximo Admin Supporting Storerooms
- Start Center templates (win #1) — deploy per role.
- Saved queries (win #3) — make public for groups.
- Cron tasks (PLUSPINVREORDER, stale reservation alert) — schedule + monitor.
- Workflow routing (approvals, adjustments over threshold, cycle count variance).
- Mobile app publication and offline scoping.
- Integration monitoring.

---

## Closing — The Quick Wins Philosophy

A great storeroom in MAS 9 looks like this:

- **Day 1** every storekeeper's Start Center shows them their work without clicking.
- **Day 1** INVUSAGE is the one app they live in for issues, returns, transfers.
- **Day 7** they are scanning, not typing.
- **Day 30** they work as much from the phone as the PC.
- **Day 60** cycle counts are running on a schedule and variance is tracked.
- **Day 90** reorder is 90% automatic; storekeepers handle exceptions, not routine orders.
- **Year 1** the storeroom runs on forward-looking signals (predicted demand), not just historical consumption.

Every tier above compounds. Tier 3 magic (AI, IoT, predictive) only works if Tier 2 fundamentals (ABC, Min/Max, bins, reservation hygiene) are right, which only works if Tier 1 habits (INVUSAGE, Start Center, saved queries) are ingrained.

Fix the fundamentals first. Then scale.

---

**End of DOC8 — MAS 9 Storekeeper Quick Wins**
