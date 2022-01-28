describe(`Nav`, function() {

  it(`expands/collapses`, function() {

    cy.visit(`http://localhost:6006/iframe.html?id=app-main-nav--main-nav`);

    cy.get(`#nav button`)
    .click();

    cy.get(`#nav li[data-page=languages] span`)
    .then(text => {
      Cypress.dom.isHidden(text);
    });

  });

});
