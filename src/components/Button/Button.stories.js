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
  <button class='button primary'>Primary</button>
  <button class='button success'>Success</button>
  <button class='button alert'>Alert</button>

</div>`;

export default {
  layout: `centered`,
  title:  `Button`,
};

export const Button = () => html2element(html);
