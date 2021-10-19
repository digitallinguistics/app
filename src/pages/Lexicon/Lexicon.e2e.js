describe(`Lexicon`, function() {

  before(function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
    cy.get(`#nav[data-loaded=true]`);
  });

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
