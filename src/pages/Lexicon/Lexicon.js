import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language, lexemes = []) {
    super({ styles, template });
    this.language = language;
    this.lexemes  = lexemes;
  }

  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#>${ name.default }</a></li>`);
  }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;
    this.renderList();
    return this.el;
  }

  renderList() {

    this.el.querySelector(`.js-lexicon__lexemes-list`).innerHTML = ``;

    for (const lexeme of this.lexemes) {
      this.renderListItem(lexeme);
    }

  }

  async renderListItem(lexeme) {

    console.log(lexeme);

  }

}
