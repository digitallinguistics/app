const webpackConfig = require(`../build/webpack.config.cjs`);

module.exports = {
  addons: [
    `@storybook/addon-docs`,
  ],
  async babel(options) {
    // This prevents Storybook from using this project's .browserslistrc file,
    // which breaks the Storybook build for some reason.
    options.targets = `defaults`;
    return options;
  },
  core: {
    builder: `webpack5`,
  },
  stories: [
    `../src/**/*.stories.@(js|mdx)`,
  ],
  async webpackFinal(config) {
    config.module.rules.push(...webpackConfig.module.rules);
    return config;
  },
};
