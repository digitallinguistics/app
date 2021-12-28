import getRandomString from '../../utilities/getRandomString.js';
import Language        from '../../models/Language.js';
import languageData    from '../../../test/fixtures/languages.json';
import Lexeme          from '../../models/Lexeme.js';
import lexemeData      from '../../../test/fixtures/lexemes.json';
import Page            from './Lexicon.js';

for (let i = 0; i < 50; i++) {
  lexemeData.push({
    cid:   i + 4,
    lemma: {
      default: getRandomString(),
    },
  });
}

const [, language] = languageData.map(data => new Language(data));
const lexemes      = lexemeData.map(data => new Lexeme(data));

export default {
  parameters: {
    layout: `fullscreen`,
  },
  title:  `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const page = new Page(language, lexemes);
  return page.render();
};
