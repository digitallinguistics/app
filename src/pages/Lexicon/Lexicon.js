import styles               from './Lexicon.less';
import template             from './Lexicon.hbs';
import View                 from '../../core/View.js';

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
    this.list = this.el.querySelector(`.js-lexicon__lexemes-list`);
    this.renderList();
    return this.el;
  }

  async renderList() {

    this.list.innerHTML = ``;

    // this.lexemes.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: `base` }));

  }

  renderListItem(lexeme) {
    if (lexeme.language !== this.language.cid) return;
    const li = document.createElement(`li`);
    li.textContent = lexeme.displayName;
    this.list.appendChild(li);
  }

}
