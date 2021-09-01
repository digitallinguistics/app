/**
 * A class representing a Language Editor.
 */
import View from '../../../core/View.js';

export default class LanguageEditor extends View {

  /**
   * A reference to the `<template>` tag for this view.
   * @type {HTMLTemplateElement}
   */
  template = document
  .getElementById(`languages-page-template`)
  .content
  .querySelector(`#language-editor-template`);

  /**
   * Create a new Language Editor
   * @param {models#Language} language
   */
  constructor(language) {
    super();
    this.language = language;
  }

  render() {
    this.el = this.cloneTemplate();
    return this.el;
  }

}
