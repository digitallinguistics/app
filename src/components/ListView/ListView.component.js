import mount    from '../../../test/mount.js';
import ListView from './ListView';

describe(`ListView`, function() {

  it(`mounts`, function() {

    const listView = new ListView();
    const el       = listView.render();

    mount(el);

    cy.get(`ul`);

  });

});
