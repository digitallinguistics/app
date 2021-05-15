import buildHTML         from './buildHTML.js';
import copyFiles         from './copyFiles.js';
import { fileURLToPath } from 'url';
import ora               from 'ora';

import {
  copy,
  emptyDir,
} from 'fs-extra';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, '../src');
const distDir    = joinPath(currentDir, '../dist');

console.info('Building app.');

const emptyDirPromise = emptyDir(distDir);
ora.promise(emptyDirPromise, 'Empty \dist directory');
await emptyDirPromise;

const copyFilesPromise = copyFiles();
ora.promise(copyFilesPromise, 'Copy static assets');

const buildHTMLPromise = buildHTML();
ora.promise(buildHTMLPromise, 'Build HTML');

await Promise.all([
  copyFilesPromise,
  buildHTMLPromise,
]);

console.info('App finished building.\n');
