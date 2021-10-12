import buildCache        from './buildCache.js';
import buildCSS          from './buildCSS.js';
import buildJS           from './buildJS.js';
import buildPages        from './buildPages.js';
import buildStories      from './buildStories.js';
import copyAssets        from './copyAssets.js';
import { emptyDir }      from 'fs-extra';
import { exec }          from 'child_process';
import { fileURLToPath } from 'url';
import { oraPromise }    from 'ora';
import { promisify }     from 'util';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const execute = promisify(exec);

const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `../dist`);

console.info(`Building app.`);

// NB: Do not pass promises directly to ora.
// These promises must be completed in order, so you need to await each one in order.

await oraPromise(emptyDir(distDir), `Empty /dist directory`);
await oraPromise(buildPages(), `Build page content`);
await oraPromise(buildCSS(), `Build CSS`);
await oraPromise(buildJS(), `Build JS`);
await oraPromise(copyAssets(), `Copy static assets`);
await oraPromise(buildCache(), `Create cache list`);
await oraPromise(buildStories(), `Build stories`);
await oraPromise(emptyDir(joinPath(currentDir, `../docs`)), `Empty /docs directory`);

const jsdocDir         = joinPath(currentDir, `../node_modules/.bin/jsdoc`);
const buildDocsPromise = execute(`${ jsdocDir } -c build/jsdoc.json`);

await oraPromise(buildDocsPromise, `Build developer documentation`);

console.info(`App finished building.\n`);
