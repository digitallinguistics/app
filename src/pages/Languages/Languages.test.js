describe(`Languages`, () => {

  it(`renders`, () => {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=Languages]`)
    .click();

    cy.get(`#main[data-page=Languages]`);

  });

});
