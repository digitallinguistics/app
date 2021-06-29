import { fileURLToPath } from 'url';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const env        = process.env.GITHUB_EVENT_NAME === `release` ? `production` : `development`;

export default {
  bundle:      true,
  entryPoints: [joinPath(currentDir, `../src/App/App.js`)],
  format:      `esm`,
  minify:      env === `production`,
  outbase:     joinPath(currentDir, `../src`),
  outdir:      joinPath(currentDir, `../dist`),
  sourcemap:   env === `production` ? true : `inline`,
  target:      [
    `chrome91`,
    `edge91`,
    `firefox89`,
    `safari14`,
  ],
};
