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
      // should render a blank Language Editor
      cy.get(`.language-editor .add-language-button`);
    });
  });

  it(`adds / edits a language from the Languages List`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.languages-list .add-language-button`).click();
    cy.contains(`.languages-list`, `{ new language }`);
    // TODO: Check that Language Editor renders with an empty form.
  });

});
