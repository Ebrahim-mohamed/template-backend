require('dotenv').config();

const list = (value) =>
  (value || '')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientOrigins: list(process.env.CLIENT_ORIGINS),
  frontendUrl: (process.env.FRONTEND_URL || '').replace(/\/$/, ''),
  revalidateSecret: process.env.REVALIDATE_SECRET || '',
  adminUsername: (process.env.ADMIN_USERNAME || '').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || '',
};

for (const key of ['mongoUri', 'jwtSecret']) {
  if (!env[key]) {
    throw new Error(`Missing required environment variable for "${key}". Check your .env file.`);
  }
}

if (env.jwtSecret.length < 32) {
  console.warn('[env] JWT_SECRET is shorter than 32 characters. Use a long random value.');
}

module.exports = env;
