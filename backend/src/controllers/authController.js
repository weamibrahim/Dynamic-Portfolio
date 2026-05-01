const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const User = require('../models/User');
const Settings = require('../models/Settings');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("register request received");
  console.log(req.body);
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    console.log("user created: ", user);
    await Settings.create({ owner: user._id });

    res.cookie('dc_token', signToken(user._id), COOKIE_OPTIONS);
    res.status(201).json({ user, message: "create account successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.cookie('dc_token', signToken(user._id), COOKIE_OPTIONS);
    res.json({ user, message: "login success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = (req, res) => {
  res.json(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie('dc_token', { ...COOKIE_OPTIONS, maxAge: 0 });
  res.json({ message: 'Logged out' });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, bio, location, contactEmail, socialLinks, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }
    if (password) user.password = password;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (contactEmail !== undefined) user.contactEmail = contactEmail;
    if (socialLinks) user.socialLinks = socialLinks;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
];

exports.loginValidators = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];
