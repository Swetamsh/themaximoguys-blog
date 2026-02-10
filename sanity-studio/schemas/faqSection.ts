import { defineType, defineField } from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title,
        subtitle: `${items?.length || 0} questions`,
      }
    },
  },
})
