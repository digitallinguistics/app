import { fileURLToPath } from 'url';

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

await emptyDir(distDir);
await copy(joinPath(srcDir, '/images'), joinPath(distDir, '/images'));
await copy(joinPath(srcDir, 'favicon.ico'), joinPath(distDir, 'favicon.ico'));
await copy(joinPath(srcDir, 'index.html'), joinPath(distDir, 'index.html'));
await copy(joinPath(srcDir, 'manifest.json'), joinPath(distDir, 'manifest.json'));
