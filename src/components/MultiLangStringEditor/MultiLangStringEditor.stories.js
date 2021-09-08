import MLSEditor       from './MultiLangStringEditor.js';
import MultiLangString from '../../models/MultiLangString.js';

const data = {
  eng: `Chitimacha`,
  ctm: `Sitimaxa`,
  fra: `Chetimacha`,
};

export default {
  title: `Components/MultiLangString Editor`,
};

export const Blank = () => {
  const mls    = new MultiLangString();
  const editor = new MLSEditor(mls);
  return editor.render();
};

export const Populated = () => {
  const mls    = new MultiLangString(data);
  const editor = new MLSEditor(mls);
  return editor.render();
};
