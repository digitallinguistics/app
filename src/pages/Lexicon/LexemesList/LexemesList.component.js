import Lexeme from '../../../models/Lexeme.js';

describe(`Lexemes List`, function() {

  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=lexicon-lexemes-list--small-list`);
  });

  it(`renders 1 row for each item`, function() {
    cy.fixture(`lexemes`)
    .then(data => {

      const lexemes = data.map(item => new Lexeme(item));

      for (const lexeme of lexemes) {
        cy.contains(`li`, lexeme.lemma.default);
      }

    });
  });

  it(`changes the selected item`, function() {

    const blue1 = `rgb(204, 224, 255)`;

    cy.get(`.lexemes-list li:first-child`)
    .click()
    .should(`have.css`, `background-color`, blue1);

  });

});
