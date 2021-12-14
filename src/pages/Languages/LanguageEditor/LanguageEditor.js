import AdditionalName        from '../AdditionalName/AdditionalName.js';
import compare               from '../../../utilities/compare.js';
import debounce              from '../../../utilities/debounce.js';
import List                  from '../../../components/List/List.js';
import MultiLangString       from '../../../models/MultiLangString.js';
import MultiLangStringEditor from '../../../components/MultiLangStringEditor/MultiLangStringEditor.js';
import OrthographyView       from '../Orthography/Orthography.js';
import Orthography           from '../../../models/Orthography.js'
import styles                from './LanguageEditor.less';
import template              from './LanguageEditor.hbs';
import TranscriptionEditor   from '../../../components/TranscriptionEditor/TranscriptionEditor.js';
import View                  from '../../../core/View.js';

export default class LanguageEditor extends View {

  delay = 500;

  constructor(language) {
    super({ styles, template });
    this.language = language;
  }

  addEventListeners() {

    this.el.querySelector(`.js-language-editor__add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));

    this.el.querySelector(`.js-language-editor__add-name-button`)
    .addEventListener(`click`, this.addName.bind(this));

    this.el.querySelector(`.js-language-editor__add-orthography-button`)
    .addEventListener(`click`, this.addOrthography.bind(this));

    this.el.querySelector(`.js-language-editor__delete-language-button`)
    .addEventListener(`click`, () => this.events.emit(`delete`, this.language.cid));

    this.el.dataset.ready = true;
  }

  async save() {
    await app.db.languages.put(this.language);
    this.renderMetadata();
  }

  // Handlers

  async handleNamesUpdate({ target }) {

    if (target.classList.contains(`js-additional-name__cancel-button`)) {
      const item     = target.closest(`.additional-name`);
      const { view } = item;
      const name     = view.nameInput.value;
      if (name) return;
      const index = item.dataset.id;
      this.language.additionalNames.splice(index, 1);
      await this.save();
      return this.renderAdditionalNames();
    }

    if (target.classList.contains(`js-additional-name__delete-button`)) {
      const confirmDelete = confirm(`Are you sure you want to delete this Additional Language Name? This action cannot be undone. Click 'OK' to confirm deletion.`);
      if (!confirmDelete) return;
      const i = Number(target.closest(`.additional-name`).dataset.id);
      return this.deleteName(i);
    }

    if (target.classList.contains(`js-additional-name__save-button`)) {
      return this.updateAdditionalNames();
    }

  }

  async handleOrthographiesUpdate({target}) {
    if(target.classList.contains(`js-orthography__cancel-button`)) {
      const item = target.closest(`.orthography`);
      const {view} = item;
      const abbr = view.abbrInput.value;
      if (abbr) return;


      const index = item.dataset.id;
      this.language.orthographies.splice(index, 1);
      await this.save();
      return this.renderOrthographies();
    }

    if (target.classList.contains(`js-orthography__delete-button`)) {
      if(this.language.orthographies.length === 1) {
         alert(`There must be at least one orthography.`);
         return;
       }
      const confirmDelete = confirm(`Are you sure you want to delete this Orthography? This action cannont be undone. Click 'OK' to confirm deletion.`);
      if(!confirmDelete) return;
      const i = Number(target.closest(`.orthography`).dataset.id);
      return this.deleteOrthography(i);
    }
  }

  initialize() {

    this.addEventListeners();

    const input = this.el.querySelector(`[id^="name-"]`);

    if (input) {
      input.focus();
      input.select();
    }

  }

  // Rendering Methods

  render() {

    this.loadStyles();
    this.cloneTemplate();

    if (!this.language) {
      this.el.classList.add(`placeholder`);
      return this.el;
    }

    this.el.dataset.language = this.language.cid;

    this.renderName();
    this.renderAutonym();
    this.renderAdditionalNames();
    this.renderMetadata();
    this.renderOrthographies();
    this.renderSimpleFields();

    return this.el;

  }

  renderAdditionalName(name, index) {
    const nameView = new AdditionalName(name, index);
    return nameView.render();
  }

  renderAdditionalNames() {

    this.language.additionalNames.sort((a, b) => compare(a.name, b.name));

    const oldList = this.el.querySelector(`.js-language-editor__names-list`);

    const listView = new List(this.language.additionalNames, {
      classes:  oldList.classList,
      template: this.renderAdditionalName,
    });

    const newList = listView.render();

    if (!this.language.additionalNames.length) {
      newList.style.border = `none`;
    }

    oldList.replaceWith(newList);
    newList.addEventListener(`click`, this.handleNamesUpdate.bind(this));

  }

  renderAutonym() {

    const autonymField = this.el.querySelector(`.js-language-editor__autonym`);

    const txnEditor = new TranscriptionEditor(this.language.autonym, {
      inputAttributes: { autocapitalize: `words`, placeholder: `e.g. español` },
      lang:            this.language.iso,
      prefix:          `autonym`,
    });

    autonymField.appendChild(txnEditor.render());

    autonymField.addEventListener(`input`, debounce(this.updateAutonym.bind(this), this.delay));

  }

  renderMetadata() {

    const dateCreated = this.language.dateCreated.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    const dateModified = this.language.dateModified.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    this.el.querySelector(`.js-language-editor__date-created`).textContent  = dateCreated;
    this.el.querySelector(`.js-language-editor__date-modified`).textContent = dateModified;

  }

  renderName() {

    const nameField = this.el.querySelector(`.js-language-editor__name`);

    const mlsEditor = new MultiLangStringEditor(this.language.name, {
      fieldName:       `name`,
      id:              `name`,
      inputAttributes: { autocapitalize: `words`, placeholder: `e.g. Spanish` },

    });

    nameField.appendChild(mlsEditor.render());

    nameField.addEventListener(`input`, debounce(this.updateName.bind(this), this.delay));

  }

  renderOrthography(ortho, index) {
    const orthoView = new OrthographyView(ortho, index);
    orthoView.events.on(`update`, this.save.bind(this));
    return orthoView.render();
  }

  renderOrthographies() {
    this.language.orthographies.sort((a, b) => compare(a.name.default, b.name.default));

    const oldList = this.el.querySelector(`.js-language-editor__orthographies-list`);

    const listView = new List(this.language.orthographies, {
      classes: oldList.classList,
      template: this.renderOrthography.bind(this),
    });

    const newList = listView.render();

    if(!this.language.orthographies.length) {
      newList.style.border = `none`;
    }

    oldList.replaceWith(newList);
    newList.addEventListener(`click`, this.handleOrthographiesUpdate.bind(this));
  }

  renderSimpleFields() {

    const abbreviation = this.el.querySelector(`#language-editor__abbreviation-input`);
    abbreviation.value = this.language.abbreviation ?? ``;
    abbreviation.addEventListener(`input`, debounce(() => this.updateProperty(abbreviation), this.delay));

    const iso = this.el.querySelector(`#language-editor__iso-input`);
    iso.value = this.language.iso ?? ``;
    iso.addEventListener(`input`, debounce(() => this.updateProperty(iso), this.delay));

    const glottocode = this.el.querySelector(`#language-editor__glottocode-input`);
    glottocode.value   = this.language.glottocode ?? ``;
    glottocode.addEventListener(`input`, debounce(() => this.updateProperty(glottocode), this.delay));

  }

  // Update Methods

  updateAdditionalNames() {

    const listItems = this.el.querySelectorAll(`.additional-name`);
    const names     = [];

    for (const li of listItems) {

      const name     = li.querySelector(`.js-additional-name__name-input`).value;
      const language = li.querySelector(`.js-additional-name__lang-input`).value;

      names.push({ language, name });

    }

    this.language.additionalNames = names;
    return this.save();

  }

  updateAutonym(ev) {
    const { name, value } = ev.target;
    const abbr = /autonym-(?<abbr>.+)$/u.exec(name)?.groups?.abbr;
    this.language.autonym.set(abbr, value);
    return this.save();
  }

  async updateName(ev) {

    const { name, value } = ev.target;

    const nameInputs  = Array.from(this.el.querySelectorAll(`input[name|="name"]`));
    const filledInput = nameInputs.find(input => input.value.trim().length);

    if (!filledInput) {
      const [firstInput] = nameInputs;
      firstInput.setCustomValidity(`The language name must be provided in at least one language.`);
      firstInput.reportValidity();
      return;
    }

    const abbr = /name-(?<abbr>.+)$/u.exec(name)?.groups?.abbr;
    this.language.name.set(abbr, value);
    await this.save();
    await this.events.emit(`update:name`, this.language.cid);

  }

  updateProperty(input) {
    const { name, value } = input;
    const isValid = input.checkValidity();
    input.reportValidity();
    if (!isValid) return;
    this.language[name] = value;
    return this.save();
  }

  // Additional Names

  async addName() {

    this.language.additionalNames.push({
      language: ``,
      name:     ``,
    });

    await this.save();
    this.renderAdditionalNames();

    const nameView = this.el.querySelector(`.js-language-editor__names-list .additional-name:first-child`).view;

    nameView.showEditor();

  }

  async deleteName(i) {
    this.language.additionalNames.splice(i, 1);
    await this.save();
    return this.renderAdditionalNames();
  }


  // Orthographies

  async addOrthography() {
    this.language.orthographies.push(
      new Orthography({ abbreviation: ``, name: `` }),
    );

    await this.save();
    this.renderOrthographies();

    const orthoView = this.el.querySelector(`.js-language-editor__orthographies-list .orthography:first-child`).view;
    orthoView.showEditor();
  }

  async deleteOrthography(i) {
    this.language.orthographies.splice(i, 1);
    await this.save();
    return this.renderOrthographies();
  }

}
