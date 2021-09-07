describe(`Languages List`, function() {

  it(`adds a language`, function() {
    cy.visit(`/`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list button`, `Add a Language`).click();
    cy.contains(`.languages-list li`, `{ new language }`);
  });

  it(`changes languages`, function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list li`, `Nuuchahnulth`).click();
    cy.get(`.language-editor[data-language=1]`); // TODO: Check for language name instead
    cy.contains(`.languages-list li`, `Chitimacha`).click();
    cy.get(`.language-editor[data-language=2]`); // TODO: Check for language name instead
  });

});