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

    this.el.querySelector(`.add-name-button`)
    .addEventListener(`click`, this.addName.bind(this));

    this.el.querySelector(`.delete-language-button`)
    .addEventListener(`click`, () => this.events.emit(`delete`, this.language.cid));

  }

  /**
   * Checks that the name field has text for at least one language. At least 1 name input must be non-empty.
   */
  checkNameValidity() {

    const nameInputs = Array.from(this.el.querySelectorAll(`input[name|="name"]`));
    const hasText    = nameInputs.some(input => input.value.trim().length);
    const firstInput = nameInputs.shift();

    if (hasText) firstInput.setCustomValidity(``);
    else firstInput.setCustomValidity(`The language name must be provided in at least one language.`);

  }

  save() {
    return app.db.languages.put(this.language);
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

  handleNamesUpdate({ target }) {

    if (target.classList.contains(`js-additional-name__delete-button`)) {
      const confirmDelete = confirm(`Are you sure you want to delete this Additional Language Name? This action cannot be undone. Click 'OK' to confirm deletion.`);
      if (!confirmDelete) return;
      const i = Number(target.closest(`li`).dataset.id);
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

    this.hydrate(); // must precede other rendering methods

    this.renderName();
    this.renderAutonym();
    this.renderAdditionalNames();

    this.addEventListeners();

    return this.el;

  }

  renderAdditionalName(name, index) {
    const nameView = new AdditionalName(name, index);
    return nameView.render();
  }

  renderAdditionalNames() {

    this.language.additionalNames.sort((a, b) => compare(a.name, b.name));

    const listView = new List(this.language.additionalNames, {
      classes:  [`names-list`],
      template: this.renderAdditionalName,
    });

    const oldList = this.el.querySelector(`.additional-names .names-list`);
    const newList = listView.render();

    if (!this.language.additionalNames.length) newList.style.border = `none`;
    oldList.replaceWith(newList);

    newList.addEventListener(`click`, this.handleNamesUpdate.bind(this));

  }

  renderAutonym() {

    const autonymField = this.el.querySelector(`.autonym`);

    const txnEditor = new TranscriptionEditor(this.language.autonym, {
      lang:        this.language.iso,
      placeholder: `e.g. español`,
      prefix:      `autonym`,
    });

    autonymField.appendChild(txnEditor.render());

  }

  renderName() {

    const nameField = this.el.querySelector(`.name`);

    const mlsEditor = new MultiLangStringEditor(this.language.name, {
      fieldName:   `name`,
      id:          `name`,
      placeholder: `e.g. Spanish`,
    });

    nameField.appendChild(mlsEditor.render());

  }

  // Update Methods

  updateAdditionalNames() {

    const listItems = this.el.querySelectorAll(`.additional-names li`);
    const names     = [];

    for (const li of listItems) {

      const name     = li.querySelector(`.js-name-input`).value;
      const language = li.querySelector(`.js-lang-input`).value;

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

    const form = this.el.querySelector(`form`);
    this.checkNameValidity();
    const isValid = form.checkValidity();
    form.reportValidity();
    if (!isValid) return;

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

    const nameView = this.el.querySelector(`.additional-names .names-list li:first-child`).view;

    nameView.showEditor();

  }

  async deleteName(i) {
    this.language.additionalNames.splice(i, 1);
    await this.save();
    this.renderAdditionalNames();
  }

}
