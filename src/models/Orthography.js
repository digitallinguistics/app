import Model           from '../core/Model.js';
import MultiLangString from './MultiLangString.js';

/**
 * A class representing an orthography.
 * @extends Model
 * @memberof Models
 */
class Orthography extends Model {

  /**
   * Create a new Orthography.
   * @param {Object} data The orthography data.
   */
  constructor(data = {}) {

    super(data, { type: `Orthography` });

    /**
     * The name for this orthography.
     * @type {MultiLangString}
     */
    this.name = new MultiLangString(this.name);


    /**
     * The abbreviation for this orthography.
     * @default ""
     * @type {String}
     */
    this.abbreviation ??= ``;

  }

}

export default Orthography;
