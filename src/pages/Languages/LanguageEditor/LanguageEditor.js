import MultiLangStringEditor from '../../../components/MultiLangStringEditor/MultiLangStringEditor.js';
import View                  from '../../../core/View.js';
import debounce              from '../../../utilities/debounce.js';

export default class LanguageEditor extends View {

  constructor(language) {
    super();
    this.language = language;
  }

  addEventListeners() {

    const delay = 500;

    this.el.addEventListener(`change`, debounce(this.handleUpdate.bind(this), delay));
    this.el.addEventListener(`input`, debounce(this.handleUpdate.bind(this), delay));

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

  handleUpdate(ev) {

    ev.preventDefault(); // prevent form from submitting data to the server

    const { name, value } = ev.target;
    const isNameUpdate    = name.startsWith(`name`);

    if (isNameUpdate) return this.updateName(name, value);

    switch (name) {
        default: break;
    }

  }

  render() {
    this.template            = document.getElementById(`language-editor-template`);
    this.el                  = this.cloneTemplate();
    this.el.view             = this;
    this.el.dataset.language = this.language.cid;
    this.renderName();
    this.addEventListeners();
    return this.el;
  }

  renderBlank() {
    this.el      = View.fromHTML(LanguageEditor.blankTemplate);
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

  save() {
    return app.db.languages.put(this.language);
  }

  async updateName(name, value) {
    const form = this.el.querySelector(`form`);
    this.checkNameValidity();
    const isValid = form.checkValidity();
    form.reportValidity();
    if (!isValid) return;
    const langAbbr = LanguageEditor.langAbbrRegExp.exec(name)?.groups?.langAbbr;
    this.language.name.set(langAbbr, value);
    await this.save();
    await this.events.emit(`update:name`, this.language.cid);
  }

  static blankTemplate = `<section class=language-editor>
    <button class=add-language-button type=button>Add a Language</button>
  </section>`;

  static langAbbrRegExp = /name-(?<langAbbr>\w+)$/u;

}
