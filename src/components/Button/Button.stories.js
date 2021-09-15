import './Button.css';

export default {
  layout: `centered`,
  title:  `Components/Button`,
};

export const Default = () => `<button class='button'>Default</button>`;
export const Primary = () => `<button class='button blue'>Primary</button>`;
export const Success = () => `<button class='button green'>Success / Add</button>`;
export const Alert   = () => `<button class='button red'>Alert / Delete</button>`;
