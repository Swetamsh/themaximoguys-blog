# Blog 11 — A Real MAS Migration Case Study (Your Project Story)

Priority: High
Team: Product Design
Status: Not started
Category: THINK MAS

# The Real MAS Migration: Lessons from a $4.2M Journey

**Series:** Modern Maximo - Transforming from Legacy 7.x to MAS 9 | **Part 11 of 12**

<aside>
🎯

**Who this is for:** Project managers, Maximo administrators, IT directors, and migration leads planning or executing a Maximo 7.6.x to MAS 9 migration — especially those who want the unvarnished truth about timelines, budgets, and real-world challenges.

</aside>

**Read Time:** 24-27 minutes

---

## Introduction: 22 Months, $4.2M, and 1,847 Lessons Learned

This is the story you won't hear at IBM conferences. Not the polished success story, but the real one—complete with budget overruns, political battles, technical dead-ends, and 3 AM emergency calls.

**The Company (Anonymized):**

- Global manufacturing organization
- 17 manufacturing sites across 8 countries
- 47,000 assets under management
- 850 Maximo users (350 technicians, 450 planners/supervisors, 50 admin/IT)
- Annual maintenance budget: $180M

**The Legacy Environment:**

```
Maximo 7.6.1.1 (installed 2014, never upgraded)
• Oracle 12c database (2.8TB)
• WebSphere 8.5.5
• Red Hat Enterprise Linux 6
• 83 custom Java classes
• 247 automation scripts
• 31 custom applications (TRM)
• 22 EAM integrations (ERP, SCADA, procurement)
• 450,000+ work orders/year
• 127M historical work order records
```

**The Pain Points:**

1. **Technical debt accumulating for 10 years**
    - Java 7 (three versions behind)
    - Security vulnerabilities (quarterly emergency patches)
    - No disaster recovery capability
    - Performance degrading (query times 3x slower than 2014)
2. **Business impact**
    - Unplanned downtime: 240 hours/year
    - Mean time to repair: 6.8 hours (industry benchmark: 4.2)
    - PM completion rate: 73% (target: 95%)
    - Technician mobile adoption: 12%
3. **Organizational friction**
    - IT refusing to support aging infrastructure
    - Business refusing to fund "working" system upgrade
    - Compliance risk (Sarbanes-Oxley, ISO 55001)
    - Vendor pressure (IBM 7.6 EOS approaching)

**The Decision:**

March 2022: Board approves $2.8M budget for MAS 9 migration, 14-month timeline.

**The Reality:**

July 2024: Go-live after 22 months, $4.2M spent.

**This blog documents what really happened—the good, the bad, and the 3 AM conference calls with IBM support.**

<aside>
💡

**Key insight:** The original plan was 14 months and $2.8M. The reality was 22 months and $4.2M — 57% longer and 50% over budget. Every MAS migration finds surprises. Budget 25-30% contingency and expect to use most of it.

</aside>

---

## Part 1: The Starting Position

### Environment Assessment (Phase 0: Months 1-2)

**Mandate:** "Tell us what we have."

**Discovery Tools:**

```
1. Maximo Integrity Checker
   - 2,847 data quality issues
   - 127 missing indexes
   - 83 orphaned records

2. Customization Analysis
   - 83 custom Java classes (47% undocumented)
   - 247 automation scripts (89% no comments)
   - 31 custom applications via TRM
   - 412 modified OOTB scripts

3. Integration Mapping
   - 22 integrations identified
   - 14 via flat file (FTP)
   - 6 via Maximo Integration Framework (MIF)
   - 2 via direct database write (!!!)

4. Data Analysis
   - Database: 2.8TB
   - Active data: 680GB (24%)
   - Archivable: 1.9TB (68%)
   - Junk data: 220GB (8%)
```

**The Shocking Discoveries:**

*Discovery 1: The Shadow Integration*

```
Found: External system writing directly to MAXIMO.WORKORDER table
Owner: "Legacy vendor, contract ended 2018"
Documentation: None
Users dependent: Unknown
Risk: Critical

Decision: Leave running, wrap with API, document for post-migration fix
Time lost: 3 weeks
```

*Discovery 2: The "Custom" That Wasn't*

```
Found: 31 "custom applications"
Reality: 24 were configuration (domains, fields)
        7 were actual TRM customizations

Impact: Budget panic averted
Time saved: Eliminated $380K from migration estimate
```

*Discovery 3: The Data Catastrophe*

```
Active work orders: 1.2M
Closed work orders: 126M
Ratio: 105:1

Oldest closed WO: 1987 (system installed 2014!)
Explanation: Migrated from previous system, never archived

Query impact:
- Average query time: 8.4 seconds
- With archived data removed: 1.2 seconds (7x improvement)

Decision: Mandatory data archival before migration
Time added: 4 months
```

### The Migration Plan (Created Month 2)

**Original 14-Month Timeline:**

```
Phase 1: Assessment & Planning (2 months) ✓
Phase 2: Infrastructure Setup (2 months)
Phase 3: Data Migration & Testing (4 months)
Phase 4: Customization Conversion (3 months)
Phase 5: Integration Migration (2 months)
Phase 6: UAT & Go-Live (1 month)

Total: 14 months
Budget: $2.8M
```

**Revised 22-Month Reality:**

```
Phase 0: Data Archival (4 months) - ADDED
Phase 1: Assessment & Planning (2 months) ✓
Phase 2: Infrastructure Setup (3 months) - EXTENDED
Phase 3: Data Migration & Testing (6 months) - EXTENDED
Phase 4: Customization Conversion (4 months) - EXTENDED
Phase 5: Integration Migration (3 months) - EXTENDED
Phase 6: UAT & Go-Live (3 months) - EXTENDED
Phase 7: Post-Go-Live Stabilization (2 months) - ADDED

Total: 22 months (+57%)
Budget: $4.2M (+50%)
```

<aside>
🔑

**Key insight:** Of 83 custom Java classes discovered, 14 were dead code (never called), 12 were replaced by OOTB MAS features, and 24 of the 31 "custom applications" were actually just configuration. Thorough discovery analysis eliminated $380K from the migration estimate before work even started.

</aside>

---

## Part 2: Five Critical Challenges

### Challenge 1: The Data Archive Battle (Months 3-6)

**The Problem:**

- 126M closed work orders
- 2.8TB database
- Migration tool estimated 87 hours for data pump
- Testing cycles: 3-4 days each
- Impossible timeline

**The Politics:**

```
IT: "We need to archive 90% of historical data."
Business: "That's our regulatory data! We need 10 years!"
Legal: "SOX requires 7 years."
Compliance: "ISO 55001 requires asset history."
Finance: "Storage costs $12K/TB/year. Archive it."

Meetings: 14
Weeks spent: 6
Decision: Archive data >5 years to separate database
```

**The Technical Solution:**

```
Selected: IBM MaxArc (third-party archival tool)

Archive Strategy:
1. Closed work orders >5 years: Archive
2. Asset history: Keep all (only 40GB)
3. PM history: Keep all (only 12GB)
4. Inventory transactions >3 years: Archive
5. GL transactions >7 years: Archive

Execution:
• Archived 114M records
• Reduced database: 2.8TB → 720GB (74% reduction)
• Query performance: 8.4s → 1.3s (84% improvement)
• Migration time: 87 hours → 12 hours (86% reduction)

Cost:
• MaxArc licensing: $85K
• Archive database (AWS S3): $3K/year
• Archival execution: 4 months elapsed, $120K labor

Total: $205K one-time + $3K/year

ROI:
Migration time saved: 75 hours × $200/hour = $15K
Testing cycle improvement: 2 days/cycle × 12 cycles × $8K/day = $192K
Ongoing query performance: Immeasurable but significant

Payback: Immediate
```

**Lesson Learned:**

> "Data archival wasn't optional. It should have been Phase 0, not discovered during Phase 1. Budget 4-6 months for this if your database is >1TB."
> 

### Challenge 2: The Customization Conversion Crisis (Months 11-14)

**The Problem:**

MAS doesn't support:

- Custom Java classes (83 found)
- TRM-based custom apps (7 found)
- Modified OOTB scripts (412 found)

**The Analysis:**

```
Custom Java Classes: 83 total

Category 1: Business Logic (37 classes)
• Convertible to automation scripts: 29
• Requires custom UI (Polymer): 5
• Requires API service: 3

Category 2: Integration Logic (28 classes)
• Replaceable with App Connect: 22
• Requires custom API: 6

Category 3: UI Customizations (18 classes)
• OOTB in MAS: 12 (!)
• Requires Polymer: 6

Category 4: Dead Code (discovered)
• Referenced but never called: 14
• Original developer retired: 11
• No documentation: 47
```

**The Conversion Approach:**

*Example 1: Work Order Validation Java Class → Automation Script*

Before (Java):

```java
// 380 lines of Java
package [com.client.app](http://com.client.app).workorder;
import psdi.mbo.*;
import psdi.util.*;

public class WOValidation extends Mbo {
    public void validate() throws MXException {
        // Complex validation logic
        // 350 lines...
    }
}
```

After (Python Automation Script):

```python
# 47 lines of Python (92% reduction)
from psdi.server import MXServer

# Same logic, more readable
# Maintainable by Maximo admins
# No Java deployment required
```

Time to convert: 12 hours  

Testing: 8 hours  

Total: 20 hours per class  

*Example 2: Custom TRM Application → OOTB + Configuration*

```
TRM App: "Equipment Inspection Tracker"
Purpose: Track regulatory inspections

Analysis:
• 80% functionality exists in OOTB Manage
• 15% achievable via configuration
• 5% requires custom UI (Polymer)

Decision: Eliminate TRM, use OOTB + config + 1 custom screen

Effort:
• TRM conversion estimate: 280 hours
• OOTB + config approach: 40 hours
• Custom Polymer screen: 60 hours
Total: 100 hours (64% reduction)
```

**The Surprises:**

*Surprise 1: Dead Code Discovery*

```
Found: 14 custom Java classes never actually called
How: Added logging, ran for 30 days, zero invocations
Action: Deleted (with business approval)
Time saved: 280 hours
```

*Surprise 2: OOTB Feature Explosion*

```
MAS 9 features that replaced customizations:
• Spatial (replaced custom GIS integration)
• Asset Investment Optimizer (replaced custom analysis)
• Health (replaced custom scoring)
• RCM (replaced custom reliability)

Customizations eliminated: 12
Estimated conversion effort saved: 1,200 hours
```

**Final Customization Stats:**

```
Original:
83 Java classes
7 TRM apps
412 modified scripts

Converted to:
29 automation scripts (Python)
0 TRM apps
89 modified scripts (323 reverted to OOTB)
4 custom Polymer screens
9 App Connect integrations

Conversion effort: 2,100 hours (4 months)
Budget: $420K
Risk level: High → Medium
```

### Challenge 3: The OpenShift Learning Curve (Months 7-9)

**The Problem:**

"Our team knows WebSphere, not Kubernetes."

**The Team:**

```
Maximo Admins: 3 (avg 8 years Maximo experience)
Skills:
• WebSphere administration: Expert
• Oracle DBA: Expert
• Linux system admin: Proficient
• Kubernetes: Zero
• OpenShift: Zero
• Container concepts: Zero
```

**The Training Investment:**

```
Month 7:
• Red Hat OpenShift fundamentals (40 hours)
• Kubernetes for administrators (40 hours)
• Container concepts and Docker (16 hours)
Total: 96 hours/person × 3 = 288 hours

Month 8:
• MAS administration on OpenShift (IBM course, 24 hours)
• Hands-on lab environment (80 hours practice)
Total: 104 hours/person × 3 = 312 hours

Month 9:
• Shadow operations (real environment, supervised)
• Troubleshooting practice
Total: 160 hours/person × 3 = 480 hours

Grand Total: 1,080 hours
Cost: $180K (training + lab + lost productivity)
```

**The "Aha" Moments:**

*Aha #1: "Where's My Server?"*

```
Old way (7.6):
SSH to [maximo-prod-01.company.com](http://maximo-prod-01.company.com)
Check logs: /opt/IBM/WebSphere/profiles/AppSrv01/logs
Restart: ./[stopServer.sh](http://stopServer.sh); ./[startServer.sh](http://startServer.sh)

New way (MAS):
Admin: "Where's the server?"
Us: "It's a pod in OpenShift."
Admin: "Where's the pod?"
Us: "Could be any worker node. OpenShift decides."
Admin: "How do I restart it?"
Us: "You don't. OpenShift does it automatically."
Admin: "What if it crashes?"
Us: "OpenShift restarts it in 30 seconds."
Admin: "...this is weird."

2 months later:
Admin: "This is AMAZING. No 3 AM restarts!"
```

*Aha #2: "Logs Are Everywhere"*

```
Old way (7.6):
• Application logs: /opt/IBM/WebSphere/logs
• System logs: /var/log
• Database logs: /u01/oracle/logs
• Integration logs: /opt/integrations/logs

New way (MAS):
• Everything in OpenShift logging (EFK stack)
• Centralized
• Searchable
• Retained 30 days
• Exportable

Admin reaction: "I can search across ALL logs?!"
```

*Aha #3: "Self-Healing is Real"*

```
Incident: Database connection pool exhausted

Old way (7.6):
1. Alarm triggers (2 AM)
2. Admin wakes up
3. SSH to server
4. Restart WebSphere (10 minutes)
5. Test (5 minutes)
6. Document (next day)
Total: 30 minutes + lost sleep

New way (MAS):
1. OpenShift detects unhealthy pod
2. OpenShift kills pod
3. OpenShift starts new pod
4. Health check passes
5. Traffic resumes
Total: 45 seconds, automatic, admin sleeps

Admin reaction: "I haven't been paged in 6 months!"
```

**The Reality Check:**

```
Month 7 (start of training):
Team confidence: 2/10
Team quote: "We're going to break production."

Month 12 (3 months into operations):
Team confidence: 7/10
Team quote: "We could never go back to 7.6."

Month 18 (6 months post go-live):
Team confidence: 9/10
Team quote: "This is actually easier than WebSphere."
```

**Lesson Learned:**

> "Budget 3-4 months for OpenShift training and hands-on practice. It's a paradigm shift, not just new software. But once they get it, your admins will wonder how they lived without it."
> 

### Challenge 4: The Integration Nightmare (Months 15-17)

**The Problem:**

22 integrations, 14 via flat file, 2 via direct database write.

**Integration Inventory:**

```
INTEGRATION            | TYPE          | FREQUENCY    | OWNER
1.  SAP (ERP)          | Flat file FTP | Hourly       | IT
2.  Kronos (HR)        | Flat file FTP | Daily        | HR
3.  Oracle Financials  | MIF           | Real-time    | Finance
4.  SCADA #1           | Direct DB(!)  | Real-time    | OT
5.  SCADA #2           | Flat file FTP | 15 min       | OT
6.  Procurement system | Flat file FTP | Hourly       | Supply
7.  Quality system     | MIF           | Real-time    | Quality
8.  GIS system         | Flat file FTP | Daily        | Facilities
9.  Mobile app (custom)| Direct DB(!)  | Real-time    | IT
10. Asset tracking     | Flat file FTP | Hourly       | Operations
... +12 more

Complexity factors:
• 14 different systems
• 8 different teams
• 3 different vendors (external)
• 2 legacy systems (unsupported)
• 0 documentation for 6 integrations
```

**The Migration Approach:**

*Strategy: Phased Integration Migration*

```
Phase 1: Critical (go-live dependent)
• SAP (ERP) - work orders, costs
• Oracle Financials - GL, invoicing
• Procurement - POs, receipts

Phase 2: Important (week 1 post go-live)
• SCADA #1 & #2 - sensor data
• Quality system - inspections
• Asset tracking - locations

Phase 3: Standard (month 1 post go-live)
• Remaining 16 integrations
```

**Case Study: SAP Integration Rewrite**

*Before (7.6 via flat file):*

```
1. SAP exports CSV to FTP (hourly cron)
2. Maximo polls FTP (every 5 min)
3. Java class parses CSV
4. Java writes to MAXIMO tables
5. Maximo cron processes (every 10 min)

Latency: Up to 75 minutes
Failure rate: 3-5%/month
Troubleshooting: Manual CSV inspection
Code: 2,400 lines of Java
```

*After (MAS via App Connect):*

```
1. SAP emits event to Kafka
2. App Connect consumes event
3. App Connect transforms to MAS format
4. App Connect calls MAS REST API
5. MAS processes immediately

Latency: <2 minutes
Failure rate: 0.1%/month
Troubleshooting: Built-in monitoring
Code: 0 lines (visual flow designer)

Conversion effort:
• Analysis: 20 hours
• App Connect flow design: 40 hours
• SAP Kafka setup: 60 hours
• Testing: 80 hours
Total: 200 hours

Benefits:
• Latency 97% reduction
• Failure rate 97% reduction
• No custom code to maintain
• Built-in monitoring and retry
```

**The Direct Database Write Crisis:**

*SCADA Direct DB Write (discovered Month 15):*

```
System: Legacy SCADA monitoring
Method: Perl script writes to MAXIMO.MEASUREMENT table
Frequency: Every 30 seconds
Records/day: 2,880
Owner: "Original developer retired 2019"
Documentation: None
Business criticality: HIGH (regulatory reporting)

Problem: MAS doesn't allow direct database write

Options:
1. Rewrite SCADA system: $800K, 8 months
2. Wrap with API: $120K, 6 weeks
3. Migrate later: Risk of go-live failure

Decision: Emergency API wrapper

Solution:
• REST API endpoint (Node.js)
• Transforms Perl payload to MAS API format
• Calls MAS Measurement API
• Minimal SCADA changes (update endpoint URL)

Effort: 180 hours (emergency sprint)
Cost: $60K (overtime + priority)
Result: Worked perfectly at go-live

Lesson: Always run "direct database access" scan
```

**Integration Migration Results:**

```
Before Migration:
• 22 integrations
• 14 flat file FTP
• 6 MIF
• 2 direct database
• Average latency: 45 minutes
• Monthly failures: 24

After Migration:
• 22 integrations
• 0 flat file FTP
• 17 App Connect
• 5 REST API
• 0 direct database
• Average latency: 3 minutes
• Monthly failures: 2

Conversion effort: 1,800 hours (3 months)
Conversion cost: $360K
Ongoing maintenance: -70% (less code, better monitoring)
```

### Challenge 5: The Change Management Breakdown (Months 18-22)

**The Problem:**

"Technical migration succeeded. User adoption failed."

**The Warning Signs (Month 18):**

```
Week 1 post go-live:
• Help desk tickets: 847 (expected: ~200)
• Technician complaints: "It's different"
• Supervisor complaints: "Where's my old report?"
• Manager complaints: "Why did we do this?"

Week 2:
• Work order processing 40% slower
• PM completion dropped to 68% (was 73%)
• User satisfaction: 3.2/10

Week 4:
• Rumor: "They're rolling back to 7.6"
• Executive escalation
• Emergency steering committee
```

**Root Cause Analysis:**

```
Training Delivered:
• 2-hour overview session (all users)
• Role-based training (4 hours)
• Hands-on lab (2 hours)
Total: 8 hours/user

Training Issues:
• Delivered 2 weeks before go-live (forgotten)
• TEST environment (didn't match PROD)
• Generic scenarios (not company-specific)
• No mobile training (!) 
• No "what's different" focus

Communication Issues:
• "System upgrade" messaging (not transformation)
• Technical benefits emphasized (not user benefits)
• Leadership not engaged
• No champions program

Expectation Issues:
• Users expected "same but newer"
• Reality: "completely different"
• Shock factor: High
```

**The Recovery Plan (Months 19-22):**

*Week 5-8: Emergency Measures*

```
1. Super-user support
   • 25 power users pulled from normal duties
   • Floor walking 8 hours/day
   • One-on-one assistance
   • Document common issues

2. Daily standup meetings
   • Review top 10 issues
   • Prioritize fixes
   • Communicate resolution

3. Quick wins
   • Restore missing reports (48 hours)
   • Simplify navigation (1 week)
   • Mobile offline mode (2 weeks)

Cost: $180K (labor + lost productivity)
```

*Month 20-21: Systematic Improvement*

```
1. Role-based retraining
   • Focus on actual workflows
   • PROD environment
   • Recorded for reference
   • Mandatory attendance

2. Video library (75 videos)
   • 2-5 minutes each
   • Searchable by task
   • Mobile-optimized

3. Champion network
   • 2 super-users per site
   • Monthly webinars
   • Recognition program

4. Executive engagement
   • Weekly site visits
   • "What's working" focus
   • Celebrate wins

Cost: $240K
```

*Month 22: Metrics Recovery*

```
Before Recovery (Month 18):
• Help desk tickets: 847/week
• Work order processing: 40% slower
• PM completion: 68%
• User satisfaction: 3.2/10

After Recovery (Month 22):
• Help desk tickets: 124/week (-85%)
• Work order processing: 15% faster than 7.6
• PM completion: 89% (target: 95%)
• User satisfaction: 7.8/10

Recovery cost: $420K
Lessons: Priceless
```

**Lesson Learned:**

> "We spent $420K fixing change management problems that shouldn't have existed. Next time: 2x the change management budget upfront, 3x the training time, and engage users 6 months before go-live."
> 

<aside>
💡

**Key insight:** Change management was budgeted at 4% of the project ($180K) but should have been 20%. The user adoption crisis at go-live — 847 help desk tickets in week one vs. 200 expected — required a $420K emergency recovery investment and 4 months of stabilization. Next time: 2x the change management budget upfront, 3x the training time, and engage users 6 months before go-live.

</aside>

---

## Part 3: The Final Results

### Go-Live Metrics (Month 20)

**Technical Performance:**

```
Page Load Times:
• 7.6 average: 8.2 seconds
• MAS average: 1.4 seconds
• Improvement: 83%

System Availability:
• 7.6: 98.2% (planned + unplanned downtime)
• MAS: 99.7% (mostly planned maintenance)
• Improvement: 1.5 percentage points = 131 hours/year

Database Performance:
• Query response time: 8.4s → 1.3s (85% improvement)
• Report generation: 15 min → 2 min (87% improvement)
• Data load: 4 hours → 30 min (88% improvement)

Mobile Adoption:
• 7.6: 12% (Anywhere, buggy)
• MAS: 78% (Maximo Mobile, Month 22)
• Improvement: 6.5x
```

**Business Impact (12 Months Post Go-Live):**

```
Maintenance Efficiency:
• Mean time to repair: 6.8 hrs → 5.1 hrs (-25%)
• PM completion rate: 73% → 89% (+16 points)
• Work order cycle time: 8.2 days → 6.4 days (-22%)
• Emergency work orders: 18% → 12% (-33%)

Cost Impact:
• Unplanned downtime: 240 hrs/year → 95 hrs/year
• Downtime cost savings: $2.9M/year
• Admin labor reduction: 1.5 FTE = $210K/year
• Integration maintenance: -70% = $140K/year
• Infrastructure cost: +$320K/year (cloud)

Net annual savings: $2.93M
Payback on $4.2M investment: 1.4 years
```

**Intangible Benefits:**

```
1. Risk Reduction:
   • No EOL software
   • Automated security patching
   • Disaster recovery capability
   • Compliance confidence

2. Strategic Capability:
   • AI/ML foundation (Monitor, Predict, Health)
   • IoT integration ready
   • Mobile-first operations
   • API economy participation

3. Organizational:
   • Modern skills development
   • Career growth opportunities
   • Reduced burnout (no 3 AM pages)
   • Competitive talent attraction
```

### Project Financials

**Budget Evolution:**

```
Original Budget (Month 0): $2.8M

Phase 0 Addition (Month 2): +$205K (data archival)
Phase 2 Overrun (Month 9): +$180K (OpenShift training)
Phase 4 Emergency (Month 15): +$60K (SCADA wrapper)
Phase 5 Extension (Month 17): +$95K (integration complexity)
Phase 6 Overrun (Month 20): +$420K (change management)
Contingency Used (Month 22): +$440K (various)

Final Cost (Month 22): $4.2M (+50%)
```

**Cost Breakdown:**

```
INFRASTRUCTURE:              $780K (19%)
• OpenShift cluster             $320K
• Database (Db2)                $180K
• Storage                       $120K
• Network                       $80K
• Monitoring                    $80K

SOFTWARE LICENSING:          $920K (22%)
• MAS licenses                  $640K
• App Connect                   $120K
• MaxArc (archival)             $85K
• Other tools                   $75K

PROFESSIONAL SERVICES:       $1,680K (40%)
• IBM consulting                $840K
• SI partner                    $620K
• Data migration                $140K
• Custom development            $80K

INTERNAL LABOR:              $640K (15%)
• Project management            $180K
• Technical team                $280K
• Business analysts             $120K
• Testing                       $60K

CHANGE MANAGEMENT:           $180K (4%)
• Training development          $60K
• Training delivery             $80K
• Communication                 $40K

TOTAL:                       $4,200K (100%)
```

**Lessons on Budgeting:**

```
1. Contingency:
   • We budgeted: 15% ($420K)
   • We used: 100% of contingency + overran base
   • Recommendation: 25-30% contingency

2. Hidden costs:
   • Data archival (not budgeted): $205K
   • Training (underbudgeted): +$180K
   • Change management (underbudgeted): +$240K
   • Emergency fixes (not budgeted): $60K

3. Budget differently:
   • Original: 40% services, 15% change mgmt
   • Should be: 30% services, 25% change mgmt
```

---

## Part 4: Top 10 Lessons Learned

### 1. Data Archival is Not Optional

**What We Learned:**

> "If your database is >1TB, data archival should be Phase 0, not an afterthought. It will save 100+ hours in migration time and make testing actually feasible."
> 

**Recommendation:**

- Archive data >5 years (adjust for regulations)
- Use purpose-built archival tools (MaxArc, custom solution)
- Budget 4-6 months and $200K+ for archival
- Complete archival BEFORE starting migration

### 2. Change Management Budget = 2x Technical Budget

**What We Learned:**

> "We spent 40% on services, 4% on change management. Should have been 30% and 25%. Users don't care about technical excellence if they can't do their jobs."
> 

**Recommendation:**

- Engage users 6 months before go-live
- 3x more training than you think necessary
- Super-user program (not optional)
- Executive engagement (critical)
- Video library (essential for ongoing support)

### 3. Most Customizations Aren't Needed

**What We Learned:**

> "We had 83 Java classes. 14 were dead code. 12 were replaced by OOTB MAS features. 29 converted to simple scripts. Only 8 required significant rework."
> 

**Recommendation:**

- Run usage analysis (log everything for 30 days)
- Check MAS OOTB features thoroughly
- Convert to automation scripts where possible
- Only rebuild critical business logic
- Dead code elimination saves months

### 4. Integration Migration is the Long Pole

**What We Learned:**

> "We thought data migration would be hardest. Wrong. Integration rewrites took 3 months longer than planned and required emergency SCADA work."
> 

**Recommendation:**

- Map ALL integrations (including shadow)
- Run database write scan (find direct DB access)
- Use App Connect for 80% of integrations
- Budget emergency API wrapper for legacy systems
- Phased integration go-live (not big bang)

### 5. OpenShift Learning Curve is Real But Worth It

**What We Learned:**

> "Our admins went from 'we're going to break production' to 'we could never go back' in 6 months. The paradigm shift is significant but the operational benefits are transformative."
> 

**Recommendation:**

- 3-4 months formal training (not optional)
- 2 months hands-on practice in lab
- Shadow operations before production responsibility
- Embrace the paradigm shift (containers, self-healing)
- Admin happiness increases dramatically after learning curve

### 6. Testing Cycles Make or Break Timeline

**What We Learned:**

> "With 2.8TB database, each testing cycle took 4 days. After archival to 720GB, testing cycles were 8 hours. That's the difference between 12 months and 18 months."
> 

**Recommendation:**

- Optimize database size before migration
- Automate testing where possible
- Parallel testing environments
- Clear test exit criteria
- Don't skip testing to make timeline

### 7. Mobile Adoption Requires Intentional Design

**What We Learned:**

> "We deployed Maximo Mobile but adoption stayed at 15% for 3 months. Only after workflow redesign and offline mode did adoption hit 78%."
> 

**Recommendation:**

- Redesign workflows for mobile-first
- Offline mode is mandatory (not optional)
- Technician input during design
- Champion technicians for peer influence
- Mobile metrics in go-live criteria

### 8. Executive Sponsorship Must Be Active

**What We Learned:**

> "Executive sponsor approved budget but disappeared. When user adoption crashed, we had no air cover. Only after exec site visits did culture shift."
> 

**Recommendation:**

- Weekly exec sponsor engagement
- Exec site visits (critical for culture)
- Exec communication of 'why'
- Exec celebration of wins
- Exec accountability for success

### 9. Phased Go-Live is Worth the Complexity

**What We Learned:**

> "We did big bang go-live (all 17 sites simultaneously). Disaster. Should have done 3 pilot sites, learned, then rolled out. Would have saved 4 months of pain."
> 

**Recommendation:**

- Pilot site(s) first (3-5 sites)
- Learn for 1-2 months
- Fix issues before broader rollout
- Roll out in waves (not big bang)
- Each wave learns from previous

### 10. Budget 20-30% Contingency (And Use It)

**What We Learned:**

> "We budgeted 15% contingency ($420K). We used all of it plus overran base budget. Migrations ALWAYS find surprises. Budget for them."
> 

**Recommendation:**

- 20-30% contingency (not 10-15%)
- Expect to use 80%+ of contingency
- Hidden costs always emerge:
    - Data archival
    - Training extension
    - Emergency fixes
    - Change management recovery
    - Extended consulting

---

## Part 5: If We Did It Again

### The Revised Approach

**Phase 0: Foundation (6 months)**

```
Month 1-2: Discovery & Planning
• Comprehensive assessment
• Integration inventory (including shadow)
• Customization usage analysis
• Data quality assessment
• Stakeholder engagement

Month 3-6: Data Archival
• Archival tool selection
• Archive historical data
• Validate archive completeness
• Performance testing
• Business approval

Deliverables:
• Migration plan (detailed)
• Clean database (<800GB)
• Integration roadmap
• Customization conversion plan
• Stakeholder buy-in
```

**Phase 1: Infrastructure & Training (4 months)**

```
Month 7-8: OpenShift Setup
• Cluster deployment
• MAS installation
• Monitoring setup
• Security configuration
• Backup/DR testing

Month 9-10: Team Training
• OpenShift fundamentals
• MAS administration
• Hands-on lab practice
• Troubleshooting scenarios
• Operations shadowing

Deliverables:
• Production-ready infrastructure
• Trained technical team
• Operations runbooks
• Monitoring dashboards
```

**Phase 2: Migration & Conversion (6 months)**

```
Month 11-13: Data & Customizations
• Data migration (multiple test cycles)
• Customization conversion
• Automation script development
• Custom UI development
• Integration preparation

Month 14-16: Integration Migration
• App Connect flow development
• API wrapper creation
• Testing (unit, integration, E2E)
• Performance validation
• Monitoring setup

Deliverables:
• Migrated data (validated)
• Converted customizations
• Modernized integrations
• Test results (documented)
```

**Phase 3: Change Management (6 months, parallel with Phase 2)**

```
Month 11-13: Preparation
• User engagement (workshops)
• Workflow redesign (mobile-first)
• Champion identification
• Training material development
• Communication campaign

Month 14-16: Training
• Role-based training (all users)
• Hands-on practice (PROD-like)
• Video library creation
• Super-user certification
• Go-live readiness assessment

Deliverables:
• Trained users (all roles)
• Champion network (established)
• Video library (75+ videos)
• Communication materials
• Go-live readiness score
```

**Phase 4: Phased Go-Live (4 months)**

```
Month 17: Pilot Sites (3 sites)
• Go-live with super-user support
• Daily issue triage
• Quick fixes
• Lessons learned documentation

Month 18: Wave 2 (7 sites)
• Apply pilot learnings
• Continued support
• Metrics monitoring
• Process refinement

Month 19: Wave 3 (7 sites)
• Standard rollout process
• Reduced support intensity
• Self-service enabled
• Champion network active

Month 20: Stabilization
• Final optimization
• Lessons learned (complete)
• Hypercare transition to BAU
• Celebration event

Deliverables:
• All sites live on MAS
• User satisfaction >7.5/10
• Metrics meeting targets
• Lessons learned document
```

**Total Revised Timeline: 20 months (vs. 22 actual)**  

**Revised Budget: $4.5M (vs. $4.2M actual, but controlled)**

### The Key Differences

```
Original Approach        →  Revised Approach
───────────────────────────────────────────────────
Data archival: Reactive  →  Data archival: Phase 0
Change mgmt: 4% budget   →  Change mgmt: 20% budget
Training: 8 hrs/user     →  Training: 24 hrs/user
Go-live: Big bang        →  Go-live: Phased (3 waves)
Exec engagement: Low     →  Exec engagement: High
Contingency: 15%         →  Contingency: 25%
Testing cycles: Slow     →  Testing cycles: Optimized
Integration discovery: Late → Integration discovery: Early
Customization: Convert all → Customization: Eliminate first
```

---

## Conclusion: Was It Worth It?

### The Honest Answer: Yes, But...

**Yes, because:**

```
• Technical performance: 83% faster
• System reliability: 99.7% uptime
• Mobile adoption: 6.5x increase
• Annual savings: $2.93M
• Payback: 1.4 years
• Strategic capability: Transformative
• Risk reduction: Significant
• Team skills: Modernized
• Admin quality of life: Much better
• Future-ready: 10+ years
```

**But, because:**

```
• 50% over budget ($1.4M)
• 57% longer than planned (8 months)
• Change management crisis (Month 18-22)
• User satisfaction crash (required recovery)
• Integration surprises (SCADA emergency)
• Political battles (data archival)
• Team stress (learning curve)
• Executive pressure (budget/timeline)
```

### The Unvarnished Truth

Migrating from Maximo 7.6 to MAS 9 is not:

- A simple upgrade
- A pure technical project
- Something to rush
- Something to underfund

It IS:

- A transformation program
- A change management initiative
- A long-term investment
- A paradigm shift

### The Numbers That Matter

**Before Migration (Maximo 7.6):**

- Annual unplanned downtime: 240 hours
- Mean time to repair: 6.8 hours
- PM completion: 73%
- Mobile adoption: 12%
- Page load time: 8.2 seconds
- Admin on-call stress: High
- System availability: 98.2%
- Integration latency: 45 minutes
- User satisfaction: 6.8/10

**After Migration (MAS 9, 12 months post go-live):**

- Annual unplanned downtime: 95 hours (-60%)
- Mean time to repair: 5.1 hours (-25%)
- PM completion: 89% (+16 points)
- Mobile adoption: 78% (+6.5x)
- Page load time: 1.4 seconds (-83%)
- Admin on-call stress: Low (self-healing)
- System availability: 99.7% (+1.5 points)
- Integration latency: 3 minutes (-93%)
- User satisfaction: 7.8/10 (+15%)

**The ROI:**

- Investment: $4.2M
- Annual savings: $2.93M
- Payback: 1.4 years
- 5-year NPV: $10.4M
- 10-year NPV: $24.8M

### For Those Considering MAS Migration

**Budget These Amounts:**

```
Base Technical Work:     40%
Change Management:       20%
Training:               10%
Contingency:            25%
Project Management:      5%
```

**Budget This Timeline:**

```
Small deployment (<10 sites):  12-15 months
Medium deployment (10-30 sites): 18-24 months
Large deployment (30+ sites):  24-36 months

Add 6 months if data archival needed
Add 3 months if major integration rewrites
Add 4 months if significant customization conversion
```

**Expect These Challenges:**

1. Data archival (always takes longer than expected)
2. Integration surprises (shadow integrations exist)
3. Customization conversion (more complex than estimated)
4. OpenShift learning curve (paradigm shift for admins)
5. Change management breakdown (users resist differently)

**Build These Competencies:**

- OpenShift/Kubernetes administration
- API-first integration design
- Automation script development (Python/JavaScript)
- Change management execution
- Mobile-first workflow design

### The Last Word

This migration consumed 22 months of our lives. We made mistakes. We learned hard lessons. We spent more than planned. We took longer than promised.

But we're running on modern infrastructure. Our admins sleep at night. Our technicians work from mobile devices. Our integrations are API-based. Our data is clean. Our system is fast.

And we have a foundation for the next decade of innovation: IoT, AI, predictive maintenance, autonomous operations.

**Was it worth it? Absolutely.**

**Would we do it again? Yes, but differently.**

**Should you do it? Probably. But read this blog first.**

---

## Key Takeaways

1. **Data archival is Phase 0, not an afterthought** — 126M records reduced to 12M saved 75 hours migration time and enabled feasible testing cycles; budget 4-6 months and $200K+ for databases >1TB.
2. **Change management budget should equal technical budget** — Spent 4% on change management, should have spent 20%; user adoption crisis required $420K recovery investment and 4-month timeline extension.
3. **Most customizations are unnecessary or replaceable** — 83 Java classes: 14 dead code, 12 replaced by OOTB MAS features, 29 converted to simple automation scripts; only 8 required significant rework.
4. **Integration migration is the critical path** — 22 integrations took 3 months longer than planned; direct database writes (2 found) required emergency $60K API wrapper; hidden integration complexity always emerges.
5. **OpenShift learning curve is 3-4 months but transformative** — Team confidence went from 2/10 to 9/10 in 6 months; paradigm shift from "we'll break production" to "we could never go back"; admin on-call stress eliminated by self-healing.
6. **Phased go-live reduces risk dramatically** — Big-bang approach (17 sites simultaneously) caused 4-month stabilization nightmare; revised approach: pilot 3 sites, learn, then roll out in waves.
7. **Testing cycle time determines project duration** — 2.8TB database = 4 days/cycle; after archival to 720GB = 8 hours/cycle; difference between 12-month and 18-month projects; optimize database size before migration.
8. **Budget 50% more and 50% longer than planned** — Original: $2.8M and 14 months; Reality: $4.2M and 22 months; hidden costs: data archival, training extension, change management recovery, emergency fixes.
9. **Executive sponsorship must be active, not passive** — Sponsor approved budget but disappeared; user adoption crash had no air cover until executive site visits changed culture; weekly engagement and site visits are mandatory.
10. **Mobile adoption requires intentional workflow redesign** — Simply deploying Maximo Mobile yielded 15% adoption; after mobile-first workflow redesign and offline mode: 78% adoption; technician input during design is critical.
11. **Contingency of 25-30% is realistic** — Budgeted 15% ($420K), used 100% plus overran base; migrations always find surprises: shadow integrations, data quality issues, customization complexity, training needs.
12. **Post-go-live metrics prove transformation value** — 60% reduction unplanned downtime (240→95 hrs/year), 83% faster page loads (8.2s→1.4s), 6.5x mobile adoption (12%→78%), $2.93M annual savings, 1.4-year payback on $4.2M investment.

---

## Final Recommendation

If you're migrating from Maximo 7.6 to MAS 9:

1. **Read this entire case study** — Learn from our $4.2M education
2. **Budget realistically** — 25-30% contingency, 20% change management
3. **Start with data** — Phase 0 archival saves months later
4. **Invest in people** — Training and change management = success
5. **Phased approach** — Pilot sites before big bang
6. **Find your shadow integrations** — They exist, guaranteed
7. **Eliminate before converting** — Most customizations aren't needed
8. **Embrace OpenShift** — Paradigm shift, but worth it
9. **Engage executives actively** — Passive sponsorship = failure
10. **Celebrate wins** — 22-month journey needs morale

In Part 12, we explore the future of Maximo: AI-driven EAM, autonomous maintenance, and the vision for MAS 10+.

---

**Previous:** [Part 10 - AI for Maximo](link)  

**Next:** [Part 12 - The Future of Maximo](link)  

**Series Index:** [Modern Maximo: Complete Guide](link)

---

**Related Resources:**

- [IBM MAS Migration Guide](https://www.ibm.com/docs/mas)
- [Maximo 7.6 End of Support FAQ](https://www.ibm.com/support/pages/ibm-maximo-76-end-support)
- [Red Hat OpenShift Documentation](https://docs.openshift.com)
- [Migration Assessment Template](download-link)
- [Project Budget Calculator](download-link)

**Download Resources:**

- Migration Project Plan Template
- Data Archival Assessment Checklist
- Integration Discovery Worksheet
- Customization Analysis Spreadsheet
- Change Management Playbook
- ROI Calculator (Pre and Post Migration)

---

**About TheMaximoGuys:** We help Maximo developers and teams make the transition from 7.6.x thinking to MAS mastery. We've been through the journey ourselves—and we're here to make yours smoother.

*Part of the "THINK MAS" Series | Published by TheMaximoGuys | [Subscribe for Updates](#)*