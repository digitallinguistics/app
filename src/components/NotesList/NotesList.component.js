describe(`Notes List`, function() {

  it(`can render custom heading levels`, function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--heading-level`);
    cy.contains(`.notes-list h2`, `Notes`);
  });

  it(`adds a note`, function() {
    
    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--empty`);
    
    cy.get(`.js-add-note-button`)
    .click();
    
    cy.get(`.notes`)
    .children()
    .should(`have.lengthOf`, 1);

    // TODO: Note should be visible.

  });

});
