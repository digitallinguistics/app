import './LanguagesNav.css';
import Language  from '../../../models/Language.js';
import languages from '../../../../test/fixtures/languages.json';
import Nav       from './LanguagesNav.js';

export default {
  title: `Languages/Languages Nav`,
};

export const LanguagesNav = () => {
  
  const navTemplate = document.getElementById(`languages-nav-template`);
  const nav         = navTemplate.content.cloneNode(true).firstElementChild;
  const root        = document.getElementById(`root`);
  
  // LanguagesNav expects a `.languages-nav` element to be already on the page.
  root.innerHTML = ``;
  root.appendChild(nav);
  
  const navView = new Nav(languages.map(data => new Language(data)));
  navView.render();
  return nav;

};
