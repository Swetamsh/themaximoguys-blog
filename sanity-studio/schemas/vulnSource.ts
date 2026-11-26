import { defineType, defineField } from 'sanity'

// Entry in the Sources tab of themaximoguys.ai/resources/vulnerabilities (Next.js plan: SKILLS_VULNERABILITIES.md Rev 8).
export const vulnSource = defineType({
  name: 'vulnSource',
  title: 'Vulnerability Source',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'group', title: 'Group', type: 'string', options: { list: [{ title: 'AI-specific', value: 'ai' }, { title: 'Vulnerability databases', value: 'databases' }, { title: 'Vendor feeds', value: 'vendors' }], layout: 'radio' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Order in group', type: 'number' }),
    defineField({ name: 'publisher', title: 'Publisher', type: 'string' }),
    defineField({ name: 'kind', title: 'Kind', type: 'string', options: { list: ['Taxonomy', 'Framework', 'Database', 'Feed', 'Incident log', 'Bug bounty'] } }),
    defineField({ name: 'covers', title: 'What it covers', type: 'text', rows: 3 }),
    defineField({ name: 'access', title: 'Access', type: 'string' }),
    defineField({ name: 'useIt', title: 'For Maximo teams', type: 'text', rows: 2 }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'dataUrl', title: 'Data URL', type: 'url' }),
    defineField({ name: 'usedHere', title: 'Feeds this page', type: 'boolean' }),
  ],
  orderings: [{ title: 'Group, order', name: 'groupOrder', by: [{ field: 'group', direction: 'asc' }, { field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'publisher' } },
})
