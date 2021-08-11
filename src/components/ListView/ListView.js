import View from '../../core/View.js';

/**
 * A class representing an view for a list of items
 * @memberof core
 * @instance
 * @extends core#View
 */
export default class ListView extends View {

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
  template = ListView.defaultTemplate;

  /**
   * Create a new List View
   * @param {Array}    [collection=[]]    The collection of models to render in the list. Defaults to an empty array.
   * @param {Object}   [options={}]       An optional options hash
   * @param {Function} [options.template] A templating function that accepts a model and returns a `<li>` element. This function will be used by the render method to render the list.
   */
  constructor(collection = [], { template = ListView.defaultTemplate } = {}) {

    super();

    this.collection = collection;
    this.template   = template;

  }

  /**
   * Renders the list and saves it to ListView.el
   * @return {HTMLUListElement}
   */
  render() {

    this.el = document.createElement(`ul`);

    this.el.classList.add(`list`);

    this.collection
    .map(item => this.template(item))
    .forEach(item => this.el.appendChild(item));

    return this.el;

  }

  /**
   * The default template to use for each item in the list
   * @name defaultTemplate
   * @type {Function}
   * @memberof core#ListView
   * @static
   * @return {String}
   */
  static defaultTemplate = () => document.createElement(`li`);

}
