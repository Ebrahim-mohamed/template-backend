const bcrypt = require('bcryptjs');
const env = require('../config/env');
const User = require('../models/User');

/**
 * Creates the admin account on first run only.
 * It never overwrites an existing account, so changing the password from the
 * dashboard is permanent even if ADMIN_PASSWORD stays in .env.
 */
async function ensureAdmin() {
  try {
    if (!env.adminUsername || !env.adminPassword) {
      console.warn('[admin] ADMIN_USERNAME / ADMIN_PASSWORD not set, skipping admin creation');
      return;
    }
    const existing = await User.findOne({ username: env.adminUsername });
    if (existing) return;

    const passwordHash = await bcrypt.hash(env.adminPassword, 12);
    await User.create({ username: env.adminUsername, passwordHash });
    console.log(`[admin] Created admin user "${env.adminUsername}"`);
  } catch (err) {
    console.error('[admin] could not ensure admin user:', err.message);
  }
}

module.exports = ensureAdmin;
