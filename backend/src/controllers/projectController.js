const { body } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

// Extract Cloudinary public_id from a secure URL
function getPublicId(url) {
  if (!url || !url.includes('cloudinary.com')) return null;
  // URL format: https://res.cloudinary.com/<cloud>/image/upload/v<ver>/<folder>/<public_id>.<ext>
  const parts = url.split('/');
  const uploadIdx = parts.indexOf('upload');
  if (uploadIdx === -1) return null;
  // Skip version segment (v12345) if present
  const afterUpload = parts.slice(uploadIdx + 1);
  const withoutVersion = afterUpload[0]?.startsWith('v') && /^v\d+$/.test(afterUpload[0])
    ? afterUpload.slice(1)
    : afterUpload;
  const withExt = withoutVersion.join('/');
  return withExt.replace(/\.[^.]+$/, ''); // remove extension
}

async function deleteFromCloudinary(urls) {
  const ids = (Array.isArray(urls) ? urls : [urls])
    .map(getPublicId)
    .filter(Boolean);
  await Promise.allSettled(ids.map(id => cloudinary.uploader.destroy(id)));
}

exports.getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const filter = {};

    if (req.user) {
      filter.owner = req.user._id;
      if (status) filter.status = status;
    } else {
      const owner = await User.findOne().sort({ createdAt: 1 }).select('_id');
      filter.owner = owner?._id;
      filter.status = 'published';
    }

    if (search) filter.$text = { $search: search };

    const total    = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ projects, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectStats = async (req, res) => {
  try {
    const [total, published, drafts] = await Promise.all([
      Project.countDocuments({ owner: req.user._id }),
      Project.countDocuments({ owner: req.user._id, status: 'published' }),
      Project.countDocuments({ owner: req.user._id, status: 'draft' }),
    ]);
    res.json({ total, published, drafts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user) {
      filter.owner = req.user._id;
    } else {
      const owner = await User.findOne().sort({ createdAt: 1 }).select('_id');
      filter.owner = owner?._id;
      filter.status = 'published';
    }
    const project = await Project.findOne(filter);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const data = { ...req.body, owner: req.user._id };
    if (typeof data.techStack === 'string') data.techStack = JSON.parse(data.techStack);

    // Cloudinary returns full secure_url in file.path
    if (req.files?.thumbnail)
      data.thumbnail = req.files.thumbnail[0].path;
    if (req.files?.screenshots)
      data.screenshots = req.files.screenshots.map(f => f.path);

    const project = await Project.create(data);
    res.status(201).json({ message: 'Project created successfully!', project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const data = { ...req.body };
    if (typeof data.techStack === 'string') data.techStack = JSON.parse(data.techStack);

    if (req.files?.thumbnail) {
      // Delete old thumbnail from Cloudinary
      if (project.thumbnail) await deleteFromCloudinary(project.thumbnail);
      data.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files?.screenshots) {
      if (project.screenshots?.length) await deleteFromCloudinary(project.screenshots);
      data.screenshots = req.files.screenshots.map(f => f.path);
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ message: 'Project updated successfully!', project: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Clean up images from Cloudinary
    const toDelete = [project.thumbnail, ...(project.screenshots || [])].filter(Boolean);
    if (toDelete.length) await deleteFromCloudinary(toDelete);

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProjectValidators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];
