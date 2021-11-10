import Language  from '../../models/Language.js';
import languages from '../../../test/fixtures/languages.json';
import Page      from './Lexicon.js';

const models = languages.map(data => new Language(data));

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const [, model] = models;
  const page = new Page(model);
  return page.render();
};
