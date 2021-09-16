import View from '../../core/View.js';

/**
 * A view for editing a Transcription.
 */
export default class TranscriptionEditor extends View {

  /**
   * Create a new Transcription Editor.
   * @param {Transcription} data                     The Transcription data to render. Must be a Transcription (Map) object.
   * @param {Object}        options                  A required options object.
   * @param {Array<String>} [options.classes=[]]     An Array of CSS classes to add to the Transcription Editor element.
   * @param {String}        options.lang             The value to use for the HTML `lang` attribute. Must be a valid IETF language tag.
   * @param {String}        [options.placeholder=``] The placeholder text for the inputs in this Transcription Editor.
   * @param {String}        [options.prefix=``]      The prefix to use for the `for` attribute on the `<label>` element, as well as the `id` and `name` attributes of the `<input>` element. The orthography abbreviation will be appended to this prefix.
   */
  constructor(data, {
    classes = [],
    lang,
    placeholder = ``,
    prefix = ``,
  }) {

    super();

    this.classes     = classes;
    this.data        = data;
    this.lang        = lang;
    this.placeholder = placeholder;
    this.prefix      = prefix;

  }

  render() {

    this.el      = View.fromHTML(`<fieldset class=txn-editor><div class=txn-group></div></fieldset>`);
    this.el.view = this;

    for (const cssClass of this.classes) {
      this.el.classList.add(cssClass);
    }

    const transcriptions = Array.from(this.data.entries());

    for (const [ortho, text] of transcriptions) {

      const id    = `${ this.prefix }-${ ortho }`;
      const label = View.fromHTML(`<label class=label for='${ id }'>${ ortho }</label>`);

      const input = View.fromHTML(`<input
        autocomplete=off
        class='line-input txn'
        data-ortho='${ ortho }'
        id='${ id }'
        inputmode=text
        lang='${ this.lang }'
        name='${ id }'
        placeholder='${ this.placeholder }'
        spellcheck=false
        type=text
        value='${ text }'
      >`);

      const div = this.el.querySelector(`div`);

      div.appendChild(label);
      div.appendChild(input);

    }

    return this.el;

  }

}
