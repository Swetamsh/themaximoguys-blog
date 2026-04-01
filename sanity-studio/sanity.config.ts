import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import type { StructureBuilder } from 'sanity/structure'

// Schema imports — Document types
import { blogPost } from './schemas/blogPost'
import { author } from './schemas/author'
import { faqSection } from './schemas/faqSection'
import { howToSection } from './schemas/howToSection'

// Schema imports — AEO Content Block types (object types for Portable Text)
import { comparisonTable } from './schemas/comparisonTable'
import { definitionBlock } from './schemas/definitionBlock'
import { expertQuote } from './schemas/expertQuote'
import { statBlock } from './schemas/statBlock'
import { proConList } from './schemas/proConList'
import { calloutBox } from './schemas/calloutBox'
import { citationBlock } from './schemas/citationBlock'
import { keyTakeawaysBlock } from './schemas/keyTakeawaysBlock'
import { answerBox } from './schemas/answerBox'
import { accordionBlock } from './schemas/accordionBlock'
import { ctaBlock } from './schemas/ctaBlock'
import { videoEmbed } from './schemas/videoEmbed'
import { timelineBlock } from './schemas/timelineBlock'

// Schema imports — Marketing Page types
import { siteSettings } from './schemas/siteSettings'
import { homePage } from './schemas/homePage'
import { aboutPage } from './schemas/aboutPage'
import { contactPage } from './schemas/contactPage'
import { testimonial } from './schemas/testimonial'
import { caseStudy } from './schemas/caseStudy'
import { industry } from './schemas/industry'
import { service } from './schemas/service'
import { skill } from './schemas/skill'
import { certification } from './schemas/certification'
import { technology } from './schemas/technology'
import { metric } from './schemas/metric'
import { processStep } from './schemas/processStep'

// Singleton document IDs
const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage', 'contactPage']

// Custom Studio structure
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ─── Pages (Singletons) ───
      S.listItem()
        .title('Pages')
        .icon(() => '📑')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(() => '⚙️')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Home Page')
                .icon(() => '🏠')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .icon(() => '📄')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Contact Page')
                .icon(() => '📞')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ])
        ),

      S.divider(),

      // ─── Blog ───
      S.listItem()
        .title('Blog')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('blogPost').title('Posts'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('faqSection').title('FAQ Sections'),
              S.documentTypeListItem('howToSection').title('How-To Guides'),
            ])
        ),

      S.divider(),

      // ─── Marketing Content ───
      S.listItem()
        .title('Marketing')
        .icon(() => '📢')
        .child(
          S.list()
            .title('Marketing Content')
            .items([
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('industry').title('Industries'),
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('metric').title('Metrics & Stats'),
              S.documentTypeListItem('processStep').title('Process Steps'),
              S.documentTypeListItem('skill').title('Skills'),
              S.documentTypeListItem('certification').title('Certifications'),
              S.documentTypeListItem('technology').title('Tech Stack'),
            ])
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'The Maximo Guys',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ajindfal',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: [
      // Blog document types
      blogPost,
      author,
      faqSection,
      howToSection,
      // AEO content block types
      comparisonTable,
      definitionBlock,
      expertQuote,
      statBlock,
      proConList,
      calloutBox,
      citationBlock,
      keyTakeawaysBlock,
      answerBox,
      accordionBlock,
      ctaBlock,
      videoEmbed,
      timelineBlock,
      // Marketing page singletons
      siteSettings,
      homePage,
      aboutPage,
      contactPage,
      // Marketing content documents
      testimonial,
      caseStudy,
      industry,
      service,
      skill,
      certification,
      technology,
      metric,
      processStep,
    ],
    // Prevent singletons from appearing in "New document" menu
    templates: (prev) => prev.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  // Prevent singletons from having "Create new" action
  document: {
    actions: (prev, context) => {
      if (SINGLETONS.includes(context.schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
      }
      return prev
    },
  },
})
