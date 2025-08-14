// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './lib/db.js';
import Project from './lib/projectModel.js';

dotenv.config();

const app = express();

// CORS: allow env override, otherwise localhost:3000 for local dev
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Simple request logger (only method + url)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Public root and health routes (must be before any auth middleware)
app.get('/', (_req, res) => res.send('<h1>Server is running ✅</h1>'));
app.get('/healthz', (_req, res) => res.status(200).json({ ok: true }));

// API Routes
app.get('/api/semesters', async (req, res, next) => {
  try {
    const semesters = await Project.aggregate([
      { $group: { _id: '$semester' } },
      { $sort: { _id: -1 } }
    ]);
    res.json(semesters.map(s => s._id));
  } catch (err) {
    next(err);
  }
});

app.get('/api/projects/:semester', async (req, res, next) => {
  try {
    const { semester } = req.params;
    const projects = await Project.find({ semester }).lean();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

app.get('/api/project/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project id' });
    }
    const project = await Project.findById(id).lean();
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// 404 for unknown routes (after all route handlers)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// central error handler
app.use((err, req, res, _next) => {
  console.error('Server error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

connectMongo()
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server due to connection error:', err.message || err);
    process.exit(1);
  });

// graceful shutdown
const shutdown = async () => {
  console.log('Shutting down server...');
  try {
    await mongoose.connection.close(false);
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error during MongoDB close', err);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
