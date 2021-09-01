describe(`Languages`, () => {

  before(function() {
    cy.visit(`/`);
    cy.get(`#nav li[data-page=Languages]`)
    .click();
  });

  it(`renders the Add a Language button when there are no languages`, function() {
    cy.get(`#main[data-page=Languages] .language-editor .add-language-button`);
  });

  it(`adds a language`, function() {

    cy.get(`#main[data-page=Languages`)
    .within(() => {

      cy.get(`.languages-list .add-language-button`)
      .click();

      cy.get(`.languages-list li`).contains(`{ new language }`);

      // TODO: Check that Language Editor renders with an empty form.

    });

  });

});
