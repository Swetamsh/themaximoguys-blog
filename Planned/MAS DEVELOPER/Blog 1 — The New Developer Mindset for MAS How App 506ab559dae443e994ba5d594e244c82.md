# Blog 1 — The New Developer Mindset for MAS: How Application Development Has Fundamentally Changed in Maximo Application Suite

Priority: High
Team: Product Design
Status: Not started
Category: MAS DEVELOPER

# The Developer's MAS Awakening: Why Everything You Know About Maximo Development Just Changed

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9, Cloud-Native, and AI-Driven EAM | **Part 1 of 12**

---

<aside>
🎯

**Who this is for:** Maximo developers who have spent years mastering Java, MBOs, database triggers, and WebSphere—and are now wondering why none of that seems to work in MAS 9.

</aside>

---

## The Moment Everything Changed

You've spent 10+ years becoming a Maximo expert. You know the database schema like the back of your hand. You've written elegant Java classes that extend MBOs in ways that still make you proud. Your automation scripts are battle-tested. Your database triggers have saved countless projects.

Then you walk into your first MAS 9 project and hear:

> *"You can't access the database directly."*
> 

> *"Custom Java isn't supported."*
> 

> *"There's no WebSphere to deploy to."*
> 

> *"You don't have SSH access."*
> 

**What happened?**

Nothing less than a complete reimagining of how Maximo works. And if you don't understand *why* the architecture changed, you'll spend the next year fighting against a platform that was designed to help you.

This blog will give you that understanding—not just the "what" of MAS development, but the **"why it matters to you as a developer"** and **"how to think differently."**

---

## 🔥 The Biggest Myth: "MAS is just Maximo 7.6 on OpenShift"

**No. Absolutely not.**

MAS is a **modern cloud-native, API-driven, microservices-based platform**. It:

- Runs as **containerized microservices**
- Uses **operators** for automation
- Has **strict boundaries**
- Does **not** allow server-side customization
- Enforces **API-only** development
- Has **no access to WAS/WebSphere internals**
- Gives **restricted or no DB access** depending on environment

<aside>
💡

**Key insight:** If you design MAS like a WebSphere app with DB shortcuts and deep server access, you will fight the platform at every step. If you design it like a cloud-native platform with APIs and events, the architecture starts to make sense.

</aside>

---

## 📊 INFOGRAPHIC 1: The Great Divide — What Changed

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║     ┌─────────────────────────────────┐     ┌─────────────────────────────────┐     ║
║     │      MAXIMO 7.6.x WORLD         │     │        MAS 9 WORLD              │     ║
║     │     "The Old Neighborhood"       │     │    "The New Platform"           │     ║
║     └─────────────────────────────────┘     └─────────────────────────────────┘     ║
║                                                                                      ║
║         ┌───────────────┐                        ┌───────────────┐                   ║
║         │   WebSphere   │                        │   OpenShift   │                   ║
║         │   ┌───────┐   │                        │  ┌─┐ ┌─┐ ┌─┐  │                   ║
║         │   │ EAR   │   │         ──►           │  │●│ │●│ │●│  │  ← Pods           ║
║         │   │ File  │   │                        │  └─┘ └─┘ └─┘  │                   ║
║         │   └───────┘   │                        │  ┌─┐ ┌─┐ ┌─┐  │                   ║
║         └───────┬───────┘                        │  │●│ │●│ │●│  │                   ║
║                 │                                │  └─┘ └─┘ └─┘  │                   ║
║                 ▼                                └───────────────┘                   ║
║         ┌───────────────┐                                                            ║
║         │   DATABASE    │                        ┌───────────────┐                   ║
║         │  ┌─────────┐  │                        │   SEALED DB   │                   ║
║         │  │ Direct  │  │                        │   ┌───────┐   │                   ║
║         │  │ Access! │  │                        │   │  API  │◄──┼── Only way in!   ║
║         │  └─────────┘  │                        │   │ Layer │   │                   ║
║         └───────────────┘                        │   └───────┘   │                   ║
║                                                  └───────────────┘                   ║
║                                                                                      ║
║     ╭─────────────────────────────────────────────────────────────────────────╮     ║
║     │  YOU HAD:                        │  YOU HAVE NOW:                        │     ║
║     │  ✓ Custom Java classes          │  ✗ No custom Java                     │     ║
║     │  ✓ Database triggers            │  ✗ No triggers allowed                │     ║
║     │  ✓ Direct SQL queries           │  ✗ API-only data access               │     ║
║     │  ✓ SSH server access            │  ✗ No server access                   │     ║
║     │  ✓ EAR deployments              │  ✗ Operator-managed deployments       │     ║
║     │  ✓ WebSphere logs               │  ✗ Observability dashboards           │     ║
║     ╰─────────────────────────────────────────────────────────────────────────╯     ║
║                                                                                      ║
║              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                             ║
║                    "The walls went up for a reason"                                  ║
║              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~                             ║
║                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🚫 Why You Will Not Have Full Database Access Anymore

### MAS SaaS → No DB access. Zero.

IBM controls:

- DB2/Postgres backend
- Scaling and patching
- Indexes and connections

**You cannot:**

- Run queries directly
- Create custom triggers
- Create DB artifacts
- Run stored procedures
- Bypass API logic

### MAS On-Prem → Restricted access

You may have DB access *but cannot create unsupported objects*:

- No triggers
- No stored procedures
- No direct MBO updates
- No object-level inserts
- No DB vendor-specific logic

### Why the restrictions?

Because MAS must support:

**Platform Needs**

- Cluster scaling
- Zero-downtime upgrades
- SaaS multi-tenancy

**Stability Needs**

- Strict data integrity
- Predictable performance
- Operator-driven deployments

<aside>
🔑

**Key insight:** Direct DB hacks that once felt "efficient" now translate into upgrade blockers and platform instability. The real power move is to embrace APIs and supported mechanisms so you keep compatibility with the MAS roadmap.

</aside>

---

## 🧠 The Mindset Shift: From "Application Developer" to "Platform Developer"

### Old Mindset: Maximo is an Application

- One big application running on a server
- I customize it by modifying its internals
- The database is my playground
- I deploy changes to "my" server
- Problems? I'll debug on the server

### New Mindset: MAS is a Platform

- Multiple microservices working together
- I extend it through defined boundaries
- APIs are my interface
- Changes deploy through operators
- Problems? I'll observe through dashboards

---

## 📊 INFOGRAPHIC 2: The New Developer Toolbox

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║           🛠️  THE MAS DEVELOPER'S NEW TOOLBOX  🛠️                                   ║
║                                                                                      ║
║     ╭────────────────────────────────────────────────────────────────────────╮      ║
║     │                                                                         │      ║
║     │   OLD TOOL                    REPLACEMENT                               │      ║
║     │   ════════                    ═══════════                               │      ║
║     │                                                                         │      ║
║     │   ┌──────────────┐            ┌──────────────────────────┐             │      ║
║     │   │ Custom Java  │    ──►     │  🐍 Automation Scripts   │             │      ║
║     │   │   Classes    │            │     (Python/JavaScript)  │             │      ║
║     │   └──────────────┘            └──────────────────────────┘             │      ║
║     │          ↓                              ↓                               │      ║
║     │     MBO.java                    Object Launch Points                    │      ║
║     │     extends...                  Attribute Launch Points                 │      ║
║     │                                 Action Launch Points                    │      ║
║     │                                 Library Scripts                         │      ║
║     │                                                                         │      ║
║     │   ┌──────────────┐            ┌──────────────────────────┐             │      ║
║     │   │   Database   │    ──►     │  🌐 REST APIs + Events   │             │      ║
║     │   │   Triggers   │            │     (OSLC / GraphQL)     │             │      ║
║     │   └──────────────┘            └──────────────────────────┘             │      ║
║     │          ↓                              ↓                               │      ║
║     │    CREATE TRIGGER              GET /maximo/oslc/os/mxwo               │      ║
║     │    AFTER INSERT...             POST with OAuth tokens                  │      ║
║     │                                Kafka event subscriptions               │      ║
║     │                                                                         │      ║
║     │   ┌──────────────┐            ┌──────────────────────────┐             │      ║
║     │   │  Direct SQL  │    ──►     │  📊 Object Structures    │             │      ║
║     │   │   Queries    │            │     + Integration APIs   │             │      ║
║     │   └──────────────┘            └──────────────────────────┘             │      ║
║     │                                                                         │      ║
║     │   ┌──────────────┐            ┌──────────────────────────┐             │      ║
║     │   │  WebSphere   │    ──►     │  📈 Observability Stack  │             │      ║
║     │   │    Logs      │            │   Grafana + Dashboards   │             │      ║
║     │   └──────────────┘            └──────────────────────────┘             │      ║
║     │                                                                         │      ║
║     ╰────────────────────────────────────────────────────────────────────────╯      ║
║                                                                                      ║
║        ★ Automation Scripts = Your new best friend                                   ║
║        ★ APIs = Your only door to data                                               ║
║        ★ Configuration = Better than code                                            ║
║                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🛠️ The New Developer Toolbox (Detailed)

### ✅ 1. Automation Scripts (Primary Custom Logic Tool)

**Supported languages:**

- Python (Jython 2.7.2)
- JavaScript (Nashorn engine)

**Use scripts for:**

- Validation and crossovers
- Workflow logic and automation
- Field overrides and actions
- Integration pre/post processing

```python
# Automation Script: Validate Work Order Priority
# Launch Point: WORKORDER Object, Save Event

if wopriority is not None and wopriority < 1:
    errorgroup = 'workorder'
    errorkey = 'invalidpriority'
    # Framework throws exception after script completes
```

<aside>
💡

**Key insight:** Automation Scripts are now your main logic layer. If you are still reaching for custom Java, you are designing against MAS, not with it.

</aside>

### ✅ 2. Integration Services (REST-First Development)

MAS expects external interactions via:

- REST APIs with JSON payloads
- OAuth tokens for authentication
- Named events and async queues
- Webhooks for real-time notifications

```python
# NEW: REST API call for data
import requests
response = requests.get(
    f"{base_url}/maximo/oslc/os/mxwo",
    params={"oslc.where": 'status="APPR"'},
    headers={"Authorization": f"Bearer {token}"}
)
work_orders = response.json()["member"]
```

### ✅ 3. UI Customization via Application Designer + Work Centers

**You can:**

- Adjust apps and build new dialogs
- Create conditional UI behavior
- Configure field visibility and validation

**You cannot:**

- Inject custom UI frameworks
- Embed server-side Java
- Modify internal JSPs

**UI is configuration, not code.**

### ✅ 4. Maximo Mobile Development

**Built-in features:**

- React Native foundation
- Offline-first sync
- Domain-driven mobile configuration

**Developers extend mobile using:**

- App configuration and flows
- Automation scripts for backend logic
- Mobile policies

---

## 🔍 MAS Troubleshooting: No More WebSphere Logs

### Legacy troubleshooting:

- WAS logs (`systemout.log` / `systemerr.log`)
- JVM heap dumps
- Custom debugging on the app server

### MAS introduces observability:

| Tool | What It Shows |
| --- | --- |
| **System Health Dashboard** | Pod status, service failures, operator errors |
| **Integration Log Viewer** | API failures, payload errors, auth problems |
| **Message Reprocessing** | Failed transactions, retry with corrections |
| **Observability (ESB)** | Retry logic, throttling, mapping failures |
| **Synthetic Monitoring** | Health checks for API availability |

<aside>
🔑

**Key insight:** Stop hunting inside JVM logs and start thinking in terms of end-to-end flows, dashboards, and platform health signals.

</aside>

---

## 📊 INFOGRAPHIC 3: The Five Stages of MAS Developer Grief

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║       😰 THE FIVE STAGES OF MAS DEVELOPER GRIEF (and Recovery) 😊                   ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                             │   ║
║   │    STAGE 1: DENIAL  😵                                                      │   ║
║   │    ════════════════                                                         │   ║
║   │    "This can't be right. There MUST be                                      │   ║
║   │     a way to access the database..."                                        │   ║
║   │                                                                             │   ║
║   │    Reality: There isn't. Accept it now.                                     │   ║
║   │                                           │                                 │   ║
║   │                                           ▼                                 │   ║
║   │    STAGE 2: ANGER  😤                                                       │   ║
║   │    ═══════════════                                                          │   ║
║   │    "This is SO limiting! I could solve                                      │   ║
║   │     this in 5 minutes with a trigger!"                                      │   ║
║   │                                                                             │   ║
║   │    Reality: You could also create upgrade                                   │   ║
║   │             blockers in 5 minutes.                                          │   ║
║   │                                           │                                 │   ║
║   │                                           ▼                                 │   ║
║   │    STAGE 3: BARGAINING  🤔                                                  │   ║
║   │    ═══════════════════                                                      │   ║
║   │    "Okay, but surely there's a workaround?                                  │   ║
║   │     Maybe an unsupported API?"                                              │   ║
║   │                                                                             │   ║
║   │    Reality: Workarounds create tech debt                                    │   ║
║   │             that compounds with every upgrade.                              │   ║
║   │                                           │                                 │   ║
║   │                                           ▼                                 │   ║
║   │    STAGE 4: DEPRESSION  😔                                                  │   ║
║   │    ═══════════════════                                                      │   ║
║   │    "I spent years learning things that                                      │   ║
║   │     don't matter anymore..."                                                │   ║
║   │                                                                             │   ║
║   │    Reality: Your domain knowledge is still                                  │   ║
║   │             invaluable. Only the HOW changed.                               │   ║
║   │                                           │                                 │   ║
║   │                                           ▼                                 │   ║
║   │    STAGE 5: ACCEPTANCE  🎉                                                  │   ║
║   │    ═══════════════════                                                      │   ║
║   │    "I understand why MAS works this way,                                    │   ║
║   │     and my solutions are actually cleaner now."                             │   ║
║   │                                                                             │   ║
║   │    Reality: Developers here build more maintainable,                        │   ║
║   │             upgrade-safe, scalable solutions.                               │   ║
║   │                                                                             │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
║            🎯 GOAL: Get to Stage 5 as fast as possible!                             ║
║                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 💡 Why This New World Is Actually Better (Once You Accept It)

### 1. No More "Works On My Server" Problems

**Old world:** *"It worked in dev, but failed in prod because of a missing trigger."*

**MAS world:** Everything is containerized and consistent. Dev, test, prod—identical.

### 2. Zero-Downtime Deployments

**Old world:** *"Deploy window: Saturday 2 AM - 6 AM. All hands on deck."*

**MAS world:** Rolling updates. One pod restarts while others serve traffic.

### 3. Automatic Scaling

**Old world:** *"Users are complaining about slowness. We need to buy more RAM."*

**MAS world:** More users → more pods spin up automatically → performance maintained.

### 4. Upgrade-Safe Customizations

**Old world:** *"We can't upgrade because our triggers won't survive."*

**MAS world:** Automation scripts, API integrations, and config-based customizations survive upgrades.

### 5. Built-In Observability

**Old world:** *"What happened at 3 AM? Let me grep through 6 months of logs..."*

**MAS world:** Dashboards, alerts, traces—you know what happened, when, and why.

---

## 🔮 Future of MAS Development: Where This Is Heading

### ⭐ 1. AI-Assisted Development

IBM is pushing towards:

- Watsonx Orchestrate workflows
- AI Assist for technicians
- RAG-powered help and auto-generated scripts
- Predictive customization recommendations

### ⭐ 2. Zero-Code / Low-Code Extensibility

Future MAS versions may:

- Move more logic to configuration
- Eliminate scripting in many areas
- Provide no-code workflow builders

### ⭐ 3. API-Only Extensions

MAS is moving rapidly toward:

- REST API extensibility
- Event hooks and webhooks
- API-based transformations

### ⭐ 4. Serverless Extensions

Long-term roadmap may include:

- External serverless functions invoked from MAS events
- Cloud triggers and event-driven custom logic

<aside>
🔑

**Key insight:** The more your solution depends on APIs, events, and configuration, the more future-proof it becomes as MAS adds AI, serverless hooks, and deeper automation.

</aside>

---

## 📊 INFOGRAPHIC 4: Your 8-Week Transformation Roadmap

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║        🚀 FROM 7.6 DEVELOPER TO MAS DEVELOPER: 8-WEEK ROADMAP 🚀                    ║
║                                                                                      ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐   ║
║   │                                                                             │   ║
║   │   WEEKS 1-2: UNDERSTAND THE BOUNDARIES                                      │   ║
║   │   ════════════════════════════════════                                      │   ║
║   │   ┌────┐                                                                    │   ║
║   │   │ 📚 │  □ Read IBM's MAS architecture docs                               │   ║
║   │   │    │  □ Set up a MAS sandbox environment                               │   ║
║   │   │    │  □ Try "the old way" — observe what fails                         │   ║
║   │   │    │  □ Document blocked patterns + alternatives                        │   ║
║   │   └────┘                                                                    │   ║
║   │              │                                                              │   ║
║   │              ▼                                                              │   ║
║   │   WEEKS 3-4: MASTER AUTOMATION SCRIPTS                                      │   ║
║   │   ════════════════════════════════════                                      │   ║
║   │   ┌────┐                                                                    │   ║
║   │   │ 🐍 │  □ Convert one Java customization to script                       │   ║
║   │   │    │  □ Learn all launch point types                                   │   ║
║   │   │    │  □ Practice with implicit variables                               │   ║
║   │   │    │  □ Build a library script for reuse                               │   ║
║   │   └────┘                                                                    │   ║
║   │              │                                                              │   ║
║   │              ▼                                                              │   ║
║   │   WEEKS 5-6: EMBRACE API-FIRST                                              │   ║
║   │   ════════════════════════════════                                          │   ║
║   │   ┌────┐                                                                    │   ║
║   │   │ 🌐 │  □ Learn the OSLC API structure                                   │   ║
║   │   │    │  □ Build a simple REST integration                                │   ║
║   │   │    │  □ Understand OAuth token management                              │   ║
║   │   │    │  □ Practice with GraphQL                                          │   ║
║   │   └────┘                                                                    │   ║
║   │              │                                                              │   ║
║   │              ▼                                                              │   ║
║   │   WEEKS 7-8: LEARN OBSERVABILITY                                            │   ║
║   │   ══════════════════════════════                                            │   ║
║   │   ┌────┐                                                                    │   ║
║   │   │ 📈 │  □ Explore the MAS Admin dashboard                                │   ║
║   │   │    │  □ Set up alerts for your integrations                            │   ║
║   │   │    │  □ Practice troubleshooting sans server access                    │   ║
║   │   │    │  □ Document your monitoring patterns                              │   ║
║   │   └────┘                                                                    │   ║
║   │                                                                             │   ║
║   │              ════════════════════════════════                                │   ║
║   │              🎉 YOU'RE NOW A MAS DEVELOPER! 🎉                              │   ║
║   │              ════════════════════════════════                                │   ║
║   │                                                                             │   ║
║   └─────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 🎯 Final Takeaways: The 10 Commandments of MAS Development

<aside>
1️⃣

**Stop thinking about MBO-level customizations.** The abstraction layer has moved up.

</aside>

<aside>
2️⃣

**Stop touching the database directly.** Every query goes through APIs now.

</aside>

<aside>
3️⃣

**Build everything API-first.** This is the foundation of all MAS development.

</aside>

<aside>
4️⃣

**Use Automation Scripts as your primary logic layer.** Python and JavaScript are your new languages.

</aside>

<aside>
5️⃣

**Expect stricter controls as MAS evolves.** The boundaries will only get tighter.

</aside>

1. **Learn integrations, cloud-native patterns, and AI.** These are your new skills.
2. **Troubleshoot using dashboards, not logs.** Observability is the new debugging.
3. **Architect for SaaS even if you are on-prem.** Future-proof your designs.
4. **Think low-code, not custom-code.** Configuration beats code every time.
5. **See your role shifting from "developer" to "solution designer."** Your value is in the what, not the how.

---

## 📚 Resources for Your Journey

### IBM Official

- [MAS 9.0 Documentation](https://www.ibm.com/docs/en/mas-cd/continuous-delivery)
- [Maximo Manage Developer Guide](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=developing)
- [Automation Scripts Documentation](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=administering-automation-scripts)

### Community

- [IBM Maximo Community](https://community.ibm.com/community/user/asset-facilities)
- [Maximo Secrets Blog](https://maximosecrets.com)
- [IBM Developer - Maximo](https://developer.ibm.com/components/maximo/)

### Training

- [IBM Training - Maximo Application Suite](https://www.ibm.com/training/learning-path/maximo-application-suite-375)
- [Automation Scripting Course (MAX4337G)](https://www.ibm.com/training/course/maximo-application-suite-manage-automation-scripting-MAX4337G)

---

## What's Next

Now that you understand the developer mindset shift, let's dive deep into the technical architecture that makes all of this possible:

**Next Blog:** [Blog 2 — MAS 9 Architecture Deep Dive: Microservices, Containers, Operators, and OpenShift](Blog%202%20%E2%80%94%20MAS%209%20Architecture%20Deep%20Dive%20(Microservic%204cd16316622d489fa1464e00a9664715.md) — Understand the infrastructure layer that powers MAS.

---

**Series:** Modern Maximo - Transforming from Legacy 7.6.x to MAS 9, Cloud-Native, and AI-Driven EAM

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.