/**
 * A class representing a Transcription, in one or more orthographies.
 * @memberof Models
 */
class Transcription extends Map {

  /**
   * Create a new Transcription.
   * @param {Object} [data={}]
   * @param {Object} [options={}]
   * @param {String} [options.defaultOrthography]
   */
  constructor(data = {}, { defaultOrthography } = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`default`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      `Transcription`,
    });

    this.defaultOrthography = defaultOrthography;

  }

  /**
   * Retrieve the default transcription, or first in the set.
   */
  get default() {
    return this.get(this.defaultOrthography ?? `default`)
    ?? Array.from(this.values())[0];
  }

  /**
   * Create a version of the data suitable for JSON serialization.
   * @return {Object}
   */
  toJSON() {
    return Object.fromEntries(this);
  }

}

export default Transcription;
