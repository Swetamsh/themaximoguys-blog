#!/usr/bin/env bun
/**
 * LinkedIn Auto-Publisher — Notion-driven daily cron job
 *
 * Queries the TMG LinkedIn Content Calendar in Notion for posts scheduled today
 * with status SCHEDULED or APPROVED, publishes them to LinkedIn (personal/company/both),
 * then updates Notion with the published URL and POSTED status.
 *
 * Usage:
 *   bun run scripts/linkedin-auto-publish.ts              # Publish today's scheduled posts
 *   bun run scripts/linkedin-auto-publish.ts --dry-run     # Preview without publishing
 *
 * Cron: 0 12 * * * cd /root/themaximoguys-blog && /root/.bun/bin/bun run scripts/linkedin-auto-publish.ts >> logs/cron.log 2>&1
 *
 * Environment:
 *   /root/themaximoguys-blog/.env.local — LINKEDIN_ACCESS_TOKEN, LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET
 *   /root/.claude-pai/.env              — NOTION_TOKEN
 */

import { readFileSync, existsSync, appendFileSync, mkdirSync } from "fs";
import { join } from "path";

// ─── Configuration ───────────────────────────────────────────
const NOTION_DATABASE_ID = "333638519ab181aa96cce62459aa08ea";
const NOTION_API_VERSION = "2022-06-28";
const PERSON_URN = "urn:li:person:hj5bWVNgmt";
const ORG_URN = "urn:li:organization:111960338";
const LINKEDIN_API_VERSION = process.env.LINKEDIN_VERSION || "202603";
const POST_DELAY_MS = 30_000;
const COMMENT_WAIT_MS = 5_000;
const COMMENT_RETRY_WAIT_MS = 10_000;

const PROJECT_ROOT = "/root/themaximoguys-blog";
const LOGS_DIR = join(PROJECT_ROOT, "logs");

// ─── Load Environment ────────────────────────────────────────
const ENV_PATHS = [
  join(PROJECT_ROOT, ".env.local"),
  "/root/.claude-pai/.env",
];

for (const envPath of ENV_PATHS) {
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}

const LINKEDIN_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN || "";

// ─── Personal identities ─────────────────────────────────────
// `Posted By` → env var holding that person's own LinkedIn token. Each person
// posts with their own token and member URN; nobody falls back to Surendra.
const PERSONAL_TOKEN_ENV: Record<string, string> = {
  "surendra katta": "LINKEDIN_ACCESS_TOKEN",
  krishna: "KRISHNA_LINKEDIN_ACCESS_TOKEN",
  venkat: "VENKAT_LINKEDIN_ACCESS_TOKEN",
  laxmi: "LAXMI_LINKEDIN_ACCESS_TOKEN",
};

interface Identity {
  label: string;
  urn: string;
  token: string;
}

// Token used by the low-level LinkedIn API helpers for the current publish.
let activeToken = LINKEDIN_TOKEN;
const identityCache = new Map<string, Identity>();

async function resolvePersonalIdentity(postedByRaw: string): Promise<Identity> {
  // Empty Posted By keeps the historical default (Surendra's personal profile).
  const key = postedByRaw.trim().toLowerCase() || "surendra katta";
  const cached = identityCache.get(key);
  if (cached) return cached;

  const envName = PERSONAL_TOKEN_ENV[key];
  if (!envName) {
    throw new Error(`No LinkedIn identity configured for Posted By "${postedByRaw}"`);
  }
  const token = process.env[envName] || "";
  if (!token) throw new Error(`${envName} is not set — cannot post as "${postedByRaw}"`);

  let urn: string;
  if (key === "surendra katta") {
    urn = PERSON_URN;
  } else {
    // Look up the member URN from the person's own token.
    const res = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`userinfo failed for "${postedByRaw}": ${res.status} ${await res.text()}`);
    }
    const info = await res.json();
    if (!info.sub) throw new Error(`userinfo returned no member id for "${postedByRaw}"`);
    urn = `urn:li:person:${info.sub}`;
  }

  const identity = { label: postedByRaw.trim() || "Surendra Katta", urn, token };
  identityCache.set(key, identity);
  return identity;
}

const NOTION_TOKEN = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY || "";
const DRY_RUN = process.argv.includes("--dry-run");

// ─── Logging ─────────────────────────────────────────────────
mkdirSync(LOGS_DIR, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const logFile = join(LOGS_DIR, `linkedin-publish-${today}.log`);

function log(message: string): void {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  appendFileSync(logFile, line + "\n");
}

function logError(message: string, error?: unknown): void {
  const errMsg = error instanceof Error ? error.message : String(error || "");
  log(`ERROR: ${message}${errMsg ? " — " + errMsg : ""}`);
}

// ─── Notion API ──────────────────────────────────────────────

interface NotionPost {
  pageId: string;
  title: string;
  hashtags: string;
  imagePath: string;
  firstComment: string;
  blogLink: string;
  platform: string;
  postedBy: string;
  postType: string;
  scheduledDate: string;
  status: string;
  series: string;
  notes: string;
}

function getNotionHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Notion-Version": NOTION_API_VERSION,
    "Content-Type": "application/json",
  };
}

function extractNotionText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") {
    return (prop.title || []).map((t: any) => t.plain_text).join("") || "";
  }
  if (prop.type === "rich_text") {
    return (prop.rich_text || []).map((t: any) => t.plain_text).join("") || "";
  }
  if (prop.type === "url") {
    return prop.url || "";
  }
  if (prop.type === "select") {
    return prop.select?.name || "";
  }
  if (prop.type === "date") {
    return prop.date?.start || "";
  }
  return "";
}

async function queryScheduledPosts(): Promise<NotionPost[]> {
  const todayStr = new Date().toISOString().slice(0, 10);

  const body = {
    filter: {
      and: [
        {
          property: "Scheduled Date",
          date: { equals: todayStr },
        },
        {
          or: [
            { property: "Status", select: { equals: "SCHEDULED" } },
            { property: "Status", select: { equals: "APPROVED" } },
          ],
        },
        {
          property: "Published URL",
          url: { is_empty: true },
        },
      ],
    },
    sorts: [
      { property: "Scheduled Date", direction: "ascending" as const },
    ],
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: getNotionHeaders(),
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Notion query failed: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const posts: NotionPost[] = [];

  for (const page of data.results || []) {
    const props = page.properties || {};
    posts.push({
      pageId: page.id,
      title: extractNotionText(props["Title"]),
      hashtags: extractNotionText(props["Hashtags"]),
      imagePath: extractNotionText(props["Image Path"]),
      firstComment: extractNotionText(props["First Comment"]),
      blogLink: extractNotionText(props["Blog Link"]),
      platform: extractNotionText(props["Platform"]),
      postedBy: extractNotionText(props["Posted By"]),
      postType: extractNotionText(props["Post Type"]),
      scheduledDate: extractNotionText(props["Scheduled Date"]),
      status: extractNotionText(props["Status"]),
      series: extractNotionText(props["Series"]),
      notes: extractNotionText(props["Notes"]),
    });
  }

  return posts;
}

async function updateNotionPage(
  pageId: string,
  publishedUrl: string
): Promise<void> {
  const body = {
    properties: {
      Status: { select: { name: "POSTED" } },
      "Published URL": { url: publishedUrl },
    },
  };

  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: getNotionHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Notion update failed: ${res.status} ${errText}`);
  }
}

// ─── LinkedIn API ────────────────────────────────────────────

function getLinkedInHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${activeToken}`,
    "X-Restli-Protocol-Version": "2.0.0",
    "Linkedin-Version": LINKEDIN_API_VERSION,
    "Content-Type": "application/json",
  };
}

function postUrnToUrl(postUrn: string): string {
  return `https://www.linkedin.com/feed/update/${postUrn}/`;
}

async function initializeImageUpload(
  ownerUrn: string
): Promise<{ uploadUrl: string; imageUrn: string }> {
  const res = await fetch(
    "https://api.linkedin.com/rest/images?action=initializeUpload",
    {
      method: "POST",
      headers: getLinkedInHeaders(),
      body: JSON.stringify({ initializeUploadRequest: { owner: ownerUrn } }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Image init failed: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return { uploadUrl: data.value.uploadUrl, imageUrn: data.value.image };
}

async function uploadImageBinary(
  uploadUrl: string,
  imagePath: string
): Promise<void> {
  const imageData = readFileSync(imagePath);
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${activeToken}`,
      "Content-Type": "application/octet-stream",
    },
    body: imageData,
  });

  if (!res.ok && res.status !== 201) {
    const errText = await res.text();
    throw new Error(`Image upload failed: ${res.status} ${errText}`);
  }
}

// LinkedIn Posts API `commentary` uses "little text" format: unescaped reserved
// chars like ( ) [ ] { } < > @ * _ ~ | \ make LinkedIn silently TRUNCATE the post
// at that point (lost CTA + hashtags). `#` is left alone so #hashtags still link.
function escapeLittleText(text: string): string {
  return text.replace(/[\\|{}@\[\]()<>*_~]/g, (c) => `\\${c}`);
}

async function createLinkedInPost(opts: {
  authorUrn: string;
  text: string;
  imageUrn?: string;
}): Promise<string> {
  const body: any = {
    author: opts.authorUrn,
    commentary: escapeLittleText(opts.text),
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  if (opts.imageUrn) {
    body.content = { media: { title: "Infographic", id: opts.imageUrn } };
  }

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: getLinkedInHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Post creation failed: ${res.status} ${errText}`);
  }

  return res.headers.get("x-restli-id") || "unknown";
}

// Comment @-tags: plain "@Name" text does NOT tag anyone via the API. Known orgs
// become real mentions (attributes); names with no taggable LinkedIn page are dropped.
const MENTION_ORGS: Record<string, string> = { IBM: "urn:li:organization:1009" };
const DROP_MENTIONS = ["@IBM Maximo Application Suite", "@IBM Technology"];

function buildCommentMessage(raw: string): { text: string; attributes: any[] } {
  let text = raw;
  for (const d of DROP_MENTIONS) text = text.split(d).join("");
  text = text.replace(/[ \t]+$/gm, "").replace(/[ \t]{2,}/g, " ").trimEnd();

  const attributes: any[] = [];
  const re = new RegExp(`@(${Object.keys(MENTION_ORGS).join("|")})(?![\\w-])`, "g");
  let out = "";
  let last = 0;
  for (const m of text.matchAll(re)) {
    out += text.slice(last, m.index);
    attributes.push({
      start: out.length,
      length: m[1].length,
      value: {
        "com.linkedin.common.CompanyAttributedEntity": { company: MENTION_ORGS[m[1]] },
      },
    });
    out += m[1];
    last = m.index! + m[0].length;
  }
  out += text.slice(last);
  return { text: out, attributes };
}

async function addFirstComment(
  postUrn: string,
  commentText: string,
  actorUrn: string
): Promise<boolean> {
  const encodedUrn = encodeURIComponent(postUrn);
  const message = buildCommentMessage(commentText);
  const post = (msg: any) => fetch(
    `https://api.linkedin.com/v2/socialActions/${encodedUrn}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${activeToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        actor: actorUrn,
        message: msg,
      }),
    }
  );

  let res = await post(message.attributes.length ? message : { text: message.text });
  // If LinkedIn rejects the mention attributes, still post the link as plain text.
  if (!res.ok && message.attributes.length && (res.status === 400 || res.status === 422)) {
    log(`Comment with mentions rejected (${res.status}): ${await res.text()} — retrying without mentions`);
    res = await post({ text: message.text });
  }

  if (!res.ok) {
    const errText = await res.text();
    log(`Comment API failed: ${res.status} ${errText}`);
    return false;
  }

  return true;
}

// ─── Publishing Logic ────────────────────────────────────────

interface PublishResult {
  postUrn: string;
  url: string;
  target: "personal" | "company";
}

type PublishTarget = "personal" | "company";

const FIRST_COMMENT_CTA = "🔗 Link to the full blog is in the first comment 👇";

async function publishPost(
  post: NotionPost,
  asOrg: boolean
): Promise<PublishResult> {
  // Company page posts use Surendra's (admin) token; personal posts use the
  // token of whoever is named in `Posted By`.
  let authorUrn: string;
  if (asOrg) {
    authorUrn = ORG_URN;
    activeToken = LINKEDIN_TOKEN;
  } else {
    const identity = await resolvePersonalIdentity(post.postedBy || "");
    authorUrn = identity.urn;
    activeToken = identity.token;
  }
  const target = asOrg ? "company" : "personal";

  log(`  Publishing as ${target} (${authorUrn})...`);

  // Upload image if provided
  let imageUrn: string | undefined;
  if (post.imagePath) {
    const imagePath = post.imagePath.startsWith("/")
      ? post.imagePath
      : join(PROJECT_ROOT, post.imagePath);

    if (!existsSync(imagePath)) {
      throw new Error(`Image not found: ${imagePath}`);
    }

    log(`  Uploading image: ${imagePath}`);
    const { uploadUrl, imageUrn: urn } = await initializeImageUpload(authorUrn);
    await uploadImageBinary(uploadUrl, imagePath);
    imageUrn = urn;
    log(`  Image uploaded: ${imageUrn}`);
  }

  // Create post — text is hashtags only (infographic + hashtags approach)
  let text = post.hashtags || "";
  if (!text) {
    throw new Error("No hashtags/text content for post");
  }

  // Every post (personal + company) ends with a pointer to the blog link,
  // which goes in the first comment. Skip if the copy already says so.
  if (post.firstComment && !/first comment/i.test(text)) {
    text = `${text.trimEnd()}\n\n${FIRST_COMMENT_CTA}`;
  }

  log(`  Creating post...`);
  const postUrn = await createLinkedInPost({ authorUrn, text, imageUrn });
  const url = postUrnToUrl(postUrn);
  log(`  Post published: ${postUrn}`);
  log(`  URL: ${url}`);

  // Add first comment if provided
  if (post.firstComment && postUrn !== "unknown") {
    log(`  Waiting ${COMMENT_WAIT_MS / 1000}s for post propagation...`);
    await new Promise((r) => setTimeout(r, COMMENT_WAIT_MS));

    log(`  Adding first comment as ${target}...`);
    let success = await addFirstComment(postUrn, post.firstComment, authorUrn);
    if (!success) {
      log(`  Retrying comment after ${COMMENT_RETRY_WAIT_MS / 1000}s...`);
      await new Promise((r) => setTimeout(r, COMMENT_RETRY_WAIT_MS));
      success = await addFirstComment(postUrn, post.firstComment, authorUrn);
    }
    if (success) {
      log(`  First comment added successfully`);
    } else {
      log(`  WARNING: First comment failed. Manual action needed.`);
      log(`  Comment text: ${post.firstComment}`);
    }
  }

  return { postUrn, url, target };
}

function normalizeSelectorValue(value: string): string {
  return value.trim().toLowerCase();
}

function resolvePublishTargets(post: NotionPost): PublishTarget[] {
  const postedBy = normalizeSelectorValue(post.postedBy || "");
  const platform = normalizeSelectorValue(post.platform || "");

  const companyOwners = new Set([
    "company",
    "company page",
    "themaximoguys",
  ]);
  const personalOwners = new Set([
    "surendra katta",
    "krishna",
    "venkat",
    "laxmi",
  ]);
  const bothSelectors = new Set([
    "both",
    "company + personal",
    "personal + company",
    "company and personal",
    "personal and company",
  ]);

  // `Posted By` is authoritative when present. This prevents personal posts
  // from being duplicated to the company page when `Platform` is stale/mis-set.
  if (companyOwners.has(postedBy)) {
    return ["company"];
  }
  if (personalOwners.has(postedBy)) {
    return ["personal"];
  }
  if (bothSelectors.has(postedBy)) {
    return ["company", "personal"];
  }

  if (platform === "linkedin company" || platform === "company") {
    return ["company"];
  }
  if (platform === "linkedin personal" || platform === "personal") {
    return ["personal"];
  }
  if (platform === "both") {
    return ["company", "personal"];
  }

  return ["personal"];
}

// ─── Main ────────────────────────────────────────────────────

async function main(): Promise<void> {
  log("═══════════════════════════════════════════════════════");
  log(`LinkedIn Auto-Publisher — ${today}`);
  log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
  log("═══════════════════════════════════════════════════════");

  // Validate credentials
  if (!LINKEDIN_TOKEN) {
    logError("LINKEDIN_ACCESS_TOKEN not set");
    process.exit(1);
  }
  if (!NOTION_TOKEN) {
    logError("NOTION_TOKEN / NOTION_API_KEY not set");
    process.exit(1);
  }

  // Query Notion for today's posts
  log("Querying Notion for scheduled posts...");
  let posts: NotionPost[];
  try {
    posts = await queryScheduledPosts();
  } catch (e) {
    logError("Failed to query Notion", e);
    process.exit(1);
  }

  log(`Found ${posts.length} post(s) scheduled for today`);

  if (posts.length === 0) {
    log("Nothing to publish. Exiting.");
    return;
  }

  // Process each post
  let publishedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const targets = resolvePublishTargets(post);
    log(`\n─── Post ${i + 1}/${posts.length}: "${post.title}" ───`);
    log(`  Platform: ${post.platform || "(not set)"}`);
    log(`  Posted By: ${post.postedBy || "(not set)"}`);
    log(`  Resolved Targets: ${targets.join(", ")}`);
    log(`  Post Type: ${post.postType || "(not set)"}`);
    log(`  Image: ${post.imagePath || "(none)"}`);
    log(`  Hashtags: ${post.hashtags ? post.hashtags.slice(0, 80) + "..." : "(none)"}`);
    log(`  First Comment: ${post.firstComment ? "yes" : "no"}`);
    log(`  Series: ${post.series || "(none)"}`);

    if (DRY_RUN) {
      log(`  DRY RUN — Would publish as: ${targets.join(", ")}`);
      publishedCount++;
      continue;
    }

    try {
      const results: PublishResult[] = [];

      if (targets.length === 2) {
        // Publish as company first
        const orgResult = await publishPost(post, true);
        results.push(orgResult);

        log(`  Waiting ${POST_DELAY_MS / 1000}s before personal publish...`);
        await new Promise((r) => setTimeout(r, POST_DELAY_MS));

        // Then as personal
        const personalResult = await publishPost(post, false);
        results.push(personalResult);
      } else if (targets[0] === "company") {
        const result = await publishPost(post, true);
        results.push(result);
      } else {
        const result = await publishPost(post, false);
        results.push(result);
      }

      // Update Notion with the first published URL
      const primaryResult = results[0];
      if (primaryResult && primaryResult.postUrn !== "unknown") {
        log(`  Updating Notion page ${post.pageId}...`);
        await updateNotionPage(post.pageId, primaryResult.url);
        log(`  Notion updated: Status=POSTED, URL=${primaryResult.url}`);
      }

      publishedCount++;
    } catch (e) {
      logError(`Failed to publish "${post.title}"`, e);
      failedCount++;
    }

    // Delay between posts
    if (i < posts.length - 1) {
      log(`\nWaiting ${POST_DELAY_MS / 1000}s before next post...`);
      await new Promise((r) => setTimeout(r, POST_DELAY_MS));
    }
  }

  // Summary
  log("\n═══════════════════════════════════════════════════════");
  log(`SUMMARY: ${publishedCount} published, ${failedCount} failed, ${posts.length} total`);
  log("═══════════════════════════════════════════════════════");
}

main().catch((e) => {
  logError("Unhandled error", e);
  process.exit(1);
});
