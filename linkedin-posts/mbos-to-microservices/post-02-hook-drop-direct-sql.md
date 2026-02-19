---
type: hook
title: "Drop the Direct SQL Habit. Now."
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/02-hook-drop-direct-sql.mdx"
generated: "2026-02-18"
character_count: 1142
hashtags: ["#Maximo", "#MAS9", "#GraphQL", "#IBMMaximo", "#APIFirst"]
scheduling:
  recommended_day: "Thursday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 1, Day 2"
  spacing_note: "2 days after hook #1"
cover_image: null
---

In 7.6, you could bypass the API layer with direct SQL. You probably did it more than once.

In MAS 9, that habit is actively working against you.

Direct SQL in MAS automation scripts is more restricted. The platform wants you going through MboSets and the object layer — not raw database calls. Scripts that use SqlFormat and DBManager directly need a review before you migrate.

The replacement is GraphQL. Not optional. Not "nice to have." GraphQL is now the contract for how your code talks to Maximo data.

What GraphQL gives you that OSLC never did:

- Ask for exactly the fields you need. Nothing more.
- Traverse related objects in a single query.
- Schema-defined. Your IDE auto-completes it.
- Self-documenting. No more hunting through old wiki pages for field names.

Direct SQL was a shortcut that worked until upgrade time. Then it broke. Then you spent two weeks tracking down every place it touched.

GraphQL is the contract that survives upgrades.

The sooner you drop the direct SQL habit, the less technical debt you carry into MAS 9.

Full guide in the Developer Mindset Shift series at TheMaximoGuys.com.

---
#Maximo #MAS9 #GraphQL #IBMMaximo #APIFirst
