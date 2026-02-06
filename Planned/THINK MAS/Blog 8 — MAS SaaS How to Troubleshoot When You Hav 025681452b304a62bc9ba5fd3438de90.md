# Blog 8 — MAS SaaS: How to Troubleshoot When You Have No Backend Access

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS

# MAS SaaS Troubleshooting: When You Can't SSH Into the Server

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9 | **Part 8 of 12**  

**Read Time:** 20-25 minutes

---

<aside>
🎯

**Who this is for:** Maximo administrators, MAS SaaS operations teams, and support engineers transitioning from on-premise 7.6.x environments to MAS SaaS -- especially those who relied on SSH, direct database access, and server-side troubleshooting in the past.

</aside>

---

## 🔥 Introduction: The 3AM Call That Changed Everything

A senior Maximo administrator with 18 years of experience received an emergency call at 3:17 AM:

**Critical Issue:**

- Work order creation failing for all users
- 847 technicians unable to record completed work
- Production line maintenance grinding to halt
- Estimated downtime cost: $45,000 per hour

**His Immediate Response (Muscle Memory from 15 Years):**

```bash
# SSH into server
ssh maximo@prod-server-01

# Check Maximo logs
tail -f /opt/IBM/SMP/maximo/logs/maximo.log

# Check database connections
ps -ef | grep java | grep MAXDB

# Restart application server if needed
./[stopServer.sh](http://stopServer.sh)
./[startServer.sh](http://startServer.sh)
```

**Reality Check:**

```
Permission denied (publickey).
No SSH access to MAS SaaS environment.
```

**The Existential Crisis:**

For 18 years, his troubleshooting muscle memory was:

1. SSH to server
2. Check logs in filesystem  
3. Restart services
4. Query database directly
5. Modify config files
6. Problem solved

In MAS SaaS at 3:17 AM with production down, **none of those actions were possible**.

**What He Actually Had:**

- Web browser with MAS Admin UI
- IBM Support portal access
- Health dashboard showing "All Systems Operational" (clearly wrong)
- Growing sense of helplessness
- 847 technicians waiting
- $45K/hour burning

**The Resolution:** 2 hours and 47 minutes later, after:

- 40 minutes trying to find relevant logs in UI
- 35 minutes opening IBM Support case
- 90 minutes waiting for IBM Support response
- 2 minutes for IBM Support to identify and fix the issue server-side

**Root Cause:** Integration authentication certificate expired (server-side configuration IBM controls)

**The Lesson:** In MAS SaaS, you're not a server operator anymore. You're a **detective with limited forensic tools**, and your success depends on knowing:

- What you CAN observe
- What you CANNOT change
- How to collect evidence effectively
- When to escalate (and how to escalate well)
- How to build proactive monitoring so 3AM calls become rare

This blog teaches the new mental model for troubleshooting modern Maximo when you don't control the infrastructure.

<aside>
💡

**Key insight:** In MAS SaaS, you are not a server operator anymore. You are a detective with limited forensic tools. Your success depends on knowing what you CAN observe, what you CANNOT change, and when to escalate.

</aside>

---

## 🔍 Part 1: The SaaS Control Paradigm Shift

### What You Lose (And Why It's Actually Good)

**Direct Server Access:**

*Legacy 7.6.x Approach:*

```bash
# Full server control
ssh maximo@prod-server
sudo su - maximo
cd /opt/IBM/SMP/maximo
vim [system.properties](http://system.properties)
./[buildmaximoear.sh](http://buildmaximoear.sh)
restart application server
```

*MAS SaaS Reality:*

- No SSH access to any servers
- No filesystem access
- No ability to restart services
- No direct database connections
- No middleware configuration changes
- IBM owns infrastructure layer completely

**Why This Is Actually Good:**

1. **You Can't Break Infrastructure**: No accidental `rm -rf` in wrong directory
2. **No 3AM Server Patching**: IBM handles OS updates, security patches
3. **Expertise Where It Matters**: You focus on business logic, IBM handles containers/Kubernetes
4. **Standardized Environment**: No server configuration drift across environments
5. **Predictable Performance**: IBM maintains SLA, not your overworked infrastructure team

**Database Access:**

*Legacy 7.6.x Approach:*

```sql
-- Direct SQL queries anytime
sqlplus maxadmin/password@MAXDB

SELECT * FROM MAXIMO.MAXVARS WHERE VARNAME = 'PROBLEM';

UPDATE MAXIMO.WORKORDER 
SET STATUS = 'COMP' 
WHERE WONUM = 'STUCK12345';
COMMIT;
```

*MAS SaaS Reality:*

- No direct database access (ever)
- All data access through Maximo APIs
- Database administration handled by IBM
- Schema changes via configuration, not DDL

**Why This Is Actually Good:**

1. **No Bypassing Business Rules**: Every change goes through Maximo validation
2. **Audit Trail Intact**: All changes logged through application layer  
3. **Data Integrity Protected**: No accidental cascade deletes or wrong WHERE clauses
4. **Performance Optimized**: IBM tunes database, not your DBA who also manages 47 other systems
5. **Backup/Recovery Guaranteed**: IBM's responsibility with contractual SLA

**Middleware Configuration:**

*Legacy 7.6.x Approach:*

```xml
<!-- Edit server.xml directly -->
<connectionPool 
    maxConnections="500"
    minConnections="50"
    connectionTimeout="180"/>
    
<jvmArgs>
    -Xmx8192m -Xms4096m 
    -XX:MaxPermSize=512m
</jvmArgs>
```

*MAS SaaS Reality:*

- IBM manages OpenShift configuration
- IBM handles Kafka, MongoDB, PostgreSQL tuning
- IBM configures pod resources and scaling
- You configure Maximo application settings only

**Why This Is Actually Good:**

1. **Professional Management**: IBM's Kubernetes experts manage complex infrastructure
2. **Auto-Scaling**: Resources scale based on demand automatically
3. **High Availability**: Multi-zone deployment, automatic failover
4. **Security Hardening**: IBM applies security best practices
5. **Disaster Recovery**: IBM maintains backup sites and recovery procedures

### What You Gain (The Paradigm Shift)

**From Operator to Strategist:**

*Old Job Description:*

- Patch servers monthly
- Monitor disk space
- Restart hung processes
- Tune database queries
- Maintain backup scripts
- Document runbooks for infrastructure
- On-call rotation for server issues

*New Job Description:*

- Design robust business processes
- Configure intelligent monitoring
- Optimize integrations
- Train users effectively
- Analyze performance trends
- Build self-service capabilities
- Focus on business value, not infrastructure

**From Reactive to Proactive:**

```
Legacy Troubleshooting Model:

Problem Occurs → Get Paged → SSH to Server → 
Dig Through Logs → Restart Something → 
Hope It's Fixed → Go Back to Bed

Result: You're a human cron job

---

MAS SaaS Troubleshooting Model:

Proactive Monitoring → Anomaly Detected → 
Alert Triggered (with context) → 
Automated Triage → 
Self-Healing Where Possible →
Human Review Strategic Issues Only

Result: You're a reliability engineer
```

**From Infrastructure Focus to Business Focus:**

*Time Allocation - Legacy 7.6.x Admin:*

- 40% - Infrastructure maintenance (patching, tuning, monitoring)
- 25% - Break-fix troubleshooting
- 15% - Configuration changes
- 10% - User support
- 10% - Strategic improvements

*Time Allocation - MAS SaaS Admin:*

- 5% - Infrastructure concerns (IBM handles it)
- 15% - Strategic troubleshooting (high-value issues)
- 20% - Configuration and optimization
- 25% - User enablement and training
- 35% - Business process improvement and innovation

### The Three Control Layers

Understanding what you control vs. what IBM controls is crucial:

```
┌─────────────────────────────────────────┐
│  LAYER 1: YOUR FULL CONTROL             │
├─────────────────────────────────────────┤
│  • Maximo configuration (apps, domains) │
│  • Automation scripts                   │
│  • Workflow design                      │
│  • User management and security groups  │
│  • Integration configurations(your side)│
│  • Report and dashboard design          │
│  • Mobile app configuration             │
│  • Business object structures           │
└─────────────────────────────────────────┘
         ↓ YOU TROUBLESHOOT HERE ↓

┌─────────────────────────────────────────┐
│  LAYER 2: SHARED MONITORING             │
├─────────────────────────────────────────┤
│  • Application logs (via UI)            │
│  • Health dashboards                    │
│  • Integration monitoring               │
│  • Cron task execution status           │
│  • User session information             │
│  • Performance metrics (high-level)     │
└─────────────────────────────────────────┘
     ↓ YOU OBSERVE, IBM CAN FIX ↓

┌─────────────────────────────────────────┐
│  LAYER 3: IBM EXCLUSIVE CONTROL         │
├─────────────────────────────────────────┤
│  • OpenShift infrastructure             │
│  • Database administration              │
│  • Network configuration                │
│  • Security certificates and keys       │
│  • Pod scaling and resource allocation  │
│  • Backup and disaster recovery         │
│  • Operating system patches             │
└─────────────────────────────────────────┘
          ↓ ONLY IBM CAN FIX ↓
```

**Critical Troubleshooting Implication:**

Your troubleshooting strategy MUST start by classifying the issue into one of these layers:

- **Layer 1 Issue**: You fix it yourself (automation script error, workflow misconfiguration)
- **Layer 2 Issue**: You diagnose, document evidence, may need IBM assistance
- **Layer 3 Issue**: You provide symptoms, IBM troubleshoots infrastructure

<aside>
🔑

**Key insight:** The three-layer control model is your troubleshooting compass. Always classify the issue first: Layer 1 you fix in minutes, Layer 2 you diagnose, Layer 3 you escalate with evidence. Misclassification wastes time on both sides.

</aside>

---

## 🛠️ Part 2: The Strategic Troubleshooting Framework

### Phase 1: Classify the Issue (First 5 Minutes)

**The Classification Matrix:**

| Question | Answer | Implication |
| --- | --- | --- |
| **Who is affected?** | Single user | Likely: User permission, browser issue, user error |
|  | Single site/org | Likely: Site-specific configuration, data issue |
|  | All users | Likely: System-wide issue, integration failure, infrastructure |
| **What is the symptom?** | Slow performance | Could be: Database query, integration lag, infrastructure load |
|  | Error message | Likely: Configuration issue, validation error, integration failure |
|  | Missing data | Likely: Integration issue, cron task failure, sync problem |
|  | Can't login | Likely: IAM/SSO issue, certificate, infrastructure |
| **When did it start?** | After recent change | Likely: Configuration change, deployment issue |
|  | Gradually over time | Likely: Data volume growth, performance degradation |
|  | Suddenly | Likely: External dependency failure, infrastructure |
| **Where does it occur?** | Specific screen/app | Likely: Application configuration, script error |
|  | During integration | Likely: Integration configuration, external system |
|  | System-wide | Likely: Infrastructure, authentication, database |

**Decision Tree:**

```
START: Issue reported
    ↓
[Q1] Is it affecting ONE user or ALL users?
    │
    ├── ONE USER → Check user profile, security groups, browser
    │              → Resolution likely in minutes
    │              → YOU CAN FIX (Layer 1)
    │
    └── ALL USERS → Continue to Q2
                    ↓
[Q2] Can you reproduce in TEST environment?
    │
    ├── YES → Configuration/data issue
    │         → Investigate Layer 1 (your config)
    │         → YOU CAN LIKELY FIX
    │
    └── NO → Environment-specific issue
              → Continue to Q3
                    ↓
[Q3] Do logs show errors or just symptoms?
    │
    ├── ERRORS VISIBLE → Application layer issue
    │                   → Analyze logs (Layer 2)
    │                   → YOU DIAGNOSE
    │
    └── NO ERRORS → Infrastructure/external issue
                     → Gather evidence
                     → ESCALATE TO IBM
                    ↓
[Q4] Is this PRODUCTION CRITICAL?
    │
    ├── YES → Open Severity 1 case immediately
    │         → IBM response: 1 hour
    │         → Executive notification
    │
    └── NO → Follow standard troubleshooting
              → Collect evidence systematically
              → Open appropriate severity case
```

### Phase 2: Gather Evidence (First 15 Minutes)

**The Evidence Collection Checklist:**

**1. User Impact Evidence:**

```
☐ Number of affected users (exact count)
☐ Business process impact (which processes stopped?)
☐ Financial impact estimate ($/hour)
☐ Workaround availability (yes/no/partial)
☐ User error messages (exact text + screenshots)
☐ Time issue first reported
☐ Time issue first observed in monitoring
```

**2. System Evidence:**

```
☐ Recent changes (deployments, config changes, user actions)
☐ Application logs (filtered to timeframe)
☐ Integration logs (inbound/outbound messages)
☐ Cron task execution logs
☐ Performance metrics (response times, throughput)
☐ Health dashboard status
☐ Active user sessions count
```

**3. Configuration Evidence:**

```
☐ Affected automation scripts (names, last modified)
☐ Integration endpoints (URLs, status)
☐ User security groups (affected users)
☐ Object structure configurations
☐ Domain value changes (recent)
☐ Workflow definitions (if workflow-related)
```

**4. Reproduction Evidence:**

```
☐ Step-by-step reproduction in TEST (document exact steps)
☐ Can you reproduce with different user? (yes/no)
☐ Can you reproduce in different browser? (yes/no)
☐ Does clearing browser cache help? (yes/no)
☐ Time to reproduce (every time / intermittent)
```

**Evidence Quality Matters:**

*Poor Evidence (Will Slow Resolution):*

- "Users are complaining about slowness"
- "Something is broken"
- "It was working yesterday"
- "Can you look into this?"

*Good Evidence (Accelerates Resolution):*

- "47 users in DALLAS site unable to create work orders since 09:15 EST"
- "Error: BMXAA4105E - Validation error on WORKORDER object, field WOPRIORITY"
- "Reproduced in TEST with user JOHNDOE using Chrome 120 on Windows"
- "Integration endpoint [https://erp.company.com/api/po](https://erp.company.com/api/po) returning HTTP 401 since 09:12"
- "Automation script WO_VALIDATION modified by ADMIN01 at 08:45 this morning"

### Phase 3: Respond Based on Layer

**Layer 1 Response (YOUR CONTROL):**

*Examples:*

- Automation script error
- Workflow misconfiguration
- User security group missing permission
- Domain value incorrectly defined
- Object structure missing child object

*Your Actions:*

1. Fix the configuration
2. Test in TEST environment first
3. Deploy to PRODUCTION
4. Validate fix with affected users
5. Document in knowledge base
6. Update monitoring to catch similar issues

*Time to Resolution:* Minutes to hours (you control it)

**Layer 2 Response (SHARED MONITORING):**

*Examples:*

- Integration timing out
- Cron task failing intermittently
- Performance degradation
- Error messages in logs but unclear cause

*Your Actions:*

1. Collect comprehensive evidence (all 4 categories above)
2. Analyze patterns (intermittent? specific times? specific data?)
3. Check external dependencies (integration endpoints, external systems)
4. Review recent changes (yours and IBM's)
5. Determine if this is Layer 1 (your config) or Layer 3 (IBM infrastructure)
6. If Layer 1: Fix it
7. If Layer 3: Open IBM case with all evidence

*Time to Resolution:* Hours (depends on root cause location)

**Layer 3 Response (IBM CONTROL):**

*Examples:*

- Authentication failures (IAM/SSO)
- Certificate expiration
- Database connection pool exhausted
- Pod crashing and restarting
- Network connectivity issues
- Infrastructure performance problems

*Your Actions:*

1. Collect evidence immediately
2. Open IBM Support case (appropriate severity)
3. Provide evidence in structured format
4. Implement workaround if available
5. Communicate with business stakeholders
6. Monitor IBM case progress
7. Escalate if needed
8. Document resolution for future reference

*Time to Resolution:* Hours to days (IBM controls it)

### Phase 4: Escalate Effectively

**When to Escalate to IBM Support:**

*Immediate Escalation (Severity 1):*

- Production system completely down
- Data corruption or data loss
- Security breach
- Multiple critical business processes stopped
- Financial impact >$50K/hour
- Safety implications

*Same-Day Escalation (Severity 2):*

- Major business process degraded (not stopped)
- Significant performance degradation
- Integration failures affecting operations
- Workaround available but not sustainable
- Financial impact $10K-$50K/hour

*Standard Escalation (Severity 3):*

- Minor functionality not working
- Cosmetic issues
- Questions about configuration
- Documentation clarifications
- Financial impact <$10K/hour

**IBM Support Case Structure:**

*Subject Line (Critical):*

```
BAD: "Need help with issue"
BAD: "System slow"
BAD: "Error occurred"

GOOD: "[SEVERITY 1] PROD - All users unable to create work orders - BMXAA4105E error"
GOOOD: "[SEVERITY 2] PROD - Integration to ERP timing out - 200+ failed messages"
GOOD: "[SEVERITY 3] TEST - Question about automation script execution order"
```

*Case Description Template:*

```
**ENVIRONMENT:**
- MAS Version: 8.11.x
- Application: Manage
- Environment: PRODUCTION / TEST

**BUSINESS IMPACT:**
- Affected Users: [exact count or "all users"]
- Affected Process: [specific business process]
- Financial Impact: [$X/hour or N/A]
- Workaround Available: [Yes/No - if yes, describe]

**SYMPTOM:**
- What: [exact description of what's not working]
- When: [exact time started, timezone]
- Where: [which screen/integration/process]
- Who: [which users/sites/orgs]

**ERROR MESSAGES:**
[Exact error text, error codes, screenshots]

**REPRODUCTION STEPS:**
1. [Exact step 1]
2. [Exact step 2]
3. [Exact step 3]
Expected Result: [what should happen]
Actual Result: [what actually happens]

**EVIDENCE COLLECTED:**
- Application logs: [attached / paste relevant entries]
- Integration logs: [attached / paste relevant entries]
- Screenshots: [attached]
- Network traces: [if applicable]
- Configuration exports: [if applicable]

**RECENT CHANGES:**
- [List any changes made in last 48 hours]
- [Include changes by your team AND IBM maintenance windows]

**TROUBLESHOOTING ALREADY PERFORMED:**
1. [What you've already tried]
2. [Results of each attempt]
3. [Current hypothesis]

**REQUESTED ASSISTANCE:**
[Specific ask - not "please help" but "Need IBM to verify certificate configuration for integration endpoint XYZ"]
```

---

## 📊 Part 3: Observability Tools and Techniques

### MAS Admin UI: Your Primary Interface

**Navigation:**

```
MAS Admin Console:
  ├─ Suite Administration
  │   ├─ Users
  │   ├─ API Keys  
  │   ├─ Settings
  │   └─ Activation
  │
  ├─ Workspace Administration
  │   ├─ Applications (Manage, Health, etc.)
  │   ├─ Health Checks
  │   ├─ Integration
  │   └─ Monitoring
  │
  └─ Application Administration (per app)
      ├─ System Properties
      ├─ Logging
      ├─ Cron Tasks
      └─ Integration Framework
```

**Health Dashboard Usage:**

Location: `MAS Admin > Workspace > Health`

*What It Shows:*

- Overall workspace health status
- Individual application status (Manage, Health, Predict, etc.)
- Database connectivity
- Integration health
- License consumption
- Recent alerts and notifications

*What It DOESN'T Show:*

- Root cause of issues (just symptoms)
- Detailed logs (need to go to Logging)
- Infrastructure layer issues (OpenShift, pods)
- Historical trends (point-in-time view)

*Best Practices:*

1. Check daily (proactive, not reactive)
2. Set up email notifications for health changes
3. Don't rely solely on health dashboard
4. Supplement with your own monitoring

### Application Logging

**Accessing Logs:**

Location: `Application Administration > Logging`

*Available Log Sources:*

- **Maximo Application Logs**: Business logic, automation scripts, workflows
- **Integration Logs**: Inbound/outbound messages, transformations
- **Cron Task Logs**: Scheduled job execution, results
- **Authentication Logs**: Login attempts, SSO, session management

*Log Level Configuration:*

```
Log Levels (most to least verbose):
TRACE > DEBUG > INFO > WARN > ERROR > FATAL

Production Recommendation:
- Default: INFO
- Troubleshooting: DEBUG (temporarily)
- Critical Investigation: TRACE (very short duration)

Never leave DEBUG or TRACE in production long-term:
- Excessive log volume
- Performance impact  
- Storage consumption
- Sensitive data exposure risk
```

**Strategic Log Analysis:**

*Don't Do This:*

```
# Stare at logs scrolling by hoping to see something
# Download 500MB of logs with no filter
# Search for "error" (too generic)
```

*Do This Instead:*

```
1. Filter by timeframe (exact window when issue occurred)
2. Filter by user (if single-user issue)
3. Filter by severity (ERROR, FATAL only)
4. Search for specific error codes (BMXAA4105E)
5. Search for specific object/process (WORKORDER, SR)
6. Look for patterns (same error repeating?)
7. Check timestamps (does timing reveal anything?)
8. Correlate with integration logs
```

*Example Effective Search:*

```
Timeframe: 2025-01-13 09:00 - 09:30
Severity: ERROR, FATAL
Keyword: "WORKORDER" AND "BMXAA"
User: JOHNDOE

Result: 14 log entries
Pattern: All showing BMXAA4105E on field WOPRIORITY
Root Cause: Domain validation added this morning
Fix: Remove invalid domain value "ULTRA-HIGH"
```

### Integration Monitoring

**External Integration Patterns:**

MAS SaaS typically integrates with external systems using:

1. **REST APIs**: Maximo calls external REST endpoints
2. **Kafka**: Event-driven messaging
3. **IBM App Connect / IICS**: Enterprise integration platform
4. **File-based**: SFTP, object storage

**Monitoring Each Integration Type:**

**REST API Integrations:**

```
What to Monitor:
☐ Endpoint availability (can you reach it?)
☐ Response times (how fast?)
☐ Error rates (% of failures)
☐ Authentication (tokens expiring?)
☐ Rate limits (hitting throttles?)
☐ Payload size (too large?)
☐ SSL certificate validity

Troubleshooting Steps:
1. Test endpoint from external tool (Postman, curl)
2. Check authentication token validity
3. Verify payload format matches contract
4. Review integration logs for exact error
5. Contact external system owner if needed
```

**Kafka Integrations:**

```
What to Monitor:
☐ Message production rate (msg/sec)
☐ Consumer lag (messages waiting)
☐ Failed message count
☐ Topic partition distribution
☐ Connection status to Kafka cluster

Troubleshooting Steps:
1. Check consumer lag (growing = problem)
2. Review dead letter queue
3. Verify topic configuration
4. Test with simple message
5. Engage Kafka admin if infrastructure issue
```

**IBM App Connect (IICS):**

```
What to Monitor:
☐ Integration flow execution status
☐ Error messages in flow logs
☐ Message throughput
☐ Transformation errors
☐ Connection health to source/target

Troubleshooting Steps:
1. Access App Connect UI separately
2. Review flow execution history
3. Check connection credentials
4. Test with sample payload
5. Review transformation mappings
```

### Cron Task Monitoring

**Critical Cron Tasks to Monitor:**

Many issues stem from failed cron tasks:

| Cron Task | Purpose | Impact if Failed |
| --- | --- | --- |
| **ESCALATION** | Escalate overdue work orders | Work orders not escalated, SLA breaches |
| **PMWOGEN** | Generate PM work orders | Preventive maintenance not created |
| **RESWORKORDER** | Calculate KPIs | Dashboards show stale data |
| **PURGEJMSQUEUE** | Clean JMS queues | Integration queues grow, performance degrades |
| **PURGEOSI** | Clean object structure cache | Cache grows, performance degrades |
| **SENDMESSAGES** | Send queued email/notifications | Users don't receive critical notifications |

**Monitoring Approach:**

Location: `System Configuration > Platform Configuration > Cron Task Setup`

```
Daily Checks:
☐ Review last execution time for critical crons
☐ Check execution duration (increasing = problem brewing)
☐ Review "Last Run Status" (SUCCESS / FAILED)
☐ Check instance history for failures

Weekly Review:
☐ Analyze execution patterns (getting slower?)
☐ Review error log entries
☐ Optimize schedules if conflicts exist
☐ Document any recurring issues
```

**Common Cron Task Issues:**

*Issue: Cron runs but completes with errors*

Troubleshooting:

1. Check cron instance history for error messages
2. Review application logs during cron execution window
3. Check if data issue (bad records causing failure)
4. Test cron logic with subset of data
5. Review automation scripts called by cron

*Issue: Cron takes longer and longer to complete*

Troubleshooting:

1. Review data volume growth
2. Check for missing database indexes
3. Analyze SQL queries in cron logic
4. Consider scheduling optimization
5. Escalate to IBM if database performance issue

*Issue: Crons conflicting (overlapping execution)*

Troubleshooting:

1. Review cron schedules for overlaps
2. Adjust schedules to eliminate conflicts
3. Consider running in different maintenance windows
4. Review instance count (parallel execution)
5. Stagger start times

---

## 🔧 Part 4: Common SaaS Troubleshooting Scenarios

### Scenario 1: "Everything is Slow"

**Symptom:**

- Users reporting slow screen loads
- Work order list takes 30+ seconds
- Save operations timing out
- Mobile sync failures

**Troubleshooting Path:**

**Step 1: Scope the Problem**

```
Questions to Answer:
☐ All users or specific users?
☐ All screens or specific screens?
☐ Started suddenly or gradual?
☐ Reproducible in TEST?
☐ Same experience on different networks?
```

**Step 2: Check Your Layer (Layer 1)**

```
Potential Causes in Your Control:
☐ Inefficient automation scripts
☐ Complex object structures
☐ Unbounded queries (no where clause limits)
☐ Too many related records loaded
☐ Large attachments being retrieved

Actions:
1. Review automation scripts on slow screens
2. Check object structure definitions
3. Review query performance in logs
4. Test with user having minimal data
5. Clear browser cache and test
```

**Step 3: Check Monitoring Layer (Layer 2)**

```
Potential Causes in Monitoring:
☐ Database query performance degradation
☐ Integration timeout cascade
☐ Cron tasks running during business hours
☐ High user concurrency

Actions:
1. Check health dashboard
2. Review application logs for slow queries
3. Check cron task schedules
4. Review user session count
5. Check integration response times
```

**Step 4: Escalate if Infrastructure (Layer 3)**

```
Potential Causes Requiring IBM:
☐ Database connection pool issues
☐ Pod resource constraints
☐ Network latency
☐ Storage performance

Actions:
1. Collect evidence:
   - Exact response times
   - Browser network timing
   - User count and locations
   - Time patterns (worse at certain times?)
2. Open IBM case with evidence
3. Implement temporary workarounds:
   - Reduce data retrieved
   - Limit concurrent users (if possible)
   - Reschedule cron tasks
```

### Scenario 2: Integration Failures

**Symptom:**

- Work orders not flowing to/from external system
- Error messages about integration
- Data missing in Maximo or target system
- Integration logs showing failures

**Troubleshooting Path:**

**Step 1: Identify Integration Type**

```
Integration Architecture:
☐ REST API (Maximo ↔ External System)
☐ Kafka Event Bus
☐ IBM App Connect
☐ File-based (SFTP)
☐ Custom integration (automation script)
```

**Step 2: Check External System First**

```
Often the issue is NOT in Maximo:
☐ External system down for maintenance?
☐ API endpoint changed/deprecated?
☐ Authentication credentials expired?
☐ Network firewall rule changed?
☐ Rate limits hit?

Actions:
1. Contact external system owner
2. Test endpoint independently (Postman/curl)
3. Review external system status page
4. Check authentication token validity
5. Verify network connectivity
```

**Step 3: Check Your Configuration (Layer 1)**

```
Potential Causes in Your Control:
☐ Endpoint URL incorrect
☐ Authentication misconfigured
☐ Object structure missing fields
☐ Transformation logic error
☐ Validation rules too strict

Actions:
1. Review integration endpoint configuration
2. Test with sample payload
3. Check object structure completeness
4. Review automation script logic
5. Check for recent configuration changes
```

**Step 4: Analyze Integration Logs**

```
Location: Integration Framework > Message Tracking

Look For:
☐ Inbound messages: Are they arriving?
☐ Processing status: Success / Failed / Queued
☐ Error messages: Exact error text
☐ Outbound messages: Are they sending?
☐ Response codes: HTTP 200 / 401 / 500 etc.

Common Error Patterns:
- HTTP 401: Authentication failure
- HTTP 404: Endpoint not found (URL wrong)
- HTTP 429: Rate limit exceeded
- HTTP 500: External system error
- HTTP 503: External system unavailable
- Timeout: Network issue or slow response
```

**Step 5: Escalate if Needed**

```
Escalate to IBM if:
☐ Integration infrastructure issue (Kafka, App Connect)
☐ Certificate/SSL issues
☐ Network connectivity from MAS side
☐ Integration framework bug

Provide to IBM:
- Integration name and type
- Error messages from logs
- External system contact information
- Recent changes (yours and theirs)
- Test results from independent tools
```

### Scenario 3: User Cannot Login

**Symptom:**

- User cannot access MAS
- Authentication error
- Redirect loop
- SSO failure

**Troubleshooting Path:**

**Step 1: Narrow Scope**

```
☐ Single user or multiple users?
☐ All authentication methods or specific (SSO vs local)?
☐ Started after recent change?
☐ Can user login to other systems?
☐ Specific browser or all browsers?
```

**Step 2: Check User Configuration (Layer 1)**

```
If single user issue:
☐ User account exists?
☐ User account active (not disabled)?
☐ User in correct security groups?
☐ User assigned to workspace?
☐ User password expired (if local auth)?

Actions:
1. Verify user account in MAS Admin > Users
2. Check security group membership
3. Verify workspace assignment
4. Reset password if needed
5. Test with different user in same role
```

**Step 3: Check Authentication Configuration (Layer 2/3)**

```
If multiple users or SSO issue:
☐ SSO provider (IAM, Keycloak) functioning?
☐ Certificate validity?
☐ SAML/OIDC configuration correct?
☐ Network connectivity to SSO provider?
☐ Recent SSO provider changes?

Actions:
1. Check health dashboard (authentication status)
2. Review authentication logs
3. Test SSO with different user
4. Contact SSO provider/admin
5. Check certificate expiration dates
```

**Step 4: Browser Issues**

```
Often browser-related:
☐ Cookies blocked?
☐ Browser cache corrupted?
☐ Browser extensions interfering?
☐ Private/incognito mode?

Actions:
1. Clear browser cache and cookies
2. Disable browser extensions
3. Try different browser
4. Try incognito/private mode
5. Check browser console for errors
```

**Step 5: Escalate if Infrastructure**

```
Escalate to IBM if:
☐ IAM/Keycloak service down
☐ Certificate issues (IBM managed)
☐ SAML/OIDC configuration (IBM side)
☐ Multiple users affected system-wide

Provide to IBM:
- Number of affected users
- Authentication method (SSO provider)
- Error messages from user browser
- Authentication logs from timeframe
- Network traces if available
- Recent changes to SSO configuration
```

### Scenario 4: Automation Script Errors

**Symptom:**

- Error message referencing script
- Validation failing
- Unexpected behavior
- Script not executing

**Troubleshooting Path:**

**Step 1: Identify the Script**

```
Information Needed:
☐ Script name
☐ Object/event triggering script
☐ Error message (exact text)
☐ User and context when error occurred
```

**Step 2: Review Script (Layer 1 - YOU FIX)**

```
Location: System Configuration > Platform Configuration > Automation Scripts

Check:
☐ Script active?
☐ Correct launch point?
☐ Variables defined correctly?
☐ Recent modifications?
☐ Syntax errors?

Actions:
1. Open script in script editor
2. Review recent change history
3. Check for syntax errors
4. Test with script debugger
5. Add logging statements
```

**Step 3: Test in Isolation**

```
Test Script Independently:
1. Create test data matching scenario
2. Enable DEBUG logging for script
3. Execute script via test harness
4. Review logs for detailed error
5. Fix issues iteratively
```

**Step 4: Common Script Issues**

```
Typical Problems:
☐ Null pointer exceptions (check for null before use)
☐ Variable scope issues
☐ Relationship traversal errors
☐ Implicit relationship issues
☐ Service call failures

Solutions:
1. Add null checks: if (mbo.isNull("FIELD"))
2. Use correct variable scope (scriptOnly vs record-level)
3. Verify relationships exist before traversing
4. Use explicit relationship syntax
5. Add error handling for service calls
```

**Step 5: Performance Optimization**

```
If Script Slow:
☐ Minimize database queries in loops
☐ Use set-based operations
☐ Cache lookups
☐ Avoid repeated relationship traversal
☐ Use SQL where clause instead of filtering in script
```

---

## 🔮 Part 5: Proactive Monitoring Strategy

### The Four Pillars of Proactive Monitoring

**Pillar 1: User Experience Monitoring**

*What to Monitor:*

```
☐ Page load times (threshold: >3 seconds = warning)
☐ Work order save duration (threshold: >5 seconds)
☐ Search response times
☐ Mobile sync success rate (target: >98%)
☐ Login success rate (target: >99.5%)
☐ Error rate per user session
```

*How to Monitor:*

- Real user monitoring (RUM) if available
- Synthetic transactions (automated test scripts)
- User satisfaction surveys
- Help desk ticket analysis
- Application logs analysis

*Action Triggers:*

```
Yellow Alert:
- Page load >3s for 10 consecutive minutes
- Error rate >2% for single hour
- Mobile sync success <98% daily

Red Alert:
- Page load >10s
- Error rate >5%
- Any user unable to login
- Mobile sync success <90%
```

**Pillar 2: Integration Health Monitoring**

*What to Monitor:*

```
☐ Integration message volume (baseline + variance)
☐ Integration success rate (target: >99%)
☐ Integration latency (baseline + threshold)
☐ Failed message queue depth
☐ External endpoint availability
```

*How to Monitor:*

- Integration logs analysis
- External endpoint monitoring tools
- Message queue monitoring
- IBM App Connect dashboards (if used)
- Custom monitoring scripts

*Action Triggers:*

```
Yellow Alert:
- Success rate 95-99%
- Latency 2x baseline
- Failed message queue >10
- External endpoint 1 failure in 5 minutes

Red Alert:
- Success rate <95%
- Latency >10x baseline
- Failed message queue >100
- External endpoint sustained failures
```

**Pillar 3: Business Process Health**

*What to Monitor:*

```
☐ Work order creation rate (detect drops)
☐ Work order completion rate
☐ PM generation success
☐ Critical cron task execution
☐ Escalation processing
☐ Approval workflows
```

*How to Monitor:*

- KPI dashboards (daily review)
- Cron task history
- Maximo database queries (scheduled reports)
- Exception reports (daily)

*Example Monitoring Query:*

```sql
-- Work Orders Created Today (should match baseline)
SELECT COUNT(*) as WO_COUNT
FROM WORKORDER
WHERE CREATEDDATE >= TRUNC(SYSDATE)

-- Compare to 7-day average:
-- If today < (7-day-avg * 0.8) = RED ALERT
-- If today < (7-day-avg * 0.9) = YELLOW ALERT
```

*Action Triggers:*

```
Yellow Alert:
- WO creation rate 10-20% below baseline
- Critical cron task delayed >1 hour
- Escalation processing 10-20% below expected

Red Alert:
- WO creation rate >20% below baseline
- Critical cron task failed
- Escalation processing stopped
- PM generation failed
```

**Pillar 4: System Health Monitoring**

*What to Monitor:*

```
☐ MAS health dashboard status (automated check)
☐ Application log error count
☐ Active user session count
☐ License consumption
☐ Storage utilization (if visible)
```

*How to Monitor:*

- MAS health dashboard API (if available)
- Application log aggregation
- Custom monitoring scripts
- IBM-provided monitoring tools

*Action Triggers:*

```
Yellow Alert:
- Health dashboard shows "warning"
- Error log rate >10/minute sustained
- Active sessions >80% of typical peak
- License consumption >85%

Red Alert:
- Health dashboard shows "error"
- Error log rate >50/minute
- Active sessions causing performance impact
- License consumption >95%
```

### Building Your Monitoring Dashboard

**Essential Metrics Dashboard (Daily Review):**

```
┌────────────────────────────────────────┐
│        MAXIMO SaaS HEALTH DASHBOARD       │
├────────────────────────────────────────┤
│ USER EXPERIENCE               Status   │
│ ────────────────────────────────────── │
│ Active Users:          247    ✅      │
│ Avg Page Load:         2.3s   ✅      │
│ Error Rate:            0.8%   ✅      │
│ Mobile Sync Success:   99.1%  ✅      │
├────────────────────────────────────────┤
│ INTEGRATIONS                  Status   │
│ ────────────────────────────────────── │
│ ERP Integration:       99.4%  ✅      │
│ HR Integration:        97.2%  ⚠️      │
│ IoT Integration:       100%   ✅      │
│ Failed Messages:       3      ✅      │
├────────────────────────────────────────┤
│ BUSINESS PROCESSES            Status   │
│ ────────────────────────────────────── │
│ WOs Created Today:     142    ✅      │
│ PMs Generated:         87     ✅      │
│ Critical Crons:        All OK ✅      │
│ Escalations:           12     ✅      │
├────────────────────────────────────────┤
│ SYSTEM HEALTH                 Status   │
│ ────────────────────────────────────── │
│ MAS Health:            Green  ✅      │
│ Error Log Rate:        4/min  ✅      │
│ License Usage:         67%    ✅      │
│ Last IBM Maintenance:  3 days ✅      │
└────────────────────────────────────────┘

⚠️ = Investigate
✅ = Healthy
❌ = Critical - Immediate Action Required
```

### Alert Fatigue Prevention

**The Problem with Too Many Alerts:**

*Anti-Pattern:*

- 500+ alerts per day
- 98% false positives
- Team ignores all alerts
- Real issues buried in noise
- Alert fatigue leading to missed critical events

*Best Practice:*

- <10 alerts per day
- 90%+ actionable alerts
- Clear severity levels
- Automated triage where possible
- Escalation path defined

**Alert Design Principles:**

1. **Every Alert Must Be Actionable**
    - Bad: "Database query took 2.1 seconds" (so what?)
    - Good: "Critical business process stalled - PM generation not completing"
2. **Severity Must Match Impact**
    - Critical: Production down, business stopped
    - Warning: Degraded performance, workaround available
    - Info: Anomaly detected, monitoring recommended
3. **Alerts Should Include Context**
    - Bad: "Integration error"
    - Good: "ERP integration failing - 47 work orders not created - error: HTTP 401 authentication"
4. **Alerts Should Suggest Action**
    - Bad: "System slow"
    - Good: "System slow - Page load >5s - Check: recent config changes, cron task conflicts, integration timeouts"

<aside>
💡

**Key insight:** Design for fewer than 10 actionable alerts per day, not 500+ noisy ones. Every alert must be actionable, appropriately severe, include context, and suggest next steps. Alert fatigue is how real incidents get missed.

</aside>

---

## 🤝 Part 6: Working Effectively with IBM Support

### Understanding IBM Support Structure

**IBM Support Tiers:**

```
Tier 1: Initial Contact
- Basic troubleshooting
- Known issue identification
- Documentation reference
- Escalation to Tier 2 if needed
Response Time: Within SLA (1-48 hours based on severity)

Tier 2: Technical Support
- Advanced troubleshooting
- Log analysis
- Configuration review
- Escalation to Development if needed
Response Time: Varies (same-day to days)

Tier 3: Development/Engineering
- Code-level investigation
- Potential product defects
- Enhancement requests
- Patch development if needed
Response Time: Days to weeks
```

**Severity Levels and Response Times:**

| Severity | Definition | IBM Response | Update Frequency |
| --- | --- | --- | --- |
| **Severity 1** | Production down, business stopped | 1 hour | Every 2 hours |
| **Severity 2** | Major function impaired | 2 business hours | Every 8 hours |
| **Severity 3** | Minor impact, workaround available | 4 business hours | 1-2 days |
| **Severity 4** | Question, enhancement request | 1 business day | As needed |

**Setting Appropriate Severity:**

*Severity 1 Examples:*

- All users cannot login
- Work order creation failing for all users
- Database corruption or data loss
- Integration down affecting production operations
- Security breach

*Severity 2 Examples:*

- Significant performance degradation
- Major integration intermittently failing
- Critical workflow not functioning
- Mobile sync failing for most users

*Severity 3 Examples:*

- Single user cannot access specific screen
- Report not displaying correctly
- Minor UI cosmetic issue
- Question about configuration

*Severity 4 Examples:*

- Enhancement request
- Documentation clarification
- General question about functionality
- Training request

**Don't Cry Wolf:**

Setting inappropriate severity damages your credibility:

- Severity 1 for minor cosmetic issue → IBM won't take you seriously next time
- Consistently over-escalating → Your cases get delayed
- Under-reporting genuine emergencies → Slow response when you need it

### Case Quality Checklist

Before submitting to IBM, ensure:

```
☐ Subject line clearly describes issue
☐ Environment specified (PROD / TEST)
☐ Business impact quantified
☐ Exact error messages included
☐ Reproduction steps documented
☐ Logs attached (filtered to relevant timeframe)
☐ Screenshots attached
☐ Configuration exports attached (if relevant)
☐ Recent changes documented
☐ Troubleshooting already performed documented
☐ Specific request for IBM action stated
```

**Case Quality Examples:**

*Poor Quality Case:*

```
Subject: Need help

Description:
Our system is slow. Can you please look into it?

Result:
- IBM asks 10 clarifying questions
- Back-and-forth for days
- Frustration on both sides
- Delayed resolution
```

*High Quality Case:*

```
Subject: [SEV 2] PROD - Work order list page load >30 seconds - All users affected

Description:
ENVIRONMENT:
- MAS 8.11.7
- Maximo Manage
- Production Environment

BUSINESS IMPACT:
- All 450 users affected
- Work order list page load time: 30-45 seconds (normal: 2-3 seconds)
- Productivity severely impacted
- Estimated impact: $15K/hour
- No workaround available

SYMPTOM:
- Started: 2025-01-13 14:30 EST
- All users experiencing slowness
- Work order list specifically affected
- Other screens loading normally
- Issue persists in TEST environment

ERROR MESSAGES:
- No explicit errors in UI
- Application logs show: "SQL query execution time 28.4 seconds"
- Database logs (from IBM): Not accessible to us

REPRODUCTION:
1. Login as any user
2. Navigate to Work Order Tracking
3. Click "Work Order List"
4. Observe 30+ second load time

EVIDENCE:
- Application logs: Attached (filtered 14:00-15:00)
- Browser network timing: Attached screenshot
- User count at time of issue: 287 active sessions
- Slow query identified: WORKORDER table fetch

RECENT CHANGES:
- No configuration changes by our team in 48 hours
- IBM maintenance window: 2025-01-12 02:00-04:00 EST
- Possible correlation?

TROUBLESHOOTING PERFORMED:
1. Cleared browser cache: No improvement
2. Tested with different users: All affected
3. Checked cron tasks: No conflicts
4. Reviewed automation scripts: None on this screen
5. Tested in TEST environment: Same issue
6. Reviewed object structure: No recent changes

REQUEST:
Please investigate database performance. Suspect database change during maintenance window. Need database query execution plan analysis and potential index optimization.

Result:
- IBM immediately understands issue
- Escalated to database team
- Root cause identified: Missing index after maintenance
- Resolved in 2 hours
```

### Escalation Strategy

**When to Escalate Within IBM:**

Escalate your case when:

- No response within SLA
- No meaningful progress after 48 hours (Sev 2)
- IBM requesting information you've already provided
- IBM not understanding severity/urgency
- Proposed solution doesn't address root cause

**How to Escalate:**

1. **Comment on Existing Case First**
    
    ```
    "This case was opened 36 hours ago as Severity 2.
    We have not received any substantive response.
    Business impact continues: $15K/hour loss.
    Request immediate escalation to management."
    ```
    
2. **Contact Your IBM Account Team**
    - Technical Account Manager (TAM) if you have one
    - Client Success Manager
    - Sales representative
3. **Use IBM Support Portal Escalation**
    - "Request Management Review" button
    - Provide justification for escalation
4. **Executive Escalation (Last Resort)**
    - Your executive contacts IBM executive
    - Reserve for genuine emergencies only
    - Document everything before escalating

### Building Partnership with IBM Support

**Long-Term Relationship Building:**

*Do This:*

- Submit high-quality cases consistently
- Respond promptly to IBM requests
- Provide positive feedback when cases resolved well
- Attend IBM support webinars and training
- Engage with IBM support community
- Share your success stories

*Don't Do This:*

- Submit duplicate cases for same issue
- Escalate every minor issue
- Provide incomplete information
- Ignore IBM's requests for information
- Be rude or demanding
- Blame IBM for issues in your control

**Result:**

- IBM recognizes your name
- Cases get attention faster
- Better collaboration
- Proactive communication from IBM
- Invitations to beta programs
- Better overall support experience

---

## 🏗️ Part 7: Building Internal Troubleshooting Capability

### The Three-Tier Support Model

**Tier 1: Help Desk (80% of Issues)**

*Handles:*

- Password resets
- User training questions
- Basic navigation help
- Report access requests
- Known issue identification
- Standard configuration requests

*Required Skills:*

- Maximo basic navigation
- User management
- Security groups
- Basic troubleshooting
- Knowledge base search

*Resolution Target:* <15 minutes

**Tier 2: Technical Support (15% of Issues)**

*Handles:*

- Application configuration issues
- Automation script debugging
- Integration troubleshooting
- Workflow issues
- Performance problems
- Data quality issues

*Required Skills:*

- Maximo administration
- Automation scripting
- Integration framework
- SQL queries
- Log analysis
- IBM case management

*Resolution Target:* <4 hours (or escalate)

**Tier 3: Expert/Architect (5% of Issues)**

*Handles:*

- Complex integration design
- Performance optimization
- Architecture decisions
- Escalations to IBM
- Major configuration changes
- Custom development

*Required Skills:*

- Deep Maximo expertise
- Integration architecture
- Performance tuning
- IBM relationship management
- Strategic thinking

*Resolution Target:* Variable (days to weeks)

### Knowledge Base Development

**Essential Knowledge Base Content:**

**Category 1: Common Issues and Solutions**

```
Title: "Work Order Cannot Be Saved - BMXAA4105E"

Symptom:
User receives error BMXAA4105E when saving work order

Cause:
Domain validation failing on WOPRIORITY field

Solution:
1. Navigate to work order
2. Check WOPRIORITY value
3. Verify value exists in WOPRIORITY domain
4. If invalid value, correct it
5. If valid value missing from domain, add it

Prevention:
- Train users on valid priority values
- Add client-side validation hints
- Review domain values quarterly

Related: KB-00012, KB-00087
```

**Category 2: How-To Guides**

```
Title: "How to Enable Debug Logging for Automation Scripts"

Steps:
1. Login to MAS Admin
2. Navigate to Application Administration > Logging
3. Select "Automation Scripts" logger
4. Change level from INFO to DEBUG
5. Click Save
6. Reproduce issue
7. Review logs (filter by SCRIPTNAME)
8. IMPORTANT: Change back to INFO after troubleshooting

Warning:
Do not leave DEBUG enabled long-term - performance impact

Duration: 5 minutes
Skill Level: Intermediate
```

**Category 3: Integration Runbooks**

```
Title: "ERP Integration Troubleshooting Runbook"

1. Check External System Status
   - URL: [https://erp.company.com/status](https://erp.company.com/status)
   - Contact: [erp-support@company.com](mailto:erp-support@company.com)
   - On-call: (555) 123-4567

2. Verify Maximo Integration Status
   - Navigate to: Integration > Message Tracking
   - Filter by: ERP_WO_CREATE
   - Look for: Failed messages

3. Common Issues:
   - HTTP 401: Authentication expired
     Solution: Rotate credentials (KB-00045)
   - HTTP 404: Endpoint changed
     Solution: Update endpoint URL (KB-00046)
   - Timeout: Network or ERP slow
     Solution: Check with network team

4. Escalation:
   - If authentication: Contact IAM team
   - If network: Contact network team
   - If ERP application: Contact ERP support
   - If Maximo infrastructure: Open IBM case
```

**Category 4: Quick Reference Guides**

```
Title: "Severity Level Quick Reference"

Severity 1:
☐ Production completely down
☐ All users cannot work
☐ Data loss/corruption
☐ Security breach
Action: Immediate IBM case + executive notification

Severity 2:
☐ Major function not working
☐ Significant user impact
☐ Workaround exists but not ideal
Action: IBM case within 1 hour

Severity 3:
☐ Minor issue
☐ Single user or small group
☐ Easy workaround
Action: IBM case within 4 hours

Severity 4:
☐ Question
☐ Enhancement request
☐ No business impact
Action: IBM case when convenient
```

### Training Program

**Tier 1 Training (Help Desk):**

Duration: 1 week

```
Day 1-2: Maximo Basics
- Navigation
- Core modules
- User management
- Security groups
- Basic troubleshooting

Day 3-4: Support Processes
- Ticket system usage
- Escalation criteria
- Knowledge base search
- IBM case creation
- Customer communication

Day 5: Hands-On Practice
- Simulated tickets
- Role-playing
- Knowledge base updates
- Shadow experienced staff
```

**Tier 2 Training (Technical Support):**

Duration: 4 weeks

```
Week 1: Maximo Administration
- System configuration
- Automation scripts
- Workflow design
- Object structures
- Integration framework

Week 2: Troubleshooting Skills
- Log analysis
- Performance troubleshooting
- Integration debugging
- Database queries
- Evidence collection

Week 3: MAS SaaS Specifics
- Health dashboard
- Limited access patterns
- IBM case management
- Layer 1/2/3 classification
- Escalation best practices

Week 4: Hands-On Troubleshooting
- Real incident review
- Simulated problems
- IBM case writing
- Knowledge base contribution
```

**Tier 3 Training (Expert):**

Ongoing professional development:

```
- IBM TechXchange attendance
- IBM certification programs
- Advanced integration courses
- Performance tuning workshops
- Architecture design patterns
- Vendor-specific training
- Community engagement
- Mentoring Tier 1/2 staff
```

---

## 🎯 Key Takeaways

1. **SaaS paradigm shift requires new mental models** — In MAS SaaS, you're not a server operator fixing infrastructure; you're a detective gathering evidence and strategist designing resilient processes, with IBM handling infrastructure complexity.
2. **Three-layer control model determines troubleshooting approach** — Layer 1 (your full control): fix immediately; Layer 2 (shared monitoring): diagnose and decide; Layer 3 (IBM exclusive): collect evidence and escalate strategically.
3. **Classification in first 5 minutes is critical** — Use the decision tree to quickly determine: single user vs. all users, reproducible in TEST, errors visible in logs, and production criticality to route troubleshooting efficiently.
4. **Evidence quality directly impacts resolution time** — High-quality cases with exact error messages, reproduction steps, filtered logs, and recent changes get resolved in hours; vague "something is broken" cases take days or weeks.
5. **Proactive monitoring prevents 3AM emergencies** — Four pillars (user experience, integration health, business processes, system health) with automated alerting catches issues before business impact, shifting from reactive to proactive operations.
6. **Integration failures are often external, not Maximo** — First check external system status, test endpoints independently, verify authentication, and review external system changes before assuming Maximo issue.
7. **IBM Support case structure matters enormously** — Subject line with severity/environment/impact, structured description with evidence, exact error messages, reproduction steps, and specific requests get faster, better responses than generic pleas for help.
8. **Alert fatigue destroys monitoring effectiveness** — Design for <10 actionable alerts daily rather than 500+ noisy alerts; every alert must be actionable, appropriately severe, contextual, and suggest next steps.
9. **Don't escalate what you can fix yourself** — Automation script errors, workflow misconfiguration, user permissions, domain values are Layer 1 (your control); fix them in minutes rather than waiting hours for IBM response.
10. **Build internal capability for 80/20 resolution** — Three-tier support model (help desk, technical support, expert) with comprehensive knowledge base resolves 80% internally, reserving IBM escalation for genuine infrastructure issues.
11. **The health dashboard shows symptoms, not root causes** — "All Systems Operational" can display while integrations fail or performance degrades; supplement with your own monitoring using logs, integration tracking, cron task history, and business process KPIs.
12. **Time-to-resolution depends on layer identification** — Layer 1 issues: minutes to hours (you control); Layer 2 issues: hours to day (depends on diagnosis); Layer 3 issues: hours to days (IBM controls); misclassification wastes time on both sides.

---

## 🚀 Conclusion: From Operator to Reliability Engineer

The transition from legacy Maximo to MAS SaaS fundamentally changes the administrator role. You're no longer the person who SSH's into servers at 3 AM to restart hung processes. You're the architect of reliable, self-healing business processes.

**The Old Way (Legacy 7.6.x):**

- React to problems with server access
- Fix infrastructure issues directly
- Restart services when things break
- SSH, grep logs, restart, hope
- Measured by uptime and response time

**The New Way (MAS SaaS):**

- Prevent problems through intelligent monitoring
- Design processes that fail gracefully
- Build evidence-based escalation paths
- Observe, classify, respond strategically
- Measured by business continuity and user productivity

This isn't a limitation—it's liberation. Free from infrastructure firefighting, you can focus on what actually drives business value: reliable processes, efficient workflows, empowered users, and strategic improvements.

The skills that matter now:

- **Evidence collection**: Gathering the right data quickly
- **Pattern recognition**: Identifying issues from symptoms
- **Strategic thinking**: Knowing what you can fix vs. when to escalate
- **Communication**: Writing effective cases and managing stakeholders
- **Proactive design**: Building monitoring that prevents fires

Welcome to the future of Maximo operations. The servers are IBM's problem now. Business value is yours.

In Part 9 of this series, we'll explore Enterprise Architecture strategy—positioning MAS as your platform foundation rather than just another application.

---

## 📚 Resources for Your Journey

### IBM Official
- [MAS 9.0 Documentation](https://www.ibm.com/docs/en/mas-cd/continuous-delivery)
- [IBM Maximo Management Interface (MMI) Documentation](https://www.ibm.com/docs)
- [IBM Support Case Management Guide](https://www.ibm.com/support)
- [MAS Health Dashboard Guide](https://www.ibm.com/docs)
- [IBM Support Portal](https://www.ibm.com/mysupport)

### Community
- [IBM Maximo Community](https://community.ibm.com/community/user/asset-facilities)
- [Maximo Secrets Blog](https://maximosecrets.com)

### Training
- [MAS Administration Learning Path](https://www.ibm.com/training/learning-path/maximo-application-suite-375)
- [IBM TechXchange Conference](https://www.ibm.com/community/techxchange)

### Downloads
- Three-Tier Support Model Template
- Knowledge Base Structure Template
- IBM Case Writing Guide
- Monitoring Dashboard Template
- Alert Design Framework
- Troubleshooting Runbook Templates
- Evidence Collection Checklist

---

## 🔗 Series Navigation

**Previous:** [Part 7 - Modern Mobile](Blog%207%20%E2%80%94%20Modern%20Mobile%20Why%20Maximo%20Mobile%20Is%20the%20On%20db553cb28e5f4ef4aedc53b4af9e4a7a.md)

**Next:** Part 9 - Enterprise Architecture (Coming Soon)

**Series Index:** [Modern Maximo: Complete Guide](link)

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*