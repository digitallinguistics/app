import View from '../../../core/View.js';

export default class LanguageEditor extends View {

  constructor(language) {
    super();
    this.language = language;
  }

  addEventListeners() {

    const deleteLanguageButton = this.el.querySelector(`.delete-language-button`);

    deleteLanguageButton.addEventListener(`click`, () => {
      app.events.emit(`Languages:delete`, this.language.cid);
    });

  }

  render() {
    this.template            = document.getElementById(`language-editor-template`);
    this.el                  = this.cloneTemplate();
    this.el.dataset.language = this.language.cid;
    this.addEventListeners();
    return this.el;
  }

}
