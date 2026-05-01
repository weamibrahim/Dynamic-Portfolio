require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoutes = require('./src/routes/auth');
const projectRoutes = require('./src/routes/projects');
const analyticsRoutes = require('./src/routes/analytics');
const settingsRoutes = require('./src/routes/settings');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Lazy MongoDB connection for serverless environments
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-curator');
  isConnected = true;
  console.log('✅ Connected to MongoDB');
};

// Serverless handler wraps the express app with a DB connection
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

// Local development: start the HTTP server directly
if (process.env.NODE_ENV !== 'production') {
  connectDB()
    .then(() => {
      app.listen(process.env.PORT || 5000, () =>
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
      );
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = handler;
