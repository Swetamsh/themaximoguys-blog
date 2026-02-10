import { defineType, defineField } from 'sanity'

// Expert quote with attribution → E-E-A-T credibility signal
export const expertQuote = defineType({
  name: 'expertQuote',
  title: 'Expert Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title/Role',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'organization' },
  },
})
