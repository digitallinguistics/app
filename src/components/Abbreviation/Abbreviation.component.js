describe(`Cypress test`, function() {
  it(`works`, function() {
    cy.visit(`http://localhost:3000/iframe.html?id=components-abbreviation--required`);
    cy.get(`abbr`)
    .should(`have.text`, `DLx`);
  });
});
