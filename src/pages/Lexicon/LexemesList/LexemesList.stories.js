/* eslint-disable
  no-magic-numbers,
  no-new,
*/

import data         from '../../../../test/fixtures/lexemes.json';
import Lexeme       from '../../../models/Lexeme.js';
import LexemesList  from './LexemesList.js';
import sortFunction from '../../../utilities/sort.js';

function getRandomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

export default {
  layout: `fullscreen`,
  title:  `Lexicon/Lexemes List`,
};

// Small List

export const SmallList = () => {

  const lexemes = data.map(item => new Lexeme(item));

  lexemes.sort((a, b) => sortFunction(a.lemma.default, b.lemma.default));

  const list = new LexemesList(lexemes);

  // Delays rendering until after list is added to the DOM.
  new Promise(resolve => {
    list.render(`3`);
    resolve();
  });

  return list.el;

};

// Large List
export const LargeList = () => {

  const lexemes = [];

  for (let i = 0; i < 25000; i++) {
    lexemes.push({
      cid:   i,
      lemma: {
        default: getRandomString(),
      },
    });
  }

  lexemes.sort((a, b) => sortFunction(a.lemma.default, b.lemma.default));

  const list = new LexemesList(lexemes);

  // Delays rendering until after list is added to the DOM.
  new Promise(resolve => {
    list.render();
    list.el.firstElementChild.classList.add(`current`);
    resolve();
  });

  return list.el;

};
