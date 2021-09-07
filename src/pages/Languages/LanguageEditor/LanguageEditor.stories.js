import './LanguageEditor.css';
import Editor from './LanguageEditor.js';

export default {
  title: `Languages/Language Editor`,
};

export const LanguageEditor = () => {
  const editor = new Editor;
  const el     = editor.render();
  return el;
};
