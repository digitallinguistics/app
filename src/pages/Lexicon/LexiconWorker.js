const storeName = `lexemes`;
let db;

function comparator(a, b) {
  return a.displayName.localeCompare(b.displayName, undefined, { sensitivity: `base` });
}

function getLexemes(languageCID) {
  return new Promise((resolve, reject) => {

    const txn     = db.transaction(storeName);
    const results = [];

    txn.onabort    = () => reject(txn.error);
    txn.oncomplete = () => resolve(results);
    txn.onerror    = () => reject(txn.error);

    const store = txn.objectStore(storeName);
    const req   = store.index(`displayName`).openCursor();

    req.onsuccess = ev => {

      const cursor = ev.target.result;

      if (!cursor) return;

      const lexeme = cursor.value;

      if (
        lexeme.language === languageCID
        && !lexeme.deleted
      ) {
        results.push(lexeme);
      }

      cursor.continue();

    };

  });
}

function getRandomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

function initializeDatabase() {
  return new Promise((resolve, reject) => {

    const req = indexedDB.open(`Lotus`);

    req.onerror = reject;

    req.onsuccess = ev => {
      db = ev.target.result;
      resolve();
    };

  });
}

/**
 * Utility function for testing the database. Keep this in the code for the time being.
 * @returns {Promise}
 */
function populateDatabase() {
  return new Promise((resolve, reject) => {

    const lexemes = [];

    for (let i = 0; i < 25000; i++) {
      lexemes.push({
        cid:         String(i),
        displayName: getRandomString(),
        language:    `bf8d2dc7-0a3e-48c0-b07b-af2171f21500`,
        lemma:       {
          default: `Lexeme ${ i }`,
        },
      });
    }

    const txn = db.transaction(storeName, `readwrite`);

    txn.onsuccess = () => resolve();
    txn.onerror   = ev => reject(ev.target.error);

    const store = txn.objectStore(storeName);

    lexemes.forEach(lexeme => store.put(lexeme));

  });
}

async function renderList(operationID, { language }) { // eslint-disable-line no-unused-vars

  // await populateDatabase();
  const lexemes = await getLexemes(language);

  // lexemes.sort(comparator);

  const last = lexemes.pop();

  for (const lexeme of lexemes) {
    self.postMessage({ data: lexeme, done: false, operationID });
  }

  self.postMessage({ data: last, done: true, operationID });

}

self.addEventListener(`message`, async ({ data: { data, operation, operationID } }) => {
  if (!db) await initializeDatabase();
  self[operation](operationID, data);
});

