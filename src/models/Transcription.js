/**
 * A class representing a Transcription, in one or more orthographies.
 * @memberof Models
 */
class Transcription extends Map {

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

    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      `Transcription`,
    });

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
