import convertLESS       from './convertLESS.js';
import { fileURLToPath } from 'url';
import hbs               from 'handlebars';
import recurse           from 'readdirp';
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

  // build individual CSS files

  const lessFiles = await recurse(srcDir, { fileFilter: `*.less` });

  for await (const entry of lessFiles) {
    const less = await readFile(entry.fullPath, `utf8`);
    const css  = await convertLESS(less);
    await writeFile(entry.fullPath.replace(`.less`, `.css`), css, `utf8`);
  }

  // build all the templates into the preview body

  await registerPartials(hbs, srcDir);

  const previewBodyTemplate = await readFile(joinPath(currentDir, `../.storybook/preview-body.hbs`), `utf8`);
  const buildPreviewBody    = hbs.compile(previewBodyTemplate);
  const previewBodyHTML     = buildPreviewBody();

  await writeFile(joinPath(currentDir, `../.storybook/preview-body.html`), previewBodyHTML, `utf8`);

}
