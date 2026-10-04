const env = require('../config/env');

/**
 * Tells the Next.js frontend to rebuild a cached page right after the owner saves,
 * so changes appear instantly instead of waiting for the 60s cache window.
 * Failure is harmless (the page just refreshes on its own a bit later).
 */
async function revalidateFrontend(path) {
  if (!env.frontendUrl || !env.revalidateSecret) return false;
  try {
    const res = await fetch(`${env.frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.revalidateSecret, path }),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch (err) {
    console.warn('[revalidate] frontend not reachable:', err.message);
    return false;
  }
}

module.exports = { revalidateFrontend };
