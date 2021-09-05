import './Link.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Link`,
};

export const Link = () => html2element(`<a class=link href=#>This is a link.</a>`);
