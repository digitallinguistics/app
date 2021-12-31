/**
 * Unit tests for the List View
 */

import List from './List.js';

describe(`List View`, function() {

  describe(`Options`, function() {

    it(`template`, function() {

      const template   = () => document.createElement(`li`);
      const collection = [1, 2, 3];
      const list       = new List(collection, { template });

      expect(() => list.render()).not.to.throw();

    });

  });

  describe(`Properties`, function() {

    describe(`collection`, function() {

      it(`defaults to an empty array`, function() {

        const list = new List;

        expect(Array.isArray(list.collection)).to.be.true;
        expect(list.collection).to.have.lengthOf(0);

      });

      it(`is set to the provided collection`, function() {

        const collection = [];
        const list       = new List(collection);

        expect(list.collection).to.equal(collection);

      });

    });

    describe(`template`, function() {

      it(`is set to the provided template`, function() {

        const template = () => cy.stub();
        const list     = new List([], { template });

        expect(list.renderItem).to.equal(template);

      });

    });

  });

  describe(`Methods`, function() {

    describe(`render`, function() {

      it(`defaults to an empty list`, function() {

        const list = new List;
        const ul   = list.render();

        expect(ul.children).to.have.lengthOf(0);

      });

      it(`defaults to empty <li>s`, function() {

        const collection = [1, 2, 3];
        const list       = new List(collection);
        const ul         = list.render();

        expect(ul.children).to.have.lengthOf(3);
        Array.from(ul.children).forEach(li => expect(li.children).to.have.lengthOf(0));

      });

      it(`renders the template once for each item`, function() {

        const collection = [1, 2, 3];

        function template(item) {
          const li       = document.createElement(`li`);
          li.textContent = `Item: ${ item }`;
          return li;
        }

        const list = new List(collection, { template });
        const ul   = list.render();

        expect(ul.children).to.have.lengthOf(3);

        Array.from(ul.children).forEach((li, i) => {
          expect(li).to.be.an.instanceOf(HTMLLIElement);
          expect(li.textContent).to.equal(`Item: ${ i + 1 }`);
        });

      });

    });

  });

});
