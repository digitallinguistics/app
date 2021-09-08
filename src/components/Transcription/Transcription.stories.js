import './Transcription.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Components/Transcription`,
};

export const Transcription = () => html2element(`<p>This is some text with a <span class=txn>transcription</span> in it.</p>`);
