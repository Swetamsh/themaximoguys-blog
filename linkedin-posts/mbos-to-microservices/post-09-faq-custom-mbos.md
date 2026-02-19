---
type: faq
title: "What Happens to My Custom MBOs?"
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/09-faq-custom-mbos.mdx"
generated: "2026-02-18"
character_count: 1275
hashtags: ["#Maximo", "#MAS9", "#EAM", "#IBMMaximo", "#LegacyModernization"]
scheduling:
  recommended_day: "Thursday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 4, Day 2"
  spacing_note: "2 days after FAQ #1"
cover_image: null
---

"What happens to my custom MBOs when we move to MAS 9?"

Short answer: It depends on the MBO. Three categories, three different answers.

Category 1 — Simple extensions (usually migrate). Field defaults. Basic validation. Straightforward attribute overrides. If your MBO does simple things in standard ways and doesn't reach deep into IBM's class hierarchy, migration risk is low. Test in non-production and move forward.

Category 2 — Complex business logic (evaluate carefully). MBOs with significant business logic, dependencies on IBM's internal APIs, or interactions with external systems need proper evaluation. The question: can this logic move to an automation script? Can it live as an external microservice? Is the coupling to Maximo so tight that it has to live inside Manage, or is that just how it was built because that was the only option?

Often the answer surprises you. The logic can move. It might even become cleaner.

Category 3 — Deep framework hooks (likely redesign). MBOs that hook deeply into Maximo's framework internals, depend on WebSphere-specific behavior, or subclass IBM classes several layers deep — these are redesign conversations. Not disaster. Redesign.

The step you cannot skip: Inventory every custom MBO you own. Assign it a category. Document the business purpose — not just the technical behavior.

That inventory is your migration roadmap. Have you started yours?

---
#Maximo #MAS9 #EAM #IBMMaximo #LegacyModernization
