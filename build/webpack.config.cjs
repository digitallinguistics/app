const lessOptions = require(`./lessOptions.cjs`);

module.exports = {
  module: {
    rules: [
      {
        loader: `handlebars-loader`,
        test:   /\.hbs$/u,
      },
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
