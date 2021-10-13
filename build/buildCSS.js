import convertLESS       from './convertLESS.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import recurse           from 'readdirp';

import {
  dirname  as getDirname,
  relative as getRelativePath,
  join     as joinPath,
} from 'path';

const {
  readFile,
  outputFile,
} = fs;

const currentDir = getDirname(fileURLToPath(import.meta.url));
const srcDir     = joinPath(currentDir, `../src`);
const distDir    = joinPath(currentDir, `../dist`);

async function convertDir(inputDir, outputDir) {

  const files = await recurse(inputDir, { fileFilter: `*.less` });

  for await (const entry of files) {
    let relativePath = getRelativePath(inputDir, entry.fullPath);
    relativePath     = relativePath.replace(`.less`, `.css`);
    await convertFile(entry.fullPath, joinPath(outputDir, relativePath));
  }

}

async function convertFile(inputPath, outputPath) {
  const less = await readFile(inputPath, `utf8`);
  const css  = await convertLESS(less);
  await outputFile(outputPath, css, `utf8`);
}

export default async function buildCSS() {
  await convertFile(joinPath(srcDir, `App/App.less`), joinPath(distDir, `App/App.css`));
  await convertFile(joinPath(srcDir, `index.less`), joinPath(distDir, `index.css`));
  await convertDir(joinPath(srcDir, `components`), joinPath(distDir, `components`));
  await convertDir(joinPath(srcDir, `pages`), joinPath(distDir, `pages`));
}
