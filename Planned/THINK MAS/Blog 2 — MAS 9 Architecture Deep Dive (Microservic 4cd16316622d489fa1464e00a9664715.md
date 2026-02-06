# Blog 2 — MAS 9 Architecture Deep Dive (Microservices, Containers, Operators, OpenShift)

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS
Visual Status: Needs Visuals
Visual Tool: Excalidraw
Visual Type: Architecture Diagram, Infographic

# MAS 9 Architecture Deep Dive: Microservices, Containers, Operators, and OpenShift

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9, Cloud-Native, and AI-Driven EAM | **Part 2 of 12**

**Read Time:** 18-22 minutes

<aside>
🎯

**Who this is for:** Maximo architects, system administrators, infrastructure engineers, and senior developers who need to understand the technical underpinnings of MAS 9 — especially those planning or evaluating a migration from 7.6.x.

</aside>

---

<aside>
🏗️

**What this blog covers:** The technical infrastructure layer of MAS 9 — how OpenShift, containers, operators, and microservices work together to run Maximo. This is for architects, admins, and developers who need to understand what's happening "under the hood."

</aside>

---

## Introduction: From "Maximo on a Server" to "Maximo on a Platform"

In Blog 1, we discussed the developer mindset shift. Now let's dive into the technical reality: **how MAS 9 is actually built, deployed, and operated.**

If you're used to Maximo 7.6.x, the MAS architecture might feel alien at first:

- No more EAR files deployed to WebSphere
- No more database connection pools tuned in an XML file
- No more SSH access to tail logs

Instead, you're looking at:

- Dozens of containerized microservices
- Kubernetes operators managing lifecycle
- Declarative configuration in YAML files
- Horizontal pod autoscaling
- Service meshes and API gateways

**This isn't just "Maximo in the cloud." It's a ground-up reimagining of how enterprise asset management software is architected.**

---

## 🏛️ The Legacy Architecture: How Maximo 7.6.x Worked

Before diving into MAS, let's acknowledge what we're leaving behind:

### Classic 3-Tier Architecture

```
╭───────────────────────────────────────────────╮
│              PRESENTATION TIER                │
│            (Browser -> Single URL)            │
╰──────────────────────┬────────────────────────╯
                       │
                       ▼
╭───────────────────────────────────────────────╮
│               APPLICATION TIER                │
│               (The Monolith)                  │
│      ┌─────────────────────────────────┐      │
│      │        WebSphere / JVM          │      │
│      │    [   Maximo.EAR File   ]      │      │
│      │    (All Logic + State)          │      │
│      └─────────────────────────────────┘      │
╰──────────────────────┬────────────────────────╯
                       │
                       ▼
╭───────────────────────────────────────────────╮
│                  DATA TIER                    │
│                 (The Vault)                   │
│               _____________                   │
│              (_ DATABASE  _)                  │
│                                               │
╰───────────────────────────────────────────────╯
```

### Characteristics of 7.6.x

| Attribute | Description |
| --- | --- |
| **Monolithic** | One massive EAR file containing everything |
| **Stateful** | Session data stored in JVM memory |
| **Vertically scaled** | Need more performance? Add CPU/RAM to the server |
| **Manually managed** | Installs, patches, and restarts by administrators |
| **Tightly coupled** | Database schema, business logic, and UI deployed together |
| **Long upgrade cycles** | Major versions every 2-3 years with extensive testing |

### Why This Worked (For Two Decades)

This architecture was proven, well-documented, and supported by deep expertise. Most importantly, **it was predictable.** You knew exactly where everything ran, how to troubleshoot it, and how to scale it.

**But it had limits:**

- Scaling required downtime
- Updates were risky and infrequent
- Resource utilization was inefficient
- Geographic distribution was complex
- Multi-tenancy was difficult
- Modern DevOps practices didn't fit

<aside>
💡

**Key insight:** The 7.6.x architecture was predictable and well-understood, but its monolithic design meant scaling required downtime, updates were risky, and modern DevOps practices simply did not fit. Understanding these limitations is essential to appreciating why MAS 9 was re-architected from the ground up.

</aside>

---

## 🚀 The MAS 9 Architecture: Cloud-Native from the Ground Up

MAS 9 represents a fundamental redesign. Let's break it down layer by layer.

---

### Layer 1: The Foundation — Red Hat OpenShift

MAS runs on **Red Hat OpenShift**, which is enterprise Kubernetes with additional capabilities.

#### What OpenShift Provides:

| Capability | Description |
| --- | --- |
| **Container orchestration** | Schedules and manages containers across a cluster |
| **Self-healing** | Automatically restarts failed containers, replaces dying nodes |
| **Load balancing** | Distributes traffic across healthy pods |
| **Service discovery** | Applications find each other automatically |
| **Storage orchestration** | Dynamically provisions and attaches storage |
| **Security** | RBAC, security contexts, network policies |
| **Monitoring and logging** | Built-in observability stack |

#### Why This Matters for Maximo:

OpenShift handles all the infrastructure complexity that you used to manage manually:

- Server crashes? **OpenShift recovers.**
- Need more capacity? **OpenShift scales.**
- Security patch? **OpenShift applies it across all nodes.**

---

### Layer 2: The Abstraction — Containers and Pods

In Maximo 7.6.x, you deployed an EAR file to WebSphere. In MAS, you deploy **containerized microservices.**

#### Containers Explained (For Maximo People):

Think of a container as a lightweight, standalone package that includes:

- The Maximo component code
- All dependencies (Java runtime, libraries)
- Configuration
- Everything needed to run independently

#### Key Differences from Traditional VMs:

| VMs | Containers |
| --- | --- |
| Start in minutes | Start in seconds |
| Gigabytes in size | Megabytes in size |
| Full OS per instance | Share host OS kernel |
| Mutable (modify in place) | Immutable (replace, don't modify) |

#### Pods: The Atomic Unit

A **pod** is one or more containers that run together:

- Share network namespace (can talk via [localhost](http://localhost))
- Share storage volumes
- Scheduled together on the same node
- Scale together

**Example:** The Maximo Manage UI pod includes:

- Main Maximo container
- Sidecar logging container
- Init container for database migration checks

---

### Layer 3: The Intelligence — Kubernetes Operators

This is where MAS gets powerful. **Operators are like autonomous administrators** that continuously manage MAS for you.

#### What Operators Do:

- **Installation**
- Read declarative configuration ("I want MAS Manage 9.0")
- Pull required container images
- Create pods, services, and storage
- Configure networking and security
- Verify health checks and report status
- **Upgrades**
- Orchestrate rolling updates
- Maintain availability during upgrade
- Roll back automatically if health checks fail
- Update configuration and secrets
- **Scaling**
- Monitor resource utilization
- Add or remove pods based on demand
- Rebalance workloads across nodes
- **Healing**
- Detect failed pods and restart them
- Detect unhealthy nodes and reschedule pods
- Maintain desired state continuously
- **Day-2 Operations**
- Backup and restore
- Certificate rotation
- Secret management
- Configuration updates

#### MAS-Specific Operators:

| Operator | Responsibility |
| --- | --- |
| **Core operator** | Manages the overall MAS platform |
| **Manage operator** | Handles Maximo Manage application |
| **IoT operator** | Manages Monitor, Health, and Predict |
| **Additional operators** | For Assist, Visual Inspection, etc. |

<aside>
⏱️

**Time savings:** Remember manually installing Maximo 7.6.x? Database schemas, middleware configuration, EAR deployment, integration framework setup? That 3-day process becomes a **90-minute operator-driven deployment** in MAS.

</aside>

<aside>
💡

**Key insight:** Operators are the game-changer in MAS. They transform what used to be a 3-day manual installation into a 90-minute automated deployment, and they continuously manage upgrades, scaling, and healing without human intervention. This is the single biggest operational improvement over 7.6.x.

</aside>

---

### Layer 4: The Architecture — Microservices Decomposition

MAS decomposes the monolithic Maximo application into many specialized services.

#### Core MAS Services (Platform Level):

| Service | Function |
| --- | --- |
| **Authentication service** | User login, SSO, LDAP integration |
| **User interface service** | Admin console, workspace management |
| **API gateway** | Routes and secures API traffic |
| **Event bus (Kafka)** | Message backbone for async communication |
| **Data lake (MongoDB)** | Unstructured data storage |
| **Licensing service** | Entitlement and feature management |
| **Certificate manager** | TLS certificate lifecycle |
| **Backup service** | Automated backup orchestration |

#### Maximo Manage Services (Application Level):

| Service | Function |
| --- | --- |
| **UI services** | React-based modern interface |
| **Integration services** | API endpoints, webhooks |
| **Application logic services** | Business rules engine |
| **Workflow engine** | Automated process orchestration |
| **Reporting services** | Report generation and scheduling |
| **Mobile services** | Maximo Mobile backend |
| **Search services** | Elasticsearch-powered search |
| **Cron services** | Scheduled tasks and escalations |
| **JMS services** | Message queue processing |

#### Additional Applications (When Licensed):

- **Maximo Health:** Asset health scoring and analytics
- **Maximo Predict:** Predictive maintenance ML models
- **Maximo Assist:** AI-powered technician guidance
- **Maximo Monitor:** IoT sensor data processing
- **Maximo Visual Inspection:** Computer vision for inspections

#### Why Microservices Matter:

| Benefit | Description |
| --- | --- |
| **Independent scaling** | UI heavily used? Scale just the UI pods. |
| **Independent updates** | Update mobile service without touching core Manage. |
| **Fault isolation** | UI crashes don't bring down workflows. |
| **Technology flexibility** | Services use Java, Node.js, Python, or Go as needed. |
| **Team alignment** | Different teams can own different services. |

---

### Layer 5: The Organization — Tenants and Workspaces

MAS introduces multi-tenancy concepts that didn't exist in 7.6.x:

#### Tenant (Instance Level):

- Highest level of isolation
- Separate database schemas
- Independent authentication
- Dedicated resources
- Used in SaaS environments

#### Workspace (Organizational Unit):

- Logical grouping within a tenant
- Shared database
- Can have different applications enabled
- Common use: Development, Test, Production workspaces

#### Example Structure:

```
MAS Instance (Tenant: ACME Corp)
│
├── Development Workspace
│   ├── Maximo Manage
│   └── Maximo Mobile
│
├── Test Workspace
│   ├── Maximo Manage
│   ├── Maximo Health
│   └── Maximo Predict
│
└── Production Workspace
    ├── Maximo Manage
    ├── Maximo Health
    ├── Maximo Predict
    ├── Maximo Assist
    └── Maximo Mobile
```

---

## 📊 Comparing 7.6.x and MAS 9 Architectures

| Aspect | Maximo 7.6.x | MAS 9 |
| --- | --- | --- |
| **Deployment** | Manual EAR deployment, config editing | Operator-driven, declarative YAML |
| **Time to deploy** | 3 days | 90 minutes |
| **Scaling** | Vertical (bigger server) or manual clustering | Horizontal pod autoscaling |
| **Scaling downtime** | Hours | Zero |
| **Updates** | Download fix packs, manual testing, scheduled downtime | Rolling updates, automatic rollback |
| **Update frequency** | Yearly | Quarterly |
| **Recovery** | Page the admin, diagnose, manually restart | Automatic pod restart, self-healing |
| **MTTR** | Hours | Minutes |
| **Troubleshooting** | SSH to server, tail SystemOut.log | Grafana dashboards, aggregated logs |
| **Access needed** | Root/admin | Read-only monitoring |
| **Integration** | Direct database, JDBC, triggers | REST APIs, GraphQL, event streams |
| **Coupling** | Tight | Loose |

---

## 📈 Performance and Scaling in MAS 9

### Horizontal Scaling (MAS 9)

Need more capacity? **Add more pods.**

**Example:**

- Baseline: 3 Maximo UI pods handling normal load
- Peak demand: Auto-scale to 10 pods
- Off-peak: Scale down to 2 pods
- **No downtime, automatic load balancing**

### Vertical Scaling (7.6.x)

Need more capacity? **Add CPU/RAM to the server.**

**Example:**

- Baseline: 1 server with 32GB RAM
- Peak demand: Manual upgrade to 64GB RAM
- **Requires: Downtime, hardware procurement, risk**

### Resource Efficiency

| Approach | Behavior |
| --- | --- |
| **7.6.x** | One monolithic JVM uses all allocated resources whether needed or not |
| **MAS 9** | Pods sized appropriately for their function. UI pods small, reporting pods larger. |

**Typical improvement:** 30-40% better resource utilization.

<aside>
💡

**Key insight:** Horizontal scaling in MAS 9 is not just about handling more load — it fundamentally changes the economics of running Maximo. You pay for what you use, scale without downtime, and automatically shed capacity during off-peak hours. This alone can justify the migration for organizations with variable workloads.

</aside>

---

## 🗣️ Talking with Infrastructure Teams: Common Questions

### Compute and Sizing

**Q: "What's the compute footprint for MAS?"**

A: Depends on applications and workload. Baseline MAS Manage requires ~96GB RAM and 32 vCPUs for small deployment. IBM provides sizing calculators.

**Q: "How do we handle database connection pooling?"**

A: Each microservice manages its own connection pool. The platform handles this automatically based on pod scaling.

### Sessions and State

**Q: "What about session persistence?"**

A: MAS uses token-based authentication. Session state is externalized to Redis, not stored in-memory.

### Backup and Recovery

**Q: "How do we back up MAS?"**

A: The MAS backup operator orchestrates backup of configuration, databases, and persistent volumes. It integrates with your existing backup infrastructure.

**Q: "What about disaster recovery?"**

A: MAS supports multi-site deployments with database replication. The operators manage application-level recovery.

### Network and Security

**Q: "What's the network topology?"**

A: North-south traffic (users to MAS) goes through OpenShift ingress. East-west traffic (service-to-service) uses the internal service mesh. External integrations go through the API gateway.

**Q: "How do we handle security scanning?"**

A: Container images should be scanned in your registry. OpenShift includes security context constraints (SCCs) and pod security policies.

---

## ⚠️ Common Architectural Misconceptions

<aside>
❌

**Misconception 1:** "MAS is just containerized 7.6.x"

**Reality:** MAS is a re-architected, microservices-based platform. The UI, business logic, and data layer have been redesigned.

</aside>

<aside>
❌

**Misconception 2:** "We can still use our database integrations"

**Reality:** The database is sealed. All integrations must use APIs or event streams.

</aside>

<aside>
❌

**Misconception 3:** "OpenShift is just fancy Kubernetes—we can use any Kubernetes"

**Reality:** While MAS technically runs on Kubernetes, IBM only supports Red Hat OpenShift. The operators rely on OpenShift-specific features.

</aside>

<aside>
❌

**Misconception 4:** "We don't need OpenShift experts—our Maximo team can handle it"

**Reality:** You need both Maximo expertise AND OpenShift/Kubernetes skills. Plan for training or augment your team.

</aside>

<aside>
❌

**Misconception 5:** "SaaS and on-premises MAS are identical"

**Reality:** SaaS is multi-tenant and managed by IBM. On-premises gives you control but requires OpenShift management. Architecture is similar, but operational model differs significantly.

</aside>

---

## 🤔 Decision Framework: On-Premises vs SaaS

### Choose On-Premises If:

- Data sovereignty requirements prohibit cloud storage
- Air-gapped or highly restricted network environments
- Significant customizations requiring deep platform control
- Existing OpenShift investment and expertise
- Integration with on-premises legacy systems
- Regulatory requirements for infrastructure control

**You'll need:**

- OpenShift cluster (minimum 3 masters, 3+ workers)
- Storage infrastructure (NFS, Ceph, or enterprise SAN)
- Skilled OpenShift administrators
- Disaster recovery and backup infrastructure

### Choose SaaS If:

- Want to minimize operational overhead
- Prefer predictable OpEx over CapEx
- Standard configurations without deep customizations
- Don't have OpenShift expertise (and don't want to build it)
- Need rapid deployment (weeks, not months)
- Want IBM to handle platform updates and security

**You'll get:**

- Fully managed platform
- Automatic updates and patches
- 99.9% availability SLA
- IBM handles infrastructure, security, backups
- Focus on configuring Maximo, not managing Kubernetes

---

## 🎯 Key Takeaways

<aside>
1️⃣

**MAS runs as containerized microservices on OpenShift**, replacing the monolithic WebSphere architecture of 7.6.x

</aside>

<aside>
2️⃣

**Operators automate installation, upgrades, scaling, and healing**, eliminating manual administrative tasks

</aside>

<aside>
3️⃣

**Multi-application platform shares common services** for authentication, event bus, data lake, and API gateway

</aside>

<aside>
4️⃣

**Horizontal scaling replaces vertical scaling**, enabling elastic capacity and better resource utilization

</aside>

<aside>
5️⃣

**On-premises requires OpenShift expertise; SaaS eliminates infrastructure management** but reduces control

</aside>

---

## 📚 Resources for Your Journey

### IBM Official
- [MAS 9.0 Documentation](https://www.ibm.com/docs/en/mas-cd/continuous-delivery)
- [MAS System Requirements](https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=suite-system-requirements)
- [MAS Architecture Overview](https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=suite-architecture)
- [IBM MAS Sizing Guide](https://www.ibm.com/docs/en/mas-cd/continuous-delivery?topic=planning-sizing)

### OpenShift & Kubernetes
- [Red Hat OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Concepts for Beginners](https://kubernetes.io/docs/concepts/)
- [OpenShift Operator Framework](https://docs.openshift.com/container-platform/latest/operators/understanding/olm-what-operators-are.html)

### Community
- [IBM Maximo Community](https://community.ibm.com/community/user/asset-facilities)
- [Maximo Secrets Blog](https://maximosecrets.com)
- [Red Hat OpenShift Community](https://www.redhat.com/en/topics/containers/what-is-openshift)

### Training
- [IBM MAS Administration (MAX0150G)](https://www.ibm.com/training/course/maximo-application-suite-administration-MAX0150G)
- [Red Hat OpenShift Administration (DO280)](https://www.redhat.com/en/services/training/do280-red-hat-openshift-administration-ii)
- [Kubernetes Fundamentals (LFS258)](https://training.linuxfoundation.org/training/kubernetes-fundamentals/)

---

## What's Next

Now that you understand both the developer mindset (Blog 1) and the technical architecture (this blog), you're ready to plan your migration:

**Previous:** [Blog 1 — The Developer's MAS Awakening](Blog%201%20%E2%80%94%20The%20New%20Developer%20Mindset%20for%20MAS%20How%20App%20506ab559dae443e994ba5d594e244c82.md)

**Next:** [Blog 3 — The 7.6 → MAS Migration Playbook](Blog%203%20%E2%80%94%20The%207%206%20%E2%86%92%20MAS%20Migration%20Playbook%2070bd94bdde89485385ac00ac6e0623c5.md)

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*