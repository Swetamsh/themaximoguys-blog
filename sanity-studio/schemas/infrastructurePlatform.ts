import { defineType, defineField, defineArrayMember } from 'sanity'

// Infrastructure platform landing pages (/solutions/deployment-options/<slug>) on themaximoguys.ai.
// Mirrors the `InfrastructurePlatform` type in THEMAXIMOGUYS-NEXTJS lib/infrastructure-data.ts; the
// site falls back to the code version of each field when it is empty here. Same pattern as industry.ts.
//
// LEGAL: every statistic must cite a source (FTC substantiation). Do not add prices, deployment-time
// promises, or IBM / AWS / Microsoft / Red Hat partner or certification claims. No FedRAMP / defense copy.

const sourceFields = [
  defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
  defineField({
    name: 'url',
    title: 'URL',
    type: 'url',
    validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }),
  }),
]

const titledItem = (descriptionTitle: string) =>
  defineArrayMember({
    type: 'object',
    fields: [
      defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
      defineField({ name: 'description', title: descriptionTitle, type: 'text', rows: 3 }),
    ],
    preview: { select: { title: 'title', subtitle: 'description' } },
  })

export const infrastructurePlatform = defineType({
  name: 'infrastructurePlatform',
  title: 'Infrastructure Platform',
  type: 'document',
  icon: () => '🖥️',
  groups: [
    { name: 'card', title: 'Card & Hero', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Page Content' },
    { name: 'evidence', title: 'Stats, Requirements & Sources' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'card', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Must match a page in the site code: ibm-cloud, aws, azure, on-premises, bare-metal.',
      type: 'slug',
      group: 'card',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'navLabel', title: 'Nav Label', description: 'e.g. "Maximo on AWS"', type: 'string', group: 'card' }),
    defineField({ name: 'tagline', title: 'Tagline', description: 'One line for nav and cards', type: 'string', group: 'card' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'card' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'card' }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      description: 'Lucide icon name (informational; the site sets the icon in code)',
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
      description: 'Without brand suffix (the site appends " | TheMaximoGuys"). Aim for 50 characters or fewer.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('Keep the SEO title short'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(155).warning('Meta descriptions over 155 characters get truncated'),
    }),

    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 6, group: 'content' }),
    defineField({
      name: 'callout',
      title: 'Callout',
      description: 'Version, support, or rename notes worth flagging',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'architecture',
      title: 'Reference Architecture Layers',
      type: 'array',
      group: 'content',
      of: [titledItem('Description')],
    }),
    defineField({
      name: 'challenges',
      title: 'Trade-offs & Challenges',
      type: 'array',
      group: 'content',
      of: [titledItem('Description')],
    }),
    defineField({
      name: 'solutions',
      title: 'What We Do',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'aiCapability', title: 'AI on this platform', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'stack',
      title: 'Stack Components',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'relatedPlatforms',
      title: 'Related Platforms (slugs)',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),

    defineField({
      name: 'keyStats',
      title: 'Key Stats (third-party, sourced)',
      description: 'Every stat needs a source link. No TheMaximoGuys client results, prices, or savings claims.',
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
      name: 'requirements',
      title: 'Official Prerequisites & References',
      type: 'array',
      group: 'evidence',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'url', title: 'Official URL', type: 'url', validation: (Rule) => Rule.required() }),
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
