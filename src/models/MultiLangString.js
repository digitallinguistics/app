/**
 * A class representing text in multiple languages
 * @memberof models
 * @instance
 */
export default class MultiLangString extends Map {

  /**
   * The Model type (MultiLangString).
   * @type {String}
   * @readonly
   */
  type = `MultiLangString`;

  /**
   * Create a new MultiLangString
   * @param {Object} [data={}]
   */
  constructor(data = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`eng`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

  }

  /**
   * The default language.
   * @return {String}
   */
  get default() {
    return this.get(`en`) ?? this.get(`eng`) ?? Array.from(this.values())[0];
  }

  /**
   * Create a version of the data suitable for JSON serialization
   * @return {Object}
   */
  toJSON() {
    return Object.fromEntries(this);
  }

}
