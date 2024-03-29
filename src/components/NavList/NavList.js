import List   from '../List/List.js';
import styles from './NavList.less';

/**
 * A class that extends the basic List view with a current item indicator.
 */
export default class NavList extends List {

  styles = styles;

  constructor(data, options = {}) {
    super(data, options);
    this.name = options.name ?? `item`;
  }

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
    super.render(); // calls this.loadStyles() internally
    this.el.classList.add(`nav-list`);
    if (id) this.setCurrentItem(id);
    this.addEventListeners();
    return this.el;
  }

  setCurrentItem(id) {

    const items = Array.from(this.el.children);

    if (items.length) {

      //  clear the previous item

      const previousItem = items.find(item => item.classList.contains(`current`));

      if (previousItem) {
        previousItem.removeAttribute(`aria-current`);
        previousItem.classList.remove(`current`);
      }

      // set the current item

      const currentItem = items.find(item => item.dataset.id === id);

      if (currentItem) {
        currentItem.setAttribute(`aria-current`, this.name);
        currentItem.classList.add(`current`);
      }

    }

  }

}
