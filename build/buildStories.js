import buildCSS          from './buildCSS.js';
import buildTemplate     from './buildTemplate.js';
import { fileURLToPath } from 'url';
import hbs               from 'handlebars';
import registerPartials  from './registerPartials.js';
import { writeFile } from 'fs/promises';

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

  const previewBodyTemplatePath = joinPath(currentDir, `../.storybook/preview-body.hbs`);
  const previewBodyHTMLPath     = joinPath(currentDir, `../.storybook/preview-body.html`);
  const html                    = await buildTemplate(hbs, previewBodyTemplatePath);

  await writeFile(previewBodyHTMLPath, html, `utf8`);

  // build standalone CSS files

  await buildCSS();

}
