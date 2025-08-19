import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import pagesRouter from './pages/router.js';
import { seedIfEmpty } from './seed.js';

// Express app is the HTTP server that will expose our API endpoints
const app = express();
app.use(cors());                 // allow the frontend to call this API from another origin
app.use(express.json());         // parse JSON request bodies

// Simple health endpoint to verify the server is up
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// All page-related API routes live under /api/pages
app.use('/api/pages', pagesRouter);

// Configuration with safe fallbacks for local development
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/opengraph_task';

// Start the server: connect to MongoDB, optionally seed demo data, then listen for requests
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Seed sample pages only when the database is empty (safe to call on every boot)
    await seedIfEmpty();

    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();


