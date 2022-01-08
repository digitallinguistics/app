const storeName = `lexemes`;
let db;

function getRandomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

/**
 * Utility function for testing the database. Keep this in the code for the time being.
 * @returns {Promise}
 */
function populateDatabase() { // eslint-disable-line no-unused-vars
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
