import './Header.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Header`,
};

export const Header = () => html2element(`<h1 class=header>Section Header</h1>`);
