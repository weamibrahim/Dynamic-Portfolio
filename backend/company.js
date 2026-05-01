/**
 * Seed script — Sneakers Brand Demo (UrbanStride)
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Project = require('./src/models/Project');
const Settings = require('./src/models/Settings');

const DEMO_EMAIL = 'demo@urbanstride.com';
const DEMO_PASSWORD = 'Demo1234!';

const PROJECTS = [
  {
    title: 'Urban Classic White',
    description:
      'Minimal white leather sneakers designed for everyday wear. Premium materials with breathable lining and durable rubber sole.',
    techStack: ['Leather', 'Handcrafted', 'Comfort Fit'],
    thumbnail:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['white', 'classic', 'minimal'],
  },
  {
    title: 'Street Runner Black',
    description:
      'All-black street sneakers built for comfort and style. Lightweight design with shock-absorbing sole.',
    techStack: ['Lightweight', 'Shock Absorption', 'Breathable'],
    thumbnail:
      'https://images.unsplash.com/photo-1528701800489-20be3c2ea1e8?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2024,
    tags: ['black', 'streetwear', 'sport'],
  },
  {
    title: 'Retro Vibe 90s',
    description:
      'Inspired by 90s sneaker culture, combining bold colors with modern comfort.',
    techStack: ['Retro Design', 'Cushioning', 'Vintage'],
    thumbnail:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['retro', 'colorful'],
  },
  {
    title: 'Urban Flex Knit',
    description:
      'Flexible knit sneakers designed for maximum movement and all-day wear.',
    techStack: ['Knit Fabric', 'Flexible', 'Comfort'],
    thumbnail:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80',
    status: 'published',
    featured: true,
    year: 2023,
    tags: ['knit', 'modern'],
  },
];

const DEMO_SETTINGS = {
  theme: 'dark',
  accentColor: 'indigo',
  portfolioTitle: 'UrbanStride',
  role: 'Men’s Sneakers Brand',
  heroHeadline: 'Step Into Style.',
  heroSubtitle:
    'Discover premium sneakers crafted for modern men — combining comfort, durability, and bold street style.',
  stackSectionTitle: 'Our Features',
  sectionVisibility: { showStack: true, showContact: true },
  stack: [
    { name: 'Premium Materials', icon: '👟' },
    { name: 'Comfort Fit', icon: '🦶' },
    { name: 'Durability', icon: '🛡️' },
    { name: 'Street Style', icon: '🔥' },
    { name: 'Lightweight', icon: '⚡' },
  ],
  contactEmail: 'hello@urbanstride.com',
  contactLocation: 'Cairo • Worldwide Shipping',
  githubUrl: '',
  linkedinUrl: '',
  publishedAt: new Date(),
};

async function seed() {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/urbanstride'
  );
  console.log('✅ Connected to MongoDB');

  // delete old data
  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    await Project.deleteMany({ owner: existing._id });
    await Settings.deleteOne({ owner: existing._id });
    await User.deleteOne({ _id: existing._id });
    console.log('🗑 Cleared old data');
  }

  // create brand user
  const user = await User.create({
    name: 'UrbanStride',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    bio: 'Premium men’s sneakers brand focused on style, comfort, and performance.',
    location: 'Cairo, Egypt',
    contactEmail: DEMO_EMAIL,
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  });

  console.log(`👤 ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);

  // insert products
  await Project.insertMany(PROJECTS.map(p => ({ ...p, owner: user._id })));
  console.log('📦 Products seeded');

  // settings
  await Settings.create({ ...DEMO_SETTINGS, owner: user._id });
  console.log('⚙️ Settings seeded');

  console.log('🎉 Done!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});