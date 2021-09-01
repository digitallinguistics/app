import Text from './Text.js';

describe(`Text`, function() {

  it(`type`, function() {
    const text = new Text;
    expect(text.type).to.equal(`Text`);
  });

});
