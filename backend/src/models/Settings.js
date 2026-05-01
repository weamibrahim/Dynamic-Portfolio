const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    accentColor: { type: String, enum: ['indigo', 'rose', 'emerald', 'amber'], default: 'indigo' },
    sectionVisibility: {
      showStack: { type: Boolean, default: true },
      showContact: { type: Boolean, default: false },
    },
    portfolioTitle: { type: String, default: 'My Portfolio' },
    role: { type: String, default: '' },
    heroHeadline: { type: String, default: 'Crafting Work That Speaks.' },
    heroSubtitle: { type: String, default: '' },
    heroImage: { type: String, default: null },
    stackSectionTitle: { type: String, default: 'Skills & Tools' },
    stack: [
      {
        name: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    contactEmail: { type: String, default: 'hello@digitalcurator.dev' },
    contactLocation: { type: String, default: 'San Francisco, CA • Remote' },
    githubUrl: { type: String, default: '#' },
    linkedinUrl: { type: String, default: '#' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
