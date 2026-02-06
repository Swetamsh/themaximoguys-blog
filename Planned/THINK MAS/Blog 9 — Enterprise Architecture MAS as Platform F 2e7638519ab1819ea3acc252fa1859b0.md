# Blog 9 — Enterprise Architecture: MAS as Platform Foundation

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS
Visual Status: Needs Visuals
Visual Tool: Excalidraw
Visual Type: Architecture Diagram, Comparison Table, Process Flow

# Enterprise Architecture: Positioning MAS as Your Platform Foundation

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9 | **Part 9 of 12**

<aside>
🎯

**Who this is for:** Enterprise architects, IT directors, and MAS solution architects responsible for positioning Maximo as a strategic platform — not just an application — within their organization's technology landscape.

</aside>

**Read Time:** 22-25 minutes

---

## Introduction: The $2.4M Integration Nightmare

A global manufacturing company completed their "successful" MAS migration:

**Technical Success:**

- ✅ MAS 8.11 deployed on AWS
- ✅ All legacy data migrated
- ✅ 2,500+ users trained
- ✅ Go-live on schedule
- ✅ Executive presentation celebrating "transformation"

**Reality 6 Months Later:**

```
83 Point-to-Point Integrations:
├─ ERP (SAP): 22 custom integrations
├─ HR System: 14 integrations
├─ Procurement: 9 integrations  
├─ IoT Platform: 18 integrations
├─ SCADA Systems: 12 integrations
└─ Legacy Systems: 8 integrations

Each integration:
- Custom code
- Different authentication
- Unique error handling
- Separate monitoring
- Individual documentation
- Independent failure modes
```

**The Crisis:**

*Month 7:* ERP upgrade breaks 22 Maximo integrations simultaneously  

*Month 8:* $400K emergency consulting to fix integrations  

*Month 9:* IoT platform change requires rebuilding 18 integrations  

*Month 10:* HR system decommissioning orphans 14 integrations  

*Month 11:* Executive mandate: "Fix this architecture mess"  

**The Investigation Revealed:**

They migrated Maximo **as an application**, not as a **platform**:

- No API gateway (every system directly connected to Maximo)
- No event bus (tight coupling everywhere)
- No data architecture (data duplicated across 5 systems)
- No security architecture (83 different authentication patterns)
- No governance (every team building integrations differently)

**Cost of Application Thinking:**

- Integration maintenance: $1.2M annually
- Emergency fixes: $400K (and growing)
- Opportunity cost: Couldn't innovate due to technical debt
- Team burnout: 3 senior engineers quit
- Business risk: Production stopped for 4 hours during ERP upgrade

**The Transformation:**

18-month architecture initiative:

```
Before (Application Architecture):
83 point-to-point integrations
$1.2M annual integration costs
22 integrations broken per upstream change
4-6 weeks to add new integration

After (Platform Architecture):
5 platform patterns (API Gateway, Event Bus, Data Lake, Security, Observability)
$280K annual integration costs (77% reduction)
0 integrations broken per upstream change
3-5 days to add new integration

ROI: $920K annual savings + business agility
```

**The Fundamental Lesson:**

MAS isn't just another EAM application. It's your **enterprise asset management platform**—the foundation for:

- Integration hub for 20+ systems
- Data orchestration across operations
- Security boundary for OT/IT convergence
- Innovation platform for AI/IoT/mobile

This blog explores the strategic architecture patterns that transform MAS from application to platform.

<aside>
💡

**Key insight:** The difference between a $1.2M annual integration maintenance burden and a $280K one is not better code — it is platform architecture. Five standardized patterns replaced 83 custom integrations and delivered a 77% cost reduction.

</aside>

---

## Part 1: Platform vs. Application Thinking

### The Mental Model Shift

**Application Thinking (Legacy):**

```
Maximo = Thing That Manages Work Orders

Architecture:
├─ Maximo (standalone)
├─ Database (Maximo owns it)
├─ Integrations (Maximo-specific)
└─ Users (access Maximo)

Decisions:
- How do we integrate TO Maximo?
- How do we get data OUT of Maximo?
- How do we customize Maximo?
- How do we secure Maximo?

Result:
Maximo is center of universe
Everything else orbits around it
```

**Platform Thinking (Modern MAS):**

```
MAS = Core of Enterprise Asset Intelligence Platform

Architecture:
├─ Integration Layer (API Gateway, Event Bus)
├─ Application Layer (MAS + Complementary Apps)
├─ Data Layer (Operational, Analytical, Archive)
├─ Infrastructure Layer (OpenShift, Multi-Cloud)
└─ Cross-Cutting Concerns (Security, Observability, Governance)

Decisions:
- How do systems integrate with EACH OTHER (not just Maximo)?
- How do we orchestrate data ACROSS the enterprise?
- How do we enable innovation ON TOP of the platform?
- How do we secure the ENTIRE ecosystem?

Result:
MAS is foundation
Everything else builds on it
```

### Key Architectural Shifts

**Shift 1: From Maximo-Centric to Data-Centric**

*Application Thinking:*

```
Data Architecture:
├─ Maximo Database (MAXDB)
└─ Integrations sync data to/from Maximo

Problem:
- Maximo becomes data bottleneck
- Every system must integrate directly with Maximo
- Data quality inconsistent
- Single point of failure
```

*Platform Thinking:*

```
Data Architecture:
├─ Operational Data Store (MAS Manage)
├─ Analytical Data Store (Data Lake)
├─ Archive Data Store (Long-term storage)
├─ Master Data Hub (Golden records)
└─ Data Mesh (Domain-oriented)

Benefit:
- Each store optimized for purpose
- Systems integrate via data mesh
- Data quality governed centrally
- Resilient architecture
```

**Shift 2: From Point-to-Point to Platform Patterns**

*Application Thinking:*

```
Integration Pattern:

ERP →→→→→→→→ Maximo
HR System →→→→→→ Maximo  
IoT Platform →→→→ Maximo
SCADA →→→→→→→→→ Maximo

Problem:
N systems × M integration patterns = Chaos
```

*Platform Thinking:*

```
Integration Pattern:

ERP └───┐
HR       │
IoT      ├── API Gateway ── MAS
SCADA    │
WMS  ───┘

Benefit:
Standardized patterns
Centralized governance
Reusable components
```

**Shift 3: From Monolithic to Composable**

*Application Thinking:*

```
Monolithic Architecture:
┌──────────────────────────────┐
│     MAXIMO (Everything)     │
│                              │
│  WO + PM + Inventory +      │
│  Procurement + Assets +     │
│  Reporting + Mobile +       │
│  Integration + Workflow     │
└──────────────────────────────┘

Problem:
- Can't scale parts independently
- Upgrade = everything changes
- Innovation blocked by monolith
```

*Platform Thinking:*

```
Composable Architecture:
┌──────────────────────────────┐
│    MAS Platform Core        │
├──────────────────────────────┤
│ Manage | Health | Monitor  │
│ Predict | VI | Assist     │
├──────────────────────────────┤
│ Your Custom Apps          │
└──────────────────────────────┘

Benefit:
- Scale what you need
- Upgrade incrementally  
- Innovate independently
```

<aside>
🔑

**Key insight:** Platform thinking asks "How do systems integrate with each other?" instead of "How do we integrate to Maximo?" This shift from Maximo-centric to data-centric architecture eliminates the single point of failure and data bottleneck that plagues application-thinking deployments.

</aside>

---

## Part 2: The Four-Layer Architecture Model

### Layer 1: Infrastructure Foundation

**Red Hat OpenShift: The Container Platform**

MAS runs exclusively on Red Hat OpenShift—this isn't optional or swappable. Understanding why is critical:

**What OpenShift Provides:**

```
Kubernetes Core:
├─ Container orchestration
├─ Pod scheduling and scaling
├─ Service discovery
├─ Load balancing
└─ Self-healing containers

+ OpenShift Value-Add:
├─ Enterprise security (RBAC, SCCs)
├─ Developer experience (S2I, templates)
├─ Integrated CI/CD (Pipelines, GitOps)
├─ Multi-tenancy and isolation
├─ Registry and image management
├─ Monitoring and logging (Prometheus, EFK)
├─ Service mesh (Istio integration)
└─ Operator framework

= Complete Application Platform
```

**Why MAS Requires OpenShift:**

1. **Operator-Based Deployment**: MAS uses OpenShift Operators for installation, configuration, and lifecycle management
2. **Cloud Pak for Data**: MAS requires CP4D services (Db2 Warehouse, Watson Studio) which run on OpenShift
3. **Security Context Constraints**: MAS containers require specific security contexts managed by OpenShift
4. **Persistent Storage**: MAS relies on OpenShift's storage provisioning (OCS/ODF)
5. **Service Mesh**: MAS microservices communicate via OpenShift Service Mesh
6. **IBM Support**: IBM only supports MAS on certified OpenShift configurations

**OpenShift Deployment Models:**

**Self-Managed OpenShift:**

```
You Manage:
├─ Infrastructure (VMs, networking, storage)
├─ OpenShift installation and upgrades
├─ Cluster configuration and tuning
├─ Monitoring and troubleshooting
├─ Backup and disaster recovery
└─ Security hardening and compliance

Benefit:
- Full control over infrastructure
- Customization flexibility
- On-premises or air-gapped deployment

Cost:
- High operational overhead
- Requires Kubernetes/OpenShift expertise
- 24/7 on-call responsibility

Best For:
- Air-gapped environments
- Strict regulatory requirements
- Existing OpenShift expertise
- On-premises mandate
```

**Managed OpenShift Services:**

```
Cloud Provider Manages:
├─ Infrastructure provisioning
├─ OpenShift installation
├─ Platform upgrades (with customer approval)
├─ Infrastructure monitoring
├─ SLA-backed availability
└─ Joint support with Red Hat

You Manage:
├─ MAS application deployment
├─ MAS configuration
├─ Application monitoring
└─ User management

Benefit:
- Reduced operational overhead
- SLA-backed platform availability
- Managed upgrades
- Faster time to value

Cost:
- Higher licensing costs
- Less infrastructure control
- Cloud vendor dependency

Best For:
- Cloud-first strategy
- Limited Kubernetes expertise
- Focus on application, not infrastructure
```

### Multi-Cloud Deployment Options

**Option 1: IBM Cloud (ROKS - Red Hat OpenShift on IBM Cloud)**

```
Architecture:

IBM Cloud
  ├─ VPC (Isolated network)
  ├─ ROKS Cluster (Managed OpenShift)
  │   ├─ Master nodes (IBM managed)
  │   └─ Worker nodes (customer managed)
  ├─ IBM Cloud Object Storage (Backup, archive)
  ├─ IBM Cloud Databases (External DB option)
  └─ IBM Cloud Services (IAM, Key Protect)

Key Features:
- Native IBM integration
- IBM support lifecycle alignment
- Cloud Pak entitlements
- Integrated security (Key Protect, IAM)
- Multi-zone deployment

Storage Options:
- IBM Cloud Block Storage (RWO workloads)
- IBM Cloud File Storage (RWX workloads)  
- OpenShift Data Foundation (ODF)
- Portworx Enterprise (3rd party)

Best For:
- Existing IBM relationship
- IBM Cloud Pak strategy
- Simplified support model (single vendor)
- MAS SaaS option available
```

**Option 2: AWS (ROSA - Red Hat OpenShift Service on AWS)**

```
Architecture:

AWS
  ├─ VPC (Isolated network)
  ├─ ROSA Cluster (Managed OpenShift)
  │   ├─ Control plane (Red Hat managed)
  │   └─ Worker nodes (customer managed)
  ├─ S3 (Backup, archive, data lake)
  ├─ RDS (External DB option)
  ├─ EFS (File storage for RWX)
  └─ AWS Services (IAM, KMS, CloudWatch)

Key Features:
- AWS native services integration
- Largest cloud ecosystem
- Global region availability
- Advanced networking (Transit Gateway, PrivateLink)
- Deep observability (CloudWatch, X-Ray)

Storage Options:
- AWS EBS (RWO workloads)
- AWS EFS (RWX workloads)
- OpenShift Data Foundation
- Portworx Enterprise

Best For:
- Existing AWS footprint
- AWS-native services (S3, Lambda, etc.)
- Global multi-region deployment
- Mature AWS expertise
```

**Option 3: Azure (ARO - Azure Red Hat OpenShift)**

```
Architecture:

Azure
  ├─ VNet (Isolated network)
  ├─ ARO Cluster (Managed OpenShift)
  │   ├─ Control plane (Microsoft+Red Hat managed)
  │   └─ Worker nodes (customer managed)
  ├─ Azure Blob Storage (Backup, archive)
  ├─ Azure SQL (External DB option)
  ├─ Azure Files (File storage for RWX)
  └─ Azure Services (Entra ID, Key Vault, Monitor)

Key Features:
- Joint Microsoft + Red Hat support
- Azure native services integration
- Entra ID (Azure AD) SSO
- Azure Monitor integration
- Azure DevOps integration

Storage Options:
- Azure Disk (RWO workloads)
- Azure Files Premium with NFS (RWX workloads)
- OpenShift Data Foundation
- Portworx Enterprise

Best For:
- Existing Microsoft enterprise agreement
- Azure-native services (Entra ID, Synapse)
- Microsoft 365 integration
- Existing Azure expertise
```

**Option 4: On-Premises (Self-Managed)**

```
Architecture:

On-Premises
  ├─ VMware / Bare Metal
  ├─ OpenShift (Self-managed)
  │   ├─ Master nodes (customer managed)
  │   └─ Worker nodes (customer managed)
  ├─ SAN / NAS (Storage)
  ├─ Backup Infrastructure
  └─ On-premises services (LDAP, DNS, etc.)

Key Features:
- Full infrastructure control
- Air-gapped deployment possible
- Regulatory compliance (data residency)
- No cloud costs
- Existing data center utilization

Storage Options:
- NFS (traditional, simple)
- iSCSI / Fibre Channel SAN
- OpenShift Data Foundation (Ceph)
- VMware vSAN (if on VMware)
- NetApp / Pure Storage integrations

Best For:
- Regulatory requirements (data sovereignty)
- Air-gapped environments
- Existing data center investment
- No cloud migration strategy
- Cost-sensitive (long-term, high-scale)
```

### Deployment Decision Framework

**Decision Matrix:**

| Criteria | IBM Cloud | AWS | Azure | On-Prem |
| --- | --- | --- | --- | --- |
| **Operational Overhead** | Low | Low | Low | High |
| **Cost (5-year TCO)** | Medium-High | Medium | Medium | Low-Medium |
| **Time to Deploy** | Fastest | Fast | Fast | Slow |
| **Customization** | Medium | Medium | Medium | High |
| **Vendor Lock-in** | High | Medium | Medium | None |
| **Support Model** | Single vendor | Two vendor | Joint M+RH | Self + IBM |
| **Compliance** | Standard | Standard | Standard | Custom |
| **Air-gapped** | No | No | No | Yes |
| **Multi-Cloud** | Possible | Possible | Possible | Foundation |

**Selection Criteria:**

**Choose IBM Cloud (ROKS) if:**

- You want single-vendor support (IBM for MAS + OpenShift)
- You're considering MAS SaaS in future
- You have other Cloud Paks deployed
- You value IBM ecosystem integration
- Cost is not primary driver

**Choose AWS (ROSA) if:**

- You have significant AWS footprint
- You need global presence (most regions)
- You want richest cloud services ecosystem
- You have AWS expertise in-house
- You're building cloud-native extensions

**Choose Azure (ARO) if:**

- You have Microsoft Enterprise Agreement
- You use Microsoft 365 / Entra ID heavily
- You have Azure expertise in-house
- You want Azure-native services integration
- Joint Microsoft + Red Hat support appeals

**Choose On-Premises if:**

- You have regulatory/compliance requirements
- You need air-gapped deployment
- You have existing infrastructure investment
- You have OpenShift expertise in-house
- Long-term TCO is critical (>5 years, >500 users)

### Layer 2: Application Platform

**MAS Core Architecture:**

```markdown
┌─────────────────────────────────────────┐
│       MAS Suite Administration          │
│  (Licensing, User Mgmt, Workspace)      │
├─────────────────────────────────────────┤
│     MAS Applications (Composable)       │
│                                         │
│  ┌─────────┐  ┌────────┐  ┌────────┐    │
│  │ Manage  │  │ Health │  │Monitor │    │
│  └─────────┘  └────────┘  └────────┘    │
│  ┌─────────┐  ┌────────┐  ┌────────┐    │
│  │ Predict │  │   VI   │  │ Assist │    │
│  └─────────┘  └────────┘  └────────┘    │
├─────────────────────────────────────────┤
│      Cloud Pak for Data Services        │
│  (Db2 Warehouse, Watson Studio, etc.)   │
├─────────────────────────────────────────┤
│         OpenShift Platform              │
│  (Kubernetes + Enterprise Features)     │
└─────────────────────────────────────────┘
```

**Key Architectural Patterns:**

**Pattern 1: Microservices Architecture**

MAS applications are decomposed into microservices:

```
Manage Application:
├─ UI Service (React frontend)
├─ API Service (REST/GraphQL)
├─ Business Logic Services
│   ├─ Work Order Service
│   ├─ Asset Service
│   ├─ Inventory Service
│   └─ PM Service
├─ Integration Services
│   ├─ Object Structure Processor
│   ├─ Message Listener
│   └─ Enterprise Service Bus
└─ Data Services
    ├─ Database Connection Pool
    └─ Caching Layer

Benefits:
- Independent scaling per service
- Technology flexibility
- Fault isolation
- Parallel development
- Gradual upgrades
```

**Pattern 2: Operator-Based Lifecycle**

MAS uses Kubernetes Operators for automation:

```
MAS Operator:
├─ Installation automation
├─ Configuration management
├─ Upgrade orchestration
├─ Backup/restore
├─ Health monitoring
└─ Self-healing

Benefits:
- Consistent deployments
- Automated operations
- Reduced human error
- GitOps compatibility
- Infrastructure as code
```

### Layer 3: Integration Platform

**Strategic Integration Architecture:**

```markdown
┌─────────────────────────────────────────┐
│          External Systems               │
│  ERP | HR | IoT | SCADA | Procurement   │
└─────────────────────────────────────────┘
            │  │  │  │  │
┌───────────↓──↓──↓──↓──↓───────────┐
│         API Gateway               │
│  • Authentication (OAuth, SAML)   │
│  • Rate limiting                  │
│  • Request routing                │
│  • Protocol translation           │
└───────────────────────────────────┘
            │             │
    ┌───────↓───────┐     │
    │  Event Bus    │     │
    │  (Kafka/NATS)   │   │
    │  • Async messaging│ │
    │  • Event streams │  │
    └────────────────┘    │
            │             │
┌───────────↓──────────---↓─-────-------──┐
│              MAS Platform               │
│  Manage | Health | Monitor | Predict    │
└─────────────────────────────────────────┘
```

**Integration Pattern Catalog:**

**Pattern 1: Synchronous Request/Response (API Gateway)**

*Use Cases:*

- ERP purchase order creation
- HR employee lookup
- Real-time asset status query
- Invoice validation

*Technology:*

- REST APIs
- GraphQL
- API Gateway (Kong, Apigee, AWS API Gateway)

*Implementation:*

```
ERP Request:
POST /api/v1/workorder
Authorization: Bearer {token}
{
  "description": "Pump failure",
  "asset": "PUMP-001",
  "priority": 1
}

MAS Response:
{
  "wonum": "WO-12345",
  "status": "WAPPR",
  "created": "2026-01-13T10:30:00Z"
}
```

**Pattern 2: Asynchronous Event-Driven (Event Bus)**

*Use Cases:*

- IoT sensor data streaming
- Work order status changes
- Asset condition updates
- Real-time notifications

*Technology:*

- Apache Kafka
- NATS
- IBM MQ
- Azure Event Hub

*Implementation:*

```
Event Topic: maximo.workorder.status.changed

Event Payload:
{
  "eventType": "STATUS_CHANGED",
  "wonum": "WO-12345",
  "oldStatus": "INPRG",
  "newStatus": "COMP",
  "timestamp": "2026-01-13T15:45:00Z",
  "user": "TECHNICIAN01"
}

Consumers:
- Notification service → Send email
- Analytics service → Update KPIs
- External system → Sync status
```

**Pattern 3: ETL/Batch Integration**

*Use Cases:*

- Nightly data synchronization
- Historical data migration
- Large data imports
- Archive and purge

*Technology:*

- IBM App Connect
- Informatica
- Talend
- Custom scripts

*Implementation:*

```
Schedule: Daily at 2:00 AM

Process:
1. Extract HR data (employees, skills, locations)
2. Transform to Maximo PERSON/LABOR format
3. Load via Maximo Integration Framework
4. Validate and log errors
5. Send completion notification

Volume: 50,000 records
Duration: 15 minutes
```

### Layer 4: Data Architecture

**Three-Tier Data Strategy:**

**Tier 1: Operational Data Store (MAS Manage Database)**

```
Purpose: Transactional data for daily operations

Characteristics:
• Hot data (active work orders, current assets)
• High write volume
• Low latency requirements
• ACID compliance
• Retention: 12-24 months

Technology:
• Db2 (traditional)
• PostgreSQL (modern option)
• Oracle (legacy migrations)

Optimization:
• Indexed for transactional queries
• Normalized schema
• Minimal historical data
```

**Tier 2: Analytical Data Store (Data Lake/Warehouse)**

```
Purpose: Historical analysis and reporting

Characteristics:
• Warm/cold data (historical work orders, trends)
• Read-heavy workload
• Complex analytical queries
• Denormalized for performance
• Retention: 5-10 years

Technology:
• AWS S3 + Athena
• Azure Data Lake + Synapse
• IBM Cloud Object Storage + Db2 Warehouse
• Snowflake

Optimization:
• Columnar storage (Parquet)
• Partitioned by date
• Aggregated fact tables
```

**Tier 3: Archive Store (Long-Term Retention)**

```
Purpose: Compliance and regulatory retention

Characteristics:
• Cold data (completed work, closed assets)
• Rarely accessed
• Cost-optimized storage
• Retention: 10+ years (per regulations)

Technology:
• AWS Glacier
• Azure Archive Storage
• IBM Cloud Archive
• Tape (on-premises)

Optimization:
• Compressed
• Encrypted
• Indexed for retrieval
```

**Data Flow Architecture:**

```
[Operational] ───── Nightly ETL ──────→ [Analytical]
                                           │
                                           │
                                    Quarterly Archive
                                           │
                                           ↓
                                      [Archive Store]

Data Aging Policy:
• Day 0-365: Operational database (fast access)
• Day 366-1825: Analytical store (historical analysis)
• Day 1826+: Archive store (compliance retention)
```

<aside>
💡

**Key insight:** MAS requires OpenShift — this is non-negotiable. But the deployment model (self-managed vs. ROKS vs. ROSA vs. ARO) is a strategic choice driven by existing footprint, expertise, regulatory needs, and long-term TCO. Choose managed services for 60-70% reduced operational overhead unless air-gapped or regulatory constraints dictate otherwise.

</aside>

---

## Part 3: Security Architecture

### Zero Trust Security Model

**Traditional Perimeter Security (Legacy):**

```
Firewall Boundary:
┌──────────────────────────────┐
│  TRUSTED (Inside Network)    │
│                              │
│  [Maximo] [Database] [Users] │
│                              │
│  Full trust once authenticated│
└──────────────────────────────┘
     ↓
[UNTRUSTED (External)]

Problem:
• Assumes internal traffic is safe
• Lateral movement after breach
• No verification per-request
• Flat network architecture
```

**Modern Zero Trust Architecture:**

```
Every Request Verified:

[User] ──→ [Identity Provider] ──→ [Policy Engine]
                                        │
                                  Verify:
                                  • Identity
                                  • Device
                                  • Location
                                  • Behavior
                                        │
                                        ↓
                                   [MAS API]

Principles:
• Never trust, always verify
• Least privilege access
• Assume breach
• Micro-segmentation
• Continuous verification
```

**Security Zones:**

```
┌─────────────────────────────────────────┐
│  Zone 1: Public (DMZ)                      │
│  • API Gateway                            │
│  • Load Balancer                          │
│  • WAF (Web Application Firewall)        │
└─────────────────────────────────────────┘
            │
┌───────────↓────────────────────────────┐
│  Zone 2: Application (Private)             │
│  • MAS Manage pods                        │
│  • MAS Health pods                        │
│  • Integration services                   │
└─────────────────────────────────────────┘
            │
┌───────────↓────────────────────────────┐
│  Zone 3: Data (Highly Restricted)          │
│  • Database (Db2/PostgreSQL)              │
│  • Object storage (backups)               │
│  • Encryption key management              │
└─────────────────────────────────────────┘

Network Policies:
• Zone 1 → Zone 2: Authenticated only
• Zone 2 → Zone 3: Service accounts only
• No Zone 1 → Zone 3 direct access
• All traffic encrypted (TLS 1.3)
```

### Identity and Access Management

**Centralized Identity Architecture:**

```
[Corporate Directory] ─────────────┐
(Active Directory / Entra ID)      │
                                   │
                                   ↓
            [Identity Provider (IdP)]        
            (Okta / Ping / KeyCloak)         
                     │                       
         ┌────────↓──────-──┐            
         │    SAML / OIDC   │            
         └──────────────────┘            
                     │                       
                     ↓                       
              [MAS IAM]                    
         (Built-in Identity)              
                     │                       
         ┌─────────↓─────────-┐           
         │   MAS Applications │           
         └────────────────────┘           

Benefits:
• Single sign-on (SSO)
• Centralized user management
• MFA enforcement
• Consistent password policies
• Audit trail
```

---

## Part 4: High Availability and Disaster Recovery

### HA Architecture Patterns

**Multi-Zone Deployment:**

```
Region: US-East

┌─────────────────────────────────────────┐
│  Zone A (Active)                        │
│  ├─ 3x Master nodes                     │
│  ├─ 6x Worker nodes (MAS pods)          │
│  └─ Database primary                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Zone B (Active)                        │
│  ├─ 3x Master nodes                     │
│  ├─ 6x Worker nodes (MAS pods)          │
│  └─ Database standby (sync replica)     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Zone C (Active)                        │
│  ├─ 3x Master nodes                     │
│  ├─ 6x Worker nodes (MAS pods)          │
│  └─ Database standby (sync replica)     │
└─────────────────────────────────────────┘

Availability:
• Survives single zone failure
• Load distributed across zones
• Automatic failover (<5 minutes)
• No data loss (synchronous replication)

Uptime: 99.95% (4 hours downtime/year)
```

### Disaster Recovery Strategy

**DR Tiers:**

| Tier | RTO | RPO | Cost | Use Case |
| --- | --- | --- | --- | --- |
| **Tier 0** | <1 hour | 0 | Very High | Critical production |
| **Tier 1** | <4 hours | <15 min | High | Production |
| **Tier 2** | <24 hours | <1 hour | Medium | Important non-prod |
| **Tier 3** | <72 hours | <24 hours | Low | Development/Test |

**Tier 0 Architecture (Active-Active):**

```
Primary Region (US-East)          Secondary Region (US-West)
┌─────────────────────┐         ┌─────────────────────┐
│  Active MAS Cluster   │ <───> │  Active MAS Cluster │
│  70% traffic          │       │  30% traffic        │
└─────────────────────┘         └─────────────────────┘
        │                             │
┌───────↓─────────────┐         ┌─────↓───────────────┐
│  Database Primary   │   <───> │  Database Standby   │
│  (Sync replication) │         │  (Sync replication) │
└─────────────────────┘         └─────────────────────┘

Global Traffic Manager:
• Health checks every 30 seconds
• Automatic failover on region failure
• Latency-based routing

RTO: <15 minutes (automatic)
RPO: 0 (no data loss)
Cost: 2x infrastructure cost
```

---

## Part 5: Governance and Operating Model

### Architecture Review Board (ARB)

**Purpose:** Ensure architectural decisions align with enterprise strategy

**Charter:**

```
Responsibilities:
├─ Review architecture proposals
├─ Approve technology selections
├─ Maintain architecture standards
├─ Resolve architecture conflicts
└─ Guide strategic direction

Membership:
├─ Enterprise Architect (Chair)
├─ MAS Solution Architect
├─ Integration Architect
├─ Security Architect
├─ Infrastructure Architect
└─ Business Representatives

Meeting Cadence:
├─ Regular: Monthly
├─ Ad-hoc: As needed for urgent decisions
└─ Annual: Strategic planning
```

**Decision Framework:**

```
Proposal Submitted
    ↓
[Initial Review]
    │
    ├── Low Impact → Architect Approval (1-3 days)
    ├── Medium Impact → ARB Review (1-2 weeks)
    └── High Impact → ARB + Executive (2-4 weeks)
    ↓
[ARB Decision]
    │
    ├── Approved → Implementation
    ├── Conditional → Revise and Resubmit
    └── Rejected → Document rationale
    ↓
[Implementation]
    ↓
[Post-Implementation Review]
```

### Technology Standards

**Approved Technology Stack:**

```
Integration:
• REST APIs (preferred)
• Kafka (event-driven)
• IBM App Connect (ETL)

Databases:
• Db2 Warehouse (MAS standard)
• PostgreSQL (modern apps)
• MongoDB (document store)

Security:
• Okta (Identity Provider)
• HashiCorp Vault (secrets)
• OAuth 2.0 / OIDC (protocols)

Monitoring:
• Prometheus + Grafana
• ELK Stack (logging)
• Splunk (enterprise observability)

CI/CD:
• GitLab (source control + CI/CD)
• ArgoCD (GitOps)
• Terraform (infrastructure as code)
```

**Technology Selection Criteria:**

| Criteria | Weight | Scoring |
| --- | --- | --- |
| **Strategic Fit** | 30% | Alignment with enterprise strategy |
| **Technical Capability** | 25% | Features, performance, scalability |
| **Total Cost of Ownership** | 20% | Licensing, support, operational costs |
| **Vendor Viability** | 10% | Vendor financial health, market position |
| **Skills Availability** | 10% | Internal expertise, hiring difficulty |
| **Ecosystem Integration** | 5% | Integration with existing tools |

---

## Key Takeaways

1. **Platform thinking transforms MAS from application to foundation** — Moving from 83 point-to-point integrations to 5 platform patterns reduced annual integration costs by 77% ($920K savings) and eliminated cascade failures during upstream changes.
2. **OpenShift is non-negotiable but deployment model is strategic choice** — MAS requires OpenShift for operators, CP4D, and security contexts; choose managed services (ROSA, ARO, ROKS) for 60-70% reduced operational overhead vs. self-managed.
3. **Four-layer architecture provides strategic separation of concerns** — Infrastructure (OpenShift/cloud), Application (MAS apps), Integration (API gateway/event bus), and Data (operational/analytical/archive) enable independent scaling and evolution.
4. **Multi-cloud deployment decisions depend on existing footprint** — IBM Cloud for IBM ecosystem integration; AWS for richest services and global reach; Azure for Microsoft shop integration; on-premises for regulatory requirements or >5-year cost optimization.
5. **Integration architecture prevents the $2.4M point-to-point nightmare** — API Gateway + Event Bus pattern centralizes authentication, rate limiting, protocol translation, and monitoring instead of 83 custom integration implementations.
6. **Three-tier data strategy optimizes cost vs. performance** — Hot operational data (12-24 months, fast database), warm analytical data (5-10 years, data lake), cold archive (10+ years, low-cost storage) reduces infrastructure costs 60-75%.
7. **Zero trust security replaces perimeter-based thinking** — Every request verified regardless of source; network segmentation with micro-segmentation; assume breach and implement least-privilege access across all three security zones.
8. **High availability requires multi-zone active-active deployment** — Three availability zones with synchronous database replication achieves 99.95% uptime (4 hours downtime/year) and <5 minute automatic failover.
9. **DR tier selection balances business impact against infrastructure cost** — Tier 0 (RTO <1hr, RPO=0) costs 2x infrastructure but prevents business-stopping outages; Tier 3 (RTO 72hr) acceptable for non-critical systems at 20% infrastructure cost.
10. **Architecture governance prevents technology sprawl** — Architecture Review Board with defined decision framework, approved technology stack, and selection criteria ensures consistent architectural decisions across 50+ integration points.
11. **Managed OpenShift services (ROSA/ARO/ROKS) recommended over self-managed** — Platform upgrades, infrastructure monitoring, and SLA-backed availability managed by cloud provider; customer focuses on MAS application layer, not Kubernetes operations.
12. **Composable MAS applications enable incremental scaling and innovation** — Manage, Health, Monitor, Predict, Visual Inspection, Assist deploy independently; scale what you need; upgrade incrementally; innovate without monolithic constraints.

---

## Conclusion: MAS as Strategic Platform Foundation

The difference between a successful MAS transformation and a $2.4M integration nightmare comes down to one fundamental decision: Do you treat MAS as just another application, or as your enterprise asset management **platform**?

**Application Thinking:**

- Migrate Maximo → MAS
- Recreate 83 integrations point-to-point
- Hope nothing breaks
- Fight fires for 18 months
- Spend $1.2M/year on integration maintenance
- Block innovation due to technical debt

**Platform Thinking:**

- Design platform architecture (4 layers)
- Implement integration patterns (API Gateway + Event Bus)
- Build on OpenShift foundation
- Enable composable innovation
- Reduce costs 77% through standardization
- Accelerate time-to-market for new capabilities

MAS running on OpenShift provides the technical foundation. Your architectural decisions determine whether that foundation supports a rigid application or an adaptable platform.

The organizations winning with MAS aren't just running better asset management software—they're building **platforms for operational excellence** that adapt as business needs evolve.

In Part 10 of this series, we'll explore practical AI use cases for Maximo, showing how platform thinking enables rapid innovation with watsonx, Visual Inspection, and Predict.

---

**Previous:** [Part 8 - MAS SaaS Troubleshooting](link)  

**Next:** [Part 10 - AI for Maximo](link)  

**Series Index:** [Modern Maximo: Complete Guide](link)

---

**Related Resources:**

- [IBM MAS on Azure Reference Architecture](https://learn.microsoft.com/azure/architecture/example-scenario/apps/deploy-ibm-maximo-application-suite)
- [IBM MAS on AWS with ROSA Guide](https://www.redhat.com/en/blog/migrate-and-modernize-ibm-maximo-with-aws-and-red-hat)
- [Red Hat OpenShift Documentation](https://docs.openshift.com)
- [Enterprise Architecture Framework Template](download-link)
- [Integration Patterns Catalog](download-link)

**Download Resources:**

- Cloud Deployment Decision Matrix
- Integration Architecture Patterns
- Security Architecture Template
- HA/DR Planning Worksheet
- ARB Charter and Process Template

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*