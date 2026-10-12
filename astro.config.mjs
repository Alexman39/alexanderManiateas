// @ts-check
import { defineConfig } from 'astro/config';
import { copyFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * GitHub Pages serves /el from el.html but 404s on /el/. Where a page sits next to a folder of the
 * same name (el.html + el/, projects.html + projects/), also write it as that folder's index.html.
 */
const trailingSlashCopies = {
  name: 'trailing-slash-copies',
  hooks: {
    /** @param {{ dir: URL }} options */
    'astro:build:done': async ({ dir }) => {
      const walk = async (/** @type {string} */ folder) => {
        for (const name of await readdir(folder)) {
          const path = join(folder, name);
          if (!(await stat(path)).isDirectory()) continue;
          const page = `${path}.html`;
          const index = join(path, 'index.html');
          const has = (/** @type {string} */ p) => stat(p).then(() => true, () => false);
          if ((await has(page)) && !(await has(index))) await copyFile(page, index);
          await walk(path);
        }
      };
      await walk(fileURLToPath(dir));
    },
  },
};

// Served from GitHub Pages at alexman39.github.io/alexanderManiateas.
// `format: 'file'` emits projects.html etc., so the old .html URLs keep working.
export default defineConfig({
  site: 'https://alexman39.github.io',
  base: '/alexanderManiateas',
  build: { format: 'file' },
  prefetch: { prefetchAll: true },
  integrations: [trailingSlashCopies],
});
