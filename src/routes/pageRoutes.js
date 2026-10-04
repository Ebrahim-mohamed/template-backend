const router = require('express').Router();
const { listPages, getPage, updatePage, resetPage } = require('../controllers/pageController');
const { protect } = require('../middleware/auth');

router.get('/', protect, listPages);
router.get('/:slug', getPage); // public: the website reads this
router.put('/:slug', protect, updatePage);
router.post('/:slug/reset', protect, resetPage);

module.exports = router;
