import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor() {
    super({ styles, template });
  }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    return this.el;
  }

}
