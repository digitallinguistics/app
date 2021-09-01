describe(`Languages`, () => {

  before(function() {
    cy.fixture(`languages.json`).as(`languages`);
  });

  it(`renders`, () => {

    cy.visit(`/`);

    cy.get(`#nav li[data-page=Languages]`)
    .click();

    cy.get(`#main[data-page=Languages] .languages-list`);

  });

});
