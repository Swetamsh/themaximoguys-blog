# The Evolution of the Maximo System Administrator: How MAS Changes Everything for SaaS and On-Prem Environments

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🧭 The Evolution of the Maximo System Administrator: How MAS Changes Everything for SaaS and On-Prem Environments

For almost two decades, Maximo administration meant:

- managing WebSphere
- managing JVMs and clusters
- deploying EAR files
- maintaining DB indexes
- monitoring logs
- managing cron tasks inside WebSphere
- handling LDAP inside WAS
- troubleshooting server performance manually
- running MIF queues on the same application server

**MAS breaks nearly all of these responsibilities.**

MAS is **cloud-native, containerized, operator-driven**, and often delivered as **SaaS** - so SysAdmins must adopt:

- cloud thinking
- Kubernetes/OpenShift fundamentals
- API-based troubleshooting
- observability mindset
- zero-trust security
- infrastructure-as-code (for on-prem)
- shared responsibility model (for SaaS)

This blog explains how Maximo administrators must evolve to be effective in MAS 8/9.

---

### Section 1 - The Legacy Maximo Administrator Role (7.x Era)

For context, here is what the traditional Maximo admin world looked like. In 7.x, a SysAdmin typically owned:

- WebSphere configuration (JVM heap, sessions, clusters)
- EAR deployments during upgrades
- Maximo application logs
- DB connection configuration
- direct DB access to fix data issues
- LDAP configuration inside WebSphere
- cron task management inside WebSphere
- MIF queue tuning
- manual application of fix packs
- manual troubleshooting of performance issues
- BIRT report server administration
- management of custom Java deployments

This world is **gone in MAS SaaS** and **partially gone in MAS on-prem**. The rest of this series breaks down exactly how and what replaces it.