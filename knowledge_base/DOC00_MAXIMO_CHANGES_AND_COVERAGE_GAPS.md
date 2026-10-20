# DOC00 — Appendix: IBM Maximo Change Log & Blog Coverage Gaps (Living Document)

**Document:** DOC00. This is a living appendix to the knowledge base (DOC1–DOC17). It tracks two things: what changed at IBM (Maximo / MAS / related AI and platform), and which topics TheMaximoGuys blog does not cover yet.
**Created:** October 16, 2026
**Last scan:** 2026-10-18 (weekly scan #1; prior: 2026-10-16 initial build, 4 research passes + 224-post title audit)
**Next scan:** Sunday 2026-10-25, 23:10. It runs automatically every week (see "How this document is maintained").
**Audience:** The TMG content team: choosing what to write next, what to correct, and what is time-sensitive.

> **Source convention**
> - **[IBM]**: IBM release page, readme, announcement, documentation, support page, IBM GitHub (vendor material).
> - **[IND]**: partner, independent, analyst, community or press source.
> - **[UNVERIFIED]**: single weak source or inference. Do not publish it as fact.
> - **Confidence:** H = read in a primary source; M = secondary or partner source; L = inference.

### How this document is maintained

- **Cron:** `47 22 * * 0` runs `automation/off-hours/enqueue-gap-scan.sh`. That queues a `gap-scan-YYYYMMDD` item at priority 1. The 23:10 night-shift tick then runs `automation/off-hours/playbooks/gap-scan.md`.
- **What the job does:** it researches changes since "Last scan" and updates **§1, §2, §3, §4, §5 and §6** of this file. It commits locally. It never queues series, publishes, or pushes.
- **Who approves:** a human promotes a §5 proposal to `queue.json` and `content-planning/DOCS-TO-BLOGS-GAP-ANALYSIS.md`.
- **Stable ids:** changes are `CHG-###` and gaps are `GAP-###`. Ids are never reused. A closed gap is marked `CLOSED (date, series)`, not deleted.

---

## Contents

1. [Snapshot](#1-snapshot)
2. [Change Log (newest first)](#2-change-log-newest-first)
3. [Coverage Matrix](#3-coverage-matrix)
4. [Ranked Gaps](#4-ranked-gaps)
5. [Series Proposals for Top Gaps](#5-series-proposals-for-top-gaps)
6. [Changelog of This Document](#6-changelog-of-this-document)
7. [Corrections Backlog (Existing Posts)](#7-corrections-backlog-existing-posts)
8. [Watch List](#8-watch-list)
9. [References](#9-references)

---

## 1. Snapshot

**As of 2026-10-18.** Quiet week at IBM (no MAS 9.3 announcement, no new Manage/Core release found after 7 Oct); the main movement was on our side: MAS-LIFECYCLE, MAS-MOBILE and 6 of 7 MAS-SECURITY-OPS posts were drafted.

### Top 5 headline changes

| # | Change | Why it matters to readers |
|---|---|---|
| 1 | **Maximo 7.6.1.x Extended Support ended 30 Sep 2026.** Sustained Support (no new fixes) runs to 2030 [IND]. **MAS dual support for EAM 7.6.1 ends 30 Apr 2027, now confirmed on an IBM page** (CHG-001, CHG-041). Open conflict: IBM's Control Desk page shows Sustained Support to 31 Dec 2026 | Every 7.6 shop now has an expired support status and a hard deadline 6 months out |
| 2 | **MAS 9.0 base support ends 30 Jun 2027** (AD26-0622). 8.10/8.11 moved to Extended Support, and 8.7–8.9 lost support on 30 Apr 2026 (CHG-003, CHG-004) | 9.0 shops need a 9.1/9.2 plan inside 8 months |
| 3 | **9.2.x patch train:** Core 9.2.8 / Manage 9.2.4. Fixes include **CVE-2026-105052** (unauthenticated path traversal in login, affecting 8.10–9.2) and DT501598 (MAXUSER data overwritten during the 9.1→9.2 upgrade) (CHG-005–CHG-008) | Upgrade and security guidance in the existing 9.2 posts is now out of date |
| 4 | **Agentic Maximo:** IBM described the "Supervisor ALM agent" behind Maximo Assistant, write actions through the MAS 9.2 MCP server, and announced "automation scripts as custom tools" (CHG-012). AssetOpsBench grew to 460+ scenarios (CHG-014) | Developers will soon write autoscripts as AI tools; nobody has explained this yet |
| 5 | **First MAS 9.3 code signal:** CLI 23.14.0 makes the internal certificate issuer always namespace-scoped on 9.3+ (CHG-010). TechXchange is Oct 26–29 in Atlanta (CHG-022). Still no 9.3 announcement as of 18 Oct | A news hook, and early planning input for platform teams |
| 6 | **Partner consolidation:** Naviam is buying Cohesive from Bentley (Bentley becomes a minority holder; Norwest invests). Close was expected 30 Sep, not confirmed (CHG-040) | Changes the Maximo services landscape and the Bentley→Maximo geospatial story |

### Top gaps (open)

| Rank | Gap | Coverage | Proposal |
|---|---|---|---|
| 1 | GAP-002 MAS identity & security operations: Part 6 (agent security) still pending; Part 5 needs the CVE-2026-15687 update | PARTIAL (6 of 7 drafted) | §5.2 `MAS-SECURITY-OPS` |
| 2 | GAP-019 TechXchange 2026 preview/recap (event starts 26 Oct) | NOT COVERED | §5.7 quick win |
| 3 | GAP-003 MAS platform operations (Db2 12 on OpenShift, backup/DR, performance, observability, patch train, GitOps) | PLANNED (9 items queued, none written) | §5.3 `MAS-PLATFORM-OPS` (also absorbs GAP-007) |
| 4 | GAP-006 Agentic Maximo in practice (Supervisor ALM agent, MCP, AssetOpsBench, TSFM) | PARTIAL | §5.6 `MAS-AGENTIC` |
| 5 | GAP-004 / GAP-005 Data loading on MAS 9 and the autoscript cookbook (tied) | PARTIAL | §5.4 `MAS-DATA-LOADING`, §5.5 `MAS-AUTOSCRIPTS` |


**Closed or already queued (not gaps):**
- `MAS-LIFECYCLE` (index + 4 parts drafted 2026-10-17; GAP-001 CLOSED 2026-10-18; covers pending)
- `MAS-MOBILE` (3 posts drafted 2026-10-17; covers pending)
- `MAS-MAF-DEV` (10 posts, from DOC17), pending in queue

---

## 2. Change Log (newest first)

Window for the initial build: Jan–Oct 2026, with emphasis on Jun–Oct. Scan #1 (2026-10-18) added CHG-038–CHG-043 at the top; CHG-026 is upgraded by CHG-041 (IBM-primary).

| ID | Date | Area | Change | Tag / Conf. | Source |
|---|---|---|---|---|---|
| CHG-043 | 2026-04-01 → 2026 | Competitors | **IFS named a Leader in the 2026 IDC MarketScape for AI EAM** (1 Apr). IFS 26R1 (May 2026) added AI-assisted FMECA and Copilot insights; its Cloud releases added agentic maintenance-strategy and automatic work-order generation. ServiceNow has launched an EAM application (Verdantix; date not found) | [IND] M | https://www.ifs.com/en/insights/news/IFS-named-2026-IDC-MarketScape-leader-for-AI-EAM · https://marketing.verdantix.com/blog/competition-intensifies-servicenow-launches-new-eam-solution-to-optimize-asset-lifecycle-management |
| CHG-042 | 2026-09-10 → 09-24 | Release | Industry-solution patch levels (IBM fix-list pages): **Utilities 9.2.12 (24 Sep)**; Aviation 9.2.18 and Transportation 9.2.19 (pages modified 10 Sep, paired with Manage 9.2.3). These are the same train as CHG-007 | [IBM] M (read via search snippets) | https://www.ibm.com/support/pages/ibm-maximo-application-suite-ibm-maximo-aviation-92-released-apars-and-dts |
| CHG-041 | 2026-10-18 (verified; page undated) | Lifecycle | **IBM-primary confirmation:** "Effective 30 April 2027, dual support under the MAS license for EAM 7.6.1.x is no longer available." IBM also lists 7.6.x Base Support ended 30 Sep 2025 and Extended Support ends 30 Sep 2026 (up to 5 years of Sustained Support can be bought). The **30 Sep 2030** Sustained date is still reseller-only [IND]. **Conflict:** IBM's Control Desk 7.6.1.x page shows Extended to 30 Sep 2026 and Sustained to 31 Dec 2026; it may apply to Control Desk only, and Maximo IT is named as the successor | [IBM] H (dual support, base/extended) / [IND] M (2030) | https://www.ibm.com/support/pages/node/7269505 · https://www.ibm.com/support/pages/node/7044949 · https://mavenasset.com/?p=9121 |
| CHG-040 | 2026-09-07 | Partners | **Naviam to acquire Cohesive from Bentley Systems.** Bentley takes a minority stake and a board seat; Norwest invests. Billed as "the world's largest independent IBM Maximo services provider". Plans to integrate Bentley Infrastructure Cloud (including geospatial data) with Maximo. Close expected 30 Sep 2026; closing not confirmed. No AI claims | [IND] H (press release) | https://www.cohesivesolutions.com/resource/naviam-announces-definitive-agreement-to-acquire-cohesive-from-bentley-systems/ |
| CHG-039 | 2026-10 (bulletin undated) | Security | **IBM bulletin for CVE-2026-15687** (Kubernetes Java client path traversal bundled in Maximo AI Service, CVSS 2.4): affects AI Service 9.1.0 / 9.2.0; fixed in **9.1.19 / 9.2.3**. This is the only IBM AI Service bulletin found. Trackers quote the same fixed versions for CVE-2026-90920 (CHG-020) and mention Tomcat, Netty and glibc updates, but **IBM's own bulletin for CVE-2026-90920 was still not found**. Not in CISA KEV, no public PoC per one tracker | [IBM] H (15687) / [IND] M (90920 fix versions) | https://www.ibm.com/support/pages/node/7290472 · https://app.opencve.io/cve/CVE-2026-90920 |
| CHG-038 | 2026-10-08 → 10-16 | Ops tooling | **CLI 23.15.0 (16 Oct)**: `db2_audit_retention_days` in the Db2 gitops function, gitops-cluster logging-operator fix, "mirroring v2" documentation, and the v9-261007 catalog entry. CLI 23.14.1/23.14.2 were suite-verify admin URL routing fixes. **ibm-mas/gitops 8.7.0 (12 Oct) and 8.7.1 (16 Oct)**. ansible-devops 37.21.3 is CHG-021. No 9.3 mentions in these notes | [IBM] H | https://github.com/ibm-mas/cli/releases · https://github.com/ibm-mas/gitops/releases |
| CHG-022 | 2026-10-26→29 (upcoming) | Events | **IBM TechXchange 2026, Atlanta.** Sessions include TEC-2304 (GenAI for asset lifecycle), Bentley→Maximo agentic data handover, and TEC-9033 | [IBM] H | https://reg.tools.ibm.com/flow/ibm/techxchange26/sessioncatalog/page/sessioncatalog |
| CHG-021 | 2026-10-16 | Ops tooling | ansible-devops **37.21.3**. The 37.15–37.21 line removed OCP 4.16, added an MCP route to the Manage DNS entries, added Mongo 8.0.30 and MCK operator support, made Kafka passwords FIPS (32 chars), and added the CIS OWASP ruleset. Db2 Helm deployment is still "investigative" | [IBM] H | https://github.com/ibm-mas/ansible-devops/releases |
| CHG-020 | 2026-10-12 | Security | **CVE-2026-90920**: Maximo AI Service 9.1.0/9.2.0 code injection, **CVSS 9.8**, plus sibling DoS CVEs. **CVE-2026-75881**: IoT DoS. IBM bulletin and fixed versions not found | [IND] M | https://www.strix.ai/cve/CVE-2026-90920 |
| CHG-019 | 2026-10-12 | Competitors | IFS Unleashed: "IFS Intelligence", Loops digital workers, Agent Studio. SAP Connect: Joule Asset Operations agents, GA planned Q4 2026 | [IND] M/H | https://diginomica.com/ifs-unleashed-launches-ai-built-night-shift · https://news.sap.com/2026/10/joule-assistants-agents-advance-autonomous-scm/ |
| CHG-018 | 2026-10-09 | Lifecycle | **MAS 9.0.x → Extended Support 30 Jun 2027** (announcement AD26-0622). Extended Support ends 30 Jun 2031 | [IBM] H | https://www.ibm.com/support/pages/ibm-maximo-application-suite90x |
| CHG-010 | 2026-10-07 | MAS 9.3 | CLI PR #2607 (CLI 23.14.0): "In MAS 9.3+, the internal issuer is always Issuer (namespace-scoped, operator-managed)". `--mas-issuer-kind` is rejected on 9.3. No 9.3 announcement or Feature Channel yet. Timing of ~mid-2027 is inference only | [IBM] H (code) / L (timing) | https://github.com/ibm-mas/cli/pull/2607 |
| CHG-008 | 2026-10-07 | Release / security | **Core 9.2.8 (interim)**, catalog v9-261007, also Core 9.1.27 and 9.0.33. Fixes **CVE-2026-105052**: unauthenticated path traversal in the login service, CVSS 7.5, affecting 8.10, 8.11, 9.0, 9.1, 9.2. For 8.10/8.11 the fix is CoreIdp-Login 3.2.201 / 4.0.179 | [IBM] H | https://www.ibm.com/support/pages/node/7292664 · https://www.ibm.com/support/pages/node/7290791 |
| CHG-007 | 2026-09-29 | Release | **Manage 9.2.4** (build 9.2.232, Graphite 3.2.889). About 90 APARs, many in Mobile (labor timer, ICMOBILE ad hoc counts, SRMOBILE navigation, WPSERVICE/WPLABOR add()). Industry-solution levels: ACM 9.2.29, Aviation 9.2.18, Civil 9.2.61, HSE 9.2.43, Nuclear 9.2.16, O&G 9.2.43. Core 9.2.7, AI Service 9.2.3, REF 9.2.3 | [IBM] H | https://www.ibm.com/support/pages/node/7289350 · https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 |
| CHG-017 | 2026-09-24 | Platform | Catalogs v9-260924 and later support **OCP 4.18–4.22**, CPD 5.3.1, MongoDB 7–8. v9-260827 was the last catalog with OCP 4.16 | [IBM] H | https://ibm-mas.github.io/cli/catalogs/ |
| CHG-016 | 2026-09-23 | AI narrative | IBM "Industrial maintenance in the age of AI": a ladder from reactive to "trusted autonomy" ("not human-free"). IBV stat: only ~12–17% of chemicals, utilities and mining firms run AI in asset lifecycle management at scale | [IBM] H | https://www.ibm.com/think/perspectives/industrial-maintenance-in-the-age-of-ai-from-insight-to-trusted-action |
| CHG-006 | 2026-09-18 | Release | **Core 9.2.6 (interim)**: DT501598 (MAXUSER fields overwritten in a 9.1→9.2 upgrade when MASISSUER is NULL), DT500106 (Application Configuration won't open after 9.1.20), DT499855 (inactivity timeout deactivating users). 9.2.4/9.2.5 were "reserved for internal use" | [IBM] H | https://www.ibm.com/support/pages/node/7288414 |
| CHG-015 | 2026-09-22 | MAF tooling | **MAF Local Configuration** (ex-Local Dev Mode) VS Code/Bob extension v0.0.1-beta.6. Covered in DOC17 | [IBM] H | https://github.com/ibm-mas/maf-local-dev-mode/releases |
| CHG-013 | 2026-09-09 | AI narrative | IBM "Asset lifecycle management in the age of AI-native applications": ALM as the trusted foundation under AI-built apps | [IBM] H | https://www.ibm.com/think/perspectives/asset-lifecycle-management-ai-native-applications |
| CHG-023 | 2026-09-01 | AI / streaming | **Granite Time Series on Confluent Cloud (Early Access, AWS).** Flink SQL `AI_FORECAST` / `AI_DETECT_ANOMALIES`. Confluent Platform (on-prem/hybrid) "planned next" | [IBM] H | https://www.ibm.com/new/announcements/ibm-granite-time-series-models-bring-real-time-forecasting-and-anomaly-detection-to-confluent-cloud |
| CHG-005 | 2026-07-30 → 08-27 | Release | Core 9.2.1 (30 Jul), Manage 9.2.1 (30 Jul), Core 9.2.3 and Manage 9.2.2 (27 Aug). Component versions are now independent (e.g. Core 9.2.6 bundles Manage 9.2.3). Monthly catalogs: 260625, 260730, 260827, 260924, 261007; 261029/261126/261224 scheduled | [IBM] H | https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 |
| CHG-014 | 2026-08-30 | AI benchmark | **AssetOpsBench** arXiv v4: 460+ scenarios, specialist agents, MetaAgent orchestration over MCP; KDD 2026 tutorial "Building Reliable Industrial Agents with MCP" | [IBM Research] H | https://github.com/IBM/AssetOpsBench · https://arxiv.org/abs/2506.03828 |
| CHG-024 | 2026-08-17→20 | Events | MaximoWorld 2026, Nashville: 1,300+ registrations, theme "Agentic AI". Reliabilityweb survey: 73% of Maximo users plan to upgrade within a year | [IND] M | https://reliabilityweb.com/en/press-release/maximoworld-2026-spotlights-ai-powered-asset-management-in-nashville |
| CHG-025 | 2026-08-14 | Partners | **interloc.ai**, an agentic platform for Maximo (orchestrator + HITL; vendor claims) | [IND] M | https://www.prnewswire.com/news-releases/interloc-solutions-launches-interlocai-an-enterprise-agentic-ai-platform-built-specifically-for-ibm-maximo-302849196.html |
| CHG-012 | 2026-08-12 | AI product | IBM "Working smarter with agentic workflows in Maximo Assistant": a **Supervisor ALM agent** orchestrates tools (knowledge search, product-guidance RAG, data retrieval, condition insights) and write actions **through the Maximo MCP server** (WO status, follow-up WOs, SRs). "You will also be able to use any of your automation scripts as custom tools" (future tense, so announced, not shipped) | [IBM] H | https://www.ibm.com/think/perspectives/working-smarter-agentic-workflows-maximo-assistant |
| CHG-011 | 2026-06-25 | Release | **MAS 9.2 GA** (covered by the MAS-9-2 series and DOC15). Watch item: document abstraction is to extend beyond leases to "OEM maintenance manuals, inspection procedures…" | [IBM] H | https://www.ibm.com/new/announcements/introducing-maximo-application-suite-9-2 |
| CHG-026 | 2026-06-01 | Lifecycle | IBM refreshed its notice that **MAS dual support for EAM 7.6.1 ends 30 Apr 2027**. Perpetual trade-up customers lose the right to use EAM; subscription customers keep usage rights but lose support | [IND] M (IBM notice not read) | https://maxiron.com/insights/mas-dual-support-eam-7-6-1-ends-april-2027/ |
| CHG-027 | 2026-05-22 | Competitors | **Octave** spun off from Hexagon: HxGN EAM → Octave Attune EAM; the Alix assistant → Octave Aria | [IND] H | https://www.marketscreener.com/news/hexagon-ab-completed-the-spin-off-of-octave-intelligence-plc-ce7f5dddd18ffe25 |
| CHG-028 | 2026-05-20 | Analysts | Gartner publishes an **EAM Market Guide** (no Magic Quadrant since 2017) | [IND] H | https://ips-energy.com/resources/gartner-report/ |
| CHG-029 | 2026-05-05 | IBM platform | **Think 2026:** next-gen watsonx Orchestrate (an "agentic control plane"), with 150+ agents in the catalog but **no EAM/Maximo agents**. Bob GA, Sovereign Core GA, Confluent Tableflow→watsonx.data | [IBM] H | https://newsroom.ibm.com/2026-05-05-think-2026-ibm-delivers-the-blueprint-for-the-ai-operating-model-as-the-ai-divide-widens |
| CHG-004 | 2026-04-30 | Lifecycle | **MAS 8.10/8.11 → Extended Support** (to 30 Apr 2030, per [IND]). **8.7, 8.8, 8.9 out of support** (no Extended Support offered) | [IBM] H / [IND] M | https://www.ibm.com/support/pages/supported-versions-maximo-application-suite · https://maxiron.com/insights/ibm-mas-support-changes-april-2026/ |
| CHG-030 | 2026-04-29 | Models | **Granite 4.1** (dense 3B/8B/30B, 512K context; vision, speech, Guardian). Earlier, 2026-03-31: TSPulse r1, TTM-r3, FlowState r1.1 time-series refresh | [IBM] H / M | https://research.ibm.com/blog/granite-4-1-ai-foundation-models |
| CHG-031 | 2026-04-28 | Analysts | **Verdantix Green Quadrant APM 2026:** IBM is a Leader (with ABB, AVEVA, C3 AI, AspenTech, GE Vernova, Honeywell, SymphonyAI) | [IND] H | https://www.verdantix.com/venture/report/green-quadrant--asset-performance-management-apm-solutions-2026 |
| CHG-009 | 2026-03 | Roadmap | IBM MAS product-update deck (SWMUG): voice and computer vision for technicians, "digital teammate", **Maximo FSM** as a named offering, SAP connector→CPI, an Oracle Fusion connector, 66 T&D scoring models, Duval-triangle DGA, Weibull probability of failure, Spatial 3D/geofencing, OAuth2 SMTP. Forward-looking | [IBM deck] H | https://swmug.org/wp-content/uploads/2026/03/SWMUGP2603_IBM_MaximoApplicationSuiteProductUpdate.pdf |
| CHG-032 | 2026-03-17 | Acquisition | **IBM completes the Confluent acquisition.** No Maximo-specific tie-in announced; the Kafka/MIF angle is inference | [IBM] H | https://newsroom.ibm.com/2026-03-17-ibm-completes-acquisition-of-confluent,-making-real-time-data-the-engine-of-enterprise-ai-and-agents |
| CHG-033 | 2026-01-28 | REF | **TRIRIGA ordering ended.** Support ends 30 Sep 2027. MREF 9.2 migrates in place from TAP 3.5+ | [IBM] H | https://www.ibm.com/support/pages/maximo-real-estate-and-facilities-evolution-tririga |
| CHG-001 | 2026-09-30 | Lifecycle | **Maximo 7.6.1.x Extended Support ended.** Sustained Support to 30 Sep 2030 (requires 7.6.1.3 plus a migration plan; no new fixes). IBM's own MAM lifecycle page returned 404 | [IND] M | https://www.naviam.io/resources/blog/navigating-maximo-v-7-6-1-x-end-of-support · https://bluemountain.io/blog/maximo-761-support-timeline-four-dates |
| CHG-002 | (see CHG-026) | Lifecycle | Dual-support end date: 30 Apr 2027 | — | — |
| CHG-003 | (see CHG-018) | Lifecycle | MAS 9.0 base support end: 30 Jun 2027 | — | — |
| CHG-034 | 2026 (various) | Pricing | IBM pricing page: SaaS **Essentials / Standard / Premium**. Essentials has 6 options (Maintenance, Inspection, Space Management, Capital Planning, Lease Management, Inventory Optimization) at under US$40–47K/yr, with 140–175 starting AppPoints. Standard starts at 300 AppPoints. AWS in 9 regions. Launch date not found | [IBM] H (date L) | https://www.ibm.com/products/maximo/pricing |
| CHG-035 | 2026 (various) | Products | AIO is now **Asset Investment Planning (AIP, needs Optimizer) + Maintenance Cost Insights (MCI, Apptio-powered)**, both since 9.1. Collaborate (ex-Assist) ships monthly (9.1.15 on 29 Sep 2026). Spatial 9.1 needs full ArcGIS Enterprise (10.9.1–11.5) | [IBM] H | https://www.ibm.com/products/maximo/asset-lifecycle-plan · https://www.ibm.com/support/pages/ibm-maximo-application-suite-collaborate-component-91 |
| CHG-036 | 2025-08-13 | OT security | CISA/NSA "Foundations for OT Cybersecurity: Asset Inventory" guide recommends using the asset inventory for maintenance and reliability | [IND, gov] H | https://www.cisa.gov/sites/default/files/2025-08/joint-guide-foundations-for-OT-cybersecurity-asset-inventory-guidance_508c.pdf |
| CHG-037 | 2024→2027 | Standards | **ISO 55001:2024 transition deadline ~28–31 Jul 2027.** New clauses: 4.5 decision-making, 6.2.1 strategic asset management plan, 7.6 data & information, 7.7 knowledge, 10.3 predictive action | [IND, accreditation] H | https://www.ukas.com/resources/technical-bulletins/ams-transition-to-iso-550012024 |

---

## 3. Coverage Matrix

Status values: **COVERED** (dedicated series or post) · **PARTIAL** (overview or passing mentions) · **NOT COVERED** · **PLANNED** (queued). The 2026-10-16 audit covered 224 MDX files across 23 series folders plus 3 standalone posts.

| Area | Status | Existing coverage | Gap id |
|---|---|---|---|
| MAS 9.2 release content | COVERED (stale after 9.2.1) | MAS-9-2 (8), DOC15 | GAP-007 |
| Support lifecycle / end-of-support | **COVERED (drafts)** | MAS-LIFECYCLE (index + 4 parts, `draft: true`; covers pending). Re-check Part 1 against the CHG-041 Control Desk date conflict | GAP-001 (CLOSED) |
| Identity, SSO, MFA, SCIM, LDAP, CVE patching | PARTIAL (6 of 7 drafted) | MAS-SECURITY-OPS index + Parts 1–5 (drafts); Part 6 (agent security) `secops-06` pending; MAS-FEATURES "Security & Maps" | GAP-002 |
| Db2 on OpenShift, backup/DR, performance, observability | PLANNED | `MAS-PLATFORM-OPS` queued (9 items, status pending; no folder yet) | GAP-003 |
| Install/ops tooling (CLI, ansible-devops, GitOps, catalogs, OCP window) | PLANNED | `platops-01/07/08` queued; THINK-MAS architecture (conceptual only) | GAP-003 |
| Data loading (MxLoader, Data Import, Migration Manager) | PARTIAL | RELIABILITY "Populating the Spine", THINK-MAS "Data Migration" | GAP-004 |
| Automation scripts | PARTIAL | MAS-FEATURES "Customization Trinity", JAVA-EXTENSIONS | GAP-005 |
| Agentic Maximo (Assistant agents, MCP, AssetOpsBench, TSFM) | PARTIAL | MAS-9-2 Part 5, MAS-ASSIST, MAS-BOB, ENTERPRISE-VIBE-CODING | GAP-006 |
| TRIRIGA → Real Estate & Facilities | PARTIAL | MAS-FEATURES "Renewables, TRIRIGA & New Products" | GAP-008 |
| ISO 55001:2024 | **NOT COVERED** | — | GAP-009 |
| HSE / permit-to-work / LOTO | PARTIAL (mobile side drafted) | MAS-FEATURES HSE overview, NUCLEAR Clearance/Tagout; MAS-MOBILE Part 3 HSE incident and permit (draft) | GAP-010 |
| Hosting (SaaS tiers, ROSA, ARO, Dedicated) and pricing | PARTIAL | MAS-FEATURES licensing posts | GAP-011 |
| Spatial / ArcGIS 9.x | PARTIAL | MAS-FEATURES Security & Maps, Optimizer routing | GAP-012 |
| AIP + Maintenance Cost Insights | PARTIAL / NOT COVERED | passing mentions | GAP-013 |
| Utilities vegetation management, EV fleet | PARTIAL / NOT COVERED | MAS-FEATURES Industry Solutions | GAP-014 |
| OT cybersecurity × asset inventory | **NOT COVERED** | — | GAP-015 |
| Envizi / sustainability connector | PARTIAL | passing mentions | GAP-016 |
| Competitive & analyst landscape 2026 | **NOT COVERED** | — (new inputs: CHG-040 Naviam/Cohesive, CHG-043 IFS/ServiceNow) | GAP-017 |
| MAS 9.3 early signals | **NOT COVERED** | — | GAP-018 |
| Events (TechXchange, MaximoWorld) | **NOT COVERED** | — | GAP-019 |
| Maximo Mobile 9.2, app catalog | COVERED (drafts) | MAS-MOBILE Parts 1–3 drafted 2026-10-17 (covers pending); MANAGE Part 6 refreshed | — |
| MAF development | PLANNED | `MAS-MAF-DEV` queued 2026-10-16 (DOC17) | — |
| IBM Bob (coding agent) | COVERED | MAS-BOB (index + 5 parts, untracked drafts as of 2026-10-18) | — |
| Reporting (BIRT / Cognos / KPI Manager) | COVERED (correction needed, §7) | 2026-07-22 reporting options, WORK-ORDER-OPS | — |
| Scheduler, Optimizer, Health, Predict, Monitor, MVI, Nuclear, Civil, Supply chain, Integration, Java extensions, watsonx, Databricks, Bob | COVERED | dedicated series | — |
| Collaborate, Maximo IT, Service Provider, Renewables, Linear, ACM, Calibration | PARTIAL (low demand) | MAS-FEATURES overviews | GAP-020 |

---

## 4. Ranked Gaps

Score = demand × fit × freshness, each rated 1–5. A deadline counts as freshness.

| Rank | ID | Gap | Coverage | Demand | Fit | Fresh | Score | Status |
|---:|---|---|---|---:|---:|---:|---:|---|
| — | GAP-001 | Support-lifecycle cliff: 7.6.1 Extended Support ended, dual support ends Apr 2027, 9.0 base ends Jun 2027, 8.x status, perpetual vs subscription rights | COVERED | 5 | 5 | 5 | 125 | **CLOSED (2026-10-18, MAS-LIFECYCLE, drafts; covers pending)**. Follow-up: reconcile the Control Desk Dec 2026 conflict (CHG-041) |
| 1 | GAP-002 | Identity & security ops: SAML + MFA via IdP, SCIM from Entra/Okta, LDAP, API keys, 9.2 user-management changes, CVE-2026 patch posture | PARTIAL | 5 | 5 | 4 | 100 | Parts 0–5 drafted; `secops-06` pending. Add CVE-2026-15687 (CHG-039) to Part 5 |
| 2 | GAP-003 | Platform ops: Db2 12 upgrade (DT502701), Db2uInstance, backup/restore and DR (CLI scope limits, OADP/Kasten), Manage performance, Prometheus/Grafana/Instana, patch train and catalogs, OCP 4.18–4.22, GitOps | PLANNED | 4 | 5 | 5 | 100 | **QUEUED 2026-10-16** (`platops-*`, none written yet) |
| 3 | GAP-006 | Agentic Maximo: Supervisor ALM agent, MCP write actions, AssetOpsBench, Granite TSFM + Confluent streaming, trusted autonomy, partner agents | PARTIAL | 4 | 5 | 4 | 80 | PROPOSED §5.6 |
| 4 | GAP-007 | 9.2.x patch train & upgrade watch-list refresh (DT501598, CVE-2026-105052, version skew) | COVERED-stale | 4 | 5 | 4 | 80 | Fold into §5.3 Part 6 + §7 correction |
| 5 | GAP-004 | Data loading on MAS 9: MxLoader with API keys, Data Import, Migration Manager gotchas | PARTIAL | 5 | 5 | 3 | 75 | PROPOSED §5.4 |
| 6 | GAP-005 | Autoscript cookbook for Java 17/25, plus autoscripts as Assistant/MCP tools | PARTIAL | 5 | 5 | 3 | 75 | PROPOSED §5.5 |
| 7 | GAP-008 | TRIRIGA → MAS Real Estate & Facilities migration | PARTIAL | 4 | 4 | 4 | 64 | Candidate |
| 8 | GAP-019 | TechXchange 2026 preview and recap | NOT | 3 | 4 | 5 | 60 | **Quick win, now urgent**: the event starts 26 Oct. IBM's event page showed only general AI/developer highlights; no Maximo-specific announcement was found, so frame it as a session guide |
| 9 | GAP-009 | ISO 55001:2024 mapped onto Maximo | NOT | 3 | 4 | 4 | 48 | Candidate (executive tier) |
| 10 | GAP-011 | Hosting & buying guide: SaaS Essentials/Standard/Premium vs ROSA vs ARO vs Dedicated | PARTIAL | 4 | 4 | 3 | 48 | Candidate |
| 11 | GAP-010 | HSE deep dive beyond mobile: permits, LOTO, incidents in Manage | PARTIAL | 3 | 4 | 3 | 36 | Mobile side drafted (MAS-MOBILE Part 3); Manage-side deep dive still open |
| 12 | GAP-017 | Competitive & analyst landscape Q4 2026 (SAP Joule, IFS Loops, Octave, ServiceNow; Verdantix, IDC, Gartner) and partner consolidation (Naviam/Cohesive) | NOT | 3 | 4 | 3 | 36 | Candidate; folds into §5.6 Part 6 |
| 13 | GAP-012 | Spatial 9.x (ArcGIS Enterprise requirement, 3D/geofencing) | PARTIAL | 3 | 3 | 3 | 27 | Backlog |
| 14 | GAP-018 | MAS 9.3 first look from code signals | NOT | 2 | 4 | 3 | 24 | Watch (§8) |
| 15 | GAP-013 | AIP + Maintenance Cost Insights | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 16 | GAP-014 | Vegetation Management + EIS; EV fleet PMs | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 17 | GAP-015 | OT cybersecurity asset inventory (CISA 2025, IEC 62443) and EAM | NOT | 2 | 3 | 2 | 12 | Backlog (thought leadership) |
| 18 | GAP-016 | Envizi / sustainability connector how-to | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 19 | GAP-020 | Collaborate, Maximo IT, Service Provider, Renewables, Linear, ACM, Calibration deep dives | PARTIAL | 1 | 3 | 1 | 3 | Backlog |

---

## 5. Series Proposals for Top Gaps

All proposals are **PROPOSED — not queued**. Before queuing a series:
- Follow the Blog Depth Contract (3 research passes, a 3,800-word floor, ≥3 tables, 5 FAQs).
- Every post is `draft: true`.
- Check cover styles against the cover-style-per-series rule, so no two series share a look where avoidable.

### 5.1 `MAS-LIFECYCLE` — "The Maximo Support Cliff" (GAP-001) · priority: **urgent** · **QUEUED 2026-10-16; index + Parts 1–4 DRAFTED 2026-10-17** (covers pending)

`posts/MAS-LIFECYCLE/`. Index plus 4 parts. Tier: executive (P0, P1, P4) and admin (P2, P3). Cover: DanKoeStyle in the Warm Chalkboard variant (people thinking; deadline mood).

| Part | Title | Content | Sources |
|---:|---|---|---|
| 0 | The Maximo Support Cliff: Every Date That Matters, 2026–2031 | One timeline graphic, a "which row are you" table, and what to do this quarter | CHG-001/018/026/004 |
| 1 | Maximo 7.6.1 After Extended Support: What Sustained Support Does and Doesn't Cover | No fixes, the 7.6.1.3 requirement, security exposure, audit and insurance angle | CHG-001 |
| 2 | The 30 April 2027 Dual-Support Deadline: Perpetual vs Subscription Rights | Who loses the right to use EAM, contract checklist, how to confirm with IBM | CHG-026 |
| 3 | On MAS 8.x or 9.0? Your 2026–2027 Upgrade Clock | 8.7–8.9 unsupported, 8.10/8.11 Extended, 9.0 to Extended in Jun 2027; 9.1 vs 9.2 as the target | CHG-004, CHG-018, MAS-9-2 series |
| 4 | Building the Business Case Against the Clock | Cost of staying, risk register, phased plan, link to THINK-MAS migration playbook | all |

**Verify before drafting:**
- Dual-support date (30 Apr 2027) is now IBM-confirmed (CHG-041). The 30 Sep 2030 Sustained date is still [IND].
- Reconcile the Control Desk page (Sustained to 31 Dec 2026) with the Maximo 7.6.1 Sustained date before the posts are published.

### 5.2 `MAS-SECURITY-OPS` — Identity, Access & Patching (GAP-002, CHG-008/020) · priority: high · **QUEUED 2026-10-16; Parts 0–5 DRAFTED 2026-10-18** (Part 6 pending)

`posts/MAS-SECURITY-OPS/`. Index plus 6 parts. Tier: admin. Cover: BlueprintBoard.

| Part | Title | Content |
|---:|---|---|
| 0 | MAS Security Operations: Series Guide | Map of identity, access, patching |
| 1 | SAML SSO and MFA in MAS: Why MFA Lives in Your IdP | SAML setup, MFA only via a SAML IdP, external OIDC gap (IBM Manage FAQ), slow-login fixes |
| 2 | SCIM User and Group Sync from Entra ID and Okta | SCIM 2.0 (since 9.0), Entra gotchas (JWT from API key, group suffixes), DT434846 |
| 3 | LDAP, API Keys and Service Identities | LDAP sync, API key lifecycle, least privilege for integrations and AI agents (MCP) |
| 4 | MAS 9.2 User-Management Changes | Classic User app deprecated, AppPoint recalculation by security group, user-sync changes (verify; [IND] claims) |
| 5 | Patching as a Security Program: The 2026 CVE Year | CVE-2026-105052, CVE-2026-90920 (AI Service, CVSS 9.8), IoT DoS, monthly bulletin cadence, catalog-driven patching |
| 6 | Securing MAS for AI Agents | MCP auth flow (Core IdP token → Manage authz), scoping agent permissions, audit |

### 5.3 `MAS-PLATFORM-OPS` — Running MAS on OpenShift (GAP-003, GAP-007) · priority: high · **QUEUED 2026-10-16** (priority 3)

`posts/MAS-PLATFORM-OPS/`. Index plus 8 parts. Tier: admin/developer. Cover: InfoBlocks.

| Part | Title | Content |
|---:|---|---|
| 0 | MAS Platform Operations: Series Guide | Day-2 operations map — **WRITTEN 2026-10-20** (draft, cover pending) |
| 1 | The MAS Patch Train Explained: Catalogs, Interim Builds and Version Skew | Monthly catalogs, "reserved" numbers, Core vs Manage versions, how to read the releases page (CHG-005/006/007/008) |
| 2 | Db2 12 on OpenShift: The Upgrade Every 9.2 Shop Must Do | `mas update --db2-v12-upgrade`, licence file, Db2uInstance, DT502701 |
| 3 | Db2 Tuning for Maximo Manage | `db2_workload=maximo`, row tables, maxsequence cache, runstats/reorg (IBM Performance Wiki) |
| 4 | Backup, Restore and DR for MAS | CLI backup/restore scope (Manage + Facilities only), OADP, Kasten timings, Db2 backups, cross-cluster failover |
| 5 | Observability: Prometheus, Grafana and Instana for MAS | User-workload monitoring, 90-day retention, what to alert on |
| 6 | Manage Performance Tuning | Performance Wiki best practices, JVM/pod sizing, cron and integration load |
| 7 | Staying Inside the Support Window: OCP 4.18–4.22, CPD 5.3.1, MongoDB 8 | Upgrade sequencing, even-OCP rule for Predict/Collaborate (DOC15) |
| 8 | GitOps for MAS: ibm-mas/gitops, the CLI and ansible-devops | ArgoCD-managed MAS, air-gap, AWS RDS-Db2, PrivateLink |

### 5.4 `MAS-DATA-LOADING` — Getting Data Into MAS 9 (GAP-004) · priority: high

`posts/MAS-DATA-LOADING/`. Index plus 5 parts. Tier: developer/admin. Cover: SketchNote-like cheat-sheet energy, but in a style not used by MAS-BOB.

| Part | Title | Content |
|---:|---|---|
| 0 | Data Loading in MAS 9: Series Guide | Decision tree: MxLoader vs Data Import vs Migration Manager vs REST |
| 1 | MxLoader on MAS 9: API Keys, MXAPI Object Structures and the Locked OS-Auth Property | `mxe.int.enableosauth` locked; MXAPI* recommended; common errors (BMXAA8744E) |
| 2 | Loading Hierarchies and Attachments | Failure hierarchies (no MXL_FAILURELIST), doclinks, locations and assets in dependency order (link RELIABILITY "Populating the Spine") |
| 3 | Data Import and Bulk REST Loads | When to use Data Import vs bulk OSLC, throughput and error handling |
| 4 | Migration Manager for Configuration Transport | Packages, `mxe.dm.collvalictgtexclude`, what it can't move (MAF apps, see DOC17) |
| 5 | A Repeatable Load Factory | Templates, validation queries, rollback, audit trail |

### 5.5 `MAS-AUTOSCRIPTS` — The Automation Script Cookbook (GAP-005, CHG-012) · priority: high

`posts/MAS-AUTOSCRIPTS/`. Index plus 7 parts. Tier: developer. Cover: MarkerBoard is taken by MAF; use BlueprintBoard or DanKoeStyle. Promote TMG **Max_autoscripts** and **Max_Interfaces** (agent-neutral).

| Part | Title | Content |
|---:|---|---|
| 0 | Automation Scripts in MAS 9: The Cookbook | Launch points map; what changed with Java 17/25 |
| 1 | Scripting Best Practices IBM Actually Documents | No imported .py modules, bytecode caching, logging, performance |
| 2 | Java 17 and Java 25: What Breaks in Your Scripts | Reflection breakage, Nashorn vs Jython, migration checklist (link JAVA-EXTENSIONS) |
| 3 | Object and Attribute Launch Points: 12 Recipes | Validation, defaulting, cross-field rules |
| 4 | Integration Scripts: Publish Channels, Enterprise Services, REST | Inbound/outbound recipes, error handling |
| 5 | Scheduled and Action Scripts: Escalations, Cron, Workflow | Recipes and load safety |
| 6 | Testing, Deploying and Versioning Scripts | Dev→prod pipeline, Bob skills for script optimization/conversion (DOC16), code review |
| 7 | Autoscripts as AI Tools: Maximo Assistant and MCP | IBM's announced "automation scripts as custom tools", designing safe idempotent tools, MCP exposure (mark as announced) |

### 5.6 `MAS-AGENTIC` — Agentic Maximo in Practice (GAP-006) · priority: medium-high

`posts/MAS-AGENTIC/`. Index plus 6 parts. Tier: developer/executive. Distinct from MAS-ASSIST (feature tour) and MAS-BOB (coding agent).

| Part | Title | Content |
|---:|---|---|
| 0 | Agentic Maximo: Series Guide | From assistant to agents; the trusted-autonomy ladder (CHG-016) |
| 1 | Inside the Supervisor ALM Agent | Planning, tool catalog, MCP write actions, human-in-the-loop gates (CHG-012) |
| 2 | The MAS 9.2 MCP Server for External Agents | Auth (Core IdP → Manage), scoping, partner servers, build vs buy (CHG-025) |
| 3 | Benchmarking Maximo Agents with AssetOpsBench | Running scenarios against your own agent or MCP server (CHG-014) |
| 4 | Time-Series Foundation Models on Maximo Meter Data | TSPulse/TTM/FlowState; Confluent Cloud `AI_DETECT_ANOMALIES` vs Monitor/Predict (CHG-023/030) |
| 5 | Governing Autonomy: Permits, Criticality and Audit | Where agents must stop; AI Service CVE lesson (CHG-020) |
| 6 | The Agentic EAM Market in Q4 2026 | SAP Joule, IFS Loops, Octave Aria, ServiceNow Agent Fabric, Orchestrate catalog gap (CHG-019/027/029) |

### 5.7 Quick wins (standalone posts, no series)

| Post | Gap | Timing |
|---|---|---|
| "TechXchange 2026: The Maximo Sessions Worth Your Time" | GAP-019 | **Publish before Oct 26**; follow with a recap after Oct 29 |
| "MAS 9.3: What the Code Already Tells Us" | GAP-018 | After TechXchange, if no announcement contradicts the code signal |
| "ISO 55001:2024 and Maximo: A Clause-by-Clause Map" | GAP-009 | Q4 2026 (deadline Jul 2027) |

---

## 6. Changelog of This Document

| Date | Scan | Changes | New CHG | New GAP | Closed GAP |
|---|---|---|---|---|---|
| 2026-10-16 | Initial build (manual, 4 research agents + 224-title audit) | Created DOC00. User approved and queued §5.1–§5.3 (21 posts + 3 cover batches). Fixed MAS-FEATURES Part 5 (PWA error) and refreshed MANAGE Part 6 (9.2 section; removed the "Mobile Studio/JSON" error). Queued MAS-MOBILE (3) and MAS-MAF-DEV (10). Set up the weekly gap-scan | 37 | 20 | 0 |
| 2026-10-18 | Weekly scan #1 (web, GitHub APIs, IBM Support pages) | Quiet IBM week. Added CHG-038–043 (CLI 23.15.0/gitops, AI Service bulletin 15687, Naviam/Cohesive, IBM-confirmed dual support, industry patch levels, IFS/ServiceNow). Updated coverage for LIFECYCLE, MOBILE, SECURITY-OPS, PLATFORM-OPS. Re-ranked gaps. No new proposals | 6 | 0 | 1 (GAP-001) |

---

## 7. Corrections Backlog (Existing Posts)

| ID | Post | Issue | Status |
|---|---|---|---|
| COR-001 | `MAS-FEATURES/…-05-maximo-mobile.mdx` | Claimed Maximo Mobile is a browser PWA with no app store, apps "install independently", "MAF Configuration… Save" with no publish step, and an outdated app list | **FIXED 2026-10-16** (needs Sanity re-sync) |
| COR-002 | `MAS-MANAGE/…-06-maximo-mobile.mdx` | "JSON app definitions in Maximo Mobile Studio" (no such IBM product; MAF uses XML in Application Configuration); no 9.2 content | **FIXED 2026-10-16** (needs Sanity re-sync) |
| COR-003 | MAS-FEATURES "Integration & Reporting: … the End of BIRT in MAS 9" | Says BIRT reports must be recreated. 9.2 ships BIRT 4.21 and IBM docs (Mar 2026) still document BIRT | OPEN — fact-check and soften |
| COR-004 | `MAS-9-2/…-06-upgrade-watchlist.mdx` | Predates 9.2.1–9.2.8. Add DT501598 (MAXUSER overwrite) and CVE-2026-105052 | OPEN |
| COR-005 | THINK-MAS-07, MAS-FEATURES Part 23 | "MAF Configuration application" naming; add the 9.1 rename to Application Configuration | OPEN (low) |
| COR-006 | DOC15 MAS 9.2 factbase | Stops at 9.2.1 (12 Aug) | OPEN — extend with CHG-005–008 |

---

## 8. Watch List

Things to re-check on the next scan:

- **MAS 9.3:** announcement letter, Feature Channel listing, TechXchange news (CHG-010).
- **AI Service CVE-2026-90920:** IBM's own bulletin and fixed version. IBM's CVE-2026-15687 bulletin lists 9.1.19 / 9.2.3 (CHG-039); trackers quote the same for 90920 but this is not IBM-confirmed (CHG-020).
- **Naviam/Cohesive close** and any Bentley–Maximo integration news (CHG-040).
- **Manage 9.2.5 / Core 9.2.9 / catalog v9-261029** (scheduled 29 Oct): none found as of 18 Oct.
- **"Automation scripts as custom tools":** shipped or still future (CHG-012).
- **Asset-investment-planning agent:** promised by IBM Research for 2026; not shipped (CHG-012 context).
- **Document abstraction beyond leases** (OEM manuals, inspection procedures) (CHG-011).
- **Granite TSFM on Confluent Platform** (on-prem/hybrid) (CHG-023).
- **MAF Local Configuration:** Marketplace listing, beta.7+, and the offline-mirror documentation fix (DOC17).
- **IBM's 7.6.1 Sustained date:** dual support is confirmed (CHG-041); the 2030 Sustained date and the Control Desk Dec 2026 conflict are not.
- **Unverified 9.2 claims to confirm:** Spatial 3D/geofencing, user-sync removal, Collaborate becoming a Manage add-on, Maximo IT Self Serve.
- **IBM Docs access:** it returned 403 to automated fetches on 2026-10-16. If it persists, rely on IBM Support pages and GitHub.

---

## 9. References

Primary sources are listed inline in §2. Key hubs:

- IBM MAS releases information: https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0
- IBM MAS supported versions: https://www.ibm.com/support/pages/supported-versions-maximo-application-suite
- IBM MAS 9.0 lifecycle: https://www.ibm.com/support/pages/ibm-maximo-application-suite90x
- ibm-mas CLI catalogs: https://ibm-mas.github.io/cli/catalogs/ · CLI releases: https://github.com/ibm-mas/cli/releases · ansible-devops: https://github.com/ibm-mas/ansible-devops/releases · gitops: https://github.com/ibm-mas/gitops/releases
- MAS Performance Wiki: https://ibm-mas.github.io/mas-performance/
- IBM Maximo pricing: https://www.ibm.com/products/maximo/pricing
- IBM Think perspectives (Maximo AI): https://www.ibm.com/think/perspectives/working-smarter-agentic-workflows-maximo-assistant
- AssetOpsBench: https://github.com/IBM/AssetOpsBench
- Partner trackers: Interloc monthly security bulletins (https://www.interlocsolutions.com/blog/), MaxIron insights (https://maxiron.com/insights/), Naviam blog (https://www.naviam.io/resources/blog/)
- Raw research for this build: session scratchpad `news1/`, `news2/`, `news3/` (not committed)

**Related knowledge-base docs:** DOC15 (MAS 9.2 factbase), DOC16 (IBM Bob), DOC17 (MAF), DOC14 (watsonx), DOC1 (Manage upgrade).
