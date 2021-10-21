const setupStore = require(`./setupStore.cjs`);

Cypress.Commands.add(`setupStore`, storeName => cy.fixture(`/${ storeName }.json`)
.then(items => setupStore(storeName, items)));
