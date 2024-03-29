import buildAppShell     from './buildAppShell.js';
import buildCache        from './buildCache.js';
import buildJS           from './buildJS.js';
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

const execute    = promisify(exec);
const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `../dist`);

console.info(`Building app.`);

// NB: Do not pass promises directly to ora.
// These promises must be completed in order, so you need to await each one in order.

await oraPromise(emptyDir(distDir), `Empty /dist directory`);
await oraPromise(buildAppShell(), `Build app shell`);
await oraPromise(buildJS(), `Build JavaScript`);
await oraPromise(copyAssets(), `Copy static assets`);
await oraPromise(buildCache(), `Create cache list`);

if (!process.argv.includes(`--quick`)) {

  await oraPromise(buildStories(), `Build stories`);
  await oraPromise(emptyDir(joinPath(currentDir, `../docs`)), `Empty /docs directory`);

  const jsdocDir         = joinPath(currentDir, `../node_modules/.bin/jsdoc`);
  const buildDocsPromise = execute(`${ jsdocDir } -c build/jsdoc.json`);

  await oraPromise(buildDocsPromise, `Build developer documentation`);

}

console.info(`App finished building.\n`);
