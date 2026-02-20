# IBM MAS on OpenShift: Complete Architecture Research

> **Research Date:** 2026-02-20
> **Purpose:** Deep technical content for blog series enhancement
> **Sources:** IBM Documentation, MAS CLI docs, MAS Performance Wiki, IBM DevOps Ansible Collection, community resources

---

## 1. CLUSTER TOPOLOGY: Nodes in an MAS OpenShift Deployment

### 1.1 Node Types

An OpenShift cluster running MAS consists of three distinct node roles, each with specific responsibilities:

#### Control Plane Nodes (Masters)
- **Count:** 3 (for HA; single for SNO dev environments)
- **Recommended sizing:** 8 vCPU / 32 GB RAM per node
- **Responsibilities:**
  - etcd cluster (distributed key-value store for all cluster state)
  - Kubernetes API Server (kube-apiserver)
  - Kubernetes Scheduler (kube-scheduler)
  - Kubernetes Controller Manager
  - OpenShift API Server and Controller Manager
  - OAuth Server
- **Key note:** Control plane nodes in production should NOT run application workloads. They are tainted with `node-role.kubernetes.io/master:NoSchedule` to prevent general pod scheduling.

#### Worker Nodes (Compute)
- **Minimum count:** 3 (for HA and pod anti-affinity)
- **Recommended sizing:** 16 vCPU / 64 GB RAM per node (4 GB per CPU ratio)
- **Storage:** Minimum 300 GB SSD per worker node (for MAS build processes)
- **Network:** 10 Gbps ethernet strongly recommended for production
- **Responsibilities:**
  - Run ALL MAS application pods (Core, Manage, IoT, Monitor, Health, Predict, etc.)
  - Run supporting infrastructure pods (MongoDB, Kafka, SLS, etc.)
  - Container runtime (CRI-O) executes actual workloads
- **Key note:** Each worker node reserves approximately 1 CPU core for internal OpenShift services (kubelet, kube-proxy, CRI-O runtime). So a 16-core node has ~15 cores available for workloads.

#### Infrastructure Nodes
- **Count:** 3 (for HA)
- **Recommended sizing:** 8-16 vCPU / 32-64 GB RAM per node
- **Responsibilities:**
  - OpenShift Router / HAProxy Ingress Controller
  - Internal image registry
  - Cluster monitoring stack (Prometheus, Grafana, AlertManager)
  - Logging stack (Elasticsearch/Loki, Fluentd/Vector, Kibana)
  - OpenShift Container Storage / Data Foundation management pods
- **Key note:** Infrastructure nodes are tainted so that only infrastructure workloads schedule on them. This isolates routing and monitoring from application workloads.

#### ODF/OCS Storage Nodes (Optional but Common)
- **Count:** 3
- **Recommended sizing:** 16 vCPU / 64 GB RAM per node
- **Responsibilities:**
  - OpenShift Data Foundation (ODF) / OpenShift Container Storage (OCS)
  - Ceph storage cluster (MON, OSD, MDS daemons)
  - Provides RWX (ReadWriteMany) storage classes needed by MAS
  - All writes replicated across all three nodes
- **Key note:** ODF nodes require SSD/NVMe drives and 10 Gbps network links.

### 1.2 Typical Production Cluster Layout

```
CLUSTER: mas-prod-cluster
├── Control Plane (3 nodes)
│   ├── master-0  [8 vCPU / 32 GB] - etcd, API server, scheduler
│   ├── master-1  [8 vCPU / 32 GB] - etcd, API server, scheduler
│   └── master-2  [8 vCPU / 32 GB] - etcd, API server, scheduler
│
├── Infrastructure (3 nodes)
│   ├── infra-0   [8 vCPU / 32 GB] - router, registry, monitoring
│   ├── infra-1   [8 vCPU / 32 GB] - router, registry, monitoring
│   └── infra-2   [8 vCPU / 32 GB] - router, registry, monitoring
│
├── ODF Storage (3 nodes)
│   ├── odf-0     [16 vCPU / 64 GB] - Ceph OSD, MON
│   ├── odf-1     [16 vCPU / 64 GB] - Ceph OSD, MON
│   └── odf-2     [16 vCPU / 64 GB] - Ceph OSD, MON
│
├── Worker Nodes (6-10+ nodes depending on apps)
│   ├── worker-0  [16 vCPU / 64 GB] - MAS Core, MongoDB
│   ├── worker-1  [16 vCPU / 64 GB] - MAS Manage UI pods
│   ├── worker-2  [16 vCPU / 64 GB] - MAS Manage Cron/MEA pods
│   ├── worker-3  [16 vCPU / 64 GB] - MAS IoT / Monitor
│   ├── worker-4  [16 vCPU / 64 GB] - DB2 Warehouse
│   ├── worker-5  [16 vCPU / 64 GB] - DB2 Warehouse (HA pair)
│   └── worker-6+ [16 vCPU / 64 GB] - Additional apps / scaling
│
└── Database Nodes (optional dedicated)
    ├── db-0      [16 vCPU / 128 GB] - DB2 (8:1 memory ratio)
    └── db-1      [16 vCPU / 128 GB] - DB2 HA pair
```

**Total for a production deployment with Core + Manage + IoT + Monitor:**
- ~15-19 nodes
- ~800+ pods across all namespaces

### 1.3 Single Node OpenShift (SNO) for Development
- 1 node: 16 vCPU / 64 GB RAM
- Control plane + worker on same node
- Supports ~70 concurrent users
- No HA capability
- Uses LVM Operator for local storage instead of ODF

---

## 2. NAMESPACE ARCHITECTURE: How MAS Maps to OpenShift Namespaces

### 2.1 Complete Namespace Map

MAS creates a complex multi-namespace topology. Each namespace isolates a functional domain:

```
OPENSHIFT CLUSTER NAMESPACES
│
├── PLATFORM SERVICES (Shared across all MAS instances)
│   ├── openshift-operators              # OLM-managed cluster-wide operators
│   ├── openshift-marketplace            # Operator catalogs
│   ├── openshift-pipelines              # Tekton pipelines operator
│   ├── openshift-ingress                # HAProxy router pods
│   ├── openshift-monitoring             # Prometheus, Grafana, AlertManager
│   ├── openshift-logging                # Cluster logging stack
│   ├── openshift-image-registry         # Internal container image registry
│   ├── openshift-storage                # ODF/OCS operator and Ceph daemons
│   └── openshift-cert-manager-operator  # cert-manager operator (newer installs)
│
├── IBM FOUNDATIONAL SERVICES (Shared)
│   ├── ibm-common-services              # Cloud Pak Foundational Services operator
│   │                                    #   - common-service-operator
│   │                                    #   - namespace-scope-operator
│   │                                    #   - zen-operator (CP4D integration)
│   │                                    #   - platform-api-operator
│   │                                    #   - licensing-operator
│   ├── cert-manager                     # Certificate Manager operand
│   │                                    #   - cert-manager-controller
│   │                                    #   - cert-manager-cainjector
│   │                                    #   - cert-manager-webhook
│   └── cert-manager-operator            # Certificate Manager operator
│
├── DATA SERVICES (Shared, may be per-instance)
│   ├── mongoce (or mas-mongo-ce)        # MongoDB Community Edition
│   │                                    #   - MongoDBCommunity CRD instances
│   │                                    #   - Each MAS instance gets its own DB
│   ├── ibm-sls                          # Suite License Service
│   │                                    #   - SLS operator
│   │                                    #   - SLS instance pods
│   │                                    #   - License metering
│   ├── ibm-dro (or redhat-marketplace)  # Data Reporter Operator (replaced UDS)
│   │                                    #   - Usage data collection
│   │                                    #   - Metrics reporting
│   ├── db2u (or mas-{id}-system)        # DB2 Universal Operator
│   │                                    #   - DB2 warehouse instances
│   │                                    #   - System database
│   └── strimzi-kafka (or mas-{id}-kafka)# Kafka via Strimzi/AMQ Streams
│                                        #   - Kafka brokers
│                                        #   - Zookeeper ensemble
│                                        #   - Kafka Connect
│
├── MAS INSTANCE: "inst1" (per-instance namespaces)
│   ├── mas-inst1-core                   # MAS Core Platform (~48 pods)
│   │   ├── ibm-mas-operator             # Main MAS operator
│   │   ├── ibm-truststore-mgr           # Truststore Manager operator
│   │   ├── inst1-coreapi (x3 replicas)  # Core API server
│   │   ├── inst1-internalapi            # Internal admin API
│   │   ├── inst1-admin-dashboard        # Admin UI
│   │   ├── inst1-homepage               # MAS Home UI
│   │   ├── inst1-navigator              # Workspace navigator
│   │   ├── inst1-coreidp                # Identity provider (Liberty)
│   │   ├── inst1-coreidp-login          # Login page
│   │   ├── inst1-mobileapi              # Mobile API server
│   │   ├── inst1-catalogmgr             # Catalog inventory management
│   │   ├── inst1-catalogapi             # Catalog read API
│   │   ├── inst1-licensing-mediator     # SLS proxy
│   │   ├── inst1-milestonesapi          # Event milestones reporter
│   │   ├── inst1-adoptionusageapi       # Adoption tracking API
│   │   ├── inst1-adoptionusage-reporter # Adoption data reporter
│   │   ├── inst1-accapppoints           # AppPoints usage reporter
│   │   ├── inst1-monagent-mas           # Health monitoring agent
│   │   ├── inst1-usersync-coordinator   # User sync orchestrator
│   │   ├── inst1-groupsync-coordinator  # Group sync orchestrator
│   │   ├── inst1-workspace-coordinator  # Workspace sync orchestrator
│   │   ├── inst1-entitymgr-coreidp      # Manages CoreIDP deployment
│   │   ├── inst1-entitymgr-ws           # Manages workspace creation
│   │   ├── inst1-entitymgr-addons       # Manages add-ons config
│   │   ├── inst1-entitymgr-bascfg       # Manages DRO integration
│   │   ├── inst1-entitymgr-idpcfg       # Manages SAML/LDAP config
│   │   ├── inst1-entitymgr-jdbccfg      # Manages JDBC config
│   │   ├── inst1-entitymgr-kafkacfg     # Manages Kafka config
│   │   ├── inst1-entitymgr-mongocfg     # Manages MongoDB config
│   │   ├── inst1-entitymgr-objectstorage# Manages object storage config
│   │   ├── inst1-entitymgr-pushnotificationcfg # Push notifications
│   │   ├── inst1-entitymgr-scimcfg      # Manages SCIM/LDAP sync
│   │   ├── inst1-entitymgr-slscfg       # Manages SLS config
│   │   ├── inst1-entitymgr-smtpcfg      # Manages SMTP config
│   │   └── inst1-entitymgr-watsonstudiocfg # Watson Studio config
│   │
│   ├── mas-inst1-manage                 # Maximo Manage (~17-30+ pods)
│   │   ├── ibm-mas-manage-operator (2/2)# Manage operator + sidecar
│   │   ├── ibm-truststore-mgr           # Truststore for Manage
│   │   ├── admin-build-config-*-build   # Image build pods (Completed)
│   │   ├── all-build-config-*-build     # ServerBundle image builds
│   │   ├── ui-build-config-*-build      # UI bundle image build
│   │   ├── cron-build-config-*-build    # Cron bundle image build
│   │   ├── mea-build-config-*-build     # MEA bundle image build
│   │   ├── report-build-config-*-build  # Report bundle image build
│   │   ├── inst1-masdev-all-* (2/2)     # All-in-one bundle pod
│   │   │   OR split into:
│   │   ├── inst1-masdev-ui-* (2/2)      # UI server bundle pods
│   │   ├── inst1-masdev-cron-*          # Cron server bundle pod
│   │   ├── inst1-masdev-mea-*           # MEA server bundle pod
│   │   ├── inst1-masdev-report-*        # Report (BROS) bundle pod
│   │   ├── inst1-masdev-manage-maxinst  # Admin/install server
│   │   ├── inst1-masdev-jmsserver-0     # JMS standalone server
│   │   ├── inst1-entitymgr-ws           # Manage workspace manager
│   │   ├── inst1-entitymgr-appstatus    # Status tracking
│   │   ├── inst1-entitymgr-bdi          # Build Data Interpreter
│   │   ├── inst1-usersyncagent          # User sync to Manage
│   │   ├── inst1-groupsyncagent         # Group sync to Manage
│   │   └── inst1-monitoragent           # Performance metrics
│   │
│   ├── mas-inst1-iot                    # IoT (~many pods, largest)
│   │   ├── ibm-mas-iot-operator
│   │   ├── IoT platform pods
│   │   ├── Message gateway pods
│   │   └── Device management pods
│   │
│   ├── mas-inst1-monitor                # Monitor
│   │   ├── ibm-mas-monitor-operator
│   │   └── Analytics/dashboard pods
│   │
│   ├── mas-inst1-health                 # Health
│   │   ├── ibm-mas-health-operator
│   │   └── Health analysis pods
│   │
│   ├── mas-inst1-predict                # Predict
│   │   ├── ibm-mas-predict-operator
│   │   └── ML model serving pods
│   │
│   ├── mas-inst1-visualinspection       # Visual Inspection
│   │   ├── ibm-mas-visualinspection-operator
│   │   └── CV inference/training pods
│   │
│   ├── mas-inst1-optimizer              # Optimizer
│   │   └── Scheduling optimization pods
│   │
│   ├── mas-inst1-assist                 # Assist
│   │   └── AI assistant pods
│   │
│   └── mas-inst1-pipelines              # Installation pipelines
│       └── Tekton pipeline runs
│
└── CLOUD PAK FOR DATA (if Predict/Health use Watson)
    ├── cpd-operators                    # CP4D operator namespace
    ├── cpd-instance                     # CP4D instance namespace
    │   ├── Watson Machine Learning
    │   ├── Watson Studio
    │   ├── Analytics Engine (Spark)
    │   └── Watson OpenScale
    └── cpd-scheduling                   # CP4D scheduler
```

### 2.2 Entity Manager Pattern

The `entitymgr-*` pods are a crucial MAS architectural pattern. Each entity manager is a **controller** that watches a specific Custom Resource (CR) and reconciles the desired state:

| Entity Manager | Watches CR | Deploys/Manages |
|---------------|-----------|----------------|
| entitymgr-coreidp | CoreIDPCfg | coreidp, coreidp-login pods |
| entitymgr-ws | Workspace CR | Workspace creation and lifecycle |
| entitymgr-addons | AddonsCfg | Add-on feature enablement |
| entitymgr-bascfg | BASCfg (DRO) | milestonesapi, adoptionusageapi, accapppoints |
| entitymgr-idpcfg | IDPCfg | SAML/LDAP identity provider integration |
| entitymgr-jdbccfg | JDBCCfg | Database connection validation |
| entitymgr-kafkacfg | KafkaCfg | Kafka connection management |
| entitymgr-mongocfg | MongoCfg | MongoDB connection management |
| entitymgr-objectstorage | ObjectStorageCfg | S3/NFS attachment storage |
| entitymgr-pushnotificationcfg | PushNotificationCfg | Push notification service |
| entitymgr-scimcfg | SCIMCfg | LDAP user sync via SCIM protocol |
| entitymgr-slscfg | SLSCfg | Suite License Service connection |
| entitymgr-smtpcfg | SMTPCfg | Email notification config |
| entitymgr-watsonstudiocfg | WatsonStudioCfg | Watson Studio / CP4D integration |

This is a **microservices operator pattern** -- rather than one monolithic operator, MAS decomposes configuration management into ~15 small, focused entity manager pods, each responsible for a single integration concern.

---

## 3. SERVERBUNDLE ARCHITECTURE: How MAS Manage Workloads Are Distributed

### 3.1 What is a ServerBundle?

A ServerBundle is a **logical abstraction for a deployed group of pods** that perform identical functions. Each ServerBundle:

- Maps to one or more Kubernetes pods (replicas) in the cluster
- Creates an associated Kubernetes Service (named `{workspace}-{bundlename}`)
- Generates an OpenShift Route for external access
- Runs a WebSphere Liberty application server within each pod container
- Contains specific Maximo application code (EAR deployment)

### 3.2 Bundle Types

| Bundle Type | Code | Purpose | What Runs Inside |
|------------|------|---------|-----------------|
| **all** | `all` | Combined workload -- contains everything | Full Maximo EAR with UI, Cron, MEA, Reports |
| **ui** | `ui` | User interface | Maximo UI code + supporting libraries. This is what end users interact with. |
| **cron** | `cron` | Scheduled tasks | Cron task execution engine. Escalations, scheduled reports, data cleanup, PM generation |
| **mea** | `mea` | Maximo Enterprise Adapter | Enterprise web services API (SOAP/REST). Integration endpoints for external systems |
| **report** | `report` | BIRT Report Only Server (BROS) | Report execution engine. Isolated from UI to prevent long-running reports from impacting users |
| **standalonejms** | `standalonejms` | JMS Messaging | Liberty JMS server for Integration Framework message queues. Supports persistent storage via PVC |

### 3.3 Deployment Strategies

**Strategy A: All-in-One (Default, Simple)**
```yaml
serverBundles:
  - bundleType: all
    name: all
    replica: 1
    isDefault: true
    isMobileTarget: true
    isUserSyncTarget: true
    routeSubDomain: all
```
One pod type handles everything. Good for dev/test, small deployments.

**Strategy B: Split Bundles (Production Best Practice)**
```yaml
serverBundles:
  - bundleType: ui
    name: ui
    replica: 3          # Scale for user load
    isDefault: true
    isMobileTarget: true
    routeSubDomain: ui
  - bundleType: cron
    name: cron
    replica: 1          # Usually 1, unless high cron load
    isUserSyncTarget: true
    routeSubDomain: cron
  - bundleType: mea
    name: mea
    replica: 2          # Scale for integration volume
    routeSubDomain: mea
  - bundleType: report
    name: report
    replica: 1          # Scale for report concurrency
    routeSubDomain: report
```

**Why split?** Isolation prevents resource contention within the same JVM/pod:
- A long-running report won't starve UI users of CPU
- High-volume MEA integrations won't slow down the UI
- Cron tasks (escalations, PM generation) run independently
- Each bundle can be scaled independently based on its specific load

### 3.4 ServerBundle to Pod Mapping

```
ManageWorkspace CR
  └── spec.serverBundles[]
       ├── bundleType: "ui"
       │    └── Deployment: inst1-masdev-ui
       │         ├── Pod: inst1-masdev-ui-abc12 (replica 1)
       │         │    ├── Container 1: liberty-server (WAS Liberty + Maximo UI EAR)
       │         │    └── Container 2: monitoring-sidecar (Prometheus metrics)
       │         ├── Pod: inst1-masdev-ui-def34 (replica 2)
       │         └── Pod: inst1-masdev-ui-ghi56 (replica 3)
       │    Service: inst1-masdev-ui-svc
       │    Route: ui.{workspace}.{masdomain}
       │
       ├── bundleType: "cron"
       │    └── Deployment: inst1-masdev-cron
       │         └── Pod: inst1-masdev-cron-xyz78 (replica 1)
       │              ├── Container 1: liberty-server (WAS Liberty + Cron EAR)
       │              └── Container 2: monitoring-sidecar
       │    Service: inst1-masdev-cron-svc
       │    Route: cron.{workspace}.{masdomain}
       │
       ├── bundleType: "mea"
       │    └── Deployment: inst1-masdev-mea
       │         └── Pods...
       │
       └── bundleType: "report"
            └── Deployment: inst1-masdev-report
                 └── Pods...
```

### 3.5 User Capacity per Bundle Pod

IBM guidance: **50-75 concurrent users per UI ServerBundle pod**

This corresponds to a JVM with 2 CPU cores, comparable to Maximo 7.6.x performance levels. To handle 300 concurrent users, you would need 4-6 UI pods.

### 3.6 ServerBundle Configuration Properties

Each bundle creates a ConfigMap at path `/config/manage/properties` within the pod:
- ConfigMap name pattern: `{workspaceId}-{serverbundlename}-bundleproperty`
- Properties are automatically detected and cached by the Maximo Manage process
- Updates propagate through operator reconciliation (no manual pod restart needed)

Liberty server XML customization:
- Created as Kubernetes Secrets
- Mounted at `/config/manage/serverxml`
- Supports custom JMS queues, logging configuration, data sources
- Integrated into Liberty server initialization at startup

### 3.7 The `ForRouteOnly` Property

When splitting from an "all" bundle to separate bundles, the `ForRouteOnly: true` property maintains URL continuity. It tells the operator to keep the route alive for the old "all" endpoint but redirect users to the appropriate new bundle's login page.

---

## 4. POD AND CONTAINER ARCHITECTURE: What Runs Inside MAS Pods

### 4.1 Container Model

The standard MAS pod model is **one primary container per pod**, with optional sidecar containers:

**Typical MAS Core Pod (e.g., coreapi):**
```
Pod: inst1-coreapi-abc12
  READY: 1/1
  ├── Container: coreapi
  │    Image: icr.io/cpopen/ibm-mas-coreapi:{version}
  │    Ports: 8443 (HTTPS)
  │    Resources: (see sizing table)
  └── (no sidecar -- single container)
```

**MAS Manage ServerBundle Pod (e.g., UI bundle):**
```
Pod: inst1-masdev-ui-abc12
  READY: 2/2
  ├── Container 1: liberty-server (PRIMARY)
  │    Image: {internal-registry}/mas-inst1-manage/ui:{build-tag}
  │    Base: WebSphere Liberty Base 21.0.0.5 + OpenJ9 JVM
  │    Ports: 9080 (HTTP), 9443 (HTTPS)
  │    Mounts:
  │      /config/manage/properties  ← ConfigMap (bundle properties)
  │      /config/manage/serverxml   ← Secret (Liberty server.xml)
  │      /config/manage/truststore  ← Secret (TLS certificates)
  │    Resources:
  │      requests: 0.2 CPU, 1 Gi memory
  │      limits: 6 CPU, 10 Gi memory
  │    JVM: OpenJ9 with autonomic thread pool tuning
  │
  └── Container 2: monitoring-sidecar (SIDECAR)
       Purpose: Reports server metrics as Prometheus endpoint
       Scrapes Liberty MicroProfile Metrics from localhost
       Exposes /metrics endpoint for Prometheus collection
```

**MAS Manage Operator Pod:**
```
Pod: ibm-mas-manage-operator-abc12
  READY: 2/2
  ├── Container 1: manager (PRIMARY)
  │    The operator reconciliation loop
  │    Watches ManageWorkspace, ManageBuild, ManageDeployment CRs
  │
  └── Container 2: kube-rbac-proxy (SIDECAR)
       Standard OLM pattern for RBAC proxy
       Provides authenticated metrics endpoint
```

### 4.2 Init Containers in MAS

Init containers run before the main containers start. In MAS deployments:

**Truststore Manager Pattern:**
The `ibm-truststore-mgr-controller-manager` operator watches TrustStore CRs and injects trusted CA certificates into pods. This ensures:
- All pods trust the cluster's internal CA
- External CAs (LDAP servers, SAML IdPs, external DBs) are trusted
- Certificate rotation is handled automatically

**Manage ServerBundle Init Flow:**
```
Pod Startup Sequence:
  1. Init Container: truststore-init
     - Copies base truststore from secret
     - Adds any custom CA certificates
     - Writes final truststore to shared emptyDir volume

  2. Init Container: config-init (if present)
     - Validates configuration
     - Prepares Liberty server.xml

  3. Main Container: liberty-server
     - Reads truststore from shared volume
     - Starts WebSphere Liberty
     - Deploys Maximo EAR
     - Opens HTTP/HTTPS ports

  4. Sidecar Container: monitoring-sidecar
     - Starts simultaneously with main container
     - Connects to Liberty's MicroProfile Metrics
     - Exposes Prometheus scrape endpoint
```

### 4.3 The Manage Build Process

Before ServerBundle pods can run, the Manage operator executes a multi-stage build:

```
Build Pipeline:
  1. ManageBuild CR created/updated
  2. Operator creates BuildConfig resources in OpenShift
  3. BuildConfig pulls base Liberty image from IBM Container Registry (icr.io)
  4. Downloads customization archive (if configured) from HTTP(S)/FTP(S)
  5. Layers customizations (Java classes, XML, DB scripts) onto base image
  6. Produces built image per bundle type:
     - admin-build-config → manage-maxinst image
     - all-build-config → all-in-one server image
     - ui-build-config → UI server image
     - cron-build-config → cron server image
     - mea-build-config → MEA server image
     - report-build-config → report server image
  7. Images pushed to OpenShift Internal Registry
  8. ManageDeployment CR triggers rollout using new images

Build pods appear as:
  admin-build-config-1-build  0/1  Completed
  all-build-config-1-build    0/1  Completed
  ui-build-config-1-build     0/1  Completed
  ...
```

### 4.4 Special Purpose Pods

**manage-maxinst Pod:**
- Administrative server for database configuration tasks
- Contains the full SMP folder with Maximo binaries and admin tools
- Used for: updatedb, configdb, integrity checker
- Runs with 1/1 containers
- NOT a user-facing pod -- purely administrative

**jmsserver-0 Pod:**
- StatefulSet (not Deployment) -- hence the `-0` suffix
- Only ONE JMS server allowed per Manage workspace
- Runs Liberty JMS messaging engine
- Requires PVC for persistent message storage (ephemeral by default -- data loss risk on restart)
- Handles Integration Framework message queues

---

## 5. OPERATOR HIERARCHY: How Operators Manage the Stack

### 5.1 Operator Lifecycle Manager (OLM)

All MAS operators are delivered through the **IBM Maximo Operator Catalog** and managed by OLM:

```
IBM Maximo Operator Catalog (CatalogSource)
  └── Subscriptions (auto-upgrade channels)
       ├── ibm-mas (9.0.x channel)           → MAS Core Operator
       ├── ibm-mas-manage (9.0.x channel)    → Manage Operator
       ├── ibm-mas-iot (9.0.x channel)       → IoT Operator
       ├── ibm-mas-monitor (9.0.x channel)   → Monitor Operator
       ├── ibm-mas-health (9.0.x channel)    → Health Operator
       ├── ibm-mas-predict (9.0.x channel)   → Predict Operator
       ├── ibm-mas-visualinspection (9.0.x)  → Visual Inspection Operator
       ├── ibm-mas-optimizer (9.0.x channel) → Optimizer Operator
       ├── ibm-mas-assist (9.0.x channel)    → Assist Operator
       ├── ibm-mas-aibroker (9.0.x channel)  → AI Broker Operator
       ├── ibm-truststore-mgr               → Truststore Manager
       ├── ibm-sls                           → Suite License Service
       ├── mongodb-operator-app              → MongoDB Community
       ├── cert-manager-operator             → Certificate Manager
       ├── common-service-operator           → IBM Common Services
       ├── db2u-operator                     → DB2 Universal
       ├── strimzi-kafka-operator            → Kafka (Strimzi)
       ├── cloud-native-postgresql           → PostgreSQL
       └── ...many more dependency operators
```

### 5.2 Operator Reconciliation Pattern

```
Administrator
  │
  ├── MAS Admin UI → updates Suite CR (or ManageWorkspace CR)
  │
  └── Suite CR changes detected by ibm-mas-operator
       │
       ├── Validates configuration
       ├── Creates/updates child CRs (JDBCCfg, KafkaCfg, etc.)
       │
       └── Entity Managers watch child CRs
            ├── entitymgr-jdbccfg → validates DB connection → updates status
            ├── entitymgr-kafkacfg → validates Kafka connection → updates status
            ├── entitymgr-mongocfg → validates MongoDB → updates status
            └── ...each validates its domain and reports back
                 │
                 └── Suite CR status aggregates all statuses
                      └── When all Ready → application activation proceeds
```

### 5.3 CRD Hierarchy

```
Suite (cluster-level CRD)
  ├── Workspace
  │    ├── ManageApp → ManageWorkspace → ManageBuild → ManageDeployment → ManageServerBundle
  │    ├── IoTApp → IoTWorkspace
  │    ├── MonitorApp → MonitorWorkspace
  │    ├── HealthApp → HealthWorkspace
  │    ├── PredictApp → PredictWorkspace
  │    └── VisualInspectionApp → VisualInspectionWorkspace
  │
  ├── Configuration CRs (per-instance)
  │    ├── JDBCCfg
  │    ├── KafkaCfg
  │    ├── MongoCfg
  │    ├── SLSCfg
  │    ├── BASCfg (DRO)
  │    ├── IDPCfg
  │    ├── SCIMCfg
  │    ├── SMTPCfg
  │    ├── ObjectStorageCfg
  │    └── WatsonStudioCfg
  │
  └── License
       └── AppPoints accounting
```

---

## 6. RESOURCE ALLOCATION: CPU, Memory, and Sizing

### 6.1 Per-Application Resource Requirements

Based on standard workload with IoT small t-shirt size and Manage with all-in-one bundle (replica=1):

| Application | CPU Request | CPU Limit | Mem Request | Mem Limit |
|-------------|-----------|---------|-----------|---------|
| **Core** | 1.5 cores | 18.95 cores | 6.27 GB | 32.5 GB |
| **Manage** (base) | 2.9 cores | 11.1 cores | 4.04 GB | 17 GB |
| **IoT** | 19.66 cores | 214.65 cores | 57.08 GB | 269 GB |
| **Monitor** | 5.4 cores | 32.4 cores | 12.84 GB | 55.5 GB |
| **Health** | 2.9 cores | 15.6 cores | 7.12 GB | 30.84 GB |
| **Predict** | 3.1 cores | 12.5 cores | 6.13 GB | 24.5 GB |
| **Optimizer** | 7.4 cores | 19.3 cores | 25.57 GB | 117 GB |
| **Assist** | 12.4 cores | 57.7 cores | 19.46 GB | 62.38 GB |
| **Add** | 6.0 cores | 12.0 cores | 13.0 GB | 26.0 GB |

**Infrastructure Services:**

| Service | CPU Request | CPU Limit | Mem Request | Mem Limit |
|---------|-----------|---------|-----------|---------|
| **OCS/ODF** | 14 cores | 32 cores | 14 GB | 32 GB |
| **CP4D + 2x DB2W** | 31.59 cores | 40.7 cores | 235.39 GB | 249.70 GB |
| **Each additional Manage pod** | 1 core | 6 cores | 2 GB | 10 GB |

### 6.2 Manage ServerBundle Resource Defaults

From the ManageWorkspaces CR:

```yaml
# Per ServerBundle pod
resources:
  requests:
    cpu: "200m"      # 0.2 cores
    memory: "1Gi"
  limits:
    cpu: "6"         # 6 cores
    memory: "10Gi"

# Manage Admin (maxinst) pod
adminResources:
  requests:
    cpu: "200m"
    memory: "500Mi"
  limits:
    cpu: "2"
    memory: "4Gi"
```

### 6.3 Sizing Rules of Thumb

| Rule | Value |
|------|-------|
| Memory per CPU | 4 GB per CPU core |
| Disk per CPU | 15-25 GB per CPU core |
| Users per UI pod | 50-75 concurrent users |
| Worker node size | 16 vCPU / 64 GB (standard) |
| Master node size | 8 vCPU / 32 GB |
| DB node memory ratio | 8:1 (memory to CPU) |
| Min worker nodes | 3 (for HA) |
| ODF nodes | 3 with 16 vCPU / 64 GB each |
| Storage per worker | Min 300 GB SSD |
| Network | 10 Gbps for production |
| Overcommit threshold | Keep below 300% |

### 6.4 Compute Node Size Tradeoffs

**Larger nodes (fewer nodes):**
- Better for massive workloads
- Reduces inter-node I/O overhead
- DB2 benefits from larger nodes (more memory for buffer pools)
- Risk: losing one node impacts more capacity

**Smaller nodes (more nodes):**
- Better fault tolerance (losing one node = less impact)
- Better for smaller workloads
- More scheduling flexibility

### 6.5 Node Size Profiles

| Profile | CPU | Memory | Disk | Use Case |
|---------|-----|--------|------|----------|
| Small | 4 vCPU | 16 GB | 100 GB | Dev/test single component |
| Medium | 8 vCPU | 32 GB | 200 GB | Infra nodes, small workloads |
| Large | 16 vCPU | 64 GB | 400 GB | Standard worker nodes |
| XL | 32 vCPU | 128 GB | 800 GB | DB nodes, high-density workers |

---

## 7. SCHEDULING AND PLACEMENT: How OpenShift Distributes MAS Pods

### 7.1 Pod Scheduling Mechanisms

OpenShift uses the Kubernetes scheduler with these mechanisms relevant to MAS:

**Node Selectors:**
The simplest form -- labels on nodes matched by label selectors on pods.
```yaml
# On the node:
node-role.kubernetes.io/worker: ""
mas.ibm.com/workload: manage

# On the pod:
nodeSelector:
  mas.ibm.com/workload: manage
```

**Taints and Tolerations:**
Nodes "refuse" pods unless pods have matching tolerations.
```yaml
# Taint on infrastructure node:
taints:
  - key: node-role.kubernetes.io/infra
    value: reserved
    effect: NoSchedule

# Toleration on router pod:
tolerations:
  - key: node-role.kubernetes.io/infra
    operator: Equal
    value: reserved
    effect: NoSchedule
```

**Pod Affinity / Anti-Affinity:**
```yaml
# Spread UI pods across nodes (anti-affinity):
affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: manage-ui
          topologyKey: kubernetes.io/hostname
```

### 7.2 MAS-Specific Scheduling Patterns

**Default behavior (MAS does NOT heavily use affinity/taints):**
MAS operators generally allow the Kubernetes scheduler to place pods freely across available worker nodes. The operator sets resource requests/limits, and the scheduler finds nodes with capacity.

**Recommended production patterns:**

1. **DB2 Isolation:** Use node selectors or taints to dedicate nodes to DB2 pods (high memory, CPU-intensive)
2. **Manage Pod Spreading:** Use pod anti-affinity to spread UI replicas across nodes
3. **IoT Isolation:** IoT pods are resource-heavy; consider dedicated nodes
4. **ODF Dedication:** Storage nodes should run ONLY ODF workloads (tainted)

### 7.3 QoS Classes for MAS Pods

MAS configures most pods as **Burstable** QoS:
- `requests` < `limits`
- Pod gets guaranteed minimum (requests) but can burst to limits
- This is the default and recommended for MAS

```
QoS Classes:
  Guaranteed: requests == limits (DB2 pods, some critical services)
  Burstable:  requests < limits (most MAS pods -- default)
  BestEffort: no requests/limits (NOT used in MAS)
```

### 7.4 HAProxy / Ingress Configuration for MAS

**Key settings:**
- Up to 20,000 connections per router pod
- Load balancing algorithms: source, roundrobin, random (default OCP 4.10+), leastconn
- Configure via route annotation: `haproxy.router.openshift.io/balance=roundrobin`
- Scale router replicas for high-volume IoT workloads

### 7.5 Platform-Specific PID Limits

Container PID limits vary by platform and can cause "fork bomb" issues if too low:

| Platform | Default PID Limit |
|----------|------------------|
| IBM ROKS 4.8 | 231,239 |
| AWS ROSA 4.11+ | 4,096 |
| Azure Self-Managed | 1,024 |

Configure via `/etc/crio/crio.conf` with the `pids_limit` parameter. Low PID limits on AWS/Azure can cause MAS pods (especially Manage with Liberty) to fail.

---

## 8. DEPENDENCY CHAIN: How Components Connect

### 8.1 Critical Path Dependencies

```
cert-manager
  ├── Required by: SLS, MAS Core, all HTTPS endpoints
  └── Must be installed FIRST

MongoDB
  ├── Required by: MAS Core (config storage, local user auth)
  ├── Required by: SLS (license data)
  └── Each MAS instance gets its own database in the cluster

Suite License Service (SLS)
  ├── Depends on: cert-manager, MongoDB
  ├── Required by: MAS Core (license validation)
  └── Can be shared across multiple MAS instances

Data Reporter Operator (DRO) [replaced UDS in MAS 9]
  ├── Required by: MAS Core (usage reporting)
  └── Collects metrics across all MAS applications

MAS Core
  ├── Depends on: cert-manager, MongoDB, SLS, DRO
  ├── Required by: ALL MAS applications
  └── Provides: authentication, authorization, workspace management

DB2 / Oracle / SQL Server
  ├── Required by: MAS Manage (application data)
  └── Can be internal (DB2 operator) or external

Kafka (Strimzi / AMQ Streams)
  ├── Required by: MAS IoT (message streaming)
  ├── Required by: MAS Monitor (event processing)
  └── Optional for other applications

Cloud Pak for Data (CP4D)
  ├── Required by: MAS Predict (Watson ML)
  ├── Required by: MAS Health (analytics)
  ├── Required by: MAS Assist (Watson Discovery -- note: being removed)
  └── Includes: Watson Studio, Watson ML, OpenScale, Spark
```

### 8.2 Installation Order

```
Phase 1: Platform Prerequisites
  1. OpenShift cluster provisioned
  2. Storage classes configured (ODF or NFS)
  3. cert-manager operator installed

Phase 2: Shared Data Services
  4. MongoDB Community deployed
  5. Suite License Service (SLS) deployed
  6. Data Reporter Operator (DRO) deployed

Phase 3: MAS Core
  7. IBM Maximo Operator Catalog added
  8. MAS Core operator installed
  9. Suite CR created with config references
  10. Entity managers validate all connections

Phase 4: Database
  11. DB2 operator installed (or external DB configured)
  12. JDBC configuration validated

Phase 5: Applications
  13. Manage operator installed → build → deploy
  14. IoT operator installed (requires Kafka)
  15. Monitor operator installed (requires IoT)
  16. Health/Predict installed (requires CP4D)
  17. Visual Inspection installed
  18. Other apps as needed
```

---

## 9. MAS 9 ARCHITECTURAL CHANGES

### 9.1 Key Changes from MAS 8 to MAS 9

| Area | MAS 8 | MAS 9 |
|------|-------|-------|
| Usage Reporting | UDS (User Data Services) | DRO (Data Reporter Operator) |
| Administration | Per-application admin | Suite-level centralized admin |
| User Management | Per-app user databases | Centralized user management |
| Authentication | Per-app auth flows | Centralized via CoreIDP |
| Operator Catalog | v8-YYMMDD | v9-YYMMDD |
| OCP Support | 4.12-4.14 | 4.14-4.16 |

### 9.2 Supported MAS 9 Operator Channels (as of Dec 2025)

| Operator | Channel | Latest Version |
|----------|---------|---------------|
| ibm-mas (Core) | 9.0.x | 9.0.6 |
| ibm-mas-manage | 9.0.x | 9.0.7 |
| ibm-mas-iot | 9.0.x | 9.0.4 |
| ibm-mas-monitor | 9.0.x | 9.0.4 |
| ibm-mas-visualinspection | 9.0.x | 9.0.3 |
| ibm-mas-predict | 9.0.x | 9.0.3 |
| ibm-mas-assist | 9.0.x | 9.0.3 |
| ibm-mas-optimizer | 9.0.x | 9.0.3 |
| ibm-mas-aibroker | 9.0.x | 9.0.4 |
| ibm-mas-arcgis | 9.0.x | 9.0.0 |

### 9.3 New in MAS 9: AI Broker

MAS 9 introduces the `ibm-mas-aibroker` operator -- a new application for AI-powered capabilities that coordinates between Watson AI services and MAS applications.

---

## 10. NETWORK ARCHITECTURE: How Traffic Flows

### 10.1 External Traffic Path

```
User Browser
  │
  ├── DNS: admin.mas.example.com → OpenShift VIP (Ingress)
  │
  ├── HAProxy Router (Infrastructure Node)
  │    ├── TLS termination (or passthrough)
  │    ├── Route matching: admin.{masdomain} → admin-dashboard service
  │    └── Load balancing across service endpoints
  │
  ├── Kubernetes Service (ClusterIP)
  │    └── Endpoints = pod IPs of matching selector
  │
  └── Pod: inst1-admin-dashboard
       └── Container: admin-dashboard (port 8443)
```

### 10.2 Internal Service Communication

```
coreapi Pod
  │
  ├── → MongoDB Service (port 27017)  [mongoce namespace]
  │    via: Kubernetes DNS (mongo-service.mongoce.svc.cluster.local)
  │
  ├── → SLS Service (port 443)        [ibm-sls namespace]
  │    via: licensing-mediator proxy pod
  │
  ├── → Manage internal API            [mas-inst1-manage namespace]
  │    via: internalapi service
  │
  └── → Kafka Brokers (port 9092)     [strimzi namespace]
       via: Kafka bootstrap service
```

### 10.3 Pod-to-Pod Network

```
Default Pod Network: 10.128.0.0/14
Service Network:     172.30.0.0/16
```

MAS with all standard applications deploys 800+ pods, requiring a CIDR prefix of /21 or greater for adequate IP address allocation. Plan network CIDR carefully during initial cluster installation.

---

## SOURCES

1. [IBM MAS Performance Wiki - Sizing Guidance](https://ibm-mas.github.io/mas-performance/mas/sizing/guidance/)
2. [IBM MAS Performance Wiki - OCP Best Practices](https://ibm-mas.github.io/mas-performance/mas/ocp/bestpractice/)
3. [IBM MAS Performance Wiki - Manage Best Practices](https://ibm-mas.github.io/mas-performance/mas/manage/bestpractice/)
4. [MAS CLI - Topology Reference](https://ibm-mas.github.io/cli/reference/topology/)
5. [MAS CLI - MAS Pods Explained](https://ibm-mas.github.io/cli/guides/mas-pods-explained/)
6. [IBM Documentation - MAS Pod Details](https://www.ibm.com/docs/en/masv-and-l/cd?topic=reference-maximo-application-suite-pod-details)
7. [IBM Documentation - Server Bundles](https://www.ibm.com/docs/en/masv-and-l/cd?topic=properties-server-bundles)
8. [IBM Documentation - Configuring Server Bundle Properties](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=customizing-configuring-server-bundle-properties)
9. [IBM Documentation - Sizing OCP Compute Nodes](https://www.ibm.com/docs/en/masv-and-l/continuous-delivery?topic=pi-sizing-red-hat-openshift-container-platform-compute-nodes)
10. [Red Hat Blog - IBM MAS and OpenShift](https://www.redhat.com/en/blog/ibm-maximo-application-suite-mas-and-red-hat-openshift)
11. [Interloc Solutions - MAS On-Prem Design Considerations](https://www.interlocsolutions.com/blog/ibm-maximo-application-suite-on-prem-installation-design-considerations)
12. [MAS CLI - Operator Catalog v9 (241205)](https://ibm-mas.github.io/cli/catalogs/v9-241205-amd64/)
13. [MAS Manage FAQ](https://ibm-mas-manage.github.io/faq/)
14. [MAS Manage - Single Node OpenShift](https://ibm-mas-manage.github.io/sno/)
15. [GitHub - Upgrade IBM Maximo to MAS on vSphere](https://github.com/zxue/upgrade-ibm-maximo-to-mas-on-vsphere)
16. [TRM Group - MAS Deployment Model](https://trmgroup.com/resource/path-to-mas-mas-deployment-model)
17. [LinkedIn - Containers and PODs in MAS (Mark Robbins)](https://www.linkedin.com/pulse/containers-pods-what-pod-why-important-mastechnical-mark-robbins)
18. [IBM Documentation - Configuring JMS for Manage](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=servers-configuring-jms-maximo-manage)
19. [MAS DevOps Ansible - cert_manager](https://ibm-mas.github.io/ansible-devops/roles/cert_manager/)
20. [MAS DevOps Ansible - sls](https://ibm-mas.github.io/ansible-devops/roles/sls/)
21. [MAS DevOps Ansible - mongodb](https://ibm-mas.github.io/ansible-devops/roles/mongodb/)
22. [Microsoft Azure - Deploy MAS on Azure](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/apps/deploy-ibm-maximo-application-suite)
