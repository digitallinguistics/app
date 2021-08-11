const startServer = require(`../../server.cjs`);

module.exports = (on, config) => {

  if (config.testingType === 'component') {
    on(`dev-server:start`, () => startServer());
  }

  return config;

}