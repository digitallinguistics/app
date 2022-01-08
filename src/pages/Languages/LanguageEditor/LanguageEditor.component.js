describe(`Language Editor`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=languages-language-editor--blank`);
  });

  it(`adds an Additional Name`, function() {

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 0);

    cy.contains(`.js-language-editor[data-ready] button`, `Add a language name`)
    .click();

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 1);

    cy.get(`.additional-name`);

  });

  it(`deletes an Additional Name`, function() {

    cy.get(`.js-additional-name__delete-button`)
    .click();

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 0);

  });

  it(`deletes an empty Additional Name when editing is canceled`, function() {

    cy.contains(`button`, `Add a language name`)
    .click();

    cy.get(`.js-additional-name__cancel-button`)
    .click();

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 0);

  });

  it(`adds an Orthography`, function() {

    cy.get(`.js-language-editor__orthographies-list`)
    .children()
    .should(`have.lengthOf`, 1);

    cy.contains(`button`, `Add an orthography`)
    .click();

    cy.get(`.js-language-editor__orthographies-list`)
    .children()
    .should(`have.lengthOf`, 2);

    cy.get(`.orthography`);

  });

  it(`deletes an Orthography`, function() {

    cy.get(`[data-id="0"]`).within(() => {
      cy.get(`.js-orthography__delete-button`)
      .click();
    });

    cy.get(`.js-language-editor__orthographies-list`)
    .children()
    .should(`have.lengthOf`, 1);

  });

  it(`adds an Analysis Language`, function() {

    cy.get(`.js-language-editor__analysis-langs-list`)
    .children()
    .should(`have.lengthOf`, 1);

    cy.contains(`button`, `Add an analysis language`)
    .click();

    cy.get(`.js-language-editor__analysis-langs-list`)
    .children()
    .should(`have.lengthOf`, 2);

    cy.get(`.analysis-language`);

  });

  it(`only saves unique Analysis Languages`, function() {

    cy.get(`[data-id="0"]`).within(() => {
      cy.get(`.js-analysis-language__lang-input`)
      .clear()
      .type(`English`);

      cy.get(`.js-analysis-language__tag-input`)
      .clear()
      .type(`en`);

      cy.get(`.js-analysis-language__save-button`)
      .click();

      cy.on(`window:alert`, alertText => {
        expect(alertText).to.contains(`This Analysis Language cannot be saved. Analysis languages must have unique names, abbreviations, and IETF language tags.`);
      });
    });

  });

  it(`deletes an Analysis Language`, function() {

    cy.window().then(win => {

      cy.stub(win, `prompt`).returns(`YES`);

      cy.get(`[data-id="0"]`).within(() => {
        cy.get(`.js-analysis-language__delete-button`)
        .click();
      });

      cy.get(`.js-language-editor__analysis-langs-list`)
      .children()
      .should(`have.lengthOf`, 1);
      
    });
  });

  it(`deletes an empty Orthography when editing is canceled`, function() {

    cy.contains(`button`, `Add an orthography`)
    .click();

    cy.get(`.js-orthography__cancel-button:visible`)
    .click();

    cy.get(`.js-language-editor__orthographies-list`)
    .children()
    .should(`have.lengthOf`, 1);

  });

  it(`deletes an empty Analysis Language when editing is canceled`, function() {

    cy.contains(`button`, `Add an analysis language`)
    .click();

    cy.get(`.js-analysis-language__cancel-button:visible`)
    .click();

    cy.get(`.js-language-editor__analysis-langs-list`)
    .children()
    .should(`have.lengthOf`, 1);

  });

  it(`does not delete the last Orthography`, function() {

    cy.get(`[data-id="0"]`).within(() => {
      cy.get(`.js-orthography__delete-button`)
      .click();
    });

    cy.get(`.js-language-editor__orthographies-list`)
    .children()
    .should(`have.lengthOf`, 1);

  });

  it(`does not delete the last Analysis Language`, function() {

    cy.get(`[data-id="0"]`).within(() => {
      cy.get(`.js-analysis-language__delete-button`)
      .click();
    });

    cy.get(`.js-language-editor__analysis-langs-list`)
    .children()
    .should(`have.lengthOf`, 1);

  });

  it(`updates the metadata fields on save`, function() {

    const delay = 500;
    const date  = new Date;  // random date

    cy.clock(date);

    cy.get(`.js-language-editor__name input`)
    .type(`Chitimacha`);

    cy.tick(delay);

    cy.get(`.js-language-editor__date-modified`)
    .should(`have.text`, date.toLocaleDateString(undefined, { dateStyle: `short` }));

  });

});
