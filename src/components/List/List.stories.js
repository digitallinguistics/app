import './List.css';

export default {
  title: `Components/List`,
};

export const List = () => `
  <ul class=list>
    <li>This is Item 1.</li>
    <li class=current>This is Item 2.</li>
    <li>This is Item 3.</li>
  </ul>
`;
