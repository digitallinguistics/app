import './Nav.css';
import Nav       from './Nav.js';

export default {
  title: `App/Main Nav`,
};


export const MainNav = () => {
  const template = document.getElementById(`main-nav-template`);
  const root = document.getElementById(`root`);
  root.append(template.content.cloneNode(true).firstElementChild);
  const navView = new Nav();
  return navView.render(`Home`);
};
