import './storybook.css';
import '../dist/classes/Abbreviation/Abbreviation.css';
import '../dist/classes/BlockHeader/BlockHeader.css';
import '../dist/classes/BoxInput/BoxInput.css';
import '../dist/classes/Button/Button.css';
import '../dist/classes/Code/Code.css';
import '../dist/classes/Fieldset/Fieldset.css';

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
