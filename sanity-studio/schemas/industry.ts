import { defineType, defineField, defineArrayMember } from 'sanity'

// Industry landing pages (/industries/<slug>) on themaximoguys.ai.
// Mirrors the `Industry` type in THEMAXIMOGUYS-NEXTJS lib/industries-data.ts; the site
// falls back to the code version of each field when it is empty here.
//
// LEGAL: every statistic must cite a source (FTC substantiation). Do not add ROI %,
// budget ranges, client results, awards, or certifications that can't be documented.

const sourceFields = [
  defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
  defineField({
    name: 'url',
    title: 'URL',
    type: 'url',
    validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }),
  }),
]

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: () => '🏭',
  groups: [
    { name: 'card', title: 'Card & Hero', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Page Content' },
    { name: 'evidence', title: 'Stats, Compliance & Sources' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'card', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      description: 'Must match an existing /industries/<slug> route on the website.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', group: 'card' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'card' }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      description: 'Lucide icon name (e.g., "Factory", "Droplets", "Zap"). The site uses its own icon if empty.',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient Classes',
      description: 'Tailwind gradient classes, e.g. "from-blue-500 to-cyan-500"',
      type: 'string',
      group: 'card',
    }),
    defineField({ name: 'image', title: 'Card Image', type: 'image', group: 'card', options: { hotspot: true } }),
    defineField({
      name: 'cardTagline',
      title: 'Card Tagline',
      description: 'Short line on the industries showcase card. Qualitative only (e.g., "Health · Predict · Linear Assets").',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'topPriorities',
      title: 'Top Priorities',
      type: 'array',
      group: 'card',
      of: [defineArrayMember({ type: 'string' })],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: '" | TheMaximoGuys" is appended automatically. Aim for ≤50 characters.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70).warning('Long titles get truncated in search results'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(155).warning('Keep under 155 characters'),
    }),

    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 6, group: 'content' }),
    defineField({
      name: 'callout',
      title: 'Callout',
      description: 'Highlighted note, e.g. MAS 9 renames or end-of-support dates.',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'challenges',
      title: 'Key Challenges',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'aiCapability', title: 'AI / Advanced Capability', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'masModules',
      title: 'IBM MAS Modules',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'relatedIndustries',
      title: 'Related Industries (slugs)',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),

    defineField({
      name: 'keyStats',
      title: 'Key Stats (third-party, sourced)',
      description: 'Every stat needs a source link. No TheMaximoGuys client results or ROI claims.',
      type: 'array',
      group: 'evidence',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({
              name: 'source',
              title: 'Source',
              type: 'object',
              fields: sourceFields,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'compliance',
      title: 'Compliance & Regulatory',
      type: 'array',
      group: 'evidence',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'description',
              title: 'How Maximo supports it',
              description: 'Describe support. Never claim Maximo is "certified" or "compliant".',
              type: 'text',
              rows: 2,
            }),
            defineField({ name: 'url', title: 'Official URL', type: 'url' }),
          ],
          preview: { select: { title: 'name', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'sources',
      title: 'Sources & References',
      type: 'array',
      group: 'evidence',
      of: [
        defineArrayMember({
          type: 'object',
          fields: sourceFields,
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Rendered on the page and as FAQPage structured data.',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),

    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', group: 'card', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'card', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
