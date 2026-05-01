const Project = require('../models/Project');
const Settings = require('../models/Settings');

exports.getOverview = async (req, res) => {
  try {
    const [projects, settings] = await Promise.all([
      Project.find({ owner: req.user._id }),
      Settings.findOne({ owner: req.user._id })
    ]);

    const totalViews = projects.reduce((sum, p) => sum + p.views, 0);
    const published = projects.filter((p) => p.status === 'published').length;
    const drafts = projects.filter((p) => p.status === 'draft').length;
    const stackCount = settings?.stack?.length || 0;

    res.json({
      totalProjects: projects.length,
      totalViews,
      published,
      drafts,
      stackCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
