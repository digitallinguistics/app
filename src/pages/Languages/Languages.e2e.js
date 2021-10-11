const delay = 500;

describe(`Languages`, () => {

  it(`adds / deletes a language from the Language Editor`, function() {

    // visit Languages page
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    // add a language from the editor
    cy.contains(`.js-language-editor__add-language-button`, `Add a Language`)
    .click();

    // cy.focused().should(`have.class`, `js-name??`);

    cy.contains(`.languages-nav li`, `{ new language }`);

    // delete the language
    cy.window().then(win => {

      cy.stub(win, `prompt`).returns(`YES`);

      cy.contains(`Delete this Language`)
      .click();

      cy.get(`#nav[data-loaded=true] li[data-page=Languages]`)
      .click();

      cy.get(`.languages-nav .languages-list`).children()
      .should(`have.length`, 0);

    });

  });

  it(`adds / switches / edits a language`, function() {

    // setup
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`)
    .click();
    cy.contains(`.languages-nav button`, `Add a Language`)
    .click();
    cy.clock(new Date);

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

    // add an additional language name

    cy.get(`.language-editor__additional-names`)
    .within(() => {

      cy.get(`.js-additional-name__name-input`)
      .type(`Shetimachas`);

      cy.get(`.js-additional-name__lang-input`)
      .clear()
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
    cy.contains(`#nav li`, `Home`)
    .click();
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`)
    .click();

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

      cy.get(`.js-language-editor__date-modified`)
      .should(`have.text`, new Date().toLocaleDateString(undefined, { dateStyle: `short` }));

    });

  });

});
