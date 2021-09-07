describe(`Languages`, () => {

  it(`adds / deletes a language from the Language Editor`, function() {
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.language-editor button`, `Add a Language`).click();
    cy.contains(`.languages-list li`, `{ new language }`);
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
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list button`, `Add a Language`).click();
    // TODO: edit the name field
    // TODO: check that the languages list is updated
    // TODO: switch languages and back, and check that the change saved
  });

});
