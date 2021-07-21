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
const pagesDir   = joinPath(srcDir, `pages`);

async function generateCriticalCSS() {
  const appShellStylesPath = joinPath(currentDir, `../src/index.less`);
  const appShellLESS       = await readFile(appShellStylesPath, `utf8`);
  return convertLESS(appShellLESS);
}

/**
 * Builds the HTML for a single page, given an file entry returned [readdirp](https://www.npmjs.com/package/readdirp).
 * @param {Object} entry An entry from the [readdirp](https://www.npmjs.com/package/readdirp) package.
 */
async function buildPageHTML(entry) {

  const ext = getExt(entry.basename);

  if (ext !== `.html`) return;

  const pageTemplate = await readFile(entry.fullPath, `utf8`);
  const buildPage    = hbs.compile(pageTemplate);
  const pageHTML     = buildPage();

  await outputFile(joinPath(distDir, `pages`, entry.path), pageHTML);

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
  await registerPartialsDir(pagesDir);

  // build the app shell
  const appTemplate = await readFile(joinPath(srcDir, `index.html`), `utf8`);
  const buildApp    = hbs.compile(appTemplate);
  const appHTML     = buildApp();

  await outputFile(joinPath(distDir, `index.html`), appHTML);

  // build the HTML for individual pages
  const pages = await recurse(pagesDir, { depth: 1 });

  for await (const entry of pages) {
    await buildPageHTML(entry);
  }

}
