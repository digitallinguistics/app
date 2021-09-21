import './LineInput.css';

export default {
  title: `Components/Line Input`,
};

export const LineInput = () => `<input
  autocomplete=off
  class=line-input
  id=abbreviation
  inputmode=text
  name=abbreviation
  pattern=[(a-z)|(A-Z)|(0-9)]+
  placeholder='e.g. chiti'
  type=text
>`;
