const router = require('express').Router();
const { listMedia, uploadMedia, deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');

router.use(protect);

router.get('/', listMedia);
router.post('/', uploadSingle, uploadMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
