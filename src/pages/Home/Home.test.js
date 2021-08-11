describe(`Home`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=Home]`)
    .click();

    cy.get(`#main[data-page=Home]`);

  });

});
