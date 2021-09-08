import './Button.css';
import html2element from '../../utilities/html2element.js';

export default {
  layout: `centered`,
  title:  `Components/Button`,
};

export const Default = () => html2element(`<button class='button'>Default</button>`);
export const Primary = () => html2element(`<button class='button blue'>Primary</button>`);
export const Success = () => html2element(`<button class='button green'>Success / Add</button>`);
export const Alert   = () => html2element(`<button class='button red'>Alert / Delete</button>`);
