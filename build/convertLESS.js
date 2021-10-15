import CleanCSS    from 'clean-css';
import less        from 'less';
import lessOptions from './lessOptions.cjs';

const minifier = new CleanCSS;

/**
 * Converts LESS text to CSS text
 * @param  {String} data The LESS text to convert.
 * @return {Promise<String>}
 */
export default async function convertLESS(data) {
  const { css }                 = await less.render(data, lessOptions);
  const { styles: minifiedCSS } = minifier.minify(css);
  return minifiedCSS;
}
