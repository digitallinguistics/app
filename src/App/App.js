/**
 * @namespace App
 */

import Database     from '../services/Database.js';
import EventEmitter from '../core/EventEmitter.js';
import Language     from '../models/Language.js';
import Nav          from './Nav/Nav.js';
import Settings     from '../core/Settings.js';
import View         from '../core/View.js';

/**
 * The top-level view for the app
 * @memberof App
 * @extends View
 * @instance
 */
export default class App extends View {

  // PROPERTIES

  /**
   * A reference to the local database controller.
   * @type {services#Database}
   */
  db = new Database;

  /**
   * The event manager for the app (uses a pubsub model)
   * @type {EventEmitter}
   */
  events = new EventEmitter;

  /**
   * A reference to the Nav view
   * @type {app#Nav}
   */
  nav = new Nav;

  /**
   * A table of references to DOM elements used by the App View
   * @type {Object}
   * @prop {HTMLElement} info      - The ARIA live region (`<p id=info hidden aria-live=polite>`) where content is announced to screen readers
   * @prop {HTMLElement} templates - A `<div>` containing any `<template>` tags that have been populated.
   */
  nodes = {
    info:      document.getElementById(`info`),
    templates: document.getElementById(`templates`),
  }

  /**
   * A Map of page views, loaded dynamically when the page is requested.
   * @type {Map}
   */
  pages = new Map;

  /**
   * The settings for the app.
   * @type {core#Settings}
   */
  settings = new Settings(localStorage.getItem(`settings`));

  // APP METHODS

  addEventListeners() {

    const on = this.events.on.bind(this.events);

    on(`App:Nav:change`, page => this.renderPage(page));
    on(`Languages:LanguagesList:add`, () => this.addLanguage());

  }

  /**
   * Updates the text of the ARIA live region so that the text will be announced to screen readers
   * @param {String} text The text to announce
   */
  announce(text) {
    this.nodes.info.textContent = text;
  }

  /**
   * Asynchronously loads the HTML + CSS for a page and inserts it as a `<template>` tag in the app shell for repeated use. Also loads the View for the requested page, and stores it in the `pages` map for repeated use.
   * @param  {String}  page The page to load
   * @return {Promise}
   */
  async loadPage(page) {

    // load page view
    const { default: PageView } = await import(`../pages/${ page }/${ page }.js`);
    this.pages.set(page, PageView);

    // load HTML template
    const response = await fetch(`../pages/${ page }/${ page }.html`);
    const html     = await response.text();
    const template = document.createElement(`template`);

    template.setAttribute(`id`, `${ page.toLowerCase() }-page-template`);
    template.innerHTML = html;
    this.nodes.templates.appendChild(template);

  }

  /**
   * Initializes the App view
   */
  async render() {
    this.addEventListeners();
    await this.db.initialize();
    this.nav.render(this.settings.page);
  }

  /**
   * Renders a page.
   * @param  {String}  page   The page to render.
   * @param  {Any}     [args] Any additional arguments to pass to the page constructor.
   * @return {Promise}
   */
  async renderPage(page, ...args) {

    let PageView = this.pages.get(page);

    if (!PageView) {
      await this.loadPage(page);
      PageView = this.pages.get(page);
    }

    const pageView = new PageView(...args);
    const newPage  = pageView.render();
    const oldPage  = document.getElementById(`main`);

    oldPage.replaceWith(newPage);

  }

  // LANGUAGES

  async addLanguage() {
    const language = new Language;
    language.name.set(`eng`, `{ new language }`);
    await this.db.languages.add(language);
    const languages = await this.db.languages.getAll();
    await this.renderPage(`languages`, languages, language.cid);
  }

  // STATIC

  static defaultSettings = {
    page: `Home`,
  }

}
