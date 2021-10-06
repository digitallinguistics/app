describe(`Language Editor`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=languages-language-editor--blank`);
  });

  it(`adds an Additional Name`, function() {

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 0);

    cy.contains(`button`, `Add a Language Name`)
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

  it(`deletes an empty additional name when editing is canceled`, function() {

    cy.contains(`button`, `Add a Language Name`)
    .click();

    cy.get(`.js-additional-name__cancel-button`)
    .click();

    cy.get(`.js-language-editor__names-list`)
    .children()
    .should(`have.lengthOf`, 0);
    
  });

});
