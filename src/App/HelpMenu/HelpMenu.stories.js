import HelpMenuView from './HelpMenu.js';
import html2element from '../../utilities/html2element.js';

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

  banner.appendChild(menu);
  const helpMenuView = new HelpMenuView({ el: menu });
  helpMenuView.initialize();
  return banner;

};
