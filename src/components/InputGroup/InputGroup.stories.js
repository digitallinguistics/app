import '../../../dist/components/InputGroup/InputGroup.css';

export default {
  title: `Components/Input Group`,
};

export const Valid = () => `<div class=input-group>
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

export const Invalid = () => `<div class=input-group>
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
