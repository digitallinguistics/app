import { v4 as createUUID } from '../../node_modules/uuid/dist/esm-browser/index.js';

export default class Model {

  /**
   * Create a new Model.
   * @constructs Model
   * @memberof Core
   * @param {*}      data           The data for this model.
   * @param {Object} [options={}]   An options object.
   * @param {String} [options.type] The type for this model.
   */
  constructor(
    data = {},
    { type } = {},
  ) {
      
    Object.assign(this, data);
      
    Object.defineProperties(this, {

      /**
       * The client ID for this model. Generated on instantiation if not already present.
       * @name Model#cid
       * @readonly
       * @type {UUID}
       */
      cid: {
        enumerable: true,
        value:      data.cid ?? createUUID(),
      },

      /**
       * The date that the data for this model were originally created. Generated on instantiation if not already present.
       * @name Model#dateCreated
       * @readonly
       * @type {Date}
       */
      dateCreated: {
        enumerable: true,
        value:      this.dateCreated ? new Date(this.dateCreated) : new Date,
      },
    
    });

    /**
     * The date that the data for this model were last modified. Generated on instantiation if not already present.
     * @type {Date}
     */
    this.dateModified = this.dateModified ? new Date(this.dateModified) : new Date;

    /**
     * The type for this model, e.g. `Language`, `Text`, `Lexeme`, etc.
     * @name Model#type
     * @const
     * @readonly
     * @type {String}
     */
    Object.defineProperty(this, `type`, {
      enumerable: true,
      value:      this.type ?? type,
    });
  
  }

}
