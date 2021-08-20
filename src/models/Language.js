import Model from '../core/Model.js';

/**
 * A class representing a language
 * @memberof models
 * @extends core#Model
 */
export default class Language extends Model {

  /**
   * The model type (Language)
   * @type {String}
   */
  get type() {
    return `Language`;
  }

}
