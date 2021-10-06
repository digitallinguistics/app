const loremFragment = `Velit tempor`;
const newSrc        = `SRC`;
const newText       = `This is new note text.`;

describe(`Note`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-note--populated`);
  });

  it(`shows / hides the editor with Edit + Cancel buttons`, function() {

    cy.get(`.js-note__edit-button`)
    .click();

    cy.get(`.js-note__editor`)
    .should(`be.visible`);

    // can open editor by clicking note text preview
    cy.get(`.js-note__text-input`)
    .should(`have.focus`)
    .clear()
    .type(newText);

    cy.get(`.js-note__src-input`)
    .clear()
    .type(newSrc);
    
    cy.contains(`button`, `Cancel`)
    .click();

    cy.get(`.js-note__editor`)
    .should(`not.be.visible`);

    // none of the Note fields should be updated after cancellation

    cy.contains(`b`, `DWH`);

    cy.get(`.js-note__date-modified`)
    .should(`have.text`, new Date(`2021-01-01`).toLocaleDateString(undefined, { dateStyle: `short` }));
    
    cy.contains(`p`, loremFragment);
    
  });

  it(`edits / saves with click-on-text + Save buttons`, function() {

    cy.contains(`p`, loremFragment)
    .click();

    cy.get(`.js-note__editor`)
    .should(`be.visible`);

    cy.get(`.js-note__text-input`)
    .clear()
    .type(newText);

    cy.get(`.js-note__src-input`)
    .clear()
    .type(newSrc);

    cy.contains(`button`, `Save`)
    .click();

    cy.get(`.js-note__editor`)
    .should(`not.be.visible`);

    cy.contains(`b`, `SRC`);

    cy.get(`.js-note__date-modified`)
    .should(`have.text`, new Date().toLocaleDateString(undefined, { dateStyle: `short` }));

    cy.contains(`p`, newText);

  });

});
