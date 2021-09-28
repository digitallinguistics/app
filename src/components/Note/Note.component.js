describe(`Note`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-note--populated`);
  });

  it(`shows / hides the editor with Edit + Cancel buttons`, function() {

    cy.get(`.js-edit-button`)
    .click();

    cy.get(`.js-editor`)
    .should(`be.visible`);

    cy.get(`.js-text-input`)
    .should(`have.focus`);
    
    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-editor`)
    .should(`not.be.visible`);
  
  });

  it(`edits / saves with Edit + Save buttons`, function() {
    
    cy.get(`.js-edit-button`)
    .click();

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-editor`)
    .should(`not.be.visible`);

  });

});
