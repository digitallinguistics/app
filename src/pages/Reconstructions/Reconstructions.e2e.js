describe(`Reconstructions`, function() {

  it(`renders`, function() {
    cy.visit(`/`);
    cy.contains(`#nav[data-loaded] li`, `Reconstructions`)
    .click();
    cy.contains(`.reconstructions-page .page-title`, `Reconstructions`);
  });

});
