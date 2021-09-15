import View from '../../core/View.js';

/**
 * A class representing an view for a list of items
 * @memberof core
 * @instance
 * @extends core#View
 */
export default class List extends View {

  /**
   * The collection of models to render in this list.
   * @type {Array<core#Model>}
   */
  collection = [];

  /**
   * A reference to the `<ul>` for the current list, if rendered
   * @type {HTMLULElement}
   */
  el;

  /**
   * The templating function for rendering each item in the list. Should return a `<li>` as either an HTML string or an HTML element. Make sure the template function is bound to its original context to retain any encapsulated variables.
   * @type {Function}
   */
  template = List.#defaultTemplate;

  /**
   * Create a new List View
   * @param {Array}    [collection=[]]       The collection of models to render in the list. Defaults to an empty array.
   * @param {Object}   [options={}]          An optional options hash
   * @param {Array}    [options.classes=[]]  An Array of classes to add to the list.
   * @param {String}   [options.name=`item`] The name of each item
   * @param {Function} [options.template]    A templating function that accepts a model and returns a `<li>` element. This function will be used by the render method to render the list.
   */
  constructor(collection = [], {
    classes = [],
    name = `item`,
    template = List.#defaultTemplate,
  } = {}) {

    super();

    this.classes    = classes;
    this.collection = collection;
    this.name       = name;
    this.template   = template;

  }

  addEventListeners() {
    this.el.addEventListener(`click`, ({ target }) => {

      const li = target.closest(`LI`);
      const id = li?.dataset?.id;

      if (id) {
        this.setCurrentItem(id);
        this.events.emit(`change`, id);
      }

    });
  }

  /**
   * Renders the list and saves it to List.el
   * @return {HTMLUListElement}
   */
  render(id) {

    this.el      = document.createElement(`ul`);
    this.el.view = this;

    this.el.classList.add(`list`);

    for (const className of this.classes) {
      this.el.classList.add(className);
    }

    this.collection
    .map(this.template.bind(this))
    .forEach(item => this.el.appendChild(item));

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

  /**
   * The default template to use for each item in the list
   * @name defaultTemplate
   * @type {Function}
   * @memberof core#List
   * @static
   * @return {String}
   */
  static #defaultTemplate = () => document.createElement(`li`);

}
