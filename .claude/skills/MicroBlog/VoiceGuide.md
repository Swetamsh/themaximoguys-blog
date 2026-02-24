---
name: VoiceGuide
description: Social media voice adaptation — mirrors the actual blog tone, not corporate speak
---

# MicroBlog Voice Guide

This voice guide is built from how the blogs actually sound — not how a marketing team would write LinkedIn posts. The blogs are conversational, empathetic, occasionally funny, and always thought-provoking without being preachy.

Brand-specific overrides: `~/.claude/skills/PAI/USER/SKILLCUSTOMIZATIONS/MicroBlog/`

## The Actual Blog Voice (What We're Matching)

The blogs sound like a smart colleague explaining something over coffee. They:

- **Open with stories, not declarations** — "5:47 AM on a Tuesday. The phone buzzes on the nightstand." Not "In today's rapidly evolving landscape..."
- **Acknowledge before challenging** — "That statement stings. If you've spent years becoming an expert, the idea of 'forgetting' anything feels like an insult. But here's the truth..."
- **Use "Your fears / The reality" patterns** — they name what the reader is actually worried about, then give honest answers without sugarcoating
- **Sprinkle quiet humor** — "more SOAP web services than you'd like to admit" / "the one thing that broke that wasn't in the release notes"
- **Respect what came before** — "for almost two decades, it was a deeply satisfying role" — never dismissive of legacy knowledge
- **Make technical things feel personal** — "That -Xmx8192m wasn't arbitrary. It represented weeks of load testing."

## Core Tone: Casual, Honest, Thought-Provoking

| Trait | What It Sounds Like | What It Doesn't Sound Like |
|---|---|---|
| **Casual** | "Here's the thing..." / "Let's be honest..." | "It is imperative that..." / "Organizations must..." |
| **Empathetic** | "That's a fair worry." / "We've all been there." | "Stop doing X." / "You need to..." |
| **Thought-provoking** | "What if the problem isn't what you think?" | "BREAKING: 5 things you MUST know" |
| **Confident without ego** | "The reality is..." / "From what we've seen..." | "After 15+ years of leadership..." / "As experts..." |
| **Subtle humor** | "You could navigate the WAS console with your eyes closed — because you practically had to at 2 AM" | Forced jokes, emoji storms, "Am I right??" |
| **Honest** | "Yes, it'll take 3x longer. And work 3x better." | Overselling, hype, "it's easy!" |

## How Blog Voice Compresses for Social

The blogs have space for full stories and detailed comparisons. Social doesn't. But the *feeling* stays the same.

| Blog Pattern | Social Compression | Example |
|---|---|---|
| Story opening ("5:47 AM on a Tuesday...") | **One vivid sentence** | "Your phone buzzes at 5:47 AM. You already know which system it is." |
| Your fears / The reality | **Fear → honest one-liner** | "Will my skills become obsolete? No. But how you use them? That changes completely." |
| Comparison tables (From/To) | **Quick contrast pairs** | "7.6: Direct SQL when things break. MAS: Pod logs, distributed traces, and no database access." |
| Gentle challenge with empathy | **Acknowledge-then-pivot** | "You've spent a decade mastering this. Now the rules change — but your knowledge doesn't go to waste." |
| Quiet humor | **Same energy, shorter** | "You've configured more SOAP services than anyone should have to." |
| "The reality is..." honest take | **Direct without preaching** | "MIF still exists. It's just not the center of the universe anymore." |

## What NOT to Do

These are the anti-patterns that would make the social posts sound nothing like the blogs:

| Anti-Pattern | Why It's Wrong | Instead |
|---|---|---|
| "STOP doing X!!" | The blogs never yell. They guide. | "Here's why that pattern doesn't work anymore..." |
| "Let me be clear:" | Corporate authority posturing | Just say the thing clearly |
| "After 15+ years..." | Credential-dropping. The blogs earn trust through insight, not resume. | Show the insight directly |
| "Follow for more!" / "Drop your take below!" | Forced engagement bait | End with a genuine question if it fits, or just let the thought land |
| "In today's rapidly evolving landscape..." | LinkedIn-brain opener | Start with something specific and real |
| "MUST", "NEED TO", "CRITICAL" | Urgency-manufacturing | The blogs make you *want* to learn, not *fear* not learning |
| "Thought leader" / "Disrupt" / "Leverage" | Corporate buzzword contamination | Plain language. Always. |
| Emoji-heavy formatting | The blogs use almost zero emoji | Let the words do the work |

## Platform Adaptation Notes

The tone stays the same everywhere. Only the length changes.

| Platform | Length Target | Adaptation |
|---|---|---|
| **LinkedIn** | 150-250 words | Slightly more structured (line breaks, spacing). Can use the full "fear/reality" pattern. |
| **X / Twitter** | 280 chars/tweet, 5-10 per thread | Punchier. One thought per tweet. Humor lands harder in short form. |
| **Instagram** | 80-150 words caption | Most conversational. The visual carries weight, caption adds context. |
| **Generic** | 120-200 words | Default. Works anywhere. |

## The Emotional Arc (Compressed)

The blogs build through: Empathy → Challenge → Honest Reality → Practical Path Forward

For social, that compresses to:

| Beat | Purpose | Feel |
|---|---|---|
| **Hook** | Make them feel seen | "You know that feeling when..." / A vivid specific moment |
| **Pivot** | The thought-provoking part | "But what if..." / "Here's what actually changed..." |
| **Landing** | Leave them thinking | A question, a clean contrast, or a quiet truth — NOT a CTA |

## Quick Voice Checks

Before publishing any micro-content, ask:

1. **Does this sound like a person talking, or a brand posting?** — If it sounds like a brand, rewrite.
2. **Would you say this to a colleague at lunch?** — If it feels too formal, loosen it up.
3. **Is there empathy before any challenge?** — The blogs always acknowledge before pushing.
4. **Does the ending let the thought breathe?** — Don't force an engagement CTA. If the thought is good, people will respond.
5. **Zero emoji?** — Good. The blogs don't use them, the social shouldn't either.
