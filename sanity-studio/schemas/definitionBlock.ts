import { defineType, defineField } from 'sanity'

// Structured definition → Google Knowledge Panel / Dictionary Snippet
export const definitionBlock = defineType({
  name: 'definitionBlock',
  title: 'Definition Block',
  type: 'object',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'term' },
    prepare({ title }) {
      return { title: `Definition: ${title}` }
    },
  },
})
