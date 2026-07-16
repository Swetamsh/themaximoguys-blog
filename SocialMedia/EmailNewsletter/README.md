# The Maximo Insider — Operating System

The durable home for TheMaximoGuys email newsletter program. Everything
here is committed to the repo; transient session notes live in `MEMORY/WORK/`.

## Folder layout

```
SocialMedia/EmailNewsletter/
├── README.md                   ← You are here. Workflow + rhythm.
├── Strategy/
│   ├── EMAIL-STRATEGY.md       ← The plan. Start here.
│   └── CREDENTIALS.md          ← API keys & accounts status.
├── Content/
│   ├── Templates/
│   │   ├── monthly-issue.md    ← Flagship template (1,500 words).
│   │   └── weekly-wire.md      ← Weekly micro template (300 words).
│   └── Editions/
│       └── NNN-slug/           ← Each issue: DRAFT.md, FINAL.md, SOURCES.md, assets/
├── Prompts/
│   ├── monthly-research-perplexity.md  ← Product news research prompt
│   ├── monthly-research-grok.md        ← X/corporate/community prompt
│   └── monthly-research-claude.md      ← TechXchange + IBM blogs prompt
├── Research/
│   └── YYYY-MM/                 ← Monthly research briefings (archived forever)
│       ├── perplexity.md
│       ├── grok.md
│       ├── claude.md
│       └── SYNTHESIS.md (optional)
└── Scripts/
    ├── new-issue.sh             ← Scaffold a new issue
    └── gather-research.md       ← Run the monthly research pass
```

## The monthly rhythm (T-0 = 1st Tuesday at 08:00 ET)

```
T-10: Run the 3-agent research pass
       → Scripts/gather-research.md
       → outputs to Research/YYYY-MM/

T-8:  Scripts/new-issue.sh 001 april-30-cliff
       → creates Content/Editions/001-april-30-cliff/DRAFT.md

T-8→T-3: Draft the issue in DRAFT.md (reference Research/YYYY-MM/)

T-3:  Internal review + copy-edit

T-1:  Load into Beehiiv, preview, schedule

T-0:  Send at 08:00 ET

T+1:  Repost featured deep-dive as LinkedIn article (company + personal)

T+3:  Publish FINAL.md into Sanity as /newsletter/SLUG for SEO capture

T+7:  Weekly MaximoWire ships (Friday 08:00 ET)
```

## The weekly rhythm (every Friday 08:00 ET)

Lightweight. 3 sections. 300 words:
1. **New on themaximoguys.com** — latest blog post
2. **This Week in Maximo** — one industry signal
3. **From LinkedIn** — one thread worth reading

Template: `Content/Templates/weekly-wire.md`

## Starting a new issue

```bash
cd SocialMedia/EmailNewsletter
./Scripts/new-issue.sh 001 april-30-cliff
# → creates Content/Editions/001-april-30-cliff/ with DRAFT.md
```

For a weekly wire:

```bash
./Scripts/new-issue.sh W-18 week-of-apr-20 weekly
```

## Running the monthly research pass

See `Scripts/gather-research.md` — launches the 3 parallel research agents
(Perplexity + Grok + Claude) in Claude Code using the prompts in `Prompts/`.
Outputs saved to `Research/YYYY-MM/`.

## Sources of truth

| System | Role |
|---|---|
| `Strategy/EMAIL-STRATEGY.md` | Why we do what we do — positioning, sections, metrics |
| `Strategy/CREDENTIALS.md` | What API keys are available; what's still needed |
| Sanity CMS (`ajindfal` / `production`) | Blog post inventory (102 posts) |
| Beehiiv (TBD) | Subscriber list + email sends |
| LinkedIn API (`scripts/linkedin-auto-publish.ts`) | Syndication |
| Notion DB `333638519ab181aa96cce62459aa08ea` | Content calendar |

## Getting help

- Workflow questions → read this file
- Strategy questions → `Strategy/EMAIL-STRATEGY.md`
- Credential questions → `Strategy/CREDENTIALS.md`
- Template questions → the template file itself
- Research questions → `Scripts/gather-research.md`

## Related programs

- `../LinkedIn/` — LinkedIn publishing pipeline (already operational)
- `../Strategy/` — cross-channel strategy hub (higher-level)
- `../IBMTechXchange/` — TechXchange-specific content planning
- `../Medium/`, `../YouTube/`, `../Twitter/`, `../Podcast/` — other channels
