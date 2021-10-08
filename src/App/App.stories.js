import './App.css';

export default {
  parameters: { layout: `fullscreen` },
  title:      `App/App Shell`,
};

export const AppShell =  () => {

  const template = document.getElementById(`app-template`);
  const el = template.content.cloneNode(true);
  el.querySelector(`script`).remove();
  return el;
};
