import NotesList from '../../../components/NotesList/NotesList.js';
import styles    from './AdditionalName.less';
import template  from './AdditionalName.hbs';
import View      from '../../../core/View.js';

export default class AdditionalName extends View {

  constructor(additionalName = {}, index) {

    super({ styles, template });

    this.additionalName            = additionalName;
    this.additionalName.name     ??= ``;
    this.additionalName.language ||= `English`;
    this.index                     = index;
    this.langID                    = `additional-name-lang-${ index }`;
    this.nameID                    = `additional-name-name-${ index }`;

  }

  addEventListeners() {

    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-additional-name__cancel-button`)) {
        this.nameInput.value = this.additionalName.name;
        this.langInput.value = this.additionalName.language;
        this.updatePreview(this.additionalName.name, this.additionalName.language);
        return this.hideEditor();
      }

      if (target.classList.contains(`js-additional-name__edit-button`)) {
        return this.showEditor();
      }

      if (target.classList.contains(`js-additional-name__save-button`)) {

        if (this.nameInput.checkValidity()) {
          this.save();
          this.updatePreview(this.additionalName.name, this.additionalName.language);
          return this.hideEditor();
        }

        this.nameInput.reportValidity();

      }

    });

    this.el.addEventListener(`input`, () => this.updatePreview(this.nameInput.value, this.langInput.value));

  }

  hideEditor() {
    this.editor.hidden     = true;
    this.editButton.hidden = false;
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.el.dataset.id = this.index;
    this.editButton    = this.el.querySelector(`.js-additional-name__edit-button`);
    this.editor        = this.el.querySelector(`.js-additional-name__editor`);
    this.nameInput     = this.el.querySelector(`.js-additional-name__name-input`);
    this.langInput     = this.el.querySelector(`.js-additional-name__lang-input`);

    this.nameInput.id    = this.nameID;
    this.nameInput.value = this.additionalName.name;
    this.langInput.id    = this.langID;
    this.langInput.value = this.additionalName.language;

    this.el.querySelector(`.js-additional-name__name-legend`).setAttribute(`for`, this.nameID);
    this.el.querySelector(`.js-additional-name__lang-legend`).setAttribute(`for`, this.langID);

    this.updatePreview(this.additionalName.name, this.additionalName.language);
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

  save() {
    this.additionalName.name     = this.nameInput.value;
    this.additionalName.language = this.langInput.value || `English`;
  }

  showEditor() {
    this.editor.hidden     = false;
    this.editButton.hidden = true;
    this.nameInput.focus();
  }

  updatePreview(name, language) {
    this.el.querySelector(`.js-additional-name__preview`)
    .innerHTML = `<span class=txn>${ name }</span> (${ language })`;
  }

}
