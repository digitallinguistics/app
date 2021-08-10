describe.only(`Languages`, function() {

  it(`renders`, function() {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=Languages]`)
    .click();

    cy.get(`#main[data-page=Languages]`);

    cy.get(`.languages-list .languages`)
    .children()
    .then(console.log);

  });

});
