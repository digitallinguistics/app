import Language  from '../../models/Language.js';
import languages from '../../../test/fixtures/languages.json';
import Page      from './Languages.js';

export default {
  title: `Languages/Languages Page`,
};

export const LanguagesPage = () => {
  const page = new Page(languages.map(data => new Language(data)));
  return page.render(`1`);
};
