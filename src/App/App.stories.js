import '../../dist/index.css';
import App from './App.js';

window.app = new App;
window.app.db.initialize();

export default {
  parameters: { layout: `fullscreen` },
  title:      `App/App Shell`,
};

export const AppShell = () => {
  const template = document.getElementById(`app-template`);
  const el       = template.content.cloneNode(true);
  const wrapper  = el.querySelector(`#wrapper`);
  const main     = document.createElement(`main`);
  main.style.inlineSize = `100%`;
  main.classList.add(`page-title`);
  main.textContent = `This is a non-interactive version of the App shell.`;
  wrapper.appendChild(main);
  el.querySelector(`script`).remove();
  return el;
};
