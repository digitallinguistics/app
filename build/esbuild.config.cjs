const browserslist                  = require(`browserslist`);
const { esbuildPluginBrowserslist } = require(`esbuild-plugin-browserslist`);
const esbuildPluginHandlebars       = require(`./esbuildPluginHandlebars.cjs`);
const esbuildPluginLESS             = require(`./esbuildPluginLESS.cjs`);
const { join: joinPath }            = require(`path`);

const env    = process.env.GITHUB_EVENT_NAME === `release` ? `production` : `development`;
const srcDir = joinPath(__dirname, `../src`);

module.exports = {
  bundle:      true,
  entryPoints: [
    joinPath(srcDir, `App/App.js`),
    joinPath(srcDir, `pages/Home/Home.js`),
    joinPath(srcDir, `pages/Languages/Languages.js`),
    joinPath(srcDir, `pages/Lexicon/Lexicon.js`),
  ],
  format:    `esm`,
  minify:    env === `production`,
  outbase:   srcDir,
  outdir:    joinPath(__dirname, `../dist`),
  plugins:   [
    esbuildPluginBrowserslist(browserslist()),
    esbuildPluginHandlebars,
    esbuildPluginLESS,
  ],
  sourcemap: env === `production` ? true : `inline`,
};
