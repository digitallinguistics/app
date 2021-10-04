const delay = 500;

describe(`Languages`, () => {

  it(`adds / deletes a language from the Language Editor`, function() {
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.language-editor button`, `Add a Language`).click();
    cy.contains(`.languages-nav li`, `{ new language }`);
    cy.window().then(win => {
      cy.stub(win, `prompt`).returns(`YES`);
      cy.contains(`Delete this Language`).click();
      cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
      cy.get(`.languages-nav .languages-list`).children()
      .should(`have.length`, 0);
      cy.get(`.language-editor .add-language-button`);
    });
  });

  it.only(`adds / switches / edits a language`, function() {

    // setup
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-nav button`, `Add a Language`).click();
    cy.clock();

    // edit the language name
    cy.get(`.js-language-editor__name input[name=name-eng]`)
    .should(`have.value`, `{ new language }`)
    .clear()
    .type(`Chitimacha`);
    cy.tick(delay); // wait for debounce

    // check that Languages List was updated
    cy.contains(`.languages-nav li`, `Chitimacha`);

    // add a language name

    cy.contains(`.language-editor button`, `Add a Language Name`)
    .click();

    cy.get(`.language-editor__additional-names`)
    .within(() => {

      cy.get(`.js-additional-name__name-input`)
      .type(`Shetimachas`);

      cy.get(`.js-additional-name__lang-input`)
      .type(`French`);

      cy.get(`.js-additional-name__save-button`)
      .click();
    
    });

    // edit the remaining data
    cy.get(`.language-editor`)
    .within(() => {

      cy.get(`.js-language-editor__autonym input[name=autonym-default]`)
      .type(`Sitimaxa`);

      cy.get(`input[name=abbreviation]`)
      .type(`chiti`);
      
    });
    
    cy.tick(delay); // wait for debounce

    // switch page and back to check that the changes were saved
    cy.contains(`#nav li`, `Home`).click();
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();

    // NOTE: The previous language should be loaded automatically.
    cy.get(`.language-editor`)
    .within(() => {

      cy.get(`.js-language-editor__name input[name=name-eng]`)
      .should(`have.value`, `Chitimacha`);

      cy.get(`.js-language-editor__autonym input[name=autonym-default]`)
      .should(`have.value`, `Sitimaxa`);

      cy.get(`input[name=abbreviation]`)
      .should(`have.value`, `chiti`);

      cy.contains(`.language-editor__additional-names`, `Shetimachas (French)`);

    });

  });

});
