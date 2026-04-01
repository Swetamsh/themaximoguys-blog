import { defineType, defineField } from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  icon: () => '📋',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'details',
      title: 'Details',
      description: 'Bullet points for this step',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'E.g., "2-4 weeks", "Ongoing"',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      description: 'Lucide icon name',
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { stepNumber: 'stepNumber', title: 'title', duration: 'duration' },
    prepare({ stepNumber, title, duration }) {
      return {
        title: `Step ${stepNumber}: ${title}`,
        subtitle: duration,
      }
    },
  },
  orderings: [
    { title: 'Step Number', name: 'stepNumber', by: [{ field: 'stepNumber', direction: 'asc' }] },
  ],
})
