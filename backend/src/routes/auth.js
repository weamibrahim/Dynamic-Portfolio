const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post(
  '/register',
  authController.registerValidators,
  validate,
  authController.register
);

// POST /api/auth/login
router.post(
  '/login',
  authController.loginValidators,
  validate, 
  authController.login
);

// GET /api/auth/me
router.get('/me', protect, authController.getMe);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// PUT /api/auth/profile
router.put('/profile', protect, authController.updateProfile);

module.exports = router;
