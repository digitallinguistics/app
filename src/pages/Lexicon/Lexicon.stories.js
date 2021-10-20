import Language      from '../../models/Language.js';
import languagesData from '../../../test/fixtures/languages.json';
import lexemesData   from '../../../test/fixtures/lexemes.json';
import Page          from './Lexicon.js';

const [, language] = languagesData.map(data => new Language(data));

// NOTE: The Lexicon page depends on the app's database to render.
// The database must be populated with lexemes.
// Listen for the `initialize` event emitted by the app,
// then populate the database.
document.body.addEventListener(`initialize`, () => {

  app.db.lexemes.put(lexemesData);

});

function render() {
  const page = new Page(language);
  return page.render();
}

export default {
  title: `Lexicon/Lexicon Page`,
};

export const SmallList = () => {

  if (app?.db?.idb) return render();

  // if the app has not yet initialized,
  // show a "Click to render" button
  // to allow time for the app to finish initializing
  const button = document.createElement(`button`);
  button.textContent = `Click to render`;
  button.classList.add(`button`);

  button.addEventListener(`click`, () => {
    const root = document.getElementById(`root`);
    root.innerHTML = ``;
    root.appendChild(render());
  });

  return button;

};

// export const LargeList = () => {
//   Programmatically add a language with cid = "3" to the database
//   in preview.js, then render the lexemes for that language here.
// };
