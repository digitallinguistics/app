import debounce              from '../../../utilities/debounce.js';
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
    this.nameInput     = this.el.querySelector(`[name^='${ this.nameID }']`);

    this.abbrInput     = this.el.querySelector(`.js-orthography__abbr-input`);

    this.abbrInput.id    = this.abbrID;
    this.abbrInput.value = this.orthography.abbreviation;

    this.el.querySelector(`.js-orthography__name-legend`).setAttribute(`for`, this.nameID);
    this.el.querySelector(`.js-orthography__abbr-legend`).setAttribute(`for`, this.abbrID);

    this.updatePreview(this.orthography.name.default, this.orthography.abbreviation);
    this.addEventListeners();

    this.renderNotes();

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

    nameField.addEventListener(`input`, debounce(this.updateName.bind(this), this.delay));
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
    this.orthography.abbreviation = this.abbrInput.value;
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.nameInput.focus();
    this.nameInput.select();
  }

  updateName(ev) {
    const { name, value } = ev.target;
    const regex = new RegExp(`orthography-name-${ this.index }-(?<abbr>.+)$`, `u`);
    const abbr = regex.exec(name)?.groups?.abbr;
    this.orthography.name.set(abbr, value);
    return this.save();
  }

  updatePreview(name, abbreviation) {
    name ||= `[none]`;
    this.el.querySelector(`.js-orthography__preview`)
    .innerHTML = `<span><span class=label> Name </span><span class=txn>${ name }</span></span><span><span class=label>Abbreviation
    </span><span class=orthography__mono>${ abbreviation }</span></span>`;
  }

}
