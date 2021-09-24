import Page from './Home.js';

export default {
  title: `Home/Home Page`,
};

export const HomePage = () => {
  const page = new Page;
  const el = page.render();
  el.querySelector(`#install-prompt`).hidden = false;
  return el;
};
