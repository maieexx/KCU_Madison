import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongo from './lib/db.js';
import Project from './lib/projectModel.js';

dotenv.config();

const app = express();

// CORS: Consistent configuration for all routes
const corsOrigin = 'http://localhost:3000'; // Matches working /api/semesters
app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url} from ${req.get('Origin') || 'no origin'}`);
  next();
});
app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.url} - Origin: ${req.get('Origin') || 'no origin'}`);
  next();
});

// Public routes
app.get('/', (_req, res) => res.send('<h1>Server is running ✅</h1>'));
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() }));

// API Routes with consistent semester handling
app.get('/api/semesters', async (req, res, next) => {
  try {
    const semesters = await Project.aggregate([{ $group: { _id: '$semester' } }, { $sort: { _id: -1 } }]).allowDiskUse(true);
    res.json(semesters.map(s => s._id || 'Unknown'));
  } catch (err) {
    next(err);
  }
});

app.get('/api/projects/:semester', async (req, res, next) => {
  try {
    const { semester } = req.params;
    if (!semester || typeof semester !== 'string') {
      return res.status(400).json({ error: 'Invalid semester parameter' });
    }
    // Normalize semester to match data (e.g., "2025-spring" -> "2025 spring")
    const normalizedSemester = semester.toLowerCase().replace('-', ' ');
    console.log(`${new Date().toISOString()} Fetching projects for normalized semester: ${normalizedSemester}`);
    const projects = await Project.find({ semester: { $regex: new RegExp(normalizedSemester, 'i') } }).lean().select('-__v');
    if (!projects.length) {
      console.log(`${new Date().toISOString()} No projects found for semester: ${normalizedSemester}`);
      return res.status(404).json({ error: 'No projects found for this semester' });
    }
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

app.get('/api/project/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`${new Date().toISOString()} Fetching project with id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }
    const project = await Project.findById(id).lean().select('-__v');
    if (!project) {
      console.log(`${new Date().toISOString()} Project not found for id: ${id}`);
      return res.status(404).json({ error: 'Project not found' });
    }
    if (project.presentation && project.presentation.includes('docs.google.com/presentation')) {
      const fileIdMatch = project.presentation.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        project.presentation = `https://docs.google.com/presentation/d/${fileId}/preview`;
      } else {
        console.log(`${new Date().toISOString()} No valid file ID found in presentation URL: ${project.presentation}`);
      }
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.url });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(`${new Date().toISOString()} Server error:`, err.stack || err.message);
  res.status(500).json({ error: 'Internal server error', message: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

const PORT = process.env.PORT || 5000;

connectMongo()
  .then(() => {
    console.log(`${new Date().toISOString()} Connected to MongoDB successfully`);
    app.listen(PORT, () => console.log(`${new Date().toISOString()} Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error(`${new Date().toISOString()} Failed to start server due to connection error:`, err.message || err);
    process.exit(1);
  });

// Graceful shutdown
const shutdown = async () => {
  console.log(`${new Date().toISOString()} Shutting down server...`);
  try {
    await mongoose.connection.close(false);
    console.log(`${new Date().toISOString()} MongoDB connection closed`);
  } catch (err) {
    console.error(`${new Date().toISOString()} Error during MongoDB close:`, err.message);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);