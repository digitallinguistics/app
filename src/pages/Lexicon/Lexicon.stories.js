import getRandomString from '../../utilities/getRandomString.js';
import Language        from '../../models/Language.js';
import languageData    from '../../../test/fixtures/languages.json';
import Lexeme          from '../../models/Lexeme.js';
import lexemeData      from '../../../test/fixtures/lexemes.json';
import Page            from './Lexicon.js';

const lexemesArray = [...lexemeData];

for (let i = 0; i < 50; i++) {
  lexemesArray.push({
    cid:   i + 4,
    lemma: {
      default: getRandomString(),
    },
  });
}

const [, language] = languageData.map(data => new Language(data));

export default {
  parameters: {
    layout: `fullscreen`,
  },
  title:  `Lexicon/Lexicon Page`,
};

export const ShortList = () => {
  const lexemes = lexemeData.map(data => new Lexeme(data));
  const page    = new Page(language, lexemes);
  return page.render();
};

export const LongList = () => {
  const lexemes = lexemesArray.map(data => new Lexeme(data));
  const page    = new Page(language, lexemes);
  return page.render();
};
