import { defineType, defineField } from 'sanity'

// Inline citation → Source credibility signal
export const citationBlock = defineType({
  name: 'citationBlock',
  title: 'Citation / Source Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'type',
      title: 'Source Type',
      type: 'string',
      options: {
        list: ['documentation', 'research', 'article', 'video', 'book', 'ibm-official'],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Relevant excerpt',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
})
