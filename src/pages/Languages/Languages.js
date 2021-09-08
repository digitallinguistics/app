import compare        from '../../utilities/compare.js';
import Language       from '../../models/Language.js';
import LanguageEditor from './LanguageEditor/LanguageEditor.js';
import LanguagesList  from './LanguagesList/LanguagesList.js';
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
    super();
    this.languages = languages;
  }

  async addLanguage() {
    let language = new Language;
    language.name.set(`eng`, `{ new language }`);
    language = await app.db.languages.add(language);
    this.languages.push(language);
    app.settings.language = language.cid;
    await this.renderList(language.cid);
    await this.renderEditor(language.cid);
  }

  async deleteLanguage(languageCID) {
    const confirmed = prompt(`Are you sure you want to delete this Language? The data can be recovered at any time by opening the Application tab in Developer Tools, finding this language in IndexedDB, and removing the "deleted" property. Type "YES" to delete.`);
    if (confirmed !== `YES`) return;
    await app.db.languages.delete(languageCID);
    app.settings.language = null;
    const i = this.languages.findIndex(lang => lang.cid === languageCID);
    this.languages.splice(i, 1);
    this.renderList();
    this.renderEditor();
  }

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render(languageCID) {
    this.template = document.getElementById(`languages-template`);
    this.el       = this.cloneTemplate();
    this.el.view  = this;
    this.renderList(languageCID);
    this.renderEditor(languageCID);
    // NOTE: Event listeners are added in individual rendering methods.
    return this.el;
  }

  renderBlankEditor() {
    const oldEditor = this.el.querySelector(`.language-editor`);
    const newEditor = View.fromHTML(`<section class=language-editor>
      <button type=button class='add-language-button red'>Add a Language</button>
    </section>`);
    oldEditor.view?.events.stop();
    oldEditor.replaceWith(newEditor);
    newEditor.querySelector(`button`)
    .addEventListener(`click`, this.addLanguage.bind(this));
  }

  /**
   * Render the Language Editor.
   * @param {String} languageCID
   */
  renderEditor(languageCID) {

    const language = this.languages.find(lang => lang.cid === languageCID);

    if (!language) app.settings.language = null;

    const editor    = new LanguageEditor(language);
    const newEditor = language ? editor.render() : editor.renderBlank();
    const oldEditor = this.el.querySelector(`.language-editor`);

    oldEditor.view?.events.stop();
    oldEditor.replaceWith(newEditor);
    editor.events.once(`add`, this.addLanguage.bind(this));
    editor.events.once(`delete`, this.deleteLanguage.bind(this));
    editor.events.on(`update:name`, this.renderList.bind(this));

  }

  /**
   * Render the Languages List.
   * @param {String} [languageCID] The client ID of the language to show as selected when the list renders.
   */
  renderList(languageCID) {

    this.languages.sort((a, b) => compare(a.name.default, b.name.default));

    const list    = new LanguagesList(this.languages);
    const newList = list.render(languageCID);
    const oldList = this.el.querySelector(`.languages-list`);

    oldList.view?.events.stop();
    oldList.replaceWith(newList);

    list.events.on(`add`, this.addLanguage.bind(this));
    list.events.on(`change`, this.renderEditor.bind(this));

  }

}
