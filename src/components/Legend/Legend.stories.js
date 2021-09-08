import './Legend.css';
import html2element from '../../utilities/html2element.js';

export default {
  title: `Components/Legend`,
};

export const Legend = () => html2element(`<legend class=legend>Legend</legend>`);
