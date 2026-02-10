import { defineType, defineField } from 'sanity'

// Key statistic with source → Snippet-worthy data point
export const statBlock = defineType({
  name: 'statBlock',
  title: 'Statistic Block',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Stat Value',
      type: 'string',
      description: 'E.g., "40%", "$2.5M", "3.5x"',
    }),
    defineField({
      name: 'label',
      title: 'What it measures',
      type: 'string',
    }),
    defineField({
      name: 'context',
      title: 'Context / Explanation',
      type: 'text',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
