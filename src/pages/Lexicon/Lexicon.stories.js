import Language     from '../../models/Language.js';
import languageData from '../../../test/fixtures/languages.json';
import Lexeme       from '../../models/Lexeme.js';
import lexemeData   from '../../../test/fixtures/lexemes.json';
import Page         from './Lexicon.js';

const [, language] = languageData.map(data => new Language(data));
const lexemes      = lexemeData.map(data => new Lexeme(data));

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const page = new Page(language, lexemes);
  return page.render();
};
