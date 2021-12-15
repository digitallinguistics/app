describe(`Analysis Language`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=languages-analysis-language--analysis-language`);
  });

  it(`shows / hides the editor`, function() {

    cy.get(`.js-analysis-language__editor`)
    .should(`not.be.visible`);

    cy.get(`.js-analysis-language__edit-button`)
    .click();

    cy.get(`.js-analysis-language__editor`)
    .should(`be.visible`);

    cy.focused()
    .should(`have.class`, `js-analysis-language__lang-input`);

    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-analysis-language__editor`)
    .should(`not.be.visible`);

  });

  it(`updates the preview text`, function() {

    cy.get(`.js-analysis-language__edit-button`)
    .click();

    cy.get(`.js-analysis-language__lang-input`)
    .clear()
    .type(`Spanish`);

    cy.get(`.js-analysis-language__abbr-input`)
    .clear()
    .type(`spa`);

    cy.get(`.js-analysis-language__tag-input`)
    .clear()
    .type(`es`);

    cy.contains(`p`, `Spanish spa es`);

  });

  it(`cancels editing`, function() {

    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`p`).should(`have.value`, ``);

  });

  it(`does not save without a tag`, function() {

    cy.get(`.js-analysis-language__edit-button`)
    .click();

    cy.get(`.js-analysis-language__tag-input`)
    .clear();

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-analysis-language__tag-input`).then(([input]) => {
      expect(input.validationMessage).to.be.a(`string`);
    });

  });

  it(`saves updates`, function() {

    cy.get(`.js-analysis-language__lang-input`)
    .clear()
    .type(`Spanish`);

    cy.get(`.js-analysis-language__abbr-input`)
    .clear()
    .type(`spa`);

    cy.get(`.js-analysis-language__tag-input`)
    .clear()
    .type(`es`);

    cy.contains(`button`, `Save`)
    .click();

    cy.contains(`p`, `Spanish spa es`);

  });

  it(`disables tag input after first save`, function() {
    cy.get(`.js-analysis-language__edit-button`)
    .click();

    cy.get(`.js-analysis-language__tag-input`)
    .should(`be.disabled`);
  });

  it(`sets empty abbreviation to match tag`, function() {
    cy.get(`.js-analysis-language__abbr-input`)
    .clear();

    cy.contains(`button`, `Save`)
    .click();

    cy.contains(`p`, `Spanish es es`);
  });

});
