describe(`Lexicon`, function() {

  it(`renders the page`, function() {
    cy.visit(`/`);
    cy.contains(`#nav li`, `Lexicon`)
    .click();
    cy.get(`#main[data-page=Lexicon]`);
  });

});
