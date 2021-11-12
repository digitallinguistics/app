export default {
  parameters: { layout: `fullscreen` },
  title:      `App/Footer`,
};

export const Footer = () => {
  const template = document.getElementById(`footer-template`);

  const el = template.content.cloneNode(true).firstElementChild;
  return el;
};
