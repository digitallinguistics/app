import './Button.css';
import html2element from '../../utilities/html2element.js';

const html = `<div class=buttons>

  <style>
  
    .buttons {
      align-items: flex-start;
    }
    
    .button {
      margin: 1em;
      width:  5em;
    }
  
  </style>
  
  <button class='button'>Default</button>
  <button class='button blue'>Primary</button>
  <button class='button green'>Success</button>
  <button class='button red'>Alert</button>

</div>`;

export default {
  layout: `centered`,
  title:  `Components/Button`,
};

export const Button = () => html2element(html);
