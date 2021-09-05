import convertLESS       from './convertLESS.js';
import { fileURLToPath } from 'url';
import recurse           from 'readdirp';

import {
  readFile,
  writeFile,
} from 'fs/promises';

import {
  dirname as getDirname,
  join    as joinPath,
}                  from 'path';

/**
 * Builds any assets needed for Storybook.
 */

export default async function buildStories() {

  const currentDir = getDirname(fileURLToPath(import.meta.url));
  const files      = await recurse(joinPath(currentDir, `../src`), { fileFilter: `*.less` });

  for await (const entry of files) {
    const less = await readFile(entry.fullPath, `utf8`);
    const css  = await convertLESS(less);
    await writeFile(entry.fullPath.replace(`.less`, `.css`), css, `utf8`);
  }

}
