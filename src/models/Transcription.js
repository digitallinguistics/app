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
  constructor(data = {}, { defaultOrthography = `default` } = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`default`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

    this.defaultOrthography = defaultOrthography;

    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      `Transcription`,
    });

  }

  /**
   * Get the transcription in the default orthography, or the first orthography in the object.
   */
  get default() {
    return this.get(this.defaultOrthography ?? `default`)
      ?? Array.from(this.values())[0];
  }

  /**
   * Set the value of the default orthography.
   */
  set default(val) {
    this.set(this.defaultOrthography, val);
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
