const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const routes = require('./routes');
const { uploadsDir } = require('./middleware/upload');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1); // running behind Nginx
app.disable('x-powered-by');

// crossOriginResourcePolicy must be "cross-origin" or the website (another origin) can't show uploaded images
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl, server-to-server (Next.js server fetch)
      if (env.clientOrigins.includes(origin)) return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

if (env.nodeEnv !== 'test') app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(express.json({ limit: '1mb' }));

app.use(
  '/api',
  rateLimit({ windowMs: 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false })
);

app.use('/uploads', express.static(uploadsDir, { maxAge: '30d', immutable: true }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
