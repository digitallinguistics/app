import View from '../../core/View.js';

/**
 * A controller for the Main Nav.
 */
export default class MainNav extends View {

  button = document.querySelector(`#nav button`);

  pages = document.querySelector(`#nav ul`);

  constructor({ el } = {}) {
    super();
    this.el = el;
  }

  addEventListeners() {

    this.button.addEventListener(`click`, this.toggle.bind(this));

    this.pages.addEventListener(`click`, ev => {

      const { page } = ev.target.closest(`li`).dataset;

      if (page) {
        ev.preventDefault();
        this.setPage(page);
        this.events.emit(`change`, page);
      }

    });

  }

  render(page, { open = `true` } = {}) {
    this.el ??= document.getElementById(`nav`);
    this.addEventListeners();
    this.button.setAttribute(`aria-expanded`, open);
    if (page) this.setPage(page);
    this.el.view = this;
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
    this.events.emit(`toggle`, { expanded: !expanded });
  }

}
