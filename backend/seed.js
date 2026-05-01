/**
 * Seed script — creates a demo user + projects + settings.
 * Run: node seed.js
 * Safe to run multiple times (clears existing demo data first).
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Settings = require('./src/models/Settings');

const DEMO_EMAIL = 'demo@digitalcurator.dev';
const DEMO_PASSWORD = 'Demo1234!';

const PROJECTS = [
  {
    title: 'Lumina Brand Identity',
    description:
      'Full visual identity system for a wellness startup — logo, typography, colour palette, brand guidelines, and print collateral. Delivered in 3 weeks for a Series-A launch.',
    techStack: ['Branding', 'Figma', 'Illustration', 'Print'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1636207543865-acf3ad382295?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['branding', 'identity', 'design'],
  },
  {
    title: 'NovaPay Dashboard',
    description:
      'End-to-end product design and frontend implementation for a fintech SaaS dashboard. Real-time charts, multi-currency support, and accessibility-first components.',
    techStack: ['React', 'TypeScript', 'Figma', 'TailwindCSS'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['product', 'dashboard', 'fintech'],
  },
  {
    title: 'Arcane Photography Portfolio',
    description:
      'Bespoke website for a commercial photographer, with a full-screen gallery, lazy-loaded WebP images, and a custom CMS built on top of Sanity.io.',
    techStack: ['Next.js', 'Sanity', 'Photography', 'WebP'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['photography', 'cms', 'web'],
  },
  {
    title: 'GreenRoute Mobile App',
    description:
      'UX design and prototype for a sustainable travel companion app. Won a regional design competition. Covers user research, journey maps, wireframes, and a fully interactive Figma prototype.',
    techStack: ['UX Design', 'Figma', 'Prototyping', 'User Research'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['ux', 'mobile', 'sustainability'],
  },
  {
    title: 'Solstice E-Commerce',
    description:
      'Full-stack e-commerce platform for an artisan candle brand — Shopify-themed storefront, custom checkout flow, and a Node.js inventory microservice.',
    techStack: ['Shopify', 'Node.js', 'React', 'Stripe'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1603905548058-f0ab02d98d74?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['ecommerce', 'shopify', 'fullstack'],
  },
  {
    title: 'Atlas Motion Graphics',
    description:
      'Series of animated explainer videos and social media motion assets for a B2B SaaS company. After Effects + Lottie exports for seamless web integration.',
    techStack: ['After Effects', 'Lottie', 'Motion', 'Animation'],
    liveUrl: '',
    githubUrl: '',
    thumbnail:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2022,
    tags: ['motion', 'animation', 'video'],
  },
];

const DEMO_SETTINGS = {
  theme: 'light',
  accentColor: 'indigo',
  portfolioTitle: 'Digital Curator',
  role: 'Creative Director & Product Designer',
  heroHeadline: 'Where Strategy Meets Craft.',
  heroSubtitle:
    'A curated showcase of brand identities, digital products, and creative campaigns — built for companies, designers, and professionals who take their work seriously.',
  stackSectionTitle: 'Skills & Tools',
  sectionVisibility: { showStack: true, showContact: true },
  stack: [
    { name: 'Figma', icon: '🎨' },
    { name: 'React', icon: '⚛️' },
    { name: 'Branding', icon: '✦' },
    { name: 'Motion', icon: '🎬' },
    { name: 'Node.js', icon: '🟩' },
    { name: 'Photography', icon: '📷' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Strategy', icon: '🧭' },
  ],
  contactEmail: 'hello@digitalcurator.dev',
  contactLocation: 'New York • Remote Worldwide',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  publishedAt: new Date(),
};

async function seed() {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-curator'
  );
  console.log('✅ Connected to MongoDB');

  // Wipe previous demo data
  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    await Project.deleteMany({ owner: existing._id });
    await Settings.deleteOne({ owner: existing._id });
    await User.deleteOne({ _id: existing._id });
    console.log('🗑  Cleared previous demo data');
  }

  // Create user (password hashed by pre-save hook)
  const user = await User.create({
    name: 'Alex Rivera',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    bio: 'Creative director with 8 years crafting brands and digital products across four continents.',
    location: 'New York, NY',
    contactEmail: DEMO_EMAIL,
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      dribbble: 'https://dribbble.com',
    },
  });
  console.log(`👤 Demo user: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);

  // Create projects
  await Project.insertMany(PROJECTS.map((p) => ({ ...p, owner: user._id })));
  console.log(`📁 Seeded ${PROJECTS.length} projects`);

  // Create settings
  await Settings.create({ ...DEMO_SETTINGS, owner: user._id });
  console.log('⚙️  Seeded settings');

  console.log('\n🎉 Seed complete!');
  console.log(`   Login: ${DEMO_EMAIL}`);
  console.log(`   Pass:  ${DEMO_PASSWORD}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
