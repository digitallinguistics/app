import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import sass              from 'sass';

import {
  dirname  as getDirname,
  join     as joinPath,
} from 'path';

const {
  readFile,
  outputFile,
} = fs;

const currentDir = getDirname(fileURLToPath(import.meta.url));

/**
 * Converts SASS text to CSS text
 * @param  {String} data The SASS text to convert.
 * @return {Promise<String>}
 */
function convertSASS(data) {
  return new Promise((resolve, reject) => {
    sass.render({
      data,
      includePaths: [
        `node_modules/bulma/sass`,
        `src`,
      ],
    }, (err, { css } = {}) => {
      if (err) reject(err);
      else resolve(css);
    });
  });
}

export default async function buildCSS() {

  // Build CSS for app shell
  const appShellStylesPath = joinPath(currentDir, `../src/index.scss`);
  const appShellSASS       = await readFile(appShellStylesPath, `utf8`);
  const appShellCSS        = await convertSASS(appShellSASS);
  const appShellOutputPath = joinPath(currentDir, `../dist/index.css`);
  await outputFile(appShellOutputPath, appShellCSS);

}
