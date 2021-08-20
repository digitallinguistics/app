import Model from '../core/Model.js';

/**
 * A class representing a linguistic text
 * @memberof models
 * @extends core#Model
 */
export default class Text extends Model {

  /**
   * The model type (Text)
   * @type {String}
   */
  get Text() {
    return `Text`;
  }

}
