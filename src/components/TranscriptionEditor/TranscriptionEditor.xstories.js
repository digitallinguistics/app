import Editor        from './TranscriptionEditor.js';
import Transcription from '../../models/Transcription.js';

export default {
  title: `Components/Transcription Editor`,
};

export const TranscriptionEditor = () => {
  const data   = {};
  const txn    = new Transcription(data);
  const editor = new Editor;
  return editor.render();
};
