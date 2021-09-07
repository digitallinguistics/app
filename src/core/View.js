import EventEmitter from './EventEmitter.js';

/**
 * A basic View class. The View class does not have much functionality itself. It instead documents certain conventions regarding how the View class should operate.
 * @memberof core
 * @instance
 */
export default class View {

  /**
   * A reference to the HTML element for this View.
   * @type {HTMLElement}
   */
  el;

  /**
   * The event emitter for this view.
   * @type {EventEmitter}
   */
  events = new EventEmitter;

  /**
   * A reference to the `<template>` tag or templating function for this View.
   * @type {HTMLTemplateElement}
   */
  template = `<template></template>`;

  /**
   * Use an `addEventListeners()` method to attach listeners to an element. The `addEventListeners()` method of the base View class is a no-op. View subclasses should overwrite this method. This method is typically called at the end of the `render()` method.
   */
  addEventListeners() { /* no-op */ }

  /**
   * Clones the content of the `<template>` tag stored in the `template` property and returns it.
   * @returns {HTMLElement}
   */
  cloneTemplate() {
    return this.template.content.cloneNode(true).firstElementChild;
  }

  /**
   * The `render()` method of the base View class is a no-op. View subclasses should overwrite this method with one that returns the rendered DOM element or a document fragment, and sets the `el` property on the View. Views should not insert themselves into the DOM—that is the responsibility of their controller. Views should however attach event listeners to their elements.
   * @return {HTMLElement|DocumentFragment}
   */
  render() { /* no-op */ }

}
