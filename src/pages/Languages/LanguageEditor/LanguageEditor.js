import View         from '../../../core/View.js';
import html2element from '../../../utilities/html2element.js';

export default class LanguageEditor extends View {

  constructor(language) {
    super();
    this.language = language;
  }

  addEventListeners() {
    this.el.querySelector(`.delete-language-button`)
    .addEventListener(`click`, () => this.events.emit(`delete`, this.language.cid));
  }

  render() {
    this.template            = document.getElementById(`language-editor-template`);
    this.el                  = this.cloneTemplate();
    this.el.view             = this;
    this.el.dataset.language = this.language.cid;
    this.addEventListeners();
    return this.el;
  }

  renderBlank() {
    this.el = html2element(LanguageEditor.blankTemplate);
    this.el.querySelector(`.add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));
    return this.el;
  }

  static blankTemplate = `<section class=language-editor>
    <button class=add-language-button type=button>Add a Language</button>
  </section>`;

}
