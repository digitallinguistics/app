import html2element from '../../utilities/html2element.js';
import HelpMenuView from './HelpMenu.js'

export default {
  parameters: {
    layout: `fullscreen`,
  },
  title: `App/Help Menu`,
};

export const HelpMenu = () => {

  const banner = html2element(`<header id=help-menu-banner>
    <style>
      #help-menu-banner {
        background-color: var(--blue);
        flex-direction  : row;
        justify-content : flex-end;
        width           : 100%;
      }
    </style>
  </header>`);

  const template = document.getElementById(`help-menu-template`);
  const menu     = template.content.cloneNode(true).firstElementChild;
  const helpMenuView = new HelpMenuView();
  setTimeout(() => {
    helpMenuView.initialize();
  }, 500)

  banner.appendChild(menu);
  return banner;

};
