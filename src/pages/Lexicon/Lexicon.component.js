describe(`Lexicon page`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=lexicon-lexicon-page--lexicon-page`);
  });

  it(`displays the language name in the default analysis language`, function() {
    cy.contains(`h1`, `Chitimacha`);
  });

});
