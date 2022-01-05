const delay = 500;

describe(`Languages`, () => {

  it(`adds / deletes a language from the Language Editor`, function() {

    // visit Languages page

    cy.visit(`/`);

    cy.contains(`#nav[data-loaded] li`, `Languages`)
    .click();

    // add a language

    cy.contains(`.js-lang-chooser__button`, `Add a language`)
    .click();

    cy.focused().should(`have.class`, `line-input`);

    cy.contains(`.languages-page__nav li`, `{ new language }`);

    // delete the language

    cy.window().then(win => {

      cy.stub(win, `prompt`).returns(`YES`);

      cy.contains(`Delete this language`)
      .click();

      cy.get(`.js-lang-chooser__list`).children()
      .should(`have.length`, 0);

    });

  });

  it(`adds / switches / edits a language`, function() {

    // setup

    cy.visit(`/`);

    cy.contains(`#nav[data-loaded] li`, `Languages`)
    .click();

    cy.contains(`.js-lang-chooser__button`, `Add a language`)
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

    cy.contains(`.language-editor button`, `Add a language name`)
    .click();

    cy.get(`.language-editor__additional-names`)
    .within(() => {

      cy.get(`.js-additional-name__name-input`)
      .type(`Shetimachas`);

      cy.get(`.js-additional-name__lang-input`)
      .clear()
      .type(`French`);

      cy.get(`.js-notes-list__add-note-button`)
      .click();

      cy.get(`.js-note__text-input`)
      .clear()
      .type(`This is text in a note.`);

      cy.get(`.js-note__save-button`)
      .click();

      cy.get(`.js-additional-name__save-button`)
      .click();

    });

    // add an orthography + note

    cy.contains(`.language-editor button`, `Add an orthography`)
    .click();

    cy.get(`.language-editor__orthographies`)
    .within(() => {

      cy.get(`[id="orthography-name-0-eng"]:visible`)
      .type(`English`);

      cy.get(`.js-orthography__abbr-input:visible`)
      .clear()
      .type(`eng`);

      cy.get(`.js-orthography__save-button:visible`)
      .click();

      cy.get(`.js-notes-list__add-note-button`)
      .first()
      .click();

      cy.get(`.js-note__text-input`)
      .clear()
      .type(`This is text in a note`);

      cy.get(`.js-note__save-button`)
      .click();

    });

    // add an analysis language + note

    cy.contains(`.language-editor button`, `Add an analysis language`)
    .click();

    cy.get(`.language-editor__analysis-languages`)
    .within(() => {

      cy.get(`.js-analysis-language__lang-input:visible`)
      .type(`French`);

      cy.get(`.js-analysis-language__abbr-input:visible`)
      .clear()
      .type(`fra`);

      cy.get(`.js-analysis-language__tag-input:visible`)
      .clear()
      .type(`fr`);

      cy.get(`.js-analysis-language__save-button:visible`)
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

    cy.get(`#home-page`);

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

    cy.get(`.language-editor__orthographies .js-notes-list__notes`)
    .children()
    .should(`have.lengthOf`, 1);

    cy.contains(`.language-editor__additional-names`, `Shetimachas (French)`);
    cy.get(`.language-editor__additional-names .additional-name .js-notes-list__notes`)
    .should(`have.lengthOf`, 1);

    cy.contains(`.language-editor__orthographies`, `Name English Abbreviation eng`);
    cy.contains(`.language-editor__analysis-languages`, `French fra fr`);

    cy.get(`.js-language-editor__date-modified`)
    .should(`have.text`, new Date().toLocaleDateString(undefined, { dateStyle: `short` }));

  });

});
