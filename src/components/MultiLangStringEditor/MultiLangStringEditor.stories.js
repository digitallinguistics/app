import MLSEditor       from './MultiLangStringEditor.js';
import MultiLangString from '../../models/MultiLangString.js';

export default {
  title: `Components/MultiLangString Editor`,
};

export const Blank = () => {

  const data = {
    eng: ``,
    ctm: ``,
    fra: ``,
  };

  const options = {
    fieldName:   `story`,
    placeholder: `placeholder text`,
  };

  const mls    = new MultiLangString(data);
  const editor = new MLSEditor(mls, options);
  return editor.render();

};

export const Populated = () => {

  const data = {
    eng: `Chitimacha`,
    ctm: `Sitimaxa`,
    fra: `Chetimacha`,
  };

  const mls    = new MultiLangString(data);
  const editor = new MLSEditor(mls);
  return editor.render();

};
