describe(`Note`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-note--populated`);
  });

  it(`displays the editor when the Edit button is clicked`, function() {

    cy.get(`.js-edit-button`)
    .click();

    cy.get(`.js-editor`)
    .should(`be.visible`);

    cy.get(`.js-text-input`)
    .should(`have.focus`);
    
  });

  it(`hides the editor when the Cancel button is clicked`, function() {
    
    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-editor`)
    .should(`not.be.visible`);
  
  });

});
