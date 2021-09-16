import TxnEditor     from './TranscriptionEditor.js';
import Transcription from '../../models/Transcription.js';

export default {
  title: `Components/Transcription Editor`,
};

export const TranscriptionEditor = () => {

  const data = {
    mod:  `sitimaxa`,
    swd:  `sitimaʃa`,
    test: ``,
  };

  const options = {
    classes:     [`storybook`],
    lang:        `ctm`,
    placeholder: `placeholder text`,
    prefix:      `storybook`,
  };

  const txn    = new Transcription(data);
  const editor = new TxnEditor(txn, options);
  return editor.render();

};
