const startServer = require(`../../server.cjs`);

module.exports = function plugins(on, config) {

  if (config.testingType === `component`) {
    on(`dev-server:start`, () => startServer());
  }

  return config;

}
