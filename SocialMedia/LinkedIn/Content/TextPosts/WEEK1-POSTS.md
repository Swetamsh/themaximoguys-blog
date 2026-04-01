# Week 1 — LinkedIn Posts (Ready to Copy-Paste)

**Schedule:** Tue-Wed-Thu-Fri at 10:00 AM ET
**Images:** In this folder and ../Carousels/ and ../Polls/

---

## POST 1 — Tuesday: The Mindset Shift

**Image:** `week1-post1-mindset-shift.png`
**Type:** Text + Image

### Company Page Caption:

```
MAS 9 is NOT "Maximo 7.6 in the cloud."

We've seen seasoned Maximo admins with 15+ years of experience
approach their first MAS 9 implementation — and struggle within months.

Not because they're incompetent. Because their mindset is wrong.

The legacy patterns that made you successful on 7.6.x are now anti-patterns on MAS 9:

❌ "Maximo is my database" → The database is sealed
❌ "Customization means Java" → Automation Scripts replace MBOs
❌ "Control means server access" → No SSH, no log tailing
❌ "If it works, don't touch it" → Continuous delivery is the norm

The MAS 9 mindset:
✅ API-first integration
✅ Event-driven architecture
✅ Configuration over code
✅ Kubernetes-native operations

The mindset shift isn't optional. It's the prerequisite.

We wrote a complete guide on making this transition.
Full article in comments.

#IBMMaximo #MAS #DigitalTransformation #TheMaximoGuys
```

### First Comment (post immediately after):
```
Full deep-dive: [LINK TO BLOG POST - think-mas-01-mindset-shift]

This is Part 1 of our 12-part "Modern Maximo" series covering
the complete transformation from legacy 7.6.x to MAS 9.

Follow TheMaximoGuys for the rest of the series.
```

---

## POST 2 — Wednesday: Stop Running Maximo Like It's 2015

**Image:** `week1-post2-stop-running.png`
**Type:** Text + Image (Hot Take)

### Company Page Caption:

```
Stop running Maximo like it's 2015.

I've reviewed dozens of MAS implementations. The ones that fail
have one thing in common:

They're using 2015 patterns on a 2026 platform.

Here's what needs to die:

❌ Database triggers → The DB is sealed in MAS
❌ Custom Java classes → Automation Scripts (JS/Python) are the standard
❌ Direct SQL queries → REST APIs and GraphQL
❌ SSH into servers → kubectl and OpenShift console

Here's what replaces them:

✅ REST APIs for all integration
✅ Automation Scripts for all customization
✅ Event streams for real-time reactions
✅ Configuration-over-code for everything else

The teams that thrive on MAS are the ones that
unlearn their Maximo 7.6 habits first.

What's the hardest legacy habit to break? Tell me below.

#IBMMaximo #EAM #CloudMigration #TheMaximoGuys
```

---

## POST 3 — Thursday: MAS 9 Architecture

**Image:** `../Carousels/week1-post3-architecture.png`
**Type:** Image + Text (Architecture Explainer)

### Company Page Caption:

```
The MAS 9 architecture explained in one image.

If you're coming from Maximo 7.6, this is what changed
under the hood:

OLD: One EAR file → WebSphere → One database
NEW: Microservices → OpenShift → Operators → Shared platform

The stack, bottom to top:

🔴 OpenShift — The foundation. Enterprise Kubernetes.
🟠 Kubernetes Operators — Automate install, upgrade, scaling, healing
🟢 Microservices — Dozens of independent, containerized services
🟣 Applications — Manage, Health, Predict, Monitor, Visual Inspection

Key differences from 7.6:
→ No more EAR files deployed to WebSphere
→ No more database connection pools in XML
→ No more SSH access to tail logs
→ Deployment takes 90 minutes, not 3 days

MAS 9 isn't an upgrade. It's a re-architecture.

Understanding this stack is the foundation for everything else.

Full architecture deep-dive → link in comments.

#IBMMaximo #MAS #AssetManagement #TheMaximoGuys
```

### First Comment:
```
Full technical deep-dive: [LINK TO BLOG POST - think-mas-02-architecture-deep-dive]

We break down every layer: OpenShift, operators, microservices,
the shared services layer, and SaaS vs on-prem deployment.

Part 2 of our 12-part "Modern Maximo" series.
```

---

## POST 4 — Friday: Poll

**Image:** `../Polls/week1-post4-poll.png`
**Type:** Poll + Image

### Company Page Caption:

```
Curious about where the Maximo community stands right now.

With Maximo 7.6.1 end-of-support behind us, every organization
is somewhere on the MAS journey.

Where are you?

⬇️ Vote below and share your experience in the comments.
What's been the biggest surprise (good or bad) on your journey?

#IBMMaximo #EAM #TheMaximoGuys
```

### LinkedIn Poll Setup:
```
Question: Where are you on your MAS journey?

Option 1: Still on Maximo 7.6
Option 2: Planning migration
Option 3: Running MAS 8/9
Option 4: Evaluating options

Duration: 1 week
```

### Follow-up Comment (post after a few votes come in):
```
Our take: Based on what we're seeing, most organizations
are somewhere between "planning" and "actively migrating."

The biggest challenge we hear about? The mindset shift,
not the technical migration itself.

We wrote about this: [LINK TO BLOG]
```

---

# EMPLOYEE ADVOCACY VERSIONS

For your 3 contributors to post from their personal profiles.
Each person should customize the opening line with their own perspective.

---

## Contributor Post 1 (for Tuesday — pair with company Post 1)

```
Something I keep seeing in MAS implementations:

The most experienced Maximo teams struggle the most.

Not because they lack skill — because their 7.6 instincts
actively work against them in MAS 9.

Database-first thinking? The DB is sealed.
Custom Java? Replaced by automation scripts.
SSH and log tailing? Gone.

The teams that succeed are the ones willing to
be beginners again.

TheMaximoGuys just published a deep-dive on this
exact transition. Link in comments.

#IBMMaximo #MAS #TheMaximoGuys
```

## Contributor Post 2 (for Wednesday — pair with company Post 2)

```
Honest question for Maximo professionals:

How many of your current patterns would survive
a move to MAS 9?

When I looked at our standard implementation approach,
about 60% of it was built on assumptions
that don't hold true in MAS anymore.

Database triggers → blocked
Custom Java → deprecated path
Direct SQL → sealed
Server SSH → gone

The replacement stack is actually better —
but you have to learn it first.

Check out what TheMaximoGuys wrote about this ↓

#IBMMaximo #CloudMigration #TheMaximoGuys
```

## Contributor Post 3 (for Thursday — pair with company Post 3)

```
MAS 9 deployment takes 90 minutes.

I remember when Maximo 7.6 installs took 3 days
of careful manual configuration.

The architecture difference is staggering:
- Monolith → Microservices
- WebSphere → OpenShift
- Manual install → Operator-automated
- Vertical scaling → Horizontal pod autoscaling

TheMaximoGuys published a full architecture breakdown.
If you're planning a migration, this is essential reading.

Link in comments.

#IBMMaximo #MAS #AssetManagement #TheMaximoGuys
```

---

## Posting Checklist

### Before each post:
- [ ] Image uploaded and preview checked on mobile
- [ ] Caption copied (no formatting issues)
- [ ] Hashtags at the end (not in the middle)
- [ ] No external links in the post body (link goes in FIRST COMMENT)
- [ ] First comment ready to post within 30 seconds of publishing

### After each post (within 30 minutes):
- [ ] All 3 contributors like the post
- [ ] All 3 contributors comment something substantive
- [ ] At least 1 contributor shares or reposts
- [ ] Contributor's personal post goes live (staggered by 1-2 hours)

### Engagement (throughout the day):
- [ ] Reply to every comment on the company post
- [ ] Comment on 5 other industry posts (IBM, EAM, Maximo content)
