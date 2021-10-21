import buildAppShell     from './buildAppShell.js';
import buildCache        from './buildCache.js';
import buildJS           from './buildJS.js';
import copyAssets        from './copyAssets.js';
import { emptyDir }      from 'fs-extra';
import { fileURLToPath } from 'url';
import { oraPromise }    from 'ora';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `../dist`);

console.info(`Building app.`);

// NB: Do not pass promises directly to ora.
// These promises must be completed in order, so you need to await each one in order.

await oraPromise(emptyDir(distDir), `Empty /dist directory`);
await oraPromise(buildAppShell(), `Build app shell`);
await oraPromise(buildJS(), `Build JS`);
await oraPromise(copyAssets(), `Copy static assets`);
await oraPromise(buildCache(), `Create cache list`);

console.info(`App finished building.\n`);
