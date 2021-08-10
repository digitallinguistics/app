Cypress.Commands.add(`clearPage`, () => {
  cy.document()
  .then(doc => {
    doc.querySelector(`main`).innerHTML = ``;
  });
});
