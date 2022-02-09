import './storybook.css';
import '../dist/classes/Abbreviation/Abbreviation.css';
import '../dist/classes/BlockHeader/BlockHeader.css';
import '../dist/classes/BoxInput/BoxInput.css';


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
