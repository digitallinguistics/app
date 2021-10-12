import App from './App/App.js';

window.app = new App;

window.addEventListener(`load`, async () => {
  await window.app.initialize();
  await window.app.render();
});
