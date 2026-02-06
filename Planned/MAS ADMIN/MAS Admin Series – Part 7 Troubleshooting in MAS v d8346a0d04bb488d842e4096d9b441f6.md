# MAS Admin Series – Part 7: Troubleshooting in MAS vs Maximo 7.6

Priority: High
Team: Product Design
Status: Not started
Category: MAS ADMIN

### 🧪 MAS Admin Series - Part 7

### Real-World Example: Troubleshooting in MAS vs Maximo 7.6

To make the role change concrete, let us walk through a classic scenario: **integration failure**.

### How a Maximo 7.6 admin handled it

In Maximo 7.6, a typical troubleshooting flow looked like this:

- check `systemout.log` on the WebSphere server
- review any DB triggers that might be interfering with data
- restart the JVM if things looked stuck
- tweak WAS settings if performance or connections looked off
- inspect MIF queues manually inside Maximo

You had deep server and DB access, so your instinct was to:

- log into servers
- restart services
- run SQL
- change WAS configuration

### How a MAS admin handles the same problem

In MAS, you no longer have that level of server control, especially in **SaaS**. The troubleshooting pattern changes to **API-first and platform-aware**:

- check **MAS Integration Service logs** to understand the failure
- review **API response codes** and error payloads from the external system
- inspect **message reprocessing** tools to handle failed messages
- (on-prem) check **pod health** and events in OpenShift to see if relevant services are unhealthy
- review **access token issues** in Keycloak or your IAM platform
- collaborate with **IBM Support** when deeper or restricted logs are needed

### From server control to analysis and coordination

The key difference:

- In 7.6, your power came from **control** over servers and databases.
- In MAS, your power comes from **analysis**, **visibility**, and **coordination**.

You:

- interpret dashboards and logs
- understand how microservices and integrations fit together
- work with platform teams or IBM to fix underlying issues

The modern MAS admin is less a "button-clicking Maximo admin" and more an **analyst and orchestrator** in a distributed system.