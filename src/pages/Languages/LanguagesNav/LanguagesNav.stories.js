import './LanguagesNav.css';
import Language  from '../../../models/Language.js';
import languages from '../../../../test/fixtures/languages.json';
import Nav       from './LanguagesNav.js';

export default {
  title: `Languages/Languages Nav`,
};

export const LanguagesNav = () => {
  const navView = new Nav(languages.map(data => new Language(data)));
  return navView.render();
};
