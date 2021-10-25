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
    .should(`have.class`, `js-orthography__name-input`);

    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-orthography__editor`)
    .should(`not.be.visible`);

  });

  it(`updates the preview text`, function() {

    cy.get(`.js-orthography__edit-button`)
    .click();

    cy.get(`.js-orthography__name-input`)
    .clear()
    .type(`English`);

    cy.get(`.js-orthography__abbr-input`)
    .clear()
    .type(`eng`);

    cy.contains(`p`, `English (eng)`);

  });

  it(`cancels editing`, function() {

    cy.contains(`button`, `Cancel`)
    .click();

    cy.contains(`p`, `Cyrillic (cyr)`);

  });

  it(`does not save without a name`, function() {

    cy.get(`.js-orthography__edit-button`)
    .click();

    cy.get(`.js-orthography__name-input`)
    .clear();

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-orthography__name-input`).then(([input]) => {
      expect(input.validationMessage).to.be.a(`string`);
    });

  });

  it(`saves updates`, function() {

    cy.get(`.js-orthography__name-input`)
    .clear()
    .type(`English`);

    cy.get(`.js-orthography__abbr-input`)
    .clear()
    .type(`eng`);

    cy.contains(`button`, `Save`)
    .click();

    cy.contains(`p`, `English (eng)`);

  });

});
