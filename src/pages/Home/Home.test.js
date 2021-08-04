describe(`Home`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=home]`)
    .click();

    cy.get(`#main[data-page=home]`);

  });

});
