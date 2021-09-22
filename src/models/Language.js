import Model           from '../core/Model.js';
import MultiLangString from './MultiLangString.js';
import Transcription   from './Transcription.js';

/**
 * A class representing a language
 * @memberof models
 * @extends core#Model
 */
export default class Language extends Model {

  /**
   * Create a new Language.
   * @param {Object} [data={}]
   */
  constructor(data = {}) {
    
    super(data, { type: `Language` });
    
    this.additionalNames ??= [];
    this.autonym           = new Transcription(this.autonym);
    this.name              = new MultiLangString(this.name);

  }

}
