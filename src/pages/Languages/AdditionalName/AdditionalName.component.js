describe(`Additional Name`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=languages-additional-name--additional-name`);
  });

  it(`shows / hides the editor`, function() {

    cy.get(`.js-additional-name__editor`)
    .should(`not.be.visible`);

    cy.get(`.js-additional-name__edit-button`)
    .click();

    cy.get(`.js-additional-name__editor`)
    .should(`be.visible`);

    cy.focused()
    .should(`have.class`, `js-additional-name__name-input`);

    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-additional-name__editor`)
    .should(`not.be.visible`);

  });

  it(`updates the preview text`, function() {

    cy.get(`.js-additional-name__edit-button`)
    .click();

    cy.get(`.js-additional-name__name-input`)
    .clear()
    .type(`español`);

    cy.get(`.js-additional-name__lang-input`)
    .clear()
    .type(`Spanish`);

    cy.contains(`p`, `español (Spanish)`);

  });

  it(`cancels editing`, function() {

    cy.contains(`button`, `Cancel`)
    .click();

    cy.contains(`p`, `espagnol (French)`);

  });

  it(`does not save without a name`, function() {
    cy.get(`.js-additional-name__edit-button`)
    .click();

    cy.get(`.js-additional-name__name-input`)
    .clear();

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-additional-name__name-input`).then(([input]) => {
      expect(input.validationMessage).to.be.a(`string`);
    });
  });


  it(`saves updates`, function() {

    cy.get(`.js-additional-name__name-input`)
    .clear()
    .type(`español`);

    cy.get(`.js-additional-name__lang-input`)
    .clear()
    .type(`Spanish`);

    cy.contains(`button`, `Save`)
    .click();

    cy.contains(`p`, `español (Spanish)`);

  });

});
