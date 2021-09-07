import './LanguagesList.css';
import Language from '../../../models/Language.js';
import List     from './LanguagesList.js';

const languagesData = [
  { name: `Chitimacha` },
  { name: `Nuuchanulth` },
  { name: `Plains Cree` },
];

const languages = languagesData.map(data => new Language(data));

export default {
  layout: `centered`,
  title:  `Languages/Languages List`,
};

export const LanguagesList = () => {
  const list = new List(languages);
  return list.render(languages[1].cid);
};
