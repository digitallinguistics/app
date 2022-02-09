import Database        from '../services/Database.js';
import HelpMenu        from './HelpMenu/HelpMenu.js';
import Language        from '../models/Language.js';
import LanguageChooser from './LanguageChooser/LanguageChooser.js';
import Mousetrap       from 'mousetrap';
import Nav             from './Nav/Nav.js';
import { pascalCase }  from 'pascal-case';
import Settings        from '../services/Settings.js';
import sort            from '../utilities/sort.js';
import View            from '../core/View.js';

/**
 * The controller for the App. The App API is available globally to all components under `window.app` (or just `app`).
 * @extends View
 * @global
 */
class App extends View {

  // PROPERTIES

  /**
   * A reference to the Azure App Insights SDK (production only).
   * @type {Object}
   */
  appInsights;

  /**
   * A reference to the local database module.
   * @type {Database}
   */
  db = new Database;

  /**
   * A reference to the app `<body>` tag.
   */
  el = document.getElementById(`app`);

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
   * A boolean indicating whether the app is currently running on production.
   * @type {Boolean}
   */
  production = location.hostname === `app.digitallinguistics.io`;

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
   * Attach event listeners to app shell components.
   */
  addEventListeners() {
    this.nav.events.on(`change`, this.displayPage.bind(this));
    this.nav.events.on(`toggle`, ({ expanded }) => { this.settings.navOpen = expanded; });
  }

  /**
   * Add a new language and rerender the Languages page.
   * @return {Promise}
   */
  async addLanguage() {

    let language = new Language;

    language.autonym.set(`default`, ``);
    language.name.set(`eng`, `{ new language }`);

    language = await this.db.languages.add(language);

    this.settings.language = language.cid;
    this.settings.lexeme   = null;

    this.clearLanguagePages();

    return this.displayPage(`languages`);

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

    this.clearLanguagePages();
    return this.displayPage(this.settings.page);

  }

  clearLanguagePages() {

    const languageChooser = document.getElementById(`language-chooser`);
    if (languageChooser) languageChooser.remove();

    const languagesPage = document.getElementById(`languages-page`);
    if (languagesPage) languagesPage.remove();

    const lexiconPage = document.getElementById(`lexicon-page`);
    if (lexiconPage) lexiconPage.remove();

  }

  async deleteLanguage(languageCID) {

    await this.db.languages.delete(languageCID);

    this.settings.language = null;
    this.settings.lexeme   = null;

    this.clearLanguagePages();
    return this.displayPage(this.settings.page);

  }

  /**
   * Display a page, rendering it if necessary.
   * @param {String} page The page to display (in lowercase).
   */
  async displayPage(page) {

    if (page !== `language-chooser`) {
      this.settings.page = page;
      this.nav.setPage(page);
    }

    const mains = Array.from(document.getElementsByClassName(`main`));

    for (const main of mains) {
      main.hidden = true;
    }

    const targetPage = mains.find(main => main.dataset.page === page);

    if (targetPage) targetPage.hidden = false;
    else await this.renderPage(page);

    this.announce(`${ page } page`);

    if (this.production && navigator.onLine) {
      this.appInsights.trackPageView({ name: page });
    }

  }

  /**
   * Initialize the App.
   */
  async initialize() {
    await this.db.initialize();
    this.helpMenu.initialize();
    this.nav.render(this.settings.page, { open: this.settings.navOpen });
    this.displayPage(this.settings.page); // async
    this.addEventListeners();
    await this.initializeAppInsights();
    return this.el;
  }

  async initializeAppInsights() {
    if (this.production) {
      const { appInsights } = await import(`../services/AppInsights.js`);
      this.appInsights = appInsights;
      this.appInsights.loadAppInsights();
    }
  }

  /**
   * Render a specific page. This is the only method that should call page-rendering methods.
   * @param {String} page the page to render (`home`, `languages`, etc.)
   */
  async renderPage(page) {

    if (page === `language-chooser`) {
      return this.renderLanguageChooser();
    }

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
    const el       = homePage.render();

    this.nodes.wrapper.appendChild(el);

  }

  async renderLanguageChooser() {

    const languages = await this.db.languages.getAll();

    languages.sort((a, b) => sort(a.name.default, b.name.default));

    const languageChooser = new LanguageChooser(languages);

    languageChooser.events.on(`add`, this.addLanguage.bind(this));
    languageChooser.events.on(`select`, this.changeLanguage.bind(this));

    const el = languageChooser.render();

    this.nodes.wrapper.appendChild(el);

  }

  async renderLanguagesPage() {

    const languages = await this.db.languages.getAll();

    if (!languages.length) {
      return this.displayPage(`language-chooser`);
    }

    const LanguagesPage = this.pages.get(`languages`);
    const languagesPage = new LanguagesPage(languages);

    languagesPage.events.on(`add`, this.addLanguage.bind(this));
    languagesPage.events.on(`delete`, this.deleteLanguage.bind(this));

    const el = languagesPage.render(this.settings.language);

    this.nodes.wrapper.appendChild(el);

    languagesPage.initialize();

  }

  async renderLexiconPage() {

    if (!this.settings.language) {
      return this.displayPage(`language-chooser`);
    }

    const LexiconPage = this.pages.get(`lexicon`);
    const language    = await this.db.languages.get(this.settings.language);
    const query       = IDBKeyRange.only(this.settings.language);
    const lexemes     = await app.db.lexemes.getAll({ index: `lemma`, query });
    const lexiconPage = new LexiconPage(language, lexemes);
    const el          = lexiconPage.render(this.settings.lexeme);

    this.nodes.wrapper.appendChild(el);

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
