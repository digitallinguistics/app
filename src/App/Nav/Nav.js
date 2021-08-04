/**
 * A class for the main navigation menu.
 * @memberof app
 * @instance
 * @extends core#View
 */
export default class Nav extends View {

  /**
   * A reference to the main navigation element.
   * @type {HTMLNavElement}
   */
  el = document.getElementById(`nav`);

  /**
   * Adds event listeners to the nav
   */
  addEventListeners() {

    this.menuButton.addEventListener(`click`, this.toggle.bind(this));

    this.pagesList.addEventListener(`click`, ev => {
      ev.preventDefault();
      this.setPage(ev.target.closest(`li`).dataset.page);
    });

  }

  /**
   * Initialize the nav view
   */
  render() {
    this.setPage(app.settings.page, { emit: false });
    this.addEventListeners();
    this.menuButton.setAttribute(`aria-expanded`, app.settings.navOpen ?? `true`);
    return this.el;
  }

  /**
   * Adds the aria-describedby attribute to the indicated page
   * @param {String}  [page=`home`]       The page route to set as current.
   * @param {Object}  [options={}]
   * @param {Boolean} [options.emit=true] Whether to emit an event when the page is set.
   */
  setPage(page = `home`, { emit = true } = {}) {

    // clear currently selected page from all items

    Array.from(this.el.querySelectorAll(`a`))
    .forEach(item => {
      item.removeAttribute(`aria-describedby`);
      item.classList.remove(`current`);
    });

    // set the currently selected page

    const currentItem = this.el.querySelector(`li[data-page="${ page }"] a`);

    if (currentItem) {
      currentItem.setAttribute(`aria-describedby`, `current-page`);
      currentItem.classList.add(`current`);
    }

    // TODO: uncomment this when the event bus is added to the app controller
    // if (emit) app.events.emit(`App:Nav:change`, page);

  }

  /**
   * Toggles the expanded/collapsed state of the nav
   */
  toggle() {
    const expanded = this.menuButton.getAttribute(`aria-expanded`) === `true`;
    this.menuButton.setAttribute(`aria-expanded`, !expanded);
    app.settings.navOpen = !expanded;
  }

}
