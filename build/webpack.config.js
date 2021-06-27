import { fileURLToPath } from 'url';

import {
  dirname as getDirname,
  join as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const mode       = process.env.GITHUB_EVENT_NAME === `release` ? `production` : `development`;
const devtool    = mode === `production` ? `source-map` : `inline-source-map`;

export default {
  devtool,
  entry:   `./src/app/App.js`,
  mode,
  output:  {
    filename:      `App.js`,
    library:       `App`,
    libraryExport: `var`,
    path:          joinPath(currentDir, `../dist/app`),
  },
};
