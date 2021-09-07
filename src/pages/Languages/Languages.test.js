describe(`Languages`, () => {

  it(`adds / deletes a language from the Language Editor`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.language-editor .add-language-button`).click();
    cy.contains(`.languages-list`, `{ new language }`);
    cy.window().then(win => {
      cy.stub(win, `prompt`).returns(`YES`);
      cy.contains(`Delete this Language`).click();
      cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
      cy.get(`.languages-list .languages`).children()
      .should(`have.length`, 0);
      cy.get(`.language-editor .add-language-button`);
    });
  });

  it(`edits a language`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.languages-list .add-language-button`).click();
    // TODO: edit the name field
    // TODO: check that the languages list is updated
    // TODO: switch languages and back, and check that the change saved
  });

});
