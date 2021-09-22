import { expect } from 'chai';
import Model      from './Model.js';

describe(`Model`, () => {

  describe(`cid`, () => {

    it(`is set when Model is created`, () => {
      const model = new Model;
      expect(model.cid).to.be.a(`string`);
    });

    it(`cannot be overwritten`, function() {
      const model   = new Model;
      const { cid } = model;
      const test    = () => { model.cid = `1`; };
      expect(test).to.throw(`Cannot assign to read only property`);
    });

  });

  it(`type`, function() {
    const model = new Model({}, { type: `Test` });
    expect(model.type).to.equal(`Test`);
    const test = () => { model.type = `OtherType`; };
    expect(test).to.throw(`Cannot assign to read only property`);
  });

});
