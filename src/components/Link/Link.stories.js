import './Link.css';

export default {
  title: `Components/Link`,
};

export const SamePage   = () => `<p>This is a paragraph that <a class=link href=#>contains a same-page link</a>.</p>`;
export const SameOrigin = () => `<p>This is a paragraph that <a class=link href=https://digitallinguistics.io>contains a same-origin link</a>.</p>`;
export const External   = () => `<p>This is a paragraph that <a class=link href=https://twitter.com>contains an external link</a>.</p>`;
