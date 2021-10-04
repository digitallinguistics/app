import '../src/index.css';
import './storybook.css';
import App from '../src/App/App.js';

window.app = new App;

window.app.initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      includeName: true,
      method:      `alphabetical`,
    },
  },
}
