// Usage: npm run seed
// Creates the admin user from .env if it doesn't exist yet (the server also does this on startup).
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const ensureAdmin = require('../utils/ensureAdmin');

(async () => {
  const ok = await connectDB();
  if (!ok) process.exit(1);
  await ensureAdmin();
  await mongoose.disconnect();
  process.exit(0);
})();
