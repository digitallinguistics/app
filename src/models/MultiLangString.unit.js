import { expect }      from 'chai';
import MultiLangString from './MultiLangString.js';

describe(`MultiLangString`, function() {
  
  it(`type`, function() {
    const mls = new MultiLangString;
    expect(mls.type).to.equal(`MultiLangString`);
  });

});
