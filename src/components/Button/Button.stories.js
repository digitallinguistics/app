import './Button.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Button`,
};

export const Button = () => html2element(`<button class=button>Click me!</button>`);
