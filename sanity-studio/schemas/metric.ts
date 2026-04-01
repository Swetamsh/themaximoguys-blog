import { defineType, defineField } from 'sanity'

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'document',
  icon: () => '📈',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'The metric number (e.g., "85%+", "$2.8B", "500+")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'What it measures (e.g., "Prediction Accuracy")',
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
      name: 'icon',
      title: 'Icon Name',
      description: 'Lucide icon name',
      type: 'string',
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      options: {
        list: [
          { title: 'Standalone', value: 'standalone' },
          { title: 'Before', value: 'before' },
          { title: 'After', value: 'after' },
        ],
        layout: 'radio',
      },
      initialValue: 'standalone',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'ROI', value: 'roi' },
          { title: 'Performance', value: 'performance' },
          { title: 'Capability', value: 'capability' },
          { title: 'Company', value: 'company' },
        ],
      },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
    { title: 'Category', name: 'category', by: [{ field: 'category', direction: 'asc' }] },
  ],
})
