import './AdditionalName.css';
import Name from './AdditionalName.js';

export default {
  title: `Languages/Additional Name`,
};

export const AdditionalName = () => {

  const nameView = new Name({
    language: `French`,
    name:     `espagnol`,
  }, 1);

  return nameView.render();

};
