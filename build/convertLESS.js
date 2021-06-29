import less from 'less';

const lessOptions = {
  paths: [
    `src`,
    `src/styles`,
  ],
};

/**
 * Converts LESS text to CSS text
 * @param  {String} data The LESS text to convert.
 * @return {Promise<String>}
 */
export default async function convertLESS(data) {
  const { css } = await less.render(data, lessOptions);
  return css;
}
