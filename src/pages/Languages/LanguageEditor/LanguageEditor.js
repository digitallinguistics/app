import AdditionalName        from '../AdditionalName/AdditionalName.js';
import compare               from '../../../utilities/compare.js';
import debounce              from '../../../utilities/debounce.js';
import List                  from '../../../components/List/List.js';
import MultiLangStringEditor from '../../../components/MultiLangStringEditor/MultiLangStringEditor.js';
import TranscriptionEditor   from '../../../components/TranscriptionEditor/TranscriptionEditor.js';
import View                  from '../../../core/View.js';

export default class LanguageEditor extends View {

  constructor(language) {
    super();
    this.language     = language;
    this.abbreviation = this.language.abbreviation;
  }

  addEventListeners() {

    const delay = 500;

    this.el.addEventListener(`change`, debounce(this.handleFormUpdate.bind(this), delay));
    this.el.addEventListener(`input`, debounce(this.handleFormUpdate.bind(this), delay));

    this.el.querySelector(`.js-language-editor__add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));

    this.el.querySelector(`.js-language-editor__add-name-button`)
    .addEventListener(`click`, this.addName.bind(this));

    this.el.querySelector(`.js-language-editor__delete-language-button`)
    .addEventListener(`click`, () => this.events.emit(`delete`, this.language.cid));

  }

  async save() {
    await app.db.languages.put(this.language);
    this.renderMetadata();
  }

  // Handlers

  handleFormUpdate(ev) {

    ev.preventDefault(); // prevent form from submitting data to the server

    const { name, value } = ev.target;
    const isAutonymUpdate = name.startsWith(`autonym`);
    const isNameUpdate    = name.startsWith(`name`);

    if (isAutonymUpdate) return this.updateAutonym(name, value);
    if (isNameUpdate) return this.updateName(name, value);
    return this.updateProperty(name, value);

  }

  async handleNamesUpdate({ target }) {

    if (target.classList.contains(`js-additional-name__cancel-button`)) {
      const item     = target.closest(`.additional-name`);
      const { view } = item;
      const name     = view.nameInput.value;
      if (name) return;
      const index = item.dataset.id;
      this.language.additionalNames.splice(index, 1);
      await this.save();
      this.renderAdditionalNames();
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

  // Rendering Methods

  render() {

    this.template            = document.getElementById(`language-editor-template`);
    this.el                  = this.cloneTemplate();
    this.el.view             = this;
    this.el.dataset.language = this.language.cid;

    this.renderName();
    this.renderAutonym();
    this.renderAdditionalNames();
    this.renderMetadata();
    this.renderSimpleFields();

    this.addEventListeners();

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

  }

  renderSimpleFields() {
    this.el.querySelector(`#language-editor__abbreviation-input`).value = this.language.abbreviation ?? ``;
    this.el.querySelector(`#language-editor__iso-input`).value          = this.language.iso ?? ``;
    this.el.querySelector(`#language-editor__glottocode-input`).value   = this.language.glottocode ?? ``;
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

  updateAutonym(name, value) {
    const abbr = /autonym-(?<abbr>.+)$/u.exec(name)?.groups?.abbr;
    this.language.autonym.set(abbr, value);
    return this.save();
  }

  async updateName(name, value) {

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

  updateProperty(name, value) {
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
    this.renderAdditionalNames();
  }

}
