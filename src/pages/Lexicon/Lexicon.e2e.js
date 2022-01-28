describe(`Lexicon`, function() {

  beforeEach(function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
  });

  it(`when no language is selected, it renders the Language Chooser`, function() {

    cy.contains(`#nav li`, `Lexicon`)
    .click();

    cy.get(`#language-chooser`);

  });

  it(`renders the page for the current language`, function() {

    // visit the Chitimacha language page

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.contains(`li`, `Chitimacha`)
    .click();

    cy.get(`#name-eng`)
    .should(`have.value`, `Chitimacha`);

    // visit the Lexicon page

    cy.contains(`#nav li`, `Lexicon`)
    .click();

    cy.contains(`h1`, `Chitimacha`);

  });

});
