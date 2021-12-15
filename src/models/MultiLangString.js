/**
 * A class representing text in multiple languages.
 * @extends Map
 * @memberof Models
 * @prop {String} type - "MultiLangString"
 */
class MultiLangString extends Map {

  /**
   * Create a new MultiLangString.
   * @param {Object} [data={}]
   */
  constructor(data = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`eng`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      `MultiLangString`,
    });

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

export default MultiLangString;
