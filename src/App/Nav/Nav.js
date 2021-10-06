import View from '../../core/View.js';

/**
 * A controller for the Main Nav.
 */
export default class MainNav extends View {

  button = document.querySelector(`#nav button`);

  pages = document.querySelector(`#nav ul`);

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

  render(page) {
    this.el = document.getElementById(`nav`);
    this.addEventListeners();
    this.button.setAttribute(`aria-expanded`, app.settings.navOpen ?? `true`);
    if (page) this.setPage(page);
    this.el.view           = this;
    this.el.dataset.loaded = true;
    return this.el;
  }

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

  toggle() {
    const expanded = this.button.getAttribute(`aria-expanded`) === `true`;
    this.button.setAttribute(`aria-expanded`, !expanded);
    app.settings.navOpen = !expanded;
  }

}
