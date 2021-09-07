import View from '../../core/View.js';

/**
 * A class for the main navigation menu.
 * @memberof app
 * @instance
 * @extends core#View
 */
export default class Nav extends View {

  /**
   * A reference to the menu button
   * @type {HTMLButtonElement}
   */
  button = document.querySelector(`#nav button`);

  /**
   * A reference to the list of pages in the na
   * @type {HTMLULElement}
   */
  pages = document.querySelector(`#nav ul`);

  /**
   * Adds event listeners to the nav
   */
  addEventListeners() {

    this.button.addEventListener(`click`, this.toggle.bind(this));

    this.pages.addEventListener(`click`, ev => {

      // NOTE: `LI` must be capitalized for `.closest()` to work properly.
      const { page } = ev.target.closest(`LI`).dataset;

      if (page) {
        ev.preventDefault();
        this.setPage(page);
        this.events.emit(`change`, page);
      }

    });

  }

  /**
   * Initialize the nav view
   * @param {String} [page] The page to set as selected.
   */
  render(page) {
    this.el = document.getElementById(`nav`);
    this.addEventListeners();
    this.button.setAttribute(`aria-expanded`, app.settings.navOpen ?? `true`);
    if (page) this.setPage(page);
    this.el.view           = this;
    this.el.dataset.loaded = true;
    return this.el;
  }

  /**
   * Sets the current page
   * @param {String}  page The page route to set as current.
   */
  setPage(page) {

    // clear currently selected page from all items

    Array.from(this.el.querySelectorAll(`a`))
    .forEach(item => {
      item.removeAttribute(`aria-current`);
      item.classList.remove(`current`);
    });

    // set the currently selected page

    const currentItem = this.el.querySelector(`li[data-page="${ page }"] a`);

    if (currentItem) {
      currentItem.setAttribute(`aria-current`, `page`);
      currentItem.classList.add(`current`);
    }

  }

  /**
   * Toggles the expanded/collapsed state of the nav
   */
  toggle() {
    const expanded = this.button.getAttribute(`aria-expanded`) === `true`;
    this.button.setAttribute(`aria-expanded`, !expanded);
    app.settings.navOpen = !expanded;
  }

}
