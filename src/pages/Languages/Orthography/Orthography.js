import MultiLangStringEditor from '../../../components/MultiLangStringEditor/MultiLangStringEditor.js';
import NotesList             from '../../../components/NotesList/NotesList.js';
import styles                from './Orthography.less';
import template              from './Orthography.hbs';
import View                  from '../../../core/View.js';

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
        this.nameInput.value = this.orthography.name.default;

        this.abbrInput.value = this.orthography.abbreviation;
        this.updatePreview(this.orthography.name.default, this.orthography.abbreviation);
        return this.hideEditor();
      }

      if (target.classList.contains(`js-orthography__edit-button`)) {
        return this.showEditor();
      }

      if (target.classList.contains(`js-orthography__save-button`)) {

        if (this.abbrInput.checkValidity()) {
          this.save();
          this.updatePreview(this.orthography.name.default, this.orthography.abbreviation);
          return this.hideEditor();
        }

        this.abbrInput.reportValidity();

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

    this.renderOrthoName();
    this.nameInput       = this.el.querySelector(`[name^='${ this.nameID }']`);

    this.abbrInput       = this.el.querySelector(`.js-orthography__abbr-input`);

    this.abbrInput.id    = this.abbrID;
    this.abbrInput.value = this.orthography.abbreviation;

    this.el.querySelector(`.js-orthography__name-legend`).setAttribute(`for`, this.nameID);
    this.el.querySelector(`.js-orthography__abbr-legend`).setAttribute(`for`, this.abbrID);

    this.updatePreview(this.orthography.name.default, this.orthography.abbreviation);
    this.renderNotes();

    this.addEventListeners();

    return this.el;

  }

  renderOrthoName() {

    const nameField = this.el.querySelector(`.js-orthography__name`);

    const mlsEditor = new MultiLangStringEditor(this.orthography.name, {
      fieldName:       `${ this.nameID }`,
      id:              `${ this.nameID }`,
      inputAttributes: { autocapitalize: `words`, placeholder: `e.g. Cyrillic` },

    });

    const helpText = this.el.querySelector(`.orthography__help-text`);

    nameField.insertBefore(mlsEditor.render(), helpText);
  }

  renderNotes() {
    const list = new NotesList(this.orthography.notes, {
      border: false,
    });

    this.notes = list.notes;
    list.events.on(`update`, this.save.bind(this));
    const el = list.render();

    el.setAttribute(`aria-expanded`, false);
    el.classList.add(`js-orthography__notes-list`);
    this.el.appendChild(el);
  }

  save() {
    /**
     * This is a temporary fix since we only have 1 line MLS fields right now
     */
    const name = `${ this.nameID }-eng`;
    const regex = new RegExp(`orthography-name-${ this.index }-(?<abbr>.+)$`, `u`);
    const abbr = regex.exec(name)?.groups?.abbr;
    this.orthography.name.set(abbr, this.nameInput.value);
    this.orthography.abbreviation = this.abbrInput.value;
    this.orthography.notes        = this.notes;
    this.events.emit(`update`);
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.nameInput.focus();
    this.nameInput.select();
  }

  updatePreview(name, abbreviation) {
    name ||= `[none]`;
    this.el.querySelector(`.js-orthography__preview`)
    .innerHTML = `<span><span class=label> Name </span><span class=txn>${ name }
    </span></span><span><span class=label>Abbreviation</span>
    <span class='orthography code'>${ abbreviation }</span></span>`;
  }

}
