describe(`App`, function() {

  it(`updates ARIA live region on page change`, function() {

    cy.visit(`/`);

    cy.get(`#info`).should(`contain`, `Home page`);

    cy.contains(`#nav li`, `Languages`).click();

    cy.get(`#info`).should(`contain`, `Languages page`);

  });

  it(`displays Language Chooser when no language is selected`, function(){
    cy.setupStore(`languages`);

    cy.visit(`/`);

    cy.setupStore(`languages`)

    cy.get(`#main[data-page=Home]`);

    cy.contains(`#nav li`, `Languages`)
    .click();

    cy.get(`.js-languages-page__languages-list`)
    .children()
    .then(items => {
      const [langA, langB, langC, langD] = items
      expect(langA).to.have.text('Àhàn')
      expect(langB).to.have.text('Chitimacha')
      expect(langC).to.have.text('nêhiyawêwin')
      expect(langD).to.have.text('Nuuchahnulth')
    })
  })

});
