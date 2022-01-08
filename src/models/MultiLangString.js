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
   * @param {Object} [options={}]
   * @param {Object} [options.defaultLanguage]
   */
  constructor(data = {}, { defaultLanguage = `eng` } = {}) {

    let entries;

    if (typeof data === `string`) entries = [[`eng`, data]];
    else if (data instanceof Map) entries = data.entries();
    else entries = Object.entries(data);

    super(entries);

    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      `MultiLangString`,
    });

    this.defaultLanguage = defaultLanguage;

  }

  /**
   * The default language.
   * @return {String}
   */
  get default() {
    return this.get(this.defaultLanguage)
    ?? this.get(`eng`)
    ?? this.get(`en`)
    ?? Array.from(this.values())[0];
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
