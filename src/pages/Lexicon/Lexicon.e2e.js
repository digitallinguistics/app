describe(`Lexicon`, function() {

  beforeEach(function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
    cy.get(`#nav[data-loaded=true]`);
  });

  it.only(`when no language is selected, it renders the Language Chooser and creates a new language`, function() {

    cy.contains(`#nav li`, `Lexicon`)
    .click();

    cy.contains(`Add a language`)
    .click();

    cy.get(`.language-editor [name=name-eng]`)
    .should(`have.value`, `{ new language }`);

  });

  it(`when no language is selected, it renders the Language Chooser and selectes a language`);

  it(`renders the page for the current language`, function() {

    // visit the Chitimacha language page

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.contains(`.languages-list li`, `Chitimacha`)
    .click();

    cy.get(`#name-eng`)
    .should(`have.value`, `Chitimacha`);

    // visit the Lexicon page

    cy.contains(`#nav li`, `Lexicon`)
    .click();

    cy.contains(`h1`, `Chitimacha`);

  });

});
