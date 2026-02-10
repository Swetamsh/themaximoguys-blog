import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'aeo', title: 'AEO (AI Optimization)' },
    { name: 'series', title: 'Series & Clusters' },
    { name: 'meta', title: 'Metadata' },
    { name: 'source', title: 'Source Tracking' },
  ],
  fields: [
    // ═══ CONTENT GROUP ═══
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'SEO meta description. Keep under 155 characters.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'tldr',
      title: 'TL;DR Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: '40-60 word direct answer. Appears as featured snippet bait and AI-extractable summary.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        // --- Rich text blocks ---
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Highlight', value: 'highlight' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                  },
                  {
                    name: 'isInternal',
                    type: 'boolean',
                    title: 'Internal link?',
                    initialValue: false,
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Post Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    to: [{ type: 'blogPost' }],
                  },
                ],
              },
            ],
          },
        },
        // --- Media ---
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Python', value: 'python' },
              { title: 'SQL', value: 'sql' },
              { title: 'Bash', value: 'bash' },
              { title: 'YAML', value: 'yaml' },
              { title: 'JSON', value: 'json' },
              { title: 'XML', value: 'xml' },
              { title: 'Java', value: 'java' },
            ],
          },
        },
        // --- Existing structured content (as references) ---
        {
          type: 'reference',
          to: [{ type: 'faqSection' }, { type: 'howToSection' }],
        },
        // --- SEO/AEO Content Blocks (inline objects) ---
        { type: 'keyTakeawaysBlock' },
        { type: 'answerBox' },
        { type: 'comparisonTable' },
        { type: 'definitionBlock' },
        { type: 'expertQuote' },
        { type: 'statBlock' },
        { type: 'proConList' },
        { type: 'calloutBox' },
        { type: 'citationBlock' },
      ],
    }),

    // ═══ SEO GROUP ═══
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      group: 'seo',
      description: 'If set, overrides title in <title> and og:title. Max 65 chars.',
      validation: (Rule) =>
        Rule.max(65).warning('Titles over 65 characters may be truncated in SERPs'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description Override',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'If set, overrides description in meta and og:description. Max 155 chars.',
      validation: (Rule) =>
        Rule.max(155).warning('Descriptions over 155 characters may be truncated'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: '1200x630px. If not set, cover image is used. If neither, auto-generated.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Set if this post is cross-posted elsewhere.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
      description: 'Exclude this post from search engine indexing.',
      initialValue: false,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ (Structured Data → FAQPage JSON-LD)',
      type: 'array',
      group: 'seo',
      description: 'Each Q&A pair generates a FAQPage schema entry. These appear as rich results in Google.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Answer',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'seo',
      description: 'Bullet points summarizing the post. AI engines extract these for quick answers.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'howTo',
      title: 'HowTo Schema',
      type: 'object',
      group: 'seo',
      description: 'If this post is a tutorial/guide, define steps for HowTo rich results.',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'HowTo Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'HowTo Description',
        },
        {
          name: 'totalTime',
          type: 'string',
          title: 'Total Time (e.g., PT30M, PT2H)',
        },
        {
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Step Name' },
                { name: 'text', type: 'text', title: 'Step Instructions' },
                { name: 'image', type: 'image', title: 'Step Image (optional)' },
              ],
              preview: {
                select: { title: 'name' },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'citations',
      title: 'Citations / Sources',
      type: 'array',
      group: 'seo',
      description: 'External sources referenced. Builds credibility for E-E-A-T.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'url', type: 'url', title: 'URL' },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: ['documentation', 'research', 'article', 'video', 'book'],
              },
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
    }),

    // ═══ AEO (AI OPTIMIZATION) GROUP ═══
    defineField({
      name: 'targetQuestions',
      title: 'Target Questions (AEO)',
      type: 'array',
      group: 'aeo',
      description:
        'Exact questions this post answers. Used for: AI Overview targeting, "People also ask" optimization, voice search matching.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'semanticKeywords',
      title: 'Semantic Keywords (LSI)',
      type: 'array',
      group: 'aeo',
      description:
        'Related terms and phrases that support topical depth. AI engines use these to understand content scope.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency Level',
      type: 'string',
      group: 'aeo',
      description:
        'Maps to TechArticle schema proficiencyLevel. Helps AI engines match content to user expertise.',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Expert', value: 'Expert' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'dependencies',
      title: 'Prerequisites / Dependencies',
      type: 'text',
      group: 'aeo',
      description:
        'Maps to TechArticle schema dependencies. E.g., "IBM Maximo 7.6+, WebSphere 9.x"',
    }),
    defineField({
      name: 'speakableSections',
      title: 'Speakable Sections (Voice Search)',
      type: 'array',
      group: 'aeo',
      description:
        'CSS selectors for sections optimized for text-to-speech. E.g., ".article-headline", ".tldr-summary"',
      of: [{ type: 'string' }],
    }),

    // ═══ SERIES & TOPIC CLUSTERS GROUP ═══
    defineField({
      name: 'seriesName',
      title: 'Series Name',
      type: 'string',
      group: 'series',
      description: 'e.g., "MAS ADMIN", "THINK MAS". Generates ItemList JSON-LD.',
    }),
    defineField({
      name: 'seriesPart',
      title: 'Part Number',
      type: 'number',
      group: 'series',
    }),
    defineField({
      name: 'seriesTotal',
      title: 'Total Parts',
      type: 'number',
      group: 'series',
    }),
    defineField({
      name: 'pillarSlug',
      title: 'Pillar Page Slug',
      type: 'string',
      group: 'series',
      description:
        'If this is a cluster post, link to the pillar/index page slug. Creates bidirectional topic cluster linking.',
    }),
    defineField({
      name: 'clusterSlugs',
      title: 'Cluster Post Slugs',
      type: 'array',
      group: 'series',
      description:
        'If this is a pillar page, list all cluster post slugs. Creates outbound links to the entire cluster.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedSlugs',
      title: 'Related Post Slugs (Manual)',
      type: 'array',
      group: 'series',
      description: 'Manually curated related posts. Supplements vector-based recommendations.',
      of: [{ type: 'string' }],
    }),

    // ═══ METADATA GROUP ═══
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'updateHistory',
      title: 'Update History',
      type: 'array',
      group: 'meta',
      description: 'Track content freshness — Google rewards recently updated content.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'date', type: 'datetime', title: 'Date' },
            { name: 'reason', type: 'string', title: 'Reason' },
          ],
          preview: {
            select: { title: 'reason', subtitle: 'date' },
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'meta',
    }),
    defineField({
      name: 'tier',
      title: 'Content Tier',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Developer', value: 'developer' },
          { title: 'Admin', value: 'admin' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
        layout: 'radio',
      },
      initialValue: 'free',
    }),
    defineField({
      name: 'draft',
      title: 'Draft',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),

    // ═══ SOURCE TRACKING GROUP ═══
    defineField({
      name: 'sourceFile',
      title: 'Source MDX File',
      type: 'string',
      group: 'source',
      readOnly: true,
    }),
    defineField({
      name: 'contentHash',
      title: 'Content Hash (MD5)',
      type: 'string',
      group: 'source',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      series: 'seriesName',
      part: 'seriesPart',
      tier: 'tier',
    },
    prepare({ title, author, media, series, part, tier }) {
      const subtitle = [
        series && `${series} Part ${part}`,
        tier && `[${tier}]`,
        author && `by ${author}`,
      ]
        .filter(Boolean)
        .join(' — ')
      return { title, subtitle, media }
    },
  },
})
