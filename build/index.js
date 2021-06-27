import buildCache        from './buildCache.js';
import buildHTML         from './buildHTML.js';
import buildJS           from './buildJS.js';
import buildSVG          from './buildSVG.js';
import copyAssets        from './copyAssets.js';
import { emptyDir }      from 'fs-extra';
import { exec }          from 'child_process';
import { fileURLToPath } from 'url';
import ora               from 'ora';
import { promisify }     from 'util';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const execute = promisify(exec);

const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `../dist`);

console.info(`Building app.`);

const emptyDistPromise = emptyDir(distDir);
ora.promise(emptyDistPromise, `Empty /dist directory`);
await emptyDistPromise;

const buildSVGPromise = buildSVG();
ora.promise(buildSVGPromise, `Build SVG sprites`);
await buildSVGPromise;

const buildHTMLPromise = buildHTML();
ora.promise(buildHTMLPromise, `Build HTML`);
await buildHTMLPromise;

const buildJSPromise = buildJS();
ora.promise(buildJSPromise, `Build JS`);
await buildJSPromise;

const copyAssetsPromise = copyAssets();
ora.promise(copyAssetsPromise, `Copy static assets`);
await copyAssetsPromise;

const buildCachePromise = buildCache();
ora.promise(buildCachePromise, `Create cache list`);
await buildCachePromise;

const emptyDocsPromise = emptyDir(joinPath(currentDir, `../docs`));
ora.promise(emptyDocsPromise, `Empty /docs directory`);
await emptyDocsPromise;

const jsdocDir         = joinPath(currentDir, `../node_modules/.bin/jsdoc`);
const buildDocsPromise = execute(`${ jsdocDir } -c build/jsdoc.json`);
ora.promise(buildDocsPromise, `Build developer documentation`);
await buildDocsPromise;

console.info(`App finished building.\n`);
