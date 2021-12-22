import Model           from '../core/Model.js';
import MultiLangString from './MultiLangString.js';
import Note            from './Note.js';

/**
 * A class representing an orthography.
 * @extends Model
 * @memberof Models
 */
class Orthography extends Model {

  /**
   * Create a new Orthography.
   * @param {Object} data The orthography data.
   */
  constructor(data = {}) {

    super(data, { type: `Orthography` });

    /**
     * The name for this orthography.
     * @type {MultiLangString}
     */
    this.name = new MultiLangString(this.name);


    /**
     * The abbreviation for this orthography.
     * @default ""
     * @type {String}
     */
    this.abbreviation ??= ``;

    /**
     * An array of notes about this orthography.
     * @default
     * @type {Note[]}
     */
    this.notes ??= [];
    this.notes = this.notes.map(noteData => new Note(noteData));

  }

}

export default Orthography;
