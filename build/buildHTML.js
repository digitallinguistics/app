import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import hbs               from 'handlebars';
import recurse           from 'readdirp';

import {
  basename as getBasename,
  dirname  as getDirname,
  extname  as getExt,
  join     as joinPath,
} from 'path';

const {
  readFile,
  outputFile,
} = fs;

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, '../src');
const distDir    = joinPath(currentDir, '../dist');

export default async function buildHTML() { // eslint-disable-line max-statements

  // register app shell partials

  const srcFilesStream = recurse(joinPath(srcDir, 'app'));

  for await (const entry of srcFilesStream) {

    const ext = getExt(entry.basename);

    if (ext !== '.html') continue;

    const componentName = getBasename(entry.basename, ext);
    const componentHTML = await readFile(entry.fullPath, 'utf8');

    hbs.registerPartial(componentName, componentHTML);

  }

  // build the app shell

  const appTemplate = await readFile(joinPath(srcDir, 'index.html'), 'utf8');
  const buildApp    = hbs.compile(appTemplate);
  const app         = buildApp();

  await outputFile(joinPath(distDir, 'index.html'), app);

}
