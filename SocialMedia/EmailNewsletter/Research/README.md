# Research Archive

Monthly research briefings for The Maximo Insider newsletter.

Every monthly issue has a corresponding research folder with:
- 3 AI-agent briefings (Perplexity, Grok, Claude)
- A synthesis README with the top 5 must-cover stories
- The event calendar for the 90 days ahead

## Structure

```
Research/
├── README.md         ← You are here
├── 2026-04/          ← April 2026 research
│   ├── README.md     ← Synthesis + top 5 stories
│   ├── perplexity.md
│   ├── grok.md
│   └── claude.md
├── 2026-05/          ← (future)
└── 2026-06/          ← (future)
```

## How to add a new month

1. Run `Scripts/gather-research.md` to launch the 3 parallel research agents
2. Save their outputs to `Research/YYYY-MM/{perplexity,grok,claude}.md`
3. Write a synthesis `Research/YYYY-MM/README.md` with the top 5 stories

## Retention policy

**Keep forever.** These are fact-check audit trails. Every claim in every
newsletter issue should trace back to a citation in the corresponding
month's research folder.
