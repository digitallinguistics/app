import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor() {
    super({ template });
  }

  render() {
    this.cloneTemplate();
    return this.el;
  }

}
