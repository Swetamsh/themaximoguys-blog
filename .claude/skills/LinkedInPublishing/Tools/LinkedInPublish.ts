#!/usr/bin/env bun
/**
 * LinkedIn Publishing Tool — Hybrid: API post + Playwright first comment
 *
 * Usage:
 *   bun run LinkedInPublish.ts post --text <text> [--image <path>] [--comment <text>] [--as-org]
 *   bun run LinkedInPublish.ts batch --manifest <json> [--delay <seconds>]
 *   bun run LinkedInPublish.ts verify
 *   bun run LinkedInPublish.ts whoami
 *   bun run LinkedInPublish.ts login          — Open browser to save LinkedIn session
 *   bun run LinkedInPublish.ts delete <urn>   — Delete a post by URN
 *
 * Credentials: /root/themaximoguys-blog/.env.local
 * Session: /root/.linkedin-session/ (Playwright persistent context)
 */

import { readFileSync, existsSync } from "fs";
import { basename } from "path";

// ─── Load Environment ────────────────────────────────────────
const ENV_PATHS = [
  "/root/themaximoguys-blog/.env.local",
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
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN || "";
const PERSON_URN = "urn:li:person:hj5bWVNgmt";
const ORG_URN = "urn:li:organization:111960338";
const API_VERSION = process.env.LINKEDIN_VERSION || "202603";
const SESSION_DIR = "/root/.linkedin-session";

const BASE_HEADERS = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "X-Restli-Protocol-Version": "2.0.0",
  "Linkedin-Version": API_VERSION,
  "Content-Type": "application/json",
};

// ─── API Functions ────────────────────────────────────────────

async function getProfile(): Promise<any> {
  const res = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function initializeImageUpload(ownerUrn: string): Promise<{ uploadUrl: string; imageUrn: string }> {
  const res = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ initializeUploadRequest: { owner: ownerUrn } }),
  });
  if (!res.ok) throw new Error(`Image init failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { uploadUrl: data.value.uploadUrl, imageUrn: data.value.image };
}

async function uploadImageBinary(uploadUrl: string, imagePath: string): Promise<void> {
  const imageData = readFileSync(imagePath);
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/octet-stream" },
    body: imageData,
  });
  if (!res.ok && res.status !== 201) {
    throw new Error(`Image upload failed: ${res.status} ${await res.text()}`);
  }
}

async function createPost(opts: {
  authorUrn: string;
  text: string;
  imageUrn?: string;
}): Promise<{ success: boolean; postUrn: string; status: number }> {
  const body: any = {
    author: opts.authorUrn,
    commentary: opts.text,
    visibility: "PUBLIC",
    distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  if (opts.imageUrn) {
    body.content = { media: { title: "Infographic", id: opts.imageUrn } };
  }

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Post creation failed: ${res.status} ${errText}`);
  }

  const postUrn = res.headers.get("x-restli-id") || "unknown";
  return { success: true, postUrn, status: res.status };
}

async function deletePost(postUrn: string): Promise<void> {
  const encoded = encodeURIComponent(postUrn);
  const res = await fetch(`https://api.linkedin.com/rest/posts/${encoded}`, {
    method: "DELETE",
    headers: BASE_HEADERS,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Delete failed: ${res.status} ${errText}`);
  }
  console.log(`Deleted: ${postUrn}`);
}

// ─── Playwright First Comment ─────────────────────────────────

function postUrnToUrl(postUrn: string): string {
  // urn:li:share:7444400938880053248 → https://www.linkedin.com/feed/update/urn:li:share:7444400938880053248/
  return `https://www.linkedin.com/feed/update/${postUrn}/`;
}

async function addFirstCommentViaBrowser(postUrn: string, commentText: string, asOrg: boolean): Promise<boolean> {
  try {
    const { chromium } = await import("playwright");
    const liAt = process.env.LINKEDIN_LI_AT || "";
    if (!liAt) {
      console.error("LINKEDIN_LI_AT not set in .env.local");
      return false;
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    });
    await context.addCookies([
      { name: "li_at", value: liAt, domain: ".linkedin.com", path: "/", httpOnly: true, secure: true, sameSite: "None" as const },
    ]);

    const page = await context.newPage();

    if (asOrg) {
      // Navigate to admin page-posts view — comments automatically as the company page
      console.log("Commenting as company page via admin view...");
      await page.goto("https://www.linkedin.com/company/111960338/admin/page-posts/published/", {
        waitUntil: "domcontentloaded", timeout: 30000,
      });
    } else {
      // Navigate to the post directly — comments as personal profile
      const postUrl = postUrnToUrl(postUrn);
      console.log(`Opening post: ${postUrl}`);
      await page.goto(postUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    }

    await page.waitForTimeout(8000);

    // Check if logged in
    if (page.url().includes("login")) {
      console.error("Not logged in — li_at cookie may be invalid");
      await browser.close();
      return false;
    }

    // For personal posts, click Comment button first to open the editor
    if (!asOrg) {
      await page.locator('button:has-text("Comment")').first().click();
      await page.waitForTimeout(3000);
    }

    // Find and type in the comment editor
    const commentEditor = page.locator('.ql-editor[contenteditable="true"]').first();
    await commentEditor.waitFor({ state: "visible", timeout: 30000 });
    await commentEditor.click();
    await page.waitForTimeout(500);
    await commentEditor.pressSequentially(commentText, { delay: 25 });
    await page.waitForTimeout(1500);

    // Find and click the Comment submit button
    const allButtons = await page.locator('button').all();
    let submitted = false;
    for (const btn of allButtons) {
      const text = (await btn.textContent())?.trim();
      const classes = await btn.getAttribute('class') || '';
      if (text === 'Comment' && classes.includes('comments-comment-box__submit-button')) {
        if (await btn.isVisible()) {
          await btn.click();
          submitted = true;
          break;
        }
      }
    }

    if (!submitted) {
      console.error("Could not find Comment submit button");
      await browser.close();
      return false;
    }

    await page.waitForTimeout(4000);
    console.log(`First comment posted as ${asOrg ? "company page" : "personal profile"}!`);
    await browser.close();
    return true;
  } catch (e: any) {
    console.error(`Browser comment failed: ${e.message}`);
    return false;
  }
}

async function cmdLogin() {
  const { chromium } = await import("playwright");

  console.log("Opening LinkedIn in browser — log in manually, then close the browser window.");
  console.log(`Session will be saved to: ${SESSION_DIR}\n`);

  const context = await chromium.launchPersistentContext(SESSION_DIR, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();
  await page.goto("https://www.linkedin.com/login");

  console.log("Waiting for you to log in...");
  console.log("Once you see your LinkedIn feed, press Ctrl+C to save the session.\n");

  // Wait until we're on the feed (logged in)
  try {
    await page.waitForURL("**/feed/**", { timeout: 300000 }); // 5 min timeout
    console.log("Login detected! Saving session...");
    await page.waitForTimeout(3000);
  } catch {
    console.log("Timeout or manual close — saving whatever session state we have.");
  }

  await context.close();
  console.log(`\nSession saved to ${SESSION_DIR}`);
  console.log("You can now use --comment with posts.");
}

async function cmdComment(args: string[]) {
  let postUrn = "";
  let comment = "";
  let asOrg = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--urn" && args[i + 1]) postUrn = args[++i];
    else if (args[i] === "--text" && args[i + 1]) comment = args[++i];
    else if (args[i] === "--as-org") asOrg = true;
  }

  if (!postUrn) { console.error("--urn <post-urn> is required"); process.exit(1); }
  if (!comment) { console.error("--text <comment-text> is required"); process.exit(1); }

  console.log(`Adding comment to ${postUrn} (as ${asOrg ? "company page" : "personal"})...`);
  const success = await addFirstCommentViaBrowser(postUrn, comment, asOrg);
  if (success) {
    console.log(`\n✓ Comment added to: ${postUrnToUrl(postUrn)}`);
  } else {
    console.log("\n✗ Browser comment failed. Add manually at:");
    console.log(postUrnToUrl(postUrn));
    console.log("\nComment text:");
    console.log(comment);
    process.exit(1);
  }
}

// ─── Commands ─────────────────────────────────────────────────

async function cmdVerify() {
  console.log("Verifying LinkedIn credentials...\n");
  if (!ACCESS_TOKEN) { console.error("LINKEDIN_ACCESS_TOKEN not set"); process.exit(1); }
  try {
    const profile = await getProfile();
    console.log(`Name: ${profile.name}`);
    console.log(`Email: ${profile.email}`);
    console.log(`Person URN: ${PERSON_URN}`);
    console.log(`Org URN: ${ORG_URN}`);
    console.log(`Session dir: ${existsSync(SESSION_DIR) ? "EXISTS" : "NOT SET — run 'login' command"}`);
    console.log("\nCredentials OK ✓");
  } catch (e: any) {
    console.error("Verification failed:", e.message);
    process.exit(1);
  }
}

async function cmdWhoami() {
  const profile = await getProfile();
  console.log(JSON.stringify(profile, null, 2));
}

async function cmdPost(args: string[]): Promise<{ postUrn: string }> {
  let imagePath = "";
  let text = "";
  let comment = "";
  let asOrg = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--image" && args[i + 1]) imagePath = args[++i];
    else if (args[i] === "--text" && args[i + 1]) text = args[++i];
    else if (args[i] === "--comment" && args[i + 1]) comment = args[++i];
    else if (args[i] === "--as-org") asOrg = true;
  }

  if (!text) { console.error("--text is required"); process.exit(1); }

  const authorUrn = asOrg ? ORG_URN : PERSON_URN;
  console.log(`Publishing as: ${authorUrn}`);

  let imageUrn: string | undefined;
  if (imagePath) {
    if (!existsSync(imagePath)) { console.error(`Image not found: ${imagePath}`); process.exit(1); }
    console.log(`Uploading image: ${basename(imagePath)}...`);
    const { uploadUrl, imageUrn: urn } = await initializeImageUpload(authorUrn);
    await uploadImageBinary(uploadUrl, imagePath);
    imageUrn = urn;
    console.log(`Image uploaded: ${imageUrn}`);
  }

  console.log("Creating post...");
  const result = await createPost({ authorUrn, text, imageUrn });
  console.log(`Post published! URN: ${result.postUrn}`);
  console.log(`URL: ${postUrnToUrl(result.postUrn)}`);

  // Add first comment via Playwright if requested
  if (comment && result.postUrn && result.postUrn !== "unknown") {
    console.log(`\nAdding first comment via browser (as ${asOrg ? "company page" : "personal"})...`);
    const success = await addFirstCommentViaBrowser(result.postUrn, comment, asOrg);
    if (!success) {
      console.log("\n⚠ Browser comment failed. Add manually at:");
      console.log(postUrnToUrl(result.postUrn));
      console.log("\nComment text:");
      console.log(comment);
    }
  }

  return { postUrn: result.postUrn };
}

async function cmdBatch(args: string[]) {
  let manifestPath = "";
  let delayMs = 30000;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--manifest" && args[i + 1]) manifestPath = args[++i];
    else if (args[i] === "--delay" && args[i + 1]) delayMs = parseInt(args[++i]) * 1000;
  }

  if (!manifestPath || !existsSync(manifestPath)) {
    console.error("--manifest <path> required"); process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const posts: Array<{ image?: string; text: string; comment?: string; asOrg?: boolean }> = manifest.posts;

  console.log(`Batch publishing ${posts.length} posts with ${delayMs / 1000}s delay...\n`);

  const results: any[] = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`\n─── Post ${i + 1}/${posts.length} ───`);

    try {
      const postArgs: string[] = ["--text", post.text];
      if (post.image) postArgs.push("--image", post.image);
      if (post.comment) postArgs.push("--comment", post.comment);
      if (post.asOrg) postArgs.push("--as-org");

      const result = await cmdPost(postArgs);
      results.push({ index: i + 1, success: true, postUrn: result.postUrn });
    } catch (e: any) {
      console.error(`Failed: ${e.message}`);
      results.push({ index: i + 1, success: false, error: e.message });
    }

    if (i < posts.length - 1) {
      console.log(`Waiting ${delayMs / 1000}s before next post...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  console.log("\n\n═══ BATCH RESULTS ═══");
  results.forEach((r) => {
    console.log(`  ${r.index}. ${r.success ? "✓" : "✗"} ${r.postUrn || r.error}`);
  });
}

// ─── Main ─────────────────────────────────────────────────────

const [command, ...rest] = process.argv.slice(2);

switch (command) {
  case "verify": await cmdVerify(); break;
  case "whoami": await cmdWhoami(); break;
  case "post": await cmdPost(rest); break;
  case "batch": await cmdBatch(rest); break;
  case "login": await cmdLogin(); break;
  case "comment": await cmdComment(rest); break;
  case "delete": if (rest[0]) await deletePost(rest[0]); else console.error("Provide post URN"); break;
  default:
    console.log(`
LinkedIn Publishing Tool — @themaximoguys (Hybrid: API + Browser)

Usage:
  bun run LinkedInPublish.ts verify                         Check credentials + session
  bun run LinkedInPublish.ts whoami                         Get profile info
  bun run LinkedInPublish.ts login                          Save LinkedIn browser session
  bun run LinkedInPublish.ts post --text <text> [--image <path>] [--comment <text>] [--as-org]
  bun run LinkedInPublish.ts comment --urn <post-urn> --text <comment> [--as-org]
  bun run LinkedInPublish.ts batch --manifest <json> [--delay <seconds>]
  bun run LinkedInPublish.ts delete <post-urn>              Delete a post

Flow:
  1. Post created via LinkedIn REST API (reliable, fast)
  2. First comment added via Playwright browser automation (for links/tags)
  3. If browser fails, comment text is printed for manual posting

Credentials: /root/themaximoguys-blog/.env.local
Session: ${SESSION_DIR}
`);
}
