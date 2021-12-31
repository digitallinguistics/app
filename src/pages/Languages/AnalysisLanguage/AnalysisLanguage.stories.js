import AnalysisLang from './AnalysisLanguage.js';
import html2element from '../../../utilities/html2element.js';

export default {
  title: `Languages/Analysis Language`,
};

export const AnalysisLanguage = () => {

  const ul = html2element(`<ul class=list></ul>`);

  const langView = new AnalysisLang({
    abbreviation: ``,
    language:     ``,
    tag:          ``,
  }, 1);

  const el = langView.render();

  el.style.border = `var(--border)`;

  ul.appendChild(el);
  return ul;

};
