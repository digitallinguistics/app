const { join:joinPath } = require(`path`);
const lessOptions       = require(`./lessOptions.cjs`);

module.exports = {
  module: {
    rules: [
      {
        test:   /\.hbs$/u,
        use:  [
          `html-loader`,
          joinPath(__dirname, `./handlebarsLoader.cjs`),
        ],
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
