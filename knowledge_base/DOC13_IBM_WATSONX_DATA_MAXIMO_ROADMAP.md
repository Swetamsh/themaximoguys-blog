# MAS 9 + IBM watsonx.data: Building the Maximo Open Lakehouse — Comprehensive Roadmap

**Document:** DOC13 - IBM watsonx.data & the Maximo Open Lakehouse
**Version:** 1.0
**Date:** July 17, 2026
**Audience:** Data analysts, architects, IT leadership, maintenance managers, and business stakeholders evaluating IBM-native advanced analytics for MAS 9
**Scope:** A complete practitioner's guide to pairing MAS 9 with IBM watsonx.data — IBM's open, hybrid data lakehouse — as the IBM-native counterpart to the Databricks path covered in DOC5. Covers watsonx.data architecture, the fit-for-purpose engine strategy, Apache Iceberg, governance, RAG/vector, watsonx.ai integration, MAS extraction patterns, medallion architecture on Iceberg, closed-loop write-back, a head-to-head with Databricks, industry use cases, and a phased roadmap.
**Upgrade Context:** Maximo 7.6.1.3 → MAS 9 (9.0 / 9.1)
**Companion Document:** DOC5 (MAS 9 + Databricks). Where DOC5 deliberately scoped itself to Databricks, this document covers IBM's own answer to the same gap.
**Provenance note:** Technical claims are grounded in IBM product documentation and announcements (URLs in §12). IBM price/performance figures are IBM-internal benchmarks unless otherwise stated and are flagged as such. Where the research base was thin (notably Granite specifics and named end-customer ROI), this document says so rather than inventing detail.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The IBM-Native Question: Why Not Just Databricks?](#2-the-ibm-native-question)
3. [PART ONE: The MAS 9 Native Analytics Ceiling](#part-one-the-mas-9-native-analytics-ceiling)
   - 3.1 Operational Dashboards
   - 3.2 Cognos Analytics
   - 3.3 Maximo Health, Predict, Monitor
   - 3.4 Maximo AI Service & Assistant
   - 3.5 Where Native Analytics Stops
4. [PART TWO: Why watsonx.data — IBM's Open Lakehouse](#part-two-why-watsonxdata)
   - 4.1 The Open Lakehouse Architecture
   - 4.2 Fit-for-Purpose Query Engines
   - 4.3 Apache Iceberg as the Open Table Format
   - 4.4 Governance: IBM Knowledge Catalog & watsonx.governance
   - 4.5 Vector, Search & RAG: Milvus, OpenSearch, OpenRAG
   - 4.6 watsonx.ai Integration
   - 4.7 Deployment Models & Pricing
5. [PART THREE: MAS 9 + watsonx.data Integration Architecture](#part-three-integration-architecture)
   - 5.1 Why Cloud Pak for Data Is the Fabric
   - 5.2 Extracting Maximo Data (MIF, Kafka, Bulk Export)
   - 5.3 Reference Architecture — The Maximo Open Lakehouse
   - 5.4 Medallion Architecture on Iceberg
   - 5.5 Closed-Loop Write-Back
6. [PART FOUR: Use Cases](#part-four-use-cases)
7. [PART FIVE: watsonx.data vs. Databricks vs. MAS Native](#part-five-watsonxdata-vs-databricks-vs-mas-native)
8. [PART SIX: Industry-Specific Use Cases](#part-six-industry-specific-use-cases)
9. [PART SEVEN: Implementation Roadmap](#part-seven-implementation-roadmap)
10. [Team Exploration Assignment Matrix](#10-team-exploration-assignment-matrix)
11. [ROI & Business Case](#11-roi--business-case)
12. [References & Resources](#12-references--resources)

---

## 1. Executive Summary

MAS 9 ships with genuinely strong native analytics — Operational Dashboards, an entitlement to Cognos Analytics, Maximo Health, Maximo Predict, Maximo Monitor, and the new Maximo AI Service. But none of these is a data platform. They read and write MAS data; they do not join your ERP, weather, GIS, financial, or ten-years-of-history sensor data, and they do not give analysts a general-purpose SQL-and-notebook environment.

DOC5 answered that gap with Databricks. This document answers it with **IBM watsonx.data** — IBM's own open, hybrid data lakehouse and the data pillar of the watsonx platform. For a shop that is already standardizing on IBM (Maximo, Cognos, watsonx.ai via AI Service, Red Hat OpenShift), watsonx.data is the path of least ecosystem friction: the same vendor, the same governance fabric (IBM Knowledge Catalog / Cloud Pak for Data), the same AI layer (watsonx.ai), and an open table format (Apache Iceberg) that avoids runtime lock-in.

### The Core Thesis

| Question | Short Answer |
|----------|--------------|
| Is watsonx.data a replacement for MAS Health/Predict/Monitor? | No. It is a complementary lakehouse for cross-system analytics, custom ML, self-service BI beyond Cognos's 3 seats, and enterprise governance. |
| What makes it "open"? | Apache Iceberg tables, open engines (Presto, Spark), open file formats (Parquet), and zero-copy federation — including to Databricks Unity Catalog. |
| Why choose it over Databricks? | IBM-native integration, open Iceberg (vs Delta+runtime coupling), fit-for-purpose multi-engine cost control, and IBM's own price/performance claims vs Photon. |
| Why choose Databricks over it? | Deeper managed-ML maturity, a larger third-party ecosystem, and if you are already deeply invested in the Databricks runtime. |

### Key ROI & Cost Data Points (IBM-stated; flagged)

| Metric | Impact | Source basis |
|--------|--------|--------------|
| Data warehouse cost reduction | up to 50% | IBM product claim |
| Cost vs Databricks Photon (equal runtime, IBM Storage Fusion HCI, 100 TB TPC-DS) | "less than 60% the cost" | IBM-internal benchmark |
| Price/performance vs Photon (Intel Sapphire Rapids / AWS ROSA, 100 TB TPC-DS) | "better price performance" | IBM-internal benchmark |
| watsonx.data pricing unit | Resource Unit (RU) = USD 1, metered per-second, 1-minute minimum | IBM pricing page |
| IBM Cloud lite plan | 500 RU over a rolling 30-day window | IBM docs |

> These are IBM benchmarks and list claims, not independent third-party results or named-customer outcomes. Treat them as directional inputs to a business case, not guarantees.

---

## 2. The IBM-Native Question

Before any architecture, the honest framing: **most MAS 9 shops evaluating a lakehouse are choosing between Databricks and watsonx.data, not adopting both.** DOC5 covered Databricks because that is the platform the largest share of Maximo customers already have on the table. This document exists because a meaningful and growing share of asset-intensive organizations are IBM-standardized end to end, and for them the calculus is different.

**The IBM-native advantages that actually matter for EAM:**

1. **One vendor, one support path** — Maximo, Cognos, watsonx.ai, watsonx.data, and Cloud Pak for Data are all IBM. Escalations, licensing, and reference architectures come from a single vendor.
2. **You may already be paying for watsonx** — MAS 9.1's AI Service connects Maximo to watsonx.ai. If watsonx.ai is already in your environment for Maximo Assistant, extending to watsonx.data reuses that footprint.
3. **Open table format by design** — watsonx.data standardizes on Apache Iceberg, an open, vendor-neutral format. This is a hedge against the runtime coupling critics associate with Delta Lake + a single vendor's engine.
4. **Fit-for-purpose engines** — rather than one billing-heavy engine for everything, watsonx.data lets you route interactive queries to Presto, heavy ETL/ML to Spark, and high-concurrency BI to Db2 Warehouse or Netezza, all over the same Iceberg tables.
5. **Governance continuity** — IBM Knowledge Catalog and watsonx.governance extend the same governance model across data and AI models, which resonates in regulated industries already running IBM governance tooling.

**The honest disadvantages:**

- Databricks has a longer, deeper track record in managed ML/MLOps at scale, and a larger partner and connector ecosystem.
- IBM's price/performance claims are internal benchmarks; independent validation is thin.
- Provenance for some MAS-9.1-specific "watsonx.data reference architecture" messaging traces partly to community channels, not primary IBM docs — verify against your IBM account team before committing.

---

## PART ONE: The MAS 9 Native Analytics Ceiling

*(This part mirrors DOC5 Part One so this document stands alone. If you have read DOC5, skim to §3.5.)*

### 3.1 Operational Dashboards

MAS 9 introduced Operational Dashboards as the strategic replacement for Start Centers, enhanced across MAS 8.9 → 9.0 → 9.1. They provide interactive, role-based, cross-application views (pulling from Monitor, Health, and Manage) with configurable queries, charts, KPIs, and action buttons, plus integration with Maximo AI Assistants.

**What they don't do:** ad-hoc data exploration, complex cross-system joins, or statistical analysis; they do not replace Cognos or Power BI for formal reporting, and they do not support custom data sources outside MAS.

### 3.2 Cognos Analytics

MAS 9 includes an entitlement to IBM Cognos Analytics (11.2.x) reporting against the Maximo database, with **three IBM Administrative Base Users** able to author dashboards and reports. BIRT reports (7.6) must be recreated in Cognos — there is no migration path — though MAS 9.1 retains BIRT v4.16 support during transition.

**Limitations:** only 3 authors included; limited to the Maximo database (hard to join external sources); no ML/AI capability — purely descriptive/diagnostic.

### 3.3 Maximo Health, Predict, Monitor

- **Maximo Health** — configurable 0–100 health scores, risk scores, end-of-life projections, asset matrices, work queues. As of MAS 9.1, Health is no longer a standalone offering; the path is **"Maximo Manage with Health."**
- **Maximo Predict** — ML predictions (failure probability, failure date, contributing factors, anomaly detection, RUL). Training runs on Cloud Pak for Data / watsonx.ai; IoT data must flow through Monitor first; models are largely pre-built and cannot ingest external data (weather, market, supply chain).
- **Maximo Monitor** — IoT ingestion, real-time dashboards, built-in anomaly detection, alert-to-work-order automation via Kafka. It does not do advanced ML training, cross-system analytics, or multi-year historical trend analysis.

> **MAS 9.1 data-relevant changes:** the Monitoring and Testing (MAT) service (model-lifecycle notebooks) is removed, and the **Asset Data Dictionary app is deprecated** (IBM advises Maximo Monitor instead). Plan extraction/feature pipelines accordingly.

### 3.4 Maximo AI Service & Assistant

New in MAS 9.1, **Maximo AI Service** is the add-on that "connects Maximo Application Suite to watsonx AI systems or services," managing configuration, training/retraining, and health checks, and delegating inference to watsonx.ai **or a local embedded runtime**. It powers Maximo Assistant (conversational Q&A), FMEA content building, similarity tracking, and field-value/problem-code recommendations, and consumes AppPoints (commonly cited at 10 AppPoints, plus a monthly usage limit before additional watsonx licensing).

Critically for a data strategy, AI Service is **the sanctioned bridge from Maximo into the watsonx family** — the same bridge you extend when you add watsonx.data.

**Privacy posture (IBM-stated):** "watsonx.ai does not retain inference data or results; exchanges are encrypted via TLS 1.2 and are stateless." The AI assistant "does not directly retrieve data from the Maximo database" — it sends schema metadata plus prompt rules and constructs Maximo API requests. SaaS configuration uses system properties `mxe.int.aibrokerapikey`, `mxe.int.aibrokerapiurl`, and `mxe.int.aibrokertenantid`.

### 3.5 Where Native Analytics Stops

| Need | MAS 9 Native | watsonx.data Adds |
|------|-------------|-------------------|
| Asset health scoring | ✅ Maximo Health | Custom scores blending external factors (weather, load, energy) |
| Failure prediction | ✅ Maximo Predict | Custom ML on watsonx.ai over lakehouse features, external inputs |
| IoT monitoring | ✅ Maximo Monitor | Multi-year historical trend analysis at scale |
| Reporting | ✅ Cognos (3 users) | Unlimited self-service BI via Presto/Db2/Power BI/Tableau |
| Cross-system analytics | ❌ Limited to MAS | Join Maximo + ERP + IoT + weather + financial on Iceberg |
| Data science / notebooks | ❌ | Spark, Python/Scala, notebooks |
| Enterprise data governance | ❌ | IBM Knowledge Catalog across all data |
| RAG / unstructured docs | Limited (AI Service) | Milvus + OpenSearch + OpenRAG (Docling) |

---

## PART TWO: Why watsonx.data

### 4.1 The Open Lakehouse Architecture

IBM positions watsonx.data as an "open, hybrid data lakehouse" and the "AI-ready data foundation" of the watsonx platform. Its defining architectural trait is the **full separation of compute, metadata, and storage** — each provisioned, scaled, and managed independently.

- **Object storage (persistence):** IBM Cloud Object Storage (COS), AWS S3, MinIO, IBM Storage Ceph — plus Google Cloud Storage, IBM Storage Scale, and Apache Ozone.
- **File formats:** Parquet, CSV, JSON, TXT (Parquet and CSV are the preferred ingestion formats).
- **Metadata:** Hive Metastore (HMS) as the shared metadata repository, plus Iceberg catalog implementations.
- **What "open" means in practice:** open table formats (Iceberg, Delta, Hive, Hudi), open engines (Presto, Spark), open file formats, broad connectors, and **zero-copy federation** — query remote external tables without copying data, including federation to Databricks Unity Catalog across S3 and Azure Data Lake Storage Gen2.

The net effect is that watsonx.data behaves as a **data fabric**: unified governance and query across sources without a wholesale migration.

```
                       ┌──────────────────────────────────────────┐
                       │              watsonx.data                 │
   COMPUTE (engines)   │   Presto (Java) · Presto C++/Velox        │
                       │   Spark · Db2 Warehouse · Netezza         │
                       ├──────────────────────────────────────────┤
   METADATA            │   Hive Metastore · Iceberg catalog        │
                       │   IBM Knowledge Catalog (governance)      │
                       ├──────────────────────────────────────────┤
   STORAGE (open)      │   Iceberg/Parquet on COS · S3 · Ceph ·    │
                       │   MinIO · GCS · Ozone · Storage Scale     │
                       └──────────────────────────────────────────┘
        Each layer scales independently. One copy of data, many engines.
```

### 4.2 Fit-for-Purpose Query Engines

IBM's core design premise: "no single query engine is optimal for every workload." watsonx.data ships multiple engines over the same Iceberg tables:

| Engine | Role | When to Use for EAM |
|--------|------|---------------------|
| **Presto (Java)** | Distributed interactive SQL + federation | Ad-hoc analyst queries; federated joins across Db2, Netezza, Kafka, MongoDB, object stores |
| **Presto C++ (Velox)** | Next-gen native acceleration (Presto 2.0) | Cost-sensitive high-performance SQL; IBM's price/performance claims vs Photon rest here |
| **Spark** | Large-scale ETL, ML, batch, unstructured→structured | Silver/Gold transformations, feature engineering, table maintenance (compaction, partitioning), Python/Scala apps |
| **Db2 Warehouse** | High-concurrency analytic SQL | Enterprise BI with many concurrent users over shared Iceberg data |
| **Netezza Performance Server** | Hardware-accelerated analytics | Heavy analytical workloads that benefit from Netezza acceleration |

**Presto architecture detail:** a Presto deployment has three server roles — **coordinator** (planning/scheduling), **worker nodes** (execute query fragments), and **resource manager** (allocation).

**Presto C++ / Presto 2.0:** integrates the open-source **Velox** C++ acceleration library, "composable across multiple compute engines." IBM cites **Presto C++ v0.286** as the "next generation of Presto," developed with community members from Meta, IBM, Uber, and others, paired with an IBM query optimizer drawing on "decades of IBM experience in query compilation, rewrite and cost-based optimization."

### 4.3 Apache Iceberg as the Open Table Format

Iceberg is the **primary/default analytic table format** — described by IBM as the "linchpin of data sharing across [its] databases and lakehouse engines." It provides ACID transactions, schema evolution, hidden partitioning, and time travel via snapshot metadata; data is stored as Parquet with Iceberg tracking the metadata.

**Why this matters for EAM teams:**

| Iceberg Feature | Why It Matters for Maximo Data |
|-----------------|-------------------------------|
| ACID transactions | Consistent writes when thousands of sensors and batch extracts land concurrently |
| Schema evolution | Maximo table/attribute changes don't break downstream pipelines |
| Time travel (snapshots) | Query what an asset's data looked like 6 months ago for audit/trend analysis |
| Open format | No runtime lock-in; the same tables are readable by Presto, Spark, Db2, Netezza — and external engines |
| Multi-engine sharing | One Iceberg copy serves interactive SQL, ETL, ML, and BI |

**Concrete interoperability facts:**
- **Db2 ↔ Iceberg:** Db2 can create Iceberg tables directly in the watsonx.data catalog by adding an `iceberg.catalog` property to a `CREATE DATALAKE TABLE` statement, e.g.:
  ```sql
  CREATE DATALAKE TABLE iceberg.db2exported(...)
    STORED AS PARQUET STORED BY ICEBERG
    LOCATION 'DB2REMOTE://iceberg-bucket//iceberg/db2exported'
  ```
  Direct ALTER from Db2 is restricted, reflecting Iceberg's metadata-driven evolution model.
- **Registration granularity:** existing Iceberg tables register at the **bucket level**; **Delta and Hudi register at the table level.** A "Sync metadata" feature (Infrastructure Manager) supports three modes — register new objects only, update existing only, or synchronize all (add/update/delete), including changes made by external systems.
- **Delta interop:** Presto can query Uniform-enabled Delta tables through the **Iceberg REST Catalog API**; Spark (PySpark) queries both Delta and Iceberg. So a hybrid "Delta in Databricks, Iceberg in watsonx.data" pattern is technically feasible — provided cross-catalog governance policy is reconciled deliberately (it is not automatic).

### 4.4 Governance: IBM Knowledge Catalog & watsonx.governance

watsonx.data supports **either Apache Ranger or IBM Knowledge Catalog (IKC)** as the policy engine, selectable from the UI.

- **IBM Knowledge Catalog (IKC)** — the primary governance/catalog layer; connects business context (definitions, policies, relationships) to technical assets. When IKC is selected, it "governs all data in Presto catalogs," applying data masking, access restrictions, and usage constraints. Configuration requires the IKC service, target storage/catalogs, IKC endpoint URL + API key, and optional SSL certs. (Not supported on older versions such as 1.1.1 — check your release.)
- **Semantic layer** — an emerging IKC capability embeddable into watsonx.data; uses LLMs to build a unified data context enabling semantic search and AI-assisted exploration "without requiring SQL," auto-generating metadata, business descriptions, and semantic relationships.
- **Data Product Hub** — a data-sharing solution for building "repeatable, governed data products" with defined SLAs, quality, and policies.
- **watsonx.governance** — governs the AI model lifecycle (monitoring, risk management, compliance, lineage). *Detail on watsonx.governance is thin in the current research base; see the companion watsonx-platform document (DOC14) for depth.*
- **Lineage & access control** — enterprise-grade lineage, version control via Iceberg snapshots, SSL + API-key auth, and role/permission definitions across catalogs and engines.

> For Maximo teams, the governance win is mapping Maximo's site/org security model onto lakehouse row/column policies, and carrying PII in labor records (LABTRANS) under IKC masking rules — an area to design early, not retrofit.

### 4.5 Vector, Search & RAG: Milvus, OpenSearch, OpenRAG

watsonx.data has become the retrieval backbone for IBM's GenAI story:

- **Embedded Milvus vector database** — stores/queries vectorized embeddings for RAG, enabling "smaller, fit-for-purpose models augmented with high-quality retrieval," reducing inference latency and cost.
- **OpenSearch** — integrated open-source search/analytics (Apache Lucene-based) for keyword + hybrid search.
- **OpenRAG** — an "open agentic retrieval framework" on watsonx.data combining three open-source technologies: **Docling** (converts PDFs, PowerPoint, Excel, images into AI-ready structured data — text, layout, tables, metadata), **OpenSearch** (hybrid retrieval), and **Langflow** (workflow orchestration, multi-step reasoning, tool calling). Supports **20+ file types** and connects to knowledge bases plus Google Drive, OneDrive, SharePoint, and AWS S3. Governance "spans data retrieval, user inputs, and AI outputs."

**EAM relevance:** maintenance manuals, OEM PDFs, SOPs, inspection reports, and years of free-text work-order history are exactly the unstructured corpus Docling→OpenSearch/Milvus is built to turn into a grounded maintenance knowledge base for a troubleshooting agent.

### 4.6 watsonx.ai Integration

watsonx.ai provides the foundation models and tooling to "build, optimize and deploy RAG pipelines," integrating with watsonx.data's Milvus/Elasticsearch vector stores:

- **Chat with documents** — no-code RAG via **Prompt Lab** (upload/configure PDFs, Word, etc.).
- **AutoAI for RAG** — automatically generates pipeline configurations, evaluates and ranks them, and presents the best on a leaderboard.
- **Foundation models** — the research base concretely names `gpt-oss-120b` (installed by patching the watsonx.ai foundation-model custom resource; verified via `oc get Watsonxaiifm`). *IBM's own Granite family is the expected default here but was not explicitly documented in the source research — see DOC14.*
- **On-prem deployment (with MAS)** — install Node Feature Discovery + NVIDIA GPU operators, deploy via `cpd-cli manage apply-olm` / `apply-cr`, configure storage classes, create projects in the IBM watsonx location within CPD, generate API keys, and set `AISERVICE_WATSONXAI_PROJECT_ID`.

### 4.7 Deployment Models & Pricing

| Model | Details |
|-------|---------|
| **SaaS** | Fully managed on IBM Cloud and AWS (via AWS Marketplace — EC2 compute, S3 storage). IBM Cloud lite = 500 RU / 30-day window; some plans include ~10 GB IBM-managed storage. |
| **Software / on-prem** | Self-managed on Red Hat OpenShift; co-deploys with Cloud Pak for Data; subscription or perpetual licensing; bring your own object storage (Ceph or S3-compatible). |
| **Pricing unit** | Resource Unit (RU), list **USD 1/RU**, metered per-second with a 1-minute minimum. |
| **Cost claim** | IBM states watsonx.data can "reduce data warehouse costs up to 50%." |

---

## PART THREE: Integration Architecture

### 5.1 Why Cloud Pak for Data Is the Fabric

For anything beyond a standalone Manage-with-Db2 setup, **Cloud Pak for Data (CPD)** on OpenShift is the integration fabric that hosts watsonx.data and watsonx.ai side by side. CPD exposes a **watsonx.data Presto connection asset** that reads/writes both Iceberg and Delta.

**Connection parameters (CPD Presto connection):** hostname/IP, **port default 443**, instance ID/name, username + password or username + API key; plus engine internal host, engine ID, and **engine port default 8443**.

- For **standalone Manage**, install only the **Db2 Warehouse operator**.
- To integrate with other MAS suites and watsonx, install **CPD**.

### 5.2 Extracting Maximo Data

Three sanctioned patterns (IBM-documented):

**Method 1 — REST/JSON via MIF (preferred).** MAS 9's OSLC/JSON APIs expose a higher-level query language that maps to native SQL: select attributes, follow relationships, filter, and page. Crucially, MIF can return **synonym-domain internal values** — essential for stable ML feature codes rather than customer-facing external codes. Note: SOAP/REST may require switching from basic auth to **API keys**.

```
Maximo MIF (REST/JSON, OSLC) → watsonx.data ingestion → Bronze (Iceberg)
```

**Method 2 — Kafka streaming.** Maximo Manage can be configured to use a Kafka service; watsonx.data has an **Apache Kafka source connector** to ingest event streams into bronze Iceberg tables — the right pattern for near-real-time, event-driven extraction (e.g., work-order status changes, meter readings).

```
Maximo Manage → Kafka/Event Streams → watsonx.data Kafka connector → Bronze (Iceberg)
```

**Method 3 — Bulk export to object storage.** MAS 9.1 exports UI table data asynchronously, page-by-page, into an **S3 bucket or the MIF global directory**, then combines pages into a single downloadable file (Azure Blob supported for attachments). Good for periodic large extracts.

> **Deployment constraint:** direct DB2/Oracle database extraction is only available for self-managed, on-prem MAS. Managed SaaS MAS seals the database from external connections — use MIF/Kafka/bulk export.

**Core Maximo tables for EAM analytics:**

| Table | Data | Suggested Frequency |
|-------|------|---------------------|
| WORKORDER | Work orders, tasks, costs, failure class | 15 min / near-real-time |
| ASSET | Asset master, classes, hierarchies, lifecycle | Daily |
| LOCATIONS | Location hierarchy | Daily |
| FAILUREREPORT | Failure codes: symptoms, causes, remedies | 15 min |
| MEASUREMENT | Meter/condition readings | 15 min |
| INVENTORY / MATUSETRANS | Balances / material usage | Hourly |
| LABTRANS / TOOLTRANS | Labor / tool usage | Hourly / Daily |
| PM / CLASSSTRUCTURE | PM records / classification attributes | Daily / Weekly |

Named bronze columns (example WORKORDER extract): `WORKORDERID, WONUM, SITEID, ORGID, ASSETNUM, LOCATION, STATUS, STATUSDATE, FAILURECODE, PROBLEMCODE, REPORTDATE, LABORCOST, MATERIALCOST, TOOLCOST`.

### 5.3 Reference Architecture — The Maximo Open Lakehouse

```
┌──────────────────────────── SOURCE SYSTEMS ────────────────────────────┐
│  MAS 9 Manage │ IoT Sensors │  ERP (SAP/  │  Weather  │  GIS / Docs     │
│  (MIF REST /  │ (MQTT/Kafka)│  Oracle)    │  APIs     │  (PDF/SOP)      │
│   Kafka)      │             │             │           │                 │
└──────┬────────────┬──────────────┬─────────────┬───────────┬───────────┘
       │            │              │             │           │
       ▼            ▼              ▼             ▼           ▼
┌──────────────────────── IBM watsonx.data (on CPD) ──────────────────────┐
│  BRONZE (Iceberg): raw WORKORDER/ASSET/FAILUREREPORT/MEASUREMENT,        │
│                    Monitor streams, AI Service logs, docs→Docling        │
│  SILVER (Iceberg): ASSET_DIM, WORKORDER_FACT, FAILURE_FACT,              │
│                    MEASUREMENT_FACT — synonym-decoded, standardized keys │
│  GOLD (Iceberg):   asset health scores, failure predictions, cost marts, │
│                    PM effectiveness, executive KPIs                       │
│                                                                          │
│  Engines: Presto (interactive/federation) · Spark (ETL/ML) ·            │
│           Db2 Warehouse / Netezza (BI concurrency)                       │
│  RAG: Milvus + OpenSearch + OpenRAG (Docling)                            │
│  Governance: IBM Knowledge Catalog + watsonx.governance                  │
└───────────────┬─────────────────────────────────────────────┬──────────┘
                │ features / RAG                               │ closed loop
                ▼                                              ▼
        ┌───────────────┐                          ┌──────────────────────┐
        │  watsonx.ai   │  models & predictions →  │  Back to MAS 9 Manage │
        │  (Granite,    │                          │  • Create work orders │
        │   AutoAI,RAG) │                          │  • Update asset scores│
        └───────────────┘                          │  • Adjust ROP/MAX     │
                                                    └──────────────────────┘
```

### 5.4 Medallion Architecture on Iceberg

| Layer | Contents | Maximo Mapping |
|-------|----------|----------------|
| **Bronze** | Raw, as-arrived | WORKORDER, ASSET, FAILUREREPORT, MEASUREMENT extracts; Monitor streams; AI Service logs; docs via Docling |
| **Silver** | Cleansed, conformed EAM entities | `ASSET_DIM`, `WORKORDER_FACT`, `FAILURE_FACT`, `MEASUREMENT_FACT` — standardized keys, synonym-decoded codes, time-aligned sensors, deduped transactions |
| **Gold** | Business-ready | Per-asset/per-time feature tables for predictive maintenance, reliability strategies, cost marts, PM effectiveness, executive KPIs |

The medallion pattern maps cleanly because Iceberg's schema evolution absorbs Maximo attribute changes, and time-travel lets you replay history when a downstream Silver/Gold rule changes.

### 5.5 Closed-Loop Write-Back

Three write-back patterns, in increasing sophistication:

1. **AI Service-mediated** — accepted recommendations (problem codes, field values, similar-WO links, reliability boundaries/failure modes) write back through AI Service into WORKORDER and related objects.
2. **Direct Maximo REST/JSON** — Gold-layer outputs POST/PUT to Maximo object structures (e.g., create WO on high failure probability, update item ROP/MAX, change asset status).
3. **Orchestrated via watsonx Orchestrate** — the reference repo **`IBM/maximo-wxo-integration`** builds a Maximo AI Assistant: a REST service via **Uvicorn (ASGI)**, OAuth2 auth, system property **`mxe.framework.ui.wxo`** (integrationId, regionId, serviceId), and an automation script **`MYTOKEN`** for token generation.

| watsonx.data / watsonx.ai Output | Maximo Action | Method |
|---|---|---|
| Failure probability > 80% | Create high-priority WO | REST (POST /os/mxwo) |
| Anomaly detected | Generate service request | REST (POST /os/mxsr) |
| Optimal ROP/MAX | Update item reorder points | REST (PUT /os/mxitem) |
| RAG troubleshooting guide | Attach to WO long description | REST (PUT /os/mxwo) / Orchestrate |

---

## PART FOUR: Use Cases

### 6.1 Predictive Maintenance at Scale
Extract WORKORDER/FAILUREREPORT/MEASUREMENT into Iceberg; engineer features in Spark (MTBF, degradation rate, operating hours since PM, ambient/load factors); train and serve models on watsonx.ai; score continuously; auto-create WOs on high risk; retrain on new failure data. Where Maximo Predict's pre-built models stop, watsonx.ai custom models with external inputs continue.

### 6.2 Asset Health & Remaining Useful Life
Enrich Maximo Health's internal scoring with external data (weather/corrosion, SCADA load, BMS energy, supply-chain risk, replacement cost). Build survival/RUL models on watsonx.ai over Gold feature tables; write enhanced scores back into Maximo Health via AI Service.

### 6.3 Work-Order Intelligence & NLP
Years of free-text WO descriptions are a corpus, not noise. Use Docling + watsonx.ai for text classification, entity extraction (parts, failure modes), urgency detection, similarity matching, root-cause clustering, auto-summarization, and a searchable maintenance knowledge base — grounded via Milvus/OpenSearch RAG.

### 6.4 Inventory Optimization with ML
Work-order-driven demand forecasting (order seal kits for predicted pump failures), seasonal patterns, cross-site transfer optimization, supplier performance analytics, obsolescence prediction, budget-constrained service-level optimization — joining INVENTORY/MATUSETRANS with PO and failure-prediction data.

### 6.5 GenAI Maintenance Agents
Deploy troubleshooting, planning, and knowledge agents via watsonx.ai + watsonx Orchestrate, grounded on the lakehouse (sensor history, WO history, manuals). A technician asks "Turbine 47 unusual noise — what to check?"; the agent queries Gold + RAG corpus, returns a prioritized guide, and can create a high-priority WO in Maximo.

### 6.6 Compliance, Safety & Digital Twins
Automated inspection-compliance tracking, overdue-PM-to-violation flags, safety-incident correlation, audit-ready reports with full IKC lineage; and Iceberg-backed digital twins combining real-time state, history, and ML predictions for what-if simulation.

---

## PART FIVE: watsonx.data vs. Databricks vs. MAS Native

### 7.1 watsonx.data vs. Databricks — Head to Head

| Dimension | watsonx.data | Databricks |
|-----------|--------------|------------|
| Primary table format | **Apache Iceberg** (open) | Delta Lake (open format, runtime-coupled) |
| Execution engine | Presto (Java) + **Presto C++/Velox** | **Photon** (proprietary vectorized) |
| Governance | IKC + semantic layer + Data Product Hub + Ranger option | Unity Catalog (Databricks-centric) |
| RAG / vector | Embedded **Milvus** + OpenSearch + **OpenRAG** (Docling/Langflow) | Own runtime + vector integrations |
| Architecture stance | "Open hybrid by design," multi-engine, zero-copy federation | More tightly coupled to the Databricks runtime |
| AI layer | watsonx.ai (+ Maximo AI Service already bridged) | Mosaic AI / partner models |
| IBM price/perf claim | "< 60% the cost of Photon" at equal runtime (IBM benchmark) | — |

> **Caveat:** IBM's price/performance figures are internal benchmarks (100 TB TPC-DS). Databricks' Delta + Photon may still be preferred for teams deeply invested in the Databricks runtime. Hybrid (Delta in Databricks, Iceberg in watsonx.data) is feasible but requires deliberate cross-catalog governance reconciliation.

### 7.2 Decision Framework

**Choose watsonx.data when:** you are IBM-standardized (Maximo, Cognos, OpenShift, watsonx.ai via AI Service); you want an open Iceberg foundation with no runtime lock-in; you value one-vendor governance (IKC + watsonx.governance) across data and AI; cost control via fit-for-purpose engines matters; or your RAG corpus (manuals, WO text) fits the Docling/Milvus/OpenRAG pipeline.

**Choose Databricks when:** you need the deepest managed MLOps maturity and the widest third-party ecosystem, or you are already invested in the Databricks runtime (see DOC5).

**Keep MAS native (both cases) when:** you need out-of-the-box Health scoring, Monitor real-time alerting, Predict quick-start models, Assistant Q&A, or ≤3-author Cognos reporting on Maximo-only data.

### 7.3 Complementary Architecture

```
DAY-TO-DAY OPERATIONS (MAS 9 Native)
├── Monitor: real-time alerts        ├── Assistant: quick Q&A
├── Operational Dashboards           └── Cognos: standard reports

STRATEGIC ANALYTICS (watsonx.data + watsonx.ai)
├── Cross-system Iceberg lakehouse (Maximo + ERP + IoT + external)
├── Custom ML on watsonx.ai         ├── Self-service BI (Presto/Db2, 100+ users)
├── WO NLP + RAG (Docling/Milvus)   ├── GenAI agents (watsonx Orchestrate)
└── Enterprise governance (IBM Knowledge Catalog)
```

---

## PART SIX: Industry-Specific Use Cases

| Industry | watsonx.data + Maximo Value |
|----------|------------------------------|
| **Utilities & Energy** | Transformer failure prediction blending Maximo history + weather + load; vegetation-risk models; NERC/FERC compliance reporting with IKC lineage |
| **Oil & Gas** | Pipeline integrity (inline inspection + cathodic protection) corrosion models; HSE correlation; turnaround optimization |
| **Manufacturing** | OEE analytics, maintenance-to-quality correlation, production-aligned maintenance scheduling, energy-per-unit optimization |
| **Transportation & Fleet** | Telematics + Maximo fleet health; route-difficulty-adjusted maintenance; per-depot parts forecasting |
| **Facilities & Real Estate** | BMS + Maximo building analytics; capital planning via RUL; tenant-impact prediction |
| **Healthcare & Medical Devices** | Regulated PdM with full IKC/watsonx.governance lineage; automated compliance reporting |

*(Named end-customer ROI figures were not present in the current research base; the industry patterns above are architectural, not customer-attributed. Backfill with IBM case studies when sourcing the eventual blog series.)*

---

## PART SEVEN: Implementation Roadmap

### Phase 1 — Foundation: Extraction & Iceberg Lakehouse (Months 1–3)
Provision watsonx.data (SaaS or CPD/OpenShift), configure object storage + HMS/Iceberg catalog; build MIF/Kafka extractors for WORKORDER, ASSET, LOCATIONS, FAILUREREPORT, MEASUREMENT; land Bronze; build Silver conformed entities; first Gold KPIs (WO counts, cost, backlog, PM compliance); stand up IKC governance, classification, masking (LABTRANS PII). **Team:** 1 data engineer, 1 Maximo functional expert.

### Phase 2 — Analytics: Dashboards & Descriptive (Months 2–4)
Maintenance cost analytics, PM effectiveness, failure-pattern analysis, backlog management, executive KPIs; connect Power BI/Tableau to Presto/Db2 endpoints. **Team:** 1 data analyst, 1 planner.

### Phase 3 — Prediction: ML on watsonx.ai (Months 4–8)
Feature engineering in Spark; train/compare models (AutoAI); validate with reliability SMEs; serve via watsonx.ai; prediction dashboards; pilot closed-loop WO creation. **Team:** 1 data scientist, 1 reliability engineer, 1 data engineer.

### Phase 4 — AI: RAG & Agents (Months 5–9)
Docling→Milvus/OpenSearch corpus of manuals/SOPs/WO history; troubleshooting + planning agents via watsonx.ai/Orchestrate; real-time IoT streaming; external data (weather, production, energy). **Team:** 1 ML engineer, 1 data engineer, 1 maintenance SME.

### Phase 5 — Scale: Enterprise Rollout (Months 6–12)
All asset classes/sites; full ERP integration; self-service enablement on Presto/Db2 SQL; engine right-sizing for cost; governance hardening. **Team:** full data team + business stakeholders.

---

## 10. Team Exploration Assignment Matrix

| Topic Area | Assigned To | Estimate | Priority |
|------------|-------------|----------|----------|
| MAS 9 native analytics (Health, Predict, Monitor) | Reliability Engineer | 2 wks | HIGH |
| MIF REST/JSON extraction + synonym domains | Integration Developer | 2 wks | HIGH |
| watsonx.data on CPD/OpenShift setup | Data/Platform Engineer | 3 wks | HIGH |
| Iceberg medallion modeling for Maximo objects | Data Engineer | 2 wks | HIGH |
| Presto vs Spark vs Db2 engine strategy | Data Architect | 1 wk | MEDIUM |
| watsonx.ai model training/serving | Data Scientist | 3 wks | MEDIUM |
| IBM Knowledge Catalog governance | Data Governance Lead | 2 wks | MEDIUM |
| Milvus/OpenRAG document RAG | ML Engineer | 3 wks | MEDIUM |
| Closed-loop write-back (AI Service / Orchestrate) | Integration Developer | 2 wks | LOW (Phase 3+) |
| watsonx.data vs Databricks cost modeling | Architect + Finance | 1 wk | MEDIUM |

---

## 11. ROI & Business Case

The DOC5 EAM ROI framework applies unchanged (unplanned-downtime reduction 20–50%, maintenance spend ~25%, inventory carrying cost ~30%, asset-life extension 20–40%, ~50% manual-analytics-labor reduction). The watsonx.data-specific cost argument layers on top:

| Lever | watsonx.data Basis |
|-------|--------------------|
| Data warehouse cost | "up to 50%" reduction (IBM claim) |
| Engine cost vs Photon | "< 60% the cost" at equal runtime (IBM benchmark, 100 TB TPC-DS) |
| Licensing reuse | watsonx.ai already bridged via MAS AI Service; RU = $1 metered per-second |
| Vendor consolidation | One IBM support/licensing path vs multi-vendor stack |

> Build the business case on your own workload profile. The IBM figures are directional; validate with a proof-of-concept on representative Maximo volumes before committing budget.

---

## 12. References & Resources

### watsonx.data — Product & Architecture
- watsonx.data product: https://www.ibm.com/products/watsonx-data
- watsonx.data FAQs (architecture, engines, storage): https://cloud.ibm.com/docs/watsonxdata?topic=watsonxdata-faqs
- watsonx.data pricing: https://www.ibm.com/products/watsonx-data/pricing
- Spark introduction in watsonx.data: https://www.ibm.com/docs/en/watsonxdata/standard/2.2.x?topic=spark-introduction-watsonxdata

### Engines & Performance
- Presto C++ / Velox + Intel Sapphire Rapids benchmark: https://www.ibm.com/new/product-blog/accelerating-query-performance-with-watsonx-data-presto-c-and-intel-sapphire-rapid-processor-on-aws
- Superior price-performance announcement: https://www.ibm.com/new/announcements/delivering-superior-price-performance-and-enhanced-data-management-for-ai-with-ibm-watsonx-data

### Iceberg & Interop
- Db2 creating Iceberg tables in watsonx.data: https://www.ibm.com/docs/en/db2-warehouse?topic=watsonxdata-creating-iceberg-tables-in
- Databricks Unity Catalog integration: https://www.ibm.com/docs/en/watsonxdata/saas?topic=integrations-integrating-databricks-unity-catalog

### Governance, Vector & RAG
- IBM Knowledge Catalog integration: https://www.ibm.com/docs/en/watsonxdata/standard/2.1.x?topic=integrations-integrating-knowledge-catalog
- Vector database (Milvus) announcement: https://www.ibm.com/new/announcements/ibm-watsonx-data-vector-database-ai-ready-data-management
- OpenRAG announcement: https://www.ibm.com/new/announcements/coming-soon-to-watsonx-data-turn-unstructured-data-into-context-for-ai-with-openrag
- OpenSearch on watsonx.data: https://www.ibm.com/new/announcements/opensearch-now-available-on-watsonx-data-for-enterprise-search-and-ai-retrieval

### MAS 9 + watsonx Integration
- MAS architecture: https://www.ibm.com/docs/en/masv-and-l/cd?topic=models-maximo-application-suite-architecture
- MAS AI Service: https://www.ibm.com/docs/en/masv-and-l/cd?topic=ons-ai-service
- AI Service data security/privacy: https://www.ibm.com/docs/en/masv-and-l/cd?topic=service-data-security-privacy
- Deploying watsonx.ai on-prem (with MAS): https://www.ibm.com/docs/en/masv-and-l/cd?topic=premises-deploying-watsonx
- watsonx.data Presto connection (CPD): https://www.ibm.com/docs/en/watsonx/saas?topic=connectors-watsonxdata-presto-connection
- Maximo REST API query docs: https://ibm-maximo-dev.github.io/maximo-restapi-documentation/query/selecting/
- Maximo Health 9.1 / Predict 9.1 what's-new: https://www.ibm.com/docs/en/mhmpmh-and-p-u/cd?topic=wn-whats-new-in-maximo-health-91-maximo-predict-91
- IBM/maximo-wxo-integration reference repo: https://github.com/IBM/maximo-wxo-integration
- Predictive maintenance (concept): https://www.ibm.com/think/topics/predictive-maintenance

### Provenance Flags
- MAS 9.1 "open, governed reference architecture" framing rests partly on community channels, not primary IBM docs — verify with your IBM account team.
- IBM Granite specifics and watsonx.governance depth were thin in the source research; see the companion watsonx-platform research doc (DOC14).
- No named end-customer ROI case studies appeared in the source research; source these from IBM case-study pages before publishing the blog series.

---

*DOC13 v1.0 — companion to DOC5 (Databricks). Source for the forthcoming MAS-WATSONX-DATA blog series. To be enhanced as watsonx.data 2.2.x+ features and Granite/governance research mature.*
