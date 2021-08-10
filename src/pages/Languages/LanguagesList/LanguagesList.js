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
   * A reference to the `<template>` tag for this view.
   * @type {HTMLTemplateElement}
   */
  template = document.getElementById(`languages-list-template`);

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
   * @return {HTMLNavElement}
   */
  render() {

    this.el = this.cloneTemplate();

    const listView = new ListView(this.languages, { template: LanguagesList.itemTemplate });
    this.list = listView.render();

    const oldList = this.el.querySelector(`.languages`);
    oldList.replaceWidth(this.list);

    // TODO: add listeners
    // TODO: set current language

    return this.el;

  }

}
