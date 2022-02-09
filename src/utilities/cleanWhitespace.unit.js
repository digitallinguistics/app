import cleanWhitespace from './cleanWhitespace.js';
import { expect }    from 'chai';


describe(`cleanWhitespace`, function() {
  it(`trims whitespace`, function() {
    const testString = `randomstr1`;
    const paddedString = `  ${ testString }   `;
    const result = cleanWhitespace(paddedString);
    expect(result).to.equal(testString);
  });

  it(`replaces multiple whitespaces`, function() {
    const word1 = `word1`;
    const word2 = `word2`;
    const extraSpaceString = `${ word1 }  ${ word2 }`;
    const result = cleanWhitespace(extraSpaceString);
    expect(result).to.equal(`${ word1 } ${ word2 }`);
  });

  it(`replaces tabs`, function() {
    const word = `word`;
    const stringContainsTab = `${ word }  ${ word }`;
    const result = cleanWhitespace(stringContainsTab);
    expect(result).to.equal(`${ word } ${ word }`);
  });
});
