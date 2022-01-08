import Model from '../core/Model.js';
import Transcription from './Transcription.js';

/**
 * A data model for Lexemes.
 * @extends Model
 * @memberof Models
 */
class Lexeme extends Model {

  /**
   * Create a new Lexeme.
   * @param {Object} [data={}] The data for this Lexeme.
   */
  constructor(data = {}) {

    super(data, { type: `Lexeme` });

    this.lemma = new Transcription(this.lemma);

    if (this.citationForm) {
      this.citationForm = new Transcription(this.citationForm);
    }

    if (this.stem) {
      this.stem = new Transcription(this.stem);
    }

    /**
     * Create an indexable "_lemma" property.
     */
    Object.defineProperty(this, `_lemma`, {
      enumerable: true,
      get() {
        return this.lemma.default;
      },
    });

  }

}

export default Lexeme;
