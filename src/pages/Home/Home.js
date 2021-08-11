import View from '../../core/View.js';

export default class HomePage extends View {

  /**
   * A reference to the Home page `<template>` tag.
   * @type {HTMLTemplateElement}
   */
  template = document.getElementById(`home-page-template`);

  /**
   * Render the Home Page.
   * @return {HTMLMainElement}
   */
  render() {
    return this.cloneTemplate();
  }

}
