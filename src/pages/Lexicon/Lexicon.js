import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language) {
    super({ styles, template });
    this.language = language;
  }

  initialize() {}

  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#>${ name.default }</a></li>`);
  }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;
    this.el.dataset.language = this.language.cid;
    return this.el;
  }

}
