/**
 * Migration Script: themaximoguys-blog → Sanity CMS
 *
 * One-way sync: GitHub blog repo (source of truth) → Sanity
 * Detects changes via MD5 content hash — only updates changed posts.
 *
 * Usage:
 *   npx tsx scripts/sync-blog-to-sanity.ts [--dry-run] [--force] [--skip-images] [--validate]
 *
 * Env vars required:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (write access)
 *
 * Blog repo path: defaults to repo root (configurable via BLOG_REPO_PATH)
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import matter from 'gray-matter'

// ═══ Configuration ═══

const BLOG_REPO_PATH = process.env.BLOG_REPO_PATH || path.resolve(__dirname, '..')
const POSTS_DIR = path.join(BLOG_REPO_PATH, 'posts')
const DRY_RUN = process.argv.includes('--dry-run')
const FORCE_SYNC = process.argv.includes('--force')
const SKIP_IMAGES = process.argv.includes('--skip-images')
const VALIDATE_ONLY = process.argv.includes('--validate')

let _sanityClient: ReturnType<typeof createClient> | null = null
function getSanityClient() {
  if (!_sanityClient) {
    _sanityClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-02-01',
      token: process.env.SANITY_API_MIGRATION_SECRET || process.env.SANITY_API_TOKEN,
      useCdn: false,
    })
  }
  return _sanityClient
}

// ═══ Types ═══

interface ParsedPost {
  frontmatter: Record<string, any>
  content: string
  sourceFile: string
  contentHash: string
}

interface SyncResult {
  created: string[]
  updated: string[]
  skipped: string[]
  errors: string[]
}

// ═══ Image Upload Pipeline ═══

const imageCache = new Map<string, { _type: string; _ref: string }>()

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadImageToSanity(
  filePath: string,
  filename: string
): Promise<{ _type: string; _ref: string } | null> {
  // Check cache first
  const cacheKey = filePath
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!
  }

  try {
    let asset: any

    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // Remote URL — fetch and upload
      const response = await fetch(filePath)
      if (!response.ok) {
        console.warn(`    WARN: Failed to fetch image URL: ${filePath} (${response.status})`)
        return null
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      asset = await getSanityClient().assets.upload('image', buffer, {
        filename,
        contentType: response.headers.get('content-type') || 'image/png',
      })
    } else {
      // Local file
      if (!fs.existsSync(filePath)) {
        console.warn(`    WARN: Image file not found: ${filePath}`)
        return null
      }
      const fileBuffer = fs.readFileSync(filePath)
      asset = await getSanityClient().assets.upload('image', fileBuffer, {
        filename,
      })
    }

    const ref = { _type: 'reference' as const, _ref: asset._id }
    imageCache.set(cacheKey, ref)

    // Rate limiting — 300ms between uploads
    await sleep(300)

    return ref
  } catch (error: any) {
    console.warn(`    WARN: Image upload failed for ${filePath}: ${error.message}`)
    return null
  }
}

function resolveCoverImagePath(
  value: string,
  mdxFilePath: string
): string {
  if (!value) return ''

  // Full URL — pass through
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  // Relative path: ./images/...
  if (value.startsWith('./')) {
    const mdxDir = path.dirname(mdxFilePath)
    const resolved = path.resolve(mdxDir, value)
    if (fs.existsSync(resolved)) return resolved
    // Also try from blog repo root
    const fromRoot = path.resolve(BLOG_REPO_PATH, value.replace('./', ''))
    if (fs.existsSync(fromRoot)) return fromRoot
  }

  // Absolute-style: /images/mas-admin/... — search in posts subdirectories
  if (value.startsWith('/images/') || value.startsWith('/')) {
    const filename = path.basename(value)
    // Try the MDX file's own images directory
    const mdxDir = path.dirname(mdxFilePath)
    const sameDir = path.join(mdxDir, 'images', filename)
    if (fs.existsSync(sameDir)) return sameDir

    // Search all image directories under posts
    const postsDirs = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
    for (const dir of postsDirs) {
      if (dir.isDirectory()) {
        const candidate = path.join(POSTS_DIR, dir.name, 'images', filename)
        if (fs.existsSync(candidate)) return candidate
      }
    }
  }

  // Fallback: try resolving relative to MDX file
  const mdxDir = path.dirname(mdxFilePath)
  const fallback = path.resolve(mdxDir, value)
  if (fs.existsSync(fallback)) return fallback

  console.warn(`    WARN: Could not resolve cover image: ${value}`)
  return value
}

function resolveInlineImagePath(
  imagePath: string,
  mdxFilePath: string
): string {
  // Relative path: ./images/...
  if (imagePath.startsWith('./') || imagePath.startsWith('../')) {
    const mdxDir = path.dirname(mdxFilePath)
    return path.resolve(mdxDir, imagePath)
  }

  // Absolute-style: /images/...
  if (imagePath.startsWith('/')) {
    const filename = path.basename(imagePath)
    const mdxDir = path.dirname(mdxFilePath)
    const sameDir = path.join(mdxDir, 'images', filename)
    if (fs.existsSync(sameDir)) return sameDir

    const postsDirs = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
    for (const dir of postsDirs) {
      if (dir.isDirectory()) {
        const candidate = path.join(POSTS_DIR, dir.name, 'images', filename)
        if (fs.existsSync(candidate)) return candidate
      }
    }
  }

  // Full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Fallback: resolve relative to MDX
  const mdxDir = path.dirname(mdxFilePath)
  return path.resolve(mdxDir, imagePath)
}

// ═══ File Discovery ═══

function findMdxFiles(dir: string): string[] {
  const files: string[] = []

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`)
    return files
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name !== 'images' && entry.name !== 'node_modules') {
      files.push(...findMdxFiles(fullPath))
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      files.push(fullPath)
    }
  }

  return files
}

// ═══ Content Parsing ═══

function parseMdxFile(filePath: string): ParsedPost {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)

  const relativePath = path.relative(BLOG_REPO_PATH, filePath)
  const contentHash = crypto.createHash('md5').update(raw).digest('hex')

  return {
    frontmatter,
    content,
    sourceFile: relativePath,
    contentHash,
  }
}

// ═══ MDX → Portable Text Conversion ═══

function mdxToPortableText(mdxContent: string): any[] {
  const blocks: any[] = []
  const lines = mdxContent.split('\n')
  let currentParagraph: string[] = []
  let inCodeBlock = false
  let codeBlockLang = ''
  let codeBlockContent: string[] = []
  let inAnswerBox = false
  let answerBoxQuestion = ''
  let answerBoxContent: string[] = []

  function flushParagraph() {
    const text = currentParagraph.join('\n').trim()
    if (text) {
      blocks.push(createTextBlock(text, 'normal'))
    }
    currentParagraph = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push({
          _type: 'code',
          _key: generateKey(),
          language: codeBlockLang || 'text',
          code: codeBlockContent.join('\n'),
        })
        inCodeBlock = false
        codeBlockContent = []
        codeBlockLang = ''
      } else {
        // Start code block
        flushParagraph()
        inCodeBlock = true
        codeBlockLang = line.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent.push(line)
      continue
    }

    // AnswerBox JSX component: <AnswerBox question="..."> ... </AnswerBox>
    const answerBoxOpen = line.match(/<AnswerBox\s+question="([^"]+)"/)
    if (answerBoxOpen) {
      flushParagraph()
      inAnswerBox = true
      answerBoxQuestion = answerBoxOpen[1]
      answerBoxContent = []
      // Check if it self-closes on the same line
      if (line.includes('/>')) {
        blocks.push({
          _type: 'answerBox',
          _key: generateKey(),
          question: answerBoxQuestion,
          answer: '',
        })
        inAnswerBox = false
      }
      continue
    }

    if (inAnswerBox) {
      if (line.match(/<\/AnswerBox>/)) {
        const answer = answerBoxContent.join('\n').trim()
        // Try to extract source="..." from the closing or content
        const sourceMatch = answerBoxContent.join('\n').match(/source="([^"]+)"/)
        blocks.push({
          _type: 'answerBox',
          _key: generateKey(),
          question: answerBoxQuestion,
          answer,
          ...(sourceMatch ? { source: sourceMatch[1] } : {}),
        })
        inAnswerBox = false
        answerBoxContent = []
        answerBoxQuestion = ''
      } else {
        answerBoxContent.push(line)
      }
      continue
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      flushParagraph()
      continue
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      const level = headingMatch[1].length
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      blocks.push(createTextBlock(headingMatch[2], style))
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushParagraph()
      blocks.push(createTextBlock(line.slice(2), 'blockquote'))
      continue
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      flushParagraph()
      continue
    }

    // Bullet list: - text or * text
    const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/)
    if (bulletMatch) {
      flushParagraph()
      const indent = bulletMatch[1].length
      const level = Math.floor(indent / 2) + 1
      const children = parseInlineMarks(bulletMatch[2])
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level,
        markDefs: children.markDefs || [],
        children: children.spans,
      })
      continue
    }

    // Numbered list: 1. text
    const numberedMatch = line.match(/^(\s*)\d+\.\s+(.+)$/)
    if (numberedMatch) {
      flushParagraph()
      const indent = numberedMatch[1].length
      const level = Math.floor(indent / 2) + 1
      const children = parseInlineMarks(numberedMatch[2])
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level,
        markDefs: children.markDefs || [],
        children: children.spans,
      })
      continue
    }

    // Inline image: ![alt](path)
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (imageMatch) {
      flushParagraph()
      blocks.push({
        _type: 'image',
        _key: generateKey(),
        _pendingUpload: true,
        _imagePath: imageMatch[2],
        alt: imageMatch[1] || 'Image',
      })
      continue
    }

    // Markdown table rows — convert to text blocks (no table type in schema)
    if (line.match(/^\|(.+)\|$/)) {
      // Skip separator rows like |---|---|
      if (line.match(/^\|[\s-:|]+\|$/)) continue
      flushParagraph()
      const cells = line.split('|').slice(1, -1).map((c) => c.trim())
      blocks.push(createTextBlock(cells.join(' — '), 'normal'))
      continue
    }

    // Regular text
    currentParagraph.push(line)
  }

  flushParagraph()

  return blocks
}

function createTextBlock(text: string, style: string): any {
  // Parse inline marks (bold, italic, code, links)
  const children = parseInlineMarks(text)

  return {
    _type: 'block',
    _key: generateKey(),
    style,
    markDefs: children.markDefs || [],
    children: children.spans,
  }
}

function parseInlineMarks(text: string): { spans: any[]; markDefs: any[] } {
  const spans: any[] = []
  const markDefs: any[] = []

  // Simple parser: handles **bold**, *italic*, `code`, and [text](url)
  let remaining = text
  let currentText = ''

  while (remaining.length > 0) {
    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      if (currentText) {
        spans.push({ _type: 'span', _key: generateKey(), text: currentText, marks: [] })
        currentText = ''
      }
      const markKey = generateKey()
      markDefs.push({
        _type: 'link',
        _key: markKey,
        href: linkMatch[2],
      })
      spans.push({ _type: 'span', _key: generateKey(), text: linkMatch[1], marks: [markKey] })
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      if (currentText) {
        spans.push({ _type: 'span', _key: generateKey(), text: currentText, marks: [] })
        currentText = ''
      }
      spans.push({ _type: 'span', _key: generateKey(), text: boldMatch[1], marks: ['strong'] })
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*(.+?)\*/)
    if (italicMatch) {
      if (currentText) {
        spans.push({ _type: 'span', _key: generateKey(), text: currentText, marks: [] })
        currentText = ''
      }
      spans.push({ _type: 'span', _key: generateKey(), text: italicMatch[1], marks: ['em'] })
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code: `text`
    const codeMatch = remaining.match(/^`(.+?)`/)
    if (codeMatch) {
      if (currentText) {
        spans.push({ _type: 'span', _key: generateKey(), text: currentText, marks: [] })
        currentText = ''
      }
      spans.push({ _type: 'span', _key: generateKey(), text: codeMatch[1], marks: ['code'] })
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Regular character
    currentText += remaining[0]
    remaining = remaining.slice(1)
  }

  if (currentText) {
    spans.push({ _type: 'span', _key: generateKey(), text: currentText, marks: [] })
  }

  // Ensure at least one span
  if (spans.length === 0) {
    spans.push({ _type: 'span', _key: generateKey(), text: '', marks: [] })
  }

  return { spans, markDefs }
}

let keyCounter = 0
function generateKey(): string {
  return `key_${Date.now()}_${keyCounter++}`
}

/** Add _key to each object in an array (required by Sanity for arrays of objects) */
function addKeys(arr: any[] | undefined): any[] | undefined {
  if (!arr || !Array.isArray(arr)) return undefined
  return arr.map((item) => {
    if (typeof item === 'object' && item !== null && !item._key) {
      return { _key: generateKey(), ...item }
    }
    return item
  })
}

// ═══ Author Management ═══

async function ensureAuthor(frontmatter: Record<string, any>): Promise<string | null> {
  const authorName = frontmatter.author
  if (!authorName) return null

  const slug = authorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  // Check if author exists
  const existing = await getSanityClient().fetch(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug }
  )

  if (existing) return existing

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create author: ${authorName}`)
    return null
  }

  // Create author with deterministic ID
  const authorId = `author-${slug}`
  const authorDoc: any = {
    _id: authorId,
    _type: 'author',
    name: authorName,
    slug: { _type: 'slug', current: slug },
    bio: frontmatter.authorBio || '',
    title: frontmatter.authorTitle || '',
    credentials: frontmatter.authorCredentials || [],
    worksFor: 'The Maximo Guys',
    linkedin: frontmatter.authorLinkedin || undefined,
  }

  const result = await getSanityClient().createIfNotExists(authorDoc)
  console.log(`  Created author: ${authorName} (${result._id})`)
  return result._id
}

// ═══ Build Sanity Document ═══

function buildSanityDocument(
  parsed: ParsedPost,
  authorId: string | null,
  coverImageAsset?: { _type: string; _ref: string } | null
): Record<string, any> {
  const { frontmatter, content, sourceFile, contentHash } = parsed
  const portableText = mdxToPortableText(content)

  // Calculate word count from content
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / 200)

  const doc: Record<string, any> = {
    _type: 'blogPost',
    // Content
    title: frontmatter.title,
    slug: { _type: 'slug', current: frontmatter.slug },
    description: frontmatter.description || '',
    tldr: frontmatter.tldr || undefined,
    content: portableText,
    // SEO
    seoTitle: frontmatter.seoTitle || undefined,
    seoDescription: frontmatter.seoDescription || undefined,
    canonicalUrl: frontmatter.canonicalUrl || undefined,
    noIndex: frontmatter.noIndex || false,
    faqs: addKeys(frontmatter.faqs),
    keyTakeaways: frontmatter.keyTakeaways || undefined,
    howTo: frontmatter.howTo
      ? {
          ...frontmatter.howTo,
          steps: addKeys(frontmatter.howTo.steps),
        }
      : undefined,
    citations: addKeys(frontmatter.citations),
    // AEO
    targetQuestions: frontmatter.targetQuestions || undefined,
    semanticKeywords: frontmatter.semanticKeywords || undefined,
    proficiencyLevel: frontmatter.proficiencyLevel || undefined,
    dependencies: Array.isArray(frontmatter.dependencies)
      ? frontmatter.dependencies.join('\n')
      : frontmatter.dependencies || undefined,
    speakableSections: frontmatter.speakableSections || undefined,
    // Series
    seriesName: frontmatter.series?.name || undefined,
    seriesPart: frontmatter.series?.part ?? undefined,
    seriesTotal: frontmatter.series?.total ?? undefined,
    pillarSlug: frontmatter.pillarSlug || undefined,
    clusterSlugs: frontmatter.clusterSlugs || undefined,
    relatedSlugs: frontmatter.relatedSlugs || undefined,
    // Meta
    publishedAt: frontmatter.date
      ? new Date(frontmatter.date).toISOString()
      : new Date().toISOString(),
    updatedAt: frontmatter.updatedAt
      ? new Date(frontmatter.updatedAt).toISOString()
      : undefined,
    updateHistory: addKeys(frontmatter.updateHistory),
    tags: frontmatter.tags || [],
    tier: frontmatter.tier || 'free',
    draft: frontmatter.draft ?? false,
    featured: frontmatter.featured ?? false,
    // Source tracking
    sourceFile,
    contentHash,
  }

  // Link author reference
  if (authorId) {
    doc.author = { _type: 'reference', _ref: authorId }
  }

  // Set cover image
  if (coverImageAsset) {
    doc.coverImage = {
      _type: 'image',
      asset: coverImageAsset,
      alt: frontmatter.coverImageAlt || frontmatter.title || 'Cover image',
    }
  }

  // Remove undefined values
  Object.keys(doc).forEach((key) => {
    if (doc[key] === undefined) delete doc[key]
  })

  return doc
}

// ═══ Sync Logic ═══

async function syncPost(parsed: ParsedPost, result: SyncResult): Promise<void> {
  const slug = parsed.frontmatter.slug
  if (!slug) {
    console.log(`  SKIP: No slug in ${parsed.sourceFile}`)
    result.errors.push(`${parsed.sourceFile}: Missing slug`)
    return
  }

  try {
    // Check if post already exists
    const existing = await getSanityClient().fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] { _id, contentHash }`,
      { slug }
    )

    // Skip if content hasn't changed (unless --force)
    if (existing && existing.contentHash === parsed.contentHash && !FORCE_SYNC) {
      console.log(`  SKIP: ${slug} (unchanged)`)
      result.skipped.push(slug)
      return
    }

    // Ensure author exists
    const authorId = await ensureAuthor(parsed.frontmatter)

    // Upload cover image
    let coverImageAsset: { _type: string; _ref: string } | null = null
    const coverImageValue = parsed.frontmatter.coverImage
    if (coverImageValue && !SKIP_IMAGES) {
      const mdxFullPath = path.resolve(BLOG_REPO_PATH, parsed.sourceFile)
      const resolvedPath = resolveCoverImagePath(coverImageValue, mdxFullPath)
      if (resolvedPath) {
        const filename = path.basename(resolvedPath.replace(/\?.*$/, ''))
        if (!DRY_RUN) {
          coverImageAsset = await uploadImageToSanity(resolvedPath, filename)
          if (coverImageAsset) {
            console.log(`    Uploaded cover image: ${filename}`)
          }
        } else {
          console.log(`    [DRY RUN] Would upload cover image: ${filename}`)
        }
      }
    }

    // Build document
    const doc = buildSanityDocument(parsed, authorId, coverImageAsset)

    // Post-process content blocks: resolve _pendingUpload inline images
    if (!SKIP_IMAGES && !DRY_RUN) {
      const mdxFullPath = path.resolve(BLOG_REPO_PATH, parsed.sourceFile)
      for (let i = 0; i < doc.content.length; i++) {
        const block = doc.content[i]
        if (block._pendingUpload) {
          const resolvedPath = resolveInlineImagePath(block._imagePath, mdxFullPath)
          if (fs.existsSync(resolvedPath)) {
            const filename = path.basename(resolvedPath)
            const assetRef = await uploadImageToSanity(resolvedPath, filename)
            if (assetRef) {
              doc.content[i] = {
                _type: 'image',
                _key: block._key,
                asset: assetRef,
                alt: block.alt || 'Image',
              }
              console.log(`    Uploaded inline image: ${filename}`)
            } else {
              // Replace with placeholder text block
              doc.content[i] = createTextBlock(`[Image: ${block.alt}]`, 'normal')
            }
          } else {
            console.warn(`    WARN: Missing inline image: ${block._imagePath}`)
            doc.content[i] = createTextBlock(`[Image: ${block.alt}]`, 'normal')
          }
          // Clean up temporary properties
          delete doc.content[i]._pendingUpload
          delete doc.content[i]._imagePath
        }
      }
    } else if (DRY_RUN) {
      // In dry run, just clean up pending markers
      for (let i = 0; i < doc.content.length; i++) {
        if (doc.content[i]._pendingUpload) {
          const block = doc.content[i]
          doc.content[i] = createTextBlock(`[Image: ${block.alt}]`, 'normal')
        }
      }
    }

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would ${existing ? 'update' : 'create'}: ${slug}`)
      result[existing ? 'updated' : 'created'].push(slug)
      return
    }

    if (existing) {
      // Update existing document
      await getSanityClient().patch(existing._id).set(doc).commit()
      console.log(`  UPDATED: ${slug}`)
      result.updated.push(slug)
    } else {
      // Create new published document with deterministic ID
      doc._id = slug
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await getSanityClient().createIfNotExists(doc as any)
      console.log(`  CREATED: ${slug}`)
      result.created.push(slug)
    }
  } catch (error: any) {
    console.error(`  ERROR: ${slug} — ${error.message}`)
    result.errors.push(`${slug}: ${error.message}`)
  }
}

// ═══ Validation ═══

function validatePosts(files: string[]): void {
  console.log('\n═══════════════════════════════════════════════════')
  console.log('  VALIDATION REPORT')
  console.log('═══════════════════════════════════════════════════\n')

  const slugs = new Map<string, string>()
  const allSlugs = new Set<string>()
  const issues: string[] = []

  // First pass: collect all slugs
  for (const file of files) {
    try {
      const parsed = parseMdxFile(file)
      const slug = parsed.frontmatter.slug
      if (slug) allSlugs.add(slug)
    } catch { /* ignore parse errors for slug collection */ }
  }

  for (const file of files) {
    const relativePath = path.relative(BLOG_REPO_PATH, file)
    const postIssues: string[] = []

    try {
      const parsed = parseMdxFile(file)
      const fm = parsed.frontmatter

      // Missing slug
      if (!fm.slug) {
        postIssues.push('Missing slug')
      } else {
        // Duplicate slug
        if (slugs.has(fm.slug)) {
          postIssues.push(`Duplicate slug "${fm.slug}" (also in ${slugs.get(fm.slug)})`)
        }
        slugs.set(fm.slug, relativePath)
      }

      // Missing title
      if (!fm.title) {
        postIssues.push('Missing title')
      }

      // Check cover image path
      if (fm.coverImage) {
        const resolved = resolveCoverImagePath(fm.coverImage, file)
        if (!resolved.startsWith('http') && !fs.existsSync(resolved)) {
          postIssues.push(`Broken cover image: ${fm.coverImage}`)
        }
      }

      // Check inline images in content
      const inlineImageMatches = parsed.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)
      for (const match of inlineImageMatches) {
        const imgPath = match[2]
        if (!imgPath.startsWith('http')) {
          const resolved = resolveInlineImagePath(imgPath, file)
          if (!fs.existsSync(resolved)) {
            postIssues.push(`Broken inline image: ${imgPath}`)
          }
        }
      }

      // Check relatedSlugs references
      if (fm.relatedSlugs && Array.isArray(fm.relatedSlugs)) {
        for (const ref of fm.relatedSlugs) {
          if (!allSlugs.has(ref)) {
            postIssues.push(`Orphaned relatedSlug: "${ref}"`)
          }
        }
      }

      // Check clusterSlugs references
      if (fm.clusterSlugs && Array.isArray(fm.clusterSlugs)) {
        for (const ref of fm.clusterSlugs) {
          if (!allSlugs.has(ref)) {
            postIssues.push(`Orphaned clusterSlug: "${ref}"`)
          }
        }
      }

      if (postIssues.length > 0) {
        console.log(`  ${relativePath}:`)
        postIssues.forEach((issue) => console.log(`    - ${issue}`))
        issues.push(...postIssues.map((i) => `${relativePath}: ${i}`))
      }
    } catch (error: any) {
      console.log(`  ${relativePath}:`)
      console.log(`    - Parse error: ${error.message}`)
      issues.push(`${relativePath}: Parse error: ${error.message}`)
    }
  }

  console.log(`\n  Total files: ${files.length}`)
  console.log(`  Total issues: ${issues.length}`)
  if (issues.length === 0) {
    console.log('  All posts validated successfully!')
  }
  console.log('═══════════════════════════════════════════════════')
}

// ═══ Main ═══

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blog Repo → Sanity CMS Sync')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Blog repo: ${BLOG_REPO_PATH}`)
  console.log(`  Posts dir: ${POSTS_DIR}`)
  console.log(`  Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`  Sanity dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)
  console.log(`  Dry run: ${DRY_RUN}`)
  console.log(`  Force sync: ${FORCE_SYNC}`)
  console.log(`  Skip images: ${SKIP_IMAGES}`)
  console.log(`  Validate only: ${VALIDATE_ONLY}`)
  console.log('═══════════════════════════════════════════════════')

  // Discover MDX files
  const files = findMdxFiles(POSTS_DIR)
  console.log(`\nFound ${files.length} MDX files\n`)

  if (files.length === 0) {
    console.log('No files to process.')
    return
  }

  // Validate-only mode
  if (VALIDATE_ONLY) {
    validatePosts(files)
    return
  }

  if (!process.env.SANITY_API_TOKEN && !DRY_RUN) {
    console.error('ERROR: SANITY_API_TOKEN is required for write operations.')
    console.error('Use --dry-run to preview changes without writing.')
    process.exit(1)
  }

  const result: SyncResult = {
    created: [],
    updated: [],
    skipped: [],
    errors: [],
  }

  // Process each file
  for (const file of files) {
    const relativePath = path.relative(BLOG_REPO_PATH, file)
    console.log(`Processing: ${relativePath}`)

    try {
      const parsed = parseMdxFile(file)
      await syncPost(parsed, result)
    } catch (error: any) {
      console.error(`  ERROR parsing: ${error.message}`)
      result.errors.push(`${relativePath}: ${error.message}`)
    }
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════')
  console.log('  SYNC SUMMARY')
  console.log('═══════════════════════════════════════════════════')
  console.log(`  Created: ${result.created.length}`)
  console.log(`  Updated: ${result.updated.length}`)
  console.log(`  Skipped: ${result.skipped.length} (unchanged)`)
  console.log(`  Errors:  ${result.errors.length}`)

  if (result.errors.length > 0) {
    console.log('\n  Errors:')
    result.errors.forEach((e) => console.log(`    - ${e}`))
  }

  console.log('═══════════════════════════════════════════════════')
}

main().catch(console.error)
