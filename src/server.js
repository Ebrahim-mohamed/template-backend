const env = require('./config/env');
const app = require('./app');
const { connectDB } = require('./config/db');
const ensureAdmin = require('./utils/ensureAdmin');

const RETRY_MS = 10000;

async function connectWithRetry() {
  const ok = await connectDB();
  if (ok) {
    await ensureAdmin();
    return;
  }
  console.log(`[db] retrying in ${RETRY_MS / 1000}s ...`);
  setTimeout(connectWithRetry, RETRY_MS);
}

// The API starts even if MongoDB is down: GET /api/pages/* serves default content meanwhile.
const server = app.listen(env.port, () => {
  console.log(`[server] listening on port ${env.port} (${env.nodeEnv})`);
  connectWithRetry();
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
