# MAS Admin Series – Part 1: The Legacy Maximo Administrator Role (7.x Era)

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 📘 MAS Admin Series - Part 1

### The Legacy Maximo Administrator Role (7.x Era)

For almost two decades, Maximo administration followed a very consistent pattern. If you were a Maximo 7.x administrator, your day-to-day responsibilities likely revolved around a familiar WebSphere-centric stack.

### Traditional responsibilities

- WebSphere configuration (JVM heap, sessions, clusters)
- Deploy EAR files during upgrades
- Manage Maximo logs
- Maintain DB connections
- Use direct DB access to fix data
- Configure LDAP inside WebSphere (WAS)
- Manage cron tasks inside WebSphere
- Tune MIF queues
- Apply fix packs manually
- Manually troubleshoot performance issues
- Maintain the BIRT reporting server
- Manage custom Java deployments

This model made the Maximo admin a **server operator** and **application caretaker**:

- You owned the application server.
- You owned the JVM configuration.
- You owned the deployment pipeline for EARs and fix packs.
- You often owned the database "quick fixes."

### Why this world is disappearing

Maximo Application Suite (MAS) changes the foundation:

- No WebSphere for MAS.
- No EAR deployments.
- No traditional WAS-based LDAP.
- No single monolithic JVM to tune.

In **MAS SaaS**, almost all of this disappears.

In **MAS on-prem**, some responsibilities remain at the infrastructure layer, but they move into **OpenShift, containers, operators, and external IAM**.

This first post sets the baseline. In the next parts of the series, we will contrast this legacy role with what MAS expects from SysAdmins in both SaaS and on-prem environments.