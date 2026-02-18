#!/usr/bin/env bun
/**
 * GenerateCarousel.ts
 * Converts an MDX blog post into a LinkedIn carousel PDF
 *
 * Usage: bun Tools/GenerateCarousel.ts <path-to-mdx> [--output <path>]
 *
 * Dependencies: pdf-lib, gray-matter (already in project)
 */

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import matter from "gray-matter";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { basename, resolve, dirname, join } from "path";

// ─── Configuration ───────────────────────────────────────────────────────────

const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;
const PADDING = 80;
const CONTENT_WIDTH = SLIDE_WIDTH - PADDING * 2;

// Brand colors (RGB 0-1 scale for pdf-lib)
const COLORS = {
  bg: rgb(10 / 255, 10 / 255, 10 / 255), // #0A0A0A
  white: rgb(1, 1, 1),
  yellow: rgb(255 / 255, 224 / 255, 102 / 255), // #FFE066
  cyan: rgb(88 / 255, 216 / 255, 216 / 255), // #58D8D8
  pink: rgb(255 / 255, 107 / 255, 157 / 255), // #FF6B9D
  gray: rgb(102 / 255, 102 / 255, 102 / 255), // #666666
  darkGray: rgb(40 / 255, 40 / 255, 40 / 255), // #282828
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogFrontmatter {
  title: string;
  description: string;
  keyTakeaways?: string[];
  tldr?: string;
  tags?: string[];
  series?: { name: string; part: number; total: number };
  faqs?: Array<{ question: string; answer: string }>;
  author?: string;
  slug?: string;
}

interface Slide {
  type: "hook" | "takeaway" | "summary" | "cta" | "faq";
  title: string;
  body: string;
  index: number;
  total: number;
  accent: typeof COLORS.yellow;
  seriesBadge?: string;
}

// ─── Text Sanitization (WinAnsi-safe) ────────────────────────────────────────

function sanitizeText(text: string): string {
  // Replace common unicode with WinAnsi-safe equivalents
  return text
    .replace(/[\u2018\u2019]/g, "'")  // smart quotes
    .replace(/[\u201C\u201D]/g, '"')  // smart double quotes
    .replace(/\u2013/g, "-")          // en dash
    .replace(/\u2014/g, "--")         // em dash
    .replace(/\u2026/g, "...")        // ellipsis
    .replace(/\u2192/g, ">>")         // right arrow
    .replace(/\u2190/g, "<<")         // left arrow
    .replace(/\u2022/g, "-")          // bullet
    .replace(/\u00A0/g, " ")          // non-breaking space
    // Strip any remaining non-WinAnsi characters (keep basic latin + latin-1 supplement)
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}

// ─── Text Wrapping ───────────────────────────────────────────────────────────

function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = sanitizeText(text).split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ─── Slide Builders ──────────────────────────────────────────────────────────

function drawBackground(page: any) {
  page.drawRectangle({
    x: 0,
    y: 0,
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    color: COLORS.bg,
  });
}

function drawSeriesBadge(page: any, font: any, badge: string) {
  const badgeSize = 14;
  const badgeWidth = font.widthOfTextAtSize(badge, badgeSize) + 24;
  page.drawRectangle({
    x: PADDING,
    y: SLIDE_HEIGHT - 60,
    width: badgeWidth,
    height: 28,
    color: COLORS.darkGray,
    borderColor: COLORS.cyan,
    borderWidth: 1,
  });
  page.drawText(badge, {
    x: PADDING + 12,
    y: SLIDE_HEIGHT - 55,
    size: badgeSize,
    font,
    color: COLORS.cyan,
  });
}

function drawSlideNumber(page: any, font: any, current: number, total: number) {
  const text = `${current} / ${total}`;
  const textWidth = font.widthOfTextAtSize(text, 14);
  page.drawText(text, {
    x: SLIDE_WIDTH - PADDING - textWidth,
    y: 40,
    size: 14,
    font,
    color: COLORS.gray,
  });
}

function drawBrandFooter(page: any, font: any, boldFont: any) {
  // Accent line
  page.drawRectangle({
    x: PADDING,
    y: 75,
    width: CONTENT_WIDTH,
    height: 1,
    color: COLORS.darkGray,
  });

  const brand = "TheMaximoGuys";
  page.drawText(brand, {
    x: PADDING,
    y: 40,
    size: 14,
    font: boldFont,
    color: COLORS.yellow,
  });
}

async function drawHookSlide(
  page: any,
  slide: Slide,
  fonts: { regular: any; bold: any }
) {
  drawBackground(page);

  if (slide.seriesBadge) {
    drawSeriesBadge(page, fonts.regular, slide.seriesBadge);
  }

  // Decorative accent line
  page.drawRectangle({
    x: PADDING,
    y: SLIDE_HEIGHT - 200,
    width: 60,
    height: 4,
    color: COLORS.yellow,
  });

  // Title — large and bold
  const titleLines = wrapText(slide.title, fonts.bold, 48, CONTENT_WIDTH);
  let y = SLIDE_HEIGHT - 260;
  for (const line of titleLines) {
    page.drawText(line, {
      x: PADDING,
      y,
      size: 48,
      font: fonts.bold,
      color: COLORS.white,
    });
    y -= 60;
  }

  // Subtitle/description
  y -= 30;
  const descLines = wrapText(slide.body, fonts.regular, 22, CONTENT_WIDTH);
  for (const line of descLines.slice(0, 6)) {
    page.drawText(line, {
      x: PADDING,
      y,
      size: 22,
      font: fonts.regular,
      color: COLORS.gray,
    });
    y -= 32;
  }

  // Swipe prompt
  const swipeText = "Swipe to learn more  >>";
  const swipeWidth = fonts.regular.widthOfTextAtSize(swipeText, 18);
  page.drawText(swipeText, {
    x: (SLIDE_WIDTH - swipeWidth) / 2,
    y: 120,
    size: 18,
    font: fonts.regular,
    color: COLORS.cyan,
  });

  drawBrandFooter(page, fonts.regular, fonts.bold);
  drawSlideNumber(page, fonts.regular, slide.index, slide.total);
}

async function drawTakeawaySlide(
  page: any,
  slide: Slide,
  fonts: { regular: any; bold: any }
) {
  drawBackground(page);

  if (slide.seriesBadge) {
    drawSeriesBadge(page, fonts.regular, slide.seriesBadge);
  }

  // Takeaway number badge
  const numText = `0${slide.index}`;
  page.drawText(numText, {
    x: PADDING,
    y: SLIDE_HEIGHT - 180,
    size: 80,
    font: fonts.bold,
    color: COLORS.darkGray,
  });

  // Accent dot
  page.drawCircle({
    x: PADDING + 15,
    y: SLIDE_HEIGHT - 220,
    size: 6,
    color: slide.accent,
  });

  // Title
  const titleLines = wrapText(slide.title, fonts.bold, 36, CONTENT_WIDTH);
  let y = SLIDE_HEIGHT - 320;
  for (const line of titleLines) {
    page.drawText(line, {
      x: PADDING,
      y,
      size: 36,
      font: fonts.bold,
      color: COLORS.white,
    });
    y -= 48;
  }

  // Body text
  if (slide.body) {
    y -= 20;
    // Accent line before body
    page.drawRectangle({
      x: PADDING,
      y: y + 10,
      width: 40,
      height: 3,
      color: slide.accent,
    });
    y -= 20;

    const bodyLines = wrapText(slide.body, fonts.regular, 22, CONTENT_WIDTH);
    for (const line of bodyLines.slice(0, 12)) {
      page.drawText(line, {
        x: PADDING,
        y,
        size: 22,
        font: fonts.regular,
        color: COLORS.gray,
      });
      y -= 32;
    }
  }

  drawBrandFooter(page, fonts.regular, fonts.bold);
  drawSlideNumber(page, fonts.regular, slide.index, slide.total);
}

async function drawSummarySlide(
  page: any,
  slide: Slide,
  fonts: { regular: any; bold: any }
) {
  drawBackground(page);

  if (slide.seriesBadge) {
    drawSeriesBadge(page, fonts.regular, slide.seriesBadge);
  }

  // "TL;DR" label
  page.drawText("TL;DR", {
    x: PADDING,
    y: SLIDE_HEIGHT - 180,
    size: 24,
    font: fonts.bold,
    color: COLORS.yellow,
  });

  // Accent line
  page.drawRectangle({
    x: PADDING,
    y: SLIDE_HEIGHT - 200,
    width: CONTENT_WIDTH,
    height: 2,
    color: COLORS.yellow,
  });

  // Summary text
  const bodyLines = wrapText(slide.body, fonts.regular, 26, CONTENT_WIDTH);
  let y = SLIDE_HEIGHT - 260;
  for (const line of bodyLines.slice(0, 16)) {
    page.drawText(line, {
      x: PADDING,
      y,
      size: 26,
      font: fonts.regular,
      color: COLORS.white,
    });
    y -= 40;
  }

  drawBrandFooter(page, fonts.regular, fonts.bold);
  drawSlideNumber(page, fonts.regular, slide.index, slide.total);
}

async function drawCtaSlide(
  page: any,
  slide: Slide,
  fonts: { regular: any; bold: any }
) {
  drawBackground(page);

  // Large accent circle decoration
  page.drawCircle({
    x: SLIDE_WIDTH / 2,
    y: SLIDE_HEIGHT - 300,
    size: 80,
    color: COLORS.darkGray,
    borderColor: COLORS.yellow,
    borderWidth: 2,
  });

  // TMG text inside circle area
  const tmgText = "TMG";
  const tmgWidth = fonts.bold.widthOfTextAtSize(tmgText, 40);
  page.drawText(tmgText, {
    x: (SLIDE_WIDTH - tmgWidth) / 2,
    y: SLIDE_HEIGHT - 315,
    size: 40,
    font: fonts.bold,
    color: COLORS.yellow,
  });

  // CTA heading
  const ctaTitle = "Want more Maximo insights?";
  const ctaTitleWidth = fonts.bold.widthOfTextAtSize(ctaTitle, 36);
  page.drawText(ctaTitle, {
    x: (SLIDE_WIDTH - ctaTitleWidth) / 2,
    y: SLIDE_HEIGHT - 480,
    size: 36,
    font: fonts.bold,
    color: COLORS.white,
  });

  // CTA items
  const ctaItems = [
    "+  Like this carousel",
    "*  Comment your thoughts",
    ">  Repost to help others",
    "@  Follow @TheMaximoGuys",
  ];

  let y = SLIDE_HEIGHT - 560;
  for (const item of ctaItems) {
    const itemWidth = fonts.regular.widthOfTextAtSize(item, 24);
    page.drawText(item, {
      x: (SLIDE_WIDTH - itemWidth) / 2,
      y,
      size: 24,
      font: fonts.regular,
      color: COLORS.cyan,
    });
    y -= 50;
  }

  // Read full article prompt
  y -= 30;
  const readMore = "Read the full article at themaximoguys.com";
  const readMoreWidth = fonts.regular.widthOfTextAtSize(readMore, 18);
  page.drawText(readMore, {
    x: (SLIDE_WIDTH - readMoreWidth) / 2,
    y,
    size: 18,
    font: fonts.regular,
    color: COLORS.gray,
  });

  // Hashtags from tags
  if (slide.body) {
    y -= 50;
    const hashtagLines = wrapText(slide.body, fonts.regular, 16, CONTENT_WIDTH);
    for (const line of hashtagLines.slice(0, 2)) {
      const lineWidth = fonts.regular.widthOfTextAtSize(line, 16);
      page.drawText(line, {
        x: (SLIDE_WIDTH - lineWidth) / 2,
        y,
        size: 16,
        font: fonts.regular,
        color: COLORS.pink,
      });
      y -= 24;
    }
  }

  drawBrandFooter(page, fonts.regular, fonts.bold);
  drawSlideNumber(page, fonts.regular, slide.index, slide.total);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    console.log(`
LinkedIn Carousel Generator - TheMaximoGuys

Usage: bun GenerateCarousel.ts <path-to-mdx> [options]

Options:
  --output <path>   Custom output path (default: carousels/<slug>-carousel.pdf)
  --help            Show this help

Example:
  bun GenerateCarousel.ts posts/THINK-MAS/2026-02-06-think-mas-01-mindset-shift.mdx
`);
    process.exit(0);
  }

  const mdxPath = resolve(args[0]);
  if (!existsSync(mdxPath)) {
    console.error(`Error: File not found: ${mdxPath}`);
    process.exit(1);
  }

  // Parse frontmatter
  const raw = readFileSync(mdxPath, "utf-8");
  const { data } = matter(raw) as { data: BlogFrontmatter };

  if (!data.title) {
    console.error("Error: Blog post missing 'title' in frontmatter");
    process.exit(1);
  }

  console.log(`\n📄 Parsing: ${data.title}`);
  console.log(`   Series: ${data.series ? `${data.series.name} Part ${data.series.part}` : "Standalone"}`);
  console.log(`   Key Takeaways: ${data.keyTakeaways?.length ?? 0}`);
  console.log(`   FAQs: ${data.faqs?.length ?? 0}`);

  // Build slide deck
  const slides: Slide[] = [];
  const accentCycle = [COLORS.yellow, COLORS.cyan, COLORS.pink];
  const seriesBadge = data.series
    ? `${data.series.name} | Part ${data.series.part}`
    : undefined;

  // Slide 1: Hook
  slides.push({
    type: "hook",
    title: data.title,
    body: data.description || "",
    index: 1,
    total: 0, // set after
    accent: COLORS.yellow,
    seriesBadge,
  });

  // Slides 2-N: Key Takeaways
  if (data.keyTakeaways && data.keyTakeaways.length > 0) {
    for (let i = 0; i < Math.min(data.keyTakeaways.length, 7); i++) {
      const takeaway = data.keyTakeaways[i];
      slides.push({
        type: "takeaway",
        title: takeaway,
        body: "",
        index: slides.length + 1,
        total: 0,
        accent: accentCycle[i % accentCycle.length],
        seriesBadge,
      });
    }
  }

  // FAQ slides (if room and available)
  if (data.faqs && slides.length < 8) {
    const faqSlots = Math.min(data.faqs.length, 9 - slides.length);
    for (let i = 0; i < faqSlots; i++) {
      slides.push({
        type: "faq",
        title: data.faqs[i].question,
        body: data.faqs[i].answer,
        index: slides.length + 1,
        total: 0,
        accent: accentCycle[i % accentCycle.length],
        seriesBadge,
      });
    }
  }

  // Summary slide (TL;DR)
  if (data.tldr) {
    slides.push({
      type: "summary",
      title: "TL;DR",
      body: data.tldr,
      index: slides.length + 1,
      total: 0,
      accent: COLORS.yellow,
      seriesBadge,
    });
  }

  // CTA slide
  const hashtags = data.tags
    ? data.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join("  ")
    : "#Maximo #MAS #IBMMaximo";
  slides.push({
    type: "cta",
    title: "Follow for more",
    body: hashtags,
    index: slides.length + 1,
    total: 0,
    accent: COLORS.yellow,
    seriesBadge,
  });

  // Set total count
  const total = slides.length;
  slides.forEach((s, i) => {
    s.total = total;
    s.index = i + 1;
  });

  console.log(`   Slides: ${total}`);

  // Create PDF
  const pdf = await PDFDocument.create();
  const regularFont = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular: regularFont, bold: boldFont };

  for (const slide of slides) {
    const page = pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT]);

    switch (slide.type) {
      case "hook":
        await drawHookSlide(page, slide, fonts);
        break;
      case "takeaway":
      case "faq":
        await drawTakeawaySlide(page, slide, fonts);
        break;
      case "summary":
        await drawSummarySlide(page, slide, fonts);
        break;
      case "cta":
        await drawCtaSlide(page, slide, fonts);
        break;
    }
  }

  // Save PDF
  const outputIdx = args.indexOf("--output");
  const slug =
    data.slug || basename(mdxPath, ".mdx").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const projectRoot = resolve(dirname(mdxPath), "..");
  const carouselDir = join(
    projectRoot.includes("posts") ? resolve(projectRoot, "..") : projectRoot,
    "carousels"
  );

  if (!existsSync(carouselDir)) {
    mkdirSync(carouselDir, { recursive: true });
  }

  const outputPath =
    outputIdx !== -1 ? resolve(args[outputIdx + 1]) : join(carouselDir, `${slug}-carousel.pdf`);

  const pdfBytes = await pdf.save();
  writeFileSync(outputPath, pdfBytes);

  const fileSizeKB = Math.round(pdfBytes.length / 1024);
  console.log(`\n✅ Carousel generated!`);
  console.log(`   📁 Output: ${outputPath}`);
  console.log(`   📊 Size: ${fileSizeKB} KB (${total} slides)`);
  console.log(`   📐 Dimensions: ${SLIDE_WIDTH}x${SLIDE_HEIGHT}px`);

  // Generate LinkedIn caption
  console.log(`\n─── LinkedIn Post Caption ───\n`);
  const hookQuestion = data.title.endsWith("?")
    ? data.title
    : `${data.title} — here's what you need to know.`;
  const takeawayBullets = (data.keyTakeaways || [])
    .slice(0, 5)
    .map((t) => `- ${t}`)
    .join("\n");

  console.log(`${hookQuestion}\n`);
  if (data.description) console.log(`${data.description}\n`);
  if (takeawayBullets) console.log(`Swipe through to learn:\n${takeawayBullets}\n`);
  console.log(`---\n`);
  console.log(hashtags);
  console.log(`\nFollow @TheMaximoGuys for weekly MAS insights.`);
  console.log(`\n─────────────────────────────\n`);
}

main().catch((err) => {
  console.error("Error generating carousel:", err);
  process.exit(1);
});
