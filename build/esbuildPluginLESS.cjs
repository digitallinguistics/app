/**
 * A custom ESBuild plugin to convert LESS files to CSS and return the CSS as a string,
 * allowing LESS files to be imported directly as JavaScript modules.
 */

const { readFile } = require(`fs/promises`);

module.exports = {
  name: `less-file`,
  setup(build) {

    build.onLoad({ filter: /\.less$/u }, async args => {

      const { default: convertLESS } = await import(`./convertLESS.js`);
      const less                     = await readFile(args.path, `utf8`);
      const css                      = await convertLESS(less);

      return {
        contents: css,
        loader:   `text`,
      };

    });

  },
};
