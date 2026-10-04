/**
 * Every editable page is registered here.
 * To add a new page later (contact, ...):
 *   1. create  src/pages/<slug>.defaults.js
 *   2. add it below
 * That's all, the routes, validation, fallback and revalidation work automatically.
 *
 * `path` is the public URL of the page (used to refresh it right after you save).
 */
const home = require('./home.defaults');
const about = require('./about.defaults');
const services = require('./services.defaults');
const courses = require('./courses.defaults');

const pages = {
  home: { label: 'Home', path: '/', defaults: home },
  about: { label: 'About', path: '/about', defaults: about },
  services: { label: 'Services', path: '/services', defaults: services },
  courses: { label: 'Courses', path: '/courses', defaults: courses },
};

module.exports = pages;
