describe(`Orthography`, function() {

  it(`saves notes on page change`, function() {

    cy.visit(`/`);

    cy.get(`#home-page`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.contains(`.js-language-editor__add-language-button`, `Add a language`)
    .click();

    cy.contains(`.language-editor button`, `Add an orthography`)
    .click();

    cy.get(`.language-editor__orthographies`)
    .within(() => {

      cy.get(`.js-orthography__abbr-input:visible`)
      .type(`eng`);

      cy.get(`.js-orthography__save-button:visible`)
      .click();

      // add a note
      cy.get(`.js-notes-list__add-note-button`)
      .first()
      .click();

      cy.get(`.js-note__text-input`)
      .clear()
      .type(`This is text in a note`);

      cy.get(`.js-note__save-button`)
      .click();

    });

    // switch page and back to check that the changes were saved

    cy.contains(`#nav li`, `Home`)
    .click();

    cy.get(`#home-page`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.get(`.js-notes-list__notes`)
    .children()
    .should(`have.lengthOf`, 1);
  });

});
