const lessOptions = require(`./lessOptions.cjs`);

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/u,
        use:  [
          `css-loader`,
          {
            loader:  `less-loader`,
            options: {
              lessOptions,
            },
          },
        ],
      },
    ],
  },
};
