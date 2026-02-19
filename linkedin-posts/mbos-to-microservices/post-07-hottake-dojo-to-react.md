---
type: hot-take
title: "Dojo Is Dead. React Is the Future of Maximo UI."
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/07-hottake-dojo-to-react.mdx"
generated: "2026-02-18"
character_count: 1098
hashtags: ["#Maximo", "#MAS9", "#IBMMaximo", "#LegacyModernization", "#SoftwareDevelopment"]
scheduling:
  recommended_day: "Tuesday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 3, Day 3"
  spacing_note: "5 days after hot take #2 — bridges to Week 4"
cover_image: null
---

Your Dojo UI customizations are not migrating. They're rewriting.

If you spent years building custom Maximo UI in 7.6 — Dojo widgets, JSP modifications, custom Java beans for screen logic — hear this clearly:

That code is not portable to MAS 9.

MAS 9's UI is built on React. The architecture is fundamentally different. The UI is now a client application that communicates with the platform through APIs. There is no server-side rendering of your Java bean logic. There is no JSP template to modify.

What this means in practice:

Dojo widget customizations — need a React equivalent. The widget model is gone.

JSP modifications — the JSP layer is gone. The UI is a single-page app.

Custom Java beans for UI logic — that logic needs to move. Either into the React component, an automation script, or a backend API.

App Designer layouts — App Designer still exists but works differently. Screen definitions work. Heavily customized application frameworks need review.

The upside: React is one of the most widely known frontend frameworks in the world. The hiring pool is deep. The documentation is excellent.

Your Maximo domain knowledge still transfers. You know what the UI needs to do. You're learning how to build it in a modern way.

Start with React fundamentals before migration day arrives.

---
#Maximo #MAS9 #IBMMaximo #LegacyModernization #SoftwareDevelopment
