export default function html2element(html) {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content.firstElementChild;
}
