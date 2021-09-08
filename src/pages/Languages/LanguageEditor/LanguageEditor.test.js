describe(`Language Editor`, function() {

  before(function() {
    cy.fixture(`languages.json`).as(`languages`)
    .then(() => {
      [, this.lang] = this.languages;
    });
  });

  it(`renders data correctly`, function() {
    cy.visit(`/`);
    cy.setupStore(`languages`);
    cy.get(`#main[data-page=Home]`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.contains(`.languages-list li`, this.lang.name.eng).click();
    cy.get(`.name`).within(() => {

      cy.get(`input[name=name-eng]`)
      .should(`have.value`, this.lang.name.eng);

      cy.get(`input[name=name-ctm]`)
      .should(`have.value`, this.lang.name.ctm);

    });
  });

});
