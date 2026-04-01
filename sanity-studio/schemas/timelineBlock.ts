import { defineType, defineField } from 'sanity'

export const timelineBlock = defineType({
  name: 'timelineBlock',
  title: 'Timeline',
  type: 'object',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Timeline Title',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      validation: (Rule) => Rule.min(2),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', steps: 'steps' },
    prepare({ title, steps }) {
      return { title: title || 'Timeline', subtitle: `${steps?.length || 0} steps` }
    },
  },
})
