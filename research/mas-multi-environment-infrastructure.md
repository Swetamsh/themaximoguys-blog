# IBM MAS Multi-Environment Infrastructure Research

## Research Date: 2026-02-20
## Purpose: Deep technical content for blog series enhancement
## Sources: IBM documentation, MAS CLI/GitOps repos, Azure Architecture Center, Red Hat, TRM Group, Interloc Solutions

---

# 1. Multi-Environment Patterns for MAS

## 1.1 Single Cluster with Multiple MAS Instances

IBM explicitly supports running **multiple MAS instances on a single OpenShift cluster**. This is the foundational multi-environment pattern.

**How it works:**
- Each MAS instance is identified by a unique `mas_instance_id` (lowercase alphanumeric, 3-12 characters, starting with a letter)
- Examples: `dev01`, `test`, `uat01`, `prod`
- Each instance gets its own set of namespaces: `mas-{instanceId}-core`, `mas-{instanceId}-manage`, `mas-{instanceId}-pipelines`, etc.
- The instance ID is **immutable** after installation -- cannot be changed without complete reinstallation
- Instance IDs must be unique across all MAS deployments on a single cluster

**Critical constraint:** There must be **no more than 1 minor version difference** between the oldest and newest MAS versions installed on the same cluster.

**Shared infrastructure on a single cluster:**
- **MongoDB**: A single `mas-mongo-ce` cluster is created using the MongoDbCommunity CRD. Each MAS instance gets its own database within this shared cluster.
- **Licensing (SLS)**: Standard deployment uses one `LicenseService` instance shared across all MAS instances, pooling AppPoints from a single license file. Alternative: dedicated SLS per instance.
- **Reporting (DRO)**: Single DRO instance collects data from all cluster-wide MAS installations.
- **IBM Operator Catalog**: Deployed to `openshift-marketplace` namespace, shared across all instances.
- **Certificate Manager**: Cluster-wide, shared across all instances.
- **Common Services**: IBM Common Service Operator, IAM Operator, Namespace Scope Operator -- all shared.

**Per-instance infrastructure:**
- **Db2**: Separate Db2uCluster per instance via IBM Db2 Universal Operator
  - System database: `mas-{instanceId}-system`
  - Manage database: `mas-{instanceId}-{workspaceId}-manage`
  - A single instance may use up to two Db2uCluster resources
- **Kafka**: Separate Strimzi or AMQ Streams cluster per instance, named `mas-{instanceId}-system`
- **Cloud Pak for Data**: Per-instance or shared, depending on configuration

## 1.2 Multi-Cluster Approach

For production isolation, organizations often separate clusters by environment tier. This is managed through:

- **Red Hat Advanced Cluster Management (RHACM)**: Hub-spoke architecture where a hub cluster manages satellite managed clusters
- **MAS GitOps**: ArgoCD on a management cluster orchestrates deployments to multiple target clusters
- **MAS Ansible DevOps Collection**: Automates deployment across clusters via parameterized playbooks

## 1.3 IBM's Recommendations for Environment Separation

IBM recommends **at minimum three environments** for organizations doing significant development work, customizations, and scenarios:
1. **Development** environment
2. **Test** environment
3. **Live (Production)** environment

For **non-production environments**, IBM recommends **Single Node OpenShift (SNO)** to reduce hosting costs:
- 16 vCPU, 64 GB RAM minimum
- Supports up to 70 concurrent users
- Suitable for dev, test, demos, PoCs, edge/remote sites
- **Not suitable for production** due to single point of failure (no HA)

For **production environments**, IBM enforces:
- Minimum 3 master nodes + 2 worker nodes (HA configuration)
- Distributed across availability zones
- 10 Gbps network links recommended for storage nodes

---

# 2. Environment Topology Options

## 2.1 Pattern 1: Single Cluster, Multiple Instances

**Architecture:**
```
Single OpenShift Cluster
├── Shared Infrastructure
│   ├── MongoDB (mas-mongo-ce) -- shared cluster, per-instance DBs
│   ├── IBM Operator Catalog (openshift-marketplace)
│   ├── Certificate Manager
│   ├── License Service (SLS)
│   └── Data Reporter Operator (DRO)
├── MAS Instance: dev01
│   ├── mas-dev01-core (namespace)
│   ├── mas-dev01-manage (namespace)
│   ├── mas-dev01-pipelines (namespace)
│   ├── Db2: mas-dev01-system
│   ├── Db2: mas-dev01-ws1-manage
│   └── Kafka: mas-dev01-system
├── MAS Instance: test
│   ├── mas-test-core (namespace)
│   ├── mas-test-manage (namespace)
│   ├── mas-test-pipelines (namespace)
│   ├── Db2: mas-test-system
│   ├── Db2: mas-test-ws1-manage
│   └── Kafka: mas-test-system
└── MAS Instance: prod
    ├── mas-prod-core (namespace)
    ├── mas-prod-manage (namespace)
    ├── mas-prod-pipelines (namespace)
    ├── Db2: mas-prod-system
    ├── Db2: mas-prod-ws1-manage
    └── Kafka: mas-prod-system
```

**Pros:**
- Lower infrastructure cost (shared control plane, shared MongoDB, shared operators)
- Simpler operations (single cluster to manage)
- Shared licensing pool
- Faster environment provisioning

**Cons:**
- Noisy neighbor risk: non-prod workloads can impact production performance
- Single point of failure at the cluster level
- Version coupling: all instances must be within 1 minor version
- Blast radius: cluster-wide issues affect all environments
- Security: less isolation between environments
- Upgrade risk: operator upgrades affect all instances simultaneously
- Resource contention between environments

**Best for:** Small organizations, PoCs, early-stage MAS adoption, cost-constrained deployments

## 2.2 Pattern 2: Two-Cluster (Non-Prod / Prod)

**Architecture:**
```
Non-Production Cluster                Production Cluster
├── Shared Infrastructure             ├── Shared Infrastructure
│   ├── MongoDB                       │   ├── MongoDB
│   ├── Operators                     │   ├── Operators
│   └── SLS                          │   └── SLS
├── MAS Instance: dev01              └── MAS Instance: prod
│   └── (all dev namespaces)             └── (all prod namespaces)
├── MAS Instance: test
│   └── (all test namespaces)
└── MAS Instance: uat
    └── (all uat namespaces)
```

**Pros:**
- Production isolation from non-prod workloads
- Independent upgrade paths (can test upgrades on non-prod first)
- Separate blast radius for prod vs non-prod
- Cost-efficient (non-prod can use smaller nodes, SNO, or reduced HA)
- Can right-size non-prod cluster independently

**Cons:**
- Two clusters to manage
- Configuration drift risk between clusters
- Need automation to keep environments consistent
- Separate operator catalogs need synchronization

**Best for:** Mid-size organizations, regulatory environments requiring production isolation, most enterprise deployments

## 2.3 Pattern 3: Multi-Cluster (Per-Tier)

**Architecture:**
```
Dev Cluster (SNO)     Test Cluster        UAT Cluster         Production Cluster
├── MAS: dev          ├── MAS: test       ├── MAS: uat        ├── MAS: prod
│   16 vCPU           │   3 workers       │   3 workers       │   6+ workers
│   64 GB RAM         │   8 vCPU each     │   16 vCPU each    │   16 vCPU each
│   No HA             │   Partial HA      │   Full HA         │   Full HA + DR
└── SNO mode          └── 3 masters       └── 3 masters       └── 3 masters
```

**Pros:**
- Maximum isolation between environments
- Independent scaling per environment tier
- Independent upgrade and maintenance windows
- Granular security and access control per cluster
- No version coupling between environments
- Can use different cloud providers or regions per tier

**Cons:**
- Highest infrastructure cost
- Most complex operations (multiple clusters to manage)
- Requires strong automation (GitOps/Ansible) to maintain consistency
- More complex networking between environments
- Separate licensing per cluster (unless using shared SLS)

**Best for:** Large enterprises, heavily regulated industries, organizations with strict change management requirements

## 2.4 Pattern 4: Hub-Spoke (Central Management)

**Architecture:**
```
Management Hub Cluster (RHACM + ArgoCD)
├── Red Hat Advanced Cluster Management
├── ArgoCD (GitOps controller)
├── Config Repository (source of truth)
├── Secrets Vault
└── Manages:
    ├── Spoke: Dev Cluster
    │   └── MAS: dev01
    ├── Spoke: Test Cluster
    │   └── MAS: test
    ├── Spoke: UAT Cluster
    │   └── MAS: uat
    └── Spoke: Production Cluster
        └── MAS: prod
```

**This is IBM's recommended GitOps approach** via the `ibm-mas/gitops` repository.

**How it works:**
1. **Account Root Application** registered with ArgoCD on the management cluster
2. **Cluster Root ApplicationSet** monitors the Config Repository and generates Cluster Root Applications per target cluster
3. **Instance Root ApplicationSet** generates Instance Root Applications per MAS instance
4. Hierarchy: Account Root -> Cluster Root -> Instance Root
5. Config Repository is the single source of truth
6. Git generators poll Config Repository every 3 minutes for changes
7. Self-healing (`selfHeal: true`) reverts manual cluster changes
8. Auto-pruning (`prune: true`) removes resources when config files are deleted

**Config Repository structure:**
```
account-id/
└── cluster-id/
    ├── ibm-mas-cluster-base.yaml    (cluster-level config)
    ├── ibm-operator-catalog.yaml     (operator versions)
    └── instance-id/
        ├── ibm-mas-instance-base.yaml  (instance config)
        └── ibm-mas-suite.yaml          (suite settings)
```

**Pros:**
- Centralized management and visibility across all environments
- GitOps-driven consistency (Config Repository = source of truth)
- Automated deployment orchestration with sync waves and health checks
- Policy enforcement across all clusters via RHACM
- Scalable to many clusters and environments
- Full audit trail through Git commits

**Cons:**
- Additional management cluster cost
- RHACM licensing cost
- Most complex initial setup
- Requires GitOps expertise
- Management cluster is a critical dependency

**Best for:** Enterprise-scale deployments, multi-region/multi-cloud, organizations with mature DevOps practices

---

# 3. Resource Planning Per Environment

## 3.1 Compute Node Sizing Reference

IBM's general sizing principle: **4 GB memory per CPU** for most MAS workloads.

**Node Size Options (per worker node):**

| Size | vCPU | Memory | Storage |
|------|------|--------|---------|
| Small | 4 | 16 GB | 100 GB |
| Medium | 8 | 32 GB | 200 GB |
| Large | 16 | 64 GB | 400 GB |
| Extra Large | 32 | 128 GB | 800 GB |

**IBM Recommendations:**
- **Worker nodes**: 16 vCPU / 64 GB is the recommended starting type (1:4 CPU-to-memory ratio)
- **Master nodes**: 8 vCPU / 32 GB recommended to avoid bottlenecks
- **Database nodes**: Higher memory-to-CPU ratio (1:8) recommended
- **Minimum 8 CPUs per worker node** (MAS calculator minimum)
- **Minimum 300 GB storage per worker node** for MAS app build process
- **Each worker node reserves ~1 core** for internal OpenShift services
- Avoid 8-core instances (insufficient capacity); avoid 32-core instances (too much blast radius per node failure)
- Keep CPU/memory overcommit below 300% to prevent node pressure
- **15-25 GB disk storage per CPU core** to prevent pod evictions

## 3.2 Application-Specific Resource Requirements

**MAS Core:** 13 vCPUs for standard-sized base installation

**MAS Manage (per UI server bundle pod):** 50-75 user load per pod, equivalent to a JVM with 2 cores

**Example sizing from IBM calculator:**

| Configuration | vCPUs | Memory (GiB) | Storage (GiB) |
|--------------|-------|--------------|----------------|
| MAS Core only | ~13 | ~52 | ~200 |
| MAS Manage (100 concurrent users) | 46.5 | 190 | 840 |
| MAS Manage + Monitor (100+5 users) | 179.5 | 550 | 2,805 |

**Additional component requirements:**
- Kafka (for Monitor): +9 vCPUs, +32 GB memory
- Db2 Warehouse: +12 vCPUs, +100 GB memory
- ODF Storage: 3 nodes minimum, 16 vCPU / 64 GB memory each
- OCS: 3 nodes minimum, 14 cores / 32 GB total
- CP4D/DB2W instance pod: minimum 6.1 cores and 18 GB RAM per pod
- nl2oslc AI models: 20 workers, 8 GiB memory

**GPU requirements (Visual Inspection / Predict):**
- NVIDIA GPUs required (CUDA-based)
- Recommended VM types (Azure): NCv3, NCasT4_v3
- YOLOv3 training requires Ampere-based GPUs (NVadsA10 v5, NC A100 v4)
- Start with smallest GPU node and scale up

## 3.3 Recommended Environment Sizing

**IBM's guidance: Add 30-50% over calculator minimum for on-prem installations.**

### Development Environment (SNO - Single Node OpenShift)
- **Nodes:** 1 (combined control + worker)
- **vCPU:** 16 minimum
- **Memory:** 64 GB minimum
- **Storage:** 2 SSDs (OS + LVM Operator)
- **Users:** Up to 70 concurrent
- **HA:** None (single point of failure)
- **Applications:** MAS Core + Manage (limited modules)
- **Cost ratio vs prod:** ~15-25%

### Test Environment (Minimal Multi-Node)
- **Master Nodes:** 3 x (4 vCPU / 16 GB)
- **Worker Nodes:** 3 x (16 vCPU / 64 GB)
- **Storage:** 300 GB per worker, ODF or NFS
- **Users:** 25-50 concurrent (subset of prod load)
- **HA:** Basic (3 masters, 3 workers across zones)
- **Applications:** Match production application set
- **Cost ratio vs prod:** ~40-50%

### UAT Environment (Production-Like)
- **Master Nodes:** 3 x (8 vCPU / 32 GB)
- **Worker Nodes:** 4-5 x (16 vCPU / 64 GB)
- **Storage:** 300+ GB per worker, same storage class as prod
- **Users:** Mirror expected production load for validation
- **HA:** Full (distributed across availability zones)
- **Applications:** Identical to production
- **Cost ratio vs prod:** ~60-75%

### Production Environment (Full HA)
- **Master Nodes:** 3 x (8 vCPU / 32 GB) -- distributed across AZs
- **Worker Nodes:** 6+ x (16 vCPU / 64 GB) -- distributed across AZs
- **Storage:** 300+ GB per worker, ZRS or equivalent
- **Network:** 10 Gbps for storage nodes
- **Users:** Full production load
- **HA:** Full HA with AZ distribution
- **DR:** Consider multi-region with RHACM
- **Applications:** Full MAS suite
- **Db2 Nodes:** 3 dedicated (or external Azure SQL MI/RDS)

**Azure Reference Architecture (Microsoft-tested):**
- 3 control VMs: Standard_D8s_v4 (8 vCPU / 32 GB each)
- 6 worker VMs: Standard_D8s_v4 (8 vCPU / 32 GB each)
- 3 Db2 worker VMs (or Azure SQL Managed Instance substitute)
- 2 Azure Storage accounts
- 2 DNS zones
- 2 Load balancers
- Optional: Azure Bastion, Visual Inspection GPU VM

## 3.4 Shared vs. Dedicated Infrastructure Components

| Component | Single-Cluster Shared | Multi-Cluster Dedicated | Notes |
|-----------|----------------------|------------------------|-------|
| MongoDB | Shared cluster, per-instance DBs | Dedicated per cluster | Shared reduces overhead; backup critical |
| Kafka | Per-instance always | Per-instance always | Named mas-{instanceId}-system |
| Db2 | Per-instance always | Per-instance always | Named mas-{instanceId}-system/manage |
| SLS (Licensing) | Shared across instances | Per-cluster | AppPoints pooled in shared mode |
| DRO (Reporting) | Shared across instances | Per-cluster | Single DRO collects all data |
| Cert Manager | Shared across cluster | Per-cluster | Cluster-wide service |
| Operator Catalog | Shared across cluster | Per-cluster | openshift-marketplace namespace |
| ODF/OCS Storage | Shared across cluster | Per-cluster | 3 dedicated storage nodes minimum |

## 3.5 Storage Requirements

**Worker node minimum:** 300 GB per node
**Storage rule:** 15-25 GB disk per CPU core

**Storage class options:**
- **OpenShift Data Foundation (ODF):** 3 nodes, 16 vCPU / 64 GB each, SSD/NVMe, 10 Gbps
- **Enterprise NFS:** External NFS appliance
- **Azure Files:** Standard (SMB, RWO) + Premium (NFS, RWX) -- avoids ODF cost
- **Azure NetApp Files:** High-performance alternative

**Azure-specific storage guidance:**
- Use ZRS (zone-redundant storage) for HA
- Standard Azure Files for low-throughput RWO workloads (e.g., IBM SLS)
- Premium Azure Files with NFS for high-throughput RWX workloads (e.g., Db2 Warehouse, Postgres)
- Do NOT use Azure Blob Storage with CSI drivers (no hard link support)
- Disable secure transfer on Premium NFS accounts
- Use private endpoints for storage connectivity

---

# 4. Environment Promotion Workflows

## 4.1 Configuration Promotion via Migration Manager

IBM Maximo includes **Migration Manager**, a built-in tool for promoting configuration content between environments.

**What it migrates:**
- Workflow definitions
- Actions, roles, communication templates
- Custom code (Maximo EAR)
- Configuration data packages
- Spatial configuration data
- Inspection forms

**Typical promotion flow:**
```
Development → Test → UAT → Production
```

**Process:**
1. Configuration content is packaged in the source environment (e.g., dev)
2. Package is exported as a file
3. File is checked into source control
4. File is imported into the target environment (e.g., test)
5. Validation and testing in target environment
6. Repeat for next tier

**Best practices:**
- Migrate during maintenance windows
- Ensure error handling and rollback procedures
- Keep source control as the master record
- A single package can contain workflow + actions + roles + communication templates + custom code

## 4.2 GitOps Configuration Promotion (MAS GitOps)

The `ibm-mas/gitops` repository provides a modern, Git-driven approach to configuration promotion.

**Architecture:**
```
Config Repository (Git) ──→ ArgoCD (Management Cluster) ──→ Target Clusters
                                │
                                ├── Sync every 3 minutes
                                ├── Self-healing (selfHeal: true)
                                ├── Auto-pruning (prune: true)
                                └── Sync Waves (ordered deployment)
```

**Deployment orchestration mechanisms:**
1. **Sync Waves**: Resources process sequentially, filenames prefixed by wave number
2. **Custom Resource Health Checks**: ArgoCD blocks dependent resources until prerequisites complete
3. **PreSync Hooks**: Kubernetes Jobs validate prerequisites (e.g., CRD presence) before syncing
4. **PostSync Hooks**: Configuration jobs execute after syncing; critical tasks use Jobs in final waves

**Promotion workflow:**
1. Developer makes configuration changes in Config Repository (dev cluster config)
2. Git commit triggers ArgoCD sync to dev cluster
3. Validation in dev environment
4. PR created to update test cluster config with same changes
5. PR review and approval
6. Merge triggers ArgoCD sync to test cluster
7. Testing and validation
8. PR created for UAT, then production
9. Each tier requires approval gates (PR reviews)

**Config Repository structure for multi-environment:**
```
config-repo/
├── account-1/
│   ├── dev-cluster/
│   │   ├── ibm-mas-cluster-base.yaml
│   │   ├── ibm-operator-catalog.yaml
│   │   └── dev01/
│   │       ├── ibm-mas-instance-base.yaml
│   │       └── ibm-mas-suite.yaml
│   ├── test-cluster/
│   │   ├── ibm-mas-cluster-base.yaml
│   │   ├── ibm-operator-catalog.yaml
│   │   └── test/
│   │       ├── ibm-mas-instance-base.yaml
│   │       └── ibm-mas-suite.yaml
│   └── prod-cluster/
│       ├── ibm-mas-cluster-base.yaml
│       ├── ibm-operator-catalog.yaml
│       └── prod/
│           ├── ibm-mas-instance-base.yaml
│           └── ibm-mas-suite.yaml
```

## 4.3 Ansible Automation Pipeline

The `ibm.mas_devops` Ansible Collection provides automation for multi-environment deployments.

**Key capabilities:**
- OCP provisioning and management
- MAS suite installation and configuration
- Database setup (Db2, MongoDB)
- Application deployment (Manage, Monitor, Health, Predict, etc.)
- Upgrade and lifecycle management
- Backup and restore

**Pipeline approach:**
- MAS CLI is the reference solution (~95% of users)
- When `mas install` runs, a Tekton pipeline triggers in the cluster
- Pipeline orchestrates execution of Ansible roles in sequence
- Configuration files (YAML) drive the installation
- Ansible Automation Platform Execution Environment container available at `quay.io/ibmmas/ansible-devops-ee`

**Environment-specific configuration:**
- Pass different variables per environment
- Use Ansible inventory groups to target clusters
- Configuration directory contains YAML files applied post-install
- Can customize any Kubernetes resource for environment-specific needs

## 4.4 Database Migration Between Environments

**Db2-specific migration:**
- Use `db2move` and `db2look` utilities for export/import
- Export database schema and data from source
- Import into target environment
- Separate export/import cycles for each stage (initial build, testing, cutover)

**Migration tools:**
- **IBM Db2 Bridge**: Data movement tool for enterprise migration scenarios
- **Db2 Migration Tooling (Db2MT)**: Guides migration process with script customization
- **AWS DMS**: For cross-platform migrations (e.g., MS SQL to Db2)

**Key migration considerations:**
- Source Maximo version must be v7.6.1.2+ for MAS migration
- Source database must be in Db2 format (or converted first)
- Test migration in non-prod before production cutover
- Plan for downtime during cutover

## 4.5 Testing Gates Between Environments

**Recommended gate structure:**

| Gate | From → To | Validation Required |
|------|-----------|-------------------|
| Dev Gate | Dev → Test | Unit tests pass, code review approved, no critical defects |
| Test Gate | Test → UAT | Integration tests pass, performance baseline met, regression suite green |
| UAT Gate | UAT → Production | Business acceptance sign-off, security scan clean, performance test at scale |
| Change Advisory Board | UAT → Production | ITIL change management approval, rollback plan documented |

---

# 5. Namespace Architecture for Multi-Environment

## 5.1 Namespace Naming Convention

MAS uses a standardized namespace pattern: **`mas-{instanceId}-{component}`**

**Namespaces created per MAS instance:**

| Namespace | Purpose |
|-----------|---------|
| `mas-{instanceId}-core` | MAS core platform, API, admin UI |
| `mas-{instanceId}-manage` | Maximo Manage application |
| `mas-{instanceId}-pipelines` | Tekton pipelines for MAS CLI operations |
| `mas-{instanceId}-iot` | IoT application (if deployed) |
| `mas-{instanceId}-monitor` | Monitor application (if deployed) |
| `mas-{instanceId}-health` | Health application (if deployed) |
| `mas-{instanceId}-predict` | Predict application (if deployed) |
| `mas-{instanceId}-visualinspection` | Visual Inspection (if deployed) |
| `mas-{instanceId}-assist` | Assist application (if deployed) |
| `mas-{instanceId}-optimizer` | Optimizer application (if deployed) |
| `mas-{instanceId}-facilities` | Facilities application (if deployed) |

**Shared/cluster-wide namespaces:**

| Namespace | Purpose |
|-----------|---------|
| `openshift-marketplace` | IBM Operator Catalog (CatalogSource) |
| `ibm-common-services` | IBM Common Services, IAM, Cert Manager |
| `ibm-sls` | Suite License Service |
| `mongoce` or `mas-mongo-ce` | MongoDB Community Edition |
| `ibm-cpd` | Cloud Pak for Data (if used) |

**Multi-environment example (single cluster):**
```
Cluster Namespaces:
├── openshift-marketplace           (shared)
├── ibm-common-services             (shared)
├── ibm-sls                         (shared)
├── mas-mongo-ce                    (shared)
│
├── mas-dev01-core                  (dev instance)
├── mas-dev01-manage                (dev instance)
├── mas-dev01-pipelines             (dev instance)
│
├── mas-test-core                   (test instance)
├── mas-test-manage                 (test instance)
├── mas-test-pipelines              (test instance)
│
├── mas-uat-core                    (UAT instance)
├── mas-uat-manage                  (UAT instance)
├── mas-uat-pipelines               (UAT instance)
│
├── mas-prod-core                   (production instance)
├── mas-prod-manage                 (production instance)
└── mas-prod-pipelines              (production instance)
```

## 5.2 Resource Quotas Per Namespace/Environment

OpenShift ResourceQuota and LimitRange objects can be applied per namespace to enforce resource boundaries.

**Recommended quota strategy:**

```yaml
# Example: Resource Quota for dev environment
apiVersion: v1
kind: ResourceQuota
metadata:
  name: mas-dev-quota
  namespace: mas-dev01-core
spec:
  hard:
    requests.cpu: "16"
    requests.memory: "64Gi"
    limits.cpu: "24"
    limits.memory: "96Gi"
    persistentvolumeclaims: "20"
    pods: "100"
```

```yaml
# Example: Limit Range for dev environment
apiVersion: v1
kind: LimitRange
metadata:
  name: mas-dev-limits
  namespace: mas-dev01-core
spec:
  limits:
  - default:
      cpu: "2"
      memory: "4Gi"
    defaultRequest:
      cpu: "500m"
      memory: "1Gi"
    type: Container
```

**Environment-tiered quota examples:**

| Resource | Dev Quota | Test Quota | UAT Quota | Prod Quota |
|----------|-----------|-----------|-----------|-----------|
| CPU Requests | 16 cores | 32 cores | 48 cores | 96+ cores |
| CPU Limits | 24 cores | 48 cores | 64 cores | 128+ cores |
| Memory Requests | 64 Gi | 128 Gi | 192 Gi | 384+ Gi |
| Memory Limits | 96 Gi | 192 Gi | 256 Gi | 512+ Gi |
| PVCs | 20 | 30 | 40 | 60+ |
| Pods | 100 | 200 | 300 | 500+ |

**Important MAS-specific note:** MAS deploys 800+ pods for a standard configuration with multiple applications. Resource quotas must account for this density. Each worker node reserves ~1 core for OpenShift internal services.

## 5.3 Network Policies Between Environments

**OpenShift network isolation approaches:**

1. **Default OpenShift SDN**: Projects (namespaces) can be isolated using NetworkPolicy objects
2. **Network Policy**: Regulate traffic between different namespaces/environments

**Recommended network policies for multi-environment:**

```yaml
# Deny all inter-environment traffic by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-cross-environment
  namespace: mas-prod-core
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          environment: production
```

**Key network design considerations:**
- Default pod network: 10.128.0.0/14
- Default service network: 172.30.0.0/16
- Ensure these don't overlap with on-prem subnets
- Standard MAS production: /24 CIDR virtual network recommended
- Worker node subnet: /25 prefix
- Control node subnet: /27 prefix
- 800+ pods require /21 CIDR or larger for pod networking
- Sub-millisecond latency between application and database required
- DHCP reservations recommended; static IPs as alternative

**Environment isolation patterns:**
- Allow intra-environment communication (e.g., mas-prod-core <-> mas-prod-manage)
- Deny cross-environment communication (e.g., mas-dev01-core cannot reach mas-prod-core)
- Allow shared infrastructure access (e.g., all environments reach mas-mongo-ce)
- Allow egress to container registries (quay.io, docker.io)

## 5.4 RBAC Per Environment

**OpenShift RBAC model for MAS environments:**

```
Cluster Roles (cluster-wide):
├── cluster-admin        → Platform team only
├── mas-operator         → MAS operators (automated)
└── basic-user           → All authenticated users

Project/Namespace Roles (per environment):
├── admin                → Environment owner (e.g., dev lead, test lead)
├── edit                 → Developers/testers for that environment
├── view                 → Read-only access (monitoring, audit)
└── mas-app-admin        → MAS application administration
```

**Recommended RBAC strategy per environment:**

| Role | Dev | Test | UAT | Prod |
|------|-----|------|-----|------|
| Cluster Admin | Platform Team | Platform Team | Platform Team | Platform Team |
| Namespace Admin | Dev Lead | Test Lead | UAT Lead | Production Lead |
| Edit (deploy) | All Developers | Test Team | UAT Team | Change Management only |
| View (read-only) | All Team | All Team | All Team | Ops + Management |
| MAS Admin UI | Dev Admin | Test Admin | UAT Admin | Prod Admin (restricted) |

**Best practice:** Use RBAC Groups mapped to corporate LDAP/AD, not individual user bindings.

---

# 6. Additional Technical Details

## 6.1 DNS and Certificate Configuration

- Delegate a cluster subdomain (e.g., `mas.example.org`) to ACME DNS-01 provider
- Supported DNS providers: Azure DNS, Cloudflare, Route 53
- Cert-manager validates subdomain internally
- Each cluster/environment may have its own subdomain:
  - `dev.mas.example.org`
  - `test.mas.example.org`
  - `prod.mas.example.org`

## 6.2 Proxy and Egress Considerations

- Identify corporate egress proxies early
- Obtain certificates for re-encrypting proxies (e.g., Zscaler ZIA)
- Cluster needs internet access to: quay.io, docker.io (container registries)
- Air-gapped installations possible but add significant complexity
- Air-gapped requires UPI installation method (not IPI)

## 6.3 Authentication Integration

- SAML-based SSO with Microsoft Entra ID (Azure AD) supported
- OAuth for OpenShift cluster access
- OIDC registration managed through MongoDB
- Each environment can have separate identity provider configuration
- Recommendation: Same IdP across environments, different roles/groups

## 6.4 Disaster Recovery Considerations

- For state-based services inside OpenShift (MongoDB, Kafka), plan backup/recovery
- External PaaS services preferred for stateful components (better DR)
- Kafka data in Strimzi likely lost during disaster
- Consider Confluent Kafka or external Kafka for critical data
- MongoDB Atlas recommended over in-cluster MongoDB Community for DR
- Multi-region deployment via RHACM for production DR
- Zone-redundant storage (ZRS) for all persistent volumes

## 6.5 MAS Version/Catalog Management

- IBM publishes curated operator catalogs (e.g., `v9-250925-amd64`)
- Each catalog is a tested snapshot of compatible operator versions
- Different environments can reference different catalog versions
- Non-prod can run a newer catalog for testing before production promotion
- Catalog version is specified in `ibm-operator-catalog.yaml` in GitOps config

## 6.6 Workspace Architecture

- Workspaces are "an aggregation of namespaces used to create a MAS sub-instance"
- Currently single workspace per MAS instance is the standard pattern
- Multi-Tenant Manage is **not yet supported** in MAS
- Future versions may enable multiple workspaces within a single instance
- Potential future use: sharing a MAS instance between dev and QA environments

## 6.7 HAProxy and Load Balancing

- HAProxy supports up to 20,000 connections per pod
- Scale ingress controller replicas for high-volume workloads
- Default load balancing algorithm: "random" (OCP 4.10+, previously "leastconn")
- Configure `maxconn` aligned with node `sysctl` settings
- PID limits vary by platform: IBM ROKS (231,239), AWS ROSA (4,096), Azure (1,024)

---

# 7. Sources

1. [IBM MAS Sizing Guidance](https://ibm-mas.github.io/mas-performance/mas/sizing/guidance/)
2. [IBM MAS CLI Topology Reference](https://ibm-mas.github.io/cli/reference/topology/)
3. [Single Node OpenShift for MAS](https://ibm-mas-manage.github.io/sno/)
4. [MAS On-Prem Design Considerations - Interloc Solutions](https://www.interlocsolutions.com/blog/ibm-maximo-application-suite-on-prem-installation-design-considerations)
5. [Deploy MAS on Azure - Microsoft Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/apps/deploy-ibm-maximo-application-suite)
6. [IBM MAS GitOps Repository](https://github.com/ibm-mas/gitops)
7. [IBM MAS GitOps Documentation](https://ibm-mas.github.io/gitops/main/)
8. [MAS DevOps Ansible Collection](https://ibm-mas.github.io/ansible-devops/)
9. [IBM MAS Ansible DevOps GitHub](https://github.com/ibm-mas/ansible-devops)
10. [IBM MAS OCP Best Practices](https://ibm-mas.github.io/mas-performance/mas/ocp/bestpractice/)
11. [IBM MAS Architecture](https://www.ibm.com/docs/en/masv-and-l/cd?topic=models-maximo-application-suite-architecture)
12. [IBM MAS Compute Node Sizing](https://www.ibm.com/docs/en/masv-and-l/cd?topic=ic-sizing-red-hat-openshift-container-platform-compute-nodes)
13. [IBM MAS Operator Catalog v9](https://ibm-mas.github.io/cli/catalogs/v9-250925-amd64/)
14. [IBM MAS FAQ](https://ibm-mas-manage.github.io/faq/)
15. [IBM MAS and Red Hat OpenShift](https://www.redhat.com/en/blog/ibm-maximo-application-suite-mas-and-red-hat-openshift)
16. [Red Hat Advanced Cluster Management](https://www.redhat.com/en/technologies/management/advanced-cluster-management)
17. [IBM Cloud Pak GitOps](https://github.com/IBM/cloudpak-gitops)
18. [IBM MAS Suite Install Role](https://ibm-mas.github.io/ansible-devops/roles/suite_install/)
19. [IBM Maximo Manage Namespace Backup](https://www.ibm.com/docs/en/masv-and-l/continuous-delivery?topic=manage-namespace)
20. [MAS Deployment and OpenShift Options - SWMUG](https://swmug.org/wp-content/uploads/2024/02/SWMUG_MAS_Deployment_andOpenShiftOptionsIBM240221.pdf)
21. [IBM MAS Infrastructure Calculator](https://www.ibm.com/support/pages/system/files/inline-files/Maximo%20Application%20Suite%20On%20Premise%20Infrastructure%20Calculator%20V8_2.xlsx)
22. [IBM Migration Manager Guide](https://www.ibm.com/docs/en/SS2JEC_7.2.0/com.ibm.itam.doc/reference/mam71_migration_mgr_guide.pdf)
23. [MAS GitOps Config to Instances](https://ibm-mas.github.io/gitops/main/configtoinstances/)
24. [MAS GitOps Deployment Orchestration](https://ibm-mas.github.io/gitops/main/orchestration/)
25. [MAS GitOps Helm Charts](https://ibm-mas.github.io/gitops/main/helmcharts/)
