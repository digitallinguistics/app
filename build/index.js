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
await copy(joinPath(srcDir, 'index.html'), joinPath(distDir, 'index.html'));
