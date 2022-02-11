describe(`Reconstructions`, function() {

  it(`renders`, function() {
    cy.visit(`/`);
    cy.contains(`#nav li`, `Reconstructions`)
    .click();
    cy.contains(`.page-title`, `Reconstructions`);
  });

});
