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
  const li       = document.createElement(`li`);
  li.dataset.id  = i;
  li.textContent = item;
  return li;
};

export const List = () => {
  const listView = new ListView(items, { template });
  return listView.render(`1`);
};
