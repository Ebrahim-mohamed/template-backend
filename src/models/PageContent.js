const mongoose = require('mongoose');

/**
 * One document per page (e.g. slug "home").
 * `data` holds the page's sections. It is validated/shaped against the page's
 * defaults in utils/sanitize.js before it is ever saved.
 */
const pageContentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    data: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
