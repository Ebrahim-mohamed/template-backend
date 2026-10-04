const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { login, me, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Try again in 15 minutes.' },
});

router.post('/login', loginLimiter, login);
router.get('/me', protect, me);
router.post('/change-password', protect, changePassword);

module.exports = router;
