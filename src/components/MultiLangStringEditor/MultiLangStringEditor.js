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
   * @param {String}          [options.placeholder=''] The placeholder text for this input.
   */
  constructor(data, {
    fieldName   = ``,
    placeholder = ``,
  } = {}) {

    super();

    this.data        = data;
    this.fieldName   = fieldName;
    this.placeholder = placeholder;

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

      const label = View.fromHTML(`<label>${ lang }</label>`);

      const input = View.fromHTML(`<input
        autocomplete=off
        class='line-input txn'
        inputmode=text
        lang='${ lang }'
        name='${ this.fieldName }-${ lang }'
        placeholder='${ this.placeholder }'
        spellcheck=false
        type=text
        value='${ text }'
      ></input>`);

      const div = this.el.querySelector(`div`);

      div.appendChild(label);
      div.appendChild(input);

    }

    return this.el;

  }

}
