import '../../../dist/components/Fieldset/Fieldset.css';

export default {
  title: `Components/Fieldset`,
};

export const Fieldset = () => `<fieldset class=fieldset>
  <legend class=legend>Language Name</legend>
  <input autocomplete=off class=line-input placeholder='placeholder text' type=text>
  <p class=help-text>The canonical name for this language variety.</p>
</fieldset>`;
