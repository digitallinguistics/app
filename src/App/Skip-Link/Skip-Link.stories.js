export default {
  parameters: { layout: `fullscreen` },
  title:      `App/Skip Link`,
};

export const SkipLink = () => {

  const template = document.getElementById(`skip-link-template`);

  const el = template.content.cloneNode(true).firstElementChild;
  return el;
};
