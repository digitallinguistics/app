const webpackPreprocessor = require(`@cypress/webpack-preprocessor`);
const webpackOptions      = require(`../../build/webpack.config.cjs`);

module.exports = (on, config) => {
  on(`file:preprocessor`, webpackPreprocessor({ webpackOptions }));
};
