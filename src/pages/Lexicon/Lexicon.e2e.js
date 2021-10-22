describe(`Lexicon`, function() {

  it(`renders the page`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true]`);
    cy.contains(`#nav li`, `Lexicon`)
    .click();
    cy.get(`#main[data-page=Lexicon]`);
  });

});
