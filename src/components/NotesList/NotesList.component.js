describe(`Notes List`, function() {

  it(`can render custom heading levels`, function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--heading-level`);
    cy.contains(`.notes-list h2`, `Notes`);
  });

});
