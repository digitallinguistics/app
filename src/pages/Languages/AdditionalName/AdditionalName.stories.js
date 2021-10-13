import html2element from '../../../utilities/html2element.js';
import Name         from './AdditionalName.js';

export default {
  title: `Languages/Additional Name`,
};

export const AdditionalName = async () => {

  const ul = html2element(`<ul class=list></ul>`);

  const nameView = new Name({
    language: `French`,
    name:     `espagnol`,
  }, 1);

  const el = await nameView.render();

  ul.appendChild(el);
  return ul;

};
