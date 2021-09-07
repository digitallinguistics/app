import html2element   from '../../utilities/html2element.js';
import LanguageEditor from './LanguageEditor/LanguageEditor.js';
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
  template;

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
    this.template = document.getElementById(`languages-template`);
    this.el       = this.cloneTemplate();
    this.renderLanguagesList(languageCID);
    this.renderLanguageEditor(languageCID);
    return this.el;
  }

  renderAddLanguageButton() {
    const button = html2element(`<button type=button class=add-language-button>Add a Language</button>`);
    button.addEventListener(`click`, () => app.events.emit(`Languages:add`));
    const editor = this.el.querySelector(`.language-editor`);
    editor.appendChild(button);
  }

  /**
   * Render the Language Editor.
   * @param {String} languageCID
   */
  renderLanguageEditor(languageCID) {

    if (!this.languages.length) return this.renderAddLanguageButton();

    const language = this.languages.find(lang => lang.cid === languageCID);

    if (!language) {
      app.settings.language = null;
      return;
    }

    const languageEditor = new LanguageEditor(language);
    const newEditor      = languageEditor.render();
    const oldEditor      = this.el.querySelector(`.language-editor`);

    oldEditor.replaceWith(newEditor);

  }

  /**
   * Render the Languages List.
   * @param {String} [languageCID] The client ID of the language to show as selected when the list renders.
   */
  renderLanguagesList(languageCID) {
    const languagesList = new LanguagesList(this.languages);
    const newList       = languagesList.render(languageCID);
    const oldList       = this.el.querySelector(`.languages-list`);
    oldList.replaceWith(newList);
  }

}
