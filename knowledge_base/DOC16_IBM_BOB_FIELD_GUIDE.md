# IBM Bob: A Field Guide for Maximo Teams

**Document:** DOC16 - IBM Bob (AI SDLC partner: Bob IDE · Bob Shell · self-hosted Bob · Premium Packages) and its Maximo ties
**Version:** 1.0 (seed — to be enhanced)
**Date:** October 4, 2026
**Audience:** Maximo/EAM architects, development leads, platform/security teams, and IT decision-makers evaluating IBM Bob (or AI coding agents generally) for Maximo customization, integration, and modernization work
**Scope:** A grounded reference on IBM Bob: its timeline from Project Bob to self-hosted GA, architecture (IDE, Bob Shell, agent harness, modes, skills, rules, MCP, hooks, ACP), model routing, security and data handling, self-hosted deployment on OpenShift, administration (Bobalytics, audit logs, SIEM, SSO, group policies), pricing and Bobcoins, customer claims, analyst and practitioner views, the competitive landscape, IBM's own content and messaging, and a dedicated section on what Bob means for Maximo shops. Companion to DOC14 (watsonx platform) and DOC13 (watsonx.data + Maximo).
**Status:** This is a **seed document**. It is grounded in IBM documentation (bob.ibm.com/docs), IBM newsroom releases, the Bob blog, and independent press and analyst coverage (URLs in §17). **Every vendor number is labeled as IBM-reported**, and independent sources are marked **[IND]**. Gaps, conflicts, and unverified claims are listed in §16 rather than smoothed over.

> **Source convention used throughout**
> - **[IBM]** = IBM press release, product page, documentation, or blog (vendor-reported; not independently audited).
> - **[IND]** = independent press, analyst, researcher, or practitioner.
> - Where IBM sources contradict each other, both readings are shown and the conflict is logged in §16.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Timeline: Project Bob to Self-Hosted](#2-timeline-project-bob-to-self-hosted)
3. [Architecture: Clients, Agent, Harness](#3-architecture-clients-agent-harness)
4. [Models & Routing](#4-models--routing)
5. [Security & Data Handling](#5-security--data-handling)
6. [Self-Hosted Bob on OpenShift](#6-self-hosted-bob-on-openshift)
7. [Administration & Governance](#7-administration--governance)
8. [Pricing, Bobcoins & Premium Packages](#8-pricing-bobcoins--premium-packages)
9. [Customers & Metrics (All IBM-Reported)](#9-customers--metrics-all-ibm-reported)
10. [Analyst, Independent & Practitioner Views](#10-analyst-independent--practitioner-views)
11. [Competitive Landscape](#11-competitive-landscape)
12. [IBM's Own Content & Messaging](#12-ibms-own-content--messaging)
13. [Bob and Maximo](#13-bob-and-maximo)
14. [TheMaximoGuys Tooling for Maximo AI Agents](#14-themaximoguys-tooling-for-maximo-ai-agents)
15. [What This Means for Maximo Teams](#15-what-this-means-for-maximo-teams)
16. [Open Questions & Gaps to Close](#16-open-questions--gaps-to-close)
17. [References](#17-references)

---

## 1. Executive Summary

IBM Bob is IBM's agentic software-development platform, which IBM calls an "AI SDLC partner" and markets as covering planning, coding, testing, deployment, and modernization. It began as **Project Bob**, an internal pilot of 100 IBM developers in June 2025. IBM unveiled it publicly at TechXchange on **October 7, 2025**, alongside the IBM–Anthropic partnership. It reached **global general availability as SaaS on April 28, 2026**, as the successor to **watsonx Code Assistant (WCA)**. A rebuilt **V2 architecture** followed on June 24, 2026, and **self-hosted deployment on Red Hat OpenShift** went GA in late September 2026. Bob ships as a VS Code-based IDE, a CLI called **Bob Shell**, and, through the Agent Client Protocol (ACP), as an agent inside IntelliJ, Zed, and Neovim.

### The one-paragraph version

On SaaS, Bob **routes each task across a mix of models** (Anthropic Claude, Mistral, IBM Granite, and fine-tuned IBM models), and **users cannot choose or restrict the model**. You pay in **Bobcoins**, a billing abstraction over tokens. The developer-facing controls are **approval gates** on edits, commands, MCP calls, and skills, plus rollback, `.bobignore`, rules, and workspace trust. The admin-facing controls are **Bobalytics**, CADF activity logs, Splunk SIEM forwarding, SSO, and MDM/GPO group policies. IBM says SaaS is **effectively zero-retention for payloads** and that prompts are **not used for training**. **IP indemnity is Enterprise-only.** Self-hosted Bob trades away routing (it runs **one core model**), Bobalytics, and in-place upgrades in exchange for **air-gapped and sovereign operation**. For Maximo teams, the relevant Bob material is IBM's own Maximo dev-team claim (an IBM-reported "estimated 69% time savings", with no method published), IBM-authored **Bob skills for Maximo automation scripts and Java-to-script conversion**, the **MAS 9.2 native Maximo MCP server** that any MCP agent (Bob included) can call, and the **MAF Local Dev Mode** extension, which supports the Bob IDE.

### Bob at a glance

| Dimension | What IBM ships | Maximo relevance |
|-----------|----------------|------------------|
| **Clients** | Bob IDE (VS Code fork), Bob Shell CLI (`bob chat`, `bob run`, `bob mcp`, `bob acp`), ACP for IntelliJ/Zed/Neovim | Works on Maximo autoscripts, Java MBOs, app XML, BIRT, and integration code like any repo |
| **Agent model** | One agent, one harness, many clients (V2); modes Agent / Plan / Ask; subagents; workflows | Plan mode gives a reviewable artifact before changes touch a Manage customization |
| **Extensibility** | Skills (`.bob/skills/`), rules (`.bob/rules/`), `AGENTS.md`, custom modes, MCP, hooks, plugins | IBM's `maximo-code-optimization` and `maximo-java-conversion` skills; the MAS 9.2 MCP server |
| **Models (SaaS)** | Auto-routed: Claude, Mistral, Granite, fine-tuned IBM models | No model pinning, so behavior can shift under you |
| **Models (self-hosted)** | One core model (BYO: Nemotron, Laguna, Mistral, or frontier via your cloud account) plus a recommended guardrail model | Fits air-gapped utility, defense, and public-sector Maximo estates |
| **Governance** | Approvals, rollback, `.bobignore`, workspace trust, group policies, enforced hooks, CADF logs, SIEM | Supports CAB-style controls for AI-authored Maximo changes |
| **Price** | Pro $20 / Pro+ $60 / Ultra $200 / Enterprise custom; Bobcoins | Enterprise is the only tier with IP indemnity |

---

## 2. Timeline: Project Bob to Self-Hosted

```
 Jun 2025      Oct 7 2025        Jan 7 2026       Mar 24 2026   Apr 28 2026     Jun 24 2026      Jul 9 2026        Aug 2026            Sep 24/30 2026      Oct 26-29 2026
    │              │                  │                │            │               │                │                 │                     │                   │
 Internal      "Project Bob"     PromptArmor       Bob 1.0.0    Global GA       Bob V2: one     Premium Pkgs     Bob Shell v2;       Self-hosted GA      TechXchange
 pilot,        unveiled at       shows beta        ships        (SaaS, 30-day   agent/harness,  (Java, IBM i,    group policies,     (OpenShift,         Atlanta —
 100 devs      TechXchange;      Bob Shell         [IND/IBM]    trial); WCA     3 modes,        Z), Bobalytics,  SIEM (Splunk),      air-gapped, BYOL    "Build with
               IBM–Anthropic     prompt-injection               succession      subagents,      JP + EU regions  hooks, ACP          models)             IBM Bob" area
               partnership       [IND]                                          270k context
```

| Date | Milestone | Source |
|------|-----------|--------|
| **Jun 2025** | Bob deployed inside IBM with **100 developers** [IBM] | IBM newsroom, Apr 28 2026 |
| **Oct 7, 2025** | **Project Bob** unveiled at TechXchange Orlando as an "AI-first IDE" in private tech preview. On the same day IBM announced it would integrate Anthropic's LLMs into its software "starting with" Project Bob. IBM reported **6,000+** internal adopters and **45%** average productivity gains [IBM] | IBM newsroom, Oct 7 2025 |
| **Jan 7, 2026** | PromptArmor reported that beta Bob Shell could be prompt-injected into downloading and running malware, and that the IDE had zero-click exfiltration vectors [IND] | The Register |
| **Mar 24, 2026** | **Bob 1.0.0** released [IND] (IDC, Techzine, and IT Jungle all reference it) | IDC; Techzine |
| **Apr 28, 2026** | **Global GA** as SaaS: 30-day trial, individual and enterprise plans, **80,000+** IBM users. Bob **replaces watsonx Code Assistant**: "Existing WCA clients will continue to be fully supported and will have an adoption path to Bob." On-prem was "targeted in the future" at that point [IBM] | IBM newsroom, Apr 28 2026 |
| **Jun 24, 2026** | **Bob V2**: one agent, one harness, many clients. Five modes collapse to three (Agent/Plan/Ask), plus subagents, parallel native tool calling, a **270k** context window (up from 200k), rollback per tool call, background tasks, and workflows. **100,000+** IBM developers onboarded [IBM] | Bob blog, V2 announcement |
| **Jul 9, 2026** | **Premium Packages** (Java Modernization, IBM i, Z), **Bobalytics**, and new Japan and Europe regions [IBM]. IT Jungle notes that V2 and the packages actually became available on June 24 [IND] | IBM newsroom, Jul 9 2026; IT Jungle |
| **Aug 2026** | **Bob Shell v2** (V2 agent in the terminal: skills, subagents, `/resume`, headless `bob run`). A second August release added **group policies** (ADMX/MDM/policy.json), **native ACP**, **MCP elicitation**, **hooks**, **Splunk SIEM forwarding**, RAG over IBM docs, Office file editing, and Spring Boot→Quarkus in the Java package [IBM] | Bob blog, Aug 2026 (two posts) |
| **Sep 24, 2026** | Release notes: "As of September 24, 2026, IBM Bob is generally available for self-hosted deployment." The same release moved the MCP client to the 2026-07-28 spec and added the `RequiredExtensions` policy, plugins, and compaction hooks [IBM] | Bob blog, Sep 2026 |
| **Sep 30 / Oct 1, 2026** | Newsroom announcement of self-hosted deployment (dated Oct 1; FACTBASE records Sep 30). The release does not use the phrase "GA" [IBM] | IBM newsroom, Oct 1 2026 |
| **Oct 26–29, 2026** | TechXchange 2026, Atlanta, with a "Build with IBM Bob" area and the LAB-1832 "Bob 101" session [IBM] | FACTBASE |

### 2.1 WCA succession, in plain terms

Bob is the successor product line to **watsonx Code Assistant** (including the WCA for Z and WCA for i lines). IT Jungle described the October 2025 move as IBM "converging" its IBM i RPG and System Z COBOL code assistants into Project Bob [IND]. IBM's commitment at GA was continued full support for WCA clients plus an "adoption path" to Bob [IBM]. IBM has not published a public end-of-support date for WCA (see §16).

---

## 3. Architecture: Clients, Agent, Harness

### 3.1 The V2 three-tier design

Bob V1's IDE extension and shell were "built on two separate foundations." V2 replaced both with a single stack [IBM, V2 blog]:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                               CLIENTS                                       │
│   Bob IDE (VS Code fork)   Bob Shell (CLI)   ACP clients (IntelliJ, Zed,   │
│                                               Neovim, custom orchestrators) │
└──────────────────────────────────┬────────────────────────────────────────┘
                                   │   same behavior in every client
┌──────────────────────────────────▼────────────────────────────────────────┐
│                               THE AGENT                                     │
│   Agentic loop: reasoning + code generation · Modes: Agent / Plan / Ask    │
│   Subagents (clean-context side tasks) · Parallel native tool calling      │
│   Rollback (per task / turn / tool call) · Background tasks · Workflows    │
└──────────────────────────────────┬────────────────────────────────────────┘
┌──────────────────────────────────▼────────────────────────────────────────┐
│                              THE HARNESS                                    │
│   Auth · logging · feature flags · telemetry · approvals · hooks · policy │
└──────────────────────────────────┬────────────────────────────────────────┘
                                   │  extensibility
        Skills (.bob/skills/SKILL.md) · Rules (.bob/rules/) · AGENTS.md (/init)
        Custom modes (.bob/custom_modes.yaml) · MCP (.bob/mcp.json) · Plugins
        .bobignore · Hooks (SessionStart … PreCompact/PostCompact)
                                   │
              ┌────────────────────▼────────────────────┐
              │ Model layer: SaaS multi-model routing,   │
              │ or self-hosted single core model + guard │
              └──────────────────────────────────────────┘
```

| Tier | Role (IBM wording, V2 blog) |
|------|------------------------------|
| **The Agent** | "The agentic loop. All reasoning and code generation happens here, identically in every client." |
| **The Harness** | "Shared infrastructure: authentication, logging, feature flags, telemetry." |
| **The Clients** | "The interfaces — IDE, shell, and more to come — with no duplicated logic." |

### 3.2 Clients

- **Bob IDE**: a standalone IDE built on VS Code. The FAQ also mentions "VS Code extension workflows." It runs on macOS, Linux, and Windows, with a minimum of 4 GB RAM (8 GB recommended) and 500 MB disk [IBM, FAQ]. Self-hosted architecture docs also mention an "Eclipse-based extension" [IBM].
- **Bob Shell**: the CLI. Shell v2 (August 2026) separates interactive from headless use: `bob chat` (interactive), `bob run` (headless/CI, with human-readable, single-JSON, or streaming-JSON output), `bob mcp`, and `bob acp`. It authenticates with API keys, either *General* (subscription-scoped) or *Inference* (team-scoped) [IBM, Aug blog; FAQ].
- **ACP**: Bob Shell "now speaks the Agent Client Protocol (ACP) natively," so IntelliJ, Neovim, and Zed can run Bob as a first-class agent, with session management, modes, streaming, MCP, and guardrails carried over the protocol. IBM frames this as Bob running "as one agent inside" existing enterprise orchestrators [IBM, Aug release 2].
- **Cross-client continuity**: `/resume` lets you start a task in the IDE and continue it in Shell, or the other way round [IBM, Aug blog].

### 3.3 Modes: old vs. new

| V1 (to Jun 2026) | V2 (from Jun 24, 2026) | Notes |
|------------------|------------------------|-------|
| Ask | **Ask** | Q&A and explanation, with no state changes |
| Plan | **Plan** | Produces a plan, which is the review artifact |
| Code | **Agent** | Code, Advanced, and Orchestrator folded into Agent |
| Advanced | ↳ Agent | |
| Orchestrator | ↳ Agent + subagents | Orchestration is now native to the agent (subagents) |

IBM's guidance hasn't changed: "on unfamiliar code, or a change with real surface area, start in Ask or Plan and switch to Agent once the work is clear" [IBM, V2 blog]. **Custom modes** live in `.bob/custom_modes.yaml`, and mode rule files travel with export and import [IBM, Aug blog]. IBM Build Engineering also publishes extra modes, for example `ibm-ace-bob-mode` [IND-adjacent: IBM GitHub org].

### 3.4 Agent mechanics introduced in V2

| Capability | What it does | IBM-reported effect |
|------------|--------------|---------------------|
| **Subagents** | Spin off self-contained investigations in a clean context and return only a summary | Keeps the main context lean |
| **Parallel native tool calling** | Several tool requests per turn, run together, without V1's verbose XML wrapping | "A task that took around 30 seconds in V1 often finishes in under 10" [IBM] |
| **Context window** | 200k → **270k** tokens | Longer runs before compaction |
| **Approvals** | Reads auto-approved. **Edits, commands, MCP calls, and skill invocations still need approval** (tunable per tool class) | "Fewer interruptions, same control" |
| **Rollback** | Replaces git-based "checkpoints"; tracks file state per task, turn, and tool call | Works without git (note: the FAQ still says rollback "uses Git", see §16) |
| **Background tasks** | Several concurrent tasks, each with its own thread and context | |
| **Workflows** | Engine for multi-phase, repeatable work: automation steps, AI steps, and human-approval steps | At GA, only IBM-shipped workflows (via Premium Packages) |
| **Documents** | Read and edit .docx/.pdf/.xlsx; emit self-contained HTML reports | |

### 3.5 Extensibility surface

| Mechanism | Location / command | Purpose |
|-----------|-------------------|---------|
| **Skills** | `.bob/skills/<name>/SKILL.md` (name + description), with a Skills tab in the IDE | Reusable procedures such as release steps, review checklists, or domain playbooks |
| **Rules** | `.bob/rules/` | Persistent house rules injected into context |
| **AGENTS.md** | Generated by `/init` | Repository conventions file, readable across agents |
| **Custom modes** | `.bob/custom_modes.yaml` | Role-scoped personas with tool restrictions |
| **MCP** | `.bob/mcp.json`; OAuth for MCP servers (Aug); MCP client v2 on the **2026-07-28 spec**, with HTTP+SSE servers needing to move to Streamable HTTP (Sep) | Connect to external systems, e.g. the Maximo MCP server |
| **MCP Elicitation** | Inline forms when a tool call lacks a required value | Prevents tools from guessing missing parameters |
| **Hooks** | `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `Stop`, plus `PreCompact`/`PostCompact` (Sep). HTTPS hook handlers. `EnforcedHooks` policy for admin-mandated hooks | Deterministic guardrails and audit |
| **Plugins** | `.bob/plugins/<name>/`, `~/.bob/plugins/<name>/` | IBM says it supports "the plugin format that's become a de-facto standard across the ecosystem" |
| **`.bobignore`** | Workspace root | Excludes secrets and sensitive files. IBM: "It does not create a system-level sandbox" |
| **Workspace trust** | `~/.bob/trustedFolders.json`, `/permissions` | Untrusted folders disable project config and MCP servers |

**Press-release language vs. product features.** IBM press materials talk about "reusable playbooks." In the product, that capability is **skills, rules, and workflows**. Use the product terms in technical writing.

### 3.6 Literate Coding and review

- **Literate Coding**: you write intent as comments in the file, and Bob proposes an inline diff [FACTBASE / IBM docs].
- **`/review`**: code review with a **Bob Findings** panel for triage. Better Stack's independent walkthrough describes `/review` as an automated security-audit path [IND].
- **Edit preview** (Aug 2026): proposed edits open as a diff, and you can edit the diff before approving it [IBM].

---

## 4. Models & Routing

### 4.1 SaaS: automatic multi-model routing

IBM's FAQ answers "Can I choose which model Bob uses?" with **"No."** Bob "automatically selects the most appropriate language model for each task based on complexity, required capabilities, and cost-efficiency," considering task complexity, required capabilities, context size, and cost optimization [IBM, FAQ]. The GA release names **"Anthropic Claude, Mistral open source models, and IBM Granite,"** plus fine-tuned models for code reasoning, security, and next-edit prediction [IBM, Apr 28 release]. The Oct 2025 preview also listed **Llama** [IBM, Oct 7 2025]. IBM's tagline for this design is **"Stop managing models. Start managing outcomes."** [IBM]

> **Independent read [IND]:** RedMonk's Kate Holterhoff called auto-selection "a double edged sword, as developers can be suspicious of black box tools," while it also "eliminates the paralysis of choice" (The Register / DevClass, Apr 2026). Techzine likewise flagged the "black box" skepticism.

**What IBM does not disclose on SaaS:** the model versions in rotation, the routing policy, whether a given task hit Claude, Mistral, or Granite, and tokens per Bobcoin. Treat model behavior on SaaS as **non-pinnable** (see §16).

### 4.2 Self-hosted: one core model, reserved slots, guardrail model

Self-hosted Bob uses a **Model Gateway** (an OpenAI-compatible Inference Service with an embedded router called **Bifrost**). It is configured through `model-gateway.yaml`, with secrets kept in `config.yaml` [IBM, solution architecture; model-gateway docs].

| Concept | Detail [IBM docs] |
|---------|-------------------|
| **Core inference model** | "Configure exactly one core inference model at a time." "Running multiple core inference models at the same time is not supported." |
| **Reserved model-name slots** | `premium-ide` (default model for interactive chat), `security` (guardrail/security checks), `background` (background and autonomous agent tasks) |
| **Router** | `strategy: static`, `default_model: premium-ide`. No dynamic routing on self-hosted at GA; multi-model routing is "planned" (FACTBASE) |
| **Guardrail model** | "Highly recommended": `openai/gpt-oss-20b`, or provider-native guardrails (AWS Bedrock Guardrails, Vertex AI safety filters, Azure OpenAI content filters) |
| **Connection options** | Red Hat OpenShift AI (on-cluster, OCI/ModelCar, air-gapped), public-cloud endpoints (Bedrock, Vertex AI, Azure OpenAI), private inference endpoints (vLLM, etc.) |
| **Model hosting** | "Bob connects to deployed models … but does not provision, host, or manage model-serving infrastructure" |

**Supported models (self-hosted docs, Oct 2026) [IBM]:**

| Category | Models listed |
|----------|---------------|
| **Frontier (recommended)** | Claude Sonnet 5 and Claude Opus 4.8 (AWS Bedrock), Google Gemini 3.7 Flash (Vertex AI), OpenAI GPT 5.6 Sol (Azure OpenAI) |
| **Self-hosted open-weight / air-gapped** | Mistral 3.5 (config examples: `mistralai/mistral-medium-3-5-0`), NVIDIA Nemotron 3 (`nvidia/nemotron-3-ultra-550b`), Poolside Laguna S2.1 (`poolside/laguna-s-2.1`) |
| **Guardrail** | `openai/gpt-oss-20b` |

IBM's own guidance: "For optimal results on complex IBM Z tasks, such as deep COBOL refactoring, PL/I analysis, and multi-file code transformations, frontier models such as Claude Sonnet deliver the highest level of reasoning, accuracy, and generation quality" [IBM]. In practice, that means **air-gapped Bob is a different quality tier from SaaS Bob**. BERI's independent analysis made the same point under the headline "IBM's Air-Gapped Bob Drops Claude for Nemotron and Laguna," noting IBM had published "no evals of Bob on either local model" [IND].

> **Doc inconsistency:** the supported-models page lists *Gemini 3.7 Flash*, but the gateway configuration examples use `gemini-3.6-flash` and also list `gemini-3.1-pro`. Verify against the live docs before quoting (see §16).

---

## 5. Security & Data Handling

### 5.1 IBM's stated controls

| Control | What IBM says | Evidence level |
|---------|---------------|----------------|
| **Runtime guardrails** | "Prompt normalization, sensitive data scanning, real-time policy enforcement, and AI red-teaming"; also secrets detection | [IBM]. Mechanisms not documented publicly |
| **Approvals** | "Risky actions (such as writes, remote commands, and resource access) are gated by approvals." Admins can lock auto-approval off per group (`DisabledAutoApprovalGroups`: read, edit, execute, mcp, skill, todo, subtask, subagent, mode) | [IBM, FAQ; group policies] |
| **Training** | "Customer data (payload and prompts) is not used to train AI models." | [IBM, FAQ] |
| **Retention** | "IBM Bob's default architecture is effectively zero-retention for payload data." Payloads live in ephemeral in-memory storage, "generally on the order of minutes," and are "never written to persistent disk storage" | [IBM, FAQ] |
| **Telemetry** | Feature usage, performance, and errors. "IBM Bob does not collect your code or prompts as part of telemetry data." | [IBM, FAQ] |
| **Local task history** | Stored on the developer's machine; default retention 14 days | [IBM, FAQ] |
| **Network egress** | Not by default. Internet access "depends entirely on which MCP servers you have configured and trusted." Experimental `web_fetch` added Sep 2026 | [IBM, FAQ; Sep blog] |
| **Sandbox** | **None at OS level.** `.bobignore` "does not create a system-level sandbox"; commands run as child processes | [IBM docs] + [IND practitioner] |
| **License filtering** | "No. License filtering is not a capability of IBM Bob." | [IBM, FAQ] |
| **Compliance** | "IBM is ISO 27001 certified." Pen-test summaries and ISO certificates are available under NDA. **No public SOC 2 or FedRAMP statement for Bob** | [IBM, FAQ] |

### 5.2 IP indemnity: Enterprise only

"Yes, for IBM Bob Enterprise only, including premium packages purchased for Bob Enterprise." The indemnity covers **IP claims (patent and copyright)** on output from both IBM-developed and third-party models. "It does not extend to non-IP claims. **No output indemnity is provided for Bob Free Trial, Bob Pro, Bob Pro Plus, or Bob Ultra**" [IBM, FAQ]. For consultancies, this means individual-tier seats used on client code carry no IBM IP indemnity.

### 5.3 Regions and data residency

| Region | Location |
|--------|----------|
| US East | Washington D.C., USA |
| Europe | Frankfurt, Germany |
| Japan | Tokyo, Japan |

Inference, data processing, and conversation storage stay in the selected region. **Account, admin, user/team, policy, and billing metadata are stored globally in US East regardless of region** [IBM, data residency doc]. Bob is not available in a list of sanctioned and restricted countries, including China, Hong Kong, Russia, and Iran [IBM, FAQ]. SaaS connectivity is HTTPS on port 443 only, with no private-link options at the time of writing [IBM, FAQ].

> **Sovereignty caveat for EU/JP Maximo programs:** regional SaaS does not keep identity and billing metadata in-region. If your contract needs *all* data in-region, that points to self-hosted Bob (§6).

### 5.4 The PromptArmor incident (Jan 2026) [IND]

The Register reported on January 7, 2026 that PromptArmor researchers had found the following in the **beta** release:

- **Bob Shell**: a malicious `README.md` instructed Bob to run a series of `echo` commands. If the user had chosen **"always allow"** for `echo`, later chained commands (via process substitution, which Bob didn't check, and `>` redirection) ran **without approval**, which enabled download and execution of a malicious script. PromptArmor's Shankar Krishnan said the approval step "only ends up validating an allow-listed safe command."
- **Bob IDE**: zero-click data exfiltration through **markdown image rendering**, a permissive Content Security Policy, and possibly pre-fetched JSON schemas.
- **IBM's response** (added Jan 8): IBM said it was unaware of the vulnerability and pledged fixes before GA.

**Lessons that still apply post-GA:** auto-approve is the attack surface; prefer locking `execute` and `mcp` auto-approval via `DisabledAutoApprovalGroups`; open unfamiliar repos in untrusted mode; treat README files and web content as untrusted input. A later Bob Shell changelog fix closed a related gap: a per-task MCP tool allowlist "could bypass the broader group approval gate" [IBM changelog, via search summary].

---

## 6. Self-Hosted Bob on OpenShift

### 6.1 What it is

"IBM Bob self-hosted provides a self-managed deployment of the Bob AI code assistant platform on Red Hat OpenShift Container Platform (OCP)… for organizations that require control over data residency, security boundaries, network access, or deployment in disconnected environments" [IBM, overview]. It is deployed by a **Kubebuilder-based Bob Operator** with Helm charts and the **`bobctl`** admin CLI. It runs as an ordinary namespaced workload in two namespaces (operator and instance), and **a dedicated cluster is not required** [IBM]. Installation has two stages: cluster-admin approves the cluster-wide footprint once, and then the Bob-owning team installs and upgrades without cluster-admin rights. A **single-node OpenShift is enough for a proof of concept** [IBM, Sep blog].

| | SaaS | Self-hosted |
|---|------|-------------|
| Infrastructure | IBM-hosted | Your OpenShift (on-prem or your cloud account) |
| Operations | IBM handles upgrades/scale | You own lifecycle; **in-place upgrades not supported** at GA (fresh install recommended) |
| Models | Auto-routed multi-model | **One** core model + guardrail; BYO license |
| Identity | SAML/OIDC SSO at bob.ibm.com | Bundled **Keycloak**, federated to LDAP/AD |
| Bobalytics | Yes (Enterprise) | **Not supported**; link may redirect to SaaS or be unreachable when air-gapped |
| Activity logs in Admin UI | Yes | **No**; read `bob-authn`/`bob-authz`/`bob-admin` pod logs |
| Developer clients | Bob IDE / Bob Shell | Same clients, endpoint distributed via group policy |

### 6.2 Supported versions and platform

| Item | Value [IBM, system requirements] |
|------|----------------------------------|
| Bob self-hosted / IDE / Shell | **2.0.0 / 2.2.0 / 2.0.5** |
| Architecture | **amd64** only (backend cluster) |
| OCP | **4.20, 4.21, 4.22** supported |
| Workstation tools | `bobctl`, `oc` (min OCP 4.20), `helm` ≥ 3.14.0, `bash` ≥ 3.2, `openssl` ≥ 3.5 |
| Dependencies | cert-manager; LLM endpoint provisioned before install |
| Images | Bundle from IBM Bob GitHub repo; images from `cp.icr.io`; IDE extensions from Open VSX |
| Install modes | Direct (outbound to IBM registry), air-gapped direct mirroring, air-gapped indirect mirroring |

### 6.3 Sizing

**Stack footprints (aggregate Bob tenant requirements, excluding platform overhead) [IBM]:**

| Stack configuration | CPU (raw) | Memory (raw) | Storage (PVs) | Status |
|---------------------|-----------|--------------|---------------|--------|
| Bob Core | 22.1 vCPU | 35.1 GiB | ~30 GiB | Baseline available |
| Bob Core + RAG | 38.1 vCPU | 69.1 GiB | ~62 GiB | Baseline available |
| Bob Core + Z Understand | 30.1 vCPU | 74.1 GiB | ~2,288 GiB | Benchmarking in progress |
| Bob Core + RAG + Z Understand | 46.1 vCPU | 108.1 GiB | ~2,320 GiB | Benchmarking in progress |

**Bob Core production footprint:** 28.1 vCPU / 41.1 GiB / ~50 GiB raw, or **~36.5 vCPU / ~53.4 GiB** with 25–30% headroom [IBM].

**Minimum reference topology (dedicated cluster) [IBM]:**

| Node role | Count | Per node | Aggregate |
|-----------|-------|----------|-----------|
| Control plane | 3 | 4 vCPU / 16 GiB | 12 vCPU / 48 GiB |
| Infrastructure | 3 | ~4 vCPU / ~16 GiB | 12 vCPU / 48 GiB |
| Worker | 3 | 20 vCPU / 24 GiB / 200 GiB disk | 60 vCPU / 72 GiB / 600 GiB |
| **Total** | **9** | | **~84 vCPU / ~168 GiB / 600 GiB** |

After OpenShift overhead, the worker pool yields about 57 vCPU and 63 GiB allocatable. **These figures exclude GPU capacity for self-hosted models.** IBM says model resource needs "depend on model quantization, context length, serving runtime (such as vLLM or TGI), and target throughput" and publishes no GPU sizing [IBM; BERI IND].

**Storage:** PostgreSQL (RWO, SSD block strongly recommended), OpenSearch (RWO), Redis (RWO), shared config/certs (RWX). Supported classes are managed NFS and OpenShift Data Foundation. A separate backup target is required [IBM].

### 6.4 Internals (useful for security reviews)

Keycloak (identity; LDAP/AD federation; SCIM sync described), `bob-authn`, `bob-authz`, an OpenResty API gateway, Bob Admin, Metrics Collector/Forwarder, a Bootstrap Controller, and the Inference Service with Bifrost. Data plane: PostgreSQL (auth, admin, telemetry), Redis (telemetry cache), a **Vector** audit store, and with the Z add-on, OpenSearch (RAG corpus) and **Db2** (Z Understand) [IBM, solution architecture]. Premium Packages use a **two-layer entitlement**: the cluster admin enables workloads in `config.yaml` (e.g. `rag.enabled`, `zProxy.enabled`), and the Bob admin assigns user entitlements in the Admin UI [IBM].

**Usage metering:** the IBM Usage Metering Service reports **a single metric, the total number of active users**, with no user identities. Air-gapped clusters download a payload manually and upload it to IBM Software Central [IBM].

### 6.5 Known limitations at GA [IBM]

1. Activity logs are not available in the Admin UI (use pod logs).
2. In-place upgrades are not supported (fresh install).
3. A `unknown model: zproxy` error appears when `zProxy.enabled` is set incorrectly with RAG.
4. **Bobalytics is not supported.**
5. **Audit Logs service and Metering Service:** the solution-architecture page says both are "Not included in the initial release; planned for a future release." This conflicts with the September release blog (see §16).
6. "Security event logging and monitoring for Bob self-hosted are managed at the OpenShift platform level and are not provided by Bob" (overview).

---

## 7. Administration & Governance

### 7.1 Bobalytics (SaaS Enterprise only)

| KPI | Definition [IBM docs] |
|-----|----------------------|
| **Adoption rate** | Average daily active users ÷ licensed seats. A user is "active" after accepting ≥1 code completion or completing a chat conversation |
| **Bob factor** | **% of committed lines of code that Bob created.** Commits with zero Bob lines are excluded when the total exceeds 40,000 LOC (to filter templates and fixtures) |
| **Bobcoin spend** | Total Bobcoins consumed per period and per team |

IBM's interpretation guide: high Bob factor with low spend means effective use; high spend with low Bob factor means "research, explanation, or exploration" usage worth reviewing. CSV exports cover Bob factor vs. team, repository impact, most-used modes, and contribution by language, for use in Tableau, Power BI, or Looker. **Privacy:** team charts anonymize users ("User 1, User 2"), and admins cannot drill into an individual's data [IBM].

> **Measurement caveat (TMG view):** Bob factor counts *lines authored*, which is not the same as value, defects avoided, or review cost. IBM's own Think content says "Token consumption is a cost signal, not a value metric" (§12). Pair Bob factor with defect escape rate and review time before using it for ROI.

### 7.2 Audit: CADF activity logs and SIEM

- **Activity log** (Enterprise, Admin UI): **authentication** events (sign-in/out, token renewal; stored globally) and **admin** events (users, teams, membership, seat assignments; stored per region). Downloadable hourly JSON files in **CADF** (Cloud Auditing Data Federation) format, with fields such as `action` (e.g. `admin.user.create`, `bob-authn.session.authenticate`), `outcome`, `eventTime`, and `initiator.id` [IBM].
- **SIEM**: audit events forwarded to a **Splunk HEC** endpoint. You **cannot self-configure it**: you open an IBM support case with your subscription IDs, HEC endpoint/token, index, and CA cert, and onboarding "takes a few days." Other SIEMs are possible via Vector "through a support case" [IBM].
- **Note:** the activity log covers **identity and admin** events. The docs do not say it logs prompts, tool calls, or file edits. For agent-action audit, use **enforced hooks** (`EnforcedHooks` policy plus HTTPS hook handlers) or Bob Shell's run records (the GA release says BobShell "records agent actions as they happen") [IBM].

### 7.3 Identity and policy

| Control | Detail [IBM] |
|---------|--------------|
| **SSO** | SAML or OIDC; verified OIDC providers Auth0, Keycloak, Okta, PingOne; domain filters with ownership verification; deprovisioning follows the IdP; SCIM "contact IBM" |
| **Teams & budgets** | Allocate Bobcoins per team or individual; overage limits |
| **Group policies** | macOS `com.ibm.bob` (MDM profile), Windows `Software\Policies\IBM\Bob` (ADMX/ADML via GPO/Intune), Linux `/etc/bob/policy.json` (root-owned, 644). Locked settings show as read-only. **Currently Bob IDE only** |
| **Notable policies** | `DisabledAutoApprovalGroups`, `UpdateMode` (default/start/manual/none), `EnforcedHooks`, `RequiredExtensions` (Sep), endpoint distribution for self-hosted |
| **Support** | Enterprise P1 priority channel |

---

## 8. Pricing, Bobcoins & Premium Packages

### 8.1 Plans (bob.ibm.com/pricing, Oct 2026) [IBM]

| Plan | Price / month | Bobcoins / month | Effective $/coin | IP indemnity |
|------|---------------|------------------|------------------|--------------|
| Free trial (30 days) | $0 | 50 | — | No |
| **Pro** | $20 | 50 | $0.40 | No |
| **Pro+** | $60 | 180 | ~$0.33 | No |
| **Ultra** | $200 | 1,000 | $0.20 | No |
| **Enterprise** | Custom | Custom; packs | — | **Yes** |

- **Sep 24, 2026 allowance increase** ("More Bobcoins. Same price"). At launch, the allowances were reported as Pro 40, Pro+ 160, Ultra 500, trial 40 [IND, third-party trackers citing bob.ibm.com].
- **Overage**: FACTBASE records about $0.50 per Bobcoin for individual overage. The Bobcoins doc lists Enterprise **packs at $550 USD per 1,000 Bobcoins** ("5 packs allow up to 5,000 additional Bobcoins"). Packs expire one year after purchase. Once enabled, overage **cannot be disabled until month-end** [IBM, Bobcoins doc].
- **Support fees** reported earlier in 2026: $3 (Pro), $9 (Pro+), and $30 (Ultra) per month [IND, Nick Litten summary]. Verify current terms.
- **Bobcoin ↔ token**: IBM does not publish tokens per Bobcoin. It describes Bobcoins as a "unified billing metric" across models with different token costs [IBM].
- **Self-hosted pricing**: not published; IBM directs buyers to sales or a demo [IND, BERI].

### 8.2 Premium Packages [IBM]

| Package | Scope | Price |
|---------|-------|-------|
| **Java Modernization** | Java 8→11/17/21/25 upgrades; JSF/Struts→React UI modernization; WebLogic/Tomcat/WebSphere Traditional→Liberty; Spring Boot→Quarkus (Aug 2026, six gated modules) | From **$20**/user/month (individual add-on) |
| **IBM i** | RPG, COBOL, CL, SQL, DDS, QSYS workflows; IBM i-specific modes and tools; remote file system | From **$40**/user/month |
| **IBM Z (PP4Z)** | COBOL/PL/I modernization, JCL analysis, Z Understand, Z Refactor, Z RAG | Enterprise / annual |

The Java and IBM i packages include a first month free for new subscribers through Dec 31, 2026 [IBM]. In self-hosted deployments, the Z package brings its own backend (Z Understand, Db2, OpenSearch) [IBM].

### 8.3 Competitor price context (2026; verify on vendor pages)

| Tool | Entry / team price |
|------|--------------------|
| Cursor | $20 / $40 |
| GitHub Copilot | $10 Pro / $19 Business |
| Claude (Pro / Max) | $20 / $100–200 |
| Amazon Q Developer | Replaced by **Kiro** |

Bob's base price is in line with the market. The differences are the **opaque coin-to-token rate**, **no model choice**, and **indemnity only at Enterprise**.

---

## 9. Customers & Metrics (All IBM-Reported)

> **Every figure in this section is IBM-reported or appears in an IBM-published customer story. None has been independently audited.** The Register [IND] described IBM as "the latest to lean on its own staff to 'prove'" AI efficacy, and StockTitan [IND] noted the productivity metrics are self-reported.

| Claim | Exact IBM wording / figure | Source |
|-------|---------------------------|--------|
| IBM internal adoption | 6,000+ (Oct 2025) → **80,000+** (Apr 2026) → **100,000+** onboarded (Jun 2026) | IBM newsroom Oct 7 2025 / Apr 28 2026; Bob V2 blog |
| Productivity | "surveyed users report an average 45% productivity gain" (**self-reported survey**) | IBM newsroom Apr 28 2026 |
| **IBM Maximo dev team** | Code generation, refactoring, and updates "that normally take days" done in hours, "resulting in an **estimated 69% time savings**." **One sentence; no method, baseline, sample, or task mix published** | IBM newsroom Apr 28 2026 |
| IBM Instana | "an average **70% reduction** in time spent on selected tasks" ≈ **10 hours/week** | IBM newsroom Apr 28 2026 |
| Blue Pearl | "a typical **30-day** Java upgrade in just **3 days**, saving over **160** engineering hours"; "zero defects post-deployment"; FACTBASE adds Java 11→21, 127 deprecated API calls, coverage 0%→92%. The Jul 9 release gives a different framing: "nine months with 14 engineers… in just three days" | IBM newsroom Apr 28 & Jul 9 2026 |
| APIS IT (Croatia, public sector) | "**10x** faster architecture analysis and documentation"; "**100% accuracy** in documenting legacy JCL/PL/I systems"; .NET migration "in hours instead of weeks" | IBM newsroom Apr 28 2026 |
| EY | Global tax platform modernization (refactoring, test generation, documentation). **No metric** | IBM newsroom Apr 28 2026 |
| Jack Henry | Accelerated RPG development workflows, improved code quality (no metric) | IBM newsroom Jul 9 2026 |
| CrushBank | 4 people × 4–6 weeks → 1–2 devs in about half the time | IBM customer material (FACTBASE) |
| Novadoc | Tool built in a weekend vs. 2 weeks | IBM customer material (FACTBASE) |
| IBM Z page | "complex engineering work **20–40% faster**" and effort cut **50–80%** for structured workflows | IBM Z product page (FACTBASE) |
| IBM Payments Center | Testing effort down **>70%** on a regulated payments platform | IBM Think perspective |

**How to read these:** the Blue Pearl story appears with two different baselines (30 days vs. nine months with 14 engineers), "100% accuracy" has no stated evaluation method, and the Maximo 69% is an internal team estimate. Treat these as **directional marketing signals, not benchmarks**.

---

## 10. Analyst, Independent & Practitioner Views

| Source [IND] | View |
|--------------|------|
| **IDC**, Adam Resnick (doc #lcUS54524126, May 5 2026, published by IBM) | Bob is IBM's "most direct move yet into the agentic development tools market"; "the external evidence base remains limited at GA." The ecosystem anchoring (Z, OpenShift, watsonx, HashiCorp) is "its structural advantage" and "its natural boundary" |
| **RedMonk**, Kate Holterhoff | Auto model selection is "a double edged sword" |
| **VentureBeat** | The difference vs. Cursor/Claude Code "is not about capabilities but about control": Bob pre-structures role-based stages with approval checkpoints |
| **Futurum**, Mitch Ashley (Feb 26 2026) | On COBOL modernization: "The best answer may well be a combined IBM plus Claude team." Later: self-hosting puts Bob "where cloud-first coding agents struggle to reach" |
| **The Register** | IBM leans on its own staff to "prove" efficacy; the name evokes Microsoft Bob. Broke the PromptArmor story |
| **BERI** | Air-gapped Bob drops Claude for Nemotron/Laguna; no evals, GPU sizing, or price published |
| **Uwe Graf** (IBM Champion, Planet Mainframe) | Useful for analysis, refactoring, and training, but during COBOL refactors Bob "occasionally defaults to older control-flow constructs" (e.g. `GO TO` to end of SECTION). On VSAM tuning (Sep 2026), some reasoning "needed a closer technical review" |
| **IBM i community** | GitHub issue #3078 (Bob 2.0.3): Bob "confidently hallucinates" what a real CL parameter value does (`QMGTOOLS/HTTPADMCOL ARE_FLAG(NONE)`). Nick Litten is generally positive but says skilled RPG review is still required |
| **Northdoor**, Tom Richards (via TechFinitive) | Bob is "vibe coding putting on a navy blazer and walking into the enterprise boardroom" |

**Recurring criticisms:**
1. Productivity numbers are self-reported.
2. The model choice is a black box.
3. There is no OS-level sandbox; commands run as child processes.
4. Legacy-language output can be dated or confidently wrong.
5. Air-gapped mode runs on a weaker model tier.
6. Admin audit covers identity and admin events more than agent actions.

---

## 11. Competitive Landscape

| Tool | Positioning | vs. Bob |
|------|-------------|---------|
| **GitHub Copilot** | Ubiquitous IDE assistant plus coding agent; GitHub-native | Broader ecosystem and user-selectable models; Bob is deeper on IBM platforms and governance |
| **Cursor** | AI-native VS Code fork; fast iteration; model picker | Same form factor; Cursor lets you pick models; Bob routes automatically and adds approval stages |
| **Claude Code** (Anthropic) | Terminal-first agent; hooks, skills, MCP, subagents | Very similar primitives (Bob also uses Claude on SaaS); Futurum suggests combining them for COBOL |
| **Kiro** (AWS) | Spec-driven agentic IDE; replaced Amazon Q Developer | Comparable plan→implement discipline; AWS-anchored vs. IBM-anchored |
| **watsonx Code Assistant** | IBM's predecessor | Superseded by Bob; WCA customers get an adoption path |

**Where Bob is differentiated:** IBM Z, IBM i, and Java modernization packages; self-hosted OpenShift with air-gap support; Enterprise IP indemnity; MDM/GPO group policies; IBM docs RAG. **Where it trails:** model transparency and choice, the independent evidence base, and an ecosystem outside IBM estates.

---

## 12. IBM's Own Content & Messaging

### 12.1 IBM's stance on "vibe coding" (verbatim)

IBM's **product** messaging never describes Bob as vibe coding. Executives use the term only to set Bob apart from it:

> "It's not about vibe coding; it's about literal programming. It's not about accessibility, it's about security." — Neel Sundaresan, GM Automation & AI, per IBM Think ([source](https://www.ibm.com/think/news/new-role-developer-techxchange-2025))

The press frames it the other way. CIO Dive ran "IBM unveils vibe coding tool," and Techzine ran "IBM Bob aims to make vibe coding enterprise-ready." That gap between IBM's framing and the coverage is a useful angle for TheMaximoGuys content.

IBM's **Think explainers** treat vibe coding as the informal end of a spectrum that runs to agentic coding and then agentic engineering, and say they "aren't mutually exclusive" ([agentic coding](https://www.ibm.com/think/topics/agentic-coding)). Other verbatim lines:

- "Vibe coding caused a new type of technical debt called security debt" ([vibe coding](https://www.ibm.com/think/topics/vibe-coding))
- "AI slop" as the failure mode ([agentic engineering](https://www.ibm.com/think/topics/agentic-engineering))
- "treat any AI-derived code or modules as untrusted input" ([vibe coding security risks](https://www.ibm.com/think/insights/vibe-coding-security-risks))
- IBM Research "vibing fatigue" study (11 interviews): "these tools save time, but also wear people down" ([source](https://www.ibm.com/think/insights/navigating-the-hidden-cost-cognitive-cost-vibe-coding))

### 12.2 Taglines and executive lines

| Line | Speaker / source |
|------|------------------|
| "Stop managing models. Start managing outcomes." | IBM Bob tagline |
| "speed without control and transparency is a liability" | Dinesh Nirmal, SVP IBM Software (Apr 28 2026 release) |
| "We're giving development teams AI that fits how enterprises work, not experimental tools that create new risks." | Dinesh Nirmal |
| "automate the mundane, and augment the complicated"; "model capability alone isn't enough" | Neel Sundaresan (Apr 28 2026 release) |
| "The future of enterprise AI will depend on security, governance and sovereignty" | Neel Sundaresan (Oct 1 2026 release) |
| "about 60% of work is migration, modernization and maintenance… New code development is only about 15%." | Sundaresan, [Think 2026 recap](https://www.ibm.com/think/news/think-2026-ai-recap) |
| "0–30 is super easy… the last 20% requires me to look at code." | Ash Minhas (IBM) |
| "Token consumption is a cost signal, not a value metric." "AI doesn't fix a team. It amplifies what's already there." "Review capacity becomes the limiting factor." | Adam McDaniel, IBM Think ([1](https://www.ibm.com/think/insights/tokenmaxxing-dead-long-live-valuemaxxing), [2](https://www.ibm.com/think/perspectives/where-ai-costs-are-made-saved-in-software-development)) |
| "The semi-autonomous model… is not a compromise." (testing effort down >70%) | Roger Oliphant, IBM Payments Center ([source](https://www.ibm.com/think/perspectives/accelerating-software-delivery-lifecycle-with-generative-ai)) |

### 12.3 Bob blog: the discipline lines

The Bob team blog ([launch](https://bob.ibm.com/blog/announcing-ibm-bob-launch/), [getting the most out of Bob](https://bob.ibm.com/blog/getting-the-most-out-of-bob)) recommends the cycle **Explore → Plan → Implement → Verify** and states:

- "Iterate, do not one-shot."
- "The plan is the review artifact."
- "The code is the cheap part."
- "It is now easy to produce a large amount of code that works and is wrong."

Other official channels: monthly release posts on bob.ibm.com/blog (V2, August ×2, September), Bob docs and tutorials at bob.ibm.com/docs, the "Build with Bob" YouTube channel and site (ibm-self-serve-assets.github.io/build-with-bob), and IBM Building Blocks docs for Bob modes and skills.

### 12.4 Statistics IBM uses

| Statistic | Origin | Label |
|-----------|--------|-------|
| **68%** of surveyed executives say meeting data residency and sovereignty requirements across geographies is challenging | IBM IBV, *The Calculus of AI Sovereignty* (Jun 2026), cited in the Oct 1 2026 release | IBM research |
| **79%** of execs see AI productivity gains; only **29%** can confidently measure ROI | IBM IBV | IBM research |
| **60–80%** of development budgets go to modernization | Apr 28 2026 release (external footnote) | Cited by IBM |
| **85%** of DevSecOps pros say AI moved the bottleneck from writing to reviewing code | GitLab 2026 AI Accountability Report, cited in the Jul 9 release | Third-party, repeated by IBM |
| Devs **19% slower** while believing they were **20% faster** | METR study | Third-party, repeated by IBM |
| **84%** use or plan to use AI; **46%** distrust accuracy vs. **33%** trust | Stack Overflow 2025 survey | Third-party, repeated by IBM |
| Hybrid/edge to capture **44%** of AI infrastructure by 2030 | Futurum, cited in the Oct 1 release | Third-party |

### 12.5 Content gaps IBM has not covered

These are the areas TheMaximoGuys can own:

1. **Maximo/EAM practice with Bob.** There is no Maximo/EAM Bob session at TechXchange 2026; the closest is LAB-1832 "Bob 101: Your AI Partner Across the SDLC."
2. **The least-privilege boundary**: agents act through APIs, object structures, and autoscripts, never directly on the database.
3. **Governance in practice**: approval matrices, CAB integration, and separation of duties for AI-authored changes.
4. **A playbook for the review bottleneck.**
5. **Independent measurement** of productivity claims.
6. **Cost per task in practice** (Bobcoins per real Maximo task).

---

## 13. Bob and Maximo

### 13.1 IBM's Maximo claim, with the caveat attached

IBM's GA release says the IBM Maximo development team used Bob for code generation, refactoring, and updates that "normally take days," finishing them in hours, for "an **estimated 69% time savings**" [IBM]. This is **one sentence about IBM's own product team**. It gives no task mix, no baseline, no sample size, no measurement method, and no information on whether review and test time were counted. **Do not repeat it without the "IBM-reported, internal estimate" label**, and do not extrapolate it to customer Maximo shops, whose work mix (configuration, integration, data, upgrades) differs from a product engineering team's.

### 13.2 MAS 9.2 native Maximo MCP server

MAS 9.2 ships a **Maximo MCP server** as an `instance_ID-mcp` deployment on OpenShift [IBM docs]:

- **Tools are generated** from Manage: AI configurations (`mcc`, `pcc`, `similarity`, `nl2oslc`, `docsearch`, `insightsgenerator`, allowed via the `MAXAICFGTOOL` table), plus **custom tools** from object structures, automation scripts, workflows, and API routes. Every tool is a Maximo REST API POST, and "Not all Maximo APIs are tools."
- **Sync**: the tools list is fetched at startup and refreshed every `POLLING_FREQUENCY` (default 10 min). `TOOL_RESPONSE_TIMEOUT` defaults to 10 min. The pod waits until Manage is ready.
- **Access**: external agents connect through a public OpenShift **route**, authenticate with an **`apikey` header or JWT**, and use JSON-RPC 2.0 `tools/call` with SSE responses. MCP Inspector can be used for debugging.
- **Maximo Assistant**: in MAS 9.2 the agentic Assistant runs on the ALM-agent, which uses this MCP server to chain tool calls. **The same server is open to external agents**, which means Bob (via `.bob/mcp.json`), Claude, Copilot, Cursor, or any MCP client can use it.

**Governance implication:** because tools run under Manage's REST/security layer, agent actions inherit Manage authorization, business rules, and validation. Give the agent a **dedicated, least-privilege API key** and mark destructive tools with MCP annotations.

### 13.3 IBM-published Bob skills for Maximo

IBM's Build Engineering team publishes, in `ibm-self-serve-assets/building-blocks` → `build-and-deploy/asset-management` [IBM GitHub]:

| Skill | Purpose |
|-------|---------|
| **`maximo-code-optimization`** | Analyze and AI-optimize existing Maximo automation scripts for security, performance, and best practices |
| **`maximo-java-conversion`** | Convert legacy **Java MBO classes → automation scripts** (Jython/Python, JavaScript/Nashorn, MBR) |

Install them by unzipping into the Bob workspace (`bob-skills/maximo-code-optimization.zip`, `bob-skills/maximo_java_conversion.zip`, the latter with an underscore) and enabling them in the Skills panel. IBM notes the patterns "apply to any AI coding assistant." The same repo includes a **Maximo Modernization Asset** web app for batch conversion. Related material: the "AI Powered Maximo Automation Scripts Modernization using Bob" session (Build with Bob, Jun 12 2026), and the repo **Bob-driven-Integration-for-Maximo-via-MCP** (job plans) [FACTBASE].

### 13.4 MAF Local Dev Mode supports the Bob IDE

IBM's **Maximo Application Configuration: Local Dev Mode** extension lists "**IBM Bob IDE** or VSCode 1.74.0+" as prerequisites and has a Bob-specific install path (`install.sh | bash -s bob`). It supports **MAS 9.1.21+ and 9.2.1+** and provides OAuth/OIDC sign-in, a live-reload preview server, an offline cache, Maximo XML diff/merge, and an app browser. It is provided "AS IS" [IBM, ibm-mas.github.io].

### 13.5 Community evaluation [IND]

Yann Bordelanne (a Maximo consultant at Sopra Steria), summarized on DEV Community by Abhay Rao, tested Bob on Maximo SQL, **BIRT** reports, **application XML**, log analysis (a Java library conflict), and **Java → Jython** automation scripts. His conclusion: "The quality of the output depends heavily on the quality of the context provided." His formula is "Context + Tools + Governance + Human Validation." **MCP was explored only as a future possibility, not tested.** He recommends APIs, object structures, and autoscripts over direct database access. Note that this is a secondhand summary of his work.

### 13.6 Where Bob fits in Maximo work (TMG assessment)

| Maximo task | Fit | Why |
|-------------|-----|-----|
| Java MBO → autoscript conversion | **High** | IBM skill exists; pattern-heavy; testable |
| Autoscript review and refactor | **High** | Skill exists; feed it house standards via rules/AGENTS.md |
| BIRT report changes | Medium | Works with context; layout and SQL need human QA |
| App Designer XML edits | Medium | Use Local Dev Mode diff; review before import |
| Integration (OSLC/REST/MIF/Kafka) code | Medium–High | Needs an accurate API catalog in context |
| Data fixes against production | **Do not** | Use MCP/API tools under least privilege, never DB access |
| Upgrade analysis (7.6 → MAS 9) | Medium | Good at inventorying customizations; verify every finding |

---

## 14. TheMaximoGuys Tooling for Maximo AI Agents

These are **agent-neutral**: they work with Bob, Claude, Copilot, Cursor, or any MCP-capable agent.

| Tool | What it is | License |
|------|------------|---------|
| **Max_Interfaces** ([GitHub](https://github.com/themaximoguys/Max_Interfaces)) | Maximo API library: **2,439+ endpoints, 14 modules**, Maximo 7.x/8.x/MAS 9, OSLC + NextGen REST, Postman v2.1 + OpenAPI 3.0, automation-script deploy pipeline (120 requests), API discovery | **MIT, open source** |
| **Max_mcp** ([GitHub](https://github.com/themaximoguys/Max_mcp); npm `@themaximoguys/maximo-mcp` v2.0.0) | Maximo MCP server: **175 tools across 20 modules** (Work Orders, Assets, Inventory, SRs, POs, PM, Job Plans, Labor, Locations, Classifications, Attachments, Analytics, Scheduling, Query, Bulk Ops, Developer Tools, Security Groups, Autoscripts & Admin, Domains, Integration). TypeScript + Zod validation, rate limiting, caching, retries, multi-environment, Docker | **Proprietary. Not open source**; available on npm/GitHub |
| **Max_autoscripts** ([GitHub](https://github.com/themaximoguys/Max_autoscripts)) | 67 Jython sample scripts, 28 templates, `TMG_AUTOSCRIPT_STANDARDS.md`, Java→Jython and TRM→Jython conversion guides; ships `CLAUDE.md`/`AGENTS.md` (house rules for agents) | **MIT, open source** |

**Positioning vs. IBM's built-in MCP server:** the MAS 9.2 server is native, Manage-synced, and powers Maximo Assistant, but it **requires MAS 9.2**, and its tool set depends on what you expose. Max_mcp works **across Maximo versions** with purpose-built, validated tools. They are complementary: a 7.6/MAS 8/9.0/9.1 estate can use Max_mcp today and adopt the native server when it upgrades. Max_autoscripts' `AGENTS.md` and standards file are the natural "house rules" input for Bob rules or skills, and for IBM's `maximo-code-optimization` skill.

---

## 15. What This Means for Maximo Teams

1. **Bob is a credible option, but don't buy it for the 69%.** It is the IBM-native agentic IDE, it has IBM-authored Maximo skills, and MAS 9.2 makes Maximo agent-addressable through MCP. Judge it on your own pilot metrics (§16), not on IBM's internal estimate.
2. **Plan, then act.** Use Plan mode for any Manage customization and attach the plan to your change record. "The plan is the review artifact" is IBM's own line and fits CAB processes.
3. **Agents go through the API layer, never the database.** Connect Bob (or any agent) to Maximo through the MAS 9.2 MCP server or Max_mcp, using a **dedicated read-only API key first**, then a scoped write key per use case. Mark destructive tools.
4. **Lock auto-approve centrally.** Use `DisabledAutoApprovalGroups=edit,execute,mcp` on machines that touch client Maximo code, plus workspace trust and `.bobignore` for `.env`, keystores, and `maximo.properties`. PromptArmor showed that auto-approve is where the risk is.
5. **Feed it house rules.** Put your autoscript standards (e.g. Max_autoscripts' `TMG_AUTOSCRIPT_STANDARDS.md`) into `.bob/rules/` or an `AGENTS.md`. The Sopra Steria tests confirm that output quality tracks context quality.
6. **Choose SaaS vs. self-hosted deliberately.** Regulated utilities, defense, and public-sector Maximo estates may need self-hosted Bob. Budget for OpenShift 4.20+, ~36.5 vCPU / 53 GiB for Bob Core, **plus GPUs** for an open-weight model, no Bobalytics, and a weaker model tier unless your cloud account can reach a frontier model.
7. **Consultancies: watch the indemnity line.** Only Enterprise seats carry IP indemnity. Individual Pro/Pro+/Ultra seats on client code do not.
8. **Measure value, not just activity.** Pair Bobalytics' Bob factor with defect escape rate, review hours, and Bobcoins per completed Maximo task.

---

## 16. Open Questions & Gaps to Close

These items could not be verified, or IBM sources conflict on them. This is the backlog for the next pass.

- **Self-hosted GA date: three candidates.** The Bob September release blog says "As of **September 24**, 2026… generally available." FACTBASE records **Sep 30**. The IBM newsroom announcement is dated **Oct 1** and does not say "GA." Use "GA Sep 24 (release notes); announced Oct 1 (newsroom)."
- **Bob 1.0 vs. GA.** Bob 1.0.0 shipped Mar 24, 2026 (IDC, Techzine, IT Jungle), and global GA was announced Apr 28. IDC's paper uses both dates.
- **Model versions undisclosed on SaaS.** IBM names model families (Claude, Mistral, Granite) but not versions or routing policy, and gives no per-task visibility into which model answered.
- **Self-hosted model list inconsistencies.** The supported-models page lists Gemini 3.7 Flash, while config examples use `gemini-3.6-flash` and `gemini-3.1-pro`. "Mistral 3.5" vs. `mistral-medium-3-5-0`. The Oct 1 press release names no models. Third-party coverage says Nemotron + Laguna at GA.
- **Audit logging conflict (self-hosted).** The September blog says self-hosted "includes identity, the inference gateway, **audit logging, and usage metering**." The solution-architecture doc says the Audit Logs and Metering services are "**Not included in the initial release; planned**." Known limitations say activity logs are not in the Admin UI. The overview says security event logging is "not provided by Bob." Meanwhile the usage-metrics doc describes UMS active-user reporting. **Resolve with IBM before telling a client that self-hosted Bob has an audit trail.**
- **SaaS audit scope.** CADF activity logs cover authentication and admin events. It is unclear whether prompts, tool calls, and file edits reach Splunk SIEM. Verify the SIEM event schema.
- **No public SOC 2 / FedRAMP / ISO 42001 statement for Bob.** Only "IBM is ISO 27001 certified," with artifacts under NDA.
- **Guardrail mechanisms.** IBM names "prompt normalization, sensitive data scanning, real-time policy enforcement, AI red-teaming" but does not document how they work.
- **Rollback and git.** The V2 blog says rollback no longer depends on git; the FAQ still says "The Rollback feature uses Git." Confirm against current docs.
- **Bobcoin economics.** Tokens per Bobcoin are unpublished. Individual overage is ~$0.50 per coin (FACTBASE) vs. Enterprise packs at $550 per 1,000. Self-hosted pricing is unpublished.
- **WCA end-of-support date.** Only "adoption path" language; no published EOS date.
- **Maximo 69% methodology.** Ask IBM for the task mix and measurement method, or leave the figure out.
- **Customer metric consistency.** Blue Pearl appears as "30 days → 3 days" and as "nine months, 14 engineers → three days."
- **Group policies on Bob Shell.** Documented as "Bob IDE only." Confirm Shell coverage for CI runners.
- **Self-hosted GPU sizing.** IBM publishes none for Nemotron, Laguna, or Mistral.
- **Bob + MAS 9.2 MCP end-to-end.** No IBM or community write-up yet shows Bob calling the native Maximo MCP server in production. The Bordelanne MCP scenarios were speculative.

---

## 17. References

### IBM press & announcements
- Project Bob unveiled + Anthropic partnership (Oct 7 2025): https://newsroom.ibm.com/2025-10-07-ibm-unveils-new-software-product-and-intelligent-infrastructure-capabilities-to-help-enterprises-operationalize-ai
- IBM Bob GA (Apr 28 2026): https://newsroom.ibm.com/2026-04-28-introducing-ibm-bob-ai-development-partner-that-takes-enterprises-from-ai-assisted-coding-to-production-ready-software
- Premium Packages, Bobalytics, multi-agent (Jul 9 2026): https://newsroom.ibm.com/2026-07-09-ibm-advances-enterprise-ai-software-development-with-multi-agent-capabilities-and-specialized-modernization-workflows
- Self-hosted deployment (Oct 1 2026): https://newsroom.ibm.com/2026-10-01-ibm-introduces-self-hosted-deployment-for-ibm-bob-to-help-enterprises-advance-ai-sovereignty-and-governance
- Premium Packages + new architecture: https://www.ibm.com/new/announcements/ibm-bob-expands-with-premium-packages-new-architecture-and-greater-enterprise-control
- Premium Package for Java: https://www.ibm.com/new/announcements/announcing-ibm-bob-premium-package-for-java-modernization
- Product page: https://www.ibm.com/products/ai-coding-agent
- IBM Think, TechXchange 2025 developer role: https://www.ibm.com/think/news/new-role-developer-techxchange-2025

### Bob blog & docs
- Bob V2 announcement: https://bob.ibm.com/blog/bob-v2-release-announcement/
- August 2026 release (Bob Shell v2): https://bob.ibm.com/blog/august-2026-release/
- August 2026 release 2 (group policies, ACP, hooks, SIEM): https://bob.ibm.com/blog/august-2026-release-2/
- September 2026 release (self-hosted): https://bob.ibm.com/blog/september-2026-release/
- Launch blog: https://bob.ibm.com/blog/announcing-ibm-bob-launch/
- Getting the most out of Bob: https://bob.ibm.com/blog/getting-the-most-out-of-bob
- Bob meets the mainframe: https://bob.ibm.com/blog/bob-for-z-announcement/
- FAQ: https://bob.ibm.com/docs/ide/faq
- Pricing: https://bob.ibm.com/pricing
- Bobcoins: https://bob.ibm.com/docs/ide/account/bobcoins
- Bobalytics: https://bob.ibm.com/docs/ide/features/bobalytics
- Security guidance: https://bob.ibm.com/docs/ide/security/bob-security-guidance
- Data residency: https://bob.ibm.com/docs/ide/security/data-residency
- Group policies: https://bob.ibm.com/docs/ide/security/group-policies
- Workspace trust: https://bob.ibm.com/docs/ide/security/workspace-trust
- Activity log (CADF): https://bob.ibm.com/docs/ide/enterprise/getting-started/activity-log
- SIEM integration: https://bob.ibm.com/docs/ide/enterprise/getting-started/siem-integration
- Identity providers (SSO): https://bob.ibm.com/docs/ide/enterprise/getting-started/identity-providers
- Self-hosted overview: https://bob.ibm.com/docs/ide/enterprise/on-premises/overview
- Self-hosted system requirements (OCP, sizing): https://bob.ibm.com/docs/ide/enterprise/on-premises/system-requirements
- Self-hosted solution architecture: https://bob.ibm.com/docs/ide/enterprise/on-premises/solution-architecture
- Self-hosted known limitations: https://bob.ibm.com/docs/ide/enterprise/on-premises/known-limitations
- Self-hosted prerequisites: https://bob.ibm.com/docs/ide/enterprise/on-premises/installation/prerequisites
- Model gateway: supported models: https://bob.ibm.com/docs/ide/enterprise/on-premises/model-gateway/supported-models
- Model gateway: configuration (slots): https://bob.ibm.com/docs/ide/enterprise/on-premises/model-gateway/configuration
- Model serving (OpenShift AI / ModelCar): https://bob.ibm.com/docs/ide/enterprise/on-premises/installation/model-serving
- Managing entitlements: https://bob.ibm.com/docs/ide/enterprise/on-premises/managing-entitlements
- Usage metrics (UMS): https://bob.ibm.com/docs/ide/enterprise/on-premises/usage-metrics
- Bob Shell changelog: https://bob.ibm.com/docs/shell/changelog
- Premium packages overview: https://bob.ibm.com/docs/ide/premium-packages/pkg-index

### IBM Think & IBV (messaging, §12)
- Agentic coding: https://www.ibm.com/think/topics/agentic-coding
- Vibe coding: https://www.ibm.com/think/topics/vibe-coding
- Agentic engineering: https://www.ibm.com/think/topics/agentic-engineering
- Vibe coding security risks: https://www.ibm.com/think/insights/vibe-coding-security-risks
- Vibing fatigue (IBM Research): https://www.ibm.com/think/insights/navigating-the-hidden-cost-cognitive-cost-vibe-coding
- Think 2026 recap: https://www.ibm.com/think/news/think-2026-ai-recap
- Tokenmaxxing → valuemaxxing: https://www.ibm.com/think/insights/tokenmaxxing-dead-long-live-valuemaxxing
- Where AI costs are made and saved: https://www.ibm.com/think/perspectives/where-ai-costs-are-made-saved-in-software-development
- IBM Payments Center SDLC: https://www.ibm.com/think/perspectives/accelerating-software-delivery-lifecycle-with-generative-ai

### Independent [IND]
- The Register, PromptArmor vulnerability (Jan 7 2026): https://www.theregister.com/2026/01/07/ibm_bob_vulnerability/
- The Register, GA (Apr 28 2026; RedMonk quote): https://www.theregister.com/software/2026/04/28/ibms-ai-coding-partner-bob-hits-general-availability/5226774
- DevClass, GA (RedMonk quote): https://www.devclass.com/development/2026/04/29/ibms-ai-coding-partner-bob-hits-general-availability/5219012
- IDC paper (Resnick, May 2026): https://www-api.ibm.com/adobe/assets/urn:aaid:aem:f72132ce-a92b-43ea-8b57-f8127b773535/original/as/idc-paper-on-ibm-bob-for-agentic-sdlc-development.pdf
- VentureBeat, "control not capabilities": https://venturebeat.com/orchestration/ibm-launches-bob-with-multi-model-routing-and-human-checkpoints-to-turn-ai-coding-into-a-secure-production-system
- VentureBeat, 45% claim (Oct 2025): https://venturebeat.com/data/ibm-claims-45-productivity-gains-with-project-bob-its-multi-model-ide-that
- Futurum (Ashley), IBM vs. Anthropic COBOL: https://futurumgroup.com/insights/ibm-vs-anthropic-a-tale-of-the-cobol-modernization-tape/
- IT Jungle, Project Bob convergence (Oct 2025): https://www.itjungle.com/2025/10/13/big-blue-converges-ibm-i-rpg-and-system-z-cobol-code-assistants-into-project-bob/
- IT Jungle, Bob 1.0: https://www.itjungle.com/2026/03/02/ibm-gets-bob-1-0-off-the-ground/
- IT Jungle, Bob 2.0 + IBM i package: https://www.itjungle.com/2026/07/13/big-blue-ships-bob-2-0-and-premium-package-for-ibm-i/
- BERI, air-gapped model gap: https://www.beri.net/article/ibm-bob-self-hosted-air-gapped-nemotron-laguna-vs-saas-claude-model-gap-pricing-openshift
- TechFinitive, user/expert views (Northdoor quote): https://www.techfinitive.com/features/ibm-bob-is-out-so-what-do-users-and-experts-think/
- Planet Mainframe, Uwe Graf: https://planetmainframe.com/2026/02/beyond-the-demo-testing-ibm-bob-ai/ and https://planetmainframe.com/2026/09/ibm-bob-vsam-tuning/
- IBM i hallucination issue #3078: https://github.com/IBM/ibm-bob/issues/3078
- Better Stack Bob guide: https://betterstack.com/community/guides/ai/ai-development/ibm-bob-ai/
- Nick Litten, Bob pricing explained: https://www.nicklitten.com/ibm-bob-pricing-explained-free-trial-bobcoins-and-pro-plans-on-ibm-i/

### Maximo ties
- Maximo MCP server overview (MAS 9.2): https://www.ibm.com/docs/en/masv-and-l/cd?topic=developing-maximo-mcp-server-overview
- IBM Building Blocks: asset-management (Maximo Bob skills): https://github.com/ibm-self-serve-assets/building-blocks/tree/main/build-and-deploy/asset-management
- Building Blocks skills for Bob: https://github.com/ibm-self-serve-assets/building-blocks-skills-for-ibm-bob
- Build with Bob: https://ibm-self-serve-assets.github.io/build-with-bob/
- MAF Local Dev Mode: https://ibm-mas.github.io/maf-local-dev-mode/
- Bordelanne Maximo evaluation (DEV summary): https://dev.to/abhayraoym/from-code-assistant-to-maximo-gateway-exploring-ibm-bob-on-real-maximo-challenges-4jfa

### TheMaximoGuys
- Max_Interfaces (MIT): https://github.com/themaximoguys/Max_Interfaces
- Max_mcp (proprietary): https://github.com/themaximoguys/Max_mcp
- Max_autoscripts (MIT): https://github.com/themaximoguys/Max_autoscripts
- Site: https://themaximoguys.ai

---

*DOC16 v1.0 (seed). Companion to DOC14 (watsonx platform) and DOC13 (watsonx.data + Maximo). Enhance by closing the §16 gaps, running a TMG-measured Bob pilot on Maximo autoscript conversion (Bobcoins per task, review hours, defect escapes), and documenting an end-to-end Bob → MAS 9.2 MCP server walkthrough.*
