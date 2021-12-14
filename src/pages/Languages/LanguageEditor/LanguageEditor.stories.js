import Editor    from './LanguageEditor.js';
import Language  from '../../../models/Language.js';
import languages from '../../../../test/fixtures/languages.json';

export default {
  title: `Languages/Language Editor`,
};

export const Blank = () => {

  const data = {
    additionalNames: [],
    autonym:         ``,
    name:            ``,
  };

  const language = new Language(data);
  const editor   = new Editor(language);
  const el = editor.render();
  setTimeout(() => editor.initialize(), 500);
  return el;

};

export const Populated = () => {
  const [, chiti]    = languages;
  const language = new Language(chiti);
  const editor   = new Editor(language);
  const el = editor.render();
  setTimeout(() => editor.initialize(), 500);
  return el;
};
