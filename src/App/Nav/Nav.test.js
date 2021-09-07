describe(`Nav`, function() {

  it(`expands/collapses`, function() {

    cy.visit(`/`);

    cy.get(`#nav button`)
    .click();

    cy.get(`#nav li[data-page=Languages] span`)
    .then(text => {
      Cypress.dom.isHidden(text);
    });

  });

});
