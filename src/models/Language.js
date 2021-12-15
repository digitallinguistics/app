import Model           from '../core/Model.js';
import MultiLangString from './MultiLangString.js';
import Orthography     from './Orthography.js';
import Transcription   from './Transcription.js';

/**
 * A data model for languages.
 * @extends Model
 * @memberof Models
 */
class Language extends Model {

  /**
   * Create a new Language.
   * @param {Object} data The data for this Language model.
   */
  constructor(data = {}) {

    super(data, { type: `Language` });

    /**
     * An Array of additional names for this language.
     * @default []
     * @type {AdditionalName[]}
     */
    this.additionalNames ??= [];

    /**
     * An array of analysis languages for this language.
     * @default [English]
     * @type {AnalysisLanguage[]}
     */
    this.analysisLanguages ??= [{ abbreviation: `eng`, language: `English`, tag: `eng` }];

    /**
     * The autonym for this language, as a Transcription.
     * @type {Transcription}
     */
    this.autonym = new Transcription(this.autonym);

    /**
     * The scientific name for this language, as a MultiLangString.
     */
    this.name = new MultiLangString(this.name);

    /**
     * An Array of orthographies for this language.
     * @default []
     * @type {Orthography[]}
     */

    this.orthographies ??= [{ abbreviation: `default`, name: `default` }];
    this.orthographies = this.orthographies.map(orthoData => new Orthography(orthoData));

  }

}

export default Language;

/**
 * An Additional Name for a Language.
 * @typedef {Object} AdditionalName
 * @prop {String} language - The language of this additional name.
 * @prop {String} name     - The additional name.
 * @prop {Note[]} notes    - An Array of Notes about this additional name.
 */

/**
  * An Analysis Language for a Language.
  * @typedef {Object} AnalysisLanguage
  * @prop {String} abbreviation - The abbreviation for this analysis language.
  * @prop {String} language - The name of this analysis language.
  * @prop {String} tag     - An IETF tag for this analysis language.
  */
