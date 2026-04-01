import { defineType, defineField } from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  icon: () => '🔗',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonHref',
      title: 'Button URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Blue)', value: 'primary' },
          { title: 'Secondary (Outline)', value: 'secondary' },
          { title: 'Accent (Gradient)', value: 'accent' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'buttonLabel' },
  },
})
