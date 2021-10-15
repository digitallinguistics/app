import Language       from '../../models/Language.js';
import LanguageEditor from './LanguageEditor/LanguageEditor.js';
import LanguagesNav   from './LanguagesNav/LanguagesNav.js';
import styles         from './Languages.less';
import template       from './Languages.hbs';
import View           from '../../core/View.js';

export default class LanguagesPage extends View {

  /**
   * An Array of the languages on this page.
   * @type {Array}
   */
  languages;

  /**
   * Create a new Languages Page view.
   * @param {Array<models#Language>} [languages=[]]
   */
  constructor(languages = []) {
    super({ styles, template });
    this.languages = languages;
  }

  async addLanguage() {
    let language = new Language;
    language.autonym.set(`default`, ``);
    language.name.set(`eng`, `{ new language }`);
    language = await app.db.languages.add(language);
    this.languages.push(language);
    app.settings.language = language.cid;
    this.renderNav(language.cid);
    return this.renderEditor(language.cid);
  }

  async deleteLanguage(languageCID) {
    const confirmed = prompt(`Are you sure you want to delete this Language? The data can be recovered at any time by opening the Application tab in Developer Tools, finding this language in IndexedDB, and removing the "deleted" property. Type "YES" to delete.`);
    if (confirmed !== `YES`) return;
    await app.db.languages.delete(languageCID);
    app.settings.language = null;
    const i = this.languages.findIndex(lang => lang.cid === languageCID);
    this.languages.splice(i, 1);
    this.renderNav();
    return this.renderEditor();
  }

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render(languageCID) {
    this.loadStyles();
    this.cloneTemplate();
    this.renderNav(languageCID);
    this.renderEditor(languageCID);
    return this.el;
  }

  /**
   * Render the Language Editor.
   * @param {String} languageCID
   */
  renderEditor(languageCID) {

    const language = this.languages.find(lang => lang.cid === languageCID);
    let newEditor;

    if (language) {

      // render full editor
      const editorView = new LanguageEditor(language);
      editorView.events.once(`add`, this.addLanguage.bind(this));
      editorView.events.on(`delete`, this.deleteLanguage.bind(this));
      editorView.events.on(`update:name`, this.renderNav.bind(this));
      newEditor = editorView.render();

    } else {

      // render placeholder editor
      app.settings.language = null;
      const template = document.getElementById(`language-editor-template`);
      newEditor = template.content.cloneNode(true).firstElementChild;
      newEditor.classList.add(`placeholder`);
      newEditor.querySelector(`.js-language-editor__add-language-button`)
      .addEventListener(`click`, this.addLanguage.bind(this));

    }

    const oldEditor = this.el.querySelector(`.language-editor`);

    oldEditor.view?.events.stop();
    oldEditor.replaceWith(newEditor);

    return newEditor;

  }

  /**
   * Render the Languages Nav.
   * @param {String} [languageCID] The client ID of the language to show as selected when the nav list renders.
   */
  renderNav(languageCID) {

    const nav = new LanguagesNav(this.languages);

    nav.events.on(`add`, this.addLanguage.bind(this));
    nav.events.on(`change`, this.renderEditor.bind(this));

    const oldNav = this.el.querySelector(`.languages-nav`);
    const newNav = nav.render(languageCID);

    oldNav.view?.events.stop();
    oldNav.replaceWith(newNav);

    return newNav;

  }

}
