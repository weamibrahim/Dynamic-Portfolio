const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    techStack: [{ type: String, trim: true }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    screenshots: [{ type: String }],
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    featured: { type: Boolean, default: false },
   
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

// Index for full-text search
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Project', projectSchema);
