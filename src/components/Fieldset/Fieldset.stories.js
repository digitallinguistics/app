import './Fieldset.css';
import '../LineInput/LineInput.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Components/Fieldset`,
};

export const Fieldset = () => html2element(`  <fieldset class=fieldset>
  <legend>Language Name</legend>
  <input class=line-input type=text>
  <p class=help-text>The canonical name for this language variety.</p>
</fieldset>`);
