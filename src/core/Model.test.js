import Model from './Model.js';

describe(`Model`, () => {

  describe(`id`, () => {

    it(`is set when Model is created`, () => {
      const model = new Model;
      expect(model.cid).to.be.a(`string`);
    });

  });

});
