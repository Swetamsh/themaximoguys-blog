import { defineType, defineField } from 'sanity'

// Callout box → Visual emphasis + AI-extractable tip/warning
export const calloutBox = defineType({
  name: 'calloutBox',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tip', value: 'tip' },
          { title: 'Warning', value: 'warning' },
          { title: 'Info', value: 'info' },
          { title: 'Important', value: 'important' },
          { title: 'Experience', value: 'experience' }, // E-E-A-T first-hand experience callout
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type' },
    prepare({ title, type }) {
      return { title: `${type?.toUpperCase() || 'CALLOUT'}: ${title || 'Untitled'}` }
    },
  },
})
