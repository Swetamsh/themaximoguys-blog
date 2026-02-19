---
name: SchedulingGuide
description: LinkedIn posting times, cadence, and content sequencing for B2B enterprise tech
---

# Scheduling Guide

Optimized for TMG's audience: IBM Maximo administrators, developers, architects, and IT leaders in enterprise organizations.

## Best Posting Times (B2B Enterprise Tech)

### Tier 1 — Peak Engagement
| Day | Time (ET) | Why |
|-----|-----------|-----|
| Tuesday | 8:00-10:00 AM | Morning LinkedIn check, fresh week energy |
| Wednesday | 8:00-10:00 AM | Mid-week, high professional engagement |
| Thursday | 8:00-10:00 AM | Pre-weekend planning, high scroll time |

### Tier 2 — Good Engagement
| Day | Time (ET) | Why |
|-----|-----------|-----|
| Tuesday | 12:00-1:00 PM | Lunch break browsing |
| Wednesday | 12:00-1:00 PM | Lunch break browsing |
| Monday | 10:00-11:00 AM | Slower start, but builds through morning |

### Tier 3 — Acceptable
| Day | Time (ET) | Why |
|-----|-----------|-----|
| Friday | 8:00-10:00 AM | Lower engagement but still viable |
| Any weekday | 5:00-6:00 PM | End-of-day scroll, lower but consistent |

### Avoid
- **Weekends** — B2B audience largely offline
- **Monday before 9 AM** — inbox triage mode
- **Friday after 2 PM** — mentally checked out
- **Any day after 7 PM** — diminishing returns

## Posting Frequency

| Cadence | Posts/Week | Best For |
|---------|-----------|----------|
| **Recommended** | 3-4 | Consistent visibility without fatigue |
| Aggressive | 5 | Product launches, event weeks |
| Minimum | 2 | Maintain presence during low-content periods |

**Rule:** Never post more than once per day. LinkedIn algorithm penalizes rapid-fire posting.

## Content Sequencing Within a Series

When publishing a multi-part micro-content series (e.g., all 13 pieces from one blog post), follow this sequence:

### Week 1: Build Awareness
| Day | Content Type | Purpose |
|-----|-------------|---------|
| Tuesday | **Hook** | Grab attention, introduce the topic tension |
| Thursday | **Hot Take** | Drive debate, build engagement |

### Week 2: Deliver Value
| Day | Content Type | Purpose |
|-----|-------------|---------|
| Tuesday | **Carousel** | Deep value, high save rate |
| Wednesday | **Thread** | Narrative arc, builds on carousel |
| Friday | **FAQ** | Answer questions from engagement |

### Week 3: Reinforce & Convert
| Day | Content Type | Purpose |
|-----|-------------|---------|
| Tuesday | **Contrast** | Old vs New, clear value prop |
| Thursday | **Listicle** | Quick-hit value, high saves |
| Friday | **Hook #2** (if available) | Re-engage with fresh angle |

### Spacing Rules
- **Same type:** Space at least 5 days apart (no two carousels in one week)
- **Related content:** Space 2-3 days apart minimum
- **Series posts:** Don't post more than 4 from same series per week
- **Carousel posts:** Mid-week (Tue-Thu) for maximum engagement

## Series Pacing

For a 13-piece micro-content series:

| Timeframe | Pieces | Strategy |
|-----------|--------|----------|
| Week 1 | 2-3 | Hooks + Hot Take — build awareness |
| Week 2 | 3-4 | Carousel + Thread + FAQ — deliver value |
| Week 3 | 3-4 | Contrast + Listicle + remaining — reinforce |
| Week 4 | 2-3 | Remaining pieces + recap/compilation |

**Total duration:** 3-4 weeks per series. This prevents content fatigue while maintaining momentum.

## Metadata Format

When generating scheduling recommendations, output in this format:

```json
{
  "recommended_day": "Tuesday",
  "recommended_time": "9:00 AM ET",
  "tier": 1,
  "content_type": "carousel",
  "series_position": "Week 2, Day 1",
  "spacing_note": "Post after hook from Tuesday — 2 day gap",
  "avoid_conflicts": "Don't post if another carousel was posted this week"
}
```

## LinkedIn Algorithm Notes

- **First hour matters:** Engagement in the first 60 minutes determines reach
- **Comments > Reactions:** Algorithm weights comments heavily. Write posts that invite responses
- **Saves boost reach:** Carousels and listicles get high save rates
- **Dwell time:** Longer posts that get fully read signal quality to the algorithm
- **Reshares:** Lower algorithmic weight than comments, but still valuable for reach
- **PDF carousels:** LinkedIn native carousel format gets preferential treatment over image carousels
