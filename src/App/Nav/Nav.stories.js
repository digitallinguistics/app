import Nav from './Nav.js';

export default {
  parameters: { layout: `fullscreen` },
  title:      `App/Main Nav`,
};


export const MainNav = () => {
  const template = document.getElementById(`main-nav-template`);
  const root = document.getElementById(`root`);
  root.append(template.content.cloneNode(true).firstElementChild);
  const navView = new Nav();
  const el = navView.render(`Home`);
  el.style.minHeight = `inherit`;
  return el;
};
