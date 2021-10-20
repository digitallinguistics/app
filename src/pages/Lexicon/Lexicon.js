import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language, lexemes = []) {

    super({ styles, template });

    this.language = language;
    this.lexemes  = lexemes;

  }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;
    this.list = this.el.querySelector(`.js-lexicon__lexemes-list`);
    this.renderList();
    return this.el;
  }

  renderList() {

    this.list.innerHTML = ``;

    app.db.lexemes.iterate(this.renderListItem.bind(this), {
      index: `displayName`,
    });

  }

  renderListItem(lexeme) {
    if (lexeme.language !== this.language.cid) return;
    const li = document.createElement(`li`);
    li.classList.add(`lexicon__lexemes-list-item`);
    li.textContent = lexeme.displayName;
    this.list.appendChild(li);
  }

}
