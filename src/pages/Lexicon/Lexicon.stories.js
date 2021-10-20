import Language      from '../../models/Language.js';
import languagesData from '../../../test/fixtures/languages.json';
import Lexeme        from '../../models/Lexeme.js';
import lexemesData   from '../../../test/fixtures/lexemes.json';
import Page          from './Lexicon.js';

const tempData = {
  citationForm: {
    mod:  `guxti`,
    swad: `guxti`,
  },
  lemma: {
    mod:  `guxt-`,
    swad: `guxt-`,
  },
};

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {

  const [, language] = languagesData.map(data => new Language(data));
  const lexemes      = lexemesData.map(data => new Lexeme(data));

  for (let i = 0; i < 100000; i++) {
    lexemes.push(new Lexeme(tempData));
  }

  console.log(`Starting render.`);

  const page = new Page(language, lexemes);
  return page.render();

};
