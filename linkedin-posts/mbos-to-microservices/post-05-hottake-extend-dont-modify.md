---
type: hot-take
title: "Extend, Don't Modify. Period."
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/05-hottake-extend-dont-modify.mdx"
generated: "2026-02-18"
character_count: 1283
hashtags: ["#Maximo", "#MAS9", "#TechnicalDebt", "#IBMMaximo", "#EAM"]
scheduling:
  recommended_day: "Tuesday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 3, Day 1"
  spacing_note: "Start of hot takes week — 3 days after last Week 2 post"
cover_image: null
---

The "freedom" of 7.6 customization was a trap.

In 7.6, you modified IBM's code. You subclassed their MBOs, hooked into their class hierarchy, built on top of their internals. It felt powerful.

Then IBM shipped a fix pack. And two weeks of your life became someone else's emergency.

MAS 9 changes the model. The contract is: extend, don't modify. You work at the boundary IBM exposes, not inside the implementation.

That feels constraining at first. It is the opposite.

Here's what "extend, don't modify" actually gives you:

Your extensions survive upgrades. IBM can update their internals. Your code sits at the boundary. You don't feel it.

IBM can actually help you. When you call support, they can reason about your code because it's not tangled with theirs. Support conversations become productive.

Clear ownership boundaries. IBM's behavior is IBM's. Your behavior is yours. When something breaks, you know where to look.

Faster onboarding. New developers learn IBM's extension points. They don't need to learn the custom archaeology of every previous modification.

The teams complaining that MAS 9 is "too restrictive" are the same teams that spent the last decade fire-fighting upgrade breaks of their own making.

Extend, don't modify. It's not a constraint. It's the professional standard that should have been enforced years ago.

Agree or disagree? I want to hear from teams in the middle of migration.

---
#Maximo #MAS9 #TechnicalDebt #IBMMaximo #EAM
