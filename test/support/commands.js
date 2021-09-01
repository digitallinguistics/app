import setupStore from './setupStore.js';

Cypress.Commands.add(`setupStore`, storeName => cy.fixture(`/${ storeName }.json`)
.then(items => setupStore(storeName, items)));
