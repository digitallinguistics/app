const hbs               = require(`handlebars`);
const { join:joinPath } = require(`path`);
const { promisify }     = require(`util`);

const srcDir = joinPath(__dirname, `../src`);

let partialsRegistered = false;

module.exports = function handlebarsLoader(source) {

  const cb = promisify(this.async());

  void async function internal() {

    if (!partialsRegistered) {
      const { default: registerPartials } = await import(`./registerPartials.js`);
      await registerPartials(hbs, srcDir);
      partialsRegistered = true;
    }

    const generateHTML = hbs.compile(source);
    const html         = generateHTML();
    return cb(null, html);

  }();

};
