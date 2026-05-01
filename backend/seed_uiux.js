/**
 * Seed script for UI/UX Designer Portfolio.
 * Run: node seed_uiux.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Settings = require('./src/models/Settings');

const DEMO_EMAIL = 'designer@digitalcurator.dev';
const DEMO_PASSWORD = 'Designer1234!';

const PROJECTS = [
  {
    title: 'Aura Mobile Banking',
    description: 'A complete overhaul of the mobile banking experience, focusing on accessibility, biometric security flows, and intuitive wealth management visualizations.',
    techStack: ['Figma', 'Prototyping', 'User Research', 'Accessibility'],
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['mobile', 'fintech', 'ux'],
  },
  {
    title: 'Nova Design System',
    description: 'An atomic design system built for a multi-platform SaaS product. Includes documentation, component library, and brand guidelines for cross-functional teams.',
    techStack: ['Figma', 'Storybook', 'Design Systems', 'Documentation'],
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['system', 'product', 'ui'],
  },
  {
    title: 'Velo Logistics Dashboard',
    description: 'Enterprise-grade dashboard for real-time fleet tracking. Focus on data density, custom map visualizations, and reducing cognitive load for operators.',
    techStack: ['Figma', 'Data Visualization', 'User Testing', 'UX Strategy'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['enterprise', 'dashboard', 'b2b'],
  },
  {
    title: 'Nexus Smart Home App',
    description: 'IoT control center design with a heavy focus on dark mode aesthetics and haptic feedback patterns. Winner of the 2023 Smart Tech Design Award.',
    techStack: ['Figma', 'Haptics', 'Motion Design', 'User Flows'],
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['iot', 'mobile', 'darkmode'],
  },
  {
    title: 'EcoFlow E-commerce',
    description: 'High-conversion storefront for sustainable products. Features a 3D product customizer and a streamlined one-page checkout experience.',
    techStack: ['Figma', 'Three.js', 'E-commerce', 'A/B Testing'],
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['ecommerce', '3d', 'conversion'],
  },
  {
    title: 'Pathfinder Travel Companion',
    description: 'End-to-end UX research and design for a travel planning app. Includes user journey maps, high-fidelity prototypes, and usability testing reports.',
    techStack: ['User Research', 'Figma', 'Maze', 'Sketching'],
    thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2022,
    tags: ['travel', 'research', 'ux'],
  },
];

const DEMO_SETTINGS = {
  theme: 'dark',
  accentColor: 'rose',
  portfolioTitle: 'Alex Rivera — Product Designer',
  role: 'Senior UI/UX Designer',
  heroHeadline: 'Designing Digital Experiences that Matter.',
  heroSubtitle: 'I specialize in building accessible, user-centric products that solve complex problems through high-end design and research-driven strategy.',
  stackSectionTitle: 'My Toolset',
  sectionVisibility: { showStack: true, showContact: true },
  stack: [
    { name: 'Figma', icon: 'figma' },
    { name: 'Sketch', icon: 'sketch' },
    { name: 'Framer', icon: 'framer' },
    { name: 'Maze', icon: 'maze' },
    { name: 'Notion', icon: 'notion' },
    { name: 'GitHub', icon: 'github' },
  ],
  contactEmail: 'alex@riveradesign.com',
  contactLocation: 'San Francisco • Remote',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  publishedAt: new Date(),
};

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-curator';
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  // Wipe previous demo data
  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    await Project.deleteMany({ owner: existing._id });
    await Settings.deleteOne({ owner: existing._id });
    await User.deleteOne({ _id: existing._id });
    console.log('🗑  Cleared previous UI/UX demo data');
  }

  // Create user
  const user = await User.create({
    name: 'Alex Rivera',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    bio: 'Product designer with over 6 years of experience building scalable design systems and intuitive mobile experiences.',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    contactEmail: DEMO_EMAIL,
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      dribbble: 'https://dribbble.com',
    },
  });
  console.log(`👤 UI/UX User: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);

  // Create projects
  await Project.insertMany(PROJECTS.map((p) => ({ ...p, owner: user._id })));
  console.log(`📁 Seeded ${PROJECTS.length} UI/UX projects`);

  // Create settings
  await Settings.create({ ...DEMO_SETTINGS, owner: user._id });
  console.log('⚙️  Seeded UI/UX settings');

  console.log('\n🎉 UI/UX Designer Seed complete!');
  console.log(`   Login: ${DEMO_EMAIL}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
