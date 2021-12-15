import html2element    from '../../../utilities/html2element.js';
import Ortho           from '../../../models/Orthography.js';
import OrthographyView from './Orthography.js';

export default {
  title: `Languages/Orthography`,
};

export const Orthography = () => {

  const ul = html2element(`<ul class=list></ul>`);

  const ortho = new Ortho({ abbreviation: `cyr`, name: `Cyrillic` });

  const orthoView = new OrthographyView(ortho, 1);

  const el = orthoView.render();

  ul.appendChild(el);
  return ul;

};
