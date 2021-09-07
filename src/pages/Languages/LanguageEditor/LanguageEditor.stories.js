import './LanguageEditor.css';
import Editor from './LanguageEditor.js';

export default {
  title: `Languages/Language Editor`,
};

export const LanguageEditor = () => {
  const editor = new Editor;
  return editor.render();
};
