// require(`../dist/index.css`);
// require(`./storybook.css`);

// const App = require(`../src/App/App.js`);
// window.app = new App;
// window.app.initialize();

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
