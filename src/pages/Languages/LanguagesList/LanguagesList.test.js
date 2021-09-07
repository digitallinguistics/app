describe(`Languages List`, function() {

  it(`adds a language`, function() {
    cy.visit(`/`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.get(`.languages-list .add-language-button`).click();
    cy.contains(`.languages-list li`, `{ new language }`);
  });

  it.only(`changes languages`, function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
    cy.get(`#nav[data-loaded=true] li[data-page=Languages]`).click();
    cy.contains(`.languages-list li`, `Nuuchahnulth`).click();
    cy.get(`.language-editor[data-language=1]`);
    cy.contains(`.languages-list li`, `Chitimacha`).click();
    cy.get(`.language-editor[data-language=2`);
  });

});
