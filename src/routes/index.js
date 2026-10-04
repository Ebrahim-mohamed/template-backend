const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

router.use('/auth', require('./authRoutes'));
router.use('/pages', require('./pageRoutes'));
router.use('/media', require('./mediaRoutes'));

module.exports = router;
