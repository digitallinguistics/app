import Model         from '../core/Model.js';
import Transcription from './Transcription.js';

/**
 * A data model for Lexemes.
 * @extends Model
 * @memberof Models
 */
class Lexeme extends Model {

  /**
   * Create a new Lexeme.
   * @param {Object} [data={}]                     The data for this Lexeme model.
   * @param {Object} [options={}]                  An options Object.
   * @param {Object} [options.defaultForm=`lemma`] The form to use for the display name *if* the `head` field is not present. Possible values are `citationForm` and `lemma`.
   */
  constructor(data = {}, { defaultForm = `lemma` } = {}) {

    super(data, { type: `Lexeme` });

    this.lemma = new Transcription(this.lemma);

    if (this.citationForm) {
      this.citationForm = new Transcription(this.citationForm);
    }

    if (this.head) {
      this.head = new Transcription(this.head);
    }

    this.defaultForm = defaultForm;

    /**
     * The default display name of the lexeme, as a String. This property is made enumerable so that it can be indexed.
     * @name Lexeme#displayName
     * @readonly
     * @type {String}
     */
    Object.defineProperty(this, `displayName`, {
      enumerable: true,
      get() {
        return this.head?.default
        ?? this[this.defaultForm]?.default
        ?? this.lemma.default;
      },
    });

  }

}

export default Lexeme;
