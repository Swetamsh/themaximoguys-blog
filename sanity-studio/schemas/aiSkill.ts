import { defineType, defineField, defineArrayMember } from 'sanity'

// AI agent skill shown on themaximoguys.ai/resources/skills (Next.js repo plan: plans/SKILLS_VULNERABILITIES.md Rev 8).
// Seeded and refreshed by scripts/sync-sanity-skills.ts in the Next.js repo. The sync only fills the
// editorial fields (curated, tmgPick, job, eamUse, industries) when empty, so Studio edits are kept.

const JOBS = [
  { title: 'Plan & schedule work', value: 'plan' },
  { title: 'Predict & monitor assets', value: 'predict' },
  { title: 'Inspect with images & drawings', value: 'inspect' },
  { title: 'Documents & reports', value: 'docs' },
  { title: 'Data, systems & integration', value: 'data' },
  { title: 'Safety, security & compliance', value: 'comply' },
  { title: 'More useful skills', value: 'other' },
]

const INDUSTRIES = [
  { title: 'Every industry', value: 'all' },
  { title: 'Manufacturing', value: 'manufacturing' },
  { title: 'Utilities', value: 'utilities' },
  { title: 'Oil & Gas', value: 'oil-gas' },
  { title: 'Water & Wastewater', value: 'water' },
  { title: 'Mining', value: 'mining' },
  { title: 'Transportation', value: 'transportation' },
  { title: 'Facilities', value: 'facilities' },
  { title: 'Healthcare', value: 'healthcare' },
  { title: 'Pharmaceuticals', value: 'pharmaceuticals' },
  { title: 'Nuclear', value: 'nuclear' },
  { title: 'Defense', value: 'defense' },
  { title: 'Government', value: 'government' },
]

const note = defineArrayMember({
  type: 'object',
  name: 'skillNote',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'title', subtitle: 'text' } },
})

export const aiSkill = defineType({
  name: 'aiSkill',
  title: 'AI Skill',
  type: 'document',
  icon: () => '🧩',
  groups: [
    { name: 'editorial', title: 'Editorial', default: true },
    { name: 'content', title: 'Content' },
    { name: 'source', title: 'Source' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content', description: 'URL: /resources/skills/<slug>', options: { source: 'title', maxLength: 120 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'name', title: 'Skill name (folder)', type: 'string', group: 'content' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'content' }),

    defineField({ name: 'curated', title: 'Show on the Skills page', type: 'boolean', group: 'editorial', initialValue: false, description: 'Curated skills fill the org chart and industry sections. All skills appear in the library.' }),
    defineField({ name: 'tmgPick', title: 'TMG pick', type: 'boolean', group: 'editorial', initialValue: false }),
    defineField({ name: 'job', title: 'Maintenance job', type: 'string', group: 'editorial', options: { list: JOBS } }),
    defineField({ name: 'eamUse', title: 'In Maximo / EAM terms', type: 'text', rows: 2, group: 'editorial', description: 'One line on how the skill helps asset work. Shown on cards and the profile.' }),
    defineField({ name: 'industries', title: 'Industries', type: 'array', group: 'editorial', of: [{ type: 'string' }], options: { list: INDUSTRIES, layout: 'grid' } }),
    defineField({ name: 'rank', title: 'Sort rank', type: 'number', group: 'editorial', description: 'Lower shows first. Set by the sync from TMG picks, relevance and popularity.' }),

    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'useCases', title: 'Use cases', type: 'array', group: 'content', of: [note] }),
    defineField({ name: 'capabilities', title: 'Capabilities', type: 'array', group: 'content', of: [note] }),
    defineField({ name: 'faq', title: 'FAQ', type: 'array', group: 'content', of: [note] }),
    defineField({ name: 'category', title: 'Category', type: 'string', group: 'content' }),

    defineField({ name: 'source', title: 'Source', type: 'string', group: 'source', options: { list: ['openskills.cc', 'github'] } }),
    defineField({ name: 'author', title: 'Author', type: 'string', group: 'source' }),
    defineField({ name: 'licence', title: 'Licence', type: 'string', group: 'source' }),
    defineField({ name: 'hot', title: 'Popularity (openskills.cc)', type: 'number', group: 'source' }),
    defineField({ name: 'sourceUrl', title: 'Source (GitHub)', type: 'url', group: 'source' }),
    defineField({ name: 'pageUrl', title: 'openskills.cc page', type: 'url', group: 'source' }),
    defineField({ name: 'fetchedAt', title: 'Data fetched', type: 'date', group: 'source', readOnly: true }),
  ],
  orderings: [
    { title: 'Rank', name: 'rankAsc', by: [{ field: 'rank', direction: 'asc' }] },
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'eamUse', curated: 'curated', pick: 'tmgPick', description: 'description' },
    prepare: ({ title, subtitle, curated, pick, description }) => ({
      title: `${pick ? '★ ' : ''}${title}`,
      subtitle: `${curated ? 'On page · ' : ''}${subtitle || description || ''}`,
    }),
  },
})
