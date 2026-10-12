// @ts-check
import { defineConfig } from 'astro/config';

// Served from GitHub Pages at alexman39.github.io/alexanderManiateas.
// `format: 'file'` emits projects.html etc., so the old .html URLs keep working.
export default defineConfig({
  site: 'https://alexman39.github.io',
  base: '/alexanderManiateas',
  build: { format: 'file' },
  prefetch: { prefetchAll: true },
});
