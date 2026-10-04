const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { isDbReady } = require('../config/db');
const User = require('../models/User');
const HttpError = require('../utils/HttpError');
const asyncHandler = require('../utils/asyncHandler');

// Compared against when the username doesn't exist, so response time doesn't reveal valid usernames.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

const signToken = (user) =>
  jwt.sign({ sub: user.id, username: user.username }, env.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: env.jwtExpiresIn,
  });

const publicUser = (user) => ({ id: user.id, username: user.username });

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  // typeof checks also stop NoSQL injection such as {"username": {"$ne": ""}}
  if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
    throw new HttpError(400, 'Username and password are required');
  }
  if (!isDbReady()) throw new HttpError(503, 'Database unavailable, try again shortly');

  const user = await User.findOne({ username: username.trim().toLowerCase() }).select('+passwordHash');
  const valid = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !valid) throw new HttpError(401, 'Invalid username or password');

  user.lastLoginAt = new Date();
  await user.save();

  res.json({ token: signToken(user), user: publicUser(user) });
});

// GET /api/auth/me
exports.me = (req, res) => {
  res.json({ user: publicUser(req.user) });
};

// POST /api/auth/change-password
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
    throw new HttpError(400, 'Current and new password are required');
  }
  if (newPassword.length < 10) throw new HttpError(400, 'New password must be at least 10 characters');
  if (newPassword.length > 200) throw new HttpError(400, 'New password is too long');
  if (newPassword === currentPassword) throw new HttpError(400, 'New password must be different');

  const user = await User.findById(req.user.id).select('+passwordHash');
  if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
    throw new HttpError(401, 'Current password is incorrect');
  }

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();

  res.json({ message: 'Password updated' });
});
