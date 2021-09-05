describe(`Home`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav[data-loaded=true] li[data-page=Home]`)
    .click();

    cy.get(`#main[data-page=Home]`);

  });

});
