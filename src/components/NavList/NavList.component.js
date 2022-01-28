describe(`Nav List`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-nav-list--nav-list`);
  });

  it(`sets the current item`, function() {
    cy.get(`.nav-list`)
    .children()
    .first()
    .click()
    .should(`have.class`, `current`);
  });

});
