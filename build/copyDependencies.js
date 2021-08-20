import { copy }          from 'fs-extra';
import { fileURLToPath } from 'url';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));

export default async function copyAssets() {
  await copy(
    joinPath(currentDir, `../node_modules/uuid/dist/esm-browser`),
    joinPath(currentDir, `../vendor/UUID`),
  );
}
