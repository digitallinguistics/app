import Language from './Language.js';

describe(`Language`, function() {

  it(`type`, function() {
    const language = new Language;
    expect(language.type).to.equal(`Language`);
  });

});
