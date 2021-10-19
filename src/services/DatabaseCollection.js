/**
 * A utility class for performing methods on an IndexedDB object store.
 * @memberof Services
 */
class DatabaseCollection {

  /**
   * A reference to the IndexedDB database instance
   * @type {IDBDatabase}
   */
  #idb;

  /**
   * The class that serves as the model for each instance in this collection.
   * @type {Function}
   */
  #Model;

  /**
   * The name of the object store that this collection corresponds to.
   * @type {String}
   */
  #storeName;

  /**
   * Create a new Collection
   * @param {String}      objectStoreName The name of the object store to use for the collection
   * @param {Function}    Model           An ES6 class. Items in this collection will be instances of this model.
   * @param {IDBDatabase} database        The instance of the IndexedDB database to create transactions on.
   */
  constructor(objectStoreName, Model, database) {
    this.#idb       = database;
    this.#Model     = Model;
    this.#storeName = objectStoreName;
  }

  // CRUD OPERATIONS

  /**
   * Add an item to the database.
   * @param  {Object|Array}          [data=[]] The data to add.
   * @return {Promise<Object|Array>}           Returns a Promise that resolves to the new database item or an array of the new database items.
   */
  add(data = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(data);

      const items = (isArrayInput ? data : [data])
      .map(item => (item instanceof this.#Model ? item : new this.#Model(item)));

      const txn = this.#idb.transaction(this.#storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(isArrayInput ? items : items[0]);
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.#storeName);

      items.forEach(item => {
        item.dateModified = new Date;
        store.add(item);
      });

    });
  }

  /**
   * Delete the item or items with the specified client ID(s) (cid(s)) by adding a "deleted" flag to the item.
   * @param  {String|Array} clientIDs A client ID (cid) or Array of client IDs of the item(s) to delete.
   * @return {Promise}
   */
  delete(clientIDs = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(clientIDs);
      const cids         = isArrayInput ? clientIDs : [clientIDs];
      const txn          = this.#idb.transaction(this.#storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve();
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.#storeName);

      for (const cid of cids) {

        store.get(cid).onsuccess = ev => {
          const item        = ev.target.result;
          item.deleted      = true;
          item.dateModified = new Date;
          store.put(item);
        };

      }

    });
  }

  /**
   * Retrieve an item from the database by client ID (cid), or an IndexedDB key range.
   * @param  {String|IDBKeyRange}   key The client ID (cid) of the item, or an IDBKeyRange.
   * @return {Promise<Object|null>}     Returns a Promise that resolves to the retrieved item, or null if not found.
   */
  get(key) {
    return new Promise((resolve, reject) => {

      const txn = this.#idb.transaction(this.#storeName);
      let result;

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(result);
      txn.onerror    = () => reject(txn.error);

      txn.objectStore(this.#storeName)
      .get(key)
      .onsuccess = ev => {
        ({ result } = ev.target);
        result = result ? new this.#Model(result) : null;
      };

    });
  }

  /**
   * Retrieve all the items from the collection.
   * @param  {Object}             [options={}]
   * @param  {Integer}            [options.count]                The number of items to return if more than 1 is found.
   * @param  {Boolean}            [options.includeDeleted=false] Whether to include deleted items in the results.
   * @param  {String|IDBKeyRange} [options.query]                The client ID (cid) or an IDBKeyRange to limit the results to.
   * @return {Promise<Array>}                                    Returns a Promise that resolves to an Array of items in the collection.
   */
  getAll({
    query,
    count,
    includeDeleted = false,
  } = {}) {
    return new Promise((resolve, reject) => {

      const txn = this.#idb.transaction(this.#storeName);
      let result;

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(result);
      txn.onerror    = () => reject(txn.error);

      txn.objectStore(this.#storeName)
      .getAll(query, count)
      .onsuccess = ev => {
        result = ev.target.result.map(item => new this.#Model(item));
        if (!includeDeleted) result = result.filter(item => !item.deleted);
      };

    });
  }

  /**
   * Run a callback for each item in the collection. Useful for retrieving very large collections asynchronously.
   * @param   {Function} cb                       The callback function to call on each returned item.
   * @param   {Object}   [options={}]             Options
   * @param   {Boolean}  [options.includeDeleted] Whether to include deleted items in the results.
   * @returns {Promise}
   */
  iterate(cb, { includeDeleted = false } = {}) {
    return new Promise((resolve, reject) => {

      const txn = this.#idb.transaction(this.#storeName);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve();
      txn.onerror    = () => reject(txn.error);

      txn.objectStore(this.#storeName)
      .openCursor()
      .onsuccess = ev => {
        const cursor = ev.target.result;
        if (!cursor) return;
        const data = cursor.value;
        if (!includeDeleted && data.deleted) return;
        const model = new this.#Model(data);
        cb(model);
        cursor.continue();
      };

    });
  }

  /**
   * Add or update one or more items to the collection.
   * @param  {Object|Array} [data=[]] An object or array of objects to add to the collection.
   * @return {Promise}                Returns the new object or an array of new objects, with client IDs (cid).
   */
  put(data = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(data);

      const items = (isArrayInput ? data : [data])
      .map(item => item instanceof this.#Model ? item : new this.#Model(item));

      const txn = this.#idb.transaction(this.#storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(isArrayInput ? items : items[0]);
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.#storeName);

      items.forEach(item => {
        item.dateModified = new Date;
        store.put(item);
      });

    });
  }

}

export default DatabaseCollection;
