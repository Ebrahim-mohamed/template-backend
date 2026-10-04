/**
 * Helpers that keep stored page content safe and complete.
 *
 *  - deepMerge(defaults, stored): fills any missing field with the default.
 *  - sanitize(defaults, input):   keeps ONLY keys that exist in the defaults,
 *                                 coerces types, caps sizes, strips dangerous URLs.
 *    This also blocks NoSQL operator injection ({"$gt": ""}) and prototype pollution,
 *    because we only ever read keys that the defaults template declares.
 */

const MAX_STRING = 10000;
const MAX_ARRAY = 60;
const DANGEROUS_URL = /^\s*(javascript|data|vbscript)\s*:/i;

const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const clone = (v) => JSON.parse(JSON.stringify(v));

function deepMerge(base, over) {
  if (Array.isArray(base)) return Array.isArray(over) ? over : clone(base);

  if (isObj(base)) {
    const source = isObj(over) ? over : {};
    const out = {};
    for (const key of Object.keys(base)) {
      out[key] = Object.hasOwn(source, key) ? deepMerge(base[key], source[key]) : clone(base[key]);
    }
    return out;
  }

  return typeof over === typeof base && over !== null && over !== undefined ? over : base;
}

function sanitize(template, value) {
  if (Array.isArray(template)) {
    if (!Array.isArray(value)) return clone(template);
    const itemTemplate = template[0];
    return value.slice(0, MAX_ARRAY).map((item) => sanitize(itemTemplate, item));
  }

  if (isObj(template)) {
    const source = isObj(value) ? value : {};
    const out = {};
    for (const key of Object.keys(template)) {
      out[key] = Object.hasOwn(source, key) ? sanitize(template[key], source[key]) : clone(template[key]);
    }
    return out;
  }

  if (typeof template === 'string') {
    if (typeof value !== 'string') return template;
    const trimmed = value.trim().slice(0, MAX_STRING);
    return DANGEROUS_URL.test(trimmed) ? '' : trimmed;
  }

  if (typeof template === 'boolean') return typeof value === 'boolean' ? value : template;

  if (typeof template === 'number') return typeof value === 'number' && Number.isFinite(value) ? value : template;

  return template;
}

module.exports = { deepMerge, sanitize, clone };
