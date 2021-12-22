import Language  from '../../models/Language.js';
import languages from '../../../test/fixtures/languages.json';
import Page      from './Lexicon.js';

const [, language] = languages.map(data => new Language(data));

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const page = new Page(language);
  return page.render();
};
