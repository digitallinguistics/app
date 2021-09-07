import App from '../src/App/App.js';
import '../src/index.css';
import './storybook.css';

window.app = new App;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
