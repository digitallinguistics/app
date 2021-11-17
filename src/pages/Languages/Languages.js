import compare        from '../../utilities/compare.js';
import Language       from '../../models/Language.js';
import LanguageEditor from './LanguageEditor/LanguageEditor.js';
import NavList        from '../../components/NavList/NavList.js';
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

  addEventListeners() {
    this.el.querySelector(`.js-languages-page__nav-add-lang-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));
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

  initialize(languageCID) {
    this.addEventListeners();
    this.renderEditor(languageCID);
    this.renderNav(languageCID);
  }

  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#language-editor>${ name.default }</a></li>`);
  }

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.loadStyles();
    this.cloneTemplate();

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
      this.editorView = new LanguageEditor(language);
      this.editorView.events.once(`add`, () => this.events.emit(`add`));
      this.editorView.events.on(`delete`, this.deleteLanguage.bind(this));
      this.editorView.events.on(`update:name`, this.renderNav.bind(this));
      newEditor = this.editorView.render();

    } else {

      // render placeholder editor
      app.settings.language = null;
      this.editorView = new LanguageEditor;
      this.editorView.events.on(`add`, () => this.events.emit(`add`));
      newEditor = this.editorView.render();

    }

    const oldEditor = this.el.querySelector(`.language-editor`);

    oldEditor.view?.events.stop();
    oldEditor.replaceWith(newEditor);

    this.editorView.initialize();

    return newEditor;

  }

  /**
   * Render the Languages Nav.
   * @param {String} [languageCID] The client ID of the language to show as selected when the nav list renders.
   */
  renderNav(languageCID) {

    this.languages.sort((a, b) => a.name.default.localeCompare(b.name.default, undefined, {
      sensitivity: `base`,
    }));

    const oldList = this.el.querySelector(`.js-languages-page__languages-list`);
    const classes = Array.from(oldList.classList);

    const listView = new NavList(this.languages, {
      classes,
      name:     `language`,
      template: this.itemTemplate,
    });

    const newList = listView.render(languageCID);

    oldList.view?.events.stop();
    if (!this.languages.length) newList.style.border = `none`;
    oldList.replaceWith(newList);

    listView.events.on(`change`, cid => {
      app.settings.language = cid;
      this.renderEditor(cid);
    });

  }

}
