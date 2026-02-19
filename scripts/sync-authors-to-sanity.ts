/**
 * Sync Approved Authors: Supabase → Sanity CMS
 *
 * Reads all approved authors from Supabase (is_author = true),
 * checks which ones already exist in Sanity (by author_slug),
 * and creates missing author documents in Sanity.
 *
 * Idempotent — safe to re-run. Only creates missing authors.
 *
 * Usage:
 *   npx tsx scripts/sync-authors-to-sanity.ts
 *   npx tsx scripts/sync-authors-to-sanity.ts --dry-run
 *   npx tsx scripts/sync-authors-to-sanity.ts --schema tmg_prod
 *
 * Env vars required (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN (write access)
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient as createSanityClient } from '@sanity/client'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

const DRY_RUN = process.argv.includes('--dry-run')

// Parse --schema flag (default: tmg_dev)
const schemaFlagIndex = process.argv.indexOf('--schema')
const DB_SCHEMA = schemaFlagIndex !== -1 && process.argv[schemaFlagIndex + 1]
  ? process.argv[schemaFlagIndex + 1]
  : 'tmg_dev'

// ═══ Validate env ═══

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_API_TOKEN

const missing: string[] = []
if (!SUPABASE_URL) missing.push('SUPABASE_URL')
if (!SUPABASE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')
if (!SANITY_PROJECT_ID) missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!SANITY_TOKEN) missing.push('SANITY_API_TOKEN')

if (missing.length > 0) {
  console.error(`\n❌ Missing env vars in .env.local:\n   ${missing.join('\n   ')}`)
  process.exit(1)
}

// ═══ Main ═══

async function main() {
  console.log('\n' + '═'.repeat(55))
  console.log('  🔄 Sync Authors: Supabase → Sanity')
  console.log('═'.repeat(55))
  console.log(`  Schema:  ${DB_SCHEMA}`)
  console.log(`  Dataset: ${SANITY_DATASET}`)
  console.log(`  Mode:    ${DRY_RUN ? '🏜️  DRY RUN (no changes)' : '🚀 LIVE'}`)
  console.log('═'.repeat(55) + '\n')

  // 1. Connect to Supabase (service role bypasses RLS)
  const supabase = createSupabaseClient(SUPABASE_URL!, SUPABASE_KEY!, {
    db: { schema: DB_SCHEMA as 'public' | 'tmg_dev' | 'tmg_test' | 'tmg_prod' },
  })

  // 2. Fetch approved authors
  const { data: authors, error } = await supabase
    .from('profiles')
    .select(
      'id, full_name, author_slug, bio, job_title, credentials, years_experience, specializations, company_name, linkedin_url, twitter_url, github_url, website_url, avatar_url'
    )
    .eq('is_author', true)
    .not('author_slug', 'is', null)

  if (error) {
    console.error('❌ Supabase error:', error.message)
    process.exit(1)
  }

  if (!authors || authors.length === 0) {
    console.log('ℹ️  No approved authors found in Supabase.\n')
    return
  }

  console.log(`📋 Found ${authors.length} approved author(s) in Supabase:\n`)
  for (const a of authors) {
    console.log(`   • ${a.full_name} → slug: ${a.author_slug}`)
  }

  // 3. Connect to Sanity
  const sanity = createSanityClient({
    projectId: SANITY_PROJECT_ID!,
    dataset: SANITY_DATASET,
    apiVersion: '2024-02-01',
    useCdn: false,
    token: SANITY_TOKEN!,
  })

  // 4. Fetch existing Sanity author slugs
  const existingSlugs: string[] = await sanity.fetch(
    `*[_type == "author"].slug.current`
  )

  console.log(`\n📚 Existing Sanity authors (${existingSlugs.length}):`)
  for (const s of existingSlugs) {
    console.log(`   • ${s}`)
  }

  // 5. Sync missing authors
  let created = 0
  let skipped = 0

  for (const author of authors) {
    const slug = author.author_slug

    if (existingSlugs.includes(slug)) {
      console.log(`\n⏭️  "${author.full_name}" (${slug}) — already in Sanity`)
      skipped++
      continue
    }

    console.log(`\n✨ ${DRY_RUN ? '[DRY RUN] Would create' : 'Creating'}: "${author.full_name}" (${slug})`)

    if (!DRY_RUN) {
      try {
        const doc = await sanity.create({
          _type: 'author',
          name: author.full_name || 'Unknown Author',
          slug: { _type: 'slug', current: slug },
          bio: author.bio || '',
          title: author.job_title || '',
          credentials: author.credentials || [],
          yearsExperience: author.years_experience || 0,
          specializations: author.specializations || [],
          worksFor: author.company_name || '',
          linkedin: author.linkedin_url || '',
          twitter: author.twitter_url || '',
          github: author.github_url || '',
          website: author.website_url || '',
        })
        console.log(`   ✅ Created (id: ${doc._id})`)
        created++
      } catch (err) {
        console.error(`   ❌ Failed:`, err instanceof Error ? err.message : err)
      }
    } else {
      created++
    }
  }

  // 6. Summary
  console.log('\n' + '═'.repeat(55))
  console.log('  📊 Sync Summary')
  console.log('═'.repeat(55))
  console.log(`  Created:  ${created}${DRY_RUN ? ' (dry run)' : ''}`)
  console.log(`  Skipped:  ${skipped} (already in Sanity)`)
  console.log(`  Total:    ${authors.length} author(s) in Supabase`)
  console.log('═'.repeat(55) + '\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
