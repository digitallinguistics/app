describe(`App`, function() {
  it(`updates ARIA live region on page change`, function() {

    cy.visit(`/`);

    cy.get(`#info`).should(`contain`, `Home page`);

    cy.contains(`#nav li`, `Languages`).click();

    cy.get(`#info`).should(`contain`, `Languages page`);

  });
});
