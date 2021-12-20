import Database from './Database.js';
import Language from '../models/Language.js';
import Lexeme   from '../models/Lexeme.js';

describe(`Database`, function() {

  beforeEach(async function() {
    indexedDB.deleteDatabase(`Lotus`);
    this.db = new Database;
    await this.db.initialize();
  });

  after(function() {
    indexedDB.deleteDatabase(`Lotus`);
  });

  it(`add (one item)`, async function() {

    const lang = await this.db.languages.add({});

    expect(lang).to.be.an.instanceof(Language);
    expect(lang.cid).to.be.a(`string`);
    expect(lang.dateCreated).to.be.an.instanceOf(Date);
    // sets `dateModified` on save
    expect(lang.dateModified).to.be.an.instanceOf(Date);

  });

  it(`add (multiple items)`, async function() {

    const langA = { cid: `1` };
    const langB = { cid: `2` };

    const [resultA, resultB] = await this.db.languages.add([langA, langB]);
    expect(resultA.cid).to.equal(langA.cid);
    expect(resultB.cid).to.equal(langB.cid);
    expect(resultA).to.be.an.instanceof(Language);
    expect(resultB).to.be.an.instanceof(Language);

  });

  it.only(`addAnalysisLanguage`, async function() {

    const language = new Language({ name: `Plains Cree` });

    const newAnalysisLanguage = {
      abbreviation: `fra`,
      language:     `French`,
      tag:          `fra`,
    };

    const lexeme = new Lexeme({
      language: language.cid,
    });

    // SETUP
    // Add a Language and related Lexeme to the database.
    await new Promise((resolve, reject) => {

      const txn = this.db.idb.transaction([`languages`, `lexemes`], `readwrite`);

      txn.oncomplete = resolve;
      txn.onerror    = reject;
      txn.onsuccess  = resolve;

      txn.objectStore(`languages`).add(language);
      txn.objectStore(`lexemes`).add(lexeme);

    });

    // ACTION
    // Run `addAnalysisLanguage()`.
    await this.db.addAnalysisLanguage(lexeme.language, newAnalysisLanguage);

    // ASSERTION
    // Check that the Language and its Lexemes have been updated.
    await new Promise((resolve, reject) => {

      const txn = this.db.idb.transaction([`languages`, `lexemes`]);

      txn.oncomplete = resolve;
      txn.onerror = reject;
      txn.onsuccess = resolve;

      // check Language
      txn.objectStore(`languages`)
      .get(language.cid)
      .onsuccess = ev => {
        const { result } = ev.target;
        expect(result.name.get(newAnalysisLanguage.tag)).to.equal(``);
        expect(result.orthographies.every(ortho => ortho.name.get(newAnalysisLanguage.tag) === ``)).to.be.true;
      };

      // check Lexeme
      txn.objectStore(`lexemes`)
      .get(lexeme.cid)
      .onsuccess = ev => {
        const { result } = ev.target;
        console.log(result);
      };

    });

  });

  it(`delete (one item)`, function() {
    return new Promise((resolve, reject) => {

      const cid = 1;
      const langData = { cid };

      this.db.idb.transaction(`languages`, `readwrite`)
      .objectStore(`languages`)
      .add(langData)
      .onsuccess = () => {

        this.db.languages.delete(cid)
        .then(() => {

          this.db.idb.transaction(`languages`)
          .objectStore(`languages`)
          .getAll()
          .onsuccess = ev => {
            const [lang] = ev.target.result;
            expect(lang.deleted).to.be.true;
            resolve();
          };

        })
        .catch(reject);

      };

    });
  });

  it(`delete (multiple items)`, function() {
    return new Promise((resolve, reject) => {

      const langA = { cid: 1 };
      const langB = { cid: 2 };

      const txn = this.db.idb.transaction(`languages`, `readwrite`);
      const store = txn.objectStore(`languages`);

      txn.oncomplete = () => {

        this.db.languages.delete([1, 2])
        .then(() => {

          this.db.idb.transaction(`languages`)
          .objectStore(`languages`)
          .getAll()
          .onsuccess = ev => {
            const [resultA, resultB] = ev.target.result;
            expect(resultA.deleted).to.be.true;
            expect(resultB.deleted).to.be.true;
            resolve();
          };

        })
        .catch(reject);

      };

      store.add(langA);
      store.add(langB);

    });
  });

  it(`exportData`, function() {
    return new Promise((resolve, reject) => {

      const lang = { cid: 1, type: `Language` };
      const text = { cid: 2, tags: { test: true }, type: `Text` };

      const txn = this.db.idb.transaction([`languages`, `texts`], `readwrite`);

      txn.oncomplete = () => {

        // For unknown reasons, transpiling this code with ESBuild breaks
        // Cypress + Sinon stubs, and `to.have.been.calledTwice` isn't recognized.
        // Need to use custom stubbing here instead.
        let count = 0;

        const stub = () => {
          count++;
        };

        this.db.onexportupdate = stub;

        this.db.exportData()
        .then(([langExport, textExport]) => {
          expect(langExport.cid).to.equal(lang.cid);
          expect(textExport.cid).to.equal(text.cid);
          expect(textExport.tags.test).to.be.true;
          expect(count).to.equal(2);
          resolve();
        })
        .catch(reject);

      };

      txn.objectStore(`languages`).add(lang);
      txn.objectStore(`texts`).add(text);

    });
  });

  it(`get (one item)`, function() {
    return new Promise((resolve, reject) => {
      this.db.idb.transaction(`languages`, `readwrite`)
      .objectStore(`languages`)
      .add({ cid: 1, customProp: true })
      .onsuccess = () => {

        this.db.languages.get(1)
        .then(result => {
          expect(result).to.be.an.instanceof(Language);
          expect(result.customProp).to.be.true;
          resolve();
        })
        .catch(reject);

      };
    });
  });

  it(`get (null)`, async function() {
    const result = await this.db.languages.get(1);
    expect(result).to.be.null;
  });

  it(`getAll`, function() {
    return new Promise((resolve, reject) => {

      const txn = this.db.idb.transaction(`languages`, `readwrite`);
      const store = txn.objectStore(`languages`);

      txn.oncomplete = () => {
        this.db.languages.getAll()
        .then(result => {
          expect(result).to.have.lengthOf(2);
          const [langA, langB] = result;
          expect(langA.customProp).to.be.true;
          expect(langB.customProp).to.be.false;
          expect(langA).to.be.an.instanceof(Language);
          expect(langB).to.be.an.instanceof(Language);
          resolve();
        })
        .catch(reject);
      };

      store.add({ cid: 1, customProp: true });
      store.add({ cid: 2, customProp: false });

    });
  });

  it(`update (one item)`, function() {
    return new Promise((resolve, reject) => {

      // NB: There's no need to test the add-or-update functionality here,
      // because this functionality is built into IDB's .put() method.

      const langData = { cid: 1 };

      this.db.idb.transaction(`languages`, `readwrite`)
      .objectStore(`languages`)
      .add(langData)
      .onsuccess = () => {

        langData.customProp = true;

        this.db.languages.put(langData)
        .then(result => {
          expect(result).to.be.an.instanceof(Language);
          expect(result.customProp).to.be.true;
          resolve();
        })
        .catch(reject);

      };
    });
  });

  it(`update (multiple items)`, function() {
    return new Promise((resolve, reject) => {

      const langA = { cid: 1 };
      const langB = { cid: 2 };

      const txn = this.db.idb.transaction(`languages`, `readwrite`);
      const store = txn.objectStore(`languages`);

      txn.oncomplete = () => {

        langA.customProp = true;
        langB.customProp = false;

        this.db.languages.put([langA, langB])
        .then(results => {

          expect(results).to.have.lengthOf(2);

          const [resultA, resultB] = results;

          expect(resultA.customProp).to.be.true;
          expect(resultB.customProp).to.be.false;
          expect(resultA).to.be.an.instanceof(Language);
          expect(resultB).to.be.an.instanceof(Language);

          resolve();

        })
        .catch(reject);

      };

      store.add(langA);
      store.add(langB);

    });
  });

});
