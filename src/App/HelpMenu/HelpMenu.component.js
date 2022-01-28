/**
 * Unit tests for HelpMenu
 */

before(function() {
  cy.visit(`http://localhost:6006/iframe.html?id=app-help-menu--help-menu&viewMode=story`);
});

describe(`HelpMenu`, function() {

  it(`can be cancelled using esc`, function() {

    cy.get(`.help-menu`)
    .click();

    cy.get(`.dropdown-content`)
    .should(`be.visible`);

    cy.get(`body`)
    .type(`{esc}`);

  });

});
