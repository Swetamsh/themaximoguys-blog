import { defineType, defineField } from 'sanity'

export const howToSection = defineType({
  name: 'howToSection',
  title: 'How-To Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Step-by-Step Guide',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().integer().positive(),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Step Image (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'code',
              title: 'Code Example (optional)',
              type: 'code',
            },
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title',
              media: 'image',
            },
            prepare({ stepNumber, title, media }) {
              return {
                title: `Step ${stepNumber}: ${title}`,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps',
    },
    prepare({ title, steps }) {
      return {
        title,
        subtitle: `${steps?.length || 0} steps`,
      }
    },
  },
})
