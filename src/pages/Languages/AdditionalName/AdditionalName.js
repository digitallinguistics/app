import View from '../../../core/View.js';

export default class AdditionalName extends View {

  template = document.getElementById(`additional-name-template`);

  constructor({ language, name }, index) {

    super();

    this.index    = index;
    this.language = language;
    this.name     = name;

    this.langID = `additional-name-lang-${ index }`;
    this.nameID = `additional-name-name-${ index }`;

  }

  addEventListeners() {
    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-edit-button`)) return this.showEditor();
      if (target.classList.contains(`js-cancel-button`)) return this.hideEditor();

    });
  }

  hideEditor() {
    this.el.querySelector(`.js-editor`).hidden = true;
  }

  render() {

    this.el            = this.cloneTemplate();
    this.el.view       = this;
    this.el.dataset.id = this.index;

    this.el.querySelector(`.js-preview`)
    .innerHTML = `<span class=txn>${ this.name }</span> (${ this.language })`;

    this.hydrate();
    this.addEventListeners();

    return this.el;

  }

  showEditor() {
    this.el.querySelector(`.js-editor`).hidden = false;
  }

}
