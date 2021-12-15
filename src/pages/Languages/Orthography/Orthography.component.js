describe(`Orthography`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=languages-orthography--orthography`);
  });

  it(`shows / hides the editor`, function() {

    cy.get(`.js-orthography__editor`)
    .should(`not.be.visible`);

    cy.get(`.js-orthography__edit-button`)
    .click();

    cy.get(`.js-orthography__editor`)
    .should(`be.visible`);

    cy.focused()
    .should(`have.class`, `line-input`);

    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-orthography__editor`)
    .should(`not.be.visible`);

  });

  it(`updates the preview text`, function() {

    cy.get(`.js-orthography__edit-button`)
    .click();

    cy.get(`[id="orthography-name-1-eng"]`)
    .clear()
    .type(`English`);

    cy.get(`.js-orthography__abbr-input`)
    .clear()
    .type(`eng`);

    cy.contains(`p`, `Name English Abbreviation eng`);

  });

  it(`cancels editing`, function() {

    cy.contains(`button`, `Cancel`)
    .click();

    cy.contains(`p`, `Name Cyrillic Abbreviation cyr`);

  });

  it(`does not save without an abbreviation`, function() {

    cy.get(`.js-orthography__edit-button`)
    .click();

    cy.get(`.js-orthography__abbr-input`)
    .clear();

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-orthography__abbr-input`).then(([input]) => {
      expect(input.validationMessage).to.be.a(`string`);
    });

  });

  it(`saves updates`, function() {

    cy.get(`[id="orthography-name-1-eng"]`)
    .clear()
    .type(`English`);

    cy.get(`.js-orthography__abbr-input`)
    .clear()
    .type(`eng`);

    cy.contains(`button`, `Save`)
    .click();

    cy.contains(`p`, `Name English Abbreviation eng`);

  });

});
