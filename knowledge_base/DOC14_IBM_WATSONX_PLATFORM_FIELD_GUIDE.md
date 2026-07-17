# The IBM watsonx Platform: A Field Guide for Maximo Teams

**Document:** DOC14 - IBM watsonx Platform (watsonx.ai · Granite · watsonx.governance · watsonx Orchestrate) and its Maximo ties
**Version:** 1.0 (seed — to be enhanced)
**Date:** July 17, 2026
**Audience:** Maximo/EAM architects, data & AI leads, and IT decision-makers who need a grounded map of the watsonx platform and exactly how MAS 9 plugs into it
**Scope:** A foundational reference on the four watsonx pillars, IBM Granite foundation models, fine-tuning, agents, governance, deployment, and pricing — with a dedicated section on how MAS 9's AI Service and Maximo Assistant actually consume watsonx. Companion to DOC13 (watsonx.data + Maximo lakehouse) and DOC5 (Databricks).
**Status:** This is a **seed document**. It is grounded in IBM documentation and announcements (URLs in §13) and deliberately flags every gap, unverified claim, and provenance caveat so later passes know exactly what to deepen and verify. It does not paper over unknowns.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Four Pillars of watsonx](#2-the-four-pillars-of-watsonx)
3. [watsonx.ai — The Enterprise AI Studio](#3-watsonxai--the-enterprise-ai-studio)
4. [IBM Granite Foundation Models](#4-ibm-granite-foundation-models)
5. [Third-Party & Open Models on watsonx.ai](#5-third-party--open-models-on-watsonxai)
6. [Fine-Tuning & Customization](#6-fine-tuning--customization)
7. [watsonx.governance — AI Assurance & Risk](#7-watsonxgovernance--ai-assurance--risk)
8. [watsonx Orchestrate — The Agentic Control Plane](#8-watsonx-orchestrate--the-agentic-control-plane)
9. [How MAS 9 Consumes watsonx (AI Service & Assistant)](#9-how-mas-9-consumes-watsonx)
10. [Deployment Models & Pricing](#10-deployment-models--pricing)
11. [What This Means for Maximo Teams](#11-what-this-means-for-maximo-teams)
12. [Open Questions & Gaps to Close](#12-open-questions--gaps-to-close)
13. [References](#13-references)

---

## 1. Executive Summary

"watsonx" is not one product — it is IBM's enterprise AI platform, organized into four pillars: **watsonx.ai** (build/tune/serve models), **watsonx.data** (the open lakehouse — see DOC13), **watsonx.governance** (govern and de-risk AI), and **watsonx Orchestrate** (coordinate AI agents across apps). For a Maximo shop, the platform matters for one concrete reason: **MAS 9.1's AI Service is a bridge into watsonx**, and understanding that bridge — what it bundles, what it consumes, and what it does not include — is the difference between a well-scoped AI rollout and an over-licensed one.

### The one-paragraph version

MAS 9.1 ships a **limited-use watsonx.ai license** through AI Service (an add-on that consumes AppPoints, commonly cited around 10). That entitlement powers Maximo Assistant, the FMEA content builder, similarity identification, and field-value recommendations — and, per IBM's on-prem deployment docs, **Maximo AI Service uses `gpt-oss-120b` for most AI features, and an embedding model (`embedding_transformer_en_slate.125m`) for similarity**. It does **not** include broad watsonx.ai usage for unrelated projects, nor does it include watsonx.governance or watsonx Orchestrate — those are separately licensed products you add when your AI ambitions grow past Maximo's built-in features.

### What each pillar does, in one line

| Pillar | One-line role | Maximo relevance |
|--------|---------------|------------------|
| **watsonx.ai** | Studio to build, tune, and serve foundation & ML models | Powers Maximo AI Service inference (gpt-oss-120b + slate embeddings) |
| **watsonx.data** | Open Iceberg lakehouse for all your data | Cross-system EAM analytics & feature store (DOC13) |
| **watsonx.governance** | Govern/monitor AI across its lifecycle | Factsheets, drift/bias monitors, EU AI Act alignment for Maximo AI models |
| **watsonx Orchestrate** | Agentic control plane across enterprise apps | Coordinates Maximo + M365/ServiceNow/Workday maintenance workflows |

---

## 2. The Four Pillars of watsonx

```
┌──────────────────────────────────────────────────────────────────────┐
│                           IBM watsonx                                  │
│                                                                        │
│   watsonx.ai            watsonx.data         watsonx.governance        │
│   ───────────           ────────────         ─────────────────         │
│   Build / tune /        Open Iceberg         Govern / monitor /        │
│   serve models          lakehouse            de-risk AI                 │
│   (Granite, Llama…)     (Presto/Spark)       (Factsheets, OpenScale)   │
│                                                                        │
│                     watsonx Orchestrate                                │
│                     ───────────────────                                │
│              Agentic control plane over enterprise apps                │
│              (agents coordinate Maximo + M365 + ServiceNow…)           │
└───────────────────────────────┬────────────────────────────────────────┘
                                │  MAS 9.1 AI Service (bridge)
                                ▼
                        ┌──────────────────┐
                        │  Maximo (MAS 9)  │  system of record for assets/work
                        └──────────────────┘
```

IBM frames the pillars as modular but integrated: watsonx.ai provides the runtime and development layer; watsonx.governance the lifecycle governance/risk layer; watsonx Orchestrate the agentic automation fabric that sits above application systems like Maximo. Maximo remains the system of record; its AI features are externalized to watsonx.ai for inference, constrained/monitored by watsonx.governance, and coordinated by watsonx Orchestrate.

---

## 3. watsonx.ai — The Enterprise AI Studio

watsonx.ai is the unified studio for foundation-model inferencing, prompt engineering, tuning, AutoAI, and notebooks, organized around **projects** tied to a **watsonx.ai Runtime service** instance (which provides compute and inference). A project must be associated with a Runtime service before Prompt Lab or API calls can run.

| Component | What it does | Notes |
|-----------|--------------|-------|
| **Prompt Lab** | Interactive prompting of deployed foundation models | Structured (Instruction / Examples / Try) and Freeform modes; prompt variables; parameters temperature, top-p, max tokens. Admin/Editor role required. Prompt-engineering only — you do not create new models here. |
| **Tuning Studio** | Adapt models via LoRA fine-tuning and prompt tuning | Works with unstructured data; runs on GPU (Professional/on-prem). |
| **AutoAI** | Automated ML: data prep, model-type ID (classification/regression), feature selection, pipeline generation & ranking | Metered in **Capacity Unit Hours (CUH)**, not tokens; included in Lite and Professional. |
| **Notebooks** | Jupyter (Python/R), RStudio, Spark | Lite = small runtimes only; Professional adds large (8+ vCPU) and GPU. |
| **Deployment spaces** | Promote experiments to production inference endpoints | Versioning, access control, monitoring (CPD MLOps-aligned). |
| **Inferencing / chat API** | Foundation-model calls via the Runtime service | **Chat API supports tool calling**: pass messages + a list of tools; model selects tool + args and generates text in one interaction. Metered in Resource Units. |
| **Agent Lab (beta)** | Guided build/deploy of AI agents | Specify model backend, tools, prompts, workflows. *Docs are high-level; no named agent framework/ADK cited in the watsonx.ai source — see §12.* |
| **Resource hub** | Model catalog tiles | API model ID, per-token price, context window, model-card links. |

On-demand exclusive-use models can run on dedicated GPU runtimes (**L40S, A100, H100, H200**).

---

## 4. IBM Granite Foundation Models

Granite is "a family of open, trusted AI models for business," spanning language, vision, speech, embeddings, code, time-series, and guardrail models — **open source under the Apache 2.0 license**. IBM models accessed via watsonx.ai are **indemnified**; the same models pulled from third-party repos (e.g., Hugging Face) are **not**.

### 4.1 Granite language models

- **Granite 4.1** — a generation of **dense, decoder-only** models in **3B, 8B, and 30B** base and instruct sizes (catalog IDs `granite-4-1-3b`, `granite-4-1-8b`, `granite-4-1-30b`, plus `granite-vision-4-1-4b`). IBM reports an improved post-training pipeline (SFT + RL alignment) yielding "enhanced tool calling, instruction following, and chat capabilities," optimized for **vLLM, SGLang, and llama.cpp**, all under Apache 2.0. Granite-4-1-8B is a long-context instruct model supporting 12 languages (English, German, Spanish, French, Japanese, Portuguese, Arabic, Czech, Italian, Korean, Dutch, Chinese).
  > *Provenance flag: the research asserts a "late April 2026" release for Granite 4.1. That date post-dates the assistant's training cutoff and is research-sourced only — verify against research.ibm.com before publishing.*
- **Granite 3.x** — e.g. `ibm/granite-3-2b-instruct` and `ibm/granite-3-8b-instruct` (both **131,072-token context**), `granite-13b-instruct-v2` (**8,192 context**, prompt-tunable), `ibm/granite-4-h-small` (131,072 context).

### 4.2 Specialized Granite models

| Model | Purpose | Grounded facts |
|-------|---------|----------------|
| **Granite Code** | Code generation/completion | `granite-8b-code-instruct`, **128K context**, Apache 2.0; **Granite.Code** IDE extension for completion/refactor/docs/review |
| **Granite Guardian** | Safety/risk detection | Detects "jailbreak attempts, profanity, and hallucinations related to tool calls and RAG"; thinking (`<think>`+`<score>`) and non-thinking (`<score>`) modes; evaluates RAG **context relevance, groundedness, answer relevance**; Bring-Your-Own-Criteria. IDs `granite-guardian-3-2b`/`-3-8b` |
| **Granite time-series (TinyTimeMixer / TTM)** | Multivariate time-series forecasting | "Compact pre-trained models"; Granite-TimeSeries-TTM-R2; NeurIPS 2024 paper; `granite-tsfm` (GitHub/PyPI); catalog `granite-ttm-512-96-r2`, **priced per 1,000 data points** (min context 512 data points) |
| **Granite Vision** | Document/table/chart extraction | `granite-vision-3-2-2b`, 131,072 context; "high leaderboard performance in table and chart extraction" |
| **Granite Embedding** | Retrieval embeddings | Multilingual R2 "scales retrieval support to more than 200 languages"; `granite-embedding-278m-multilingual` |

> **Benchmark gap:** the research base did not include verbatim benchmark scores (MMLU/HELM/etc.) for Granite — those live in model cards/papers. Do not quote Granite benchmark numbers until sourced directly.

> **Time-series ↔ Maximo caution:** Granite TTM is *architecturally* a strong fit for predictive-maintenance sensor forecasting, but **no source in this research states TTM powers Maximo Predict/Health/Monitor.** Treat any "Granite TTM runs Maximo Predict" claim as unverified.

---

## 5. Third-Party & Open Models on watsonx.ai

watsonx.ai is a multi-model catalog, not Granite-only:

- **Meta Llama** (tool-calling supported): `llama-3-3-70b-instruct`, `llama-3-2-1b/3b-instruct`, `llama-3-2-11b/90b-vision-instruct`, `llama-guard-3-11b-vision-instruct`; newer `llama-4-maverick-17b-128e-instruct` (int4 & fp8; fp8 priced ~USD 0.35 input / 1.40 output per 1K tokens).
- **Mistral** — `mistralai/mistral-large` (chat + tool calling).
- **Google** — `google/flan-t5-xl` (3B, 4,096 context, prompt-tunable).
- **OpenAI (open weights)** — `openai/gpt-oss-120b` (131,072 context) — **the model Maximo AI Service uses for most features** (see §9).
- **Regional** — `sdaia/allam-1-13b-instruct` (Saudi Data & AI Authority).
- **Embeddings/reranking** — `slate-125m/30m-english-rtrvr-v2`, `all-mini-l6-v2`, `multilingual-e5-large`; reranker `ms-marco-minilm-l-12-v2`.

---

## 6. Fine-Tuning & Customization

- **LoRA** — "the primary mechanism for parameter-efficient adaptation": low-rank matrices added to selected weights; base weights frozen. GPU-hour pricing cited: A100 ~USD 6.3/hr, H100 ~USD 14.85/hr.
- **Prompt tuning** — supported for select models (`granite-13b-instruct-v2`, `google/flan-t5-xl` flagged prompt-tunable).
- **AutoAI** — for classical ML (auto feature engineering, algorithm selection, HPO), CUH-metered; manual notebook workflows (scikit-learn, XGBoost, PyTorch) also supported.

> **Gaps flagged by the research (do not assert as productized):**
> - **QLoRA** — described conceptually (LoRA + quantized base weights) but "more commonly detailed in research papers than in product documentation"; not confirmed as a named watsonx.ai feature.
> - **InstructLab** — **not confirmed** in the source docs. Any InstructLab-in-watsonx.ai claim is unverified by this research and must be sourced before use.

---

## 7. watsonx.governance — AI Assurance & Risk

IBM positions watsonx.governance as an "enterprise AI assurance layer" combining AI-native governance with enterprise GRC across hybrid, multi-vendor environments.

| Capability | What it provides |
|------------|------------------|
| **Governance Graph** | A "living, connected map" of the AI estate — assets → policies → risks → regulatory requirements, across platforms/environments |
| **AI Factsheets** | Standardized auto-logged model/prompt documentation (creation data, training datasets, performance, deployment context, lifecycle, versions) |
| **Model inventory dashboard** | Consolidated view of all tracked assets — including third-party-built models |
| **Watson OpenScale monitors** | Accuracy/fairness for ML; PII/toxicity/hate-speech guardrails for GenAI; Model Health real-time tracking; drift evaluations |
| **OpenPages Model Risk Governance** | GRC workflows, risk-assessment questionnaires, risk scoring integrated with the Governance Graph |
| **EU AI Act alignment** | Documentation, transparency, incident reporting, human-oversight support. Fines cited up to **€15M or 3% of worldwide annual turnover** for obligation violations (€7.5M / 1.5% for incorrect information) |

**Deployment nuance:** IBM Cloud deployments provide most governance capabilities and can integrate IBM OpenPages for a Governance console; AWS deployments focus on Model Risk Governance.

**Maximo relevance:** Maximo AI models (FMEA recommenders, similarity classifiers, Assistant prompts) can be registered in watsonx.governance — Factsheets for documentation, OpenScale monitors for drift on failure-prediction inputs, guardrails so an assistant never recommends deferring safety-critical maintenance beyond limits.

---

## 8. watsonx Orchestrate — The Agentic Control Plane

Orchestrate is the "agentic control plane" for scaling and governing AI agents that automate workflows across enterprise systems — bringing "your entire agent ecosystem into one control plane."

- **Agent Catalog** — browse prebuilt IBM/partner agents, "bring your own" agents; shows how each connects across APIs, tools, and systems (M365, Box, Jira, Slack, Salesforce, …).
- **Skills specifications & MCP servers** — agent-agnostic Skills specs (`sop-builder`, `wxo-builder`) in the Agent Skills format; two **MCP servers** (a Documentation Server for ADK docs search, a CLI Server to run ADK CLI commands). Recommended workflow is specification-driven: `sop-builder` → SME-validated SOP → `wxo-builder` → Orchestrate project (`README.md` as implementation spec).
- **Agent Development Kit (ADK)** + wxO VS Code extension; developer modes **Ask / Plan / Advanced / Code** (MCP access varies by mode).
- **Integrations** — Amazon S3, Asana, Box, Dropbox, GitHub, Gmail, Google Drive, Jira, Microsoft Dynamics 365, Outlook, SharePoint, Teams, Oracle HCM, Salesforce, ServiceNow, Slack, SAP SuccessFactors, Trello, Workday, Zendesk, and more; consumes RPA bots where no open API exists.

**Maximo relevance:** an Orchestrate agent can detect a planned-maintenance task in Maximo, check technician availability in Workday, confirm parts in ERP, coordinate scheduling via Teams, and update Salesforce with downtime — with the whole flow visible and governable. The IBM reference repo **`IBM/maximo-wxo-integration`** demonstrates a Maximo AI Assistant wired through Orchestrate (Uvicorn/ASGI REST service, OAuth2, system property `mxe.framework.ui.wxo`, `MYTOKEN` automation script).

---

## 9. How MAS 9 Consumes watsonx

This is the section a Maximo team should read twice.

### 9.1 AI Service is the bridge

**Maximo AI Service** is a MAS add-on that "connects Maximo Application Suite to watsonx AI systems or services." It manages configuration, training/retraining, delegates inference to **watsonx.ai or a local embedded runtime**, runs health checks, and supports multitenancy. It **replaced the earlier "AI broker" as of August 1, 2025** — customers on the broker must uninstall it and deploy AI Service 9.1 to keep those features. Training/output data must currently be **English**.

**Deployment options:** all-SaaS (IBM hosts MAS + AI Service + watsonx.ai); on-prem (AI Service 9.1 with MAS 9.0+ via CLI/Ansible); or hybrid (MAS on-prem, AI Service as SaaS — IBM provides an AI Service URL, API key, and tenant ID configured in Manage system properties `mxe.int.aibrokerapikey`, `mxe.int.aibrokerapiurl`, `mxe.int.aibrokertenantid`).

### 9.2 What models actually run

Per IBM's on-prem watsonx deployment doc for Maximo:
- **`gpt-oss-120b`** powers **most** Maximo AI Service features.
- **Similarity** uses an **embedding model** — on-prem, the template `embedding_transformer_en_slate.125m` (Watson NLP), deployed by patching the `watsonxaiifm` custom resource's `install_model_list` and verified with `oc get`.
- The **Agentic Maximo Assistant** is described (in the AI Service feature table) as built with **Llama**, using templates `nl2oslc`, `insightsgenerator`, `docsearch`, and can be powered by models such as `gpt-oss-120b` and `Llama-4-Maverick-17B-128E-Instruct-FP8`. It translates natural language to OSLC API calls (`nl2oslc`) and can complete tasks, not just answer.

### 9.3 The AI features AI Service enables

Maximo Assistant (conversational + agentic), field classification/value recommendations (incl. problem-code suggestions), similarity identification for work orders and IT tickets, AI-generated asset condition insights/alerts, and **AI recommendations in Reliability Strategies** — including the **FMEA builder** (`fmea` model template: generate boundary info and failure-list components/mechanisms/influences, human-in-the-loop accept/modify).

### 9.4 What MAS bundles vs. what you license separately

| Capability | Included with MAS/AI Service? |
|------------|-------------------------------|
| **Limited-use watsonx.ai** for Maximo AI features | ✅ Yes — bundled with AI Service 9.1 (adds AppPoint cost, commonly cited ~10) |
| Broad watsonx.ai usage (unrelated projects, large-scale tuning) | ❌ Separate watsonx.ai licensing |
| **watsonx.governance** | ❌ Separate product |
| **watsonx Orchestrate** | ❌ Separate product |
| **watsonx.data** | ❌ Separate product (see DOC13) |

**The strategic read:** MAS gives you a *contained, governed on-ramp* to watsonx. Start with AI Service's bundled entitlement (Assistant, FMEA, similarity), then license governance/Orchestrate/data as your AI maturity and cross-system ambitions grow.

---

## 10. Deployment Models & Pricing

**Billing units (watsonx.ai):**
- **Resource Units (RU)** for foundation-model inference — "one RU corresponds to 1,000 tokens, combining both input and output tokens" (~750 words per 1,000 tokens); input and completion charged at the same rate.
- **Capacity Unit Hours (CUH)** for ML/compute (AutoAI, notebooks).
- **Per-1,000-data-points** for time-series models.

**IBM Cloud SaaS plans:**

| Plan | Key limits |
|------|-----------|
| **Lite** | 1 instance/account, 1 user, **10 CUH/month**, small runtimes only, no GPU, no customer-key encryption |
| **Professional** | Multiple instances, unlimited users, large runtimes (8+ vCPU), GPU environments, customer-managed keys, CUH billing |
| **Essentials (PAYG)** | Production from **$0/month**; ML at **$0.55/CUH** |
| **Standard (PAYG)** | From **$1,110/month**; ML at **$0.45/CUH** |

GPU hosting example: L40S ~**$4.43/hr** single-GPU (~$8.86 dual). Tuning GPU-hours: A100 ~$6.3/hr, H100 ~$14.85/hr.

**AWS Marketplace (software):** licensed by **Virtual Processor Core (VPC)** subscription, not RU/CUH — e.g., "IBM watsonx.ai software 67 VPC… **$643,200.00** for a 12-month contract."

**On-prem:** Cloud Pak for Data on Red Hat OpenShift; install NFD + NVIDIA GPU Operators, deploy via `cpd-cli manage apply-cr`, deploy/patch models via the `watsonxaiifm` custom resource, verify with `oc get`. Custom foundation models can be loaded from storage and registered via the UI.

> **Pricing caveat:** the research surfaced pricing in two units (per-1,000-token in the supported-models doc, per-million-token on the pricing page); they reconcile as the same rate scaled ×1,000. Always confirm against the live IBM pricing page and supported-models doc before quoting figures — these move.

---

## 11. What This Means for Maximo Teams

1. **You are probably already in the watsonx ecosystem.** If Maximo Assistant or AI Service is on, you are running watsonx.ai inference (gpt-oss-120b + slate embeddings). Extending to watsonx.data (DOC13) and watsonx.governance reuses that footprint.
2. **Adopt in tiers.** AI Service first (bundled) → watsonx.governance when models become decision-critical or regulated → watsonx Orchestrate when maintenance workflows span Maximo + ERP/HR/CRM → watsonx.data when you need cross-system analytics and a feature store.
3. **Govern early, not later.** Register Maximo AI models in watsonx.governance from the start — Factsheets + drift monitors are far cheaper to stand up before an audit than after.
4. **Keep humans in the loop.** FMEA and Assistant outputs are recommendations; the agentic path (Orchestrate) should propose-then-approve for safety-critical maintenance until confidence is earned.

---

## 12. Open Questions & Gaps to Close

Explicit list of what this seed doc could **not** verify — the deepening backlog:

- **Granite benchmarks** — no verbatim scores sourced; pull from model cards/papers.
- **Granite 4.1 release date** ("late April 2026") — research-asserted only; verify on research.ibm.com.
- **InstructLab in watsonx.ai** — not confirmed in source docs; verify or drop.
- **QLoRA** — not confirmed as a named product feature; verify.
- **Granite TTM ↔ Maximo Predict** — architecturally plausible, but **no source ties TTM to Maximo Predict/Health/Monitor**. Do not assert; investigate whether Maximo Predict uses Granite TS.
- **Agent Lab framework/ADK** — watsonx.ai's Agent Lab docs are high-level; the named ADK belongs to watsonx **Orchestrate**, not clearly to watsonx.ai — clarify the relationship.
- **AppPoints for AI Service** — "~10" is commonly cited but confirm exact current value against the MAS 9.1 licensing doc.
- **Named EAM case studies / ROI** — none surfaced; source from IBM case-study pages.

---

## 13. References

### watsonx platform
- watsonx overview: https://www.ibm.com/products/watsonx
- watsonx.ai: https://www.ibm.com/products/watsonx-ai
- watsonx.ai foundation models: https://www.ibm.com/products/watsonx-ai/foundation-models
- Supported foundation models (IDs / pricing / context): https://www.ibm.com/docs/en/watsonx/saas?topic=solutions-supported-foundation-models
- watsonx.ai pricing: https://www.ibm.com/products/watsonx-ai/pricing
- Studio plans (Lite/Professional): https://www.ibm.com/docs/en/watsonx/saas?topic=cloud-watsonxai-studio-plans
- Prompt Lab: https://www.ibm.com/docs/en/watsonx/saas?topic=prompts-prompt-lab
- Tuning methods: https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-tuning-methods.html?context=wx
- Tool calling: https://www.ibm.com/watsonx/developer/capabilities/tool-calling
- Agent Lab (beta): https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-agent-lab.html?context=wx

### Granite
- Granite: https://www.ibm.com/granite
- Granite 4.1 blog: https://research.ibm.com/blog/granite-4-1-ai-foundation-models
- Granite-4.1-8b model card: https://huggingface.co/ibm-granite/granite-4.1-8b
- Granite Guardian docs: https://www.ibm.com/granite/docs/models/guardian
- Granite TTM-R2 card: https://huggingface.co/ibm-granite/granite-timeseries-ttm-r2

### Governance & Orchestrate
- watsonx.governance: https://www.ibm.com/products/watsonx-governance
- Model governance: https://www.ibm.com/products/watsonx-governance/model-governance
- Governing AI (docs): https://www.ibm.com/docs/en/watsonx/saas?topic=governing-ai
- EU AI Act (insight): https://www.ibm.com/think/insights/eu-ai-act
- watsonx Orchestrate: https://www.ibm.com/products/watsonx-orchestrate
- Orchestrate Agent Catalog: https://www.ibm.com/products/watsonx-orchestrate/agent-catalog
- Orchestrate integrations: https://www.ibm.com/products/watsonx-orchestrate/integrations
- Orchestrate Skills/ADK: https://developer.watson-orchestrate.ibm.com/agents/skills

### Maximo ties
- MAS AI Service: https://www.ibm.com/docs/en/masv-and-l/cd?topic=ons-ai-service
- AI Service Component 9.1.0 (features): https://www.ibm.com/support/pages/ibm-maximo-application-suite-ai-service-component-release-910
- Deploying watsonx on-prem (with MAS): https://www.ibm.com/docs/en/masv-and-l/cd?topic=premises-deploying-watsonx
- MAS 9.1 licensing: https://www.ibm.com/docs/en/masv-and-l/cd?topic=suite-licensing-in-maximo-application-91
- Reliability Strategies AI content (FMEA): https://www.ibm.com/docs/en/masv-and-l/cd?topic=features-reliability-strategies-content

---

*DOC14 v1.0 (seed). Companion to DOC13 (watsonx.data + Maximo) and DOC5 (Databricks). Enhance by closing §12 gaps and adding a watsonx.ai-for-EAM deep-dive (Granite TS for predictive maintenance, RAG over maintenance manuals, governed agentic maintenance).*
