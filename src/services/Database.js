import Collection from './DatabaseCollection.js';
import Language   from '../models/Language.js';
import Text       from '../models/Text.js';

const IndexedDB = window.indexedDB;

/**
 * A class representing a local database.
 * @memberof Services
 */
export default class Database {

  // PROPERTIES

  idb;

  get name() {
    return `Lotus`;
  }

  get version() {
    return 1;
  }

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

  languages;

  texts;

  // METHODS

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

  #createCollections() {
    Object.entries(this.types).forEach(([, { Model, storeName }]) => {
      this[storeName] = new Collection(storeName, Model, this.idb);
    });
  }

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
