import Page from './Lexicon.js';

export default {
  title: `Lexicon/Lexicon Page`,
};

export const LexiconPage = () => {
  const page = new Page;
  return page.render();
};
