describe(`Languages`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=languages]`)
    .click();

    cy.get(`#main[data-page=languages]`);

  });

});
