import './LanguageEditor.css';
import Editor    from './LanguageEditor.js';
import Language  from '../../../models/Language.js';
import languages from '../../../../test/fixtures/languages.json';

export default {
  title: `Languages/Language Editor`,
};

export const Blank = () => {
  const data     = { name: `` };
  const language = new Language(data);
  const editor   = new Editor(language);
  return editor.render();
};

export const Populated = () => {
  const [nuu]    = languages;
  const language = new Language(nuu);
  const editor   = new Editor(language);
  return editor.render();
};
