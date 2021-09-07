import View from '../../core/View.js';

export default class HomePage extends View {

  /**
   * A reference to the Home page `<template>` tag.
   * @type {HTMLTemplateElement}
   */
  template;

  /**
   * Render the Home Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.template = document.getElementById(`home-template`);
    return this.cloneTemplate();
  }

}
