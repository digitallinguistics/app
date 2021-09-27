import './TextField.css';

export default {
  title: `Components/Text Field`,
};

export const Valid = () => `<div class=text-field>
  <label for=abbreviation>Abbreviation</label>
  <div>
    <input
      autocomplete=off
      class=line-input
      id=abbreviation
      inputmode=text
      name=abbreviation
      pattern=[(a-z)|(A-Z)|(0-9)]+
      placeholder='e.g. spa'
      type=text
    >
    <p class=help-text>An abbreviation for this language variety. May only contain letters and numbers.</p>
  </div>
</div>`;

export const Invalid = () => `<div class=text-field>
  <label for=abbreviation>Abbreviation</label>
  <div>
    <input
      autocomplete=off
      class=line-input
      id=abbreviation
      inputmode=text
      name=abbreviation
      pattern=[(a-z)|(A-Z)|(0-9)]+
      placeholder='e.g. spa'
      type=text
      value='bad value'
    >
    <p class=help-text>An abbreviation for this language variety. May only contain letters and numbers.</p>
  </div>
</div>`;
