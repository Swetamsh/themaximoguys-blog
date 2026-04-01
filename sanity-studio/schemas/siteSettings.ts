import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'TheMaximoGuys',
    }),
    defineField({
      name: 'companyEmail',
      title: 'Company Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'companyLocation',
      title: 'Company Location',
      type: 'string',
    }),
    defineField({
      name: 'companyHours',
      title: 'Business Hours',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'trustIndicators',
      title: 'Trust Indicators',
      description: 'Trust signals shown across CTAs (e.g., "No commitment required")',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
