# MAS Admin Series – Part 4: How the SysAdmin Role Changes in MAS On-Prem

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🛡️ MAS Admin Series - Part 4

### How the SysAdmin Role Changes in MAS On-Prem

If you run MAS **on-prem** (or in your own managed cloud), the SysAdmin role retains more technical depth than SaaS, but it still changes dramatically compared to Maximo 7.x.

You now operate a **cloud-native platform** rather than a set of WebSphere servers.

### New responsibilities for MAS on-prem admins

On-prem admins step into the world of modern infrastructure and DevOps:

- **OpenShift administration**
- **pod health monitoring** and lifecycle awareness
- **operator-driven deployments** instead of manual EAR deployments
- **container-based scaling** for performance and high availability
- **certificate management** for secure communications
- **storage management** (storage classes, persistence, snapshots)
- **load balancing and ingress rules** configuration
- **secure API gateway** configuration
- **backup and restore** through OpenShift and associated tools
- **cluster performance tuning** at the node and pod level
- **observability tooling** (logs, metrics, traces)
- **infrastructure-as-code** with tools like Terraform and Helm
- **secret management** using Vault or Kubernetes secrets

This is a shift from "Maximo admin" to **platform + application admin**.

### What goes away, even on-prem

Even if you host MAS yourself, some legacy responsibilities are gone:

- no custom Java deployments into WebSphere
- no WebSphere administration at all
- no DB triggers tightly coupled to Maximo internals
- no custom MBOs deployed via EARs
- no digging through internal WAS logs for troubleshooting

Customization, extensions, and troubleshooting now happen through:

- APIs and integration services
- external services and microservices patterns
- observability tools instead of raw WAS logs

### Shared responsibility model on-prem

On-prem does not mean "one person owns everything." MAS on-prem enforces a **shared responsibility model** across multiple teams:

- DBA team
- security and IAM team
- cloud / OpenShift platform team
- network and load balancing team
- integration / middleware team
- DevOps / CI-CD team

The MAS admin becomes a **collaborator and coordinator** among these groups, making sure:

- clusters are healthy and right-sized
- security policies are implemented correctly
- integrations are reliable and observable
- upgrades and patches are coordinated across teams

This is already a bigger role than the legacy "Maximo admin" ever required. It is closer to a **site reliability engineer (SRE)** or **platform engineer** than a traditional application admin.