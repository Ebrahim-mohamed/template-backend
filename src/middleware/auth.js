const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { isDbReady } = require('../config/db');
const User = require('../models/User');
const HttpError = require('../utils/HttpError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) throw new HttpError(401, 'Authentication required');

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
  } catch {
    throw new HttpError(401, 'Invalid or expired token');
  }

  if (!isDbReady()) throw new HttpError(503, 'Database unavailable');

  const user = await User.findById(payload.sub);
  if (!user) throw new HttpError(401, 'Account no longer exists');

  req.user = user;
  next();
});

module.exports = { protect };
