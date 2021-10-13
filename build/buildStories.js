import buildCSS          from './buildCSS.js';
import { fileURLToPath } from 'url';
import hbs               from 'handlebars';
import registerPartials  from './registerPartials.js';

import {
  readFile,
  writeFile,
} from 'fs/promises';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

/**
 * Builds any assets needed for Storybook.
 */

export default async function buildStories() {

  const currentDir = getDirname(fileURLToPath(import.meta.url));
  const srcDir     = joinPath(currentDir, `../src`);

  // build all the templates into the preview body

  await registerPartials(hbs, srcDir);

  const previewBodyTemplate = await readFile(joinPath(currentDir, `../.storybook/preview-body.hbs`), `utf8`);
  const buildPreviewBody    = hbs.compile(previewBodyTemplate);
  const previewBodyHTML     = buildPreviewBody();

  await writeFile(joinPath(currentDir, `../.storybook/preview-body.html`), previewBodyHTML, `utf8`);

  // build standalone CSS files

  await buildCSS();

}
