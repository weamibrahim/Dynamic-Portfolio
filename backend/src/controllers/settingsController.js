const Settings = require('../models/Settings');
const cloudinary = require('../config/cloudinary');
const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

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
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Get the portfolio owner's contact email from settings
    const settings = await Settings.findOne().sort({ createdAt: 1 });
    const toEmail = settings?.contactEmail || process.env.EMAIL_USER;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email env vars not set — skipping email send.');
      return res.json({ message: 'Your message has been received!' });
    }

    const transporter = createTransporter();

    // Notify the portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#6366f1">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#555">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555">Subject</td><td style="padding:8px">${subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"${settings?.name || 'Portfolio'}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#6366f1">Thanks for reaching out, ${name}!</h2>
          <p>I've received your message and will get back to you within 24 hours.</p>
          <blockquote style="border-left:3px solid #6366f1;padding-left:16px;color:#666;margin:16px 0">
            ${message}
          </blockquote>
          <p style="color:#888;font-size:13px">— ${settings?.name || 'The Portfolio Team'}</p>
        </div>
      `,
    });

    res.json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};
