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
   * @param {data} data The data for this Lexeme model.
   */
  constructor(data = {}) {

    super(data, { type: `Lexeme` });

    this.lemma = new Transcription(this.lemma);

    if (this.citationForm) {
      this.citationForm = new Transcription(this.citationForm);
    }

    if (this.head) {
      this.head = new Transcription(this.head);
    }

  }

  get displayName() {
    return this.head.default;
  }

}

export default Lexeme;
