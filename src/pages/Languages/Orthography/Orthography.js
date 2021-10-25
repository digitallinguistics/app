import NotesList from '../../../components/NotesList/NotesList.js';
import styles    from './Orthography.less';
import template  from './Orthography.hbs';
import View      from '../../../core/View.js';

export default class Orthography extends View {

  constructor(orthography = {}, index) {

    super({ styles, template });

    this.orthography          = orthography;
    this.index                = index;
    this.abbrID               = `orthography-abbr-${ index }`;
    this.nameID               = `orthography-name-${ index }`;

  }

  addEventListeners() {

    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-orthography__cancel-button`)) {
        this.nameInput.value = this.orthography.name;
        this.abbrInput.value = this.orthography.abbreviation;
        this.updatePreview(this.orthography.name, this.orthography.abbreviation);
        return this.hideEditor();
      }

      if (target.classList.contains(`js-orthography__edit-button`)) {
        return this.showEditor();
      }

      if (target.classList.contains(`js-orthography__save-button`)) {

        if (this.nameInput.checkValidity()) {
          this.save();
          this.updatePreview(this.orthography.name, this.orthography.abbreviation);
          return this.hideEditor();
        }

        this.nameInput.reportValidity();

      }

    });

    this.el.addEventListener(`input`, () => this.updatePreview(this.nameInput.value, this.abbrInput.value));

  }

  hideEditor() {
    this.el.classList.remove(`editing`);
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.el.dataset.id = this.index;
    this.editButton    = this.el.querySelector(`.js-orthography__edit-button`);
    this.editor        = this.el.querySelector(`.js-orthography__editor`);
    this.nameInput     = this.el.querySelector(`.js-orthography__name-input`);
    this.abbrInput     = this.el.querySelector(`.js-orthography__abbr-input`);

    this.nameInput.id    = this.nameID;
    this.nameInput.value = this.orthography.name;
    this.abbrInput.id    = this.abbrID;
    this.abbrInput.value = this.orthography.abbreviation;

    this.el.querySelector(`.js-orthography__name-legend`).setAttribute(`for`, this.nameID);
    this.el.querySelector(`.js-orthography__abbr-legend`).setAttribute(`for`, this.abbrID);

    this.updatePreview(this.orthography.name, this.orthography.abbreviation);
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
    this.orthography.name         = this.nameInput.value;
    this.orthography.abbreviation = this.abbrInput.value;
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.nameInput.focus();
  }

  updatePreview(name, abbreviation) {
    this.el.querySelector(`.js-orthography__preview`)
    .innerHTML = `<span class=txn>${ name }</span> (${ abbreviation })`;
  }

}
