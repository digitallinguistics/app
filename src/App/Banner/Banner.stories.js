export default {
  parameters: { layout: `fullscreen` },
  title:      `App/Banner`,
};

export const Banner = () => {

  const template = document.getElementById(`banner-template`);

  const el = template.content.cloneNode(true).firstElementChild;
  el.style.width = `100%`;
  return el;
};
