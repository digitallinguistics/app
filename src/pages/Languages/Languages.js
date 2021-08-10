import View from '../../core/View.js';

export default class LanguagesPage extends View {

  /**
   * A reference to the Languages page `<template>`.
   * @type {HTMLTemplateElement}
   */
  template = document.getElementById(`languages-page-template`);

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render() {
    return this.cloneTemplate();
  }

}
