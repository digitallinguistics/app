import './App.css';

export default {
  parameters: { layout: `fullscreen` },
  title:      `App/App Shell`,
};

export const AppShell =  () => {

  const template = document.getElementById(`app-template`);
  template.content.querySelector(`script`).remove();
  return template.content;

};
