import Language  from '../../models/Language.js';
import languages from '../../../test/fixtures/languages.json';
import View      from './LanguageChooser.js';

export default {
  title: `Components/Language Chooser`,
};

export const LanguageChooser = () => {
  const models = languages.map(data => new Language(data));
  const languageChooser = new View(models);
  return languageChooser.render();
};
