import Collection from './DatabaseCollection.js';
import Language   from '../models/Language.js';
import Lexeme     from '../models/Lexeme.js';
import Text       from '../models/Text.js';

const IndexedDB = window.indexedDB;

/**
 * A class representing a local database.
 * @memberof Services
 */
export default class Database {

  // PROPERTIES

  /**
   * A reference to the IndexedDB instance.
   * @type {IndexedDB}
   */
  idb;

  /**
   * @const
   * @default "Lotus"
   * @returns {String}
   */
  get name() {
    return `Lotus`;
  }

  /**
   * @const
   * @default 1
   * @returns {Integer}
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
    Lexeme: {
      Model:     Lexeme,
      storeName: `lexemes`,
    },
    Text:     {
      Model:     Text,
      storeName: `texts`,
    },
  };

  // COLLECTIONS

  /**
   * The Languages collection.
   * @type {DatabaseCollection}
   */
  languages;

  /**
   * The Lexemes collection.
   * @type {DatabaseCollection}
   */
  lexemes;

  /**
   * The Texts collection.
   * @type {DatabaseCollection}
   */
  texts;

  // METHODS

  /**
   * Configure the Lotus database by adding tables and indexes. Can only be run during an IDBOpenDBRequest.
   * @private
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
      store.createIndex(`language`, `language`, { unique: false });

    }

    if (!this.idb.objectStoreNames.contains(`lexemes`)) {
      const store = this.idb.createObjectStore(`lexemes`, { keyPath: `cid` });
      store.createIndex(`key`, `key`, { unique: false });
    }

  }

  /**
   * Create collections for each database type, for performing operations on object stores.
   * @private
   */
  #createCollections() {
    Object.entries(this.types).forEach(([, { Model, storeName }]) => {
      this[storeName] = new Collection(storeName, Model, this.idb);
    });
  }

  /**
   * Delete the database.
   * @returns {Promise}
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
   * Export all the data in the database and return an Array of JavaScript Objects.
   * @fires   Database#onexportupdate
   * @returns {Promise<Array>}
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
   * Import one or more items into the database.
   * @param {Object|Array} [data=[]] An Object, an Array of Objects, or an Array of Arrays of Objects, to import.
   * @returns {Promise<Object|Array>} Returns the added item or Array of items.
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
   * Initialize the database.
   * @return {Promise}
   */
  async initialize() {
    await this.#openDatabase();
    this.#createCollections();
  }

  /**
   * Open the IndexedDB database.
   * @private
   * @returns {Promise<IDBDatabase>}
   */
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
 * @event Services.Database#onexportupdate
 * @type {Object}
 * @property {Integer} count - The current total number of items that have been exported so far.
 * @property {Integer} total - The total number of items to export.
 */
