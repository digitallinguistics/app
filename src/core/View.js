import EventEmitter from './EventEmitter.js';
import html2element from '../utilities/html2element.js';

/**
 * A base class for Views. Most components should extend the View class. The View class itself does not have much functionality. Instead it documents conventions for how Views should operate. Views in the Lotus app also function as Controllers.
 * @memberof Core
 */
export default class View {

  /**
   * A reference to the HTML element for this view.
   * @abstract
   * @type {HTMLElement}
   */
  el;
  
  /**
   * The event emitter for this view.
   * @type {EventEmitter}
   */
  events = new EventEmitter;

  /**
   * A reference to the `<template>` tag containing the template for this view, an HTML template string, or a templating function, for use by the {@link View#render} function. This property should be overwritten by view instances.
   * @abstract
   */
  template;

  /**
   * Attach event listeners to the element or its children. This method is typically called near the end of the {@link View#render} method. This method should be overwritten by view instances.
   * @abstract
   */
  addEventListeners() { /* no-op */ }

  /**
   * Clone the content of the `<template>` element referenced by the {@link View#template} property and returns it. This method should only be called if the value of the {@link View#template} property is a reference to an HTML `<template>` element.
   * @returns {HTMLElement}
   */
  cloneTemplate() {
    return this.template.content.cloneNode(true).firstElementChild;
  }

  /**
   * Set the attributes for any elements within the DOM tree for this view based on the value of the `data-bind` attribute. The value of the `data-bind` attribute should be `{attr}:{prop}`, where `attr` is the name of the attribute to set on the element, and `prop` is the property on the view that contains the value to use for that attribute. For example, if the view has a property `inputName: 'cid'`, using `data-bind=name:inputName` will set the `name` attribute of the element to `'cid'`. Multiple `data-bind` directives may be separated by semicolons.
   */
  hydrate() {
    for (const el of this.el.querySelectorAll(`[data-bind]`)) {
      const attributes = el.dataset.bind.split(/\s*;\s*/u).filter(Boolean);
      for (const attribute of attributes) {
        const [attr, prop] = attribute.split(/\s*:\s*/u);
        if (typeof this[prop] !== `undefined`) el.setAttribute(attr, this[prop]);
      }
    }
  }

  /**
   * Compile the DOM tree for this view, set the value of `this.el` to the element for this view, and return that element. Views should not insert themselves into the DOM; this is the responsibility of their parent view/controller. Views should however attach event listeners to their elements by calling {@link View#addEventListeners}. This method should be overwritten by view instances.
   * @abstract
   */
  render() { /* no-op */ }

  // UTILITY METHODS

  /**
   * @static
   * @type {Utilities.html2element}
   */
  static fromHTML = html2element;

}
