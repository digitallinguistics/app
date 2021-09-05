import Language from '../models/Language.js';
import Text     from '../models/Text.js';

const IndexedDB = window.indexedDB;

/**
 * A utility class for performing methods on an IndexedDB object store.
 * @memberof services#Database
 */
class Collection {

  /**
   * A reference to the IndexedDB database instance
   * @type {IDBDatabase}
   */
  idb;

  /**
   * The class that serves as the model for each instance in this collection.
   * @type {Function}
   */
  Model;

  /**
   * The name of the object store that this collection corresponds to.
   * @type {String}
   */
  storeName;

  /**
   * Create a new Collection
   * @param {String}      objectStoreName The name of the object store to use for the collection
   * @param {Function}    Model           An ES6 class. Items in this collection will be instances of this model.
   * @param {IDBDatabase} database        The instance of the IndexedDB database to create transactions on.
   */
  constructor(objectStoreName, Model, database) {

    Object.defineProperties(this, {
      idb: {
        configurable: true,
        enumerable:   true,
        value:        database,
        writable:     false,
      },
      Model: {
        configurable: true,
        enumerable:   true,
        value:        Model,
        writable:     false,
      },
      storeName: {
        configurable: true,
        enumerable:   true,
        value:        objectStoreName,
        writable:     false,
      },
    });

  }

  // CRUD OPERATIONS

  /**
   * Adds an item to the database
   * @param  {Object|Array}          [data=[]] The data to add.
   * @return {Promise<Object|Array>}           Returns a Promise that resolves to the new database item or an array of the new database items.
   */
  add(data = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(data);

      const items = (isArrayInput ? data : [data])
      .map(item => (item instanceof this.Model ? item : new this.Model(item)));

      const txn = this.idb.transaction(this.storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(isArrayInput ? items : items[0]);
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.storeName);

      items.forEach(item => store.add(item));

    });
  }

  /**
   * Deletes the item or items with the specified client ID(s) (cid(s)) by adding a "deleted" flag to the item.
   * @param  {String|Array} clientIDs A client ID (cid) or Array of client IDs of the item(s) to delete.
   * @return {Promise}
   */
  delete(clientIDs = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(clientIDs);
      const cids         = isArrayInput ? clientIDs : [clientIDs];
      const txn          = this.idb.transaction(this.storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve();
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.storeName);

      for (const cid of cids) {

        store.get(cid).onsuccess = ev => {
          const item = ev.target.result;
          item.deleted = true;
          store.put(item);
        };

      }

    });
  }

  /**
   * Retrieves an item from the database by client ID (cid), or an IndexedDB key range.
   * @param  {String|IDBKeyRange}   key The client ID (cid) of the item, or an IDBKeyRange.
   * @return {Promise<Object|null>}     Returns a Promise that resolves to the retrieved item, or null if not found.
   */
  get(key) {
    return new Promise((resolve, reject) => {

      const txn = this.idb.transaction(this.storeName);
      let result;

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(result);
      txn.onerror    = () => reject(txn.error);

      txn.objectStore(this.storeName)
      .get(key)
      .onsuccess = ev => {
        ({ result } = ev.target);
        result = result ? new this.Model(result) : null;
      };

    });
  }

  /**
   * Retrieves all the items from the collection.
   * @param  {Object}             [options={}]
   * @param  {Integer}            [options.count]         The number of items to return if more than 1 is found.
   * @param  {Boolean}            [options.deleted=false] Whether to include deleted items in the results.
   * @param  {String|IDBKeyRange} [options.query]         The client ID (cid) or an IDBKeyRange to limit the results to.
   * @return {Promise}                                    Returns a Promise that resolves to an Array of items in the collection.
   */
  getAll({
    query,
    count,
    deleted = false,
  } = {}) {
    return new Promise((resolve, reject) => {

      const txn = this.idb.transaction(this.storeName);
      let result;

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(result);
      txn.onerror    = () => reject(txn.error);

      txn.objectStore(this.storeName)
      .getAll(query, count)
      .onsuccess = ev => {
        result = ev.target.result.map(item => new this.Model(item));
        if (!deleted) result = result.filter(item => !item.deleted);
      };

    });
  }

  /**
   * Adds or updates one or more items to the collection.
   * @param  {Object|Array} [data=[]] An object or array of objects to add to the collection.
   * @return {Promise}                Returns the new object or an array of new objects, with client IDs (cid).
   */
  put(data = []) {
    return new Promise((resolve, reject) => {

      const isArrayInput = Array.isArray(data);

      const items = (isArrayInput ? data : [data])
      .map(item => (item instanceof this.Model ? item : new this.Model(item)));

      const txn = this.idb.transaction(this.storeName, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(isArrayInput ? items : items[0]);
      txn.onerror    = () => reject(txn.error);

      const store = txn.objectStore(this.storeName);

      items.forEach(item => store.put(item));

    });
  }

}

/**
 * A class representing a local database
 * @memberof services
 */
export default class Database {

  // PROPERTIES

  /**
   * A reference to the IndexedDB instance.
   */
  idb;

  /**
   * The name of the database.
   * @type {String}
   */
  get name() {
    return `Lotus`;
  }

  /**
   * The database version number.
   * @type {Integer}
   */
  get version() {
    return 1;
  }

  /**
   * A lookup of database types, with their corresponding object store names.
   * @type {Object}
   */
  types = {
    Language: {
      Model:     Language,
      storeName: `languages`,
    },
    Text:     {
      Model:     Text,
      storeName: `texts`,
    },
  };

  // COLLECTIONS

  /**
   * The Languages collection.
   * @type {Collection}
   */
  languages;

  /**
   * The Texts collection.
   * @type {Collection}
   */
  texts;

  // METHODS

  /**
   * Configures the Lotus database by adding tables and indexes. Can only be run during a open database transaction.
   */
  #configureDatabase() {

    if (!this.idb.objectStoreNames.contains(`languages`)) {

      const store = this.idb.createObjectStore(`languages`, { keyPath: `cid` });

      store.createIndex(`abbreviation`, `abbreviation`, { unique: false });
      store.createIndex(`dateModified`, `dateModified`, { unique: false });

    }

    if (!this.idb.objectStoreNames.contains(`texts`)) {

      const store = this.idb.createObjectStore(`texts`, { keyPath: `cid` });

      store.createIndex(`abbreviation`, `abbreviation`, { unique: false });
      store.createIndex(`dateModified`, `dateModified`, { unique: false });
      store.createIndex(`language`, `language.cid`, { unique: false });

    }

  }

  /**
   * Creates the collections for performing operations on object stores
   */
  #createCollections() {
    Object.entries(this.types).forEach(([, { Model, storeName }]) => {
      this[storeName] = new Collection(storeName, Model, this.idb);
    });
  }

  /**
   * Deletes the database.
   * @return {Promise}
   */
  deleteDatabase() {
    return new Promise((resolve, reject) => {

      const req = IndexedDB.deleteDatabase(this.name);

      req.onerror = reject;

      req.onsuccess = () => {
        console.info(`${ this.name } database deleted.`);
        resolve();
      };

    });
  }

  /**
   * Exports all the data in the database and returns an array of JavaScript objects.
   * @fires Database#onexportupdate
   * @return {Promise<Array>}
   */
  exportData() {

    const storeNames = this.idb.objectStoreNames;

    const data           = [];
    let   numItems       = 0;
    let   exportProgress = 0;

    const countItems = () => new Promise((resolve, reject) => {

      const txn = this.idb.transaction(Array.from(storeNames));

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(numItems);
      txn.onerror    = () => reject(txn.error);

      for (const storeName of storeNames) {
        // eslint-disable-next-line no-loop-func
        txn.objectStore(storeName).count().onsuccess = ev => {
          numItems += ev.target.result;
        };
      }

    });

    const getItems = () => new Promise((resolve, reject) => {

      const txn = this.idb.transaction(Array.from(storeNames));

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(data);
      txn.onerror    = () => reject(txn.error);

      for (const storeName of storeNames) {
        // eslint-disable-next-line no-loop-func
        txn.objectStore(storeName).getAll().onsuccess = ev => {

          const { result } = ev.target;

          if (!result.length) return;
          data.push(...result);
          exportProgress += ev.target.result.length;

          if (this.onexportupdate) {
            this.onexportupdate({
              count: exportProgress,
              total: numItems,
            });
          }

        };
      }

    });

    return countItems().then(getItems);

  }

  /**
   * Imports one or more items or array of items into the database.
   * @param  {Object|Array}          [data=[]] An object, an array of of objects, or an array of arrays of objects, to import.
   * @return {Promise<Object|Array>}           Returns the newly-added item or array of items.
   */
  importData(data = []) {

    let items = (Array.isArray(data) ? data : [data]).flat(2);

    if (items.some(item => !item.type)) {
      const e = new TypeError(`Each item must have a "type" property to import.`);
      e.name = `MissingTypeError`;
      throw e;
    }

    items = items
    .map(item => new this.types[item.type].Model(item));

    const objectStoreNames = Array.from(this.idb.objectStoreNames);

    return new Promise((resolve, reject) => {

      const txn = this.idb.transaction(objectStoreNames, `readwrite`);

      txn.onabort    = () => reject(txn.error);
      txn.oncomplete = () => resolve(items);
      txn.onerror    = () => reject(txn.error);

      items.forEach((item, i) => {
        txn.objectStore(this.types[item.type].storeName)
        .put(item).onsuccess = ev => {
          items[i].cid = ev.target.result;
        };
      });

    });

  }

  /**
   * Initialize the DLx database
   * @return {Promise}
   */
  async initialize() {
    await this.#openDatabase();
    this.#createCollections();
  }

  #openDatabase() {
    return new Promise((resolve, reject) => {

      const req = IndexedDB.open(this.name, this.version);

      req.onblocked = reject;
      req.onerror   = reject;

      req.onupgradeneeded = () => {
        this.idb = req.result;
        this.#configureDatabase();
      };

      req.onsuccess = () => {

        this.idb = req.result;

        this.idb.onabort = ev => {
          throw ev.target;
        };

        this.idb.onerror = ev => {
          throw ev.target;
        };

        // Do not automatically reload the page here.
        // It causes tests to refresh, and is bad UX.
        this.idb.onversionchange = () => this.idb.close();

        resolve(this.idb);

      };

    });
  }

}

/**
 * onexportupdate event. This event is fired during database export each time an item is retrieved from the database.
 *
 * @event Database#onexportupdate
 * @type {Object}
 * @property {Integer} count - The current total number of items that have been exported so far.
 * @property {Integer} total - The total number of items to export.
 */
