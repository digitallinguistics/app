/**
 * Converts an HTML string to a DOM tree. Only the first top-level element will be returned. (In other words, the HTML string should consist of only 1 top-level element.)
 * @name html2element
 * @function
 * @memberof Utilities
 * @param {String} html An HTML string.
 * @returns {HTMLElement}
 */
export default function html2element(html) {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.firstElementChild;
}
