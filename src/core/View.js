import EventEmitter from './EventEmitter.js';
import html2element from '../utilities/html2element.js';

/**
 * A base class for Views. Most components should extend the View class. The View class itself does not have much functionality. Instead it documents conventions for how Views should operate. Views in the Lotus app also function as Controllers.
 * @memberof Core
 */
export default class View {

  /**
   * A reference to the HTML element for this view.
   * @type {HTMLElement}
   */
  el;

  /**
   * The event emitter for this view.
   * @type {EventEmitter}
   */
  events = new EventEmitter;

  /**
   * A reference to the `<template>` tag containing the template for this view, an HTML template string, or a templating function, for use by the {@link View#render} function. This property should be overwritten by view instances. Note that the {@link View#cloneTemplate} method assumes that the value of this property is a `<template>` tag.
   * @type {HTMLTemplateElement}
   */
  template;

  /**
   * The CSS styles for this component (as a String).
   * @type {String}
   */
  styles;

  /**
   * Create a new View.
   * @param {Object} [options={}]          An options Object.
   * @param {String} [options.styles=``]   CSS styles for this view.
   * @param {String} [options.template=``] The HTML template String for this view.
   */
  constructor({ styles = ``, template = `` } = {}) {
    this.styles             = styles;
    this.template           = document.createElement(`template`);
    this.template.innerHTML = template;
  }

  /**
   * Attaches event listeners to the element or its children. This method is typically called near the end of the {@link View#render} method. This method should be overwritten by View instances.
   * @abstract
   */
  addEventListeners() { /* no-op */ }

  /**
   * Clones the content of the `<template>` element referenced by the {@link View#template} property and sets it to `this.el`, as well as returns the clone. This method should only be called if the value of the {@link View#template} property is a reference to an HTML `<template>` element.
   * @returns {HTMLElement}
   */
  cloneTemplate() {
    this.el = this.template.content.cloneNode(true).firstElementChild;
    this.el.view = this;
    return this.el;
  }

  /**
   * Loads the styles for this component as a `<style>` tag in the page header. Does not load the styles if the `<style>` tag for this component is already present on the page.
   */
  loadStyles() {

    const id       = `${ this.constructor.name }-styles`;
    let   styleTag = document.getElementById(id);

    if (styleTag) return;

    styleTag = document.createElement(`style`);
    styleTag.setAttribute(`id`, id);
    styleTag.innerHTML = this.styles;
    document.head.appendChild(styleTag);

  }

  /**
   * Compiles the DOM tree for this view, sets the value of `this.el` to the element for this view, and returns that element. Views should not insert themselves into the DOM; this is the responsibility of their parent view/controller. Views should however attach event listeners to their elements by calling {@link View#addEventListeners}. They typically also call `loadStyles()` to load their CSS styles into the `<head>` tag. The `render()` method should be overwritten by View instances.
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
