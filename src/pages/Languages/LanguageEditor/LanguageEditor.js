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

  addEventListeners() {

    const deleteLanguageButton = this.el.querySelector(`.delete-language-button`);

    deleteLanguageButton.addEventListener(`click`, () => {
      app.events.emit(`Languages:delete`, this.language.cid);
    });

  }

  render() {
    this.el = this.cloneTemplate();
    this.addEventListeners();
    return this.el;
  }

}
