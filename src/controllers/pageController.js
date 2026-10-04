const { isDbReady } = require('../config/db');
const PageContent = require('../models/PageContent');
const pages = require('../pages/registry');
const HttpError = require('../utils/HttpError');
const asyncHandler = require('../utils/asyncHandler');
const { deepMerge, sanitize, clone } = require('../utils/content');
const { revalidateFrontend } = require('../utils/revalidate');

function getPageDef(slug) {
  if (!Object.hasOwn(pages, slug)) throw new HttpError(404, `Unknown page "${slug}"`);
  return pages[slug];
}

// GET /api/pages  (admin)
exports.listPages = (req, res) => {
  res.json({
    pages: Object.entries(pages).map(([slug, def]) => ({ slug, label: def.label, path: def.path })),
  });
};

// GET /api/pages/:slug  (public)
// Always answers with COMPLETE content. If the DB is down, empty, or errors,
// the default content is returned instead, so the website never breaks.
exports.getPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const def = getPageDef(slug);
  const fallback = () => res.json({ slug, source: 'defaults', data: clone(def.defaults) });

  if (!isDbReady()) return fallback();

  let doc;
  try {
    doc = await PageContent.findOne({ slug }).maxTimeMS(3000).lean();
  } catch (err) {
    console.error(`[pages] read failed for "${slug}":`, err.message);
    return fallback();
  }
  if (!doc) return fallback();

  res.json({
    slug,
    source: 'database',
    updatedAt: doc.updatedAt,
    data: deepMerge(def.defaults, doc.data),
  });
});

// PUT /api/pages/:slug  (admin)  body: { data: {...whole page...} }
exports.updatePage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const def = getPageDef(slug);

  const incoming = req.body && req.body.data;
  if (typeof incoming !== 'object' || incoming === null || Array.isArray(incoming)) {
    throw new HttpError(400, 'Body must be { "data": { ... } }');
  }
  if (!isDbReady()) throw new HttpError(503, 'Database unavailable, changes were not saved');

  const clean = sanitize(def.defaults, incoming);

  const doc = await PageContent.findOneAndUpdate(
    { slug },
    { slug, data: clean, updatedBy: req.user.id },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();

  const revalidated = await revalidateFrontend(def.path);

  res.json({ slug, source: 'database', updatedAt: doc.updatedAt, revalidated, data: clean });
});

// POST /api/pages/:slug/reset  (admin): deletes saved content, so defaults show again
exports.resetPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const def = getPageDef(slug);
  if (!isDbReady()) throw new HttpError(503, 'Database unavailable');

  await PageContent.deleteOne({ slug });
  const revalidated = await revalidateFrontend(def.path);

  res.json({ slug, source: 'defaults', revalidated, data: clone(def.defaults) });
});
