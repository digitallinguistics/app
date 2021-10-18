import Model from '../core/Model.js';

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
  }

}

export default Lexeme;
