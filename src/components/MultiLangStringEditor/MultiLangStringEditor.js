import View from '../../core/View.js';

/**
 * A class representing a MultiLangString editor
 * @memberof pages#LanguagesPage
 * @instance
 * @extends View
 */
export default class MultiLangStringEditor extends View {

  /**
   * Create a new MultiLangStringEditor
   * @param {MultiLangString} data                     The MultiLangString data to render. Must be a MultiLangString (Map) object.
   * @param {Object}          [options={}]             An options hash.
   * @param {String}          [options.fieldName='']   The name for this input field.
   * @param {Object}          [options.inputAttributes={}] An Object map of attributes to add to each `<input>` element, and the values for those attributes (e.g. `placeholder: 'e.g. Spanish'`).
   */
  constructor(data, {
    fieldName   = ``,
    inputAttributes = {},
  } = {}) {

    super();

    this.data        = data;
    this.fieldName   = fieldName;
    this.inputAttributes = inputAttributes;

  }

  /**
   * Render the MultiLangStringEditor
   * @return {HTMLFieldSetElement}
   */
  render() {

    this.el       = View.fromHTML(`<fieldset class=mls-editor><div class=txn-group></div></fieldset>`);
    this.el.view  = this;
    const strings = Array.from(this.data.entries());

    for (const [lang, text] of strings) {

      const id    = `${ this.fieldName }-${ lang }`;
      const label = View.fromHTML(`<label class=label for='${ id }'>${ lang }</label>`);

      const input = View.fromHTML(`<input
        autocomplete=off
        class='line-input txn'
        id='${ id }'
        inputmode=text
        lang='${ lang }'
        name='${ id }'
        placeholder='${ this.placeholder }'
        spellcheck=false
        type=text
        value='${ text }'
      ></input>`);

      for (const [key, value] of Object.entries(this.inputAttributes)) {
        input.setAttribute(key, value);
      }

      const div = this.el.querySelector(`div`);

      div.appendChild(label);
      div.appendChild(input);

    }

    return this.el;

  }

}
