# DOC15 — MAS 9.2 Release Fact Base

**Compiled:** 2026-08-12
**Purpose:** Single sourced fact base behind the `MAS-9-2` blog series. Every factual claim in
those posts must cite an ID from this document. No ID, no claim.

## Method and honesty notes

Research was primary-source-first. IBM Documentation is a JavaScript SPA and returns HTTP 403 to
ordinary fetchers, so pages were pulled through IBM's own content API
(`https://www.ibm.com/docs/api/v1/content/<doc-path>`) with a browser user-agent and cached
locally under `knowledge_base/MAS92-SOURCES/` (`raw/` = HTML, `text/` = extracted text, plus
`harvest.py` to refresh). Anything marked CONFIRMED below was read from that cached primary text.

`PERPLEXITY_API_KEY` was empty, so the Perplexity leg of the requested research was replaced by
direct primary-source fetching plus WebSearch scoped to `ibm.com`. For version facts this is the
stronger method, since it reads IBM rather than a summariser of IBM.

**Confidence levels:** CONFIRMED = read directly from a cached primary IBM page. REPORTED =
secondary source only. UNCONFIRMED = could not verify; must not be asserted in a post.

---

## 1. Release identity and dates

| ID | Fact | Confidence |
|---|---|---|
| REL-01 | IBM publicly announced Maximo Application Suite 9.2 in a post published **25 June 2026**, authored by Kendra DeKeyrel, VP Asset Lifecycle Management Product Engineering. Source: https://www.ibm.com/new/announcements/introducing-maximo-application-suite-9-2 | CONFIRMED |
| REL-02 | IBM promoted a MAS 9.2 webinar for **30 June 2026**. Same source as REL-01. | CONFIRMED |
| REL-03 | The announcement frames 9.2 around "asset-first AI" — embedding AI into reliability, maintenance, field service, safety and operations workflows, plus "agentic workflows". Same source. | CONFIRMED |
| REL-04 | From version 9.0 onward the MAS lifecycle policy changed to **Support Cycle-3: "3 years of support with critical fix extension of 1 year and usage and existing fixes for 3 (3+1+3)"**. Source: https://www.ibm.com/support/pages/ibm-maximo-application-suite90x and .../ibm-maximo-application-suite91x | CONFIRMED |
| REL-05 | **CORRECTED 2026-08-12 — supersedes an earlier UNCONFIRMED entry in this document.** The lifecycle dates *are* published and *are* present in the fetched HTML; an initial extraction pass missed them because IBM renders dates as `25-Jun-2024`, which the first regex did not match. The full published record, all from `https://www.ibm.com/support/pages/ibm-maximo-application-suite9Nx` (PID 5737-M66, International Program License Agreement, lifecycle policy Support Cycle-3 3+1+3): see REL-05a/b/c below. | CONFIRMED |
| REL-05a | **MAS 9.0.x** — General Availability **25-Jun-2024** (announcement letter **AD24-0483**); Transition to Extended/Sustained or End of Support **30-Jun-2027** (announcement letter **AD26-0622**, Extended Support); Completion of Extended, Sustained, Extension availability **30-Jun-2031**. Source: https://www.ibm.com/support/pages/ibm-maximo-application-suite90x | CONFIRMED |
| REL-05b | **MAS 9.1.x** — General Availability **24-Jun-2025** (announcement letter **AD25-1186**). **No transition/EOS date and no extended-completion date are published.** Page last updated 13-Feb-2026. Source: https://www.ibm.com/support/pages/ibm-maximo-application-suite91x | CONFIRMED |
| REL-05c | **MAS 9.2.x** — General Availability **25-Jun-2026** (announcement letter **AD26-0673**). **No transition/EOS date published.** Source: https://www.ibm.com/support/pages/ibm-maximo-application-suite92x | CONFIRMED |
| REL-05d | The 9.0 record independently validates the Cycle-3 shape: GA Jun-2024 → transition Jun-2027 is exactly three years, and extended completion Jun-2031 is four years beyond that. It also confirms IBM publishes the transition date via a *later* announcement letter (AD26-0622 in 2026 for a 2027 date), which is why 9.1 and 9.2 have GA dates but no transition dates yet. | CONFIRMED |
| REL-06 | MAS 8.11-LTS: GA 26 Sep 2023, announcement letter 223-0230, Fix Availability Completion **30 Apr 2026**, Extended Support available from 30 Apr 2026. Source: https://www.ibm.com/support/pages/supported-versions-maximo-application-suite (page current as of 1 May 2026) | CONFIRMED |
| REL-07 | MAS 8.10-LTS: GA 28 Mar 2023, announcement letter 223-043, Fix Availability Completion **30 Apr 2026**, Extended Support available from 30 Apr 2026. Same source. | CONFIRMED |
| REL-08 | MAS 8.9-CD, 8.8-CD and 8.7-CD all reached **Completion of Support 30 Apr 2026**. Same source. | CONFIRMED |
| REL-09 | The "Supported Versions" page as of 1 May 2026 lists only 8.11-LTS and 8.10-LTS under Supported Versions; 9.0, 9.1 and 9.2 are not enumerated there. This is an absence of listing, not evidence they are unsupported. | CONFIRMED |
| REL-10 | **CORRECTED 2026-08-12 — now confirmed, superseding an earlier UNCONFIRMED entry.** MAS 9.0 GA 25-Jun-2024, MAS 9.1 GA 24-Jun-2025, MAS 9.2 GA 25-Jun-2026 — all read from IBM product lifecycle pages (REL-05a/b/c). The annual late-June cadence is real and now evidenced across three consecutive releases. | CONFIRMED |
| REL-13 | **MAS 9.2.1 was released 30 July 2026** — a point release across MAS Core, Manage, Maximo Optimizer, MVI, AI Service, Real Estate and Facilities, and Monitor/IoT. As of 12 August 2026 this is the current 9.2 level, not 9.2.0. Source: https://www.ibm.com/support/pages/maximo-application-suite-releases-information-0 (cached `releases-info.txt`) | CONFIRMED |
| REL-14 | **The 9.2 Feature Channel ran for roughly nine months BEFORE 9.2.0 GA.** Under IBM's "MAS v9.2" release heading, monthly Feature Channel builds are listed from a September release (published 6 October 2025) through October (30 Oct 2025), November (27 Nov 2025), December (24 Dec 2025), January (29 Jan 2026), February (26 Feb 2026), March (26 Mar 2026) and April (30 Apr 2026), before "9.2.0 and June Feature Channel" on 25 June 2026. Same source. | CONFIRMED |
| REL-15 | REL-14 is strong circumstantial support for the REL-12 interpretation: a channel that ships "9.2" content for nine months prior to 9.2.0 general availability is functioning as a pre-GA / evaluation stream, not as an early-GA production stream. **This remains inference, not an IBM statement** — it strengthens the case but does not close GAP-03. | REPORTED (inference) |
| REL-11 | MAS 9.2 has a **monthly "Feature Channel" (FC) release cadence** alongside the base release — IBM Support publishes readmes such as "Maximo Application Suite 9.2.x — Feature Channel September/October/November Release". Source: IBM Support search results, e.g. https://www.ibm.com/support/pages/readme-file-maximo-application-suite-92x-feature-channel-november-release | REPORTED |
| REL-12 | **CORRECTED 2026-08-12 — now CONFIRMED, superseding an earlier UNCONFIRMED entry.** IBM states the Feature Channel's production status explicitly, in two places. (1) The Software Support Lifecycle Policy for Versions 9.0+ page, under a "Feature Channel Subscription" heading: *"IBM provides non-production components exclusively through a continuous delivery (CD) stream know [sic] as Feature Channel. Delivered as part of our regular Operator Catalog updates, this channel introduces new features, developed for the next release, allowing early access for non-production environments. This is offered alongside and in parallel with our normal maintained releases."* Source: https://www.ibm.com/support/pages/ibm-maximo-application-suite-software-support-lifecycle-policy-versions-90 (cached `lifecycle-90plus.txt` line 34, page modified 20 May 2025). (2) The Feature Channel what's-new topic opens: *"Learn more about what's new in the feature channel for nonproduction instances of Maximo Application Suite and for production instances of Maximo Application Suite as a Service."* Source: https://www.ibm.com/docs/en/masv-and-l/cd?topic=new-in-maximo-application-suite-feature-channel (cached `feature-channel-whats-new.txt`). | CONFIRMED |
| REL-12a | **The split that matters:** for **customer-managed (self-hosted)** MAS, the Feature Channel is **non-production only**. For **MAS as a Service (SaaS)**, Feature Channel content is usable in production, because IBM operates the environment. Any advice about the Feature Channel must state which deployment model it applies to. | CONFIRMED |
| REL-12b | Feature Channel content is *"developed for the next release"* — it is a pre-release preview stream, not a post-GA production update train. This converts REL-15's inference into IBM's own stated design. The June 2026 entry confirms the graduation path: features previewed in the channel before June 2026 became production-available at 9.2 GA. | CONFIRMED |

## 2. Platform, installation and upgrade (MAS 9.2)

Source for all of section 2 unless noted: https://www.ibm.com/docs/en/masv-and-l/cd?topic=new-whats-in-maximo-application-suite-92 — cached at `MAS92-SOURCES/text/mas-92-whats-new.txt`, accessed 2026-08-12. All CONFIRMED.

| ID | Fact |
|---|---|
| PLAT-01 | **Db2 12 is supported in MAS 9.2.** Upgrading Db2 11 to 12 **requires explicit opt-in and an activation license**; without it Db2 12 runs under a **30-day trial licence that causes production system outages on expiration**. |
| PLAT-02 | IBM Cloud Pak for Data 5.2 can be installed with MAS 9.2. MAS components use **Python 3.12** with CP4D 5.2. |
| PLAT-03 | Multi-architecture support extended: **IBM LinuxONE (s390x)** for Maximo IT 9.2, Asset Configuration Manager 9.2, HSE 9.2, Health 9.2, Aviation 9.2, Reliability Strategies 9.2; **IBM Power (ppc64le)** for Maximo IT 9.1/9.2, ACM 9.1/9.2, Reliability Strategies 9.2, HSE 9.2, Aviation 9.2, Health 9.2. |
| PLAT-04 | The published multi-arch section carries an **unresolved internal editorial placeholder** stating the support list was still being cross-checked with a development lead and that per-IS/AO multi-arch delivery is completed "for each monthly FC release". Evidence that add-on architecture parity was still in flux at GA. *(Editorial note: the placeholder names IBM individuals — do not reproduce names in any published post; use only the substantive point.)* |
| PLAT-05 | Three **administrative permission modes** at install: cluster, namespaced, minimal. Installing the operator from OperatorHub yields no additional ClusterRoles or nonessential namespace-scoped roles, and defaults to **minimal mode**. |
| PLAT-06 | **The administrative permission mode cannot be modified during upgrade.** Upgrading 9.1 → 9.2 with the `mas upgrade` CLI automatically sets **cluster mode**, inherited from the 9.1 configuration. |
| PLAT-07 | **User authentication changes 9.1 → 9.2:** user and group data is stored in the Maximo Manage relational database, eliminating duplicated user data and the synchronisation process between suite applications. Before upgrading, review changes to **password migration and SCIM synchronisation** to ensure users can still access the system. Migration is automatic. |
| PLAT-08 | **Breaking:** user and group management APIs deprecated in MAS 9.1 are **removed in 9.2**. Replacement is the newer user management APIs. |
| PLAT-09 | **Breaking:** starting in 9.2, **user synchronisation is removed for all applications**; user and group data lives exclusively in the system relational database. |
| PLAT-10 | New **Cluster Performance Insights (CPI) dashboard** for customer-managed environments, to collect and analyse cluster performance data. |
| PLAT-11 | New **AppPoints usage dashboard** — real-time licence usage tracking across applications, users and time periods. |
| PLAT-12 | Manage **user settings and purchasing options** move to the suite Users page (Suite > Access and usage > Users): default site, display-filter default site, storeroom site and default storeroom for self-service requisitions, default repair facility, repair facility site, access to inactive sites; plus GL-account-based purchase permission. |
| PLAT-13 | Security groups **Sites tab** and **Object structures tab**, originally in Manage's Security Groups application, are now in suite security (Suite > Access and usage > Security groups). |
| PLAT-14 | New **entitlement model for cloned and custom applications**, so they operate inside the standard security, access and licensing framework. |
| PLAT-15 | **Electronic signature can validate against LDAP credentials** instead of local application passwords. |
| PLAT-16 | **Multiple identity providers of the same authentication type** (LDAP, SAML, OIDC) can now be configured in the UI; previously API/CLI only. |
| PLAT-17 | **JWT expiry** can now exceed 90 days or be set to never expire (e.g. `mas-jwt-expiry-duration: P100Y` or `NEVER`). |
| PLAT-18 | **SMTP OAuth2 authentication** for outbound email. |
| PLAT-19 | System event email templates configurable in the UI. **After upgrading to 9.2 you must manually reapply any customised email templates.** |
| PLAT-20 | **Adoption metrics** now track how users engage with product features, in MAS and MAS Service, and are shared with IBM to inform product development. |
| PLAT-21 | Navigation changes: the **role-based menu section is removed**; mobile apps are labelled "(Mobile)"; the **Security section is renamed "Access and usage"**; users can set a default application and personalise the side navigation. |
| PLAT-22 | Persistent volume access modes extended to **RWX and RWO**. **The value set at initial creation cannot be modified later without data loss.** |
| PLAT-23 | Storage endpoints for Manage configurable via parameters on the `ManageWorkspace` custom resource. |
| PLAT-24 | Manage supports **adding unsupported languages** through a customization archive at deployment/activation. |
| PLAT-25 | Application Configuration: preview build times **50–80% faster** (example given: ~60 s down to 10–30 s); configurable preview logging via `default-log-level` in `app.xml`; FIFO preview/publish queue; progress tracking; downloadable preview and publish logs; improved delta file generation for all XML files. |
| PLAT-26 | **Maximo Collaborate is deprecated as a MAS add-on** and becomes an add-on in Maximo Manage instead. |
| PLAT-27 | **Maximo Renewables** is documented as an APM solution for wind, solar and battery storage; it integrates with Manage and is enabled by contacting the Maximo Renewables team (not self-service). |

## 3. AI and AI Service (MAS 9.2)

Same source as section 2. All CONFIRMED.

| ID | Fact |
|---|---|
| AI-01 | **Agentic Maximo Assistant**: the assistant "can now act as a single agent that analyzes requests and works across a defined set of AI tools". Example prompts: "What assets need my attention?", "How is asset [number] doing?", "How do I do [task] in Maximo Manage?" |
| AI-02 | **AI-generated asset insights and alert insights** combine asset condition, maintenance history and failure data into risk views with recommended actions. |
| AI-03 | **AI document extraction for lease documents** in Maximo Real Estate and Facilities, with configurable extraction rules controlling which fields AI populates. |
| AI-04 | **Maximo MCP server**: customers can create custom AI tools using Manage automation scripts, object structures and workflows, and connect their own tools and agents. |
| AI-05 | The AI configuration application was redesigned — model status, one-click enablement, AppPoint usage dashboards. |
| AI-06 | **AI Service AppPoint consumption is now trackable** on licensing dashboards (AI configuration > Actions > Check AppPoints). |
| AI-07 | IBM documentation now includes testing guidance and best practices for AI features, including fine-tuning performance. |
| AI-08 | Announcement-level (not docs-level) AI claims from REL-01: **Maximo Condition Insight**; AI in **Field Service Management**; **Maximo Assistant on Mobile**; **MVI local inference on device**; **AI-enabled conversational scheduling and what-if analysis**; **AI-assisted incident classification**; RAG-based lease abstraction positioned as the start of broader document abstraction (OEM manuals, inspection procedures, licensing agreements). |
| AI-09 | **CORRECTED 2026-08-12 — now CONFIRMED, and the prior TMG claim was close but imprecise in three ways.** IBM's Feature Channel what's-new, under **January 2026**, states: *"You can now use the gpt-oss-120b model for mcc, pcc, fmea, and nl2oslc model templates. The nl2oslc model template is for the AI assistant. If you are already using a Granite model and need to move to gpt-oss-120b, see Changing to gpt-oss-120b models. IBM Granite 3.2 8b Instruct is deprecated as of 25 November 2025."* Source: https://www.ibm.com/docs/en/masv-and-l/cd?topic=new-in-maximo-application-suite-feature-channel (cached `feature-channel-whats-new.txt` lines 123-127). | CONFIRMED |
| AI-09a | **Three corrections to the prior DOC12 framing, which the published nuclear post repeats.** (1) It is **"you can now use"** — gpt-oss-120b is offered as an option with a documented migration path, **not a forced replacement**. (2) The deprecation date for **IBM Granite 3.2 8b Instruct is 25 November 2025**, not a February 2026 removal. (3) The scope includes a **fourth** template, **`nl2oslc`** (the AI assistant), alongside `mcc` (Maintenance Cause Classification), `pcc` (Predictive Cause-Effect Correlation) and `fmea`. | CONFIRMED |
| AI-09b | **Crucially, this landed in the January 2026 Feature Channel, not in 9.2.0 GA.** Combined with REL-12, that means it reached customer-managed customers as **non-production preview** content in January 2026 and became production-available for them only at 9.2 GA on 25 June 2026 — while SaaS customers had it in production from January. Any statement of "when Maximo changed AI models" must say *for whom*. | CONFIRMED |

## 4. Maximo Manage 9.2

Source: https://www.ibm.com/docs/SSLPL8_cd/com.ibm.mam.doc/overview/c_wn_manage_92.html — cached at `MAS92-SOURCES/text/manage-92-whats-new.txt`, accessed 2026-08-12. All CONFIRMED.

| ID | Fact |
|---|---|
| MNG-01 | **New Tickets application** — all ticket records in one place: view all ticket types in a single list, create service requests and alerts, filter by class via View Manager, bulk-change owner or status, search similar tickets, add communication and work log entries. |
| MNG-02 | **New Alerts application** — generate and manage alerts for assets and locations across their lifecycle. |
| MNG-03 | **AI-generated insights for alerts** — analyses alert content, asset details, work history and meter data; each insight carries a **confidence score of high, medium or low**; viewable in Tickets; can create pre-filled work orders from recommendations. |
| MNG-04 | **Maximo Collaborate is now an add-on in Manage.** Expert Groups and Technicians applications are migrated to **Person Groups and Labor**. ICE server configuration moves into the Mobile Configuration application. |
| MNG-05 | **Restriction: Maximo Collaborate cannot be installed on Single Node OpenShift (SNO) environments.** |
| MNG-06 | Collaborate Sessions becomes the **Collab Session** application under Work Orders, with session summary PDF download. |
| MNG-07 | **New time zone processing rules** for PM scheduling and work order generation: PM; Organization; Site; Site,Organization; PM,Asset,Locations,Site,Organization; PM,Site,Organization. |
| MNG-08 | **Custom shell scripts can be included in customization archives** and executed during the Manage build process. |
| MNG-09 | "Set Due Date End of Month" is now configurable **at site level** for PM due-date calculation. |
| MNG-10 | **OAuth support for sending email** from Manage; only OAuth-authorised sender addresses may be used. |
| MNG-11 | **Arabic and Hebrew language support** for applications built on the Maximo Application Framework. |
| MNG-12 | JMS debug logs now include `MEAMSGID` for message traceability in Message Tracking. |
| MNG-13 | System information (Help > System information) now shows **operator version number with release date** plus latest component information, to aid APAR identification. |
| MNG-14 | Work orders generated from a PM now **inherit the job plan description**. |
| MNG-15 | **Attachments can now be added in the Work Orders application.** |
| MNG-16 | **Failure reporting is now supported in the Work Orders application**, including failure reporting data on **calibration** work orders (date/time of failure, reported by, description, impact, root cause, actions, compliance reference documentation). |
| MNG-17 | Actual material costs can be recorded on the Actuals tab with a Material line type **without specifying an item**. |
| MNG-18 | **Automated calibration accuracy validation**: Manage validates that calibration standards have adequate accuracy specifications versus the asset under calibration, explicitly for compliance with **ISO/IEC 17025 and ISO 15189**, with unit conversion and configurable **warning or enforcement** modes. A **Bypass Accuracy Validation** checkbox exists for older, emergency or non-standard equipment. |
| MNG-19 | Tool transactions can be removed from **completed or closed** calibration work orders when configured at organisation level. |
| MNG-20 | New/enhanced **Assets & locations dashboard** unifying health, reliability and lifecycle information with AI-driven insights. |
| MNG-21 | **Migration to Java 25** — Maximo Manage and Maximo Optimizer now support Java 25, per an IBM support announcement titled "IBM Maximo Manage: Transition to Java 25 from Maximo Application Suite 9.2". (Manage 9.1 moved to Java 17 — see BASE-04.) |
| MNG-22 | **BIRT 4.21 support.** |
| MNG-23 | **Breaking: removed support for `alter session set use_stored_outlines = true` at session startup** for Oracle connections. Customers relying on MAS to enable Oracle stored outlines per session must now configure this at the database level. |
| MNG-24 | Classification updates made **prior to 9.2 must be manually updated** in the asset (per the classification enhancement note). |
| MNG-25 | Compliance monitoring can track new, removed or delayed work orders during a defined period. |
| MNG-26 | Manage 9.2 sections cover enhancements to Assets, Crews, Meters, Condition Monitoring, Inventory, Inspections, Labor, Purchasing, Asset Investment Planning, and Scheduling (see cached text for per-item detail). |

## 5. Maximo Optimizer 9.2 (shipped within the Manage what's-new)

Source as section 4. All CONFIRMED.

| ID | Fact |
|---|---|
| OPT-01 | **Dynamic scaling for execution service pods** — automatic replica scaling between configured min/max based on CPU utilisation or job queue length. |
| OPT-02 | **Capacity planning optimization** — identifies minimum craft capacity increases by craft, shift and day to meet project deadlines or maximise turnaround savings within budget, with alerts and Gantt visualisation. |
| OPT-03 | **Queue worker distribution management** — jobs distributed to the pod with fewest active jobs; jobs pool and wait when all pods hit the queue worker limit. |
| OPT-04 | **Assignment rejection management** — configure whether Optimizer ignores or respects rejections, temporary vs permanent rejection duration, and keywords technicians use to trigger rejection behaviours. |
| OPT-05 | **Conflict diagrams** — downloadable graphical representation of conflicts between business rules in an optimization job. |
| OPT-06 | **Large Neighborhood Search (LNS) algorithm** for large-scale dispatching — thousands of work orders across multiple days and regions, global optimization, multi-day dispatching with overnight tasks. |
| OPT-07 | **Natural-language what-if analysis** — describe changes in plain language (add capacity, change priorities, remove precedence, adjust constraints) instead of setting parameters manually. |
| OPT-08 | Maximo Optimizer supports **Java 25**. |

## 6. Maximo Monitor 9.2

Source: https://www.ibm.com/docs/en/SSQR84_cd/iot/overview/whats_new_92.html — cached at `MAS92-SOURCES/text/monitor-92-whats-new.txt`. All CONFIRMED. **This is the largest architectural change in the release.**

| ID | Fact |
|---|---|
| MON-01 | **Monitor 9.2 removes its dependency on the IoT Platform (IoTP).** Monitor operates stand-alone and is the single system of record for gateway, device and API key management, with authentication and authorisation handled centrally within Monitor. |
| MON-02 | **IoTP is now optional** and deploys only when MQTT-based ingestion is required, as a reduced lightweight runtime retaining only essential messaging components. |
| MON-03 | Device, gateway and authentication data is **migrated into the Monitor database during upgrade**, eliminating duplicate registries. |
| MON-04 | **CSV file ingestion** as an alternative to MQTT/HTTP streaming, periodically ingested from IBM Cloud Object Storage, AWS S3 buckets or Persistent Volumes. |
| MON-05 | Multiple CSV ingestion methods: Monitor UI (small/ad hoc), APIs (automated/batch), and external systems such as Edge Data Collector writing directly to Cloud Object Storage for high volume. |
| MON-06 | **Edge Data Collector fallback system** — primary publisher (MQTT or COS), secondary (COS or PV), tertiary (PV), automatic retry to primary every 1 hour, targeting zero data loss after the detection period. |
| MON-07 | **Resource-based access control (RBAC)** filters which data a user can see by resource type (assets, locations, systems, organizations, sites, device types, devices, gateways). Complements rather than replaces role-based access control. |
| MON-08 | **AI-generated alert insights** with `AlertByOccurrencesCount` (frequency-based) and `NoDataAlert` (no-data) configurations; alerts can be sent to Manage for review in the Tickets application. |
| MON-09 | **Hierarchy dashboards** aggregate child-resource data onto parent dashboards for locations, assets, systems, sites and organizations without creating new KPIs or duplicating data. |

## 7. Maximo Visual Inspection 9.2

Source: https://www.ibm.com/docs/SSRU69_cd/base/whats_new_92.html — cached. All CONFIRMED. **Highest breaking-change density in the release.**

| ID | Fact |
|---|---|
| MVI-01 | Model training infrastructure transitions to **TensorFlow and PyTorch**. |
| MVI-02 | **Breaking: Caffe and Darknet frameworks are removed.** |
| MVI-03 | **Deprecated: older model architectures including SSD and GoogleNet.** |
| MVI-04 | **Breaking: NVIDIA Pascal series GPUs, including the P100, are not supported in MVI 9.2 and later — and support is also removed from earlier releases through fix packs** (see "May 2026" in the MVI fix pack what's-new). This is a retroactive hardware support removal. |
| MVI-05 | **Model validation with ground truth data** is new. |
| MVI-06 | **Resource sharing** is new. |
| MVI-07 | Visual prompting gains tooltips, documentation/video links and UI consistency improvements. |
| MVI-08 | **Visual Inspection in Maximo Mobile** — quality inspectors capture images and run real-time inspections with trained AI models **directly on iOS devices**. |
| MVI-09 | Edge deployment continues to be supported with TensorRT and CoreML conversions. |

## 8. Maximo Health and Predict 9.2

Source: https://www.ibm.com/docs/en/mhmpmh-and-p-u/cd (SS7PRM_cd) — cached. All CONFIRMED.

| ID | Fact |
|---|---|
| HP-01 | **New asset health models for electrical transmission and distribution assets** computing health, risk, criticality, effective age and end-of-life probability scores. |
| HP-02 | Assets and locations dashboard reorganised into functional tabs: **Health, Strategy, Alerts and Meters, Reliability, Asset life, and Predict** (Predict tab if enabled). |
| HP-03 | Dashboard cards are **configurable by drag-and-drop** (add, remove, rearrange). |
| HP-04 | **AI-generated insights** on the Health tab Insights card — trends, potential risks, upcoming maintenance requirements. |
| HP-05 | New **alert cards** for assets and locations on the Alerts and meters tab. |
| HP-06 | **Incident history** on the asset/location details page, linking through to the Incidents (HSE) application in Manage. |
| HP-07 | New **probability of failure (PoF) analysis** for predictive maintenance planning. |

## 9. Maximo IT 9.2

Source: https://www.ibm.com/docs/SSQ914_cd/com.ibm.sccd.doc/Overview/whats_new_9.2.html — cached. All CONFIRMED.

| ID | Fact |
|---|---|
| IT-01 | **Agentic AI incident summarisation and solution generation** — a **watsonx Orchestrate** agent analyses incident work log entries and generates a solution record when an incident reaches Resolved; service agents review and publish. |
| IT-02 | **Software Tracking** application updated for cloud-based software lifecycle governance. |
| IT-03 | **Offerings Creation** simplifies designing and publishing service catalog offerings; **Service Bundling** improves self-service. |
| IT-04 | **Services View** application gains a **Reliability tab**. |
| IT-05 | **Integration with IBM MaaS360** for device and asset visibility. |
| IT-06 | **Deprecated: the Self Service Center application.** IBM directs organisations to the **Self Serve** application instead. |

## 10. Real Estate and Facilities, HSE, Oil & Gas 9.2

| ID | Fact | Confidence |
|---|---|---|
| REF-01 | REF 9.2 adds **lease abstraction using RAG-based AI document extraction**, dynamic space planning, the Reserve app, capital projects, and database/platform updates. Source: SSZBD7_cd cached text. | CONFIRMED |
| REF-02 | Object Migration improvements: **combine multiple import packages into one consolidated package**, and filter copied packages to non-IBM-labelled objects only. | CONFIRMED |
| REF-03 | The **User Migration Tool** is now included in the application; it no longer needs separate download and install. | CONFIRMED |
| REF-04 | A **timezone migration tool** adjusts nonrelative date field values when the application server timezone changes, detecting changes at server startup. | CONFIRMED |
| HSE-01 | HSE 9.2 adds emissions and compliance management, related records management, and Maximo Mobile integration. Source: SS5GME_cd cached text. | CONFIRMED |
| OG-01 | Oil & Gas 9.2 adds the same three areas: emissions and compliance management, related records management, Maximo Mobile integration. Source: SSLL9G_cd cached text. | CONFIRMED |
| AIP-01 | Asset Investment Planning 9.2 adds closed-loop planning: publish optimized scenarios to a global investment plan, generate intervention work orders from the plan, re-optimize strategies, link Job Plans as intervention templates, scenario favoriting and custom names. **"Strategic Plans" is renamed "Strategies".** Source: IBM search summary of the 9.2 what's-new; not yet read from the primary page. | REPORTED |

## 11. Baseline — Manage 9.0 and 9.1 (for the comparison post)

| ID | Fact | Confidence |
|---|---|---|
| BASE-01 | From **Manage 9.0**, component version numbers align with the Manage version and increment continually under continuous delivery. At Manage 9.0.0 the components were: Manage base 9.0.43, Aviation 9.0.2, Asset Configuration Manager 9.0.40, Civil Infrastructure 9.0.12, Connector for Envizi 9.0.1, Health 9.0.13, HSE 9.0.7, Maximo IT 9.0.3, Nuclear 9.0.2, Oil & Gas 9.0.7, Connector for Oracle 9.0.2, Connector for SAP 9.0.2, Spatial 9.0.4, Reliability Strategies 9.0.75, Service Provider 9.0.1, Transportation 9.0.1, Utilities 9.0.2. Source: SSLPL8_cd `c_wn_manage_90.html`, cached. | CONFIRMED |
| BASE-02 | Manage 9.1 what's-new sections: Prerequisite software changes, New and enhanced applications, **Deprecated applications**, Integrations, Technical updates, Dashboard enhancements, IBM Maximo Optimizer, User assistance improvements. Source: cached `manage-91-whats-new.txt`. | CONFIRMED |
| BASE-03 | **From MAS 9.1 the Asset data dictionary is no longer available** (deprecated applications section of Manage 9.1). Source: cached `manage-91-whats-new.txt`. | CONFIRMED |
| BASE-04 | **Manage 9.1 migrated to Java 17.** Manage 9.2 migrates to Java 25. Source: cached `manage-91-whats-new.txt` and `manage-92-whats-new.txt`. | CONFIRMED |
| BASE-05 | Suite-level "What's new in MAS 9.1" and "9.0" topics did not resolve through the docs content API in this pass; only the current CD release is served at the suite level. Manage-level 9.0/9.1 pages did resolve and are cached. | CONFIRMED |
| BASE-06 | Commonly repeated 9.0 content (Carbon Design System, Role-Based Applications replacing Work Centers, Reliability Strategies with FMEA, watsonx.ai problem-code suggestions) and 9.1 content (Maximo Assistant, AI Service as licensed component, FMEA Content Builder, Similarity Tracker, unified left navigation) derive from TMG's earlier series and were **not re-verified from primary pages in this pass**. | UNCONFIRMED |

## 12. Upgrade mechanics and prerequisites

Sources: `SSRHPA_cd/appsuite/install/r_upgrade_prerequisites.html`, `.../c_ctr_upgrading.html`,
`.../c_ctr_upgrade_considerations.html`, `.../t_ctr_upgrad_db2_v11_to_v12.html`,
`.../dependencies/system_requirements.html`, `appconfig/deprecated_maximo_application_framework_components.html`.
Cached 2026-08-12. All CONFIRMED.

| ID | Fact |
|---|---|
| UPG-01 | **The add-on parity blocker, in IBM's own words:** "Before you upgrade, you must consider whether the IBM Maximo Application Suite applications and add-ons are available for upgrade. **If the applications or add-ons are no longer available, you must deactivate and delete those applications and add-ons.**" This is the single most consequential upgrade sentence in the documentation. |
| UPG-01a | **Scope clarification on UPG-01, added after adversarial review.** IBM's "no longer available → deactivate and delete" phrasing addresses **withdrawn** products, not products merely lagging at a new version. The same page uses the identical construction for two documented withdrawals: *"Starting in 8.11, the IBM Parts Identifier add-on is no longer available. If Parts Identifier is installed, and you are upgrading to 8.11, you must deactivate and delete Parts Identifier before you can complete the upgrade."* and *"In Maximo Application Suite 8.9, Maximo Safety is no longer available… you must deactivate and delete Maximo Safety before you can complete the upgrade."* Posts must not use this quote to claim that a not-yet-shipped add-on forces deletion. The separate, still-valid point is that IBM documents **no mechanism to upgrade base MAS and let a lagging add-on catch up later** — parity lag delays the whole upgrade. |
| UPG-02 | MAS versions are upgraded **by subscribing to a channel**. Prerequisite tasks must be completed first. |
| UPG-14 | **The upgrade path rule, now confirmed — closes GAP-04.** *"Maximo Application Suite upgrade policy supports n-1 versions in a cluster, which means that you can upgrade directly from the version just before the current one. For example, if the current version of Maximo Application Suite is 9.1, then you can upgrade directly from 9.0 in a cluster."* Applied to 9.2: **9.1 to 9.2 is a supported direct upgrade; 9.0 to 9.2 is not n-1 and requires a hop through 9.1; 8.x to 9.2 requires multiple hops.** Source: https://www.ibm.com/docs/en/masv-and-l/cd?topic=upgrading-maximo-application-suite-versions (cached `upgrading-versions.txt` lines 6-9). |
| UPG-15 | **Even-numbered OpenShift requirement.** *"IBM App Connect and Cloud Pak for Data do not support odd-numbered Red Hat OpenShift Container Platform versions. If Maximo Collaborate, or Maximo Predict is deployed, you must use even-numbered Red Hat OpenShift Container Platform versions."* A hard infrastructure constraint for any estate running Collaborate or Predict. Same source, lines 52-55. |
| UPG-16 | Two upgrade methods exist: **channel subscription** (auto or manual approval; used when MAS was installed from the IBM Operator catalog) and **manual** (applicable only to **MAS 8.9 or earlier**, installed from Passport Advantage). Same source. |
| UPG-03 | **Db2 11 → 12 upgrade gate:** requires a valid IBM Db2 Warehouse license file obtained from IBM **and** the `db2_v12_upgrade` flag set to `true`. **The upgrade fails if the license file is not provided** — deliberately, to prevent a silent downgrade to a trial licence. Available via CLI (`mas update`) or Ansible. |
| UPG-04 | **New Db2 12 installations do not require a licence file. Only 11 → 12 upgrades enforce this.** |
| UPG-05 | **The three user management API families removed in 9.2 are named explicitly:** user creation APIs (registering new users), workspace assignment APIs (linking users to workspaces), and role assignment APIs (assigning fixed roles such as user and administrator). "If your integrations or scripts use the deprecated APIs, **update them to use the new APIs before you upgrade to 9.2**." |
| UPG-06 | The 9.1 → 9.2 authentication migration runs as a **pre-upgrade process** using a **datamodel-migration job** that updates authentication mappings and synchronises required SCIM fields **including `externalId`** so users can continue to sign in. |
| UPG-07 | IBM does **not** state OpenShift/database version floors inline. It directs customers to generate a **Software Product Compatibility Report (SPCR)** — "Detailed system requirements" — per MAS version, because requirements vary by which applications are deployed and at what size. |
| UPG-08 | **Maximo Application Framework `chat-log` component is deprecated in MAS 9.2.** It rendered messages with timestamps in work and communication logs on work orders and service requests; that information is now defined entirely in the application XML. Affects custom applications. |
| UPG-09 | Earlier MAF deprecations for context: the `container` layout component was deprecated in **8.10** (replaced by box and border-layout), and `page-header` in **8.11** (replaced by header-template). |
| UPG-10 | Historical 9.1 upgrade prerequisite: **stand-alone Maximo Health ceased to be a suite application at 9.1** and remains an add-on in Manage. Customers running stand-alone Health had to add Health as a Manage 9.0 add-on *before* upgrading to 9.1. |
| UPG-11 | **IBM Maximo Assist was renamed IBM Maximo Collaborate starting in MAS 9.1.** Combined with PLAT-26 and MNG-04, the arc is: Assist → (9.1) renamed Collaborate → (9.2) deprecated as a suite add-on and moved to being a Manage add-on. |
| UPG-12 | A dedicated **"Upgrading Maximo Manage checklist"** exists for planning version-to-version Manage upgrades (cached as `upgrade-manage-checklist.txt`). |
| UPG-13 | Separate upgrade routes exist **from Maximo Asset Management to Maximo Manage**, and **from TRIRIGA / TRIRIGA Application Suite to Maximo Real Estate and Facilities**. |

## 13. Known gaps — must not be asserted without further verification

| ID | Gap |
|---|---|
| GAP-01 | **CLOSED 2026-08-12.** 9.0's transition (30-Jun-2027) and extended completion (30-Jun-2031) are published; 9.1 and 9.2 have GA dates but no transition dates published yet. That absence is itself a confirmed finding, not a research gap — see REL-05a/b/c/d. |
| GAP-02 | **CLOSED 2026-08-12.** All three GA dates confirmed from IBM lifecycle pages — see REL-10. |
| GAP-03 | **CLOSED 2026-08-12.** IBM states it directly in two places — non-production only for customer-managed, production for MAS as a Service. See REL-12, REL-12a, REL-12b. |
| GAP-04 | **CLOSED 2026-08-12.** The rule is n-1, published on the upgrading topic: 9.1 to 9.2 direct; 9.0 to 9.2 needs a hop through 9.1; 8.x needs multiple. See UPG-14. |
| GAP-05 | Exact OpenShift / Db2 / Java version floors for 9.2. Closed as far as it can be: per UPG-07, IBM deliberately does not publish inline floors and directs customers to generate a per-version SPCR. Posts should teach the SPCR method rather than quote a floor. |
| GAP-06 | **CLOSED 2026-08-12.** Confirmed from IBM's Feature Channel what's-new (January 2026), with three corrections to the prior TMG framing. See AI-09, AI-09a, AI-09b. |
| GAP-07 | Whether every industry solution and add-on has a shipped 9.2 build — PLAT-04 suggests parity was still in flux at GA, but no compatibility matrix was located. |
| GAP-08 | AppPoints ratio or licensing-cost changes at 9.2 beyond the new usage dashboard and AI Service tracking. |

## 13. Local source cache

`knowledge_base/MAS92-SOURCES/` — `harvest.py` (re-runnable fetcher), `raw/*.html`, `text/*.txt`.
Cached pages: mas-92-whats-new, manage-92, manage-91, manage-90, mobile-92, mobile-91, monitor-92,
health-predict-92, maximo-it-92, hse-92, oilgas-92, mvi-92, ref-92, collaborate-92, plus support
pages supported-versions, lifecycle-90plus, mas-90x, mas-91x, releases-info.
