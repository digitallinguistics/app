import View from '../../../core/View.js';

export default class AdditionalName extends View {

  template = document.getElementById(`additional-name-template`);

  constructor({ language = ``, name = `` } = {}, index) {

    super();

    this.index    = index;
    this.language = language;
    this.name     = name;

    this.langID = `additional-name-lang-${ index }`;
    this.nameID = `additional-name-name-${ index }`;

  }

  addEventListeners() {

    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-cancel-button`)) {
        this.nameValue     = this.name;
        this.languageValue = this.language;
        this.updatePreview(this.nameValue, this.languageValue);
        return this.hideEditor();
      }
      
      if (target.classList.contains(`js-edit-button`)) return this.showEditor();
      
      if (target.classList.contains(`js-save-button`)) {
        this.name     = this.nameValue;
        this.language = this.languageValue;
        this.updatePreview(this.nameValue, this.languageValue);
        return this.hideEditor();
      }
    
    });

    this.el.addEventListener(`input`, () => this.updatePreview(this.nameValue, this.languageValue));
  
  }

  hideEditor() {
    this.el.querySelector(`.js-editor`).hidden      = true;
    this.el.querySelector(`.js-edit-button`).hidden = false;
  }

  render() {

    this.el            = this.cloneTemplate();
    this.el.view       = this;
    this.el.dataset.id = this.index;

    this.updatePreview(this.name, this.language);
    this.hydrate();
    this.addEventListeners();
    
    return this.el;
    
  }
  
  showEditor() {
    this.el.querySelector(`.js-editor`).hidden      = false;
    this.el.querySelector(`.js-edit-button`).hidden = true;
    this.el.querySelector(`.js-name-input`).focus();
  }
  
  updatePreview(name, language) {
    this.el.querySelector(`.js-preview`)
    .innerHTML = `<span class=txn>${ name }</span> (${ language })`;
  }

  get languageValue() {
    return this.el.querySelector(`.js-lang-input`).value;
  }

  set languageValue(value) {
    this.el.querySelector(`.js-lang-input`).value = value;
  }

  get nameValue() {
    return this.el.querySelector(`.js-name-input`).value;
  }

  set nameValue(value) {
    this.el.querySelector(`.js-name-input`).value = value;
  }

}
