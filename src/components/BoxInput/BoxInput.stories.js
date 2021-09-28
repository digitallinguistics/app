import './BoxInput.css';

export default {
  title: `Components/Box Input`,
};

export const Input = () => `<input
  autocomplete=off
  class=box-input
  inputmode=text
  placeholder='placeholder text'
  spellcheck=false
  type=text
></input>`;

export const Textarea = () => `<textarea
  autocomplete=off
  class=box-input
  cols=20
  placeholder='Write your text here.'
  rows=4
  spellcheck=false
></textarea>`;
