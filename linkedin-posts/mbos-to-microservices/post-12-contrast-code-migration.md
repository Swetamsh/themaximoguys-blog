---
type: contrast
title: "Migrating Your Code: The Traffic Light System"
series: "Developer Mindset Shift"
source_mdx: "micro_blogs/mbos-to-microservices/12-contrast-code-migration.mdx"
generated: "2026-02-18"
character_count: 1436
hashtags: ["#Maximo", "#MAS9", "#IBMMaximo", "#EAM", "#LegacyModernization"]
scheduling:
  recommended_day: "Wednesday"
  recommended_time: "9:00 AM ET"
  tier: 1
  series_position: "Week 2, Day 2"
  spacing_note: "1 day after carousel — mid-week value"
cover_image: null
---

Before you migrate to MAS 9, every piece of custom code you own needs a color.

Not a guess. A deliberate assessment. Use this traffic light system:

GREEN — Low Risk. Migrate with standard testing.
- Simple automation scripts using MboSet-based data access
- Standard MBO field defaults and attribute validation
- Basic business rules without IBM internal API references
- App Designer layout customizations
- Integration scripts using standard REST endpoints

What to do: Plan migration. Test in non-production. Promote.

YELLOW — Medium Risk. Evaluate before committing.
- Automation scripts calling external services (network review required)
- MBOs with moderate complexity and some IBM internal API dependencies
- App Designer customizations with custom signatures or conditional logic
- Integration points relying on specific Maximo behaviors
- Scripts using patterns at the edge of what MAS Manage supports

What to do: Evaluate individually. Can the logic move to a script, external service, or does MAS 9 handle it natively?

RED — High Risk. Redesign conversation required.
- Any code using direct SQL against the Maximo database
- Calls to deprecated or removed Maximo internal APIs
- Custom UI built on Dojo widgets, JSP templates, or custom Java beans
- MBOs hooking deep into Maximo's class hierarchy or WebSphere behavior
- Integrations depending on WebSphere JMS queues or EJB patterns

What to do: Start the redesign conversation now — before cutover planning begins.

Your GREEN items give you confidence. Your YELLOW items give you a work plan. Your RED items give you the honest conversations you need to have early.

Have you color-coded your customizations yet?

---
#Maximo #MAS9 #IBMMaximo #EAM #LegacyModernization
