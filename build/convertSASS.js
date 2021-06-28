import sass from 'sass';

/**
 * Converts SASS text to CSS text
 * @param  {String} data The SASS text to convert.
 * @return {Promise<String>}
 */
export default function convertSASS(data) {
  return new Promise((resolve, reject) => {
    sass.render({
      data,
      includePaths: [
        `node_modules/bulma/sass`,
        `src`,
      ],
    }, (err, { css } = {}) => {
      if (err) reject(err);
      else resolve(css);
    });
  });
}
