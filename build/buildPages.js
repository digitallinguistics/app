import convertLESS       from './convertLESS.js';
import createSprites     from './createSprites.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import hbs               from 'handlebars';
import recurse           from 'readdirp';
import registerPartials  from './registerPartials.js';

import {
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

/**
 * Builds the HTML and CSS for a single page, given an file entry returned [readdirp](https://www.npmjs.com/package/readdirp). The CSS is inserted in a `<style>` tag just inside the opening `<main>` tag.
 * @param {Object} entry An entry from the [readdirp](https://www.npmjs.com/package/readdirp) package.
 */
async function buildPageContent(entry) {

  const ext = getExt(entry.basename);

  if (ext !== `.hbs`) return;

  const template  = await readFile(entry.fullPath, `utf8`);
  const buildHTML = hbs.compile(template);
  let   html      = buildHTML();
  const lessPath  = entry.fullPath.replace(`.hbs`, `.less`);
  const less      = await readFile(lessPath, `utf8`);
  const css       = await convertLESS(less);
  const htmlPath  = entry.path.replace(`.hbs`, `.html`);

  // NOTE: The extra spaces here just make the output file more readable.
  html = html.replace(mainRegExp, `$<main>\n\n  <style>    \n    ${ css }\n  </style>`);

  await outputFile(joinPath(distDir, `pages`, htmlPath), html);

}

export default async function buildPages() {

  // register SVG partial
  const sprites = await createSprites();

  hbs.registerPartial(`sprites`, sprites);

  // register critical CSS partial
  const appStylesPath = joinPath(srcDir, `index.less`);
  const criticalLESS  = await readFile(appStylesPath, `utf8`);
  const criticalCSS   = await convertLESS(criticalLESS);

  hbs.registerPartial(`critical-css`, `${ criticalCSS }\n`);

  // register app shell partials
  await registerPartials(hbs, joinPath(srcDir, `App`));

  // register Home page CSS partial
  const homeLESS = await readFile(joinPath(pagesDir, `Home/Home.less`), `utf8`);
  const homeCSS  = await convertLESS(homeLESS);

  hbs.registerPartial(`home-css`, homeCSS);

  // register page partials
  await registerPartials(hbs, pagesDir);

  // build the app shell
  const appTemplate = await readFile(joinPath(srcDir, `index.hbs`), `utf8`);
  const buildApp    = hbs.compile(appTemplate);
  const appHTML     = buildApp();

  await outputFile(joinPath(distDir, `index.html`), appHTML);

  // build the HTML + CSS for individual pages
  const pages = await recurse(pagesDir, { depth: 1 });

  for await (const entry of pages) {
    await buildPageContent(entry);
  }

}
