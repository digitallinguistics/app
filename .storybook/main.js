module.exports = {
  addons: [
    `@storybook/addon-links`,
    `@storybook/addon-essentials`,
  ],
  async babel(options) {
    // This prevents Storybook from using this projects .browserslistrc file,
    // which breaks the Storybook build for some reason.
    options.targets = `defaults`;
    return options;
  },
  stories: [
    `../src/**/*.stories.mdx`,
    `../src/**/*.stories.@(js|jsx|ts|tsx)`,
  ],
};
