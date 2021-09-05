import { v4 as createUUID } from '../../node_modules/uuid/dist/esm-browser/index.js';

/**
 * A base model that each of the other models extends from.
 * @memberof core
 * @instance
 */
export default class Model {

  /**
   * The client ID (CID) of this model. This property is set automatically when a new model is created.
   * @type {String}
   */
  cid;

  constructor(data = {}) {
    Object.assign(this, data);
    this.cid = data.cid ?? createUUID();
  }

}
