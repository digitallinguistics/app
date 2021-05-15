import buildHTML         from './buildHTML.js';
import copyFiles         from './copyFiles.js';
import { exec }          from 'child_process';
import { fileURLToPath } from 'url';
import ora               from 'ora';
import { promisify }     from 'util';

import {
  copy,
  emptyDir,
} from 'fs-extra';

import {
  dirname as getDirname,
  join    as joinPath,
  resolve as resolvePath,
} from 'path';

const execute = promisify(exec);

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, '../src');
const distDir    = joinPath(currentDir, '../dist');

console.info('Building app.');

const emptyDistPromise = emptyDir(distDir);
ora.promise(emptyDistPromise, 'Empty \dist directory');
await emptyDistPromise;

const copyFilesPromise = copyFiles();
ora.promise(copyFilesPromise, 'Copy static assets');

const buildHTMLPromise = buildHTML();
ora.promise(buildHTMLPromise, 'Build HTML');

await Promise.all([
  copyFilesPromise,
  buildHTMLPromise,
]);

const emptyDocsPromise = emptyDir(joinPath(currentDir, '../docs'));
ora.promise(emptyDocsPromise, 'Empty \docs directory');
await emptyDocsPromise;

const jsdocDir         = joinPath(currentDir, '../node_modules/.bin/jsdoc');
const buildDocsPromise = execute(`${ jsdocDir } -c build/jsdoc.json`);
ora.promise(buildDocsPromise, 'Build developer documentation');
await buildDocsPromise;

console.info('App finished building.\n');
