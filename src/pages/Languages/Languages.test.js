const delay = 500;

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

    // setup
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list button`, `Add a Language`).click();
    cy.clock();

    // edit the language name
    cy.get(`.language-editor .name input[name=name-eng]`)
    .clear()
    .type(`Chitimacha`);
    cy.tick(delay); // wait for debounce

    // check that Languages List was updated
    cy.contains(`.languages-list li`, `Chitimacha`);

    // edit the autonym
    cy.get(`.language-editor .autonym input[name=autonym-default]`)
    .type(`Sitimaxa`);

    cy.tick(delay); // wait for debounce

    // switch page and back to check that the changes were saved
    cy.contains(`#nav li`, `Home`).click();
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list li`, `Chitimacha`).click();

    cy.get(`.language-editor`)
    .within(() => {

      cy.get(`.name input[name=name-eng]`)
      .should(`have.value`, `Chitimacha`);

      cy.get(`.autonym input[name=autonym-default]`)
      .should(`have.value`, `Sitimaxa`);

    });

  });

});
