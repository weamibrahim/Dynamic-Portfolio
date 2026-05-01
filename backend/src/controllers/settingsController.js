const Settings = require('../models/Settings');
const cloudinary = require('../config/cloudinary');

function getPublicId(url) {
  if (!url || !url.includes('cloudinary.com')) return null;
  const parts = url.split('/');
  const uploadIdx = parts.indexOf('upload');
  if (uploadIdx === -1) return null;
  const afterUpload = parts.slice(uploadIdx + 1);
  const withoutVersion = afterUpload[0]?.startsWith('v') && /^v\d+$/.test(afterUpload[0])
    ? afterUpload.slice(1)
    : afterUpload;
  return withoutVersion.join('/').replace(/\.[^.]+$/, '');
}

exports.getSettings = async (req, res) => {
  try {
    let settings;
    if (req.user) {
      settings = await Settings.findOne({ owner: req.user._id });
      if (!settings) settings = await Settings.create({ owner: req.user._id });
    } else {
      settings = await Settings.findOne().sort({ createdAt: 1 });
    }
    if (!settings) return res.status(404).json({ message: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne().sort({ createdAt: 1 });
    if (!settings) return res.status(404).json({ message: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (typeof updateData.sectionVisibility === 'string') {
      try { updateData.sectionVisibility = JSON.parse(updateData.sectionVisibility); }
      catch { delete updateData.sectionVisibility; }
    }
    if (typeof updateData.stack === 'string') {
      try { updateData.stack = JSON.parse(updateData.stack); }
      catch { delete updateData.stack; }
    }

    if (req.file) {
      // Delete old hero image from Cloudinary if it exists
      const existing = await Settings.findOne({ owner: req.user._id });
      if (existing?.heroImage) {
        const oldId = getPublicId(existing.heroImage);
        if (oldId) await cloudinary.uploader.destroy(oldId).catch(() => {});
      }
      // Cloudinary returns full URL in req.file.path
      updateData.heroImage = req.file.path;
    }

    const settings = await Settings.findOneAndUpdate(
      { owner: req.user._id },
      updateData,
      { new: true, upsert: true }
    );
    res.json({ message: 'Settings saved successfully!', settings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.publishPortfolio = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { owner: req.user._id },
      { publishedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Portfolio published!', settings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    // TODO: wire up Nodemailer or SendGrid for production
    res.json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
