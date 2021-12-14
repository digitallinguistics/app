import Database        from '../services/Database.js';
import HelpMenu        from './HelpMenu/HelpMenu.js';
import Language        from '../models/Language.js';
import LanguageChooser from './LanguageChooser/LanguageChooser.js';
import Mousetrap       from 'mousetrap';
import Nav             from './Nav/Nav.js';
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
  #helpMenu = new HelpMenu;

  /**
   * A reference to the Main Nav controller.
   * @type {MainNav}
   */
  #nav = new Nav;

  /**
   * A table of references to DOM nodes used by the App controller.
   * @type {Object}
   * @prop {HTMLElement} info      - the ARIA live region where content is announced to screen readers
   * @prop {HTMLElement} templates - a `<div>` containing page templates
   */
  #nodes = {
    info: document.getElementById(`info`),
  };

  /**
   * A Map of page Views, loaded dynamically when the page is requested.
   * @type {Map}
   */
  #pages = new Map;

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
  async #addLanguage() {
    let language = new Language;
    language.autonym.set(`default`, ``);
    language.name.set(`eng`, `{ new language }`);
    language = await app.db.languages.add(language);
    this.settings.language = language.cid;
    return this.#renderPage(`Languages`);
  }

  /**
   * Announce text to screen readers by updating an ARIA live region.
   * @param {String} text the text to announce to screen readers
   */
  announce(text) {
    this.#nodes.info.textContent = text;
  }

  /**
   * Initialize the App. Must be called before {@link App#render}.
   * @async
   * @returns {Promise}
   */
  initialize() {
    this.#helpMenu.initialize();
    return this.db.initialize();
  }

  /**
   * Render the Main Nav and last visited page. {@link App#initialize} must be called first.
   * @returns {Promise<HTMLElement>}
   */
  async render() {
    this.el      = document.getElementById(`app`);
    this.el.view = this;
    this.#renderNav();
    await this.#renderPage(this.settings.page);
    return this.el;
  }

  async #createLanguageChooser() {

    const languages       = await this.db.languages.getAll();
    const languageChooser = new LanguageChooser(languages);

    languageChooser.events.on(`add`, this.#addLanguage.bind(this));

    languageChooser.events.on(`select`, cid => {
      this.settings.language = cid;
      this.#renderPage(this.settings.page);
    });

    return languageChooser;

  }

  /**
   * Render the Main Nav.
   */
  #renderNav() {
    this.#nav.render(this.settings.page);
    this.#nav.events.on(`change`, this.#renderPage.bind(this));
  }

  /**
   * Render a specific page. This is the only method that should call page-rendering methods.
   * @param {String} page the page to render (`Home`, `Languages`, etc.)
   */
  async #renderPage(page) {

    this.settings.page = page;
    this.#nav.setPage(this.settings.page);

    if (!this.#pages.has(page)) {
      const { default: PageView } = await import(`../pages/${ page }/${ page }.js`);
      this.#pages.set(page, PageView);
    }

    let pageView;

    switch (this.settings.page) {
        case `Languages`:
          pageView = await this.#createLanguagesPage();
          break;
        case `Lexicon`:
          pageView = await this.#createLexiconPage();
          break;
        default:
          pageView = this.#createHomePage();
          break;
    }

    const newPage = pageView.render();
    const oldPage = document.getElementById(`main`);

    oldPage.view?.events.stop();
    oldPage.replaceWith(newPage);
    pageView.initialize(this.settings.language);

    this.announce(`${ page } page`);

  }

  // PAGES

  /**
   * Render the Home page.
   * @returns {HTMLElement} the Home page element
   */
  #createHomePage() {
    const HomePage = this.#pages.get(`Home`);
    return new HomePage;
  }

  /**
   * Render the Languages page.
   * @returns {HTMLElement} the Languages page element
   */
  async #createLanguagesPage() {
    const LanguagesPage = this.#pages.get(`Languages`);
    const languages     = await this.db.languages.getAll();
    const languagesPage = new LanguagesPage(languages);
    languagesPage.events.on(`add`, this.#addLanguage.bind(this));
    return languagesPage;
  }

  async #createLexiconPage() {

    if (!this.settings.language) {
      return this.#createLanguageChooser();
    }

    const LexiconPage = this.#pages.get(`Lexicon`);
    const language    = await this.db.languages.get(this.settings.language);
    return new LexiconPage(language);

  }

  // STATIC

  /**
   * The default settings for the App.
   */
  static #defaultSettings = {
    page: `Home`,
  };

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
