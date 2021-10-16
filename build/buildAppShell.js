import buildTemplate     from './buildTemplate.js';
import convertLESS       from './convertLESS.js';
import createSprites     from './createSprites.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import hbs               from 'handlebars';
import registerPartials  from './registerPartials.js';

const {
  readFile,
  outputFile: writeFile,
} = fs;

import {
  dirname  as getDirname,
  join     as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, `../src`);
const distDir    = joinPath(currentDir, `../dist`);

export default async function buildPages() {

  // register SVG partial
  const sprites = await createSprites();
  hbs.registerPartial(`sprites`, sprites);

  // register critical CSS partial
  const appStylesPath = joinPath(srcDir, `index.less`);
  const criticalLESS  = await readFile(appStylesPath, `utf8`);
  const criticalCSS   = await convertLESS(criticalLESS);
  hbs.registerPartial(`critical-css`, `${ criticalCSS }\n`);

  // register Handlebars partials
  await registerPartials(hbs, srcDir);

  // build the app shell
  const appTemplatePath = joinPath(srcDir, `index.hbs`);
  const appHTML         = await buildTemplate(hbs, appTemplatePath);
  await writeFile(joinPath(distDir, `index.html`), appHTML, `utf8`);

}
