describe(`Languages`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=Languages]`)
    .click();

    cy.get(`#main[data-page=Languages]`);

  });

});
