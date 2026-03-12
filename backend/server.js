import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import challengeRoutes from './routes/challenges.js';
import postRoutes from './routes/posts.js';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// Trust proxy (needed on Render / behind a reverse proxy)
app.set('trust proxy', 1);

// ─── CORS ────────────────────────────────────────────────────────────────────
// Set CLIENT_ORIGIN in Render dashboard (comma-separated for multiple origins).
// Falls back to allowing localhost for local development.
const rawOrigins = 'https://momentum-community-challenges.vercel.app/';
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── MongoDB ─────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running', env: process.env.NODE_ENV });
});

// ─── Serve React frontend (production) ──────────────────────────────────────
// The built frontend lives one level up in dist/ (built from workspace root).
const DIST = path.join(__dirname, '..', 'dist');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(DIST));
    // SPA catch-all: any non-API request returns index.html so React Router works
    app.get('*', (req, res) => {
        res.sendFile(path.join(DIST, 'index.html'));
    });
} else {
    // Development 404 for API-only server
    app.use((req, res) => {
        res.status(404).json({ success: false, message: 'Route not found' });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
