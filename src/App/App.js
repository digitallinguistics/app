import Database  from '../services/Database.js';
import Mousetrap from 'mousetrap';
import Nav       from './Nav/Nav.js';
import Settings  from '../services/Settings.js';
import View      from '../core/View.js';

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
    info:      document.getElementById(`info`),
    templates: document.getElementById(`templates`),
  }

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
    return this.db.initialize();
  }

  /**
   * Asynchronously load the HTML template (including CSS) for a page and insert it as a `<template id={Page}-template>` in the app shell for repeated use. Also load the JavaScript module for the page, and store it in {@link App##pages} Map for repeated use.
   * @async
   * @param {String} page the page to load: `Home`, `Languages`, etc.
   */
  async #loadPage(page) {

    // load page view
    const { default: PageView } = await import(`../pages/${ page }/${ page }.js`);
    this.#pages.set(page, PageView);

    // load HTML
    const response = await fetch(`../pages/${ page }/${ page }.html`);
    const html     = await response.text();
    const div      = document.createElement(`div`);

    div.setAttribute(`id`, `${ page.toLowerCase() }-page-templates`);
    div.innerHTML = html;
    this.#nodes.templates.appendChild(div);

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

  /**
   * Render the Main Nav.
   */
  #renderNav() {
    this.#nav.render(this.settings.page);
    this.#nav.events.on(`change`, this.#renderPage.bind(this));
  }

  /**
   * Render a specific page.
   * @param {String} page the page to render (`Home`, `Languages`, etc.)
   */
  async #renderPage(page) {

    this.settings.page = page;
    this.#nav.setPage(this.settings.page);

    if (!this.#pages.has(page)) {
      await this.#loadPage(page);
    }

    let newPage;

    switch (this.settings.page) {
        case `Home`: newPage = await this.#renderHomePage(); break;
        case `Languages`: newPage = await this.#renderLanguagesPage(); break;
        default: break;
    }

    const oldPage = document.getElementById(`main`);

    oldPage.view?.events.stop();
    oldPage.replaceWith(newPage);
    this.announce(`${ page } page`);

  }

  // PAGES

  /**
   * Render the Home page.
   * @returns {HTMLElement} the Home page element
   */
  #renderHomePage() {
    const HomePage = this.#pages.get(`Home`);
    const homePage = new HomePage;
    return homePage.render();
  }

  /**
   * Render the Languages page.
   * @returns {HTMLElement} the Languages page element
   */
  async #renderLanguagesPage() {
    const LanguagesPage = this.#pages.get(`Languages`);
    const languages     = await this.db.languages.getAll();
    const languagesPage = new LanguagesPage(languages);
    return languagesPage.render(this.settings.language);
  }

  // STATIC

  /**
   * The default settings for the App.
   */
  static #defaultSettings = {
    page: `Home`,
  }

}

export default App;

// JSDoc Virtual Comments

/**
 * The custom JavaScript framework used by the Lotus app.
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
