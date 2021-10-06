import './HelpMenu.css';

export default {
  title: `App/Help Menu`,
};

export const HelpMenu = () => {
  const template = document.getElementById(`help-menu-template`);
  return template.content.cloneNode(true).firstElementChild;
};
