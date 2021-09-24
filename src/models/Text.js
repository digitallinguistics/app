import Model from '../core/Model.js';

/**
 * A class representing a linguistic text
 * @memberof models
 * @extends core#Model
 */
export default class Text extends Model {

  constructor() {
    super({}, { type: `Text` });
  }

}
