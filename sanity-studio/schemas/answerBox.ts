import { defineType, defineField } from 'sanity'

// Answer box → Featured snippet bait, direct answer format
export const answerBox = defineType({
  name: 'answerBox',
  title: 'Answer Box',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The exact question being answered. Targets "People also ask" and AI Overviews.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Direct Answer',
      type: 'text',
      rows: 4,
      description: '40-60 word direct answer. This is the featured snippet target.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source / Attribution',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'question' },
    prepare({ title }) {
      return { title: `Q: ${title}` }
    },
  },
})
