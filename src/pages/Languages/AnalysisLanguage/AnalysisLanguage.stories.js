import html2element from '../../../utilities/html2element.js';
import Language     from './AnalysisLanguage.js';

export default {
  title: `Languages/Analysis Language`,
};

export const AnalysisLanguage = () => {

  const ul = html2element(`<ul class=list></ul>`);

  const langView = new Language({
    abbreviation: ``,
    language:     ``,
    tag:          ``,
  }, 1);

  const el = langView.render();

  ul.appendChild(el);
  return ul;

};
