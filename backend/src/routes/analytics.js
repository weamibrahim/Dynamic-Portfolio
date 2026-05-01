const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

// GET /api/analytics/overview
router.get('/overview', protect, analyticsController.getOverview);

module.exports = router;
