import { defineType, defineField } from 'sanity'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  icon: () => '🎬',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      description: 'YouTube or Vimeo URL (e.g., https://youtube.com/watch?v=xxx or https://vimeo.com/xxx)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Video Title',
      description: 'Accessible title for the embed',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'url' },
    prepare({ title, subtitle }) {
      return { title: title || 'Video', subtitle }
    },
  },
})
