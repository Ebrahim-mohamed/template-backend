const env = require('../config/env');

function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Server error';

  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 413;
    message = 'File is too large (max 10 MB)';
  } else if (err.name === 'MulterError') {
    status = 400;
  } else if (err.message === 'Not allowed by CORS') {
    status = 403;
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON body';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'Request body too large';
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    status = 400;
  }

  if (status >= 500) {
    console.error('[error]', err);
    if (env.nodeEnv === 'production') message = 'Server error';
  }

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };
