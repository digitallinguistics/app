import Lexeme from './Lexeme.js';

describe(`Lexeme`, function() {

  it(`type`, function() {
    const lexeme = new Lexeme;
    expect(lexeme.type).to.equal(`Lexeme`);
  });

});
