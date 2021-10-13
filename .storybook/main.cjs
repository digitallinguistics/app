module.exports = {
  addons: [
    // `@storybook/addon-actions`,
    // `@storybook/addon-links`,
    // `@storybook/addon-essentials`,
  ],
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
    // `../src/**/*.stories.mdx`,
    // `../src/**/*.stories.@(js|jsx|ts|tsx)`,
    `../src/pages/Home/Home.stories.js`,
    `../src/pages/Languages/Languages.stories.js`,
  ],
  async webpackFinal(config) {

    const { default: lessOptions } = await import(`../build/lessOptions.js`);

    config.module.rules.push({
      test: /\.less$/u,
      use: [
        `css-loader`,
        {
          loader: `less-loader`,
          options: {
            lessOptions,
          },
        }
      ],
    });

    return config;

  },
};
