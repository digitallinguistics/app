/**
 * Component tests for the List View
 */

import ListView from './ListView.js';

describe(`List View`, function() {

  before(function() {
    cy.visit(`/test`);
  });

  describe(`Options`, function() {

    it(`template`, function() {

      const template   = () => document.createElement(`li`);
      const collection = [1, 2, 3];
      const list       = new ListView(collection, { template });

      cy.mount(list.render());

    });

  });

  describe(`Properties`, function() {

    describe(`collection`, function() {

      it(`defaults to an empty array`, function() {

        const list = new ListView;

        expect(Array.isArray(list.collection)).to.be.true;
        expect(list.collection).to.have.lengthOf(0);

      });

      it(`is set to the provided collection`, function() {

        const collection = [];
        const list       = new ListView(collection);

        expect(list.collection).to.equal(collection);

      });

    });

    describe(`template`, function() {

      it(`is set to the provided template`, function() {

        const template = () => cy.stub();
        const list     = new ListView([], { template });

        expect(list.template).to.equal(template);

      });

    });

  });

  describe(`Methods`, function() {

    describe(`render`, function() {

      it(`defaults to an empty list`, function() {

        const list = new ListView;
        const ul   = list.render();

        expect(ul.children).to.have.lengthOf(0);

      });

      it(`defaults to empty <li>s`, function() {

        const collection = [1, 2, 3];
        const list       = new ListView(collection);
        const ul         = list.render();

        expect(ul.children).to.have.lengthOf(3);
        Array.from(ul.children).forEach(li => expect(li.children).to.have.lengthOf(0));

        cy.mount(ul);

      });

      it(`renders the template once for each item`, function() {

        const collection = [1, 2, 3];

        function template(item) {
          const li       = document.createElement(`li`);
          li.textContent = `Item: ${ item }`;
          return li;
        }

        const list = new ListView(collection, { template });
        const ul   = list.render();

        expect(ul.children).to.have.lengthOf(3);

        Array.from(ul.children).forEach((li, i) => {
          expect(li).to.be.an.instanceOf(HTMLLIElement);
          expect(li.textContent).to.equal(`Item: ${ i + 1 }`);
        });

        cy.mount(ul);

      });

    });

  });

});
