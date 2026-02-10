import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'

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

export default defineConfig({
  name: 'default',
  title: 'The Maximo Guys Blog',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ajindfal',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(), // Query testing tool
    codeInput(),
  ],

  schema: {
    types: [
      // Document types
      blogPost,
      author,
      faqSection,
      howToSection,
      // AEO Content Block types (used inline in blogPost content)
      comparisonTable,
      definitionBlock,
      expertQuote,
      statBlock,
      proConList,
      calloutBox,
      citationBlock,
      keyTakeawaysBlock,
      answerBox,
    ],
  },

  // Custom studio configuration
  tools: (prev) => {
    return prev
  },
})
