describe(`Languages`, () => {

  it(`adds a language from the Language Editor`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.language-editor .add-language-button`).click();
    cy.contains(`.languages-list`, `{ new language }`);
  });

  it(`adds a language from the Languages List`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.languages-list .add-language-button`).click();
    cy.contains(`.languages-list`, `{ new language }`);
    // TODO: Check that Language Editor renders with an empty form.
  });

});
