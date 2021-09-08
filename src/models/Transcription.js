/**
 * A class representing a Transcription, in one or more orthographies.
 * @memberof models
 */
export default class Transcription extends Map {

  /**
   * The model type (Transcription)
   * @type {string}
   * @readonly
   */
  type = `Transcription`;

  /**
   * Create a new Transcription.
   * @param {Object} [data={}]
   */
  constructor(data = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`default`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

  }

  /**
   * Create a version of the data suitable for JSON serialization.
   * @return {Object}
   */
  toJSON() {
    return Object.fromEntries(this);
  }

}
