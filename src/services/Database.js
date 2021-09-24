import Collection from './DatabaseCollection.js';
import Language   from '../models/Language.js';
import Text       from '../models/Text.js';

const IndexedDB = window.indexedDB;

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
