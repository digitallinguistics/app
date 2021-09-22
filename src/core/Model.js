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
    
    Object.defineProperty(this, `cid`, {
      value: data.cid ?? createUUID(),
    });

    if (type) {
      Object.defineProperty(this, `type`, {
        value: type,
      });
    }
  
  }

}
