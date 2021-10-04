import Model from '../core/Model.js';

/**
 * A class representing a note.
 * @extends Model
 * @memberof Models
 */
class Note extends Model {

  /**
   * Create a new Note.
   * @param {Object} data The note data.
   */
  constructor(data = {}) {

    super(data, { type: `Note` });

    /**
     * The language of this note.
     * @default "English"
     * @type {String}
     */
    this.language ??= `English`;

    /**
     * The type of note.
     * @default "general"
     * @type {String}
     */
    this.noteType ??= `general`;

    /**
     * The source of this note.
     * @default ""
     * @type {String}
     */
    this.source ??= ``;

    /**
     * The text of this note.
     * @default ""
     * @type {String}
     */
    this.text ??= ``;
  
  }

}

export default Note;
