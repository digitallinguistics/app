import AnalysisLang from './AnalysisLanguage.js';
import html2element from '../../../utilities/html2element.js';

export default {
  title: `Languages/Analysis Language`,
};

const Template = ({ data }) => {

  const ul       = html2element(`<ul class=list></ul>`);
  const langView = new AnalysisLang(data, 1);
  const el       = langView.render();

  el.style.border = `var(--border)`;
  ul.appendChild(el);

  return ul;

};

export const Blank = Template.bind({});

Blank.args = {
  data: {
    abbreviation: ``,
    language:     ``,
    tag:          ``,
  },
};

export const Populated = Template.bind({});

Populated.args = {
  data: {
    abbreviation: `fra`,
    language:     `French`,
    tag:          `fra`,
  },
};
