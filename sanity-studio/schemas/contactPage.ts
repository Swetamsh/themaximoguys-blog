import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: () => '📞',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sidebarTitle',
      title: 'Sidebar Title',
      type: 'string',
    }),
    defineField({
      name: 'sidebarDescription',
      title: 'Sidebar Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'expectations',
      title: 'What to Expect',
      description: 'Bullet points about what happens during the assessment',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactLocation',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'contactHours',
      title: 'Business Hours',
      type: 'string',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
