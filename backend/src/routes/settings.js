const express = require('express');
const router = express.Router();
const { protect, optionalProtect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const settingsController = require('../controllers/settingsController');

// GET /api/settings (Publicly accessible, returns published settings if not authenticated)
router.get('/', optionalProtect, settingsController.getSettings);

// PUT /api/settings
router.put('/', protect, upload.single('heroImage'), settingsController.updateSettings);

// POST /api/settings/publish
router.post('/publish', protect, settingsController.publishPortfolio);

// POST /api/settings/contact (Public)
router.post('/contact', settingsController.handleContact);

module.exports = router;
