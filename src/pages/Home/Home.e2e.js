describe(`Home`, function() {

  it(`renders`, function() {
    cy.visit(`/`);
    cy.get(`#home-page`);
  });

});
