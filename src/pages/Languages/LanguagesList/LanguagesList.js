import ListView from '../../../components/ListView/ListView.js';
import View     from '../../../core/View.js';

/**
 * A class representing a list of languages, as a menu.
 * @memberof pages#LanguagesPage
 * @instance
 * @extends core#View
 */
export default class LanguagesList extends View {

  /**
   * The languages included in this view.
   * @type {Array<models#Language>}
   */
  languages = [];

  /**
   * A reference to the `<template>` tag for this view.
   * @type {HTMLTemplateElement}
   */
  template = document.getElementById(`languages-list-template`);

  /**
   * Create a new Languages List
   * @param {Array} [languages=[]] An Array of Languages to display in the list.
   */
  constructor(languages = []) {
    super();
    this.languages = languages;
  }

  /**
   * Render the Languages List
   * @return {HTMLElement}
   */
  render(languageCID) {

    this.el        = this.cloneTemplate();
    const listView = new ListView(this.languages, { template: LanguagesList.itemTemplate });
    this.list      = listView.render();
    const oldList  = this.el.querySelector(`.languages`);

    oldList.replaceWith(this.list);

    this.addEventListeners();

    if (languageCID) this.setCurrentLanguage(languageCID);

    return this.el;

  }

  /**
   * Set the currently selected language in the list
   * @param {String} languageCID The client ID of the language to set as selected
   */
  setCurrentLanguage(languageCID) {

    const items = Array.from(this.list.children);

    if (items.length) {

      // clear the currently selected language from all items

      for (const item of items) {
        item.removeAttribute(`aria-current`);
        item.classList.remove(`current`);
      }

      // set the currently selected language

      const currentItem = items.find(item => item.dataset.language === languageCID);

      currentItem.setAttribute(`aria-current`, `language`);
      currentItem.classList.add(`current`);

    }

  }

  /**
   * The templating function for each language in the list.
   * @param  {Object} language The Language object to render a `<li>` element for.
   * @return {HTMLLIElement}
   */
  static itemTemplate({ cid, name }) {
    const li            = document.createElement(`li`);
    li.dataset.language = cid;
    [li.textContent]    = Object.values(name);
    return li;
  }

}