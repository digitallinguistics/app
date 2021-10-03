import Model from '../core/Model.js';

/**
 * A class representing a linguistic text
 * @extends Model
 * @memberof Models
 */
class Text extends Model {

  constructor() {
    super({}, { type: `Text` });
  }

}

export default Text;
