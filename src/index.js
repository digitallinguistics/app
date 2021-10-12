import App from './App/App.js';

// initialize app
window.app = new App;

window.addEventListener(`load`, async () => {
  await window.app.initialize();
  await window.app.render();
});

// save the beforeinstallprompt event
window.addEventListener(`beforeinstallprompt`, e => {
  window.installEvent = e;
});

// hide the install prompt after app is installed
window.addEventListener(`appinstalled`, () => {
  const el = document.querySelector(`#install-prompt`);
  if (el) el.hidden = true;
});

// register the offline service worker
if (`serviceWorker` in navigator && navigator.onLine) {
  navigator.serviceWorker.register(`offline-worker.js`);
}
