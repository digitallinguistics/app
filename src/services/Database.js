import Collection from './DatabaseCollection.js';
import Language from '../models/Language.js';
import Lexeme from '../models/Lexeme.js';
import Text from '../models/Text.js';

const IndexedDB = window.indexedDB;
const version = 1;

/**
 * A class representing a local database.
 * @memberof Services
 */
export default class Database {

  // PROPERTIES

  /**
   * A reference to the IndexedDB instance. This needs to be a publicly-accessible property for testing purposes.
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
   * @returns {Integer}
   */
  get version() {
    return version;
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
    Text: {
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
   * Add a new analysis language to the specified Language, and update all of the database items related to the specified language. All properties on the analysis language are required, even if they are empty strings.
   * @param  {String} languageCID                   The CID of the language to add the new analysis language to.
   * @param  {Object} analysisLanguage              The analysis language to add to the language.
   * @param  {String} analysisLanguage.abbreviation The abbreviation for this analysis language.
   * @param  {String} analysisLanguage.language     The name of this analysis language.
   * @param  {String} analysisLanguage.tag          The IETF language tag for this analysis language.
   * @return {Promise<Language>}                    Returns a promise that resolves to the updated Language.
   */
  addAnalysisLanguage(languageCID, analysisLanguage) {
    return new Promise(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor

      // Open a transaction for all the operations in this call.
      const txn = this.idb.transaction([`languages`, `lexemes`], `readwrite`);
      let language;

      txn.onabort = () => reject(txn.error);
      txn.oncomplete = () => resolve(language);
      txn.onerror = () => reject(txn.error);

      // update Language data
      await new Promise(resolve => {

        const languageStore = txn.objectStore(`languages`);
        const req = languageStore.get(languageCID);

        req.onsuccess = () => {

          const { tag } = analysisLanguage;
          language = new Language(req.result);

          language.analysisLanguages.push(analysisLanguage);
          language.name.set(tag, ``);

          for (const orthography of language.orthographies) {
            orthography.name.set(tag, ``);
          }

          languageStore.put(language);
          resolve();

        };

      });

      // update Lexemes for this Language
      const lexemeStore = txn.objectStore(`lexemes`);
      const index = lexemeStore.index(`language`);
      const keyRange = IDBKeyRange.only(languageCID);
      let progress = 0;

      const numLexemes = await new Promise(resolve => {
        const req = index.count(keyRange);
        req.onsuccess = () => resolve(req.result);
      });

      await new Promise(resolve => {

        const req = index.openCursor(keyRange);

        req.onsuccess = ev => {

          const cursor = ev.target.result;
          if (!cursor) return resolve();

          const lexeme = cursor.value;
          // TODO: Update Lexeme data as appropriate here.
          cursor.update(lexeme); // this finishes in a separate thread
          progress++;

          if (this.onupdate) {
            this.onupdate({
              count: progress,
              total: numLexemes,
            });
          }

          cursor.continue();

        };

      });

    });
  }

  /**
   * Configure the Lotus database by adding tables and indexes. Can only be run during an IDBOpenDBRequest.
   * @private
   * @param {IDBTransaction} txn The onupgradeneeded transaction.
   */
  #configureDatabase(txn) {

    // Languages

    if (!this.idb.objectStoreNames.contains(`languages`)) {
      this.idb.createObjectStore(`languages`, { keyPath: `cid` });
    }

    // Lexemes

    if (!this.idb.objectStoreNames.contains(`lexemes`)) {
      this.idb.createObjectStore(`lexemes`, { keyPath: `cid` });
    }

    const lexemesStore = txn.objectStore(`lexemes`);
    const lexemesIndexes = Array.from(lexemesStore.indexNames);

    if (!lexemesIndexes.includes(`language`)) {
      lexemesStore.createIndex(`language`, `language`, { unique: false });
    }

    if (!lexemesIndexes.includes(`lemma`)) {
      lexemesStore.createIndex(`lemma`, `_lemma`, { unique: false });
    }

    // Texts

    if (!this.idb.objectStoreNames.contains(`texts`)) {
      this.idb.createObjectStore(`texts`, { keyPath: `cid` });
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
   *
   * @param {String} languageCID The CID of the language to delete.
   * @param {String} tag         The IETF language tag to delete from the language.
   * @return {Promise<Language>} Returns a Promise that resolves to the updated Language.
   */
  deleteAnalysisLanguage(languageCID, tag) {
    return new Promise(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor

      // Open a transaction for all the operations in this call.
      const txn = this.idb.transaction([`languages`, `lexemes`], `readwrite`);
      let language;

      txn.onabort = () => reject(txn.error);
      txn.oncomplete = () => resolve(language);
      txn.onerror = () => reject(txn.error);

      // update Language data
      await new Promise(resolve => {

        const languageStore = txn.objectStore(`languages`);
        const req = languageStore.get(languageCID);

        req.onsuccess = () => {

          language = new Language(req.result);
          language.analysisLanguages = language.analysisLanguages.filter(lang => lang.tag !== tag);
          language.name.delete(tag);

          for (const orthography of language.orthographies) {
            orthography.name.delete(tag);
          }

          languageStore.put(language);
          resolve();

        };

      });

      // update Lexemes for this Language
      const lexemeStore = txn.objectStore(`lexemes`);
      const index = lexemeStore.index(`language`);
      const keyRange = IDBKeyRange.only(languageCID);
      let progress = 0;

      const numLexemes = await new Promise(resolve => {
        const req = index.count(keyRange);
        req.onsuccess = () => resolve(req.result);
      });

      await new Promise(resolve => {

        const req = index.openCursor(keyRange);

        req.onsuccess = ev => {

          const cursor = ev.target.result;
          if (!cursor) return resolve();

          const lexeme = cursor.value;
          lexeme.deleted = true;
          cursor.update(lexeme); // this finishes in a separate thread
          progress++;

          if (this.onupdate) {
            this.onupdate({
              count: progress,
              total: numLexemes,
            });
          }

          cursor.continue();

        };

      });

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
   * @fires   Database#onupdate
   * @returns {Promise<Array>}
   */
  exportData() {

    const storeNames = this.idb.objectStoreNames;

    const data = [];
    let numItems = 0;
    let exportProgress = 0;

    const countItems = () => new Promise((resolve, reject) => {

      const txn = this.idb.transaction(Array.from(storeNames));

      txn.onabort = () => reject(txn.error);
      txn.oncomplete = () => resolve(numItems);
      txn.onerror = () => reject(txn.error);

      for (const storeName of storeNames) {
        // eslint-disable-next-line no-loop-func
        txn.objectStore(storeName).count().onsuccess = ev => {
          numItems += ev.target.result;
        };
      }

    });

    const getItems = () => new Promise((resolve, reject) => {

      const txn = this.idb.transaction(Array.from(storeNames));

      txn.onabort = () => reject(txn.error);
      txn.oncomplete = () => resolve(data);
      txn.onerror = () => reject(txn.error);

      for (const storeName of storeNames) {
        // eslint-disable-next-line no-loop-func
        txn.objectStore(storeName).getAll().onsuccess = ev => {

          const { result } = ev.target;

          if (!result.length) return;
          data.push(...result);
          exportProgress += ev.target.result.length;

          if (this.onupdate) {
            this.onupdate({
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

      txn.onabort = () => reject(txn.error);
      txn.oncomplete = () => resolve(items);
      txn.onerror = () => reject(txn.error);

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
      req.onerror = reject;

      req.onupgradeneeded = () => {
        this.idb = req.result;
        this.#configureDatabase(req.transaction);
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
 * onupdate event. This event is fired during long-running database processes each time an item is added/retrieved/modified/deleted.
 *
 * @event Services.Database#onupdate
 * @type {Object}
 * @property {Integer} count - The current total number of items that have been updated so far.
 * @property {Integer} total - The total number of items to update.
 */
