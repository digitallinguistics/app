const { join: joinPath } = require(`path`);

module.exports = {
  paths: [
    joinPath(__dirname, `../src`),
    joinPath(__dirname, `../src/App`),
    joinPath(__dirname, `../src/classes`),
    joinPath(__dirname, `../src/components`),
    joinPath(__dirname, `../src/pages`),
    joinPath(__dirname, `../src/styles`),
  ],
};
