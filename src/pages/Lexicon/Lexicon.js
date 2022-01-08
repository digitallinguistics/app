import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language) {
    super({ styles, template });
    this.language = language;
  }

  initialize() { /* no-op */ }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    this.el.dataset.language = this.language.cid;
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;
    return this.el;
  }

}
