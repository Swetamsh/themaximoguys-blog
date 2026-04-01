import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: () => '🏠',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'sections', title: 'Page Sections' },
    { name: 'cta', title: 'CTA Section' },
  ],
  fields: [
    // ═══ HERO GROUP ═══
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHighlightText',
      title: 'Hero Highlight Text',
      description: 'The colored/emphasized portion of the headline',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCTA',
      title: 'Primary CTA',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroSecondaryCTAs',
      title: 'Secondary CTAs',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'heroCheckItems',
      title: 'Check Items',
      description: 'Bullet points with checkmarks shown under description',
      type: 'array',
      group: 'hero',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroCapabilityTags',
      title: 'Capability Tags',
      description: 'Tag chips shown in the hero (e.g., "Workflow Automation")',
      type: 'array',
      group: 'hero',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'heroAgentFeed',
      title: 'Agent Feed Items',
      description: 'Animated feed items in the hero visualization',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'detail', title: 'Detail', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'detail' } },
        },
      ],
    }),
    defineField({
      name: 'heroMiniStats',
      title: 'Mini Stats',
      description: 'Small stats shown in the hero (e.g., "2,847 Assets")',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // ═══ SECTIONS GROUP ═══
    defineField({
      name: 'metricsBadge',
      title: 'Metrics Section Badge',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'metricsHeading',
      title: 'Metrics Section Heading',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'metricsDescription',
      title: 'Metrics Section Description',
      type: 'text',
      rows: 2,
      group: 'sections',
    }),
    defineField({
      name: 'servicesBadge',
      title: 'Services Section Badge',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Section Heading',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Section Description',
      type: 'text',
      rows: 2,
      group: 'sections',
    }),
    defineField({
      name: 'testimonialsBadge',
      title: 'Testimonials Section Badge',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials Section Heading',
      type: 'string',
      group: 'sections',
    }),
    defineField({
      name: 'testimonialsDescription',
      title: 'Testimonials Section Description',
      type: 'text',
      rows: 2,
      group: 'sections',
    }),

    // ═══ CTA GROUP ═══
    defineField({
      name: 'ctaBadge',
      title: 'CTA Badge',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryCTA',
      title: 'CTA Primary Button',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaSecondaryCTA',
      title: 'CTA Secondary Button',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaTrustIndicators',
      title: 'CTA Trust Indicators',
      type: 'array',
      group: 'cta',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
