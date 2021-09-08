import { expect }    from 'chai';
import Transcription from './Transcription.js';

describe(`Transcription`, function() {

  const mapData = new Map([
    [`mod`, `sitimaxa`],
    [`swd`, `sitimaʃa`],
  ]);

  const objData = {
    mod: `sitimaxa`,
    swd: `sitimaʃa`,
  };

  const stringData = `sitimaxa`;

  it(`accepts String input`, function() {
    const txn  = new Transcription(stringData);
    expect(txn.get(`default`)).to.equal(stringData);
  });

  it(`accepts Object input`, function() {

    const txn = new Transcription(objData);

    expect(txn.get(`mod`)).to.equal(objData.mod);
    expect(txn.get(`swd`)).to.equal(objData.swd);

  });

  it(`accepts Map input`, function() {

    const txn = new Transcription(mapData);

    expect(txn.get(`mod`)).to.equal(mapData.get(`mod`));
    expect(txn.get(`swd`)).to.equal(mapData.get(`swd`));

  });

  it(`serializes as a JSON Object`, function() {

    const txn = new Transcription(objData);
    const obj = JSON.parse(JSON.stringify(txn));

    expect(obj.mod).to.equal(objData.mod);
    expect(obj.swd).to.equal(objData.swd);

  });

});
