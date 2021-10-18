describe(`Home`, function() {

  it(`renders`, function() {
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
  });

});
