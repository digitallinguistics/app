/**
 * @namespace App
 */

/**
 * The top-level view for the app
 * @memberof App
 * @instance
 */
export default class App {

  // PROPERTIES

  /**
   * References to DOM elements used by the App View
   * @type {Object}
   * @prop {HTMLElement} info   - A reference to the ARIA live region (`<p id=info hidden aria-live=polite>`) where content is announced to screen readers
   */
  nodes = {
    info: document.getElementById(`info`),
  }

  // METHODS

  /**
   * Updates the text of the ARIA live region so that the text will be announced to screen readers
   * @param {String} text The text to announce
   */
  announce(text) {
    this.nodes.info.textContent = text;
  }

}
