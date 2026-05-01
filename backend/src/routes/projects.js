const express = require('express');
const router = express.Router();
const { protect, optionalProtect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const projectController = require('../controllers/projectController');

// GET /api/projects (Publicly accessible, returns published projects if not authenticated)
router.get('/', optionalProtect, projectController.getProjects);

// GET /api/projects/stats
router.get('/stats', protect, projectController.getProjectStats);

// GET /api/projects/:id (Publicly accessible, returns published project if not authenticated)
router.get('/:id', optionalProtect, projectController.getProjectById);

// POST /api/projects
router.post(
  '/',
  protect,
  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'screenshots', maxCount: 10 }]),
  projectController.createProjectValidators,
  validate,
  projectController.createProject
);

// PUT /api/projects/:id
router.put(
  '/:id',
  protect,
  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'screenshots', maxCount: 10 }]),
  projectController.updateProject
);

// DELETE /api/projects/:id
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
