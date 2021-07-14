/* eslint-disable
  class-methods-use-this,
*/

/**
 * A basic View class. The View class does not have much functionality itself. It instead documents certain conventions regarding how the View class should operate.
 * @memberof core
 * @instance
 */
export default class View {

  /**
   * A reference to the HTML element for this View.
   * @type {HTMLElement}
   */
  el;

  /**
   * Use an `addListeners()` method to attach listeners to an element. The `addListeners()` method of the base View class is a no-op. View subclasses should overwrite this method.
   */
  addListeners() { /* no-op */ }

  /**
   * The `render()` method of the base View class is a no-op. View subclasses should overwrite this method with one that returns the rendered DOM element or a document fragment, and sets the `el` property on the View. Views should not insert themselves into the DOM—that is the responsibility of their controller. Views should however attach event listeners to their elements.
   * @return {HTMLElement|DocumentFragment}
   */
  render() { /* no-op */ }

}
