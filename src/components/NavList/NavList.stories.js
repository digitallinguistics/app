import '../../../dist/components/NavList/NavList.css';
import NavListView from './NavList.js';

export default {
  title: `Components/Nav List`,
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

export const NavList = () => {
  const listView = new NavListView(items, { template });
  return listView.render(`1`);
};
