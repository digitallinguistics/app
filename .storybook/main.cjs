const webpackConfig = require(`../build/webpack.config.cjs`);

module.exports = {
  async babel(options) {
    // This prevents Storybook from using this projects .browserslistrc file,
    // which breaks the Storybook build for some reason.
    options.targets = `defaults`;
    return options;
  },
  core: {
    builder: `webpack5`,
  },
  stories: [
    `../src/**/*.stories.js`,
  ],
  async webpackFinal(config) {
    config.module.rules.push(...webpackConfig.module.rules);
    return config;
  },
};
