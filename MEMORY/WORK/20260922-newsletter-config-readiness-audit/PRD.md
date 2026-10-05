---
task: Verify newsletter configuration readiness with website
slug: 20260922-newsletter-config-readiness-audit
effort: standard
phase: verify
progress: 17/17
mode: interactive
started: 2026-09-22T00:00:00Z
updated: 2026-09-22T00:00:00Z
---

## Context

Swetansh asked whether the newsletter configuration is ready with his website. This is a
read-only readiness audit spanning two repos: `/root/themaximoguys-blog` (content/strategy)
and `/root/THEMAXIMOGUYS-NEXTJS` (the live site at themaximoguys.ai).

Memory recorded "Beehiiv provisioning is the launch blocker" from the v1.0 marketing strategy.
The audit must establish what was ACTUALLY built, not what the strategy planned — those have
diverged (the site implements a self-hosted Resend + Supabase newsletter, not Beehiiv).

The question is binary but the answer is layered: code can exist and still not deliver email.
Verdict must separate "capture works" from "sending works".

### Risks
- Assuming code presence equals working feature (silent-skip failure mode in resend.ts)
- Vercel production env not readable from here — RESEND_API_KEY status inferrable only via DNS
- Confusing dev schema readiness with prod schema readiness
- Reporting the Beehiiv strategy doc as current truth when the build went a different way

### Plan
Probe four layers independently: (1) database table, (2) API routes + UI capture points,
(3) email sending library + drip cron, (4) deliverability (DNS/domain verification).
Deliverability is the layer most likely to be the actual blocker.

## Criteria

- [x] ISC-1: newsletter_subscribers table exists in tmg_dev schema
- [x] ISC-2: newsletter_subscribers table exists in tmg_prod schema
- [x] ISC-3: /api/newsletter/subscribe route present in site repo
- [x] ISC-4: /api/newsletter/unsubscribe route present in site repo
- [x] ISC-5: Public /newsletter page returns HTTP 200 live
- [x] ISC-6: Newsletter capture embedded in blog post pages
- [x] ISC-7: Newsletter capture embedded in site footer
- [x] ISC-8: resend npm package present in package.json dependencies
- [x] ISC-9: Welcome email template implemented in lib/email/resend.ts
- [x] ISC-10: Drip sequence cron route exists with content steps
- [x] ISC-11: Vercel cron schedule registered for email-sequence path
- [x] ISC-12: RESEND_API_KEY presence in local env determined
- [x] ISC-13: Resend DKIM DNS record presence on themaximoguys.ai determined
- [x] ISC-14: Root SPF record checked for Resend sending include
- [x] ISC-15: CRON_SECRET configuration status determined
- [x] ISC-16: Subscriber row count measured in both schemas
- [x] ISC-A1: No code, DNS, env, or database changes made

## Decisions

- Treated DNS as the proxy signal for Resend domain verification, because the Vercel CLI
  is unauthenticated here and production env vars cannot be read directly.
- Reported the built architecture (Resend + Supabase self-hosted) over the strategy doc's
  Beehiiv plan, because the code is the source of truth about what exists today.

## Verification

**Capture layer — WORKING**
- ISC-1/2: `curl` REST probe returned HTTP 200 for `newsletter_subscribers` under both
  `Accept-Profile: tmg_dev` and `tmg_prod`.
- ISC-3/4: `app/api/newsletter/subscribe/route.ts` (zod validation, rate limit 5/hr/IP,
  BotID rejection, reactivation path) and `.../unsubscribe/route.ts` (UUID token, HTML page).
- ISC-5: `https://themaximoguys.ai/newsletter` → HTTP 200.
- ISC-6: `NewsletterCTA` imported line 20, mounted line 365 in `app/(marketing)/blog/[slug]/page.tsx`.
- ISC-7: `FooterNewsletter` imported line 5, mounted line 80 in `components/layout/Footer.tsx`.
- Live POST to `/api/newsletter/subscribe` returned HTTP 403 `{"error":"Access denied"}` —
  that is `rejectBots()` correctly refusing a curl agent, i.e. the endpoint is live and guarded.

**Sending layer — CODE COMPLETE, NOT DELIVERABLE**
- ISC-8: `"resend": "^6.9.2"` at `package.json:50`.
- ISC-9: `sendWelcomeEmail()` in `lib/email/resend.ts`, FROM `newsletter@themaximoguys.ai`.
- ISC-10: `app/api/cron/email-sequence/route.ts` — 3+ drip steps at days 3, 7, 10.
- ISC-11: `vercel.json` crons → `/api/cron/email-sequence` at `0 14 * * *`.
- ISC-12: `RESEND_API_KEY` present in `.env.example` but ABSENT from `.env.local`; also absent
  from `/root/.claude-pai/.env`. Production value unverifiable (Vercel CLI unauthenticated).
- ISC-13: `dig TXT resend._domainkey.themaximoguys.ai` → EMPTY. No Resend DKIM record.
- ISC-14: Root SPF is `v=spf1 include:_spf.google.com ~all` — no Resend include.
  `send.themaximoguys.ai` MX/TXT empty. `_dmarc.themaximoguys.ai` empty.
- ISC-15: `requireCronAuth()` fails closed on missing `CRON_SECRET`; key absent from `.env.local`.
- ISC-16: `Content-Range: */0` in both schemas — zero subscribers to date.

**Failure mode identified:** `lib/email/resend.ts` initialises `resend` as `null` when
`RESEND_API_KEY` is unset, and every send function then returns `{success:true, skipped:true}`.
A subscription therefore succeeds and persists to Supabase while the welcome email silently
never sends. Combined with the missing DKIM/SPF records, mail from
`newsletter@themaximoguys.ai` would be rejected or spam-foldered even once a key is added.

**Explore sweep findings (post-verify addendum) — two additional blockers**

- **No issue-send path exists in code.** `lib/email/resend.ts` exports `sendBatchNewsletter`
  (~line 106) but NOTHING in either repo calls it. There is also no admin page for
  `newsletter_subscribers` — admin routes cover leads/users/resources/settings only. So
  subscribers can be collected but not viewed, exported, or mailed an issue without direct
  DB access. Fixing the API key alone would only enable welcome + drip emails, not issues.
- **Docs and code disagree on list ownership.** Every blog-repo strategy doc routes
  subscribers to Beehiiv (`SocialMedia/EmailNewsletter/Strategy/CREDENTIALS.md` marks
  `BEEHIIV_API_KEY`/`BEEHIIV_PUBLICATION_ID`/`BEEHIIV_DOMAIN` ❌ not provisioned;
  `EMAIL-STRATEGY.md:295` calls for embedding a Beehiiv form in sidebar + footer). The
  shipped site routes them to Supabase + Resend. Following the doc checklist would embed a
  second form and split the list across two systems.
- **Two capture surfaces missed in first pass**, both POSTing to the same endpoint:
  `components/marketing/ExitIntentPopup.tsx:76` and `components/marketing/ResourceGate.tsx:71`.
- **Independent confirmation of the key gap:** `plans/MARKETING_INFRASTRUCTURE.md` cost table
  marks Resend "Code ready, needs API key", and its Testing Checklist is entirely unchecked.
- **No Sanity newsletter schema** — README plans publishing issues to `/newsletter/SLUG` for
  SEO, but there is no schema to land them in.
- **No tests** exercise the subscribe flow; zero hits for "newsletter"/"subscribe" in
  `tests/` or `scripts/`.
- **Misleading placeholder UI:** `app/(admin)/dashboard/settings/page.tsx:~67-85` renders
  SMTP Host/Port/From Email inputs with no state or handler (template leftover
  `noreply@vdtech.com`). Not a real send path.

**ISC-A1:** Audit was read-only — only `cat`/`grep`/`dig`/`curl` GET and one intentionally
malformed POST that was rejected before any write. No files, DNS, env, or rows changed.
