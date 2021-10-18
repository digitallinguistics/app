// Creates the cache.json file used by the offline worker
// to cache all assets needed for offline functionality

import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import recurse           from 'readdirp';

const { writeJSON } = fs;

import {
  basename as getBasename,
  dirname  as getDirname,
  join     as joinPath,
  posix,
  sep,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `../dist`);
const cachePath  = joinPath(currentDir, `../dist/cache.json`);

const disallowList = [
  `index.html`,
  `offline-worker.js`,
];

export default async function buildCache() {

  const assets          = [];
  const distFilesStream = await recurse(distDir, { fileFilter: `!*.css` });

  for await (const entry of distFilesStream) {
    const filename = getBasename(entry.basename);
    if (disallowList.includes(filename)) continue;
    const posixPath = entry.path.split(sep).join(posix.sep);
    assets.push(`/${ posixPath }`);
  }

  await writeJSON(cachePath, assets, { spaces: 2 });

}
