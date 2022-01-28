import { expect }      from 'chai';
import MultiLangString from './MultiLangString.js';

describe(`MultiLangString`, function() {

  const mapData = new Map([
    [`en`, `house`],
    [`spa`, `casa`],
  ]);

  const noEngData = {
    ger: `Haus`,
    spa: `casa`,
  };

  const objData = {
    eng: `house`,
    spa: `casa`,
  };

  const stringData = `house`;

  it(`type`, function() {
    const mls = new MultiLangString;
    expect(mls.type).to.equal(`MultiLangString`);
  });

  it(`accepts String input`, function() {
    const mls = new MultiLangString(stringData);
    expect(mls.get(`eng`)).to.equal(`house`);
  });

  it(`accepts Object input`, function() {
    const mls = new MultiLangString(objData);
    expect(mls.get(`spa`)).to.equal(`casa`);
  });

  it(`accepts Map input`, function() {
    const mls = new MultiLangString(mapData);
    expect(mls.get(`en`)).to.equal(`house`);
  });

  it(`gets default 'en'`, function() {
    const mls = new MultiLangString(mapData);
    expect(mls.default).to.equal(`house`);
  });

  it(`gets default 'eng'`, function() {
    const mls = new MultiLangString(objData);
    expect(mls.default).to.equal(`house`);
  });

  it(`gets default (first value)`, function() {
    const mls = new MultiLangString(noEngData);
    expect(mls.default).to.equal(`Haus`);
  });

  it(`can set a default language`, function() {
    const mls = new MultiLangString(objData, { defaultLanguage: `spa` });
    expect(mls.default).to.equal(`casa`);
  });

  it(`serializes as a JSON Object`, function() {

    const mls = new MultiLangString(objData);
    const obj = JSON.parse(JSON.stringify(mls));

    expect(obj.eng).to.equal(objData.eng);
    expect(obj.spa).to.equal(objData.spa);

  });

});
