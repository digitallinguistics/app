import './storybook.css';
import App from '../dist/App/App.js';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: `centered`,
  options: {
    storySort: {
      includeName: true,
      method:      `alphabetical`,
    },
  },
}
