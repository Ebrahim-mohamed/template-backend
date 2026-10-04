const fs = require('fs/promises');
const path = require('path');
const { isDbReady } = require('../config/db');
const Media = require('../models/Media');
const { uploadsDir } = require('../middleware/upload');
const HttpError = require('../utils/HttpError');
const asyncHandler = require('../utils/asyncHandler');

const present = (m) => ({
  id: m._id,
  url: m.url,
  filename: m.filename,
  originalName: m.originalName,
  mimeType: m.mimeType,
  size: m.size,
  createdAt: m.createdAt,
});

// GET /api/media
exports.listMedia = asyncHandler(async (req, res) => {
  if (!isDbReady()) throw new HttpError(503, 'Database unavailable');
  const items = await Media.find().sort({ createdAt: -1 }).limit(500).lean();
  res.json({ items: items.map(present) });
});

// POST /api/media  (multipart field name: "file")
exports.uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new HttpError(400, 'No file uploaded (field name must be "file")');

  if (!isDbReady()) {
    await fs.unlink(req.file.path).catch(() => {});
    throw new HttpError(503, 'Database unavailable');
  }

  const media = await Media.create({
    filename: req.file.filename,
    originalName: path.basename(req.file.originalname || '').slice(0, 200),
    url: `/uploads/${req.file.filename}`,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.user.id,
  });

  res.status(201).json({ media: present(media) });
});

// DELETE /api/media/:id
exports.deleteMedia = asyncHandler(async (req, res) => {
  if (!isDbReady()) throw new HttpError(503, 'Database unavailable');

  const media = await Media.findById(req.params.id);
  if (!media) throw new HttpError(404, 'File not found');

  // basename() guarantees we can never delete outside the uploads folder
  await fs.unlink(path.join(uploadsDir, path.basename(media.filename))).catch(() => {});
  await media.deleteOne();

  res.json({ message: 'Deleted' });
});
