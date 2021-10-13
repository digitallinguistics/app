import { fileURLToPath } from 'url';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));

export default {
  paths: [
    joinPath(currentDir, `../src`),
    joinPath(currentDir, `../src/App`),
    joinPath(currentDir, `../src/components`),
    joinPath(currentDir, `../src/pages`),
    joinPath(currentDir, `../src/styles`),
  ],
};
