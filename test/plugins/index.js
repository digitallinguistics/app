import startServer from '../../server.js';

export default function plugins(on, config) {
  if (config.testingType === `component`) {
    on(`dev-server:start`, () => startServer());
  }
}
