import html2element from '../../../utilities/html2element.js';
import Ortho  from './Orthography.js';

export default {
  title: `Languages/Orthography`,
};

export const Orthography = () => {

  const ul = html2element(`<ul class=list></ul>`);

  const orthoView = new Ortho({
    abbreviation: `cyr`,
    name:         `Cyrillic`,
  }, 1);

  const el = orthoView.render();

  ul.appendChild(el);
  return ul;

};
