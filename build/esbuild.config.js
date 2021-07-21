import { fileURLToPath } from 'url';
import recurse           from 'readdirp';

import {
  dirname as getDirname,
  extname as getExt,
  join    as joinPath,
} from 'path';

const currentDir  = getDirname(fileURLToPath(import.meta.url));
const env         = process.env.GITHUB_EVENT_NAME === `release` ? `production` : `development`;
const srcDir      = joinPath(currentDir, `../src`);
const entryPoints = [joinPath(srcDir, `App/App.js`)];
const pageScripts = await recurse(joinPath(srcDir, `pages`));

for await (const entry of pageScripts) {
  const ext = getExt(entry.basename);
  if (ext !== `.js`) continue;
  entryPoints.push(entry.fullPath);
}

export default {
  bundle:      true,
  entryPoints,
  format:      `esm`,
  minify:      env === `production`,
  outbase:     srcDir,
  outdir:      joinPath(currentDir, `../dist`),
  sourcemap:   env === `production` ? true : `inline`,
  target:      [
    `chrome91`,
    `edge91`,
    `firefox89`,
    `safari14`,
  ],
};
