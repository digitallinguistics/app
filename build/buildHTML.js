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

const mainRegExp = /(?<main><main.+>)/u;

async function generateCSS(lessPath) {
  const less = await readFile(lessPath, `utf8`);
  return convertLESS(less);
}

/**
 * Builds the HTML for a single page, given an file entry returned [readdirp](https://www.npmjs.com/package/readdirp).
 * @param {Object} entry An entry from the [readdirp](https://www.npmjs.com/package/readdirp) package.
 */
async function buildPageContent(entry) {

  const ext = getExt(entry.basename);

  if (ext !== `.html`) return;

  const template  = await readFile(entry.fullPath, `utf8`);
  const buildHTML = hbs.compile(template);
  let   html      = buildHTML();
  const lessPath  = entry.fullPath.replace(`.html`, `.less`);
  const less      = await readFile(lessPath, `utf8`);
  const css       = await convertLESS(less);

  html = html.replace(mainRegExp, `$<main>\n\n  <style>    \n    ${ css }\n  </style>`);

  await outputFile(joinPath(distDir, `pages`, entry.path), html);

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
export default async function buildPage() {

  // register SVG partial
  const spritesPath = joinPath(distDir, `./sprites.svg`);
  const sprites     = await readFile(spritesPath, `utf8`);

  hbs.registerPartial(`sprites`, sprites);

  // register critical CSS partial
  const appStylesPath = joinPath(currentDir, `../src/index.less`);
  const criticalCSS   = await generateCSS(appStylesPath);

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
    await buildPageContent(entry);
  }

}
