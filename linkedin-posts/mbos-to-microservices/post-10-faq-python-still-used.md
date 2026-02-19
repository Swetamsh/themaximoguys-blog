---
type: faq
title: "Is Python Still Used in MAS?"
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/10-faq-python-still-used.mdx"
generated: "2026-02-18"
character_count: 1072
hashtags: ["#Maximo", "#MAS9", "#IBMMaximo", "#AssetManagement", "#ArtificialIntelligence"]
scheduling:
  recommended_day: "Tuesday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 4, Day 3"
  spacing_note: "5 days after FAQ #2"
cover_image: null
---

"Is Python still used in MAS 9?"

Short answer: Yes. And increasingly, in more places.

Inside Manage — Jython automation scripts: The automation scripting engine still supports Python via Jython. Your existing scripts migrate. Event triggers still fire. The implicit variables still work. If you write automation scripts today, that skill isn't going away.

Outside Manage — external integrations and AI/ML: This is where Python's role is expanding, not shrinking.

MAS 9 is an API-first platform. External services call Maximo through REST and GraphQL. Python is one of the strongest languages for building those external integrations — data pipelines, AI/ML workloads, event processing services, reporting tools.

If your organization is doing predictive maintenance, anomaly detection, or AI-driven operations on top of MAS asset data, Python is the primary language for that work.

The shift to watch: Inside Manage, Jython scripts talk to the platform through MBO APIs. Outside Manage, Python talks to the platform through REST and GraphQL APIs. Both patterns are valid.

Your Python skills transfer. The APIs you call are changing. Learn GraphQL. Learn the MAS REST API. The rest of your Python knowledge stays relevant.

---
#Maximo #MAS9 #IBMMaximo #AssetManagement #ArtificialIntelligence
