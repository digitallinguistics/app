import Language      from '../../models/Language.js';
import languagesData from '../../../test/fixtures/languages.json';
import Lexeme        from '../../models/Lexeme.js';
import lexemesData   from '../../../test/fixtures/lexemes.json';
import Page          from './Lexicon.js';

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const [, language] = languagesData.map(data => new Language(data));
  const lexemes      = lexemesData.map(data => new Lexeme(data));
  const page         = new Page(language, lexemes);
  return page.render();
};
