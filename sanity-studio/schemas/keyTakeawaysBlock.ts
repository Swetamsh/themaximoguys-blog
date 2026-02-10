import { defineType, defineField } from 'sanity'

// Key takeaways block for inline content → AI-extractable summary
export const keyTakeawaysBlock = defineType({
  name: 'keyTakeawaysBlock',
  title: 'Key Takeaways',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Key Takeaways',
    }),
    defineField({
      name: 'items',
      title: 'Takeaway Items',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }) {
      return {
        title: title || 'Key Takeaways',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
