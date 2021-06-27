import config  from './webpack.config.js';
import webpack from 'webpack';

export default function buildJS() {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {

      if (err) return reject(err);

      const info = stats.toJson();

      if (stats.hasErrors()) {
        return reject(info.errors);
      }

      if (stats.hasWarnings()) {
        console.info(info.warnings);
      }

      resolve();

    });
  });
}
