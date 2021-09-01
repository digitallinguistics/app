describe(`Languages`, () => {

  before(function() {
    cy.visit(`/`);
    cy.get(`#nav li[data-page=Languages]`)
    .click();
  });

  it(`adds a language from the Language Editor`);

  it(`adds a language from the Languages List`, function() {

    cy.get(`#main[data-page=Languages`)
    .within(() => {

      cy.get(`.languages-list .add-language-button`)
      .click();

      cy.get(`.languages-list li`).contains(`{ new language }`);

      // TODO: Check that Language Editor renders with an empty form.

    });

  });

});
