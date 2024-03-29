/**
 * Copies static assets from src/ to dist/.
 */

import { copy }          from 'fs-extra';
import { fileURLToPath } from 'url';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, `../src`);
const distDir    = joinPath(currentDir, `../dist`);

export default async function copyAssets() {
  await copy(joinPath(srcDir, `/fonts`), joinPath(distDir, `/fonts`));
  await copy(joinPath(srcDir, `/images`), joinPath(distDir, `/images`));
  await copy(joinPath(srcDir, `favicon.ico`), joinPath(distDir, `favicon.ico`));
  await copy(joinPath(srcDir, `manifest.json`), joinPath(distDir, `manifest.json`));
  await copy(joinPath(srcDir, `offline-worker.js`), joinPath(distDir, `offline-worker.js`));
}
