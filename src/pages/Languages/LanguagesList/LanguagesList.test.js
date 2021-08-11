import App           from '../../../App/App.js';
import LanguagesList from './LanguagesList';

describe(`LanguagesList`, function() {

  before(function() {

    cy.fixture(`languages.json`).as(`languages`);

    cy.visit(`/test`);

    cy.document()
    .then(doc => {

      this.template = doc.getElementById(`languages-list-template`);
      this.main     = doc.getElementById(`main`);

    });

    window.app = new App;

  });

  it(`renders`, function() {

    const languagesList = new LanguagesList(this.languages);

    languagesList.template = this.template;

    const el = languagesList.render();

    this.main.appendChild(el);

    cy.get(`.languages-list .list`)
    .children()
    .should(`have.lengthOf`, 2)
    .then(([a, b]) => {
      expect(a.dataset.language).to.equal(`1`);
      expect(b.dataset.language).to.equal(`2`);
      expect(a.textContent).to.equal(`Nuuchahnulth`);
      expect(b.textContent).to.equal(`Chitimacha`);
    });

  });

  it(`changes languages`, function() {

    const emit = cy.stub(app.events, `emit`);

    cy.get(`.languages-list [data-language=1]`)
    .click()
    .should(`have.class`, `current`)
    .then(() => {
      expect(emit).to.have.been.calledWith(`Languages:LanguagesList:change`);
    });

  });

  it(`emits an event when Add a Language is clicked`, function() {

    const emit = cy.stub(app.events, `emit`);

    cy.get(`.languages-list button`)
    .click()
    .then(() => {
      expect(emit).to.have.been.calledWith(`Languages:LanguagesList:add`);
    });

  });

});
