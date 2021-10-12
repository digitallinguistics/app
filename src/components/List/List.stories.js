import './List.css';
import ListView from './List.js';

export default {
  title: `Components/List`,
};

const items = [
  `This is Item 1.`,
  `This is Item 2.`,
  `This is Item 3.`,
];

const template = (item, i) => {
  const li         = document.createElement(`li`);
  li.dataset.id    = i;
  li.textContent   = item;
  li.style.padding = `var(--text-padding)`;
  return li;
};

export const List = async () => {
  const listView = new ListView(items, { template });
  const el       = await listView.render();
  el.classList.add(`list`);
  return el;
};
