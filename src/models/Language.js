import Model           from '../core/Model.js';
import MultiLangString from './MultiLangString.js';

/**
 * A class representing a language
 * @memberof models
 * @extends core#Model
 */
export default class Language extends Model {

  /**
   * The model type (Language).
   * @type {String}
   * @readonly
   */
  type = `Language`;

  /**
   * Create a new Language.
   * @param {Object} [data={}]
   */
  constructor(data = {}) {
    super(data);
    this.name = new MultiLangString(this.name);
  }

}
