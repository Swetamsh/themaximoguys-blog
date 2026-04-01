---
id: "mas-features-integration-reporting"
topic: "Integration & Reporting"
series: "MAS Features"
scheduledDate: "2026-04-06"
scheduledDay: "Monday"
platform: "LinkedIn Company"
status: "DRAFT"
postType: "Text+Image"
blogUrl: "https://themaximoguys.ai/blog/mas-features-integration-reporting"
image: "/root/themaximoguys-blog/posts/MAS-FEATURES/images/mas-features-integration-reporting.png"
---

# Integration & Reporting

**Monday, 2026-04-06** | **MAS Features Part 7**

---

## Image

![Integration & Reporting](/root/themaximoguys-blog/posts/MAS-FEATURES/images/mas-features-integration-reporting.png)

---

## Post Copy

```
Every BIRT report must be recreated from scratch. There is no migration tool.

That is the reporting story of MAS 9. The integration story is significantly better.

-> JSON API (/api) with lean=1 is the primary integration mechanism -- replaces /maxrest/rest and OSLC
-> RMI is deprecated -- rewrite all existing RMI integrations to REST API
-> Kafka replaces JMS for event-driven integration -- native OpenShift support via Strimzi
-> BIRT is being phased out for Cognos Analytics -- every report recreated manually
-> Simple BIRT reports can often be replaced by Operational Dashboard KPI cards instead of Cognos

The integration architecture is modern and powerful. The reporting migration is painful and unavoidable. Plan for both.

Full article in comments. Save this for your team.

#IBMMaximo #MAS9 #API #TheMaximoGuys #Kafka
```

---

## First Comment

```
Full deep-dive: https://themaximoguys.ai/blog/mas-features-integration-reporting

Part 7 of our 25-part MAS Features series covering the new integration architecture and BIRT-to-Cognos reality.

@IBM @IBM Maximo Application Suite

How many BIRT reports did your organization need to recreate? Did you go Cognos or dashboard KPIs?

#REST #EAM #CognosAnalytics #CMMS
```

---

## Blog Link

https://themaximoguys.ai/blog/mas-features-integration-reporting

---

## Publishing Checklist

- [ ] Review post copy
- [ ] Review image
- [ ] Approve in Notion
- [ ] Publish via tool
- [ ] Verify post live
- [ ] Update Notion -> POSTED
