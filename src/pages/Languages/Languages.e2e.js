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

    cy.focused().should(`have.class`, `line-input`);

    cy.contains(`.languages-nav li`, `{ new language }`);

    // delete the language

    cy.window().then(win => {

      cy.stub(win, `prompt`).returns(`YES`);

      cy.contains(`Delete this Language`)
      .click();

      cy.get(`#nav[data-loaded=true] li[data-page=Languages]`)
      .click();

      cy.get(`.js-languages-page__languages-list`).children()
      .should(`have.length`, 0);

    });

  });

  it(`adds / switches / edits a language`, function() {

    // setup
    cy.visit(`/`);

    cy.get(`#main[data-page=Home]`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.contains(`.js-languages-page__nav-add-lang-button`, `Add a language`)
    .click();

    cy.clock(new Date);

    // edit the language name
    cy.get(`.js-language-editor__name input[name=name-eng]`)
    .should(`have.value`, `{ new language }`)
    .clear()
    .type(`Chitimacha`);

    cy.tick(delay); // wait for debounce

    // check that Languages List was updated
    cy.contains(`.languages-page__nav li`, `Chitimacha`);

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

    cy.get(`input[name=autonym-default]`)
    .type(`Sitimaxa`);

    cy.tick(delay); // wait for debounce

    cy.get(`input[name=abbreviation]`)
    .type(`chiti`);

    cy.tick(delay); // wait for debounce

    cy.get(`input[name=iso]`)
    .type(`ctm`);

    cy.tick(delay); // wait for debounce

    cy.get(`input[name=glottocode]`)
    .type(`chit1248`);

    cy.tick(delay); // wait for debounce

    // switch page and back to check that the changes were saved

    cy.contains(`#nav li`, `Home`)
    .click();

    cy.get(`#main[data-page=Home]`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    // NOTE: The previous language should be loaded automatically.

    cy.get(`input[name=name-eng]`)
    .should(`have.value`, `Chitimacha`);

    cy.get(`input[name=autonym-default]`)
    .should(`have.value`, `Sitimaxa`);

    cy.get(`input[name=abbreviation]`)
    .should(`have.value`, `chiti`);

    cy.get(`input[name=iso]`)
    .should(`have.value`, `ctm`);

    cy.get(`input[name=glottocode]`)
    .should(`have.value`, `chit1248`);

    cy.contains(`.language-editor__additional-names`, `Shetimachas (French)`);

    cy.get(`.js-language-editor__date-modified`)
    .should(`have.text`, new Date().toLocaleDateString(undefined, { dateStyle: `short` }));

  });

});
