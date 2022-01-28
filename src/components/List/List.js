import styles from './List.less';
import View   from '../../core/View.js';

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
   * List styles.
   */
  styles = styles;

  /**
   * Create a new List View
   * @param {Array}    [collection=[]]      The collection of models to render in the list. Defaults to an empty array.
   * @param {Object}   [options={}]         An optional options hash
   * @param {Array}    [options.classes=[]] An Array of classes to add to the list.
   * @param {Function} [options.template]   A templating function that accepts a model and returns a `<li>` element. This function will be used by the render method to render the list.
   */
  constructor(collection = [], {
    classes = [],
    template,
  } = {}) {

    super();

    this.classes    = classes;
    this.collection = collection;

    if (template) this.renderItem = template;

  }

  render() {

    this.loadStyles();

    this.el      = document.createElement(`ul`);
    this.el.view = this;

    for (const className of this.classes) {
      this.el.classList.add(className);
    }

    this.collection
    .map(this.renderItem.bind(this))
    .forEach(item => this.el.appendChild(item));

    return this.el;

  }

  // NOTE: Do not name this "template", because it conflicts with the View's template.
  renderItem() {
    return document.createElement(`li`);
  }

}
