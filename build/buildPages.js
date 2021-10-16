import buildTemplate     from './buildTemplate.js';
import convertLESS       from './convertLESS.js';
import createSprites     from './createSprites.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import hbs               from 'handlebars';
import { paramCase }     from 'param-case';
import recurse           from 'readdirp';
import registerPartials  from './registerPartials.js';

const {
  readdir: readDir,
  readFile,
  outputFile: writeFile,
} = fs;

import {
  basename as getBasename,
  dirname  as getDirname,
  join     as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, `../src`);
const distDir    = joinPath(currentDir, `../dist`);
const pagesDir   = joinPath(srcDir, `pages`);

/**
 * Builds the HTML for a single page, given an file entry returned [readdirp](https://www.npmjs.com/package/readdirp). The CSS is inserted in a `<style>` tag just inside the opening `<main>` tag.
 * @param {String} page
 */
async function buildPageContent(page) {

  const templates = await recurse(joinPath(pagesDir, page), { fileFilter: `*.hbs` });

  let html = ``;

  for await (const entry of templates) {

    const templateHTML  = await buildTemplate(hbs, entry.fullPath);
    const componentName = getBasename(entry.basename, `.hbs`);
    const templateID    = `${ paramCase(componentName) }-template`;

    html += `<template id=${ templateID }>${ templateHTML }</template>\n`;

  }

  await writeFile(joinPath(distDir, `pages`, `${ page }/${ page }.html`), html, `utf8`);

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

  // register HTML partials
  await registerPartials(hbs, srcDir);

  // build the app shell
  const appTemplatePath = joinPath(srcDir, `index.hbs`);
  const appHTML         = await buildTemplate(hbs, appTemplatePath);
  await writeFile(joinPath(distDir, `index.html`), appHTML, `utf8`);

  // build the HTML for individual pages
  const pages = await readDir(pagesDir);

  for (const page of pages) {
    await buildPageContent(page);
  }

}
