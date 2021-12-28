import Database        from '../services/Database.js';
import HelpMenu        from './HelpMenu/HelpMenu.js';
import Language        from '../models/Language.js';
import LanguageChooser from './LanguageChooser/LanguageChooser.js';
import Mousetrap       from 'mousetrap';
import Nav             from './Nav/Nav.js';
import { pascalCase }  from 'pascal-case';
import Settings        from '../services/Settings.js';
import View            from '../core/View.js';

/**
 * The controller for the App. The App API is available globally to all components under `window.app` (or just `app`).
 * @extends View
 * @global
 */
class App extends View {

  // PROPERTIES

  /**
   * A reference to the local database module.
   * @type {Database}
   */
  db = new Database;

  /**
   * A reference to the helpmenu controller.
   * @type {HelpMenu}
   */
  helpMenu = new HelpMenu;

  /**
   * A reference to the Main Nav controller.
   * @type {MainNav}
   */
  nav = new Nav;

  /**
   * A table of references to DOM nodes used by the App controller.
   * @type {Object}
   * @prop {HTMLElement} info
   * @prop {HTMLElement} wrapper
   */
  nodes = {
    info:    document.getElementById(`info`),
    wrapper: document.getElementById(`wrapper`),
  };

  /**
   * A Map of page Views, loaded dynamically when the page is requested.
   * @type {Map}
   */
  pages = new Map;

  /**
   * An object for persisting app/user settings. Saves to Local Storage.
   * @type {Settings}
   */
  settings = new Settings(JSON.parse(localStorage.getItem(`settings`) ?? `{}`));

  /**
   * An object for registering/unregistering keyboard shortcuts. See {@link https://craig.is/killing/mice} for complete documentation. The `shortcuts` property is a Mousetrap instance.
   */
  shortcuts = Mousetrap;

  // APP METHODS

  /**
   * Add a new language and show the Language Editor.
   */
  async addLanguage() {
    let language = new Language;
    language.autonym.set(`default`, ``);
    language.name.set(`eng`, `{ new language }`);
    language = await app.db.languages.add(language);
    this.settings.language = language.cid;
    this.settings.lexeme   = null;
    return this.displayPage(`Languages`);
  }

  /**
   * Announce text to screen readers by updating an ARIA live region.
   * @param {String} text the text to announce to screen readers
   */
  announce(text) {
    this.nodes.info.textContent = text;
  }

  /**
   * Change the current language.
   * @param {String} languageCID The CID of the language to switch to.
   */
  changeLanguage(languageCID) {

    this.settings.language = languageCID;
    this.settings.lexeme   = null;

    const lexiconPage = document.getElementById(`lexicon-page`);
    if (lexiconPage) lexiconPage.remove();

    this.displayPage(this.settings.page);

  }

  /**
   * Display a page, rendering it if necessary.
   * @param {String} page The page to display (in PascalCase).
   */
  async displayPage(page) {

    this.settings.page = page;
    this.nav.setPage(page);

    const mains = Array.from(document.getElementsByClassName(`main`));

    for (const main of mains) {
      main.setAttribute(`hidden`, ``);
    }

    const targetPage = mains.find(main => main.dataset.page === page);

    if (targetPage) targetPage.removeAttribute(`hidden`);
    else await this.renderPage(page);

    this.announce(`${ page } page`);

  }

  /**
   * Initialize the App. Must be called before {@link App#render}.
   * @async
   * @returns {Promise}
   */
  initialize() {
    this.helpMenu.initialize();
    return this.db.initialize();
  }

  /**
   * Render the Main Nav and last visited page. {@link App#initialize} must be called first.
   * @returns {Promise<HTMLElement>}
   */
  async render() {
    this.el      = document.getElementById(`app`);
    this.el.view = this;
    this.renderNav();
    await this.displayPage(this.settings.page);
    return this.el;
  }

  /**
   * Render the Main Nav.
   */
  renderNav() {
    this.nav.render(this.settings.page);
    this.nav.events.on(`change`, this.displayPage.bind(this));
  }

  /**
   * Render a specific page. This is the only method that should call page-rendering methods.
   * @param {String} page the page to render (`Home`, `Languages`, etc.)
   */
  async renderPage(page) {

    if (!this.pages.has(page)) {
      const Page = pascalCase(page);
      const { default: PageView } = await import(`../pages/${ Page }/${ Page }.js`);
      this.pages.set(page, PageView);
    }

    switch (page) {
        case `languages`: return this.renderLanguagesPage();
        case `lexicon`: return this.renderLexiconPage();
        default: return this.renderHomePage();
    }

  }

  // PAGES

  renderHomePage() {

    const HomePage = this.pages.get(`home`);
    const homePage = new HomePage;

    const oldPage = document.getElementById(`home-page`);
    const newPage = homePage.render();

    if (oldPage) oldPage.replaceWith(newPage);
    else this.nodes.wrapper.appendChild(newPage);

  }

  async renderLanguageChooser() {

    const languages       = await this.db.languages.getAll();
    const languageChooser = new LanguageChooser(languages);

    languageChooser.events.on(`add`, this.addLanguage.bind(this));
    languageChooser.events.on(`select`, this.changeLanguage.bind(this));

    const oldPage = document.getElementById(`language-chooser`);
    const newPage = languageChooser.render();

    if (oldPage) oldPage.replaceWith(newPage);
    else this.nodes.wrapper.appendChild(newPage);

  }

  async renderLanguagesPage() {

    const LanguagesPage = this.pages.get(`languages`);
    const languages     = await this.db.languages.getAll();
    const languagesPage = new LanguagesPage(languages);

    languagesPage.events.on(`add`, this.addLanguage.bind(this));

    const oldPage = document.getElementById(`languages-page`);
    const newPage = languagesPage.render(this.settings.language);

    if (oldPage) oldPage.replaceWith(newPage);
    else this.nodes.wrapper.appendChild(newPage);

  }

  async renderLexiconPage() {

    if (!this.settings.language) {
      return this.renderLanguageChooser();
    }

    const LexiconPage = this.pages.get(`lexicon`);
    const language    = await this.db.languages.get(this.settings.language);
    const query       = IDBKeyRange.only(this.language.cid);
    const lexemes     = await app.db.lexemes.getAll({ index: `lemma`, query });
    const lexiconPage = new LexiconPage(language, lexemes);
    const oldPage     = document.getElementById(`lexicon-page`);
    const newPage     = lexiconPage.render(this.settings.lexeme);

    if (oldPage) oldPage.replaceWith(newPage);
    else this.nodes.wrapper.appendChild(newPage);

  }

}

export default App;

// JSDoc Virtual Comments

/**
 * The custom vanilla JavaScript framework used by the Lotus app.
 * @namespace Core
 */

/**
 * Data models for each type of database object.
 * @namespace Models
 */

/**
 * External services like databases or APIs.
 * @namespace Services
 */

/**
 * JavaScript utilities.
 * @namespace Utilities
 */
