import browserslist                  from 'browserslist';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import { fileURLToPath }             from 'url';
import recurse                       from 'readdirp';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir  = getDirname(fileURLToPath(import.meta.url));
const env         = process.env.GITHUB_EVENT_NAME === `release` ? `production` : `development`;
const srcDir      = joinPath(currentDir, `../src`);
const entryPoints = [joinPath(srcDir, `index.js`)];
const pageScripts = await recurse(joinPath(srcDir, `pages`), {
  depth:      1,
  fileFilter: `*.js`,
});

for await (const { basename, fullPath } of pageScripts) {
  if (basename.includes(`.component.js`)) continue;
  if (basename.includes(`.e2e.js`)) continue;
  if (basename.includes(`.integration.js`)) continue;
  if (basename.includes(`.stories.js`)) continue;
  if (basename.includes(`.test.js`)) continue;
  if (basename.includes(`.unit.js`)) continue;
  entryPoints.push(fullPath);
}

export default {
  bundle:    true,
  entryPoints,
  format:    `esm`,
  minify:    env === `production`,
  outbase:   srcDir,
  outdir:    joinPath(currentDir, `../dist`),
  plugins:   [esbuildPluginBrowserslist(browserslist())],
  sourcemap: env === `production` ? true : `inline`,
};
