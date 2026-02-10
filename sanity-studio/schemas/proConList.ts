import { defineType, defineField } from 'sanity'

// Pro/Con list → Comparison snippet optimization
export const proConList = defineType({
  name: 'proConList',
  title: 'Pro/Con List',
  type: 'object',
  fields: [
    defineField({
      name: 'subject',
      title: 'Subject being evaluated',
      type: 'string',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict / Recommendation',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'subject' },
    prepare({ title }) {
      return { title: `Pros/Cons: ${title}` }
    },
  },
})
