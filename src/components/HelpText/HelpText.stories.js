import './HelpText.css';
import '../Link/Link.css';

import html2element from '../../utilities/html2element.js';

export default {
  title: `Components/Help Text`,
};

export const HelpText = () => html2element(`<p class=help-text>This is a paragraph of help text with a <a class=link href=#>link</a> inside it.</p>`);
