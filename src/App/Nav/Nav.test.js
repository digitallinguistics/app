describe(`Nav`, function() {

  it(`expands/collapses`, function() {

    cy.visit(`/`);

    cy.get(`#nav button`)
    .click();

    cy.get(`#nav li[data-page=languages] span`)
    .then(text => {
      Cypress.dom.isHidden(text);
    });

  });

});
