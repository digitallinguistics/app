describe(`App`, function() {

  it(`updates the ARIA live region on page change`, function() {
    cy.visit(`/`);
    cy.get(`#info`).should(`contain`, `home page`);
    cy.contains(`#nav li`, `Languages`).click();
    cy.get(`#info`).should(`contain`, `languages page`);
  });

  it(`displays the Language Chooser when no language is selected`, function() {

    cy.visit(`/`);
    cy.setupStore(`languages`);

    cy.contains(`#nav li`, `Lexicon`)
    .click();

    cy.get(`#language-chooser .nav-list`)
    .children()
    .then(items => {
      const [langA, langB, langC, langD] = items;
      expect(langA).to.have.text(`Àhàn`);
      expect(langB).to.have.text(`Chitimacha`);
      expect(langC).to.have.text(`nêhiyawêwin`);
      expect(langD).to.have.text(`Nuuchahnulth`);
    });

  });

});
