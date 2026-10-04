const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const HttpError = require('../utils/HttpError');

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

// The extension is chosen by US from the mime type, never from the user's filename.
const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, crypto.randomBytes(16).toString('hex') + EXT_BY_MIME[file.mimetype]),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (!EXT_BY_MIME[file.mimetype]) {
      return cb(new HttpError(400, 'Only JPG, PNG, WEBP, GIF or AVIF images are allowed'));
    }
    cb(null, true);
  },
});

module.exports = { uploadSingle: upload.single('file'), uploadsDir };
