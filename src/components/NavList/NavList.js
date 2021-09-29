import List from '../List/List.js';

/**
 * A class that extends the basic List view with a current item indicator.
 */
export default class NavList extends List {

  addEventListeners() {
    this.el.addEventListener(`click`, ev => {

      ev.preventDefault();

      const li = ev.target.closest(`li`);
      const id = li?.dataset?.id;

      if (id) {
        this.setCurrentItem(id);
        this.events.emit(`change`, id);
      }

    });
  }

  render(id) {
    super.render();
    this.el.classList.add(`list`);
    this.el.classList.add(`nav-list`);
    if (id) this.setCurrentItem(id);
    this.addEventListeners();
    return this.el;
  }

  setCurrentItem(id) {

    const items = Array.from(this.el.children);

    if (items.length) {

      //  clear the current item

      for (const item of items) {
        item.removeAttribute(`aria-current`);
        item.classList.remove(`current`);
      }

      // set the current item

      const currentItem = items.find(item => item.dataset.id === id);

      currentItem.setAttribute(`aria-current`, this.name);
      currentItem.classList.add(`current`);

    }

  }

}
