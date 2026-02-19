---
name: HashtagStrategy
description: TMG hashtag taxonomy, selection rules, and platform-specific guidance
---

# Hashtag Strategy

## Rules

1. **3-5 hashtags per post** — no exceptions
2. **Mix broad + niche** — 1-2 broad (50K+ followers) + 2-3 niche (under 50K)
3. **No hashtag stuffing** — hashtags go at the end, separated by `---` line break
4. **Consistent core** — always include at least 1 from Core TMG set
5. **Tag-driven selection** — map frontmatter `tags` to hashtag groups below

## Core TMG Hashtags (Always Available)

These are our brand anchors. Use 1-2 per post:

| Hashtag | Reach | Use When |
|---------|-------|----------|
| `#Maximo` | High | Every post |
| `#MAS9` | Medium | MAS 9 specific content |
| `#IBMMaximo` | High | Broader IBM audience |
| `#EAM` | Medium | Enterprise asset management topics |
| `#AssetManagement` | High | General industry reach |

## Topic Hashtag Groups

Select 2-3 from the relevant group based on content `tags`:

### Development & Customization
**Trigger tags:** `Development`, `MBO`, `GraphQL`, `Automation Scripts`, `Customization`, `API`

| Hashtag | Notes |
|---------|-------|
| `#SoftwareDevelopment` | Broad dev audience |
| `#APIFirst` | Modern architecture discussions |
| `#GraphQL` | Technical dev community |
| `#LowCode` | MAS 9 app building approach |
| `#TechnicalDebt` | When discussing legacy issues |
| `#DevOps` | CI/CD and deployment topics |

### Migration & Modernization
**Trigger tags:** `Migration`, `Upgrade`, `MAS 9`, `Cloud`, `Modernization`

| Hashtag | Notes |
|---------|-------|
| `#DigitalTransformation` | Broad enterprise reach |
| `#CloudMigration` | Cloud-specific content |
| `#LegacyModernization` | Resonates with IT leaders |
| `#ITTransformation` | CIO/CTO audience |
| `#TechModernization` | General modernization |

### Integration & Architecture
**Trigger tags:** `Integration`, `App Connect`, `REST`, `Architecture`, `OSLC`

| Hashtag | Notes |
|---------|-------|
| `#SystemIntegration` | Integration professionals |
| `#AppConnect` | IBM App Connect community |
| `#REST` | API architecture |
| `#EnterpriseArchitecture` | Architect audience |
| `#iPaaS` | Integration platform discussions |

### Administration & Operations
**Trigger tags:** `Admin`, `Configuration`, `Security`, `Performance`, `Monitoring`

| Hashtag | Notes |
|---------|-------|
| `#ITOperations` | Ops professionals |
| `#SysAdmin` | Admin community |
| `#CloudOps` | Cloud operations |
| `#ITSM` | IT service management overlap |
| `#EnterpriseIT` | Broad IT leadership |

### AI & Analytics
**Trigger tags:** `AI`, `Maximo Assist`, `Predict`, `Monitor`, `Analytics`

| Hashtag | Notes |
|---------|-------|
| `#ArtificialIntelligence` | Broad AI audience |
| `#PredictiveMaintenance` | Asset management + AI |
| `#IoT` | Connected assets |
| `#IndustrialAI` | Manufacturing/industrial |
| `#DataDriven` | Analytics-focused content |

## Platform-Specific Guidance

### LinkedIn
- **Hashtags:** 3-5 (our standard)
- **Placement:** After a `---` separator at post end
- **Format:** Each on same line, space-separated
- **Algorithm note:** LinkedIn indexes hashtags for topic feeds. First hashtag carries most weight

### X (Twitter)
- **Hashtags:** 1-2 max (more hurts engagement on X)
- **Placement:** Inline within the tweet text or at end
- **Format:** Woven into the text naturally when possible
- **Algorithm note:** X penalizes hashtag-heavy posts

### Instagram
- **Hashtags:** 5-10 (Instagram allows up to 30, but 5-10 is optimal)
- **Placement:** First comment, not caption (keeps caption clean)
- **Format:** Block of hashtags in first comment
- **Algorithm note:** Mix of sizes matters most on Instagram

## Tag-to-Hashtag Mapping

When generating hashtags, use this process:

1. Read `tags` from MDX frontmatter
2. Match each tag to a Topic Group above
3. Select 1-2 from Core TMG
4. Select 2-3 from matched Topic Groups
5. Verify total is 3-5
6. For LinkedIn: prioritize highest-reach hashtag first
