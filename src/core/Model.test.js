import { expect } from 'chai';
import Model      from './Model.js';

describe(`Model`, () => {

  describe(`cid`, () => {

    it(`adds the cid property if not already present`, function() {
      const model = new Model;
      expect(model.cid).to.be.a(`string`);
    });

    it(`preserves the cid property if already present`, function() {
      const model = new Model({ cid: `1` });
      expect(model.cid).to.equal(`1`);
    });

    it(`cannot be overwritten`, function() {
      const model = new Model;
      const test  = () => { model.cid = `1`; };
      expect(test).to.throw(`Cannot assign to read only property`);
    });

  });

  describe(`dateCreated`, function() {

    it(`adds the dateCreated property if not already present`, function() {
      const model = new Model;
      const time  = new Date;
      expect(model.dateCreated).to.be.an.instanceOf(Date);
      expect(time).to.be.at.least(model.dateCreated);
    });

    it(`preserves the dateCreated property if already present`, function() {
      const time  = new Date(`2021-01-01`);
      const model = new Model({ dateCreated: time });
      expect(model.dateCreated.toString()).to.equal(time.toString());
    });

    it(`cannot be overwritten`, function() {
      const model = new Model;
      const test  = () => { model.dateCreated = new Date; };
      expect(test).to.throw(`Cannot assign to read only property`);
    });

  });

  describe(`type`, function() {

    it(`is added if the option is passed`, function() {
      const model = new Model({}, { type: `Test` });
      expect(model.type).to.equal(`Test`);
    });

    it(`is not added if the option is not passed`, function() {
      const model = new Model;
      expect(model.type).to.be.undefined;
    });

    it(`cannot be overwritten`, function() {
      const model = new Model({}, { type: `Test` });
      const test  = () => { model.type = `OtherType`; };
      expect(test).to.throw(`Cannot assign to read only property`);
    });
    
  });

});
