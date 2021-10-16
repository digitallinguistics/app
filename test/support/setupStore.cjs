/**
 * Sets up an object store prior to a test
 * @param  {String} storeName  The name of the object store to set up
 * @param  {Array}  [items=[]] An array of items to add to the store
 * @return {Promise<Array>}
 */
module.exports = async function setupStore(storeName, items = []) {

  const { default: Database } = await import(`../../src/services/Database.js`);
  const db = new Database;
  await db.initialize();

  return new Promise((resolve, reject) => {

    const { idb } = db;
    const txn     = idb.transaction(storeName, `readwrite`);
    const store   = txn.objectStore(storeName);

    txn.oncomplete = () => resolve(items);
    txn.onerror    = e => reject(e);

    store.clear();

    items.forEach(item => {
      store.add(item);
    });

  });

};
