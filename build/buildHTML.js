import convertLESS       from './convertLESS.js';
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
const srcDir     = joinPath(currentDir, `../src`);
const distDir    = joinPath(currentDir, `../dist`);

async function generateCriticalCSS() {
  const appShellStylesPath      = joinPath(currentDir, `../src/index.less`);
  const appShellSASS            = await readFile(appShellStylesPath, `utf8`);
  return convertLESS(appShellSASS);
}

/**
 * Registers all the partials in a directory.
 */
async function registerPartialsDir(dir) {

  const filesStream = recurse(dir);

  for await (const entry of filesStream) {

    const ext = getExt(entry.basename);

    if (ext !== `.html`) continue;

    const componentName = getBasename(entry.basename, ext);
    const componentHTML = await readFile(entry.fullPath, `utf8`);

    hbs.registerPartial(componentName, componentHTML);

  }

}

/* eslint-disable max-statements */
export default async function buildHTML() {

  // register SVG partial
  const spritesPath = joinPath(distDir, `./sprites.svg`);
  const sprites     = await readFile(spritesPath, `utf8`);

  hbs.registerPartial(`sprites`, sprites);

  // register critical CSS partial
  const criticalCSS = await generateCriticalCSS();

  hbs.registerPartial(`critical-css`, `${ criticalCSS }\n`);

  // register app shell partials
  await registerPartialsDir(joinPath(srcDir, `App`));

  // register page partials
  await registerPartialsDir(joinPath(srcDir, `pages`));

  // build the app shell
  const appTemplate = await readFile(joinPath(srcDir, `index.html`), `utf8`);
  const buildApp    = hbs.compile(appTemplate);
  const app         = buildApp();

  await outputFile(joinPath(distDir, `index.html`), app);

}
