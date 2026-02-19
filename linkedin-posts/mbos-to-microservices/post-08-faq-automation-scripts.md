---
type: faq
title: "Do My Automation Scripts Work in MAS 9?"
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/08-faq-automation-scripts.mdx"
generated: "2026-02-18"
character_count: 1249
hashtags: ["#Maximo", "#MAS9", "#AutomationScripts", "#IBMMaximo", "#AssetManagement"]
scheduling:
  recommended_day: "Tuesday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 4, Day 1"
  spacing_note: "Start of FAQ week — 3 days after last hot take"
cover_image: null
---

"Do my automation scripts work in MAS 9?"

Short answer: Yes.

Longer answer: Yes — migrate them, test them, and watch for three specific patterns.

What still works: The scripting engine is still there. Python (Jython) and JavaScript are still supported. Event triggers — save, init, action, validate, before and after — still fire. The implicit variables (mbo, mboset, service) still exist. If your script uses these in standard ways, migration is straightforward.

Watch for pattern 1: Direct SQL access. Scripts that use SqlFormat, DBManager, or raw database calls are at risk. MAS 9 prefers MboSet-based data access. Audit your scripts for direct SQL and refactor before migration.

Watch for pattern 2: External service network calls. Scripts calling external services need a network connectivity review. Container networking works differently than on-premise. A script calling an internal IP that worked in 7.6 may need a DNS name and a network policy update.

Watch for pattern 3: Deprecated API references. Some internal Maximo Java classes have changed between 7.6 and MAS Manage. Scripts referencing specific Java classes by full package path need a compatibility check.

The bottom line: Don't panic. Run them in a non-production MAS environment, catch the failures, fix the patterns above. Most scripts migrate cleanly.

What's your most complex automation script? Let's talk migration paths.

---
#Maximo #MAS9 #AutomationScripts #IBMMaximo #AssetManagement
