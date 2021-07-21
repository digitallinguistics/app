import convertLESS       from './convertLESS.js';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import recurse           from 'readdirp';

import {
  dirname  as getDirname,
  extname  as getExt,
  join     as joinPath,
} from 'path';

const {
  readFile,
  outputFile,
} = fs;

const currentDir = getDirname(fileURLToPath(import.meta.url));
const pagesDir   = joinPath(currentDir, `../src/pages`);

export default async function buildCSS() {

  const files = await recurse(pagesDir, { depth: 1 });

  for await (const entry of files) {

    const ext = getExt(entry.basename);

    if (ext !== `.less`) continue;

    const less = await readFile(entry.fullPath, `utf8`);
    const css  = await convertLESS(less);
    const path = entry.path.replace(`.less`, `.css`);

    await outputFile(joinPath(currentDir, `../dist/pages`, path), css);

  }

}
