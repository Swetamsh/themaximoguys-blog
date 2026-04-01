#!/usr/bin/env node
/**
 * Seed script — populates Sanity with current hardcoded content from Next.js marketing pages.
 * Run: node seed.mjs
 */

const PROJECT_ID = 'ajindfal'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN || 'skgL9ZL4OAaNwkSt0yFbIVmuXqL4g9KLA3AkrtoCgAcmBX2SrhqzHQovhZLS08Jh653YtVLzGFn5CABF58SvDMYtWL8hMCvO6JprgYj8yFI7hLptC48znCbe1LnFXSc7ZTgDFjfhgIOnfVOHfpJrpPWARrlfOZBMN1DkBA6R40FC2gUBQiTi'

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

async function createOrReplace(doc) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [{ createOrReplace: doc }],
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error(`FAIL: ${doc._id || doc._type}`, JSON.stringify(data, null, 2))
  } else {
    console.log(`OK: ${doc._type} — ${doc._id || doc.title || doc.value || ''}`)
  }
  return data
}

async function seed() {
  console.log('Seeding Sanity content...\n')

  // ═══ SITE SETTINGS ═══
  await createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'TheMaximoGuys',
    companyEmail: 'hello@themaximoguys.ai',
    companyLocation: 'Houston, TX',
    companyHours: 'Mon-Fri 9am-6pm CT',
    socialLinks: [
      { _key: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/company/themaximoguys' },
      { _key: 'gh', platform: 'GitHub', url: 'https://github.com/themaximoguys' },
    ],
    trustIndicators: [
      { _key: 't1', text: 'No commitment required' },
      { _key: 't2', text: 'AI readiness scorecard included' },
      { _key: 't3', text: 'Actionable AI roadmap' },
    ],
  })

  // ═══ HOME PAGE ═══
  await createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroHeadline: 'Revolutionize IBM Maximo',
    heroHighlightText: 'with Agentic AI',
    heroDescription: 'Empowering Maximo teams with AI-driven agents that simplify customizations and implementations, enhance compliance, adapt across industries, and deliver always-updated insights powered by cross-industry best practices.',
    heroPrimaryCTA: { label: 'Book your AI Strategy Session', href: '/contact' },
    heroSecondaryCTAs: [
      { _key: 'c1', label: 'Newsletter Sign Up', href: '/newsletter', icon: 'Mail' },
      { _key: 'c2', label: 'Try Our AI Assist', href: '/products/ai-assistant', icon: 'BrainCircuit' },
      { _key: 'c3', label: 'Read Our Docs', href: '/blog', icon: 'FileText' },
    ],
    heroCheckItems: [
      'Diversity of Maximo implementations',
      'Over 50+ industry-specific configurations & best practices',
    ],
    heroCapabilityTags: [
      'Workflow Automation', 'Compliance Tracking', 'Inventory Optimization',
      'Predictive Analytics', 'Mobile Solutions', 'Integration APIs',
      'Custom Reports', '...and more!',
    ],
    heroAgentFeed: [
      { _key: 'f1', label: 'Failure predicted', detail: 'Pump-7A bearing — 47 days', icon: 'AlertTriangle' },
      { _key: 'f2', label: 'Work order created', detail: 'WO-28491 auto-generated', icon: 'Wrench' },
      { _key: 'f3', label: 'Compliance check', detail: 'GxP audit passed ✓', icon: 'Shield' },
      { _key: 'f4', label: 'ROI milestone', detail: '$1.2M saved this quarter', icon: 'TrendingUp' },
    ],
    heroMiniStats: [
      { _key: 's1', value: '2,847', label: 'Assets' },
      { _key: 's2', value: '12', label: 'Agents' },
      { _key: 's3', value: '99.8%', label: 'Uptime' },
    ],
    metricsBadge: 'Proven Results',
    metricsHeading: 'AI Agent Results That Speak for Themselves',
    metricsDescription: 'Real outcomes from our agentic AI deployments on IBM Maximo.',
    servicesBadge: 'AI-Powered Services',
    servicesHeading: 'Agentic AI for Asset Management',
    servicesDescription: 'End-to-end AI agent services from data readiness to autonomous maintenance operations.',
    testimonialsBadge: 'AI Agent Success Stories',
    testimonialsHeading: 'What Our Clients Say',
    testimonialsDescription: 'Real AI agent results from reliability professionals like you.',
    ctaBadge: 'Free AI Readiness Assessment',
    ctaTitle: 'Ready to Deploy AI Agents for Your Assets?',
    ctaDescription: 'Book a free AI readiness assessment with our Maximo experts. Discover how agentic AI can predict failures, automate work orders, and transform your maintenance operations.',
    ctaPrimaryCTA: { label: 'Book AI Assessment', href: '/contact' },
    ctaSecondaryCTA: { label: 'See AI Agents in Action', href: '/case-studies' },
    ctaTrustIndicators: ['No commitment required', 'AI readiness scorecard included', 'Actionable AI roadmap'],
  })

  // ═══ ABOUT PAGE ═══
  await createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroTitle: 'About TheMaximoGuys',
    heroDescription: 'Born on the plant floor. Built for the enterprise.',
    values: [
      { _key: 'v1', title: 'Pragmatism', subtitle: 'Real World', description: 'Solutions that work in the real world, not just on paper. We understand the difference between theoretical configuration and practical execution on the plant floor.', icon: 'Target' },
      { _key: 'v2', title: 'Speed', subtitle: 'Weeks, Not Months', description: 'We believe in rapid iteration and value delivery. You\'ll see meaningful improvements within weeks, not months.', icon: 'Zap' },
      { _key: 'v3', title: 'Clarity', subtitle: 'Full Visibility', description: 'We demystify complex EAM data and processes. You\'ll understand your systems and be empowered to make informed decisions.', icon: 'Eye' },
    ],
    stats: [
      { _key: 's1', value: '60+', label: 'Implementations', icon: 'CheckCircle2' },
      { _key: 's2', value: '15+', label: 'Years Experience', icon: 'Award' },
      { _key: 's3', value: '50+', label: 'Certified Experts', icon: 'Users' },
      { _key: 's4', value: '10+', label: 'Countries Served', icon: 'Globe' },
      { _key: 's5', value: '7', label: 'AI Capabilities', icon: 'Zap' },
      { _key: 's6', value: '24/7', label: 'Global Support', icon: 'Target' },
    ],
    timeline: [
      { _key: 't1', year: 'The Origin', title: 'The Origin', description: 'Born on the plant floor as IBM Maximo specialists — operators who understood the real problems' },
      { _key: 't2', year: 'The Expertise', title: 'The Expertise', description: 'Became deep IBM technology experts, mastering every layer of the Maximo stack' },
      { _key: 't3', year: 'The Expansion', title: 'The Expansion', description: 'Grew into a multi-industry EAM consulting force across manufacturing, oil & gas, utilities, and beyond' },
      { _key: 't4', year: 'The Scale', title: 'The Scale', description: 'Launched 24/7 global support, serving teams across 10+ countries' },
      { _key: 't5', year: 'The Platform', title: 'The Platform', description: 'Built a developer-first platform so every team can access world-class EAM tools and AI' },
      { _key: 't6', year: 'Agentic AI', title: 'Agentic AI', description: 'Pioneering autonomous AI agents that predict failures, generate work orders, and optimize assets without human intervention' },
    ],
    ctaTitle: 'Ready to work with us?',
    ctaDescription: 'Join 60+ organizations that trust us for their IBM Maximo and EAM implementations.',
    ctaPrimaryCTA: { label: 'Book Free Assessment', href: '/contact' },
  })

  // ═══ CONTACT PAGE ═══
  await createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    heroTitle: 'Get in Touch',
    heroDescription: 'Ready to optimize your asset management? Book a free 30-minute assessment with our EAM specialists.',
    sidebarTitle: "Let's Talk EAM",
    sidebarDescription: "Whether you're planning a new implementation, struggling with adoption, or looking to optimize an existing system, we're here to help.",
    expectations: [
      '30-minute video call with an EAM specialist',
      'Discussion of your current challenges and goals',
      'Initial recommendations and next steps',
      'No obligation, no sales pressure',
    ],
    contactEmail: 'hello@themaximoguys.ai',
    contactLocation: 'Houston, TX',
    contactHours: 'Mon-Fri 9am-6pm CT',
    ctaTitle: 'Ready to Transform Your EAM?',
    ctaDescription: 'Join 500+ organizations that trust us for their IBM Maximo and EAM implementations.',
  })

  // ═══ TESTIMONIALS ═══
  const testimonials = [
    { _id: 'testimonial-sarah-chen', authorName: 'Sarah Chen', authorRole: 'Reliability Manager', authorCompany: 'Pacific Manufacturing', quote: 'The AI agents deployed by themaximoguys transformed our maintenance. We went from reactive firefighting to predicting failures 6 months ahead — PM compliance jumped from 60% to 95%.', rating: 5, featured: true, sortOrder: 1 },
    { _id: 'testimonial-michael-torres', authorName: 'Michael Torres', authorRole: 'VP of Operations', authorCompany: 'Gulf Energy Partners', quote: "Their agentic AI approach captured our retiring engineers' tribal knowledge into AI agents. Now our junior techs perform like 20-year veterans with AI-guided diagnostics.", rating: 5, featured: true, sortOrder: 2 },
    { _id: 'testimonial-jennifer-walsh', authorName: 'Jennifer Walsh', authorRole: 'Director of Asset Management', authorCompany: 'Northern Utilities', quote: 'The Maximo AI agents reduced our unplanned downtime by 50% in the first year. The ROI was evident within the first quarter — best investment in our maintenance program.', rating: 5, featured: true, sortOrder: 3 },
  ]
  for (const t of testimonials) {
    await createOrReplace({ ...t, _type: 'testimonial' })
  }

  // ═══ CASE STUDIES ═══
  const caseStudies = [
    { _id: 'case-pacific-manufacturing', title: 'Pacific Manufacturing: Maximo Implementation', slug: { _type: 'slug', current: 'manufacturing-maximo-implementation' }, client: 'Pacific Manufacturing', excerpt: 'How we helped a multi-site manufacturer achieve 95% PM compliance and reduce unplanned downtime by 40% within six months.', metrics: [{ _key: 'm1', label: 'Uptime', value: '99.2%' }, { _key: 'm2', label: 'Compliance', value: '95%' }, { _key: 'm3', label: 'Savings', value: '$2.1M' }], tags: ['Manufacturing'], featured: true },
    { _id: 'case-gulf-energy', title: 'Gulf Energy: SAP PM Integration', slug: { _type: 'slug', current: 'oil-gas-sap-integration' }, client: 'Gulf Energy', excerpt: 'Seamless integration between SAP PM and field operations, enabling real-time work order tracking and safety compliance.', metrics: [{ _key: 'm1', label: 'Uptime', value: '99.5%' }, { _key: 'm2', label: 'Compliance', value: '98%' }, { _key: 'm3', label: 'Savings', value: '$3.5M' }], tags: ['Oil & Gas'], featured: true },
    { _id: 'case-northern-utilities', title: 'Northern Utilities: Predictive Maintenance', slug: { _type: 'slug', current: 'utilities-predictive-maintenance' }, client: 'Northern Utilities', excerpt: 'Implementing IoT sensors and predictive analytics to transform from reactive to proactive maintenance.', metrics: [{ _key: 'm1', label: 'Uptime', value: '99.8%' }, { _key: 'm2', label: 'Compliance', value: '97%' }, { _key: 'm3', label: 'Savings', value: '$1.8M' }], tags: ['Utilities'], featured: true },
    { _id: 'case-medpharm', title: 'MedPharm: GxP Compliance System', slug: { _type: 'slug', current: 'pharma-gxp-compliance' }, client: 'MedPharm', excerpt: 'Building a validated maintenance system that meets FDA 21 CFR Part 11 requirements for pharmaceutical manufacturing.', metrics: [{ _key: 'm1', label: 'Uptime', value: '99.9%' }, { _key: 'm2', label: 'Compliance', value: '100%' }, { _key: 'm3', label: 'Savings', value: '$800K' }], tags: ['Pharmaceuticals'] },
    { _id: 'case-metro-properties', title: 'Metro Properties: Portfolio Optimization', slug: { _type: 'slug', current: 'facilities-portfolio-optimization' }, client: 'Metro Properties', excerpt: 'Centralizing asset management across 50+ commercial properties with standardized processes and reporting.', metrics: [{ _key: 'm1', label: 'Uptime', value: '98.5%' }, { _key: 'm2', label: 'Compliance', value: '92%' }, { _key: 'm3', label: 'Savings', value: '$1.2M' }], tags: ['Facilities'] },
    { _id: 'case-transco-logistics', title: 'TransCo Logistics: Fleet Analytics', slug: { _type: 'slug', current: 'fleet-predictive-analytics' }, client: 'TransCo Logistics', excerpt: 'Reducing fleet downtime and maintenance costs through data-driven decision making and predictive scheduling.', metrics: [{ _key: 'm1', label: 'Uptime', value: '97.8%' }, { _key: 'm2', label: 'Compliance', value: '94%' }, { _key: 'm3', label: 'Savings', value: '$950K' }], tags: ['Transportation'] },
  ]
  for (const c of caseStudies) {
    await createOrReplace({ ...c, _type: 'caseStudy' })
  }

  // ═══ METRICS ═══
  const metrics = [
    { _id: 'metric-prediction-accuracy', value: '85%+', label: 'Prediction Accuracy', description: 'AI failure prediction rate', icon: 'TrendingUp', category: 'performance', sortOrder: 1 },
    { _id: 'metric-downtime-reduction', value: '50%', label: 'Downtime Reduction', description: 'Average with AI agents deployed', icon: 'Target', category: 'performance', sortOrder: 2 },
    { _id: 'metric-work-orders', value: '10x', label: 'Work Orders Automated', description: 'AI agent throughput increase', icon: 'DollarSign', category: 'performance', sortOrder: 3 },
    { _id: 'metric-agents-deployed', value: '500+', label: 'AI Agents Deployed', description: 'Across client operations', icon: 'Award', category: 'capability', sortOrder: 4 },
    { _id: 'metric-client-savings', value: '$2.8B', label: 'Client Downtime Savings', description: 'Total savings across all clients', icon: 'DollarSign', category: 'roi', sortOrder: 5 },
    { _id: 'metric-payback', value: '6 mo', label: 'Avg Payback Period', description: 'Average time to ROI', icon: 'Clock', category: 'roi', sortOrder: 6 },
  ]
  for (const m of metrics) {
    await createOrReplace({ ...m, _type: 'metric', context: 'standalone' })
  }

  // ═══ SERVICES ═══
  const services = [
    { _id: 'service-ai-readiness', title: 'AI Readiness & Data Foundation', description: 'Audit Maximo data quality, sensor coverage, and integration readiness for AI agent deployment.', icon: 'Database', sortOrder: 1 },
    { _id: 'service-migration', title: 'Maximo 9.x Migration & AI Enablement', description: 'Upgrade to MAS 9.1 with full AI capabilities — from planning to go-live.', icon: 'Rocket', sortOrder: 2 },
    { _id: 'service-agentic-ai', title: 'Agentic AI Deployment', description: 'Deploy domain-specific AI agents for predictive maintenance, work order automation, and compliance.', icon: 'Brain', sortOrder: 3 },
    { _id: 'service-digital-twin', title: 'Digital Twin Development', description: 'Build AI-augmented digital twins for real-time asset simulation and optimization.', icon: 'Layers', sortOrder: 4 },
    { _id: 'service-iot', title: 'IoT & Sensor Integration', description: 'Connect industrial IoT sensors to Maximo for real-time condition monitoring and data collection.', icon: 'Radio', sortOrder: 5 },
    { _id: 'service-managed', title: 'Managed AI Services', description: 'Continuous agent optimization, model retraining, and 24/7 monitoring of AI performance.', icon: 'Settings', sortOrder: 6 },
  ]
  for (const s of services) {
    await createOrReplace({ ...s, _type: 'service' })
  }

  // ═══ SKILLS ═══
  const skills = [
    { _id: 'skill-maximo', title: 'IBM Maximo', description: 'Expert configuration, customization, and optimization of IBM Maximo Application Suite.', icon: 'Server', sortOrder: 1 },
    { _id: 'skill-agentic-ai', title: 'Agentic AI', description: 'Autonomous AI agents for predictive maintenance, work order automation, and decision support.', icon: 'Brain', sortOrder: 2 },
    { _id: 'skill-ml', title: 'AI & Machine Learning', description: 'Predictive maintenance models, anomaly detection, and natural language processing.', icon: 'Cpu', sortOrder: 3 },
    { _id: 'skill-analytics', title: 'Power BI & Analytics', description: 'Custom dashboards, KPI tracking, and data-driven decision making.', icon: 'BarChart', sortOrder: 4 },
    { _id: 'skill-sql', title: 'SQL & Data Engineering', description: 'Data modeling, ETL pipelines, and database optimization.', icon: 'Database', sortOrder: 5 },
    { _id: 'skill-iot', title: 'IoT & SCADA', description: 'Sensor integration, real-time monitoring, and industrial control systems.', icon: 'Radio', sortOrder: 6 },
    { _id: 'skill-integrations', title: 'System Integrations', description: 'API development, middleware, and enterprise system connectivity.', icon: 'GitBranch', sortOrder: 7 },
    { _id: 'skill-rcm', title: 'RCM & Reliability', description: 'Failure mode analysis, reliability-centered maintenance, and asset strategy.', icon: 'Shield', sortOrder: 8 },
  ]
  for (const s of skills) {
    await createOrReplace({ ...s, _type: 'skill' })
  }

  // ═══ CERTIFICATIONS ═══
  const certifications = [
    { _id: 'cert-mas91', title: 'IBM Maximo Application Suite 9.1 Certified', issuer: 'IBM', sortOrder: 1 },
    { _id: 'cert-watsonx', title: 'IBM watsonx AI Platform Certified', issuer: 'IBM', sortOrder: 2 },
    { _id: 'cert-health-predict', title: 'IBM Maximo Health & Predict Specialist', issuer: 'IBM', sortOrder: 3 },
    { _id: 'cert-assistant', title: 'IBM Maximo Assistant Deployment Professional', issuer: 'IBM', sortOrder: 4 },
    { _id: 'cert-granite', title: 'IBM Granite LLM Integration Certified', issuer: 'IBM', sortOrder: 5 },
    { _id: 'cert-cloudpak', title: 'IBM Cloud Pak for Data Certified', issuer: 'IBM', sortOrder: 6 },
  ]
  for (const c of certifications) {
    await createOrReplace({ ...c, _type: 'certification' })
  }

  // ═══ TECHNOLOGIES ═══
  const technologies = [
    { _id: 'tech-maximo', title: 'IBM Maximo', category: 'EAM Platform', description: 'MAS 9.1 with full AI capabilities', sortOrder: 1 },
    { _id: 'tech-watsonx', title: 'IBM watsonx', category: 'AI Platform', description: 'Enterprise AI foundation models', sortOrder: 2 },
    { _id: 'tech-granite', title: 'Granite LLM', category: 'Language Model', description: "IBM's domain-specific foundation model", sortOrder: 3 },
    { _id: 'tech-assistant', title: 'Maximo Assistant', category: 'AI Agent', description: 'Conversational AI for technicians', sortOrder: 4 },
    { _id: 'tech-digital-twin', title: 'Digital Twin', category: 'Simulation', description: 'AI-augmented asset digital twins', sortOrder: 5 },
    { _id: 'tech-azure-iot', title: 'Azure IoT', category: 'IoT & Sensors', description: 'Connected device integration', sortOrder: 6 },
    { _id: 'tech-scada', title: 'SCADA Systems', category: 'Industrial Control', description: 'Supervisory control connectivity', sortOrder: 7 },
    { _id: 'tech-ml', title: 'AI/ML Models', category: 'Predictive', description: 'Custom predictive maintenance models', sortOrder: 8 },
  ]
  for (const t of technologies) {
    await createOrReplace({ ...t, _type: 'technology' })
  }

  // ═══ PROCESS STEPS ═══
  const processSteps = [
    { _id: 'step-1-audit', stepNumber: 1, title: 'AI Readiness Audit', description: 'Assess data quality, sensor coverage, and Maximo configuration for AI deployment.', details: ['Data quality scoring', 'Sensor gap analysis', 'Maximo version assessment'], duration: '2-4 weeks', icon: 'Search', sortOrder: 1 },
    { _id: 'step-2-design', stepNumber: 2, title: 'Agent Architecture Design', description: 'Design domain-specific AI agents tailored to your asset types and failure modes.', details: ['Agent blueprint', 'Integration design', 'KPI definition'], duration: '4-6 weeks', icon: 'PenTool', sortOrder: 2 },
    { _id: 'step-3-deploy', stepNumber: 3, title: 'Deploy & Train Agents', description: 'Configure AI agents, integrate with Maximo, and train on your historical data.', details: ['Agent configuration', 'Maximo integration', 'Data training'], duration: '2-4 months', icon: 'Rocket', sortOrder: 3 },
    { _id: 'step-4-learn', stepNumber: 4, title: 'Continuous Learning', description: 'Agents improve over time with new data, expanding coverage and increasing accuracy.', details: ['Model retraining', 'Coverage expansion', 'Performance monitoring'], duration: 'Ongoing', icon: 'RefreshCw', sortOrder: 4 },
  ]
  for (const p of processSteps) {
    await createOrReplace({ ...p, _type: 'processStep' })
  }

  console.log('\n✅ Seeding complete!')
}

seed().catch(console.error)
