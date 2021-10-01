describe(`Notes List`, function() {

  it(`can render custom heading levels`, function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--heading-level`);
    cy.contains(`.notes-list h2`, `Notes`);
  });

  it(`adds / deletes a note`, function() {
    
    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--empty`);
    
    cy.contains(`h3`, `Notes (0)`);
    
    cy.get(`.js-add-note-button`)
    .click();
    
    cy.contains(`h3`, `Notes (1)`);
    
    cy.get(`.notes`)
    .children()
    .should(`have.lengthOf`, 1);
    
    cy.focused()
    .should(`have.class`, `js-text-input`);
    
    cy.get(`.note .js-delete-button`)
    .click();
    
    cy.contains(`h3`, `Notes (0)`);

    cy.get(`.notes`)
    .children()
    .should(`have.lengthOf`, 0);

  });

  it(`has expanded / collapsed states`, function() {

    cy.visit(`http://localhost:6006/iframe.html?id=components-notes-list--collapsed`);

    cy.contains(`.notes .note-item:first-child .js-text-preview`, `Note A`)
    .should(`not.be.visible`);

    // click a note

    cy.get(`.notes .note-item:first-child .js-note-button`)
    .click();

    cy.contains(`.notes .note-item:first-child .js-text-preview`, `Note A`)
    .should(`be.visible`);

    // add a note

    cy.get(`.js-add-note-button`)
    .click();

    cy.focused()
    .should(`have.class`, `js-text-input`);

    cy.contains(`.notes .note-item:nth-child(2) .js-text-preview`, `Note A`)
    .should(`not.be.visible`);

    // expand

    cy.get(`h3`)
    .click();

    cy.contains(`.notes .note-item:nth-child(2) .js-text-preview`, `Note A`)
    .should(`be.visible`);

  });

});
