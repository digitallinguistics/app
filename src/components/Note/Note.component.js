describe(`Note`, function() {

  it(`displays the editor when the Edit button is clicked`, function() {

    cy.visit(`http://localhost:6006/iframe.html?id=components-note--populated`);
    cy.get(`.js-edit-button`)
    .click();

    cy.get(`fieldset`)
    .should(`be.visible`);
    
  });

});
