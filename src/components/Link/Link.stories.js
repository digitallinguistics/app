import './Link.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Link`,
};

export const Link = () => html2element(`<p>This is a paragraph that <a class=link href=#>contains a link</a>.</p>`);
