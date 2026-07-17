# Maximo for Nuclear Power (MAS 9.2 Nuclear Add-Ons) + Maximo 7.6 vs MAS Suite
## Deep Research Brief — McKinsey Challenge Package

**Prepared for:** TheMaximoGuys (TMG) — 2026-04-21
**Purpose:** Ammunition to challenge an analyst research project on Maximo / MAS scope, architecture, and nuclear applicability.
**Research model:** Parallel multi-source (IBM Docs, IBM Support, IBM Announcement Letters, Maximo Secrets, Interloc, Banetti, Naviam, Pragma Edge, TRM, NRC.gov, INPO / IAEA). Perplexity MCP was quota-locked at execution time (HTTP 401 `insufficient_quota`); fallback was live WebSearch + WebFetch across Gemini and Claude researchers. All claims below are cited; gaps are explicitly flagged, not invented.
**Follow-up validation pass:** 2026-04-21 live checks against IBM Docs / IBM Support found three material refinements: (1) MAS 9.2 Feature Channel readmes state the channel is for **non-production evaluation**, (2) MAS 9.1 AppPoint ratios differ for Authorized vs Concurrent users, and (3) IBM now documents **Maximo Renewables** as a named APM solution for wind/solar/BESS. Those corrections are incorporated below.

---

## How to Use This Document

1. **Part A — Nuclear Add-On Features** — *what exactly comes in the box when you turn on the Nuclear industry solution?* Every nuclear application is listed with purpose and regulatory driver.
2. **Part A-GEN — Generation Scope (Utilities + Renewables)** — what Maximo Utilities actually ships, how conventional generation differs from Maximo Renewables, and what is commonly misattributed.
3. **Part B — 7 vs MAS Delta** — architectural, licensing, UI, AI, and lifecycle deltas.
4. **Part C — Counter-Arguments by Theme** — fact-based rebuttals to common analyst/consulting positions on Maximo/MAS. See the disclaimer at the top of Part C.
5. **Sources** at the end for fact-checking.

## Important disclaimer about Part C

**This author has not seen the McKinsey report.** Part C's counter-arguments were NOT written against specific McKinsey assertions — they were written against **common analyst/big-consulting positions** typically seen in EAM platform reviews (e.g., "cloud-native preferable," "AppPoints will be cheaper," "just a UI refresh," "Maximo doesn't cover nuclear compliance"). Treat Part C as a **thematic stress-test toolkit**, not as a point-by-point rebuttal of a specific McKinsey document.

**To convert Part C into an actual rebuttal:** share McKinsey's deck / memo / claim list, and each counter-argument can be re-tagged to the specific slide, page, or assertion it refutes.

---

# PART A — IBM Nuclear Add-Ons: Complete Feature Inventory (MAS 9.x / Maximo Nuclear)

## A.1 Product lineage — the single most important clarification

There are **two generations** of the product line. Conflating them is where most analysts go wrong.

| Generation | Product name (as IBM titles it) | Platform | Current status |
|---|---|---|---|
| Legacy (7.x) | **IBM Maximo for Nuclear Power (MNP)** 7.6.0 → 7.6.1 → 7.6.2 | Maximo Asset Management 7.6 on WebSphere ND | 7.6.0 withdrawn; 7.6.1 formal EOS **Sept 30, 2025**; 7.6.2 final numbered release |
| Current (MAS) | **IBM Maximo Nuclear** (also referred to as "**Nuclear Industry Solution**" / "**Maximo for Nuclear Power**" in docs, product code `mfnp`) — delivered as an industry solution inside **MAS Manage** | WebSphere Liberty on Red Hat OpenShift (Continuous Delivery) | **Active — Nuclear survived the MAS industry-solution cull** (Life Sciences did not). Current CD stream is Maximo Nuclear 8.1.x and forward, shipped alongside MAS 9.x. |

Key announcement letters (all confirmed via IBM Support lifecycle pages):
- MNP **7.6.1** GA — IBM Europe Software Announcement **ZP17-0489** (Nov 14, 2017)
- MNP **7.6.2** GA — IBM US Software Announcement **ENUS220-006**
- **Maximo 7.6.0.x End of Support** — IBM Announcement Letter **920-136** (published Sept 8, 2020; effective Sept 30, 2021)
- **Maximo 7.6.1.x End of Support** — IBM Announcement Letter **922-024** (published April 12, 2022; effective **Sept 30, 2025**). This single letter covers the base Maximo Asset Management 7.6.1.x **plus all industry solutions and add-ons** including Maximo for Nuclear Power 7.6.1 and Maximo for Utilities 7.6.1.x.
- **MAS 8.10-LTS / 8.11-LTS** GA — IBM Announcement Letters **223-043** and **223-0230** (completion of fix availability April 30, 2026; Extended Support available)
- **MAS 9.0** GA (25 June 2024) — IBM Announcement Letter **AD24-0483** (new AD-series format replacing the older NNN-NNN pattern)
- **MAS 9.1** GA (24 June 2025) — IBM Announcement Letter **AD25-1186**
- **MAS 9.2 / Feature Channel** — public IBM Support pages list 9.2.x Feature Channel builds, but the Feature Channel readmes state that the channel subscription is **for non-production evaluation** and is offered alongside maintained streams. Treat FC content as validation/planning input, not automatically production-entitled GA content.

## A.2 The honest "what's in the box" — Nuclear applications by module

IBM historically markets the Nuclear add-on as adding **31 new applications and 16 extensions** on top of core Maximo / MAS Manage, grouped into six nuclear-specific module families plus nuclear-extended versions of standard modules. This inventory is derived from IBM Docs (`ibm.com/docs/en/mfnp`) and the public Maximo Secrets six-part app-map series.

### A.2.1 Asset & Location — nuclear-extended
| App | Purpose |
|---|---|
| **Assets (Nuc)** | Nuclear-extended asset lifecycle: safety-related/augmented-quality flags, critical component flag, system/train/component hierarchy |
| **Locations (Nuc)** | Location hierarchy with nuclear flags (containment, ISFSI, RCA), dose-rate/contamination metadata |
| **Quick Assets (Nuc) / Quick Locations (Nuc)** | Streamlined create-forms for day-to-day ops |

### A.2.2 Condition Reports module — the CAP backbone (10 CFR 50 App B XVI)
| App | Purpose |
|---|---|
| **Condition Reports (Nuc)** | Facility non-conformance documentation; the Corrective Action Program (CAP) engine. Links to evaluation, significance classification, apparent/root-cause, corrective actions (tracked as follow-up WOs), and effectiveness reviews. |
| **Solutions (Nuc)** | Reusable remediation / disposition library — each solution can be reused across similar condition reports. Supports industry-wide OpEx reuse. |

### A.2.3 Configuration Change Management module (10 CFR 50.59 + App B III Design Control)
| App | Purpose |
|---|---|
| **Configuration Change Designer (Nuc)** | Identifies attributes that are under configuration control; drives revision requirements on design change |
| **Changes (Nuc)** | Work-order class for approved engineering changes (ECs) |
| **Releases (Nuc)** | Work-order class for bundling multiple approved changes into an outage release / change package |
| **Configuration Items (Nuc)** | CI register of components under configuration control, linked to design basis documents |

### A.2.4 Operational Management (Nuc) module — regulatory core (Tech Specs, Surveillance, Ops)
All 17 apps documented at IBM Docs + Maximo Secrets app map 3/6.

| App | Purpose |
|---|---|
| **Tech Specs (Nuc)** | Technical Specification register (per 10 CFR 50.36). Links to surveillance requirements and LCOs. |
| **Surveillance Requirements (Nuc)** | Tests proving regulatory compliance — the "prove the Tech Spec is being met" engine |
| **LCO Tracking (Nuc)** | Limiting Conditions for Operations tracking, including action statement timers |
| **Clearances (Nuc)** | Nuclear tagout / isolation prior to work or surveillance — richer than core Maximo Lockout/Tagout |
| **Clearances Kiosk (Nuc)** | Shop-floor kiosk for tag apply/restore |
| **Clearance Groups (Nuc)** | Shared tags across related clearances |
| **Lineup Plans (Nuc) / Lineups (Nuc) / Lineups Kiosk (Nuc)** | Approved component positioning / system lineups, used during surveillances and startup |
| **Duty Station Plans / Duty Stations (Nuc)** | Shift-based operational logs, turnovers, narrative log, readings |
| **Reading Frequencies (Nuc)** | Required frequency of operational readings (per shift, per hour, etc.) |
| **Impact Plans (Nuc)** | Operational/maintenance impact modeling for proposed work — protects operability |
| **Notifications (Nuc)** | Acknowledgement-required messages to operators / supervisors |
| **Objectives (Nuc)** | Shift objectives / briefs |
| **Events (Nuc)** | Plant event records |
| **Commitment Tracking (Nuc)** | Tracks regulatory / industry / internal commitments to completion (supports 10 CFR Part 21 and Reg commitments) |

### A.2.5 Permits (Nuc) module (safety work-controls)
| App | Purpose |
|---|---|
| **Permits (Nuc)** | Permit-to-work with Safety, Fire Hazard, Confined Space, Hot Work, Heat Stress types — linked to clearances |
| **Quick Permits (Nuc)** | Streamlined permit issuance for common work types |

### A.2.6 Planning module (nuclear-extended)
| App | Purpose |
|---|---|
| **Job Plans (Nuc)** | Nuclear job plans with task-level hold points / QC points / inspection points configured as task statuses and inspection plans |
| **Routes** | Route definitions for rounds, surveillances, line walks |
| **Asset List (Nuc)** | Curated asset lists (e.g., safety-related in-service components) |
| **Equipment Groups (Nuc)** | Grouping of equipment for system/train-based planning |
| **Data Sheet Template** | Calibration specifications (paired with M&TE and PM execution) |

### A.2.7 Preventive Maintenance (Nuc) module (EPRI PM Basis / AP-913)
| App | Purpose |
|---|---|
| **Preventive Maintenance (Nuc)** | Nuclear PM templates with frequency, condition-based triggers, EPRI PM Basis alignment |
| **Master PM** | PM-to-many generation for fleet/group PMs |
| **PM Frequencies (Nuc)** | Standardized time-based maintenance intervals |

### A.2.8 Purchasing (Nuc) module — NQA-1 procurement controls
| App | Purpose |
|---|---|
| **Purchase Requisitions (Nuc) / Purchase Orders (Nuc) / Request for Quotations (Nuc)** | Nuclear-grade procurement with augmented quality flags and dedication requirements |
| **Companies (Nuc)** | Supplier master with audit results + qualified-supplier flag (ASL — Approved Suppliers List) |
| **Terms and Conditions (Nuc)** | Nuclear procurement terms (10 CFR 21 clauses, QA requirements) |
| **Item Master (Nuc) / Inventory (Nuc)** | Safety-related / commercial-grade dedicated items; shelf-life; storage conditions |

### A.2.9 Work Orders (Nuc) module
| App | Purpose |
|---|---|
| **Work Order Tracking (Nuc)** | Main WO app with nuclear clearance, calibration result, dose tracking, safety-related flag fields |
| **Quick Work Orders (Nuc)** | Non-physical work + clearance protection requests |
| **Quick Reporting (Nuc)** | Office-based completion reporting |
| **Sign On/Off (Nuc)** | Kiosk for personnel sign-on/off into clearance areas |
| **Commitment Tracking (Nuc)** | Ensures regulatory commitments carried by a WO close out |

### A.2.10 Calibration / M&TE (10 CFR 50 App B XII)
Calibration is delivered **inside** MNP using **Data Sheet Templates** + calibration-extended **Assets/Locations** (as calibration loops) + **Tools** (as M&TE devices) + **PM-driven calibration frequency** + **WOT execution**. It is a pattern, not a single named app — important to clarify in any analyst review.

### A.2.11 Mobile — Operator Rounds
| App | Purpose |
|---|---|
| **Maximo for Nuclear Power Operator Rounds** (Android + iOS) | Time/sequence-guided field readings; operator log entry; supports Duty Station Plans |

## A.3 Feature-to-regulatory-framework map (capability → regulator, with citations)

| User-requested capability | Present in MNP? | IBM-named application | Primary regulatory driver |
|---|---|---|---|
| Condition Evaluation | **Yes** | Condition Reports (Nuc) + evaluation tabs | 10 CFR 50 App B XVI; NQA-1 |
| Action Tracking | **Yes** | Condition Reports (Nuc) follow-up WOs + Commitment Tracking (Nuc) | 10 CFR 50 App B XVI; 10 CFR Part 21 |
| Tech Spec Surveillance | **Yes** | Tech Specs (Nuc) + Surveillance Requirements (Nuc) + LCO Tracking (Nuc) | 10 CFR 50.36; NRC Reg Guide 1.33 |
| Operating Experience (OPEX) | **Partial — no named app** | Implemented via Condition Reports + Solutions library + Commitment Tracking | INPO OE program (voluntary framework) |
| Corrective Action Program (CAP) | **Yes** | Condition Reports (Nuc) is the CAP engine | 10 CFR 50 App B XVI |
| AP-913 Equipment Scoping | **Partial — no named app** | Classifications + critical-component flag + Reliability Strategies (MAS 8.11+) | INPO AP-913 Equipment Reliability Process |
| Maintenance Rule (10 CFR 50.65) | **Partial — no named app** | Assets (Nuc) performance monitoring + failure codes + Condition Monitoring + Maximo Health | 10 CFR 50.65 + NRC Reg Guide 1.160 Rev 3 |
| Work Package Management | **Yes** | WOT (Nuc) + Quick WOs (Nuc) + Quick Reporting (Nuc) + Impact Plans (Nuc) + Permits (Nuc) | 10 CFR 50 App B V (Instructions, Procedures, Drawings); NQA-1 |
| Clearance / Tagout (nuclear) | **Yes** | Clearances (Nuc), Clearances Kiosk, Clearance Groups, Sign On/Off | 10 CFR 50 App B; 10 CFR 50.65; plant procedures |
| Hold Points / QC Points / Inspection Points | **Partial — no named app** | Job Plan task statuses + Inspection plans + Receiving inspection | 10 CFR 50 App B X (Inspection); NQA-1 |
| Calibration / M&TE | **Yes (pattern)** | Data Sheet Template + PM (Nuc) + WOT (Nuc) + Tools (as M&TE) | 10 CFR 50 App B XII; ANSI/IEEE 498; DOE STD-1054 |
| Configuration Management / Design Basis | **Yes** | Configuration Change Designer, Changes, Releases, Configuration Items (all Nuc) | 10 CFR 50.59; 10 CFR 50 App B III (Design Control) |
| e-Signature / electronic records | **Partial — no nuclear-specific app** | Core Maximo **ESig / eAudit** framework applied across nuclear apps | 10 CFR 50 App B XVII (QA Records); NQA-1 Records |
| Nuclear-specific PM templates + frequency controls | **Yes** | PM (Nuc), Master PM, PM Frequencies (Nuc) | EPRI PM Basis; INPO AP-913 |
| Nuclear KPIs + reporting | **Yes (suite)** | KPI Manager, KPI Templates, KPI Viewer, Cognos Analytics, Report Administration, Report Viewer | Plant performance / INPO indicators |
| Event Reporting | **Yes** | Events (Nuc) + Notifications (Nuc) + Commitment Tracking (Nuc) + Condition Reports (Nuc) | 10 CFR 50.72 / 50.73 |

**Anti-invention discipline:** where the expected capability has no IBM-named app (OPEX, AP-913 Scoping, Maintenance Rule, Hold Points, eSig), the honest statement is that the capability is implemented **through configuration** of other apps (classifications, flags, job-plan task statuses, ESig framework) — not through an app called "Maintenance Rule." Anyone representing it otherwise is embellishing.

## A.4 What's NEW in MAS 9.x for Nuclear

### MAS 9.0 (GA 25 June 2024) — non-nuclear-specific foundations Nuclear inherits
- Carbon Design System adopted; Role-Based Applications (RBAs) begin replacing Work Centers
- CP4D 4.8; OpenShift 4.13 / 4.14; MongoDB v5 / v6; PODMAN; Data Reporting Operator replaces UDS
- Cognos 12 support; Spatial 80% desktop performance improvement
- Work Orders RBA with resource planning and **watsonx.ai problem-code suggestions**
- **Reliability Strategies** with FMEA management (relevant to AP-913 / maintenance basis)
- Emissions Management Dashboard (HSE/O&G) — inherited but non-nuclear

### MAS 9.1 (GA 24 June 2025) — the AI wave (nuclear inherits)
- **Maximo Assistant** — generative AI chat on watsonx.ai, embedded in MAS
- **Maximo AI Service** — new licensed integration component; IBM 9.1 licensing maps AI Service to content-token and install AppPoint allocation (see §A.5)
- **Maximo Asset Investment Planning (AIP)** — scenario-planning / capital planning
- **FMEA Content Builder** — AI-generated FMEA content (relevant to AP-913 basis work)
- **Similarity Tracker / Similar Work Orders** — recurrence detection
- **Java 17 fully supported** (no compatibility mode); BIRT 4.16; OpenID Connect; unified left navigation
- **Original Maximo Assist app discontinued** (remote collaboration moves to Mobile/Collaborate) — do not confuse with the new Assistant
- **TRIRIGA** (Real Estate & Facilities) added to the suite

### MAS 9.2 / Feature Channel (rolling through 2025–2026)

**Important production caveat:** IBM Support lists MAS 9.2.x Feature Channel releases, but the readmes state that this channel is supported for **non-production use only**, provides early access to new features for evaluation, and is offered alongside normal maintained streams. For nuclear change-control purposes, do **not** treat a `9.2.0-pre.stable_{id}` Feature Channel build as production-ready evidence unless IBM supplies the corresponding maintained-stream / entitlement / validation artifact.

**Feature Channel release cadence (confirmed from IBM Support readmes):**

| Release | Date | Key deltas |
|---|---|---|
| September FC | **Oct 6, 2025** | OpenShift 4.18 support; CloudPak for Data 5.1.3 |
| October FC | **Oct 30, 2025** | OpenShift 4.19 support |
| November FC | **Nov 27, 2025** | **MongoDB v8.0** support |
| December FC | **Dec 24, 2025** | CloudPak for Data 5.2.0; Manage `9.2.0-pre.stable_6856`; Optimizer `_5162`; Visual Inspection `_6198`; AI Service `_6741`; fixes include DT456426 (MAS CLI), DT422240 (MongoDB licensing), DT450848/DT458164 (app config preview) |
| **AI Service 9.2.0** | **Jan 29, 2026** | **Replaced IBM Granite 3-2-8B Instruct with OpenAI GPT-OSS-120B** for Predictive Cause-Effect Correlation (PCC), Maintenance Cause Classification (MCC), and FMEA; Granite 3-2-8B scheduled for removal Feb 2026 |
| February FC | **Feb 26, 2026** | Manage `_13730`, Optimizer `_12739`, Visual Inspection `_12598`, AI Service `_12908`; fixes DT456447 (navigator health-tile unauthorized-access anomaly) |
| March FC | **Mar 26, 2026** | `9.2.0-pre.stable_16717` baseline |

**Platform-level AI/UX items visible in 9.2-era public sources:**
- AI Service language model upgrade (Granite → GPT-OSS-120B) is the single most substantive 9.2 AI change confirmed in IBM Support; it affects PCC/MCC/FMEA — directly relevant for nuclear reliability strategies and corrective-action classification.
- Manage 9.2.x FC readmes show ongoing fixes in MAF/RBAs, Mobile, Work Order Tracking, Reports, Integration, LDAP/user sync, time-zone handling, and configuration migration.
- Visual/geospatial/mobile enhancements appear in IBM/partner 9.2-era positioning, but production scope should be validated against the maintained-stream release notes actually selected for deployment.

### Nuclear-specific MAS 9.2 content

- An IBM Support page exists titled "**IBM Maximo for Nuclear Power 9.2: released APARs and DTs**" — confirms that Nuclear **has its own 9.2 patch/APAR stream**. Specific feature content is behind IBM Support authentication; pull directly when needed.
- IBM Docs topic "Configuring Maximo Nuclear" (`ibm.com/docs/en/mfnp/continuous-delivery?topic=configuring-maximo-nuclear`) confirms predefined workflows and KPIs for standard nuclear processes continue to ship.
- **Honest scope statement:** a nuclear-exclusive 9.2 feature list is **not published in public marketing**. What IS public is that Nuclear remains an active Manage industry solution, predefined nuclear workflows/KPIs continue to ship, Nuclear has a dedicated 9.2 APAR/DT stream, and the broader MAS AI Service model transition is documented. Do not accept vendor claims of "MAS 9.2 nuclear-exclusive AI" without a citation from IBM Support or the `mfnp/continuous-delivery` docs.

## A.5 Licensing — Nuclear inside AppPoints

**Core entitlement tiers (confirmed via IBM MAS 9.1 licensing guidance):**

| Tier | Concurrent user AppPoints | Authorized user AppPoints | Scope |
|---|---:|---:|---|
| **Limited** | **5** | **2** | Limited Manage use: up to 3 modules plus defined report/status/work-order update rights; Monitor/Mobile can be included within limits |
| **Base** | **10** | **3** | Core Maximo Manage, Scheduler, Linear, Calibration, Spatial entitlement (Spatial install still required), and Health |
| **Premium** | **15** | **5** | Full suite application access including Predict, Visual Inspection user entitlement, and Manage industry solutions such as Nuclear and Utilities |

Administrative users are a separate case in IBM's table: Administrative Base is **10 AppPoints** and Administrative Premium is **15 AppPoints**, reserved continuously.

**Nuclear-specific licensing facts:**
- Nuclear industry solution users are **Premium or Limited** depending on access scope — there is **no Base tier for users who are granted access to Manage industry-solution/add-on applications.** Use the Authorized vs Concurrent ratios above when modeling.
- **Turning on the Nuclear industry solution does NOT add a new SKU or change the per-user AppPoint weight.** It is **entitled** under the existing MAS AppPoints pool (part number **5737-M66**), which covers all apps/add-ons/industry solutions/connectors (exception: Maximo IT).
- **Maximo AI Service** is measured by content-token consumption in MAS 9.1 licensing guidance: **1 billion content tokens per month = 10 AppPoints**. IBM's install table also lists **AI Service = 10 AppPoints**. Model it separately from the Manage user tier.
- **Maximo Predict requires Premium user entitlement**.
- Utilities industry solution users follow the same Premium/Limited-only pattern as Nuclear.
- Third-party analyst Origina flags a possible ~35% cost-increase risk on like-for-like migrations from 7.6 user-based licensing to AppPoints — vendor-dependent; build your own model.

**Gap that remains:** Granular per-app AppPoint weight tables (e.g., "Nuclear Tech Specs vs. Utilities CUE consumption") are **not published publicly**. IBM's public docs confirm entitlement tiers and Authorized/Concurrent ratios, but exact deployment/user-access modeling still depends on the IBM License Information document, the License Key Center file, and the client's security-group design.

---

# PART A-GEN — Maximo for Utilities / Generation Scope

## A-GEN.1 The framing analysts most commonly get wrong

There is **no separate "Maximo for Power Generation" product SKU** for conventional generation. Fossil, thermal, hydro, and similar plant-generation work is scoped through **Maximo Utilities** plus core MAS Manage/APM capabilities.

**2026 nuance:** IBM now documents **IBM Maximo Renewables** as a named Maximo APM solution/application for **wind, solar, and battery energy storage systems (BESS)**. That is not the same as a "Maximo for Power Generation" industry solution. Any generation analysis should separate:

| Segment | IBM positioning | Practical interpretation |
|---|---|---|
| Conventional generation / hydro | Maximo Utilities + Manage / Health / Monitor / Predict / HSE / Spatial / Linear | No standalone "Maximo for Power Generation" industry-solution SKU found in public IBM docs |
| Renewables: wind, solar, BESS | **Maximo Renewables** | Named APM/SaaS-oriented solution that monitors/analyzes/optimizes renewables assets and can integrate with Maximo Manage |
| Nuclear | **Maximo Nuclear / Maximo for Nuclear Power** | Separate active Manage industry solution |

- Official product name: **"IBM Maximo for Utilities"** (sometimes marketed as "Maximo for Energy and Utilities"). Delivered as an **industry solution** against MAS Manage, not a standalone product.
- Current CD stream: **Maximo for Utilities 8.1 and forward** inside MAS Manage Continuous Delivery.
- IBM explicitly scopes Utilities across "**gas and electrical transmission, distribution, power generation, water treatment, and wastewater treatment in a single platform and database**" — generation shares the Utilities application footprint (no generation-only sub-module).
- Coexistence inference: IBM Docs present Nuclear and Utilities as deployable Manage industry solutions inside the same MAS/Manage catalog model. That supports a same-platform architecture for combined operators, but the exact same-database / same-instance design should be validated against IBM deployment guidance and the client's segregation / validation requirements.

## A-GEN.2 Application / module inventory (confirmed)

| Application / Module | Purpose — generation relevance |
|---|---|
| **Compatible Unit (CU) Library & Compatible Unit Estimating (CUE)** | Standardized work packages with resource/material/time estimates — heavily used in generation construction, outage planning, and capital projects |
| **Crews / Crew Types / Crew Composition** | Resource modeling for generation maintenance crews, outage crews, construction crews |
| **Work Zones** | Geographic or system-based work containment for dispatch |
| **Meter Asset Management** | Revenue meters, smart meters, bulk meters — in generation, relevant for unit output / tie metering |
| **Maximo Spatial (ESRI ArcGIS integration)** | GIS context for generation sites, substations, plant plot plans |
| **Linear Asset Manager** | Penstocks, pipelines, conveyors, fuel-handling linears — critical for hydro, fossil, combined-cycle plants |
| **Maximo Scheduler** | Resource-leveled scheduling — outage scheduling is the generation use case |
| **Task Prerequisites** | Permits / construction aid funds / work authorization prerequisites on WOs |
| **CIM Integration (IEC 61968 part 6)** | Common Information Model integration — utility-industry standard for inter-system data exchange |
| **NERC/CIP critical asset flagging + WO regulatory linkage** | Asset criticality tagging (BES, LIBES) + WO compliance evidence |

## A-GEN.3 MAS 9.x features relevant to generation (confirmed)

| Feature | Version | Generation applicability |
|---|---|---|
| **Emissions Management Dashboard** | MAS 9.0 (HSE / O&G scope, applicable to fossil/thermal gen) | Fugitive + continuous emissions tracking; EPA/MATS reporting evidence |
| **Asset Emission Profile + recordable incident flagging** | MAS 9.1 | Ties emissions to asset records for reporting |
| **Reliability Strategies (RCM) with 58,000+ failure-mode library across 800+ asset types** | MAS 8.11 → 9.1 | Generation FMEA / AP-913-style reliability basis; platform-wide (NOT Utilities-specific) |
| **FMEA Content Builder (store custom strategies in Manage DB)** | MAS 9.1 | Generation FMEA as a repeatable artifact |
| **watsonx.ai problem-code recommendation on work orders** | MAS 9.0 (watsonx API key required) | Faster/more consistent failure coding on gen work orders |
| **Maximo AI Service (LLM integration hub)** | MAS 9.1 (10 AppPoints) | Similar-WO suggestion, failure classification |
| **Visual Inspection — fine-tuned concrete model / defect folder automation** | MAS 9.0 | Civil infra primary; applicable to cooling towers, stacks, concrete structures |
| **Drone-to-Fix solar farm inspection (IBM reference architecture on GitHub)** | 2024+ | Solar generation-specific — reference arch, not a SKU |
| **Maximo Renewables** | Public IBM Docs by 2026; Dec 2025 docs note Manage integration | Named renewables APM solution for wind/solar/BESS; monitor/analyze/optimize asset performance and integrate with Manage for asset/work management |
| **Vegetation Management (AI on satellite/LiDAR)** | MAS 9.x Utilities | Primarily T&D; applies to generation site ROW |

## A-GEN.4 Regulatory coverage — what Maximo actually does vs claims

| Framework | What Maximo actually delivers |
|---|---|
| **NERC CIP** (cybersecurity) | Asset criticality flagging + WO regulatory linkage + audit trail — it is a **system of record enabling compliance evidence**, NOT a compliance automation platform (that space belongs to AssurX, Certrec, RegScale). Do not let anyone oversell this. |
| **NERC O&P standards** | **Gap** — no IBM-documented pre-built content found. Delivered via configuration + compliance partner tooling. |
| **EPA Clean Air Act / MATS / CSAPR** | Indirect — via Emissions Management Dashboard (HSE/O&G scope) + Envizi ESG integration for CO₂/methane/NOₓ/SF₆. |
| **FERC reliability standards** | Supported through audit trails, electronic documentation, safety-protocol enforcement (partner positioning, not an IBM SKU feature). |
| **OSHA 1910 Subpart R** (Special Industries — Electric Power Generation) | **Gap** — no IBM doc found shipping Subpart R content in Utilities. HSE covers generic OSHA. Confirm scope before assuming. |
| **ISO 55000** | Yes — Maximo lifecycle model is explicitly ISO 55000-aligned. |

## A-GEN.5 What is commonly misattributed to Utilities / Generation

Use these to correct an analyst review if they surface:

- **"Health and Predict — Utilities"** — **DISCONTINUED as of MAS 8.11**. Capabilities merged into base Maximo Health / Predict; the asset-class templates were renamed "**IBM Maximo Models for Electrical Distribution**" as an accelerator. Any deck that still cites "Health and Predict — Utilities" as a current product is out of date.
- **"Emissions Management Dashboard"** — not a Utilities feature; it belongs to **HSE + Oil & Gas**. Generation customers use it, but it's not a Utilities SKU line.
- **"Reliability-centered maintenance as Utilities differentiator"** — RCM / Reliability Strategies is **platform-wide** in MAS 8.11+. Not a Utilities-only capability.
- **"Operating Plans / Energy Management as named apps"** — no IBM docs evidence in current Utilities. Likely a 7.x-era marketing phrase, retired.
- **"Fuel / emissions / consumption tracking as a Utilities module"** — not a named app. Sustainability tracking is Envizi + HSE.
- **"Maximo for Power Generation as a distinct SKU"** — **does not exist in public IBM docs.** Conventional generation is scoped inside Maximo Utilities + core MAS/APM capabilities. Do not confuse this with **Maximo Renewables**, which is now a named IBM solution for wind/solar/BESS asset performance management.

## A-GEN.6 Partner reality check for generation

| Partner | Generation positioning |
|---|---|
| **Banetti** | Turbines, generators, outage scheduling, NERC compliance, plant reliability. Customers include Southern Company, TVA, EP Energy. Services: mechanical integrity process, global data model development. |
| **Interloc Solutions** | Spatial + Linear + Scheduler + Utilities specialist. Energy customers: Calpine, CVR Energy, Sempra, Enbridge Gas, Georgia Transmission, LGE-KU. |
| **Naviam** (incl. former Projetech) | Full stack: Manage + Health + Predict + Monitor + Mobile + Spatial + Linear. Implements vegetation management, drone/satellite inspection. Example generation customer: SSE (2.5 GW+ offshore wind). |
| **Projetech (Naviam MaaS)** | Maximo-as-a-Service hosting for utilities/generation. |

**Reality:** No partner ships a separate conventional-generation module. Conventional generation differentiation is **implementation expertise** applied to the same Maximo-for-Utilities + Spatial + Linear + Health + Predict + HSE stack. For renewables, the product conversation changes because IBM now has Maximo Renewables as a named APM solution.

## A-GEN.7 Formal product identifiers (generation-relevant)

- **5724-U18** — IBM Maximo Asset Management Product Family 7.6 (legacy; covers Utilities/Nuclear/O&G industry solutions)
- **5725-W39** — IBM Maximo Asset Performance Management for Energy and Utilities On-premises 3.0 (distinct **APM-side** product, not the Manage industry solution)
- **5737-M66** — Maximo Application Suite (MAS) — the current entitlement umbrella under which Utilities and Nuclear industry solutions ship
- **ZP22-0017** — MAS as a Service announcement
- **MAS 9.0 / 9.1 announcement letters:** IBM Support lifecycle pages confirm **AD24-0483** for MAS 9.0 and **AD25-1186** for MAS 9.1.
- **Gap:** no public single MAS 9.2 GA announcement letter found in the research pass; 9.2 public artifacts are Feature Channel / component-support pages.

---

# PART B — Maximo 7.6 vs MAS Application Suite: Delta Brief

## B.1 Architecture — a platform category change, not an upgrade

| Dimension | Maximo 7.6.x | MAS 9.x |
|---|---|---|
| **Application server** | WebSphere Application Server ND 8.5.5 / 9.0.0.7 | **WebSphere Liberty** profile, containerized |
| **Orchestration** | Bare metal / VMs; optional WAS clustering | **Red Hat OpenShift Container Platform** (4.13/4.14 at 9.0; **4.19 at 9.2**) with Kubernetes operators |
| **Java runtime** | Java 8 (JDK 1.8); some 7.6.1 paths allowed Java 11 | **Java 17** fully supported in 9.1 (no compatibility mode) |
| **Database** | DB2, Oracle, SQL Server — all first-class | DB2 11.5 SE min, Oracle 19.3 min, SQL Server 2019 min; **DB2 Warehouse** used by core services |
| **NoSQL** | None | **MongoDB required for MAS Core** (user, app metadata, entitlement/usage); v5/v6 at 9.0; **v8.0 at 9.2** |
| **Event streaming** | JMS queues on WAS | **Kafka** for sensor streaming and cross-component events (Manage, Monitor) |
| **Deployment footprint** | EAR on WAS, scale via JVMs/cluster members | Pods on OpenShift: MAS Core, application pods (Manage, Health, Monitor, Predict, Assistant), shared-services pods (DB2, MongoDB, Kafka) |
| **Cloud options** | Self-managed; some partner cloud | On-prem, IBM Cloud, AWS, Azure; edge-device deployment for near-real-time monitoring |

**Second-order implication (commonly missed in TCO models):** The 7.6 → MAS transition is **three shifts stacked** — app server, runtime, orchestration. Operational skills needed in MAS (OpenShift, Kubernetes, Kafka, MongoDB admin, Helm/operators) are **largely disjoint** from traditional Maximo admin skills (WebSphere, DB2 DBA). Any TCO model that doesn't include a parallel skills-migration workstream is understating cost-to-adopt.

## B.2 User interface — Carbon + Role-Based Applications

- **Work Centers** (introduced in 7.6.0/7.6.1 era: Supervisor, Technician, Service Desk, Asset Manager, etc.) were **deprecated in MAS v8.9 and progressively removed through MAS 9.0**. There is **no automatic migration** for Work Center customizations.
- Replacement: **Role-Based Applications (RBAs)**, built on React / MAS Application Framework (MAF) with **Carbon Design System**. RBAs target shop-floor personas (e.g., Work Orders RBA, Inspections RBA).
- Unified left navigation introduced in 9.1 replaces the dual menu.
- **Strategic point for any reviewer:** any custom Work Centers built for 7.6 are sunk cost and must be rebuilt — this is a rebuild budget line, not a migration line-item.

## B.3 Licensing — the change that reshapes the business case

| Dimension | Maximo 7.6.x | MAS 9.x |
|---|---|---|
| Model | Per-user: Authorized User, Limited Use, Concurrent (plus Enterprise/Express editions, industry solution SKUs) | **AppPoints** — consumption-based, per active user, weighted per application |
| Packaging | Base EAM + paid industry solution SKUs (Utilities, Nuclear, Aviation, T&L, etc.) + paid add-ons (Scheduler, Anywhere, HSE, ACM, etc.) | Single MAS part number (5737-M66) entitles MAS apps/add-ons/industry solutions with AppPoint-based access; **Maximo IT** has separate-purchase language in IBM licensing guidance; **AI Service** is separately modeled through 10 AppPoints / 1B monthly content tokens and install allocation language |
| Mobile | Maximo Anywhere (separately licensed) | Maximo Mobile (entitled under AppPoints) |
| Trade-up | N/A | **Dual entitlement** and **Trade-Up** programs exist for 7.6 → MAS; Sustained Support retains 7.6 rights during transition |

**Counterpoint:** AppPoints is NOT automatically cheaper. It's a different consumption shape — organizations with many light/occasional users can see cost increase vs named-user EAM. Build the AppPoint model before accepting a cost narrative.

## B.4 Support lifecycle — you are on the clock

- **Maximo 7.6.x end-of-new-license-sales:** April 19, 2024
- **Final standard-support renewal window:** September 2024
- **Formal End of Standard Support for 7.6.1.x:** **September 30, 2025**
- **Extended Support:** up to **1 year** past EOS (for a fee)
- **Sustained Support:** up to **5 years** past EOS (for a fee)
- IBM Support confirms the governing EOS announcement letter: **922-024**, published April 12, 2022, effective September 30, 2025.

**Strategic point for any reviewer:** The "do nothing" option has a shelf life. Running 7.6 past September 30, 2025 without Extended/Sustained Support is an un-patched security posture and a loss of vendor-supported regulatory audit artifacts — relevant for nuclear customers under NQA-1.

## B.5 AI capabilities unique to MAS (not present in 7.6)

| Capability | First shipped | What it does |
|---|---|---|
| **Maximo Predict** | MAS 8.x | ML predictive maintenance (failure anticipation) |
| **Maximo Health** | MAS 8.x | Asset health scoring; risk-based / financially-optimized maintenance; MTBF and transformer models added in 9.0 |
| **Maximo Monitor** | MAS 8.x | Real-time visibility, anomaly detection, root-cause; Kafka-backed |
| **Maximo Visual Inspection (MVI)** | MAS 8.x; **video AI in 9.2** | Computer-vision defect detection from photo/video, drone/fixed camera |
| **Maximo Assist** (original) | MAS 8.x | Technician assistance / asset search. **Discontinued in 9.x**; replaced by Collaborate on Mobile |
| **Maximo Assistant** (new, distinct from Assist) | **MAS 9.1 (June 2025)** | watsonx.ai generative chat embedded in MAS |
| **Maximo AI Service** | MAS 9.1 | Licensed integration hub between Manage and watsonx; IBM 9.1 licensing maps **1B content tokens/month to 10 AppPoints** and lists AI Service install allocation at **10 AppPoints** |
| **watsonx Orchestrate integration** | 2025+ reference architecture | Agentic AI assistant composition (GitHub `IBM/maximo-wxo-integration`) |
| **FMEA Content Builder** | MAS 9.1 | AI-generated FMEA |
| **Similarity Tracker / Similar WOs** | MAS 9.1 | Recurrence detection in historical WOs |
| **Reliability Strategies** | MAS 9.0 (enhanced 9.1) | Custom strategies with AI-suggested thresholds |
| **AI-driven condition insights, failure-mode alignment, recommended actions** | MAS 9.2-era Feature Channel / component releases | Deeper asset-data interpretation and automated recommendations; validate production support because Feature Channel artifacts are non-production evaluation by IBM's own readme language |

**Naming watch-out for analyst decks:** "Maximo Assist" (legacy, discontinued) ≠ "Maximo Assistant" (new 9.1 GA). Any analyst deck using "Maximo Assist" against MAS 9.x is likely referring to the wrong product.

## B.6 Customization model — the point analysts usually underweight

| 7.6.x | MAS 9.x |
|---|---|
| Java customizations compiled into EAR (classic pattern) | **Java customization model changed**; preferred path is **Automation Scripts** (Jython/JavaScript) with extensive script point coverage |
| Classic UI XML + Java | **Application Configuration Tool (ACT)** extended in 9.1 to cover User/Security Group apps; RBAs in React/MAF |
| Maximo Integration Framework (MIF) with JMS | MIF still present; **REST/OSLC** APIs first-class; **Kafka** event streaming for cross-component |
| LDAP / internal Maximo auth | **SSO via OIDC** (IBM Security Verify, Azure AD, Okta), **SCIM** provisioning, IBM Entitlement integration |

**Strategic point for any reviewer:** "lift and shift" Java EAR customizations from 7.6 to MAS is generally **not** the path. Budget a conversion-to-Automation-Scripts workstream. Teams that skip this find themselves blocked on upgrades.

## B.7 Mobile strategy

- **Maximo Anywhere** — 7.6 / early MAS era — deprecated, slated for removal alongside Work Centers
- **Maximo Mobile** / **Maximo Mobile for EAM** — current strategic mobile, React-based, Carbon UI, entitled under AppPoints
- **Nuclear Operator Rounds** mobile app shipped as part of Nuclear industry solution

## B.8 Industry solutions — what survived the MAS cull

Industry solutions in MAS:
- **Maximo for Utilities** — active
- **Maximo for Nuclear Power / Maximo Nuclear** — **active** (the relevant one for this analysis)
- **Maximo for Transportation** — active
- **Maximo for Aviation** — active
- **Maximo for Oil & Gas** — active
- **Maximo for Service Providers** — active
- **Maximo for Life Sciences** — **retired** (did not move forward into MAS)

## B.9 Upgrade path — concretely

- **Maximo 7.6.1.x → MAS 8.x → MAS 9.x** via the MAM Upgrade utility + Migration Manager for content
- In-place DB is typically retained (DB2/Oracle/SQL Server); configuration migrated; customizations reviewed and (where EAR-based) re-platformed to Automation Scripts or RBAs
- MAS installer (`ibm-mas/cli`, Ansible DevOps) automates OpenShift-based deployment

---

# PART C — Counter-Arguments by Theme (stress-test toolkit)

**Disclaimer (repeat):** The author of this document has **not seen McKinsey's report**. The positions rebutted below are **common analyst/consulting framings** for EAM platform reviews — they are **not documented McKinsey claims**. Use Part C as a thematic toolkit: if one of these positions appears in McKinsey's deck, the facts in Parts A / A-GEN / B support the rebuttal. If an analyst's actual claims differ, share them and Part C can be rewritten against the specific assertions.

Each counter-argument is backed by evidence in Parts A–B.

### C.1 "Maximo 7 vs MAS is just a UI refresh"
**False.** It is a platform category change — **three stacked shifts**: WAS → Liberty (app server), Java 8/11 → Java 17 (runtime), bare-metal/VM → OpenShift/Kubernetes (orchestration). Plus MongoDB and Kafka become required. Any TCO model that doesn't include a parallel ops-skills migration is understating adoption cost. See §B.1.

### C.2 "AppPoints will be cheaper"
**Unverifiable without modeling.** AppPoints is consumption-shaped per user per app. Organizations with many light / occasional users can see **cost increase** vs named-user 7.6. Third-party analysts flag ~35% cost-increase risk on like-for-like trade-ups. Demand the AppPoint consumption model before accepting a cost narrative. See §A.5 and §B.3.

### C.3 "Maximo doesn't have nuclear compliance capability"
**False.** Nuclear Add-Ons ship **31 apps + 16 extensions** across 6 nuclear-specific module families — Condition Reports (Nuc) is the CAP engine per 10 CFR 50 App B XVI; Tech Specs + Surveillance Requirements + LCO Tracking handle 10 CFR 50.36; Clearances (Nuc) covers nuclear tagout; Configuration Change Designer handles 10 CFR 50.59; Purchasing (Nuc) covers NQA-1 procurement with ASL. See §A.2 and §A.3.

### C.4 "Nuclear was retired from MAS"
**False.** Nuclear is an **active** industry solution in MAS. **Life Sciences** is the one that was retired. Maximo for Nuclear Power is delivered as an entitled industry solution in MAS Manage, on a Continuous Delivery stream (currently Maximo Nuclear 8.1.x alongside MAS 9.x). See §A.1 and §B.8.

### C.5 "Maximo for Nuclear covers every nuclear workflow out of the box"
**Partially true — don't overclaim either.** Some capabilities a reviewer may ask about (**OPEX, AP-913 Scoping, Maintenance Rule, Hold Points, nuclear-specific e-signature**) have **no IBM-named application**. They are implemented via configuration of other apps (classifications, flags, Job Plan task statuses, core ESig framework) or inherited from MAS AI (Reliability Strategies, Health, Monitor). This is defensible and industry-standard — but it needs clear scoping in statements of work. See §A.3 anti-invention table.

### C.6 "Work Centers are the Maximo persona experience"
**Out of date.** Work Centers were deprecated in **MAS 8.9** and progressively removed through **MAS 9.0**. The persona model is now **Role-Based Applications (RBAs)** on Carbon Design / React / MAF. Any custom Work Centers built for 7.6 **must be rebuilt** — no automatic migration. See §B.2.

### C.7 "MAS 9.2 ships with brand-new nuclear AI"
**Unverified — demand evidence.** Public 9.2-era material describes Feature Channel and component-level updates, and IBM's Feature Channel readmes state the channel is for **non-production evaluation**. **No nuclear-exclusive 9.2 AI feature list is public as of April 21, 2026.** Any such claim should be sourced from IBM Support, the maintained-stream release notes, or `ibm.com/docs/en/mfnp/continuous-delivery`. See §A.4.

### C.8 "7.6 can sit at standstill"
**Risk.** Maximo 7.6.1.x formal **End of Standard Support was September 30, 2025**. Extended Support (1 year) and Sustained Support (up to 5 years) are available at cost; absent them, 7.6 runs un-patched and without vendor-supported artifacts — an open finding for nuclear customers under NQA-1 QA records and auditability. See §B.4.

### C.9 "Maximo's Java-EAR customizations carry over"
**False.** Java-EAR customizations are **not** the supported path in MAS. Preferred pattern is **Automation Scripts** (Jython/JavaScript) with expanded script points + **ACT** for configuration + **RBAs** for UI. Budget a conversion workstream. See §B.6.

### C.10 "AI in MAS is a free upgrade"
**False.** IBM MAS 9.1 licensing guidance models **Maximo AI Service** separately: **1 billion content tokens per month = 10 AppPoints**, and the install-allocation table also lists AI Service at **10 AppPoints**. It must be modeled separately from the Manage user tier. See §A.5 and §B.5.

### C.11 "Generation needs a separate Maximo product"
**Mostly false for conventional generation, but now nuanced for renewables.** There is **no standalone Maximo for Power Generation** industry solution in public IBM docs. Conventional generation is scoped through **Maximo Utilities** plus core MAS/APM capabilities. However, IBM now documents **Maximo Renewables** as a named APM solution for wind, solar, and BESS; do not collapse renewables into the older Utilities-only framing. See §A-GEN.1 and §A-GEN.3.

### C.12 "Health and Predict — Utilities is our generation AI"
**Out of date.** Maximo **Health and Predict — Utilities** was **discontinued in MAS 8.11**. Its capabilities merged into base Maximo **Health / Predict**, with asset-class templates renamed "**IBM Maximo Models for Electrical Distribution**" as an accelerator. If an analyst artifact cites Health and Predict — Utilities as a live product, it's working from pre-8.11 material. See §A-GEN.5.

### C.13 "Emissions Management Dashboard is part of Utilities"
**Wrong attribution.** Emissions Management Dashboard belongs to **HSE + Oil & Gas**, not the Utilities industry solution. Generation customers absolutely use it — for fossil/thermal emissions reporting to EPA/MATS — but it's not a Utilities-line capability. See §A-GEN.3 and §A-GEN.5.

### C.14 "NERC CIP is automated out-of-the-box in Maximo"
**Oversell.** Maximo for Utilities supports **NERC CIP evidence** via asset criticality tagging (BES/LIBES) and work-order regulatory linkage. It is **not a compliance-automation platform** — that space belongs to AssurX, Certrec, RegScale. Maximo is the **system of record that supplies audit evidence**; it is not the compliance rules engine. See §A-GEN.4.

### C.15 "MAS 9.2 has no substantive AI change — it's cosmetic"
**False for the component stream, but production scope must be checked.** IBM Support confirms an **AI Service 9.2.0 language model transition** (Jan 29, 2026): IBM Granite 3-2-8B Instruct was **replaced with OpenAI GPT-OSS-120B** for Predictive Cause-Effect Correlation (PCC), Maintenance Cause Classification (MCC), and FMEA functions. For nuclear operators running AI-assisted classification, this is a validation-posture change. The deployment question is whether the selected maintained stream includes the same component version. See §A.4 table.

### C.16 "MAS 9.2 is a traditional major version"
**False as stated, and be precise.** Public 9.2 artifacts are primarily **Feature Channel/component** releases, not a single classic GA letter. Confirmed Feature Channel drops include **Oct 6, 2025 · Oct 30, 2025 · Nov 27, 2025 · Dec 24, 2025 · Jan 29, 2026 (AI Service 9.2.0) · Feb 26, 2026 · Mar 26, 2026**. IBM states Feature Channel is for **non-production evaluation**, so nuclear programs need explicit release-governance language separating evaluation, validation, and production adoption. See §A.4 and §B.2.

### C.17 "No official announcement letters exist for the MAS 9.x line — they're unverifiable"
**False.** Confirmed letters: **AD24-0483** (MAS 9.0 GA, 25 Jun 2024), **AD25-1186** (MAS 9.1 GA, 24 Jun 2025), **922-024** (7.6.1.x EOS, published 12 Apr 2022, effective **30 Sep 2025** — covers all 7.6.1.x industry solutions and add-ons including Nuclear and Utilities), **920-136** (7.6.0.x EOS). The `ENUS-xxx` format sometimes cited is legacy; IBM has moved to **AD-series** letters for 2024+ MAS announcements. Any claim that these are un-findable is out of date.

### C.18 "Nuclear has no separate 9.2 patch stream — it just inherits MAS"
**Partially false.** IBM Support **does publish** a dedicated page titled "IBM Maximo for Nuclear Power 9.2: released APARs and DTs" — meaning Nuclear has its own **APAR/DT tracking stream on 9.2**, distinct from base Manage. Specific content is behind IBM Support auth, but the existence of the dedicated stream is public. Pull it directly when planning Nuclear-specific validation.

### C.19 "Renewables are just another Utilities configuration"
**Out of date.** IBM now documents **Maximo Renewables** as a named APM solution for wind, solar, and battery storage assets, with monitoring, analytics, root-cause insight, recommendation, and Manage integration. Conventional generation remains a Utilities + MAS/APM implementation discussion, but renewables should be evaluated as a distinct IBM Maximo solution area. See §A-GEN.1 and §A-GEN.3.

---

# Sources

## IBM Docs — Maximo for Utilities (Generation scope)
- [Maximo for Utilities — CD product overview](https://www.ibm.com/docs/en/maximo-for-utilities/cd?topic=product-overview)
- [Maximo for Utilities 7.6.1 — Product overview](https://www.ibm.com/docs/en/maximo-for-utilities/7.6.1?topic=product-overview)
- [Maximo for Utilities 7.6.1 — Compatible Units](https://www.ibm.com/docs/en/maximo-for-utilities/7.6.1?topic=units-compatible)
- [Maximo for Utilities — Continuous Delivery overview](https://www.ibm.com/docs/en/maximo-for-utilities/continuous-delivery?topic=product-overview)
- [MAS Manage — Add-ons and industry solutions](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=overview-maximo-manage-add-ons-industry-solutions)
- [MAS — Applications, industry solutions, add-ons overview](https://www.ibm.com/docs/en/masv-and-l/cd?topic=overview-applications-industry-solutions-add-ons)
- [MAS — Deployment of industry solutions and add-ons](https://www.ibm.com/docs/en/masv-and-l/cd?topic=deploy-deployment-industry-solutions-add-ons)
- [IBM Products — Maximo Energy & Utilities](https://www.ibm.com/products/maximo/energy-utilities)
- [IBM Docs — Maximo Renewables overview](https://www.ibm.com/docs/en/maximo-renewables?topic=overview-maximo-renewables)
- [IBM Docs — Maximo Renewables what's new](https://www.ibm.com/docs/en/maximo-renewables?topic=whats-new)
- [IBM Docs — Integrating Maximo Renewables with Maximo Manage](https://www.ibm.com/docs/en/maximo-renewables?topic=started-integrating-maximo-manage)
- [IBM Products — Maximo Renewables](https://www.ibm.com/products/maximo/renewables)
- [IBM Support — Smart meters in Maximo Utilities](https://www.ibm.com/support/pages/smart-meters-ibm-maximo-utilities)
- [IBM Support — Industry solutions and add-ons support resources](https://www.ibm.com/support/pages/maximo-support-resources-industry-solutions-and-add-ons)
- [IBM announcement — 5724-U18 Maximo Asset Management Product Family](https://www.ibm.com/common/ssi/ShowDoc.wss?docURL=/common/ssi/rep_sm/8/897/ENUS5724-U18/index.html&lang=en)
- [IBM announcement — 5725-W39 APM for Energy and Utilities 3.0](https://www.ibm.com/common/ssi/ShowDoc.wss?docURL=/common/ssi/rep_sm/9/897/ENUS5725-W39/index.html&lang=en)
- [IBM announcement — ZP22-0017 MAS as a Service](https://www.ibm.com/common/ssi/ShowDoc.wss?docURL=/common/ssi/rep_ca/7/877/ENUSZP22-0017/index.html&lang=en)
- [IBM Product Blog — Emissions Management in MAS](https://www.ibm.com/new/product-blog/promote-resilience-and-emissions-management-for-asset-management-operations-with-maximo-application-suite-mas)
- [IBM GitHub — Drone to Fix (Solar Farm Inspection with Watsonx)](https://github.com/IBM/mas-drone-to-fix-watsonx)
- [Maximo Secrets — Crew Types](https://maximosecrets.com/2020/11/04/crew-types-2/)
- [Naviam — Electric Utilities](https://www.naviam.io/industries/electric-utilities)
- [Naviam — Health/Predict—Utilities discontinuation explanation](https://www.naviam.io/resources/blog/demystifying-the-differences-understanding-manage-with-health-health-and-predict-utilities-and-health-safety-and-environment)
- [Naviam — Utilities grid management](https://www.naviam.io/resources/blog/how-utilities-use-mas-for-better-grid-management)
- [Interloc — Maximo Energy & Utilities](https://www.interlocsolutions.com/ibm-maximo-energy-utility)
- [Interloc — Utilities practice](https://www.interlocsolutions.com/utilities)
- [Banetti — Maximo for Utilities portfolio](https://banetti.com/portfolio/maximo-for-utilities/)
- [Banetti — Maximo for Utilities and Energy guide](https://info.banetti.com/ibm-maximo-for-utilities-and-energy/)
- [Projetech / Naviam — MaaS for Utilities](https://www.projetech.com/maximo-blog/how-ibm-maximo-as-a-service-benefits-utilities)
- [Pragma Edge — Maximo for Energy and Utilities](https://pragmaedge.com/maximo-for-energy-and-utilities/)
- [SlideShare — IBM Maximo for Utilities T&D (CU, CIM, Task Prerequisites)](https://www.slideshare.net/slideshow/ibm-maximo-for-utilities-td/77168941)

## IBM Docs — Maximo for Nuclear Power
- [Maximo for Nuclear Power 7.6.0](https://www.ibm.com/docs/en/mfnp/7.6.0)
- [7.6.1 — Condition Reports application](https://www.ibm.com/docs/en/mfnp/7.6.1?topic=module-condition-reports-application)
- [7.6.1 — Solutions application](https://www.ibm.com/docs/en/mfnp/7.6.1?topic=module-solutions-application)
- [7.6.1 — Impact Plan statuses](https://www.ibm.com/docs/en/mfnp/7.6.1?topic=overview-impact-plan-statuses)
- [7.6.2 — Modules and applications](https://www.ibm.com/docs/en/mfnp/7.6.2?topic=modules-applications)
- [7.6.2 — Work Order Tracking](https://www.ibm.com/docs/en/mfnp/7.6.2?topic=module-work-order-tracking-application)
- [7.6.2 — Asset List](https://www.ibm.com/docs/en/mfnp/7.6.2?topic=module-asset-list-application)
- [7.6.2 — Operator Rounds mobile app](https://www.ibm.com/docs/en/mfnp/7.6.2?topic=overview-maximo-nuclear-power-operator-rounds-mobile-app)
- [Maximo Nuclear Continuous Delivery overview](https://www.ibm.com/docs/en/mfnp/continuous-delivery?topic=product-overview)
- [Calibration assets in MAS Manage CD](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=locations-calibration-assets)

## IBM Support
- [MNP 7.6.2 product page](https://www.ibm.com/support/pages/ibm-maximo-nuclear-power-762)
- [Maximo Nuclear 8.1.x patches](https://www.ibm.com/support/pages/ibm-maximo-application-suite-ibm-maximo-nuclear-power-patch-81x)
- [MNP 7.6.0 withdrawal notification](https://www.ibm.com/support/pages/maximo-nuclear-power760-withdrawal-notification)
- [7.5.1 Surveillance Features field guide](https://www.ibm.com/support/pages/maximo-nuclear-power-industry-surveillance-features-release-751)
- [7.6.1 Condition Reports field guide](https://www.ibm.com/support/pages/field-guide-maximo-nuclear-power-industry-condition-reports-release-761)
- [7.6.1 Impact Plans field guide](https://www.ibm.com/support/pages/field-guide-maximo-nuclear-power-industry-impact-plans-release-761)
- [Permits in support of work orders](https://www.ibm.com/support/pages/node/1134801)
- [End of Support — Maximo 7.6.1](https://www.ibm.com/support/pages/end-support-announcement-eos-maximo-761)
- [MAS releases information](https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0)
- [MAS AI Service Component 9.2.0](https://www.ibm.com/support/pages/ibm-maximo-application-suite-ai-service-component-feature-release-920-0)
- [Maximo product configuration matrix](https://www.ibm.com/support/pages/maximo-product-configuration-matrix)

## IBM Announcement Letters (confirmed via IBM Support lifecycle pages)
- [MNP 7.6.1 — ZP17-0489](https://www-01.ibm.com/common/ssi/ShowDoc.wss?docURL=/common/ssi/rep_ca/9/877/ENUSZP17-0489/index.html&request_locale=en)
- [MNP 7.6.2 — ENUS220-006](https://www.ibm.com/common/ssi/cgi-bin/ssialias?infotype=AN&subtype=CA&htmlfid=897/ENUS220-006&appname=USN)
- **MAS 9.0 GA — AD24-0483** (25 Jun 2024) — confirmed via [IBM Support MAS 9.0.x lifecycle page](https://www.ibm.com/support/pages/ibm-maximo-application-suite90x)
- **MAS 9.1 GA — AD25-1186** (24 Jun 2025) — confirmed via [IBM Support MAS 9.1.x lifecycle page](https://www.ibm.com/support/pages/ibm-maximo-application-suite91x)
- **Maximo 7.6.1.x EOS — 922-024** (published 12 Apr 2022; effective 30 Sep 2025) — covers Maximo Asset Management + Nuclear Power 7.6.1/7.6.2 + Utilities 7.6.1.x + all 7.6.1.x industry solutions and add-ons. [IBM Support EOS page](https://www.ibm.com/support/pages/end-support-announcement-eos-maximo-761)
- **Maximo 7.6.0.x EOS — 920-136** (published 8 Sep 2020; effective 30 Sep 2021). [IBM Support EOS page](https://www.ibm.com/support/pages/end-support-announcement-eos-maximo-760)
- **MAS 8.10-LTS / 8.11-LTS GA — 223-043, 223-0230** (completion of fix availability 30 Apr 2026; Extended Support available). [IBM Supported Versions for MAS](https://www.ibm.com/support/pages/node/6963368)
- **MAS-as-a-Service — ZP22-0017** — [announcement letter](https://www.ibm.com/common/ssi/ShowDoc.wss?docURL=/common/ssi/rep_ca/7/877/ENUSZP22-0017/index.html&lang=en)

## MAS 9.2 Feature Channel readmes (IBM Support)
- [September FC (Oct 6, 2025)](https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-september-release)
- [October FC (Oct 30, 2025) — OpenShift 4.19](https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-october-release)
- [November FC (Nov 27, 2025) — MongoDB v8](https://www.ibm.com/support/pages/node/7252845)
- [December FC (Dec 24, 2025)](https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-december-release)
- [February FC (Feb 26, 2026)](https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-february-release)
- [March FC (Mar 26, 2026)](https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-march-release)
- [AI Service 9.2.0 — Granite → GPT-OSS-120B (Jan 29, 2026)](https://www.ibm.com/support/pages/ibm-maximo-application-suite-ai-service-component-feature-release-920-0)
- [AI Service 9.2.0-1](https://www.ibm.com/support/pages/ibm-maximo-application-suite-ai-service-component-feature-release-920-1)
- [IBM Maximo for Nuclear Power 9.2 — released APARs and DTs](https://www.ibm.com/support/pages/ibm-maximo-application-suite-ibm-maximo-nuclear-power-92-released-apars-and-dts)
- [Configuring Maximo Nuclear (CD)](https://www.ibm.com/docs/en/mfnp/continuous-delivery?topic=configuring-maximo-nuclear)
- [Feature Channel overview video (IBM Mediacenter)](https://mediacenter.ibm.com/media/Feature+channel+overview+for+IBM+Maximo+Application+Suite/1_4gqukwhh)

## MAS AppPoints licensing references
- [IBM Docs — AppPoints usage administration](https://www.ibm.com/docs/en/masv-and-l/cd?topic=administering-licenses-apppoints-usage)
- [IBM Docs — MAS 9.1 user access entitlements](https://www.ibm.com/docs/en/masv-and-l/cd?topic=91-user-access-entitlements)
- [IBM Docs — Licensing in MAS 9.1](https://www.ibm.com/docs/en/masv-and-l/cd?topic=suite-licensing-in-maximo-application-91)
- [IBM Docs — Licensing in MAS 9.0 and earlier](https://www.ibm.com/docs/en/masv-and-l/cd?topic=suite-licensing-in-maximo-application-90-earlier)
- [IBM Docs — Earlier user-entitlement access](https://www.ibm.com/docs/en/masv-and-l/cd?topic=earlier-user-entitlement-access)
- [TRM — AppPoints licensing model explained](https://trmgroup.com/resource/ibm-maximo-new-apppoints-licensing-model-explained/)
- [TRM — Path to MAS: understanding AppPoints](https://trmgroup.com/resource/path-to-mas-understanding-apppoints/)
- [Maven Asset — MAS Application Points](https://www.mavenasset.com/blog/mas-application-points/)
- [SWMUG — MAS License Key Information (PDF)](https://swmug.org/wp-content/uploads/2022/12/MAS_LicenseKeyInformation-Customer.pdf)
- [MACS — MAS License Model PDF](https://macs.eu/wp-content/uploads/2022/10/Maximo-Application-Suite-License-Model.pdf)

## IBM Community & GitHub
- [IBM MAS GitHub organization](https://github.com/ibm-mas)
- [IBM MAS CLI](https://github.com/ibm-mas/cli)
- [IBM Maximo Nuclear community](https://www.ibm.com/mysupport/s/topic/0TO50000000IMr9GAG/maximo-for-nuclear-power?language=en_US)
- [IBM/maximo-wxo-integration (watsonx Orchestrate)](https://github.com/IBM/maximo-wxo-integration)

## Maximo Secrets — definitive public app-map inventory
- [Nuclear modules portfolio](https://maximosecrets.com/portfolio/nuclear-modules/)
- [Nuclear Applications 1/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-1-of-6/)
- [2/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-2-of-6/) · [3/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-3-of-6/) · [4/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-4-of-6/) · [5/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-5-of-6/) · [6/6](https://maximosecrets.com/2019/03/04/maximo-nuclear-applications-6-of-6/)
- [Calibration application map 14/14](https://maximosecrets.com/2019/03/04/nuclear-application-maps-14-of-14-calibration/)
- [New Features in MAS 9.0 and 9.1](https://maximosecrets.com/2025/07/06/new-features-in-mas-90-and-91/)
- [MAS 9.0 New Features](https://maximosecrets.com/2024/06/26/mas-9-0-new-features/)
- [Upgrading to MAS 9.0](https://maximosecrets.com/2024/10/08/upgrading-to-mas-9-0/)
- [Maximo User Interface 9.1](https://maximosecrets.com/2025/08/15/maximo-user-interface-9-1/)
- [IBM Maximo Manage Overview (licensing context)](https://maximosecrets.com/ibm-maximo-manage-overview/)

## Partner / analyst
- [Interloc Solutions — IBM Maximo](https://www.interlocsolutions.com/products/ibm-maximo)
- [Banetti — Maximo 9](https://info.banetti.com/maximo-9/) · [Banetti Utilities portfolio](https://banetti.com/portfolio/maximo-for-utilities/)
- [Cohesive Solutions — Nuclear CAP](https://blog.cohesivesolutions.com/increasing-the-efficiency-of-the-corrective-action-processes-with-ibm-maximo-and-industry-experts)
- [Naviam — Nuclear Energy](https://www.naviam.io/industries/nuclear-energy) · [Naviam — MAS 9.2 What to Expect](https://www.naviam.io/resources/blog/ibm-maximo-application-suite-9-2-what-to-expect) · [Naviam — 7.6.1.x End of Support](https://www.naviam.io/resources/blog/navigating-maximo-v-7-6-1-x-end-of-support)
- [Pragma Edge — MAS 9.1](https://pragmaedge.com/maximo-application-suite-9-1-release-in-june-2025-what-to-expect/) · [Pragma Edge — 7.6.1.x EOS](https://pragmaedge.com/end-of-support-for-ibm-maximo-7-6-1-x-in-2025/)
- [TRM — MAS Manage Nuclear Industry Solution](https://trmgroup.com/resource/ibm_mas_manage_nuclear_industry_solution) · [TRM — Prepare for 7.6.0 EOS](https://www.trmnet.com/2021/04/prepare-for-maximo-7-6-0-end-of-support-eos/) · [TRM — Anticipated MAS 9.0](https://www.trmnet.com/2024/04/anticipated-features-of-ibm-mas-9-0/)
- [A3J Group — WAS to OpenShift](https://a3jgroup.com/mas-9-installation-series-part-1-shifting-from-websphere-to-openshift-welcome-to-your-new-cloud-native-adventure/)
- [STI Maintenance — 7.6.1.x EOS 2025](https://stimaintenance.com/en/end-of-support-ibm-maximo-version-7-6-1-x-2025/)
- [Origina — Maximo 7.6.1 EOS analyst view](https://www.origina.com/blog/maximo-7-6-1-eos-what-your-company-should-know)
- [LVMUG — Maximo/MAS Licensing Explained 2023 (Lisa Stuckless)](https://lvmug.org/wp-content/uploads/2023/11/MaximoMAS_LicensingExplained2023v2.pdf)
- [Maven Asset — MAS 9 Support Model](https://www.mavenasset.com/blog/mas9-support-model-and-version-updates/)
- [PacMUG — MAS 9.0 Product Description Guide PDF](https://pacmug.org/wp-content/uploads/2025/05/MASTALK07PacMUGC25_MAS_ProductDecriptionGuideR9.0_IBM.pdf)

## IBM Newsroom & marketing
- [IBM Newsroom — Enhanced Maximo / Gen-AI Assistant](https://newsroom.ibm.com/blog-enhanced-maximo-streamlines-workforce-efficiency,-investment-planning,-and-facilities-management-introduces-gen-ai-assistant)
- [IBM — Maximo AI ALM](https://www.ibm.com/new/announcements/maximo-ai-alm)

## Regulatory (primary)
- [10 CFR 50 Appendix B — NRC full text](https://www.nrc.gov/reading-rm/doc-collections/cfr/part050/full-text)
- [10 CFR 50 App B — Cornell LII](https://www.law.cornell.edu/cfr/text/10/appendix-B_to_part_50)
- [10 CFR 50.65 — NRC](https://www.nrc.gov/reading-rm/doc-collections/cfr/part050/part050-0065)
- [NRC Reg Guide 1.160 Rev 3](https://www.nrc.gov/docs/ml1136/ml113610098.pdf)
- [10 CFR 50.65 Reg Guidance page](https://www.nrc.gov/reactors/operating/ops-experience/maintenance-effectiveness/regulations-guidance)
- [INPO AP-913 context (OSTI)](https://www.osti.gov/etdeweb/biblio/20578179)
- [DOE STD-1054 M&TE](https://www.standards.doe.gov/standards-documents/1000/1054-astd-1993)
- [IEEE 498 Calibration / M&TE](https://standards.ieee.org/ieee/498/6467/)

---

**Research integrity note:** Where a capability or claim could not be substantiated from the sources above within the research window, this document flags the gap rather than inventing content. Known residual gaps: exact per-app AppPoint consumption weights per Nuclear and per Utilities app; a nuclear-exclusive MAS 9.2 feature list (the APAR/DT stream is confirmed but content sits behind IBM Support auth); nuclear-specific cost deltas vs base Manage; and production-maintained-stream confirmation for 9.2-era Feature Channel capabilities. These should be pulled directly from IBM announcements / Passport Advantage / License Key Center materials, IBM Support APAR spreadsheets, and the selected maintained-stream release notes before any formal third-party review.

**About McKinsey framing:** The author has **not seen McKinsey's report**. Part C is a thematic stress-test toolkit written against common analyst/consulting positions — not against documented McKinsey assertions. To convert Part C into a point-by-point rebuttal, provide McKinsey's deck / memo / claim list and each counter-argument can be re-tagged to the specific slide or page it refutes.
