import './storybook.css';
import '../dist/classes/Abbreviation/Abbreviation.css';
import '../dist/classes/BlockHeader/BlockHeader.css';
import '../dist/classes/BoxInput/BoxInput.css';
import '../dist/classes/Button/Button.css';
import '../dist/classes/Code/Code.css';
import '../dist/classes/Fieldset/Fieldset.css';
import '../dist/classes/HelpText/HelpText.css';
import '../dist/classes/InputGroup/InputGroup.css';
import '../dist/classes/Label/Label.css';
import '../dist/classes/Legend/Legend.css';
import '../dist/classes/LineInput/LineInput.css';
import '../dist/classes/Link/Link.css';
import '../dist/classes/PageTitle/PageTitle.css';
import '../dist/classes/Required/Required.css';
import '../dist/classes/SectionHeader/SectionHeader.css';
import '../dist/classes/Transcription/Transcription.css';

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
