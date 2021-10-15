const hbs               = require(`handlebars`);
const { join:joinPath } = require(`path`);
const { promisify }     = require(`util`);

const srcDir = joinPath(__dirname, `../src`);

const partialsRegistered = false;

async function initialize() {
  if (partialsRegistered) return;
  const { default: registerPartials } = await import(`./registerPartials.js`);
  await registerPartials(hbs, srcDir);
}

module.exports = function handlebarsLoader(source) {

  const cb = promisify(this.async());

  void async function internal() {
    await initialize();
    const generateHTML = hbs.compile(source);
    const html         = generateHTML({ test: `hello` });
    return cb(null, html);
  }();

};
