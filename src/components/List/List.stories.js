import './List.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `List`,
};

export const List = () => html2element(`
  <ul class=list>
    <li>This is Item 1.</li>
    <li class=current>This is Item 2.</li>
    <li>This is Item 3.</li>
  </ul>
`);
