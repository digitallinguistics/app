// import LanguageEditor from './LanguageEditor/LanguageEditor.js';
import LanguagesList  from './LanguagesList/LanguagesList.js';
import View           from '../../core/View.js';

export default class LanguagesPage extends View {

  /**
   * A reference to the Languages Page element.
   * @type {HTMLMainElement}
   */
  el = document.querySelector(`main[data-page=Languages]`);

  /**
   * An Array of the languages on this page.
   * @type {Array}
   */
  languages;

  /**
   * A reference to the Languages page `<template>`.
   * @type {HTMLTemplateElement}
   */
  template = document.getElementById(`languages-page-template`);

  /**
   * Create a new Languages Page view.
   * @param {Array<models#Language>} languages
   */
  constructor(languages) {
    super();
    this.languages = languages;
  }

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render(languageCID) {
    this.el = this.cloneTemplate();
    this.renderLanguagesList(languageCID);
    // TODO: if (languageCID) this.renderLanguageEditor(languageCID);
    return this.el;
  }

  /**
   * Render the Language Editor.
   * @param {Language} languageCID
   */
  // renderLanguageEditor(languageCID) {
  //   const language = this.languages.find(lang => lang.cid === languageCID);
  //   const editor   = new LanguageEditor(language);
  //   editor.render();
  //   this.el.querySelector(`.language-editor`)
  //   .replaceWith(editor.el);
  // }

  /**
   * Render the Languages List.
   * @param {String} [languageCID] The client ID of the language to show as selected when the list renders.
   */
  renderLanguagesList(languageCID) {
    const list = new LanguagesList(this.languages);
    list.render(languageCID);
    this.el.querySelector(`.languages-list`)
    .replaceWith(list.el);
  }

}
