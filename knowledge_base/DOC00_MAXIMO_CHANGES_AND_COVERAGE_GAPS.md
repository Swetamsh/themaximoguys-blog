# DOC00 — Appendix: IBM Maximo Change Log & Blog Coverage Gaps (Living Document)

**Document:** DOC00. This is a living appendix to the knowledge base (DOC1–DOC17). It tracks two things: what changed at IBM (Maximo / MAS / related AI and platform), and which topics TheMaximoGuys blog does not cover yet.
**Created:** October 16, 2026
**Last scan:** 2026-11-22 (weekly scan #6; prior: 2026-11-15 scan #5, 2026-11-08 scan #4, 2026-11-01 scan #3, 2026-10-25 scan #2, 2026-10-18 scan #1, 2026-10-16 initial build)
**Next scan:** Sunday 2026-11-29, 23:10. It runs automatically every week (see "How this document is maintained").
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

**As of 2026-11-22 (scan #6).** **Correction to scans #1–#5: MAS 9.3 pre-release builds already exist.** IBM's releases page has a "MAS v9.3" table listing **October Feature Channel builds dated 29 Oct 2026** for Core (9.3.0-pre.stable.42567), Manage (operator 9.3.0-pre.stable-42796, Manage 9.3.45, **Graphite 4.0.253**), Optimizer, MVI, AI Service, Real Estate & Facilities, Monitor and Predict (CHG-064). The REF readme says the stack moves **Java 21 → Java 25, Jakarta EE 11, Spring upgrade, FIPS 140-3 for Oracle 19c**; the Predict API patch is also for Java 25 (CHG-065). Monitor 9.3 adds an `AlertByAtMostCount` rule; MVI 9.3 adds auto-label for classification models, mixed MIG mode and path-based routing (CHG-066). These are `-pre` feature-channel builds, not a GA announcement; no 9.3 announcement letter was found. The Core readme body says "29th October 2027" (a typo; the table says 2026). Nothing else new from IBM this week: no Core 9.2.11 / Manage 9.2.7 readme (catalog v9-261126 is still scheduled), no new CLI (23.21.0), ansible-devops (37.26.0), gitops (8.8.0) or MAF Local Configuration (beta.6) release (CHG-068). A single aggregator page says Bentley confirmed the **Naviam/Cohesive deal closed 13 Oct 2026** [UNVERIFIED] (CHG-067).

**Prior snapshot (2026-11-15, scan #5).** The quiet streak broke on the security side, and two "missing" readmes turned up. IBM's releases page lists **Core 9.2.9 and Manage 9.2.5 (29 Oct)** and **Core 9.2.10 and Manage 9.2.6 (5 Nov)**, so the scan #3/#4 note that no readme existed was wrong (CHG-058–060). The 5 Nov interim ships the fix for **CVE-2026-111497** (Node.js 24 / Brotli buffer overflow, CVSS 9.8, no workaround); IBM "strongly recommends" upgrading to Core 9.2.10 / 9.1.29 / 9.0.35 and Manage 9.2.6 / 9.1.27 / 9.0.34. Three more Manage bulletins (WebSphere/Db2 SSRF and request smuggling, third-party libraries) and a Monitor bulletin landed 2–3 Nov (CHG-061). Ops tooling: **ibm-mas/gitops 8.8.0 (10 Nov)** adds GitOps Db2 v11→v12 upgrade, allowlisting clean-up and S3/COS region for Manage (CHG-062); no new CLI (still 23.21.0) or ansible-devops (still 37.26.0). Still **no MAS 9.3 or Maximo-specific TechXchange news** and **no Naviam/Cohesive close announcement** (expected 30 Sep). On our side, AGENTIC-MAXIMO (index + 7 parts) and MAS-BOB Parts 6–9 are drafted (untracked).

**Prior snapshot (2026-11-08, scan #4).** Another quiet vendor week. No MAS 9.3 announcement, no Core 9.2.9 / Manage 9.2.5 readme and no Maximo-specific TechXchange news were found (searches only return older 9.2 and Think 2026 material). Movement is ops tooling again: CLI 23.20.0 / 23.20.1 / 23.21.0 and ansible-devops 37.26.0 (2–6 Nov) add RHOAI v3 for AI Service, Instana pod templates in GitOps, MCPI/CPI flags, NVIDIA GPU operator channel v26.3 and support for the **November interim catalog (v9-261105)** (CHG-055, CHG-056). The Naviam/Cohesive close is still unconfirmed. Prior-week context follows.

**Prior snapshot (2026-11-01, scan #3).** TechXchange (26–29 Oct) has ended and searches found **no Maximo-specific or MAS 9.3 announcement**. The only vendor movement was ops tooling: catalog v9-261029 support landed in CLI 23.18.0 / ansible-devops 37.25.0 (29 Oct), and CLI 23.19.0 added Db2 database-name flags to backup/restore. No Core 9.2.9 or Manage 9.2.5 readme was found (CHG-050, CHG-051). Competitor/market items are thin (CHG-052–054). Naviam/Cohesive closing is still unconfirmed. Details of the prior week follow for context.

**Prior snapshot (2026-10-25).** Another quiet vendor week: no MAS 9.3 announcement, no Manage 9.2.5 / Core 9.2.9 and no catalog newer than v9-261007 (the 29 Oct catalog is still ahead). The ops-tooling repos moved (CLI 23.16/23.17, ansible-devops 37.22/37.23), two more Manage security bulletins surfaced, and IBM's own withdrawal notice appears to settle the 7.6.1 Sustained Support date. On our side MAS-PLATFORM-OPS and MAS-SECURITY-OPS are now fully drafted.

### Top 5 headline changes

| # | Change | Why it matters to readers |
|---|---|---|
| 1 | **Maximo 7.6.1.x Extended Support ended 30 Sep 2026; IBM's withdrawal notice lists Extended/Sustained completion as 30 Sep 2030** (CHG-048, upgrades CHG-001). The Dec 2026 Sustained date belongs to the separate **Control Desk 7.6.1** product (successor: Maximo IT). Dual support under MAS ends 30 Apr 2027 (CHG-041) | The open date conflict from scan #1 is largely explained; MAS-LIFECYCLE Part 1 should say so |
| 2 | **MAS 9.0 base support ends 30 Jun 2027** (CHG-018); 8.10/8.11 are in Extended Support; 8.7–8.9 lost support 30 Apr 2026 (CHG-004) | 9.0 shops need a 9.1/9.2 plan inside 8 months |
| 3 | **CVE-2026-111497 (Node.js 24 / Brotli decoder, CVSS 9.8, no workaround)** is fixed in **Core 9.2.10 / 9.1.29 / 9.0.35 and Manage 9.2.6 / 9.1.27 / 9.0.34 (5 Nov)** (CHG-060). Same week: WebSphere/Db2 bulletins incl. CVE-2026-14529 SSRF (CVSS 9.4) and CVE-2026-15064 (CHG-061). Earlier: **Two more Manage security bulletins:** CVE-2026-71290 (httpclient5 async TLS hostname verification, CVSS 9.1; fixed in Manage 9.0.32 / 9.1.25 / 9.2.4) and CVE-2026-25526 (JinJava sandbox bypass, CVSS 9.8; fixed in 9.0.29 / 9.1.21 / 9.2.2) (CHG-045, CHG-046). Plus CVE-2026-105052 (CHG-008) | MAS-SECURITY-OPS Part 5 predates all of these (COR-007) |
| 4 | **Ops tooling (scan #5 update: ibm-mas/gitops 8.8.0 on 10 Nov adds Db2 v11→v12 GitOps upgrade, S3/COS region for Manage, catalog digests, allowlisting clean-up; CHG-062. Scan #4 update: CLI 23.20.0–23.21.0, ansible-devops 37.26.0, catalog v9-261105, RHOAI v3 for AI Service; CHG-055/056).** Earlier, scan #3: catalog **v9-261029** support is in CLI 23.18.0 and ansible-devops 37.25.0; CLI 23.19.0 adds `--manage-db2-dbname` / `--facilities-db2-dbname` to backup/restore and a configurable full-Db2-backup weekday in GitOps; ansible-devops 37.24.0 fixes a MongoDB backup that wrongly included data and enables OCP 4.22 in rotate (CHG-050, CHG-051). Earlier: CLI 23.16.0 adds GitOps Db2 v11→v12 upgrade support and CPD 5.4.0 helm changes; ansible-devops 37.22.0 adds CP4D 5.4.0 support and puts the password-policy secret in the suite backup; 37.23.0 adds COS region support (CHG-044) | Supports the PLATFORM-OPS Db2 12, backup and GitOps posts; CPD 5.4.0 moves the support-window post |
| 5a | **MAS 9.3 feature-channel pre-releases (29 Oct 2026) exist** (CHG-064–066): Java 25, Jakarta EE 11, Graphite 4.0.x, FIPS 140-3. Earlier "no 9.3 news" notes were wrong (readmes sit on IBM's releases page). Not GA; no announcement letter | Biggest freshness jump of the quarter. Java 25 affects autoscripts and Java extensions (GAP-005); GAP-018 is now a real series candidate (§5.9) |
| 5 | **The "missing" readmes exist:** Core 9.2.9 / Manage 9.2.5 (29 Oct; CPD 5.4.0, db2u-operator 120105.0.3, DT502990) and Core 9.2.10 / Manage 9.2.6 (5 Nov; catalog v9-261105) (CHG-058–060). TechXchange (26–29 Oct) is over; still no Maximo-specific or 9.3 announcement found. The IBM event page still mentions an Anthropic/Claude partnership and Bob, but no source dates it to 2026 (the only dated hit is Oct 2025) [UNVERIFIED] (CHG-047). MAS 9.2's AI bundle (AI Service, MCP server, Assistant, Condition Insight) is the current IBM message (CHG-049) | Refreshes GAP-007 (upgrade watch-list now two patch levels stale); GAP-019 stays demoted |

### Top gaps (open)

| Rank | Gap | Coverage | Proposal |
|---|---|---|---|
| 1 | GAP-007 / COR-004 9.2.x upgrade watch-list refresh (now Core 9.2.10 / Manage 9.2.6 + CVE-2026-111497) | PARTIAL | Correction COR-004 + §5.7 quick win |
| 2 | GAP-018 MAS 9.3 preview (Java 25, Jakarta EE 11, Graphite 4, FIPS 140-3); re-scored from Watch to rank 2 | NOT COVERED | §5.9 `MAS-9-3-PREVIEW` (new proposal) |
| 3 | GAP-004 / GAP-005 Data loading on MAS 9 and the autoscript cookbook (tied) | PARTIAL | §5.4 `MAS-DATA-LOADING`, §5.5 `MAS-AUTOSCRIPTS` |
| 4 | GAP-006 IBM-native agentic Maximo (Supervisor ALM agent, MCP server, AssetOpsBench, TSFM). DIY agent engineering is now drafted (AGENTIC-MAXIMO) | PARTIAL (narrowed) | §5.6 `MAS-AGENTIC` (refined, overlap noted) |
| 5 | GAP-008 TRIRIGA → MAS Real Estate & Facilities migration (TRIRIGA support ends 30 Sep 2027) | PARTIAL | §5.8 `MAS-TRIRIGA-MIGRATION` |
| 6 | GAP-021 Self-hosted AI Service ops (RHOAI v3, GPU operator) | NOT COVERED | Candidate (fell out of the top 5) |

**Closed or already queued (not gaps):**
- `MAS-LIFECYCLE` (index + 4 parts drafted 2026-10-17; GAP-001 CLOSED 2026-10-18; covers pending)
- `MAS-SECURITY-OPS` (index + 6 parts drafted; GAP-002 CLOSED 2026-10-25; covers pending)
- `MAS-PLATFORM-OPS` (index + 8 parts drafted by 2026-10-25; GAP-003 CLOSED; covers pending, nanobanana `API_KEY_INVALID` in headless runs)
- `MAS-BOB` (index + 9 parts; Parts 6–9 drafted 2026-11-10, untracked)
- `AGENTIC-MAXIMO` (index + 7 parts drafted 2026-11-10, untracked; DIY agent engineering: context engineering, harnesses, Pydantic AI, n8n, memory/RAG, evals, multi-agent/A2A)
- `MAS-MOBILE` (3 posts drafted 2026-10-17; covers pending)
- `MAS-MAF-DEV` (10 posts, from DOC17), pending in queue

---

## 2. Change Log (newest first)

Window for the initial build: Jan–Oct 2026, with emphasis on Jun–Oct. Scan #1 (2026-10-18) added CHG-038–CHG-043; scan #2 (2026-10-25) added CHG-044–CHG-049; scan #3 (2026-11-01) added CHG-050–CHG-054; scan #4 (2026-11-08) added CHG-055–CHG-057; scan #5 (2026-11-15) added CHG-058–CHG-063; scan #6 (2026-11-22) added CHG-064–CHG-068 at the top. CHG-010 is superseded in part by CHG-064 (9.3 pre-release builds exist). CHG-056 and CHG-051 are superseded in part by CHG-058–060 (their "no readme found" notes were wrong). CHG-026 is upgraded by CHG-041 (IBM-primary); CHG-001 is upgraded by CHG-048.

| ID | Date | Area | Change | Tag / Conf. | Source |
|---|---|---|---|---|---|
| CHG-068 | 2026-11-22 (verified) | Ops tooling | **No new releases since the 10 Nov scan window:** latest ibm-mas/cli 23.21.0 (6 Nov), ansible-devops 37.26.0 (6 Nov), gitops 8.8.0 (10 Nov), MAF Local Configuration v0.0.1-beta.6 (22 Sep). The CLI catalogs page lists v9-261029, v9-261105, **v9-261126** and v9-261224; no Core 9.2.11 / Manage 9.2.7 readme on IBM's releases page (latest Core 9.2.10, Manage 9.2.6, both 5 Nov). Search snippets mentioning a "Core 9.2.7" readme refer to the 29 Sep release | [IBM] H | https://github.com/ibm-mas/cli/releases · https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 |
| CHG-067 | 2026-10-13 (claimed) | Partners | An aggregator profile (yespress.io) reports **Bentley confirmed the Cohesive transaction closed 13 Oct 2026**, with Bentley receiving a Naviam equity interest and warrants. Closes the open watch item only if confirmed: no Bentley/Naviam release or second source found. Naviam also completed earlier ZNAPZ/Sharptree acquisitions (older) | [UNVERIFIED] | https://yespress.io/naviam · https://www.cohesivesolutions.com/resource/naviam-announces-definitive-agreement-to-acquire-cohesive-from-bentley-systems/ |
| CHG-066 | 2026-10-29 | Release (9.3 pre) | **Other 9.3 October Feature Channel readmes (read on IBM Support):** **AI Service 9.3.0** (security fixes, computing token for fieldextractor); **Monitor 9.3** (five CVE fixes; new `AlertByAtMostCount` rule for under-activity detection); **MVI 9.3.0-pre.stable_42617** (auto-label for classification models, mixed MIG mode, path-based routing); **Spatial 9.3** APAR list page exists (empty). Core readme also lists Predict, Optimizer, IoT, AI Service Tenant, ArcGIS builds and re-lists fixes such as DT502990. The Optimizer link on the table (7270113) resolves to the older April 9.2 readme, so Optimizer 9.3 content is unread | [IBM] H | https://www.ibm.com/support/pages/node/7294448 · https://www.ibm.com/support/pages/node/7294218 · https://www.ibm.com/support/pages/node/7294221 · https://www.ibm.com/support/pages/node/7294680 |
| CHG-065 | 2026-10-29 | Platform (9.3 pre) | **Java 25 / Jakarta EE 11 move.** REF 9.3.0-pre.stable_42788 readme: Java 21 → **Java 25**, FIPS 140-3 support for Oracle 19c, Spring upgrade, **Jakarta EE 11** across the runtime and codebase. **Predict API October 2026 patch** supports Java 25 (platform and dependency upgrades). Implication: customisations, Java extensions and autoscripts are likely to meet Java 25 and Jakarta namespace issues on 9.3; Manage-side Java level not stated in the page read | [IBM] H (REF, Predict) / L (implication) | https://www.ibm.com/support/pages/node/7294189 · https://www.ibm.com/support/pages/node/7294004 |
| CHG-064 | 2026-10-29 | MAS 9.3 | **MAS 9.3 pre-release feature-channel builds are published.** IBM's releases page has a "MAS v9.3" table (Core, Manage, Optimizer, MVI, AI Service, REF, Monitor, Predict; 29 Oct 2026). **Core 9.3.0-pre.stable.42567** (catalog v9 261029; body date reads "29th October 2027", a typo); **Manage operator 9.3.0-pre.stable-42796, Manage 9.3.45, Graphite 4.0.253** (9.2 used Graphite 3.2.x); industry patches e.g. HSE 9.3.13, O&G 9.3.13, Civil 9.3.7, Reliability Strategies 9.3.17, AIP 9.3.22, Health 9.3.5. Core adds Predict, Optimizer, Monitor, IoT, AI Service (Tenant), Facilities, ArcGIS and MVI 9.3 pre builds. **Not a GA announcement**; no letter or "what's new" for 9.3 found. Supersedes the "no 9.3" notes in scans #1–#5 and partly CHG-010 | [IBM] H | https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 · https://www.ibm.com/support/pages/node/7294633 · https://www.ibm.com/support/pages/node/7293290 |
| CHG-063 | 2026-11-09 | Competitors | **Octave introduces "Attune Facilities"** (AI-powered facilities management), per a syndicated press-release snippet dated 9 Nov. Release text was truncated; agentic scope unread. Facilities/IWMS angle is relevant to MAS Real Estate & Facilities (GAP-008) | [UNVERIFIED] | https://www.generation-nt.com/communiques-presse/octave-introduces-attune-facilities-bringing-ai-powered-facilities-2084192 |
| CHG-062 | 2026-11-10 | Ops tooling | **ibm-mas/gitops 8.8.0 (10 Nov)**, first release since 8.7.1 (16 Oct): **GitOps Db2 v11→v12 upgrade support**, configurable day of week for the full Db2 backup, S3/COS region configuration for the Manage workspace (MAXMF-8126), catalog image digest support, Instana agent pod-template YAML, allowlisting WAF-rule post-delete job and feature-status update, Facilities `ENCRLIB` db cfg fix (MASCORE-14903), db2u-audit CronJob fix for GovCloud, IC user-role post-sync job for RDS Db2 (Manage). **No new CLI (latest 23.21.0, 6 Nov), ansible-devops (latest 37.26.0, 6 Nov) or MAF Local Configuration (latest beta.6, 22 Sep) release this week** | [IBM] H | https://github.com/ibm-mas/gitops/releases/tag/8.8.0 · https://github.com/ibm-mas/cli/releases · https://github.com/ibm-mas/maf-local-dev-mode/releases |
| CHG-061 | 2026-11-02 → 11-03 | Security | **Four more IBM bulletins (read on the IBM page):** (a) WebSphere + Db2 in Manage (2 Nov): CVE-2026-15064 HTTP response smuggling (CVSS 8.7), CVE-2026-15328 request smuggling; (b) a second WebSphere bulletin (3 Nov): **CVE-2026-14529 SSRF via SIP container, CVSS 9.4**, CVE-2026-14980 CSRF→SSRF; (c) Manage third-party libraries (2 Nov), e.g. CVE-2026-112366 picomatch ReDoS (CVSS 7.5); (d) **Monitor** third-party libraries (3 Nov), e.g. CVE-2026-101910 (ip-address NAT64 `isPrivate`). Manage fix level: **9.2.5 / 9.1.26 / 9.0.33 or later**; Monitor fix: **9.2.5 / 9.1.16 / 9.0.26**. No workarounds listed. Full CVE lists were not read | [IBM] H | https://www.ibm.com/support/pages/node/7295114 · https://www.ibm.com/support/pages/node/7295293 · https://www.ibm.com/support/pages/node/7295113 · https://www.ibm.com/support/pages/node/7295332 |
| CHG-060 | 2026-11-05 → 11-09 | Release / security | **Core 9.2.10 (interim) and Manage 9.2.6 (5 Nov)**, catalog v9-261105. Fix **CVE-2026-111497**: Brotli decoder buffer overflow in Node.js 24 (CVSS 9.8, CWE-252; remote, unauthenticated; RHSA-2026:92378). IBM bulletins (9 Nov) say it affects MAS 9.0/9.1/9.2 and **strongly recommend upgrading now, no workarounds**: **Core 9.2.10 / 9.1.29 / 9.0.35**, **Manage 9.2.6 / 9.1.27 / 9.0.34** (affected Manage: 9.0.33, 9.1.26, 9.2.5). Core 9.2.10 adds IoT 9.2.6, Monitor 9.2.6, Manage 9.2.6, MVI 9.2.5, Optimizer 9.2.5, AI Service Tenant 9.2.5. Supersedes the "contents unread" note in CHG-056 | [IBM] H | https://www.ibm.com/support/pages/node/7295669 · https://www.ibm.com/support/pages/node/7295695 · https://www.ibm.com/support/pages/node/7295958 · https://www.ibm.com/support/pages/node/7295960 |
| CHG-059 | 2026-10-29 | Release | **Manage 9.2.5 (29 Oct)**: Manage 9.2.258, Graphite 3.2.907, about 54 DT/APAR ids listed (4 manual-change, 4 behavior-change and 2 database-change markers on the page), e.g. DT467957 (Technician labor entry hang on timezone mismatch), DT467420 (`/maximo/rest/os` 401 on MEA pods). Industry-solution levels: ACM 9.2.30, Aviation 9.2.19, Civil 9.2.66, HSE 9.2.45, Nuclear 9.2.16, O&G 9.2.45, Service Providers 9.2.25, Spatial 9.2.44, Transportation 9.2.21, Utilities 9.2.12, Reliability Strategies 9.2.48, Collaborate 9.2.50, AIP 9.2.122, Health 9.2.33, Maximo IT 9.2.51. Per the CHG-061 bulletins this is also the WebSphere/Db2 fix level | [IBM] H | https://www.ibm.com/support/pages/node/7294059 |
| CHG-058 | 2026-10-29 | Release | **Core 9.2.9 (29 Oct)**, catalog v9-261029: adds **CP4D 5.4.0** and **Db2 Universal Operator db2u-operator.v120105.0.3**; fixes **DT502990** (CoreIDP reconciles and restarts continuously when multiple OIDC configurations exist); base-image/Python security updates. Bundles Manage 9.2.5, IoT 9.2.5, Predict 9.2.3, Optimizer 9.2.4, Monitor 9.2.5, AI Service 9.2.4, REF 9.2.4, MVI 9.2.4. The IBM releases page also lists 9.2.4/9.2.5 as "reserved for internal use only" for Core. Supersedes the "no readme found" note in CHG-051 | [IBM] H | https://www.ibm.com/support/pages/node/7294037 · https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 |
| CHG-057 | 2026 (undated) | Compliance | An aggregator reports **IBM MAS has FedRAMP Moderate authorization on AWS GovCloud**. Undated; the IBM FedRAMP marketplace entry was not read. Do not publish until confirmed | [UNVERIFIED] | https://samsearch.co/government-contracting-news/ibms-maximo-suite-receives-fedramp-authorization-for-government-use-91908 |
| CHG-056 | 2026-11-05 → 11-06 | Release | **November interim catalog v9-261105** is listed on the ibm-mas CLI catalogs page (alongside scheduled v9-261126 and v9-261224) and wired into CLI 23.21.0 and ansible-devops 37.26.0 ("Support November Interim Catalog Update"). **[Superseded by CHG-058–060: Core 9.2.10 / Manage 9.2.6 readmes exist]** (originally: no readme found; catalog contents unread) | [IBM] H (catalog/CLI) / L (contents) | https://ibm-mas.github.io/cli/catalogs/ · https://github.com/ibm-mas/cli/releases/tag/23.21.0 |
| CHG-055 | 2026-11-02 → 11-06 | Ops tooling | **CLI 23.20.0 (2 Nov):** Instana agent pod-template YAML in GitOps, `install-cpi` flag and a `configure-mcpi` command, OpenSCAP/qemu fix. **23.20.1 (5 Nov):** AI Service **RHOAI v3** update logic, secrets removed from the must-gather annotation. **23.21.0 (6 Nov):** NVIDIA GPU operator default channel v26.3, Location Based Services FVT reorder, catalog v9-261105. **ansible-devops 37.26.0 (6 Nov):** Red Hat OpenShift AI v3 install support, dynamic GPU-operator channel by OCP version, DT506071 (db2u cluster version regex accepts `-cnN` suffix), defaultJMS bool fix, watsonx on-prem secret logic, verify_subscriptions fix. No new ibm-mas/gitops release since 8.7.1 (16 Oct) and no MAF Local Configuration release after beta.6 (22 Sep) | [IBM] H | https://github.com/ibm-mas/cli/releases · https://github.com/ibm-mas/ansible-devops/releases/tag/37.26.0 |
| CHG-054 | 2026-10-06 | Competitors | **ServiceNow "AI Workflow Factory"** reported globally available 6 Oct as a governance layer for native and third-party agents. General agent governance, **not EAM-specific**; found in one aggregator summary only. Related: ServiceNow Now Assist for EAM release notes exist (see CHG-043) | [UNVERIFIED] | https://techjacksolutions.com/ai-brief/servicenow-ibm-cxapp-enterprise-agentic-governance-48-hours/ · https://www.servicenow.com/docs/r/pt-BR/release-notes/now-assist-eam-rn.html |
| CHG-053 | 2026-09-09 | Competitors | **Verdantis rebrands as "the AI Super Agent for MRO"**: orchestrates nine specialised agents across maintenance-materials decisions and targets AI-native EAM. Spare-parts/MRO data angle relevant to MAS-SUPPLY-CHAIN | [IND] M (press release via Business Wire syndication) | https://via.ritzau.dk/pressemeddelelse/15148038/verdantis-rebrands-as-the-ai-super-agent-for-mro-sets-sights-on-ai-native-enterprise-asset-management?publisherId=90456 |
| CHG-052 | 2026 (date not found) | Analysts | **Octave named a Leader in an IDC MarketScape** for AI-enabled EAM (alongside IFS, CHG-043). Octave press release; date and the full vendor list not read. Alix assistant, now Octave Aria, first deployed 4Q24 | [IND] M | https://www.octave.com/newsroom/press-releases/2026/octave-named-leader-in-idc-marketscape |
| CHG-051 | 2026-10-29 | Release | **Catalog v9-261029** is listed on the ibm-mas CLI catalogs page and wired into CLI 23.18.0 ("Support October Catalog Update") and ansible-devops 37.25.0. **[Superseded by CHG-058/059: Core 9.2.9 and Manage 9.2.5 readmes exist, dated 29 Oct]** (originally: no readme found) | [IBM] H (catalog/CLI) / L (contents) | https://ibm-mas.github.io/cli/catalogs/ · https://github.com/ibm-mas/cli/releases/tag/23.18.0 |
| CHG-050 | 2026-10-27 → 10-30 | Ops tooling | **CLI 23.17.1 (27 Oct):** Scheduler MAXADMIN automation, base-ui-ivt Cypress test in Manage FVT. **23.18.0 / 23.18.1 (29 Oct):** October catalog support, dev-mode catalog fallback fix, S3-credential customization-archive secrets in GitOps. **23.19.0 (30 Oct):** `--manage-db2-dbname` and `--facilities-db2-dbname` for backup and restore pipelines (MASCORE-20519); GitOps can change the day of week for the full Db2 backup. **ansible-devops 37.24.0 (27 Oct):** MongoDB backup no longer wrongly includes data (MASISMIG-79375), OCP 4.22 enabled in rotate. **37.25.0 (29 Oct):** Watson OpenScale dependency and playbook references removed. **37.25.1 (30 Oct):** `db2u_image` for Db2u helm installs. No new ibm-mas/gitops release since 8.7.1 (16 Oct) and no MAF Local Configuration release after beta.6 | [IBM] H | https://github.com/ibm-mas/cli/releases · https://github.com/ibm-mas/ansible-devops/releases · https://github.com/ibm-mas/gitops/releases |
| CHG-049 | 2026-07-13 → 10-09 | AI product | IBM Community post (13 Jul) says the **Maximo 9.2 MCP server exposes business capabilities that agents can invoke, not raw REST endpoints**. An Arrow partner article (9 Oct) lists the MAS 9.2 AI bundle as AI Service + MCP server + Maximo Assistant + Condition Insight, with Manage staying the system of record. Consistent with CHG-012; nothing newly shipped | [IBM] M (community) / [IND] M (Arrow) | https://community.ibm.com/community/user/blogs/stefan-hoffmanns/2026/07/13/ibm-maximo-92-mcp-server-ai-integration · https://www.arrow.com//globalecs/na/arrow-channel-advisor/ibm-mas-partner-opportunities/ |
| CHG-048 | 2026-10-25 (verified; notice undated) | Lifecycle | **IBM's end-of-support notice lists Maximo Asset Management 7.6.1.x "Extended, Sustained, Extension availability" completing 30 Sep 2030**; Extended Support for 7.6.1.3 ends 30 Sep 2026; Sustained Support does not include new defect or security fixes. **IBM Control Desk 7.6.1 is a separate product**: Extended to 30 Sep 2026, Sustained to 31 Dec 2026, move to Maximo IT 9.x. This explains the scan #1 conflict (CHG-041). Read via search results, not the full page | [IBM] M | https://ibm.com/software/passportadvantage/endofsupportannouncementletters.html · https://www.ibm.com/support/pages/node/7044949 |
| CHG-047 | 2026-10-26→29 (upcoming) | Events | TechXchange 2026 (Atlanta) event page snippet highlights **an Anthropic–IBM partnership bringing Claude into IBM software, and Bob**. A second search found no Anthropic or Maximo-specific TechXchange 2026 announcement. Treat as unconfirmed until the keynote | [UNVERIFIED] | https://www.ibm.com/events/techxchange |
| CHG-046 | 2026-09-17 | Security | **CVE-2026-25526**: JinJava sandbox bypass in Manage, **CVSS 9.8**; fixed in Manage 9.0.29, 9.1.21, 9.2.2 or later. Bulletin page not pinned (appeared among IBM Support results; node id not confirmed) | [UNVERIFIED] (IBM page seen only via search summary) | https://www.ibm.com/support/pages/node/7290829 (search result set) |
| CHG-045 | 2026-10-05 | Security | **CVE-2026-71290**: Manage's Apache HttpComponents Client 5.4+ ignores `HostnameVerificationPolicy#BUILTIN` for the async client (TLS hostname verification bypass); CVSS 9.1 (CWE-295), classic HttpClient not affected. Affects Manage 9.0/9.1/9.2; fixed in **9.0.32 / 9.1.25 / 9.2.4**. IBM also has bulletins for MAS and AI Service bundling httpclient5-5.6.3 (fix 5.6.4+). The CVE-2026-105052 bulletin (3 Oct) lists 8.10, 8.11 and 9.0 as affected plus a temporary image-tag override until the October monthly update; CHG-008 lists wider versions, so reconcile before quoting | [IBM] M (via search summary) | https://www.ibm.com/support/pages/node/7290829 · https://www.ibm.com/support/pages/node/7290791 |
| CHG-044 | 2026-10-21 → 10-22 | Ops tooling | **CLI 23.16.0 (21 Oct):** CPD 5.4.0 helm changes, gitops-test-recorder Tekton task, **GitOps support for Db2 v11→v12 upgrade**, EBS storage-class support. **CLI 23.17.0 (22 Oct):** COS region support (bundles ansible-devops 37.23.0, python-devops 12.11.1). **ansible-devops 37.22.0 (21 Oct):** CP4D 5.4.0 support, optional disk size/EBS type for MongoDB Atlas, password-policy secret included in suite backup. **37.23.0 (22 Oct):** COS region, ODF add-on parameters, ArcGIS cluster role removed (MASCORE-14524), registry-allowlist and image-verification fixes. No new ibm-mas/gitops release since 16 Oct; no MAF Local Configuration release after beta.6 | [IBM] H | https://github.com/ibm-mas/cli/releases · https://github.com/ibm-mas/ansible-devops/releases |
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
| Identity, SSO, MFA, SCIM, LDAP, CVE patching | **COVERED (drafts)** | MAS-SECURITY-OPS index + Parts 1–6 (drafts; Part 6 = securing AI agents/MCP); MAS-FEATURES "Security & Maps". Part 5 needs CHG-045/046 and now CHG-060/061 (COR-007) | GAP-002 (CLOSED) |
| Db2 on OpenShift, backup/DR, performance, observability | **COVERED (drafts)** | MAS-PLATFORM-OPS index + Parts 1–8 (drafts; covers pending) | GAP-003 (CLOSED) |
| Install/ops tooling (CLI, ansible-devops, GitOps, catalogs, OCP window) | **COVERED (drafts)** | MAS-PLATFORM-OPS Parts 1, 7, 8; THINK-MAS architecture. CLI 23.16–23.21, ansible-devops 37.22–37.26, gitops 8.8.0, catalog v9-261105 and CPD 5.4.0 (CHG-044, CHG-050, CHG-055/056, CHG-058, CHG-062) postdate the drafts; Part 8 (GitOps) should cite gitops 8.8.0's Db2 v11→v12 support; Part 4 (backup/restore) should cite the 23.19.0 Db2 dbname flags and the 37.24.0 MongoDB backup fix | GAP-003 (CLOSED) |
| Data loading (MxLoader, Data Import, Migration Manager) | PARTIAL | RELIABILITY "Populating the Spine", THINK-MAS "Data Migration" | GAP-004 |
| Automation scripts | PARTIAL | MAS-FEATURES "Customization Trinity", JAVA-EXTENSIONS | GAP-005 |
| Agentic Maximo, IBM-native (Assistant agents, MCP, AssetOpsBench, TSFM) | PARTIAL | MAS-9-2 Part 5, MAS-ASSIST, MAS-BOB, ENTERPRISE-VIBE-CODING; AGENTIC-MAXIMO Part 7 touches Orchestrate/MCP gateways | GAP-006 |
| TRIRIGA → Real Estate & Facilities | PARTIAL | MAS-FEATURES "Renewables, TRIRIGA & New Products" | GAP-008 |
| ISO 55001:2024 | **NOT COVERED** | — | GAP-009 |
| HSE / permit-to-work / LOTO | PARTIAL (mobile side drafted) | MAS-FEATURES HSE overview, NUCLEAR Clearance/Tagout; MAS-MOBILE Part 3 HSE incident and permit (draft) | GAP-010 |
| Hosting (SaaS tiers, ROSA, ARO, Dedicated) and pricing | PARTIAL | MAS-FEATURES licensing posts | GAP-011 |
| Spatial / ArcGIS 9.x | PARTIAL | MAS-FEATURES Security & Maps, Optimizer routing | GAP-012 |
| AIP + Maintenance Cost Insights | PARTIAL / NOT COVERED | passing mentions | GAP-013 |
| Utilities vegetation management, EV fleet | PARTIAL / NOT COVERED | MAS-FEATURES Industry Solutions | GAP-014 |
| OT cybersecurity × asset inventory | **NOT COVERED** | — | GAP-015 |
| Envizi / sustainability connector | PARTIAL | passing mentions | GAP-016 |
| Self-hosted AI Service ops (RHOAI v3, NVIDIA GPU operator, watsonx on-prem) | **NOT COVERED** | MAS-PLATFORM-OPS and MAS-BOB do not cover AI Service infrastructure; MAS-WATSONX-DATA is data-side only | GAP-021 |
| Competitive & analyst landscape 2026 | **NOT COVERED** | — (new inputs: CHG-040 Naviam/Cohesive, CHG-043 IFS/ServiceNow, CHG-052 Octave IDC, CHG-053 Verdantis) | GAP-017 |
| MAS 9.3 early signals | **NOT COVERED** (signal now real: 9.3 pre-release feature-channel builds 29 Oct 2026, CHG-064–066) | — | GAP-018 |
| Events (TechXchange, MaximoWorld) | **NOT COVERED** | — | GAP-019 |
| Maximo Mobile 9.2, app catalog | COVERED (drafts) | MAS-MOBILE Parts 1–3 drafted 2026-10-17 (covers pending); MANAGE Part 6 refreshed | — |
| MAF development | **COVERED (drafts)** | `MAS-MAF-DEV` (10 posts, nightly commits through maf-09; DOC17) | — |
| IBM Bob (coding agent) | COVERED | MAS-BOB (index + Parts 1–9; Parts 6–9 house rules, hooks/MCP guardrails, Bob Shell in CI, premium packages/model router drafted 2026-11-10; untracked) | — |
| DIY agent engineering for Maximo (context engineering, harnesses, Pydantic AI, n8n prototyping, memory/RAG, evals, multi-agent/A2A) | **COVERED (drafts)** | AGENTIC-MAXIMO index + Parts 1–7 (drafted 2026-11-10; untracked; covers pending). New area discovered this scan | — |
| Reporting (BIRT / Cognos / KPI Manager) | COVERED (correction needed, §7) | 2026-07-22 reporting options, WORK-ORDER-OPS | — |
| Scheduler, Optimizer, Health, Predict, Monitor, MVI, Nuclear, Civil, Supply chain, Integration, Java extensions, watsonx, Databricks, Bob | COVERED | dedicated series | — |
| Collaborate, Maximo IT, Service Provider, Renewables, Linear, ACM, Calibration | PARTIAL (low demand) | MAS-FEATURES overviews | GAP-020 |

---

## 4. Ranked Gaps

Score = demand × fit × freshness, each rated 1–5. A deadline counts as freshness.

| Rank | ID | Gap | Coverage | Demand | Fit | Fresh | Score | Status |
|---:|---|---|---|---:|---:|---:|---:|---|
| — | GAP-001 | Support-lifecycle cliff: 7.6.1 Extended Support ended, dual support ends Apr 2027, 9.0 base ends Jun 2027, 8.x status, perpetual vs subscription rights | COVERED | 5 | 5 | 5 | 125 | **CLOSED (2026-10-18, MAS-LIFECYCLE, drafts; covers pending)**. Follow-up: reconcile the Control Desk Dec 2026 conflict (CHG-041) |
| — | GAP-002 | Identity & security ops: SAML + MFA via IdP, SCIM from Entra/Okta, LDAP, API keys, 9.2 user-management changes, CVE-2026 patch posture | COVERED | 5 | 5 | 4 | 100 | **CLOSED (2026-10-25, MAS-SECURITY-OPS, drafts; covers pending)**. Part 5 already cites CVE-2026-15687; add CHG-045/046 (COR-007) |
| — | GAP-003 | Platform ops: Db2 12 upgrade (DT502701), Db2uInstance, backup/restore and DR (CLI scope limits, OADP/Kasten), Manage performance, Prometheus/Grafana/Instana, patch train and catalogs, OCP 4.18–4.22, GitOps | COVERED | 4 | 5 | 5 | 100 | **CLOSED (2026-10-25, MAS-PLATFORM-OPS, index + Parts 1–8 drafted; covers pending)** |
| 1 | GAP-007 | 9.2.x patch train & upgrade watch-list refresh (DT501598, DT502990, CVE-2026-105052, CVE-2026-111497; Core 9.2.10 / Manage 9.2.6; version skew) | PARTIAL | 4 | 5 | 5 | 100 | PLATFORM-OPS Part 1 covers the patch train; the older upgrade watch-list post (COR-004) is two patch levels stale. Freshness 4→5 (CHG-058–060). Quick win §5.7 |
| 2 | GAP-018 | MAS 9.3 preview from IBM's own feature-channel readmes: Java 25, Jakarta EE 11, Graphite 4, FIPS 140-3, per-component 9.3 pre builds | NOT | 4 | 4 | 5 | 80 | PROPOSED §5.9 (re-scored 2026-11-22 from Watch: demand 2→4, freshness 3→5 after CHG-064–066) |
| 3 | GAP-004 | Data loading on MAS 9: MxLoader with API keys, Data Import, Migration Manager gotchas | PARTIAL | 5 | 5 | 3 | 75 | PROPOSED §5.4 |
| 4 | GAP-005 | Autoscript cookbook for Java 17/25, plus autoscripts as Assistant/MCP tools | PARTIAL | 5 | 5 | 3 | 75 | PROPOSED §5.5 |
| 5 | GAP-006 | Agentic Maximo: Supervisor ALM agent, MCP write actions, AssetOpsBench, Granite TSFM + Confluent streaming, trusted autonomy, partner agents | PARTIAL (narrowed) | 4 | 4 | 4 | 64 | PROPOSED §5.6, refined 2026-11-15. AGENTIC-MAXIMO (7 parts, drafted 2026-11-10) covers DIY agent engineering, so fit 5→4; IBM-native Supervisor/MCP/AssetOpsBench/TSFM remains open |
| 6 | GAP-008 | TRIRIGA → MAS Real Estate & Facilities migration | PARTIAL | 4 | 4 | 4 | 64 | PROPOSED §5.8 (new 2026-11-15) |
| 7 | GAP-009 | ISO 55001:2024 mapped onto Maximo | NOT | 3 | 4 | 4 | 48 | Candidate (executive tier) |
| 8 | GAP-011 | Hosting & buying guide: SaaS Essentials/Standard/Premium vs ROSA vs ARO vs Dedicated | PARTIAL | 4 | 4 | 3 | 48 | Candidate |
| 9 | GAP-021 | Self-hosted Maximo AI Service ops: RHOAI v3, NVIDIA GPU operator channels, watsonx on-prem secret, AI Service CVE patching | NOT | 3 | 4 | 4 | 48 | Candidate (admin tier); could fold into a MAS-PLATFORM-OPS Part 9. New 2026-11-08 |
| 10 | GAP-010 | HSE deep dive beyond mobile: permits, LOTO, incidents in Manage | PARTIAL | 3 | 4 | 3 | 36 | Mobile side drafted (MAS-MOBILE Part 3); Manage-side deep dive still open |
| 11 | GAP-017 | Competitive & analyst landscape Q4 2026 (SAP Joule, IFS Loops, Octave, ServiceNow; Verdantix, IDC, Gartner) and partner consolidation (Naviam/Cohesive) | NOT | 3 | 4 | 3 | 36 | Candidate; folds into §5.6 Part 6 |
| 12 | GAP-012 | Spatial 9.x (ArcGIS Enterprise requirement, 3D/geofencing) | PARTIAL | 3 | 3 | 3 | 27 | Backlog |
| 13 | GAP-019 | TechXchange 2026 preview and recap | NOT | 3 | 4 | 2 | 24 | **Event ended 29 Oct.** Three scans found no Maximo news (CHG-047 unverified); freshness re-scored 5→2. **Demoted: skip unless news emerges** |
| 14 | GAP-013 | AIP + Maintenance Cost Insights | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 15 | GAP-014 | Vegetation Management + EIS; EV fleet PMs | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 16 | GAP-015 | OT cybersecurity asset inventory (CISA 2025, IEC 62443) and EAM | NOT | 2 | 3 | 2 | 12 | Backlog (thought leadership) |
| 17 | GAP-016 | Envizi / sustainability connector how-to | PARTIAL | 2 | 3 | 2 | 12 | Backlog |
| 18 | GAP-020 | Collaborate, Maximo IT, Service Provider, Renewables, Linear, ACM, Calibration deep dives | PARTIAL | 1 | 3 | 1 | 3 | Backlog |

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

### 5.2 `MAS-SECURITY-OPS` — Identity, Access & Patching (GAP-002, CHG-008/020) · priority: high · **QUEUED 2026-10-16; Parts 0–6 DRAFTED** (complete as of 2026-10-25; covers pending)

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

### 5.3 `MAS-PLATFORM-OPS` — Running MAS on OpenShift (GAP-003, GAP-007) · priority: high · **QUEUED 2026-10-16; Parts 0–8 DRAFTED** (complete as of 2026-10-25; covers pending)

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

`posts/MAS-AGENTIC/`. Index plus 6 parts. Tier: developer/executive. Distinct from MAS-ASSIST (feature tour) and MAS-BOB (coding agent). **Refined 2026-11-15:** AGENTIC-MAXIMO (drafted 2026-11-10) already covers how to *build* agents (context engineering, harnesses, Pydantic AI, n8n, memory/RAG, evals, multi-agent/A2A). Keep this series strictly about **IBM-native** capability and market: skip any overlap with AGENTIC-MAXIMO Parts 5–7 (evals, memory, multi-agent), cross-link to them from Parts 3 and 5 instead, and consider trimming to Parts 0–4 plus 6 if IBM ships nothing new.

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
| "TechXchange 2026: The Maximo Sessions Worth Your Time" | GAP-019 | **Preview window closed 26 Oct; event ended 29 Oct.** Recap only if Maximo news appears (none found by 8 Nov; skip) |
| "MAS 9.3: What the Code Already Tells Us" | GAP-018 | **Superseded by §5.9** (IBM readmes now exist: Java 25, Jakarta EE 11, Graphite 4); write as a 9.3 pre-release post, not a code-signal post |
| "ISO 55001:2024 and Maximo: A Clause-by-Clause Map" | GAP-009 | Q4 2026 (deadline Jul 2027) |
| "MAS 9.2 Upgrade Watch-List, November 2026 Edition" (rewrite of COR-004: DT501598, DT502990, Core 9.2.10 / Manage 9.2.6, CVE-2026-105052 and CVE-2026-111497, Db2 12) | GAP-007 | Now: IBM says upgrade immediately for CVE-2026-111497 (CHG-060) |

### 5.8 `MAS-TRIRIGA-MIGRATION` — TRIRIGA to Maximo Real Estate & Facilities (GAP-008) · priority: medium · **PROPOSED — not queued** (added 2026-11-15)

`posts/MAS-TRIRIGA-MIGRATION/`. Index plus 4 parts. Tier: executive (P0, P1) and admin/developer (P2, P3, P4). Cover: Warm Chalkboard variant is taken by MAS-LIFECYCLE; use glossy 3D or isometric (not used by a facilities series yet). **Verify before drafting:** the only IBM-primary source so far is the Jan 2026 TRIRIGA evolution page (CHG-033); re-read it and the MREF 9.2 readmes (REF 9.2.4 ships with Core 9.2.9, CHG-058) before writing any migration step.

| Part | Title | Content | Sources |
|---:|---|---|---|
| 0 | TRIRIGA to MAS Real Estate & Facilities: Series Guide | Timeline (ordering ended 28 Jan 2026, support ends 30 Sep 2027), who should move and who should wait | CHG-033 |
| 1 | The TRIRIGA Support Cliff and What It Means for Your Contract | Support dates, licensing/AppPoints questions to put to IBM, link MAS-LIFECYCLE | CHG-033, CHG-034 |
| 2 | In-Place Migration From TRIRIGA Application Platform 3.5+ | Prerequisites, what migrates in place (per IBM), what does not, rehearsal plan | CHG-033, IBM MREF docs (to read) |
| 3 | Running REF on MAS: Db2, Facilities Components and GitOps | Facilities DB handling in backup/restore (CLI `--facilities-db2-dbname`) and GitOps (MREF schema name, db cfg fixes) | CHG-050, CHG-062 |
| 4 | Business Case and Cutover Checklist | Cost of staying, phased cutover, competitor facilities moves (Octave Attune Facilities, once verified) | CHG-063 [UNVERIFIED] |

### 5.9 `MAS-9-3-PREVIEW` — MAS 9.3 Pre-Release: What IBM's Readmes Already Say (GAP-018) · priority: medium-high · **PROPOSED — not queued** (added 2026-11-22)

`posts/MAS-9-3-PREVIEW/`. Index plus 3 parts (trim to 2 if IBM publishes nothing more before drafting). Tier: admin/developer. Cover: glossy 3D or isometric; avoid the Warm Chalkboard (MAS-LIFECYCLE) and Blueprint (watsonx, SECURITY-OPS) looks. **Verify before drafting:** re-read the Core, Manage, REF, Predict, Monitor and MVI 9.3 readmes (CHG-064–066); no announcement letter or "what's new" page for 9.3 was found, so label everything "pre-release feature channel", not GA; the Manage-side Java level is not stated in the pages read; the Core readme date typo (2027) must not be quoted.

| Part | Title | Content | Sources |
|---:|---|---|---|
| 0 | MAS 9.3 Pre-Release: Series Guide | What a `-pre.stable` feature-channel build is, which components have 9.3 builds, what is not known | CHG-064 |
| 1 | Java 25 and Jakarta EE 11: What Customisations and Autoscripts Should Test Now | REF and Predict Java 25 moves, Jakarta namespace risk, link JAVA-EXTENSIONS and §5.5 | CHG-065 |
| 2 | Graphite 4, Monitor `AlertByAtMostCount` and MVI Updates | Graphite 4.0.253 vs 3.2.x for MAF developers (link MAS-MAF-DEV), new Monitor rule, MVI auto-label and MIG | CHG-064, CHG-066 |
| 3 | Should You Touch a 9.3 Pre-Release? Upgrade-Path Reality Check | Feature channel vs stable, 9.2.x patch train, lifecycle clock (link MAS-LIFECYCLE, PLATFORM-OPS Part 1) | CHG-005, CHG-018, CHG-064 |

---

## 6. Changelog of This Document

| Date | Scan | Changes | New CHG | New GAP | Closed GAP |
|---|---|---|---|---|---|
| 2026-10-16 | Initial build (manual, 4 research agents + 224-title audit) | Created DOC00. User approved and queued §5.1–§5.3 (21 posts + 3 cover batches). Fixed MAS-FEATURES Part 5 (PWA error) and refreshed MANAGE Part 6 (9.2 section; removed the "Mobile Studio/JSON" error). Queued MAS-MOBILE (3) and MAS-MAF-DEV (10). Set up the weekly gap-scan | 37 | 20 | 0 |
| 2026-10-18 | Weekly scan #1 (web, GitHub APIs, IBM Support pages) | Quiet IBM week. Added CHG-038–043 (CLI 23.15.0/gitops, AI Service bulletin 15687, Naviam/Cohesive, IBM-confirmed dual support, industry patch levels, IFS/ServiceNow). Updated coverage for LIFECYCLE, MOBILE, SECURITY-OPS, PLATFORM-OPS. Re-ranked gaps. No new proposals | 6 | 0 | 1 (GAP-001) |
| 2026-10-25 | Weekly scan #2 (web search, GitHub APIs) | Quiet vendor week. Added CHG-044–049 (CLI 23.16/23.17 + ansible-devops 37.22/37.23, Manage CVE-2026-71290 and -25526, IBM 7.6.1 2030 notice resolving the Control Desk conflict, TechXchange claim [UNVERIFIED], MCP/AI bundle). GAP-002 and GAP-003 closed by drafted series. Re-ranked gaps; added COR-007. No new proposals | 6 | 0 | 2 (GAP-002, GAP-003) |
| 2026-11-01 | Weekly scan #3 (web search, GitHub APIs) | Quiet vendor week; TechXchange ended with no Maximo or 9.3 news found. Added CHG-050–054 (CLI 23.17.1–23.19.0, ansible-devops 37.24–37.25.1, catalog v9-261029, Octave IDC, Verdantis, ServiceNow [UNVERIFIED]). Core 9.2.9 / Manage 9.2.5 readmes not found. GAP-019 demoted to recap-only; Naviam/Cohesive close still unconfirmed. No new proposals | 5 | 0 | 0 |
| 2026-11-08 | Weekly scan #4 (web search, GitHub APIs) | Quiet vendor week; no 9.3, Core 9.2.9, Manage 9.2.5 or Maximo TechXchange news found. Added CHG-055–057 (CLI 23.20.0–23.21.0, ansible-devops 37.26.0, catalog v9-261105, FedRAMP claim [UNVERIFIED]). New GAP-021 (self-hosted AI Service ops). GAP-019 demoted (freshness 5→2). Re-ranked top-5 gaps. No new proposals | 3 | 1 | 0 |
| 2026-11-15 | Weekly scan #5 (web search, GitHub APIs, IBM Support pages read directly) | Security-heavy week. Found the Core 9.2.9 / Manage 9.2.5 (29 Oct) and Core 9.2.10 / Manage 9.2.6 (5 Nov) readmes that scans #3/#4 reported missing; superseded notes in CHG-051 and CHG-056. Added CHG-058–063 (releases, CVE-2026-111497 Node.js/Brotli CVSS 9.8, four more Manage/Monitor bulletins, gitops 8.8.0, Octave Attune Facilities [UNVERIFIED]). GAP-007 re-scored and now #1; GAP-006 narrowed by the drafted AGENTIC-MAXIMO series; new proposal §5.8 (GAP-008); refined §5.6; new quick win in §5.7; COR-004/007 expanded, COR-009 added. No MAS 9.3, TechXchange or Naviam/Cohesive close news | 6 | 0 | 0 |
| 2026-11-22 | Weekly scan #6 (web search, GitHub APIs, IBM Support pages read directly) | **Found that MAS 9.3 pre-release feature-channel builds (29 Oct 2026) are listed on IBM's releases page**; earlier scans' "no 9.3 news" was wrong. Added CHG-064–068 (9.3 builds incl. Manage 9.3.45 and Graphite 4.0.253, Java 25 / Jakarta EE 11 / FIPS 140-3, AI Service/Monitor/MVI 9.3 content, Naviam/Cohesive close claim [UNVERIFIED], no new tooling releases). GAP-018 re-scored and now rank 2; new proposal §5.9; §5.7 9.3 quick win superseded; GAP-021 dropped out of the top 5. No Core 9.2.11 / Manage 9.2.7, no TechXchange or Maximo agentic announcement found | 5 | 0 | 0 |

---

## 7. Corrections Backlog (Existing Posts)

| ID | Post | Issue | Status |
|---|---|---|---|
| COR-001 | `MAS-FEATURES/…-05-maximo-mobile.mdx` | Claimed Maximo Mobile is a browser PWA with no app store, apps "install independently", "MAF Configuration… Save" with no publish step, and an outdated app list | **FIXED 2026-10-16** (needs Sanity re-sync) |
| COR-002 | `MAS-MANAGE/…-06-maximo-mobile.mdx` | "JSON app definitions in Maximo Mobile Studio" (no such IBM product; MAF uses XML in Application Configuration); no 9.2 content | **FIXED 2026-10-16** (needs Sanity re-sync) |
| COR-003 | MAS-FEATURES "Integration & Reporting: … the End of BIRT in MAS 9" | Says BIRT reports must be recreated. 9.2 ships BIRT 4.21 and IBM docs (Mar 2026) still document BIRT | OPEN — fact-check and soften |
| COR-004 | `MAS-9-2/…-06-upgrade-watchlist.mdx` | Predates 9.2.1–9.2.10. Add DT501598 (MAXUSER overwrite), DT502990 (CoreIDP restart loop with multiple OIDC configs, fixed in Core 9.2.9), CVE-2026-105052 and CVE-2026-111497 (fixed in Core 9.2.10 / Manage 9.2.6) | OPEN |
| COR-005 | THINK-MAS-07, MAS-FEATURES Part 23 | "MAF Configuration application" naming; add the 9.1 rename to Application Configuration | OPEN (low) |
| COR-007 | `MAS-SECURITY-OPS/…-05-cve-patching-2026.mdx` | Predates CVE-2026-71290 (CVSS 9.1), CVE-2026-25526 (CVSS 9.8, still [UNVERIFIED] bulletin), **CVE-2026-111497 (CVSS 9.8, IBM-confirmed 9 Nov, CHG-060)** and the WebSphere SSRF/smuggling bulletins (CHG-061); add after confirming IBM pages | OPEN |
| COR-008 | `MAS-LIFECYCLE/…-01-761-sustained-support.mdx` | Mentions Control Desk; state that Control Desk 7.6.1 (Sustained to 31 Dec 2026) is a separate product from Maximo Asset Management 7.6.1 (to 30 Sep 2030, CHG-048) | OPEN |
| COR-006 | DOC15 MAS 9.2 factbase | Stops at 9.2.1 (12 Aug) | OPEN — extend with CHG-005–008 and CHG-058–060 |
| COR-009 | `MAS-PLATFORM-OPS` Parts 1, 7, 8 and `MAS-LIFECYCLE` Part 3 | Latest-version references stop at Core 9.2.8 / Manage 9.2.4 (7 Oct / 29 Sep). Check and update to Core 9.2.10 / Manage 9.2.6, catalog v9-261105, CPD 5.4.0 and gitops 8.8.0 | OPEN (check) |

---

## 8. Watch List

Things to re-check on the next scan:

- **MAS 9.3:** pre-release builds exist (CHG-064); watch for an announcement letter, a "what's new" page, a GA date, the Manage Java level, Optimizer 9.3 content and the November feature-channel builds (expected around 26 Nov with catalog v9-261126).
- **AI Service CVE-2026-90920:** IBM's own bulletin and fixed version. IBM's CVE-2026-15687 bulletin lists 9.1.19 / 9.2.3 (CHG-039); trackers quote the same for 90920 but this is not IBM-confirmed (CHG-020).
- **TechXchange 2026 (26–29 Oct, ended):** any late Maximo/9.3 news, and whether the Anthropic–Claude/Bob claim (CHG-047) is real.
- **Naviam/Cohesive close** and any Bentley–Maximo integration news (CHG-040). One aggregator says it closed 13 Oct (CHG-067, [UNVERIFIED]); find Bentley or Naviam primary confirmation.
- **Next catalog v9-261126 (scheduled):** expect Core 9.2.11 / Manage 9.2.7 or similar; check IBM's releases page directly. Core 9.2.9/9.2.10 and Manage 9.2.5/9.2.6 are now confirmed (CHG-058–060).
- **CVE-2026-111497 follow-ups:** whether IBM adds a separate AI Service or Predict bulletin, and whether the Red Hat fix (RHSA-2026:92378) is also needed on 8.10/8.11 (not listed as affected).
- **FedRAMP Moderate on AWS GovCloud:** confirm on the FedRAMP marketplace and date it (CHG-057).
- **"Automation scripts as custom tools":** shipped or still future (CHG-012).
- **Asset-investment-planning agent:** promised by IBM Research for 2026; not shipped (CHG-012 context).
- **Document abstraction beyond leases** (OEM manuals, inspection procedures) (CHG-011).
- **Granite TSFM on Confluent Platform** (on-prem/hybrid) (CHG-023).
- **MAF Local Configuration:** Marketplace listing, beta.7+, and the offline-mirror documentation fix (DOC17).
- **IBM's 7.6.1 Sustained date:** dual support is confirmed (CHG-041); the 2030 date now appears on IBM's notice and the Control Desk Dec 2026 date is a separate product (CHG-048); read the full notice page to confirm.
- **Maximo AI Service component dates:** one search snippet says AI Service 9.2.0 shipped 29 Jan 2026 with a model swap to gpt-oss-120b; conflicts with MAS 9.2 GA of 25 Jun, so [UNVERIFIED] and not logged.
- **CVE-2026-25526 bulletin:** pin the IBM page (CHG-046).
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
