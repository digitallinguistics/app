import compare               from '../../../utilities/compare.js';
import debounce              from '../../../utilities/debounce.js';
import html2element          from '../../../utilities/html2element.js';
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

    if (!target.matches(`button`)) return;

    if (target.classList.contains(`js-delete-button`)) {
      const i = Number(target.closest(`li`).dataset.id);
      return this.deleteName(i);
    }

    if (target.classList.contains(`js-edit-button`)) {}

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

    this.hydrate();
    this.addEventListeners();

    return this.el;

  }

  renderAdditionalNames() {

    this.language.additionalNames.sort((a, b) => compare(a.name, b.name));

    const itemTemplate = document.getElementById(`additional-name-template`);

    const listView = new List(this.language.additionalNames, {
      classes:    [`names-list`],
      setCurrent: false,
      template:   LanguageEditor.#nameTemplate,
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

  renderBlank() {
    this.el      = View.fromHTML(LanguageEditor.#blankTemplate);
    this.el.view = this;
    this.el.querySelector(`.add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));
    return this.el;
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

  async updateAutonym(name, value) {
    const abbr = /autonym-(?<abbr>.+)$/u.exec(name)?.groups?.abbr;
    this.language.autonym.set(abbr, value);
    await this.save();
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

  async updateProperty(name, value) {
    this.language[name] = value;
    await this.save();
  }

  // Additional Names

  async addName() {
    this.language.additionalNames.push({
      language: ``,
      name:     ``,
    });
    await this.save();
    this.renderAdditionalNames();
  }

  async deleteName(i) {
    this.language.additionalNames.splice(i, 1);
    await this.save();
    this.renderAdditionalNames();
  }

  // Static Properties

  static #blankTemplate = `<section class=language-editor>
    <button class='add-language-button button green' type=button>Add a Language</button>
  </section>`;

  static #nameTemplate({ language, name }, i) {
    return html2element(`<li class=additional-name data-id=${ i }>
      <p>
        <span class=txn>${ name }</span>
        (${ language })
      </p>
      <button aria-label='Edit this Language Name' class='button js-edit-button transparent' type=button>
        <svg><use href=#edit-line></use></svg>
      </button>
      <button aria-label='Delete this Language Name' class='button js-delete-button transparent' type=button>
        <svg><use href=#trash ></use></svg>
      </button>
      <fieldset>
        <div class=text-field>
          <label for='additional-name-name-${ i }'>Name</label>
          <input
            autocomplete=off
            class='line-input txn'
            id='additional-name-name-${ i }'
            inputmode=text
            name='additional-name-name-${ i }'
            placeholder='e.g. espagnol'
            spellcheck=false
            type=text
          >
        </div>
        <div class=text-field>
          <label for='additional-name-lang-${ i }'>Language</label>
          <input
            autocomplete=off
            class=line-input
            id='additional-name-lang-${ i }'
            inputmode=text
            name='additional-name-lang-${ i }'
            placeholder='e.g. French'
            spellcheck=false
            type=text
          >
        </div>
        <div class=buttons>
          <button class='button' type=button>Cancel</button>
          <button class='button blue' type=button>Save</button>
        </div>
      </fieldset>
    </li>`);
  }

}
