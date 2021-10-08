import NotesList from '../../../components/NotesList/NotesList.js';
import View      from '../../../core/View.js';

export default class AdditionalName extends View {

  template = document.getElementById(`additional-name-template`);

  constructor({
    language = ``,
    name = ``,
    notes = [],
  } = {}, index) {

    super();

    this.index    = index;
    this.language = language;
    this.name     = name;
    this.notes    = [];

    this.langID = `additional-name-lang-${ index }`;
    this.nameID = `additional-name-name-${ index }`;

  }

  addEventListeners() {

    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-additional-name__cancel-button`)) {
        this.nameValue     = this.name;
        this.languageValue = this.language;
        this.updatePreview(this.nameValue, this.languageValue);
        return this.hideEditor();
      }

      if (target.classList.contains(`js-additional-name__edit-button`)) return this.showEditor();

      if (target.classList.contains(`js-additional-name__save-button`)) {
        if (document.getElementById(this.nameID).checkValidity()
        && document.getElementById(this.langID).checkValidity()) {
          this.name     = this.nameValue;
          this.language = this.languageValue;
          this.updatePreview(this.nameValue, this.languageValue);
          return this.hideEditor();
        }
        document.getElementById(this.nameID).reportValidity();
        document.getElementById(this.langID).reportValidity();
      }

    });

    this.el.addEventListener(`input`, () => this.updatePreview(this.nameValue, this.languageValue));

  }

  hideEditor() {
    this.el.querySelector(`.js-additional-name__editor`).hidden      = true;
    this.el.querySelector(`.js-additional-name__edit-button`).hidden = false;
  }

  render() {

    this.el            = this.cloneTemplate();
    this.el.view       = this;
    this.el.dataset.id = this.index;

    this.updatePreview(this.name, this.language);
    this.hydrate();
    this.addEventListeners();
    this.renderNotes();
    
    return this.el;

  }

  renderNotes() {
    const list = new NotesList(this.notes, {
      border: false,
    });
    const el = list.render();
    el.setAttribute(`aria-expanded`, false);
    this.el.appendChild(el);
  }
  
  showEditor() {
    this.el.querySelector(`.js-additional-name__editor`).hidden      = false;
    this.el.querySelector(`.js-additional-name__edit-button`).hidden = true;
    this.el.querySelector(`.js-additional-name__name-input`).focus();
  }

  updatePreview(name, language) {
    this.el.querySelector(`.js-additional-name__preview`)
    .innerHTML = `<span class=txn>${ name }</span> (${ language })`;
  }

  get languageValue() {
    return this.el.querySelector(`.js-additional-name__lang-input`).value;
  }

  set languageValue(value) {
    this.el.querySelector(`.js-additional-name__lang-input`).value = value;
  }

  get nameValue() {
    return this.el.querySelector(`.js-additional-name__name-input`).value;
  }

  set nameValue(value) {
    this.el.querySelector(`.js-additional-name__name-input`).value = value;
  }

}
