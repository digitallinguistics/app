import { v4 as createUUID } from '../../node_modules/uuid/dist/esm-browser/index.js';

/**
 * A base model that each of the other models extends from.
 * @memberof core
 * @instance
 */
export default class Model {

  constructor(
    data = {},
    { type } = {},
  ) {
    
    Object.assign(this, data);

    Object.defineProperties(this, {
      cid: {
        enumerable: true,
        value:      data.cid ?? createUUID(),
      },
      dateCreated: {
        enumerable: true,
        value:      this.dateCreated ? new Date(this.dateCreated) : new Date,
      },
    });

    this.dateModified = this.dateModified ? new Date(this.dateModified) : new Date;

    if (type) {
      Object.defineProperty(this, `type`, {
        enumerable: true,
        value:      type,
      });
    }
  
  }

}
