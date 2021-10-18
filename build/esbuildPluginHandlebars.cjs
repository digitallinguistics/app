/**
 * A custom ESBuild plugin to precompile Handlebars (`.hbs`) template to a templating function, and return that function for import into JavaScript modules.
 */

const hbs                = require(`handlebars`);
const { join: joinPath } = require(`path`);
const { readFile }       = require(`fs/promises`);

module.exports = {

  name: `hbs-file`,

  async setup(build) {

    const { default: registerPartials } = await import(`./registerPartials.js`);
    const srcDir                        = joinPath(__dirname, `../src`);

    await registerPartials(hbs, srcDir);

    build.onLoad({ filter: /\.hbs$/u }, async args => {

      const template     = await readFile(args.path, `utf8`);
      const generateHTML = hbs.compile(template);

      return {
        contents: generateHTML(),
        loader:   `text`,
      };

    });

  },

};
